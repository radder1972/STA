import React, { useState } from 'react';
import { schemaDescriptions } from '../data/descriptions';
import { getSchemaImage } from '../utils/images';

export default function YsqVisualizer({ groupedScores, top3 = [] }) {
  const [expandedNodes, setExpandedNodes] = useState({});
  
  const toggleNode = (id) => {
    setExpandedNodes(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const getGroup = (groupName) => groupedScores[groupName] || [];

  const renderSchemaNode = (schema, index) => {
    const top3Index = top3.findIndex(s => s.id === schema.id);
    const isTop3 = top3Index !== -1;
    const medalColor = top3Index === 0 ? '#fbbf24' : top3Index === 1 ? '#94a3b8' : top3Index === 2 ? '#b45309' : null;

    const schemasWithImages = [
      'Abandonment', 'Mistrust', 'Emotional deprivation', 'Social isolation/Alienation', 'Defectiveness/unlovability',
      'Practical incompetence/Dependence', 'Vulnerability to harm/illness', 'Enmeshment', 'Failure to achieve', 'Self-sacrifice',
      'Admiration/Recognition-seeking', 'Pessimism/Worry', 'Emotional inhibition', 'Unrelenting Standards', 'Self-punitiveness',
      'Entitlement/Superiority', 'Insufficient self-control/self-discipline', 'Subjugation'
    ];
    const hasImage = schemasWithImages.includes(schema.id);
    const imgUrl = hasImage ? getSchemaImage(schema.id) : null;

    return (
      <div 
        key={schema.id} 
        className="mode-node glass-panel" 
        style={{ display: 'flex', flexDirection: 'column', height: '100%', ...(isTop3 ? { borderLeft: `4px solid ${medalColor}`, background: 'rgba(0,0,0,0.03)' } : {}) }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', width: '100%' }}>
          {hasImage && (
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <div className="schema-img playing-card" style={{ width: '100px', height: '120px', padding: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden', transform: `rotate(${(index * 7) % 8 - 4}deg)`, boxShadow: '2px 4px 10px rgba(0,0,0,0.3)', border: '3px solid white', background: 'white' }}>
                <img src={imgUrl} alt={schema.name} style={{ width: '100%', height: '100%', objectFit: 'contain', transform: schema.name === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(0.85)' }} />
              </div>
            </div>
          )}
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="mode-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.25rem', minHeight: 'auto' }}>
              <span style={{ paddingRight: '10px', fontWeight: 'bold' }}>{schema.name}</span>
              {isTop3 && <span style={{ backgroundColor: medalColor, color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>#{top3Index + 1}</span>}
            </div>
            <div style={{ textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', fontStyle: 'italic' }}>
              {schemaDescriptions[schema.name] || ''}
            </div>
          </div>

          <div style={{ flexShrink: 0, width: '100px', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="mode-score" style={{ marginBottom: '0.25rem' }}>
              <span style={{ fontWeight: 'bold', fontSize: '1.1rem' }}>{schema.mean}</span> 
              <span className="high-score-badge">≥5: {schema.highScores}x</span>
            </div>
            <div className="mini-progress-bg">
              <div 
                className="mini-progress-fill" 
                style={{ width: `${(schema.mean / 6) * 100}%`, ...(isTop3 ? { background: medalColor } : {}) }}
              ></div>
            </div>
          </div>
        </div>
        
        {/* Toggle details button */}
        <button 
          onClick={() => toggleNode(schema.id)}
          style={{
            marginTop: '1rem',
            background: 'transparent',
            border: '1px solid var(--border-color)',
            color: 'var(--text-muted)',
            padding: '4px 12px',
            borderRadius: '20px',
            cursor: 'pointer',
            fontSize: '0.75rem',
            fontWeight: 'bold',
            alignSelf: 'center',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
            transition: 'all 0.2s'
          }}
        >
          {expandedNodes[schema.id] ? '▲ Verberg antwoorden' : '▼ Bekijk antwoorden'}
        </button>
        
        {/* Expanded questions list */}
        {expandedNodes[schema.id] && schema.questionDetails && schema.questionDetails.length > 0 && (
          <div style={{ marginTop: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem', fontSize: '0.85rem', textAlign: 'left', width: '100%', animation: 'fadeIn 0.3s ease-in-out' }}>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              {schema.questionDetails.map(q => (
                <li key={q.id} style={{ display: 'flex', gap: '10px', marginBottom: '10px', alignItems: 'flex-start' }}>
                  <span style={{ 
                    fontWeight: 'bold', 
                    color: q.score >= 5 ? '#ef4444' : 'var(--text-main)',
                    background: q.score >= 5 ? 'rgba(239, 68, 68, 0.15)' : 'rgba(0,0,0,0.05)',
                    borderRadius: '6px',
                    width: '28px',
                    height: '28px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    border: `1px solid ${q.score >= 5 ? 'rgba(239, 68, 68, 0.3)' : 'var(--border-color)'}`
                  }}>
                    {q.score}
                  </span>
                  <span style={{ color: 'var(--text-muted)', lineHeight: '1.5', paddingTop: '4px' }}>{q.text}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    );
  };

  const renderSection = (title, groupName, color) => {
    const schemas = getGroup(groupName);
    if (schemas.length === 0) return null;

    return (
      <div className="ysq-section glass-panel" style={{ 
        border: `1px solid var(--border-color)`, 
        borderTop: `5px solid ${color}`,
        borderRadius: '12px',
        padding: '1.5rem',
        background: 'var(--card-bg)',
        marginBottom: '1.5rem',
        boxShadow: 'var(--glass-shadow)'
      }}>
        <h4 className="section-label" style={{ color: color, marginTop: 0, marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', fontSize: '1.1rem', minHeight: '3.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{title}</h4>
        <div className="nodes-container">
          {schemas.map(renderSchemaNode)}
        </div>
      </div>
    );
  };

  return (
    <div className="visualizer-container">
      <h3 className="visualizer-title">Basisbehoeften en Schema's</h3>
      
      <div className="ysq-layout">
        <div className="ysq-grid">
          {renderSection('VERBONDENHEID & VEILIGHEID', 'Verbondenheid & Veiligheid', '#10b981')}
          {renderSection('AUTONOMIE', 'Autonomie', '#3b82f6')}
          {renderSection('ZELFEXPRESSIE', 'Zelfexpressie', '#eab308')}
          {renderSection('REALISTISCHE GRENZEN', 'Realistische Grenzen', '#ef4444')}
          {renderSection('SPONTANITEIT & SPEL', 'Spontaniteit & Spel', '#f97316')}
        </div>
      </div>
    </div>
  );
}
