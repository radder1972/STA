import React, { useState, useRef, useEffect } from 'react';
import { Share2, MousePointer2, Trash2, Info } from 'lucide-react';

const MODES = [
  { id: 'gv', title: 'Gezonde volwassene', category: 'gezond', x: 50, y: 10 },
  { id: 'bk', title: 'Blije kind', category: 'gezond', x: 50, y: 90 },
  
  { id: 'so', title: 'Straffende ouder', category: 'ouder', x: 80, y: 25 },
  { id: 'vo', title: 'Veeleisende ouder', category: 'ouder', x: 80, y: 40 },
  
  { id: 'boos_k', title: 'Boze kind', category: 'kind', x: 80, y: 65 },
  { id: 'ik', title: 'Impulsieve kind', category: 'kind', x: 80, y: 75 },
  { id: 'kk', title: 'Kwetsbare kind', category: 'kind', x: 80, y: 85 },
  
  { id: 'zv', title: 'Zelfverheerlijker', category: 'coping', x: 20, y: 25 },
  { id: 'ob', title: 'Onthechte beschermer', category: 'coping', x: 25, y: 35 },
  { id: 'bob', title: 'Boze beschermer', category: 'coping', x: 25, y: 45 },
  { id: 'pa', title: 'Pest en aanval', category: 'coping', x: 20, y: 55 },
  { id: 'poc', title: 'Perfectionistische overcontroleerder', category: 'coping', x: 20, y: 65 },
  { id: 'woc', title: 'Wantrouwende overcontroleerder', category: 'coping', x: 20, y: 72 },
  { id: 'oz', title: 'Onthechte zelfsusser', category: 'coping', x: 25, y: 80 },
  { id: 'wi', title: 'Willoze inschikkelijke', category: 'coping', x: 20, y: 88 },
];

const CATEGORY_COLORS = {
  gezond: '#34d399',
  ouder: '#f87171',
  kind: '#60a5fa',
  coping: '#facc15'
};

export default function ModusWeb() {
  const [interactionMode, setInteractionMode] = useState('size'); // 'size', 'connect'
  const [sizes, setSizes] = useState({});
  const [connections, setConnections] = useState([]);
  const [connectingFrom, setConnectingFrom] = useState(null);
  
  const containerRef = useRef(null);
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
    
    // Slight delay to ensure DOM is fully painted
    const timer = setTimeout(updatePositions, 100);
    return () => {
      window.removeEventListener('resize', updatePositions);
      clearTimeout(timer);
    };
  }, [sizes]);

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

  const getNodeScale = (sizeIndex) => {
    switch(sizeIndex) {
      case 2: return 1.3;
      case 3: return 1.6;
      case 4: return 2.0;
      default: return 1.0;
    }
  };

  const clearAll = () => {
    if (window.confirm("Wil je alle pijlen en bolgroottes wissen?")) {
      setSizes({});
      setConnections([]);
      setConnectingFrom(null);
    }
  };

  return (
    <div className="modus-web-container" style={{ display: 'flex', flexDirection: 'column', minHeight: '80vh', background: '#f8fafc', padding: '1rem', fontFamily: 'inherit' }}>
      
      {/* Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1rem 1.5rem', borderRadius: '12px', boxShadow: '0 2px 10px rgba(0,0,0,0.05)', marginBottom: '1rem', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Share2 size={24} color="#3b82f6" /> Casusconceptualisatie (Modus Web)
          </h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '0.85rem', color: '#64748b' }}>Klik op bollen om ze te vergroten, of trek pijlen om het patroon (de moduscyclus) in kaart te brengen.</p>
        </div>
        
        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => { setInteractionMode('size'); setConnectingFrom(null); }}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: interactionMode === 'size' ? '#3b82f6' : '#e2e8f0', color: interactionMode === 'size' ? 'white' : '#475569', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            <MousePointer2 size={16} /> Grootte (Intensiteit)
          </button>
          
          <button 
            onClick={() => setInteractionMode('connect')}
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '0.5rem 1rem', borderRadius: '8px', border: 'none', background: interactionMode === 'connect' ? '#3b82f6' : '#e2e8f0', color: interactionMode === 'connect' ? 'white' : '#475569', cursor: 'pointer', fontWeight: 'bold', fontSize: '0.9rem' }}
          >
            <Share2 size={16} /> Relaties (Pijlen)
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
      <div ref={containerRef} style={{ flex: 1, position: 'relative', background: 'white', borderRadius: '12px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)', overflow: 'hidden', minHeight: '600px' }}>
        
        {/* SVG Layer for Lines */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9.5" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
          </defs>
          
          {/* Wavy center line (decorative) */}
          <path d="M 50% 15% Q 45% 30% 50% 50% T 50% 85%" fill="transparent" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6,6" />

          {/* Connection Lines */}
          {connections.map((conn, idx) => {
            const p1 = nodePositions[conn.from];
            const p2 = nodePositions[conn.to];
            if (!p1 || !p2) return null;
            
            const dx = p2.x - p1.x;
            const dy = p2.y - p1.y;
            const dist = Math.sqrt(dx*dx + dy*dy);
            
            // Adjust endpoint so arrow doesn't hide under the ball
            const targetSize = sizes[conn.to] || 1;
            const radiusEstimates = { 1: 50, 2: 65, 3: 80, 4: 100 };
            const targetRadius = radiusEstimates[targetSize] || 50;
            
            // Start point slightly offset from center
            const startRadius = radiusEstimates[sizes[conn.from] || 1] || 50;
            const sX = p1.x + (dx/dist)*startRadius;
            const sY = p1.y + (dy/dist)*startRadius;

            const rX = p2.x - (dx/dist)*(targetRadius + 5);
            const rY = p2.y - (dy/dist)*(targetRadius + 5);

            if (dist < startRadius + targetRadius) return null; // Too close

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
          
          return (
            <div
              key={mode.id}
              id={`node-${mode.id}`}
              onClick={() => handleNodeClick(mode.id)}
              style={{
                position: 'absolute',
                left: `${mode.x}%`,
                top: `${mode.y}%`,
                transform: `translate(-50%, -50%) scale(${scale})`,
                background: CATEGORY_COLORS[mode.category],
                color: mode.category === 'coping' ? '#451a03' : 'white', // Darker text for yellow coping
                padding: '0.6rem 1rem',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: '700',
                textAlign: 'center',
                boxShadow: isSelected ? `0 0 0 3px white, 0 0 0 6px #3b82f6` : '0 4px 10px rgba(0,0,0,0.12)',
                cursor: 'pointer',
                transition: 'all 0.2s ease-out',
                zIndex: 2,
                maxWidth: '140px',
                whiteSpace: 'normal',
                lineHeight: 1.15,
                userSelect: 'none'
              }}
            >
              {mode.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
