import { schemaDescriptions } from '../data/descriptions';

export default function YsqVisualizer({ groupedScores, top3 = [], onSelect }) {
  const getGroup = (groupName) => groupedScores[groupName] || [];

  const renderSchemaNode = (schema) => {
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
    const imgName = hasImage ? `${schema.id.replace('/', '_')}.png` : null;

    return (
      <div 
        key={schema.id} 
        className="mode-node glass-panel interactive-card" 
        onMouseEnter={() => onSelect && onSelect(schema.name)}
        onMouseLeave={() => onSelect && onSelect(null)}
        style={{ cursor: 'pointer', display: 'flex', flexDirection: 'column', height: '100%', ...(isTop3 ? { borderLeft: `4px solid ${medalColor}`, background: 'rgba(0,0,0,0.03)' } : {}) }}
      >
        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: '1rem', width: '100%' }}>
          {hasImage && (
            <div style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
              <img src={`/images/schemas/${imgName}`} alt={schema.name} className="schema-img" style={{ maxWidth: '70px', borderRadius: '6px' }} />
            </div>
          )}
          
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
            <div className="mode-name" style={{ display: 'flex', alignItems: 'center', marginBottom: '0.25rem', minHeight: 'auto' }}>
              <span style={{ paddingRight: '10px', fontWeight: 'bold' }}>{schema.name}</span>
              {isTop3 && <span style={{ backgroundColor: medalColor, color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold', whiteSpace: 'nowrap' }}>#{top3Index + 1}</span>}
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', lineHeight: '1.4', fontStyle: 'italic' }}>
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
