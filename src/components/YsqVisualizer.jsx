export default function YsqVisualizer({ groupedScores }) {
  const getGroup = (groupName) => groupedScores[groupName] || [];

  const renderSchemaNode = (schema) => (
    <div key={schema.id} className="mode-node glass-panel">
      <div className="mode-name">{schema.name}</div>
      <div className="mode-score">
        {schema.mean} <span className="high-score-badge">≥5: {schema.highScores}x</span>
      </div>
      <div className="mini-progress-bg">
        <div 
          className="mini-progress-fill" 
          style={{ width: `${(schema.mean / 6) * 100}%` }}
        ></div>
      </div>
    </div>
  );

  const renderSection = (title, groupName, color) => (
    <div className="ysq-section" style={{ borderColor: color }}>
      <h4 className="section-label" style={{ color: color }}>{title}</h4>
      <div className="nodes-container">
        {getGroup(groupName).map(renderSchemaNode)}
      </div>
    </div>
  );

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
