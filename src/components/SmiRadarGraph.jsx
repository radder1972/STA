import React, { useState, useMemo } from 'react';
import { Share2 } from 'lucide-react';
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

export default function SmiRadarGraph({ scores, rawAnswers, onOpenModusWeb, showAction = true }) {
  const [hoveredNode, setHoveredNode] = useState(null);
  const [popupFlipped, setPopupFlipped] = useState(false);

  // Normalize scores to a canonical dictionary
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

  // Dimensions for SVG canvas
  const size = 600;
  const cx = size / 2;
  const cy = size / 2;
  const R_MAX = 175; // outer radius of level 6
  const R_BALL = 240; // orbit radius of outer circular balls

  const n = MODES_INFO.length;

  // Compute angles & coordinates for the 14 modes
  const modeData = useMemo(() => {
    return MODES_INFO.map((m, idx) => {
      const angleDeg = -90 + idx * (360 / n);
      const angleRad = (angleDeg * Math.PI) / 180;
      const cosA = Math.cos(angleRad);
      const sinA = Math.sin(angleRad);

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

      return {
        ...m,
        scoreVal,
        angleDeg,
        cosA,
        sinA,
        ballX,
        ballY,
        ptX,
        ptY,
        ballRadius,
        bg,
        textColor
      };
    });
  }, [normalizedScores, cx, cy, R_MAX, R_BALL, n]);

  // Polygon connecting the score points
  const polygonPoints = modeData.map(m => `${m.ptX.toFixed(1)},${m.ptY.toFixed(1)}`).join(' ');

  // Concentric grid polygons (levels 2, 4, 6)
  const gridLevels = [2, 4, 6].map(lvl => {
    const ratio = lvl / 6;
    const pts = modeData.map(m => {
      const gx = cx + (R_MAX * ratio) * m.cosA;
      const gy = cy + (R_MAX * ratio) * m.sinA;
      return `${gx.toFixed(1)},${gy.toFixed(1)}`;
    }).join(' ');
    return { lvl, pts };
  });

  return (
    <div style={{ position: 'relative', width: '100%', maxWidth: '640px', margin: '0 auto' }}>
      <svg
        viewBox={`0 0 ${size} ${size}`}
        style={{ width: '100%', height: 'auto', display: 'block', overflow: 'visible' }}
      >
        <defs>
          <filter id="radarBallShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="4" stdDeviation="4" floodOpacity="0.16" />
          </filter>
          <filter id="radarDotShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="2" stdDeviation="2.5" floodOpacity="0.25" />
          </filter>
        </defs>

        {/* Concentric grid polygons */}
        {gridLevels.map(({ lvl, pts }) => (
          <polygon
            key={`grid-${lvl}`}
            points={pts}
            fill="none"
            stroke="#e2e8f0"
            strokeWidth="1.2"
          />
        ))}

        {/* Radial axes from center to each outer mode */}
        {modeData.map(m => (
          <line
            key={`axis-${m.id}`}
            x1={cx}
            y1={cy}
            x2={m.ballX}
            y2={m.ballY}
            stroke="#f1f5f9"
            strokeWidth="2"
          />
        ))}

        {/* The blue filled data polygon */}
        <polygon
          points={polygonPoints}
          fill="#3b82f6"
          fillOpacity="0.25"
          stroke="#3b82f6"
          strokeWidth="3"
          strokeLinejoin="round"
        />

        {/* Glowing score vertex dots */}
        {modeData.map(m => (
          <circle
            key={`pt-${m.id}`}
            cx={m.ptX}
            cy={m.ptY}
            r="6.5"
            fill={m.bg}
            stroke="#ffffff"
            strokeWidth="2.5"
            filter="url(#radarDotShadow)"
          />
        ))}

        {/* Outer Mode Balls */}
        {modeData.map(m => (
          <g
            key={`ball-${m.id}`}
            transform={`translate(${m.ballX}, ${m.ballY})`}
            style={{ cursor: 'pointer' }}
            onMouseEnter={() => {
              setHoveredNode(m.title);
              setPopupFlipped(false);
              setTimeout(() => setPopupFlipped(true), 150);
            }}
            onMouseLeave={() => setHoveredNode(null)}
          >
            {/* Circular bubble */}
            <circle
              r={m.ballRadius}
              fill={m.bg}
              stroke="rgba(255,255,255,0.6)"
              strokeWidth="2"
              filter="url(#radarBallShadow)"
            />

            {/* Abbreviation (e.g. GV, KK, WK) */}
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

            {/* Score formatted to 1 decimal place */}
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
      </svg>

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
            <Share2 size={18} /> Open in Modus Web (Casusconceptualisatie / Graph) →
          </button>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', textAlign: 'center' }}>
            Draag deze scores direct over naar het interactieve netwerkmodel om verbanden en moduscycli te tekenen.
          </span>
        </div>
      )}
    </div>
  );
}
