import React, { useState, useMemo, useRef, useEffect, useCallback } from 'react';
import { Share2, Rotate3d, Eye, Play, Pause, RotateCcw, ZoomIn, ZoomOut } from 'lucide-react';
import SchemaCard from './SchemaCard';

const MODES_INFO = [
  { id: 'gv', title: 'Gezonde volwassene', category: 'gezond', abbr: 'GV' },
  { id: 'bk', title: 'Blije kind', category: 'gezond', abbr: 'BK' },
  { id: 'kk', title: 'Kwetsbare kind', category: 'kind', abbr: 'KK' },
  { id: 'rk', title: 'Razende kind', category: 'kind', abbr: 'RK' },
  { id: 'boos_k', title: 'Boze kind', category: 'kind', abbr: 'WK' },
  { id: 'ik', title: 'Impulsieve kind', category: 'kind', abbr: 'IK' },
  { id: 'ok', title: 'Ongedisciplineerde kind', category: 'kind', abbr: 'OK' },
  { id: 'wi', title: 'Willoze inschikkelijke', category: 'coping', abbr: 'WI' },
  { id: 'ob', title: 'Onthechte beschermer', category: 'coping', abbr: 'OB' },
  { id: 'oz', title: 'Onthechte zelfsusser', category: 'coping', abbr: 'OZ' },
  { id: 'zh', title: 'Zelfverheerlijker', category: 'coping', abbr: 'ZH' },
  { id: 'pa', title: 'Pest en aanval', category: 'coping', abbr: 'PA' },
  { id: 'so', title: 'Straffende ouder', category: 'ouder', abbr: 'SO' },
  { id: 'vo', title: 'Veeleisende ouder', category: 'ouder', abbr: 'VO' }
];

const SMI_KEY_TO_ID = {
  'gv': 'gv', 'bk': 'bk', 'so': 'so', 'vo': 'vo', 'rk': 'rk',
  'wk': 'boos_k', 'boos_k': 'boos_k', 'ik': 'ik', 'ok': 'ok', 'kk': 'kk',
  'zh': 'zh', 'ob': 'ob', 'pa': 'pa', 'oz': 'oz', 'wi': 'wi'
};

const CATEGORY_COLORS = {
  gezond: '#34d399',
  ouder: '#f87171',
  kind: '#60a5fa',
  coping: '#facc15'
};

const LIGHT_CATEGORY_COLORS = {
  gezond: '#a7f3d0',
  ouder: '#fecaca',
  kind: '#bfdbfe',
  coping: '#fef08a'
};

// 3D vector math helpers
function crossProduct(v1, v2) {
  return [
    v1[1] * v2[2] - v1[2] * v2[1],
    v1[2] * v2[0] - v1[0] * v2[2],
    v1[0] * v2[1] - v1[1] * v2[0]
  ];
}

function dot(v1, v2) {
  return v1[0] * v2[0] + v1[1] * v2[1] + v1[2] * v2[2];
}

function normalize(v) {
  const len = Math.sqrt(v[0] * v[0] + v[1] * v[1] + v[2] * v[2]) || 1;
  return [v[0] / len, v[1] / len, v[2] / len];
}

// 3D Projection math (XZ ground plane, Y elevation axis)
function project3D(x, y, z, pitchRad, yawRad, zoom, cx, cy, d = 850) {
  // Yaw rotation around vertical Y axis
  const x1 = x * Math.cos(yawRad) + z * Math.sin(yawRad);
  const y1 = y;
  const z1 = -x * Math.sin(yawRad) + z * Math.cos(yawRad);

  // Pitch rotation around horizontal X axis
  const x2 = x1;
  const y2 = y1 * Math.cos(pitchRad) - z1 * Math.sin(pitchRad);
  const z2 = y1 * Math.sin(pitchRad) + z1 * Math.cos(pitchRad);

  const factor = d / (d + z2);
  return {
    screenX: cx + x2 * factor * zoom,
    screenY: cy + y2 * factor * zoom,
    scale: factor * zoom,
    depth: z2
  };
}

export default function SmiRadarGraph({ scores, rawAnswers, onOpenModusWeb, showAction = true, initialDimension = '3d' }) {
  const [viewDimension, setViewDimension] = useState(initialDimension); // '2d' or '3d'
  const [hoveredNode, setHoveredNode] = useState(null);
  const [popupFlipped, setPopupFlipped] = useState(false);

  // 3D Orbit Camera State
  const [pitch, setPitch] = useState(48); // vertical tilt in degrees (10 to 88)
  const [yaw, setYaw] = useState(28); // horizontal rotation in degrees
  const [zoom, setZoom] = useState(1.0);
  const [isDragging, setIsDragging] = useState(false);
  const [autoRotate, setAutoRotate] = useState(true);

  const lastMousePos = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  // Normalize scores dictionary
  const normalizedScores = useMemo(() => {
    const map = {};
    if (Array.isArray(scores)) {
      scores.forEach(s => {
        const canonical = SMI_KEY_TO_ID[s.id] || s.id;
        const val = parseFloat(s.mean);
        if (!isNaN(val)) map[canonical] = val;
      });
    } else if (scores && typeof scores === 'object') {
      Object.entries(scores).forEach(([k, v]) => {
        const canonical = SMI_KEY_TO_ID[k] || k;
        const val = parseFloat(v);
        if (!isNaN(val)) map[canonical] = val;
      });
    }
    return map;
  }, [scores]);

  // Auto-rotation loop
  useEffect(() => {
    if (!autoRotate || viewDimension !== '3d' || isDragging) return;
    let animId;
    const step = () => {
      setYaw(prev => (prev + 0.35) % 360);
      animId = requestAnimationFrame(step);
    };
    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [autoRotate, viewDimension, isDragging]);

  // Mouse drag handlers for 3D orbit
  const handleMouseDown = useCallback((e) => {
    if (viewDimension !== '3d') return;
    setIsDragging(true);
    lastMousePos.current = { x: e.clientX, y: e.clientY };
  }, [viewDimension]);

  const handleMouseMove = useCallback((e) => {
    if (!isDragging || viewDimension !== '3d') return;
    const deltaX = e.clientX - lastMousePos.current.x;
    const deltaY = e.clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.clientX, y: e.clientY };

    setYaw(prev => (prev + deltaX * 0.5) % 360);
    setPitch(prev => Math.max(12, Math.min(85, prev + deltaY * 0.4)));
  }, [isDragging, viewDimension]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  // Touch handlers for mobile
  const handleTouchStart = useCallback((e) => {
    if (viewDimension !== '3d' || e.touches.length !== 1) return;
    setIsDragging(true);
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
  }, [viewDimension]);

  const handleTouchMove = useCallback((e) => {
    if (!isDragging || viewDimension !== '3d' || e.touches.length !== 1) return;
    const deltaX = e.touches[0].clientX - lastMousePos.current.x;
    const deltaY = e.touches[0].clientY - lastMousePos.current.y;
    lastMousePos.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };

    setYaw(prev => (prev + deltaX * 0.6) % 360);
    setPitch(prev => Math.max(12, Math.min(85, prev + deltaY * 0.5)));
  }, [isDragging, viewDimension]);

  const handleTouchEnd = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleOpenModusWeb = () => {
    if (rawAnswers && Object.keys(rawAnswers).length > 0) {
      localStorage.setItem('schemaApp_modusweb_smi', JSON.stringify(rawAnswers));
    }
    if (normalizedScores && Object.keys(normalizedScores).length > 0) {
      localStorage.setItem('schemaApp_modusweb_scores', JSON.stringify(normalizedScores));
    }
    localStorage.setItem('schemaApp_modusweb_initial_view', 'graph');

    if (onOpenModusWeb) {
      onOpenModusWeb();
    } else {
      window.location.href = 'modusweb.html';
    }
  };

  // Dimensions & Projection constants
  const size = 640;
  const cx = size / 2;
  const cy = size / 2 + 15; // slightly offset downwards for 3D elevation clearance
  const R_MAX = 175; // outer radius of level 6
  const R_BALL = 242; // orbit radius of outer balls
  const n = MODES_INFO.length;

  const pitchRad = (pitch * Math.PI) / 180;
  const yawRad = (yaw * Math.PI) / 180;

  // 1. Calculate 3D positions for the 14 modes
  const modes3D = useMemo(() => {
    const lightDir = normalize([0.5, -0.85, 0.4]);

    return MODES_INFO.map((m, idx) => {
      const angle = -Math.PI / 2 + idx * ((2 * Math.PI) / n);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);

      const scoreVal = normalizedScores[m.id] !== undefined ? normalizedScores[m.id] : 0;
      const ratio = Math.min(Math.max(scoreVal / 6, 0.08), 1);

      // Height elevation in 3D: higher score = towers higher into the air!
      const elevation = scoreVal * 25; // 0 to 150px height
      const peakX = R_MAX * ratio * cosA;
      const peakZ = R_MAX * ratio * sinA;
      const peakY = -elevation; // negative is upwards

      // Ground position on floor (y = 0)
      const groundX = R_MAX * ratio * cosA;
      const groundZ = R_MAX * ratio * sinA;

      // Outer ball orbit position
      const ballX = R_BALL * cosA;
      const ballZ = R_BALL * sinA;
      const ballY = -(scoreVal * 10); // balls float slightly off the ground

      // Project all to screen coordinates
      const projPeak = project3D(peakX, peakY, peakZ, pitchRad, yawRad, zoom, cx, cy);
      const projGround = project3D(groundX, 0, groundZ, pitchRad, yawRad, zoom, cx, cy);
      const projBall = project3D(ballX, ballY, ballZ, pitchRad, yawRad, zoom, cx, cy);

      const scale = scoreVal === 0 ? 0.7 : 0.6 + scoreVal * 0.25;
      const ballRadius = Math.max(15, 21 * scale * (viewDimension === '3d' ? projBall.scale : 1));

      const bg = scoreVal < 3.0 ? LIGHT_CATEGORY_COLORS[m.category] : CATEGORY_COLORS[m.category];
      const textColor = (scoreVal < 3.0 || m.category === 'coping') ? '#451a03' : '#ffffff';

      return {
        ...m,
        scoreVal,
        angle,
        cosA,
        sinA,
        peakX,
        peakY,
        peakZ,
        projPeak,
        projGround,
        projBall,
        ballRadius,
        bg,
        textColor,
        elevation
      };
    });
  }, [normalizedScores, pitchRad, yawRad, zoom, cx, cy, viewDimension, n]);

  // 2. 3D Mountain Apex and Facets
  const { facets, projApex } = useMemo(() => {
    // Apex at central vertical axis
    const avgElevation = modes3D.reduce((sum, m) => sum + m.elevation, 0) / n;
    const apexHeight = -(avgElevation * 1.15 + 15);
    const pApex = project3D(0, apexHeight, 0, pitchRad, yawRad, zoom, cx, cy);

    const lightDir = normalize([0.4, -0.9, 0.45]);
    const facetList = [];

    for (let i = 0; i < n; i++) {
      const nextIdx = (i + 1) % n;
      const m1 = modes3D[i];
      const m2 = modes3D[nextIdx];

      // 3D triangle vertices: Apex, Peak1, Peak2
      const v1 = [m1.peakX, m1.peakY - apexHeight, m1.peakZ];
      const v2 = [m2.peakX, m2.peakY - apexHeight, m2.peakZ];
      const norm = normalize(crossProduct(v1, v2));

      // Directional lighting
      const lightDot = Math.abs(dot(norm, lightDir));
      const intensity = Math.max(0.18, Math.min(0.85, lightDot * 0.6 + 0.25));

      const avgDepth = (pApex.depth + m1.projPeak.depth + m2.projPeak.depth) / 3;

      facetList.push({
        pts: `${pApex.screenX.toFixed(1)},${pApex.screenY.toFixed(1)} ${m1.projPeak.screenX.toFixed(1)},${m1.projPeak.screenY.toFixed(1)} ${m2.projPeak.screenX.toFixed(1)},${m2.projPeak.screenY.toFixed(1)}`,
        intensity,
        avgDepth,
        idx: i
      });
    }

    // Sort facets from back to front for proper 3D alpha blending
    facetList.sort((a, b) => b.avgDepth - a.avgDepth);

    return { facets: facetList, projApex: pApex };
  }, [modes3D, pitchRad, yawRad, zoom, cx, cy, n]);

  // 3. 3D Concentric floor rings (levels 2, 4, 6)
  const floorGridRings = useMemo(() => {
    return [2, 4, 6].map(lvl => {
      const r = R_MAX * (lvl / 6);
      const pts = [];
      for (let i = 0; i < n; i++) {
        const angle = -Math.PI / 2 + i * ((2 * Math.PI) / n);
        const x = r * Math.cos(angle);
        const z = r * Math.sin(angle);
        const p = project3D(x, 0, z, pitchRad, yawRad, zoom, cx, cy);
        pts.push(`${p.screenX.toFixed(1)},${p.screenY.toFixed(1)}`);
      }
      return { lvl, pts: pts.join(' ') };
    });
  }, [pitchRad, yawRad, zoom, cx, cy, n]);

  // 4. Projected Ground Center
  const projCenter = useMemo(() => {
    return project3D(0, 0, 0, pitchRad, yawRad, zoom, cx, cy);
  }, [pitchRad, yawRad, zoom, cx, cy]);

  // 5. Floor Shadow Polygon (ground level projection of the score polygon)
  const floorShadowPoints = useMemo(() => {
    return modes3D.map(m => `${m.projGround.screenX.toFixed(1)},${m.projGround.screenY.toFixed(1)}`).join(' ');
  }, [modes3D]);

  // 6. 3D Polygon perimeter line
  const peakPolygonPoints = useMemo(() => {
    return modes3D.map(m => `${m.projPeak.screenX.toFixed(1)},${m.projPeak.screenY.toFixed(1)}`).join(' ');
  }, [modes3D]);

  // 7. Depth-sorted balls for clean occlusion in 3D
  const depthSortedBalls = useMemo(() => {
    return [...modes3D].sort((a, b) => b.projBall.depth - a.projBall.depth);
  }, [modes3D]);

  // 2D Classic Static Data
  const modeData2D = useMemo(() => {
    return MODES_INFO.map((m, idx) => {
      const angle = -Math.PI / 2 + idx * ((2 * Math.PI) / n);
      const cosA = Math.cos(angle);
      const sinA = Math.sin(angle);
      const ballX = cx + R_BALL * cosA;
      const ballY = cy + R_BALL * sinA;

      const scoreVal = normalizedScores[m.id] !== undefined ? normalizedScores[m.id] : 0;
      const ratio = Math.min(Math.max(scoreVal / 6, 0), 1);
      const ptX = cx + (R_MAX * ratio) * cosA;
      const ptY = cy + (R_MAX * ratio) * sinA;

      const scale = scoreVal === 0 ? 0.7 : 0.6 + scoreVal * 0.25;
      const ballRadius = Math.max(16, 21 * scale);
      const bg = scoreVal < 3.0 ? LIGHT_CATEGORY_COLORS[m.category] : CATEGORY_COLORS[m.category];
      const textColor = (scoreVal < 3.0 || m.category === 'coping') ? '#451a03' : '#ffffff';

      return { ...m, scoreVal, ballX, ballY, ptX, ptY, ballRadius, bg, textColor, cosA, sinA };
    });
  }, [normalizedScores, cx, cy, n]);

  const polygonPoints2D = modeData2D.map(m => `${m.ptX.toFixed(1)},${m.ptY.toFixed(1)}`).join(' ');
  const gridLevels2D = [2, 4, 6].map(lvl => {
    const ratio = lvl / 6;
    const pts = modeData2D.map(m => `${(cx + R_MAX * ratio * m.cosA).toFixed(1)},${(cy + R_MAX * ratio * m.sinA).toFixed(1)}`).join(' ');
    return { lvl, pts };
  });

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '700px', margin: '0 auto', userSelect: 'none' }}>
      
      {/* 2D / 3D Mode Bar & Camera Toolbar */}
      <div className="no-print" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', gap: '0.5rem', background: '#f8fafc', padding: '6px 12px', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
        
        {/* Toggle 2D vs 3D */}
        <div style={{ display: 'flex', background: '#e2e8f0', padding: '3px', borderRadius: '8px', gap: '3px' }}>
          <button
            onClick={() => setViewDimension('2d')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '5px 12px', borderRadius: '6px', border: 'none',
              background: viewDimension === '2d' ? '#3b82f6' : 'transparent',
              color: viewDimension === '2d' ? 'white' : '#475569',
              cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem',
              boxShadow: viewDimension === '2d' ? '0 2px 5px rgba(59, 130, 246, 0.25)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Eye size={15} /> 2D Plat
          </button>
          <button
            onClick={() => setViewDimension('3d')}
            style={{
              display: 'flex', alignItems: 'center', gap: '6px',
              padding: '5px 12px', borderRadius: '6px', border: 'none',
              background: viewDimension === '3d' ? '#3b82f6' : 'transparent',
              color: viewDimension === '3d' ? 'white' : '#475569',
              cursor: 'pointer', fontWeight: 'bold', fontSize: '0.85rem',
              boxShadow: viewDimension === '3d' ? '0 2px 5px rgba(59, 130, 246, 0.25)' : 'none',
              transition: 'all 0.15s ease'
            }}
          >
            <Rotate3d size={16} /> 3D Graph (Ruimtelijk)
          </button>
        </div>

        {/* 3D Controls (presets & auto-rotation) */}
        {viewDimension === '3d' && (
          <div style={{ display: 'flex', gap: '5px', alignItems: 'center', flexWrap: 'wrap' }}>
            <button
              onClick={() => { setPitch(48); setYaw(28); setZoom(1.0); }}
              style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', fontSize: '0.75rem', fontWeight: '600', color: '#475569', cursor: 'pointer' }}
              title="Herstel naar 3D perspectief"
            >
              Perspectief
            </button>
            <button
              onClick={() => { setPitch(85); setYaw(0); setZoom(0.95); }}
              style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', fontSize: '0.75rem', fontWeight: '600', color: '#475569', cursor: 'pointer' }}
              title="Kijk recht van bovenaf"
            >
              Bovenaanzicht
            </button>
            <button
              onClick={() => { setPitch(18); setYaw(45); setZoom(1.05); }}
              style={{ padding: '4px 8px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', fontSize: '0.75rem', fontWeight: '600', color: '#475569', cursor: 'pointer' }}
              title="Kijk van de zijkant naar de piekhoogtes"
            >
              Profiel
            </button>

            <div style={{ width: '1px', height: '18px', background: '#cbd5e1', margin: '0 2px' }} />

            {/* Auto-rotate toggle */}
            <button
              onClick={() => setAutoRotate(!autoRotate)}
              style={{
                display: 'flex', alignItems: 'center', gap: '4px',
                padding: '4px 8px', borderRadius: '6px',
                border: '1px solid ' + (autoRotate ? '#93c5fd' : '#cbd5e1'),
                background: autoRotate ? '#eff6ff' : 'white',
                color: autoRotate ? '#1d4ed8' : '#475569',
                fontSize: '0.75rem', fontWeight: '600', cursor: 'pointer'
              }}
              title={autoRotate ? "Pauzeer draaien" : "Start automatisch ronddraaien"}
            >
              {autoRotate ? <Pause size={12} /> : <Play size={12} />}
              {autoRotate ? 'Pauze' : 'Draaien'}
            </button>

            {/* Zoom */}
            <button
              onClick={() => setZoom(z => Math.max(0.7, z - 0.1))}
              style={{ padding: '4px 6px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Zoom uit"
            >
              <ZoomOut size={13} color="#475569" />
            </button>
            <button
              onClick={() => setZoom(z => Math.min(1.4, z + 0.1))}
              style={{ padding: '4px 6px', borderRadius: '6px', border: '1px solid #cbd5e1', background: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
              title="Zoom in"
            >
              <ZoomIn size={13} color="#475569" />
            </button>
          </div>
        )}
      </div>

      {/* Interactive 3D Canvas / SVG Container */}
      <div
        ref={containerRef}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          position: 'relative',
          width: '100%',
          cursor: viewDimension === '3d' ? (isDragging ? 'grabbing' : 'grab') : 'default',
          touchAction: viewDimension === '3d' ? 'none' : 'auto'
        }}
      >
        {/* Floating guidance hint for 3D */}
        {viewDimension === '3d' && (
          <div
            className="no-print"
            style={{
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              background: 'rgba(255, 255, 255, 0.88)',
              backdropFilter: 'blur(4px)',
              border: '1px solid #e2e8f0',
              padding: '3px 12px',
              borderRadius: '20px',
              fontSize: '0.75rem',
              color: '#64748b',
              pointerEvents: 'none',
              zIndex: 10,
              boxShadow: '0 2px 6px rgba(0,0,0,0.04)'
            }}
          >
            Sleep met de muis om de 3D-grafiek rondom te draaien en te kantelen
          </div>
        )}

        <svg
          viewBox={`0 0 ${size} ${size}`}
          style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
        >
          <defs>
            <filter id="radar3dBallShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="5" stdDeviation="5" floodOpacity="0.2" />
            </filter>
            <filter id="radar3dDotShadow" x="-40%" y="-40%" width="180%" height="180%">
              <feDropShadow dx="0" dy="3" stdDeviation="3" floodOpacity="0.3" />
            </filter>
            <radialGradient id="sphereLight" cx="35%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
              <stop offset="70%" stopColor="#ffffff" stopOpacity="0" />
              <stop offset="100%" stopColor="#000000" stopOpacity="0.2" />
            </radialGradient>
          </defs>

          {/* ===================== 3D VIEW RENDERING ===================== */}
          {viewDimension === '3d' && (
            <g className="radar-3d-scene">
              
              {/* 1. Floor Shadow of the score polygon */}
              <polygon
                points={floorShadowPoints}
                fill="rgba(30, 41, 59, 0.08)"
                stroke="none"
              />

              {/* 2. Concentric 3D Floor Grid Polygons */}
              {floorGridRings.map(({ lvl, pts }) => (
                <polygon
                  key={`floor-grid-${lvl}`}
                  points={pts}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1.2"
                />
              ))}

              {/* 3. Radial axes from center to each outer point on the floor */}
              {modes3D.map(m => (
                <line
                  key={`axis-${m.id}`}
                  x1={projCenter.screenX}
                  y1={projCenter.screenY}
                  x2={m.projBall.screenX}
                  y2={m.projBall.screenY}
                  stroke="#f1f5f9"
                  strokeWidth="1.8"
                />
              ))}

              {/* 4. Vertical 3D Pillars rising from floor up to the score peaks */}
              {modes3D.map(m => (
                <line
                  key={`pillar-${m.id}`}
                  x1={m.projGround.screenX}
                  y1={m.projGround.screenY}
                  x2={m.projPeak.screenX}
                  y2={m.projPeak.screenY}
                  stroke={m.bg}
                  strokeWidth="2"
                  strokeDasharray={m.scoreVal < 2 ? "2 2" : "none"}
                  opacity="0.75"
                />
              ))}

              {/* 5. Shaded 3D Facets (Crystal mountain canopy) */}
              {facets.map(({ pts, intensity, idx }) => (
                <polygon
                  key={`facet-${idx}`}
                  points={pts}
                  fill={`rgba(59, 130, 246, ${(0.16 + intensity * 0.28).toFixed(2)})`}
                  stroke="rgba(37, 99, 235, 0.45)"
                  strokeWidth="1"
                  strokeLinejoin="round"
                />
              ))}

              {/* 6. The prominent 3D boundary line connecting the peaks */}
              <polygon
                points={peakPolygonPoints}
                fill="none"
                stroke="#2563eb"
                strokeWidth="3.2"
                strokeLinejoin="round"
              />

              {/* 7. Central Apex Point */}
              <circle
                cx={projApex.screenX}
                cy={projApex.screenY}
                r={4.5 * projApex.scale}
                fill="#3b82f6"
                stroke="#ffffff"
                strokeWidth="1.5"
                filter="url(#radar3dDotShadow)"
              />

              {/* 8. Glowing 3D Score Vertex Dots */}
              {modes3D.map(m => (
                <g key={`dot-${m.id}`}>
                  <circle
                    cx={m.projPeak.screenX}
                    cy={m.projPeak.screenY}
                    r={6.5 * m.projPeak.scale}
                    fill={m.bg}
                    stroke="#ffffff"
                    strokeWidth="2.5"
                    filter="url(#radar3dDotShadow)"
                  />
                  {/* Sphere lighting highlight */}
                  <circle
                    cx={m.projPeak.screenX}
                    cy={m.projPeak.screenY}
                    r={6.5 * m.projPeak.scale}
                    fill="url(#sphereLight)"
                  />
                </g>
              ))}

              {/* 9. Depth-Sorted Outer 3D Mode Balls */}
              {depthSortedBalls.map(m => (
                <g
                  key={`ball-3d-${m.id}`}
                  transform={`translate(${m.projBall.screenX}, ${m.projBall.screenY})`}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => {
                    setHoveredNode(m.title);
                    setPopupFlipped(false);
                    setTimeout(() => setPopupFlipped(true), 150);
                  }}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  {/* Shadow */}
                  <circle
                    r={m.ballRadius}
                    fill={m.bg}
                    stroke="none"
                    filter="url(#radar3dBallShadow)"
                  />

                  {/* 3D Sphere Shading Highlight */}
                  <circle
                    r={m.ballRadius}
                    fill="url(#sphereLight)"
                  />

                  {/* Abbreviation (e.g. GV, OK, KK) */}
                  <text
                    textAnchor="middle"
                    y={m.scoreVal > 0 ? -1 : 5}
                    fill={m.textColor}
                    fontWeight="900"
                    fontSize={Math.max(10.5, m.ballRadius * 0.58)}
                    style={{ userSelect: 'none', letterSpacing: '0.4px' }}
                  >
                    {m.abbr}
                  </text>

                  {/* Score */}
                  {m.scoreVal > 0 && (
                    <text
                      textAnchor="middle"
                      y={m.ballRadius * 0.52}
                      fill={m.textColor}
                      fontWeight="bold"
                      fontSize={Math.max(8, m.ballRadius * 0.38)}
                      opacity={0.92}
                      style={{ userSelect: 'none' }}
                    >
                      {m.scoreVal.toFixed(1)}
                    </text>
                  )}
                </g>
              ))}
            </g>
          )}

          {/* ===================== 2D VIEW RENDERING ===================== */}
          {viewDimension === '2d' && (
            <g className="radar-2d-scene">
              {/* Concentric grid polygons */}
              {gridLevels2D.map(({ lvl, pts }) => (
                <polygon
                  key={`grid-2d-${lvl}`}
                  points={pts}
                  fill="none"
                  stroke="#e2e8f0"
                  strokeWidth="1.2"
                />
              ))}

              {/* Radial axes */}
              {modeData2D.map(m => (
                <line
                  key={`axis-2d-${m.id}`}
                  x1={cx}
                  y1={cy}
                  x2={m.ballX}
                  y2={m.ballY}
                  stroke="#f1f5f9"
                  strokeWidth="2"
                />
              ))}

              {/* Blue filled polygon */}
              <polygon
                points={polygonPoints2D}
                fill="#3b82f6"
                fillOpacity="0.25"
                stroke="#3b82f6"
                strokeWidth="3"
                strokeLinejoin="round"
              />

              {/* Vertex dots */}
              {modeData2D.map(m => (
                <circle
                  key={`pt-2d-${m.id}`}
                  cx={m.ptX}
                  cy={m.ptY}
                  r="6.5"
                  fill={m.bg}
                  stroke="#ffffff"
                  strokeWidth="2.5"
                  filter="url(#radar3dDotShadow)"
                />
              ))}

              {/* Mode Balls */}
              {modeData2D.map(m => (
                <g
                  key={`ball-2d-${m.id}`}
                  transform={`translate(${m.ballX}, ${m.ballY})`}
                  style={{ cursor: 'pointer' }}
                  onMouseEnter={() => {
                    setHoveredNode(m.title);
                    setPopupFlipped(false);
                    setTimeout(() => setPopupFlipped(true), 150);
                  }}
                  onMouseLeave={() => setHoveredNode(null)}
                >
                  <circle
                    r={m.ballRadius}
                    fill={m.bg}
                    stroke="none"
                    filter="url(#radar3dBallShadow)"
                  />
                  <text
                    textAnchor="middle"
                    y={m.scoreVal > 0 ? -1 : 5}
                    fill={m.textColor}
                    fontWeight="900"
                    fontSize={Math.max(11, m.ballRadius * 0.58)}
                    style={{ userSelect: 'none', letterSpacing: '0.5px' }}
                  >
                    {m.abbr}
                  </text>
                  {m.scoreVal > 0 && (
                    <text
                      textAnchor="middle"
                      y={m.ballRadius * 0.52}
                      fill={m.textColor}
                      fontWeight="bold"
                      fontSize={Math.max(8.5, m.ballRadius * 0.38)}
                      opacity={0.92}
                      style={{ userSelect: 'none' }}
                    >
                      {m.scoreVal.toFixed(1)}
                    </text>
                  )}
                </g>
              ))}
            </g>
          )}
        </svg>
      </div>

      {/* Hover Card Preview */}
      {hoveredNode && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            zIndex: 9999,
            pointerEvents: 'none',
            filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.4))'
          }}
        >
          <SchemaCard title={hoveredNode} isFlipped={popupFlipped} />
        </div>
      )}

      {/* Action button to proceed into Modus Web Casusconceptualisatie */}
      {showAction && (
        <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1.5rem', gap: '0.5rem' }}>
          <button
            onClick={handleOpenModusWeb}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              padding: '10px 22px',
              borderRadius: '8px',
              fontSize: '0.95rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 14px rgba(37, 99, 235, 0.28)',
              transition: 'all 0.2s ease'
            }}
          >
            <Share2 size={18} /> Open in Modus Web (Casusconceptualisatie / Netwerkmodel) →
          </button>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Draag deze scores over naar het netwerkmodel om interactief verbanden en moduscycli te tekenen.
          </span>
        </div>
      )}
    </div>
  );
}
