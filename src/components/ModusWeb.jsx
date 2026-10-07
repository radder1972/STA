import React, { useState, useRef, useEffect } from 'react';
import { Share2, MousePointer2, Trash2, Upload, Activity } from 'lucide-react';
import smiScoring from '../data/smi-scoring.json';

const MODES = [
  { id: 'gv', title: 'Gezonde volwassene', category: 'gezond', x: 50, y: 12 },
  
  { id: 'so', title: 'Straffende ouder', category: 'ouder', x: 80, y: 25 },
  { id: 'vo', title: 'Veeleisende ouder', category: 'ouder', x: 80, y: 40 },
  
  { id: 'rk', title: 'Razende kind', category: 'kind', x: 74, y: 58 },
  { id: 'boos_k', title: 'Boze kind', category: 'kind', x: 86, y: 65 },
  { id: 'ik', title: 'Impulsieve kind', category: 'kind', x: 74, y: 72 },
  { id: 'ok', title: 'Ongedisciplineerde kind', category: 'kind', x: 86, y: 79 },
  { id: 'kk', title: 'Kwetsbare kind', category: 'kind', x: 74, y: 86 },
  
  { id: 'bk', title: 'Blije kind', category: 'gezond', x: 50, y: 94 },
  
  // Overcompensatie
  { id: 'zh', title: 'Zelfverheerlijker', category: 'coping', x: 20, y: 23 },
  { id: 'pa', title: 'Pest en aanval', category: 'coping', x: 24, y: 33 },
  { id: 'poc', title: 'Perfectionistische overcontroleerder', category: 'coping', x: 20, y: 43 },
  { id: 'woc', title: 'Wantrouwende overcontroleerder', category: 'coping', x: 24, y: 53 },
  
  // Vermijding
  { id: 'ob', title: 'Onthechte beschermer', category: 'coping', x: 20, y: 68 },
  { id: 'bob', title: 'Boze beschermer', category: 'coping', x: 24, y: 77 },
  { id: 'oz', title: 'Onthechte zelfsusser', category: 'coping', x: 20, y: 86 },
  
  // Overgave
  { id: 'wi', title: 'Willoze inschikkelijke', category: 'coping', x: 25, y: 95 },
];

const SMI_MAPPING = {
  'gv': 'gv', 'bk': 'bk', 'so': 'so', 'vo': 'vo', 'rk': 'rk', 'boos_k': 'wk', 'ik': 'ik', 'ok': 'ok', 'kk': 'kk',
  'zh': 'zh', 'ob': 'ob', 'bob': 'vst_m_bob', 'pa': 'pa', 'poc': 'vst_m_po', 'woc': 'woc', 'oz': 'oz', 'wi': 'wi'
};

const DEFAULT_SMI_DATA = {"1":4,"2":2,"3":3,"4":5,"5":1,"6":4,"7":3,"8":4,"9":4,"10":2,"11":3,"12":2,"13":5,"14":1,"15":3,"16":2,"17":1,"19":2,"20":5,"21":5,"22":3,"23":4,"24":1,"25":3,"26":3,"27":4,"28":2,"29":3,"30":3,"31":4,"32":4,"33":2,"34":4,"35":3,"36":2,"37":4,"38":3,"39":5,"40":2,"42":1,"43":2,"44":1,"45":2,"46":2,"47":2,"48":5,"49":5,"50":3,"51":1,"52":3,"53":1,"54":3,"55":5,"56":3,"57":1,"58":3,"59":4,"60":3,"61":5,"62":2,"63":3,"65":2,"66":4,"67":2,"68":1,"69":3,"70":1,"71":3,"72":3,"73":2,"74":2,"75":4,"76":3,"77":5,"78":5,"79":4,"80":2,"81":2,"82":5,"83":4,"84":5,"85":4,"86":4,"88":1,"89":1,"90":1,"91":2,"92":1,"93":2,"94":1,"95":1,"96":3,"97":1,"98":3,"99":4,"100":6,"101":5,"102":4,"103":6,"104":1,"105":4,"106":4,"107":3,"108":2,"109":1,"111":3,"112":2,"113":5,"114":6,"115":3,"116":1,"117":1,"118":2};

const CATEGORY_COLORS = {
  gezond: '#34d399',
  ouder: '#f87171',
  kind: '#60a5fa',
  coping: '#facc15'
};

const RADAR_ORDER = ['gv', 'bk', 'kk', 'rk', 'boos_k', 'ik', 'ok', 'wi', 'ob', 'oz', 'zh', 'pa', 'so', 'vo'];



const getAbbreviation = (id) => {
  const map = {
    'gv': 'GV', 'bk': 'BK', 'kk': 'KK', 'rk': 'RK', 'boos_k': 'WK', 'ik': 'IK', 'ok': 'OK',
    'wi': 'WI', 'ob': 'OB', 'oz': 'OZ', 'zh': 'ZH', 'pa': 'PA', 'so': 'SO', 'vo': 'VO',
    'woc': 'WOC', 'poc': 'POC', 'bob': 'BOB'
  };
  return map[id] || id.toUpperCase();
};

const formatTitle = (title) => {
  if (title === 'Pest en aanval') return <><span style={{display: 'block'}}>Pest en</span><span style={{display: 'block'}}>aanval</span></>;
  if (title === 'Zelfverheerlijker') return <span style={{display: 'block'}}>Zelfverheerlijker</span>;
  if (title.includes(' ')) {
    const parts = title.split(' ');
    return (
      <>
        <span style={{display: 'block'}}>{parts[0]}</span>
        <span style={{display: 'block'}}>{parts.slice(1).join(' ')}</span>
      </>
    );
  }
  return <span style={{display: 'block'}}>{title}</span>;
};

export default function ModusWeb() {
  const [interactionMode, setInteractionMode] = useState('size');
  const [sizes, setSizes] = useState({});
  const [connections, setConnections] = useState([]);
  const [connectingFrom, setConnectingFrom] = useState(null);
  
  const [radarScores, setRadarScores] = useState({});
  
  const [hoveredNode, setHoveredNode] = useState(null);
  const [popupFlipped, setPopupFlipped] = useState(false);
  const [showRadar, setShowRadar] = useState(false);
  
  const containerRef = useRef(null);
  const fileInputRef = useRef(null);
  const [nodePositions, setNodePositions] = useState({});

  const updatePositions = () => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const newPositions = {};
    MODES.forEach(m => {
      const el = document.getElementById(`node-${m.id}`);
      if (el) {
        const elRect = el.getBoundingClientRect();
        newPositions[m.id] = {
          x: elRect.left - rect.left + elRect.width / 2,
          y: elRect.top - rect.top + elRect.height / 2
        };
      }
    });
    setNodePositions(newPositions);
  };

  useEffect(() => {
    updatePositions();
    window.addEventListener('resize', updatePositions);
    const timer = setTimeout(updatePositions, 100);
    return () => {
      window.removeEventListener('resize', updatePositions);
      clearTimeout(timer);
    };
  }, [sizes, showRadar]);

  useEffect(() => {
    calculateScores(DEFAULT_SMI_DATA);
  }, []);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n');
      let importedSmi = {};
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        if (parts.length >= 3 && parts[0] === 'SMI') {
          const qId = parseInt(parts[1], 10);
          const score = parseInt(parts[2], 10);
          if (!isNaN(qId) && !isNaN(score)) {
            importedSmi[qId] = score;
          }
        }
      }
      
      calculateScores(importedSmi);
      e.target.value = ''; // Reset
    };
    reader.readAsText(file);
  };

  const calculateScores = (smiData) => {
    const newSizes = { ...sizes };
    const rScores = {};

    MODES.forEach(mDef => {
      const modeId = mDef.id;
      const smiKey = SMI_MAPPING[modeId] || modeId;
      const items = smiScoring[smiKey];
      
      let mean = 0;
      if (items && items.length > 0) {
        let sum = 0;
        let count = 0;
        items.forEach(qId => {
          if (smiData[qId] !== undefined) {
            sum += smiData[qId];
            count++;
          }
        });
        mean = count > 0 ? (sum / count) : 0;
      } else {
        mean = 0; // Not a standard SMI mode
      }
      
      if (mean > 0) {
        rScores[modeId] = parseFloat(mean.toFixed(1));
      }

      if (mean >= 4.5) newSizes[modeId] = 4;
      else if (mean >= 3.5) newSizes[modeId] = 3;
      else if (mean >= 2.5) newSizes[modeId] = 2;
      else newSizes[modeId] = 1;
    });

    setSizes(newSizes);
    setRadarScores(rScores);
    setShowRadar(true);
    setInteractionMode('size');
  };

  const handleNodeClick = (modeId) => {
    if (interactionMode === 'size') {
      setSizes(prev => {
        const current = prev[modeId] || 1;
        return { ...prev, [modeId]: current >= 4 ? 1 : current + 1 };
      });
    } else if (interactionMode === 'connect') {
      if (connectingFrom === null) {
        setConnectingFrom(modeId);
      } else {
        if (connectingFrom !== modeId) {
          const exists = connections.some(c => c.from === connectingFrom && c.to === modeId);
          if (exists) {
            setConnections(connections.filter(c => !(c.from === connectingFrom && c.to === modeId)));
          } else {
            setConnections([...connections, { from: connectingFrom, to: modeId }]);
          }
        }
        setConnectingFrom(null);
      }
    }
  };

  const getNodeScale = (sizeIndex, modeId) => {
    // If we have an exact score from the radar, calculate a continuous, precise scale!
    if (showRadar && radarScores[modeId] > 0) {
      const score = radarScores[modeId];
      // Keep pills relatively small in radar view to prevent heavy overlap
      // Score 1 -> scale 0.85, Score 6 -> scale 1.15
      return 0.85 + (score - 1) * 0.06;
    }
    // Manual fallback for click sizes
    switch(sizeIndex) {
      case 2: return 1.15;
      case 3: return 1.35;
      case 4: return 1.55;
      default: return 1.0;
    }
  };

const clearAll = () => {
    if (window.confirm("Wil je alle pijlen, bolgroottes en import-data wissen?")) {
      setSizes({});
      setConnections([]);
      setConnectingFrom(null);
      setRadarScores({});
      setShowRadar(false);
      setShowBlijeKind(false);
    }
  };

    // Calculate angle based on the official 14 modes for the background grid
  const modesForGrid = MODES
    .filter(m => {
      const trueBase14 = ['gv', 'bk', 'kk', 'rk', 'boos_k', 'ik', 'ok', 'wi', 'ob', 'oz', 'zh', 'pa', 'so', 'vo'];
      return trueBase14.includes(m.id);
    })
    .sort((a, b) => RADAR_ORDER.indexOf(a.id) - RADAR_ORDER.indexOf(b.id));
    
  const modesForData = modesForGrid; // Make sure EVERY label has a point on the blue polygon

  const getModePosition = (modeId) => {
    if (!showRadar) {
      const m = MODES.find(m => m.id === modeId);
      return { x: m.x, y: m.y };
    }
    
    const index = modesForGrid.findIndex(m => m.id === modeId);
    if (index === -1) return { x: 50, y: 50 };
    
    const angleDeg = -90 + (index * (360 / modesForGrid.length));
    const angleRad = (angleDeg * Math.PI) / 180;
    const CIRCLE_RADIUS = 30; // 30% radius for small balls
    return {
      x: 50 + CIRCLE_RADIUS * Math.cos(angleRad),
      y: 50 + CIRCLE_RADIUS * Math.sin(angleRad)
    };
  };

  // --- Custom Radar SVG Logic ---
  const w = containerRef.current ? containerRef.current.clientWidth : 800;
  const h = containerRef.current ? containerRef.current.clientHeight : 650;
  const cx = w / 2;
  const cy = h / 2;
  
  const getRadarPoint = (modeId, scoreVal) => {
    const pos = getModePosition(modeId);
    
    // Convert percentage x/y to pixels
    const pxBase = (pos.x * w) / 100;
    const pyBase = (pos.y * h) / 100;
    
    // Scale distance based on score (0 to 6)
    const ratio = Math.min(Math.max(scoreVal / 6, 0), 1);
    const px = cx + (pxBase - cx) * ratio;
    const py = cy + (pyBase - cy) * ratio;
    return `${px},${py}`;
  };

  // Generate polygon points for the actual data (excluding modes with no score)

  const dataPolygonPoints = modesForData.map(m => getRadarPoint(m.id, radarScores[m.id] || 0)).join(' ');

  // Generate background grid polygons (levels 2, 4, 6)
  const gridPoints6 = modesForGrid.map(m => getRadarPoint(m.id, 6)).join(' ');
  const gridPoints4 = modesForGrid.map(m => getRadarPoint(m.id, 4)).join(' ');
  const gridPoints2 = modesForGrid.map(m => getRadarPoint(m.id, 2)).join(' ');

  return (
    <div className="modus-web-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', background: '#f8fafc', padding: '1rem', fontFamily: 'inherit' }}>
      
      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1rem 1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '1rem', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Share2 size={24} color="#3b82f6" /> Casusconceptualisatie (Modus Web)
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>Teken het patroon of importeer SMI testdata om direct het Spinnenweb te genereren.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          
          <button 
            onClick={() => fileInputRef.current?.click()}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #10b981', background: '#ecfdf5', color: '#047857', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            <Upload size={16} /> Importeer CSV (SMI)
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={handleFileUpload} 
            accept=".csv" 
            style={{ display: 'none' }} 
          />

          {Object.keys(radarScores).length > 0 && (
            <button 
              onClick={() => setShowRadar(!showRadar)}
              style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: showRadar ? '#8b5cf6' : '#ede9fe', color: showRadar ? 'white' : '#6d28d9', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}
            >
              <Activity size={16} /> {showRadar ? 'Verberg Spinnenweb' : 'Toon Spinnenweb'}
            </button>
          )}

          <div style={{ width: '1px', background: '#e2e8f0', margin: '0 4px' }}></div>
          
          <button 
            onClick={() => { setInteractionMode('size'); setConnectingFrom(null); }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: interactionMode === 'size' ? '#3b82f6' : '#e2e8f0', color: interactionMode === 'size' ? 'white' : '#475569', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            <MousePointer2 size={16} /> Grootte
          </button>
          
          <button 
            onClick={() => setInteractionMode('connect')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: interactionMode === 'connect' ? '#3b82f6' : '#e2e8f0', color: interactionMode === 'connect' ? 'white' : '#475569', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            <Share2 size={16} /> Pijlen
          </button>
          
          <button 
            onClick={clearAll}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', borderRadius: '8px', border: '1px solid #cbd5e1', background: 'white', color: '#ef4444', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem', marginLeft: '0.5rem' }}
          >
            <Trash2 size={16} />
          </button>
        </div>
      </div>

      {/* Canvas */}
      <div ref={containerRef} style={{ flex: 1, position: 'relative', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden', minHeight: '650px', display: 'flex' }}>
        
        
        {/* Subcategory Background Labels */}
        {!showRadar && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 0 }}>
            {/* Overcompensatie */}
            <div style={{ position: 'absolute', left: '4%', top: '38%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'left center', fontSize: '1.4rem', fontWeight: '800', color: '#fef08a', opacity: 0.7, letterSpacing: '0.2em', textTransform: 'uppercase', lineHeight: '1.1' }}>
              Overcompensatie
            </div>
            
            {/* Vermijding */}
            <div style={{ position: 'absolute', left: '4%', top: '77%', transform: 'translateY(-50%) rotate(-90deg)', transformOrigin: 'left center', fontSize: '1.4rem', fontWeight: '800', color: '#fef08a', opacity: 0.7, letterSpacing: '0.2em', textTransform: 'uppercase', lineHeight: '1.1' }}>
              Vermijding
            </div>
            
            {/* Overgave */}
            <div style={{ position: 'absolute', left: '7%', top: '96%', transform: 'translateY(-50%)', transformOrigin: 'left center', fontSize: '1.1rem', fontWeight: '800', color: '#fef08a', opacity: 0.7, letterSpacing: '0.2em', textTransform: 'uppercase', lineHeight: '1.1' }}>
              Overgave
            </div>
            
            {/* Oudermodi */}
            <div style={{ position: 'absolute', right: '3%', top: '32%', transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'right center', fontSize: '1.4rem', fontWeight: '800', color: '#fecaca', opacity: 0.6, letterSpacing: '0.2em', textTransform: 'uppercase', lineHeight: '1.1' }}>
              Oudermodi
            </div>
            
            {/* Kindmodi */}
            <div style={{ position: 'absolute', right: '3%', top: '75%', transform: 'translateY(-50%) rotate(90deg)', transformOrigin: 'right center', fontSize: '1.4rem', fontWeight: '800', color: '#bfdbfe', opacity: 0.6, letterSpacing: '0.2em', textTransform: 'uppercase', lineHeight: '1.1' }}>
              Kindmodi
            </div>
          </div>
        )}

        {/* SVG Layer for EVERYTHING (Radar + Custom Lines) */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9.5" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
          </defs>
          
          {/* Custom Spider Web (Radar) */}
          {showRadar && Object.keys(radarScores).length > 0 && Object.keys(nodePositions).length > 0 && (
            <g className="custom-radar">
              {/* Grid Background Polygons */}
              <polygon points={gridPoints6} fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <polygon points={gridPoints4} fill="none" stroke="#e2e8f0" strokeWidth="1" />
              <polygon points={gridPoints2} fill="none" stroke="#e2e8f0" strokeWidth="1" />
              
              {/* Axes lines from center to nodes */}
              {modesForGrid.map(m => {
                const pos = getModePosition(m.id);
                const px = (pos.x * w) / 100;
                const py = (pos.y * h) / 100;
                return <line key={`axis-${m.id}`} x1={cx} y1={cy} x2={px} y2={py} stroke="#f1f5f9" strokeWidth="2" />;
              })}

              {/* The Actual Data Polygon */}
              <polygon 
                points={dataPolygonPoints} 
                fill="#3b82f6" 
                fillOpacity="0.25" 
                stroke="#3b82f6" 
                strokeWidth="3" 
                strokeLinejoin="round" 
              />
              
              {/* Data Points */}
              {modesForData.map(m => {
                const score = radarScores[m.id] || 0;
                const pt = getRadarPoint(m.id, score).split(',');
                return <circle key={`pt-${m.id}`} cx={pt[0]} cy={pt[1]} r="7" fill={CATEGORY_COLORS[m.category]} stroke="white" strokeWidth="2.5" style={{ filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.25))' }} />;
              })}
            </g>
          )}

          {/* Wavy center line (decorative) - Only show if not drawing spider web */}
          {!showRadar && (
             <path d="M 50% 15% Q 45% 30% 50% 50% T 50% 85%" fill="transparent" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6,6" />
          )}

          {/* Connection Lines (User drawn) */}
          {connections.map((conn, idx) => {
            const m1 = MODES.find(m => m.id === conn.from);
            const m2 = MODES.find(m => m.id === conn.to);
            if (!m1 || !m2) return null;
            if (showRadar && (!(radarScores[m1.id] > 0) || !(radarScores[m2.id] > 0))) return null;
            
            const pos1 = getModePosition(m1.id);
            const pos2 = getModePosition(m2.id);
            const p1 = { x: (pos1.x * w) / 100, y: (pos1.y * h) / 100 };
            const p2 = { x: (pos2.x * w) / 100, y: (pos2.y * h) / 100 };
            
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            const targetSize = sizes[conn.to] || 1;
            const radiusEstimates = { 1: 50, 2: 65, 3: 80, 4: 100 };
            const targetRadius = radiusEstimates[targetSize] || 50;
            
            const startRadius = radiusEstimates[sizes[conn.from] || 1] || 50;
            const sX = p1.x + (dx/dist)*startRadius;
            const sY = p1.y + (dy/dist)*startRadius;

            const rX = p2.x - (dx/dist)*(targetRadius + 5);
            const rY = p2.y - (dy/dist)*(targetRadius + 5);

            if (dist < startRadius + targetRadius) return null; 

            return (
              <line 
                key={idx} 
                x1={sX} y1={sY} 
                x2={rX} y2={rY} 
                stroke="#64748b" 
                strokeWidth="2.5" 
                markerEnd="url(#arrowhead)" 
              />
            );
          })}
        </svg>

        {/* Nodes */}
        {MODES.map(mode => {
          const sizeIndex = sizes[mode.id] || 1;
          const scale = getNodeScale(sizeIndex);
          const isSelected = connectingFrom === mode.id;
          
          const pos = getModePosition(mode.id);
          const hasScore = radarScores[mode.id] > 0;
          
          if (showRadar) {
            const trueBase14 = ['gv', 'bk', 'kk', 'rk', 'boos_k', 'ik', 'ok', 'wi', 'ob', 'oz', 'zh', 'pa', 'so', 'vo'];
            if (!trueBase14.includes(mode.id)) return null;
          }
          
          return (
            <div
              key={mode.id}
              id={`node-${mode.id}`}
              onMouseEnter={() => {
                setHoveredNode(mode.title);
                setPopupFlipped(false);
                setTimeout(() => setPopupFlipped(true), 150);
              }}
              onMouseLeave={() => setHoveredNode(null)}
              onClick={() => handleNodeClick(mode.id)}
              onDoubleClick={(e) => {
                if (mode.id === 'gv' && showRadar) {
                  e.stopPropagation();
                  setShowBlijeKind(prev => !prev);
                }
              }}
              style={{
                position: 'absolute',
                left: `${pos.x}%`,
                top: `${pos.y}%`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                background: CATEGORY_COLORS[mode.category],
                color: mode.category === 'coping' ? '#451a03' : 'white',
                width: '42px',
                height: '42px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%',
                fontWeight: '900',
                fontSize: '1.1rem',
                textAlign: 'center',
                boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
                border: '2px solid rgba(255,255,255,0.4)',
                boxShadow: isSelected ? `0 0 0 3px white, 0 0 0 6px #3b82f6` : '0 4px 10px rgba(0,0,0,0.12)',
                cursor: 'pointer',
                transition: 'all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)',
                zIndex: 2,
                maxWidth: '140px',
                whiteSpace: 'normal',
                lineHeight: 1.15,
                userSelect: 'none'
              }}
            >
              {getAbbreviation(mode.id)}
              {showRadar && radarScores[mode.id] !== undefined && (
                <div style={{ fontSize: '0.65rem', opacity: 0.8, marginTop: '2px', fontWeight: 'normal' }}>
                  {radarScores[mode.id]}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
