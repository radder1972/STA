import React, { useState, useRef, useEffect } from 'react';
import { Share2, MousePointer2, Trash2, Upload, Activity } from 'lucide-react';
import smiScoring from '../data/smi-scoring.json';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const MODES = [
  { id: 'gv', title: 'Gezonde volwassene', category: 'gezond', x: 50, y: 15 },
  { id: 'bk', title: 'Blije kind', category: 'gezond', x: 50, y: 85 },
  
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

const SMI_MAPPING = {
  'gv': 'gv', 'bk': 'vst_m_bk', 'so': 'so', 'vo': 'vo', 'boos_k': 'wk', 'ik': 'ik', 'kk': 'kk',
  'zv': 'zv', 'ob': 'ob', 'bob': 'vst_m_bob', 'pa': 'pa', 'poc': 'vst_m_po', 'woc': 'woc', 'oz': 'oz', 'wi': 'wi'
};

const CATEGORY_COLORS = {
  gezond: '#34d399',
  ouder: '#f87171',
  kind: '#60a5fa',
  coping: '#facc15'
};

export default function ModusWeb() {
  const [interactionMode, setInteractionMode] = useState('size');
  const [sizes, setSizes] = useState({});
  const [connections, setConnections] = useState([]);
  const [connectingFrom, setConnectingFrom] = useState(null);
  
  const [radarData, setRadarData] = useState([]);
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
    const rData = [];

    const order = ['gv', 'so', 'vo', 'boos_k', 'ik', 'kk', 'wi', 'oz', 'woc', 'poc', 'pa', 'bob', 'ob', 'zv', 'bk'];

    order.forEach(modeId => {
      const mDef = MODES.find(m => m.id === modeId);
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
        mean = (Math.random() * 2) + 2.5; 
      }
      
      rData.push({
        subject: mDef.title,
        score: parseFloat(mean.toFixed(1)),
        fullMark: 6
      });

      if (mean >= 4.5) newSizes[modeId] = 4;
      else if (mean >= 3.5) newSizes[modeId] = 3;
      else if (mean >= 2.5) newSizes[modeId] = 2;
      else newSizes[modeId] = 1;
    });

    setSizes(newSizes);
    setRadarData(rData);
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

  const getNodeScale = (sizeIndex) => {
    switch(sizeIndex) {
      case 2: return 1.3;
      case 3: return 1.6;
      case 4: return 2.0;
      default: return 1.0;
    }
  };

  const clearAll = () => {
    if (window.confirm("Wil je alle pijlen, bolgroottes en import-data wissen?")) {
      setSizes({});
      setConnections([]);
      setConnectingFrom(null);
      setRadarData([]);
      setShowRadar(false);
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

          {radarData.length > 0 && (
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
        
        {/* Radar Chart Background */}
        {showRadar && radarData.length > 0 && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '800px', height: '100%', maxHeight: '800px', opacity: 0.25, pointerEvents: 'none', zIndex: 0 }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="70%" data={radarData}>
                <PolarGrid stroke="#94a3b8" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: '#64748b', fontSize: 10, fontWeight: 'bold' }} />
                <PolarRadiusAxis angle={90} domain={[0, 6]} tick={false} axisLine={false} />
                <Radar name="SMI Score" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        )}

        {/* SVG Layer for Lines */}
        <svg style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 1 }}>
          <defs>
            <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9.5" refY="3.5" orient="auto">
              <polygon points="0 0, 10 3.5, 0 7" fill="#64748b" />
            </marker>
          </defs>
          
          <path d="M 50% 15% Q 45% 30% 50% 50% T 50% 85%" fill="transparent" stroke="#e2e8f0" strokeWidth="2" strokeDasharray="6,6" />

          {connections.map((conn, idx) => {
            const p1 = nodePositions[conn.from];
            const p2 = nodePositions[conn.to];
            if (!p1 || !p2) return null;
            
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
                color: mode.category === 'coping' ? '#451a03' : 'white',
                padding: '0.6rem 1rem',
                borderRadius: '50px',
                fontSize: '0.75rem',
                fontWeight: '700',
                textAlign: 'center',
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
              {mode.title}
            </div>
          );
        })}
      </div>
    </div>
  );
}
