export default function SmiVisualizer({ groupedScores, top3 = [] }) {
  // Helper to get scores for a specific group safely
  const getGroup = (groupName) => groupedScores[groupName] || [];

  const renderModeNode = (mode) => {
    const top3Index = top3.findIndex(m => m.id === mode.id);
    const isTop3 = top3Index !== -1;
    const medalColor = top3Index === 0 ? '#fbbf24' : top3Index === 1 ? '#94a3b8' : top3Index === 2 ? '#b45309' : null;

    return (
      <div key={mode.id} className="mode-node glass-panel" style={isTop3 ? { borderLeft: `4px solid ${medalColor}`, background: 'rgba(0,0,0,0.03)' } : {}}>
        <div className="mode-name" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          {mode.name}
          {isTop3 && <span style={{ backgroundColor: medalColor, color: '#fff', padding: '2px 6px', borderRadius: '4px', fontSize: '0.7rem', fontWeight: 'bold' }}>#{top3Index + 1}</span>}
        </div>
        <div className="mode-score">
          {mode.mean} <span className="high-score-badge">≥5: {mode.highScores}x</span>
        </div>
        <div className="mini-progress-bg">
          <div 
            className="mini-progress-fill" 
            style={{ width: `${(mode.mean / 6) * 100}%` }}
          ></div>
        </div>
      </div>
    );
  };

  const renderSection = (title, groupName, color) => {
    const modes = getGroup(groupName);
    if (modes.length === 0) return null;

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
        <h4 className="section-label" style={{ color: color, marginTop: 0, marginBottom: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.5rem', fontSize: '1.1rem' }}>{title}</h4>
        <div className="nodes-container">
          {modes.map(renderModeNode)}
        </div>
      </div>
    );
  };

  return (
    <div className="visualizer-container">
      <h3 className="visualizer-title">Modi Overzicht</h3>
      
      <div className="ysq-layout">
        <div className="ysq-grid">
          {renderSection('DISFUNCTIONELE OUDERMODI', 'DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI', '#ef4444')}
          {renderSection('FUNCTIONELE MODI', 'FUNCTIONELE MODI', '#10b981')}
          {renderSection('BESCHERMMODI - OMKERING', 'BESCHERMMODI - OMKERING', '#eab308')}
          {renderSection('BESCHERMMODI - VERMIJDEN', 'BESCHERMMODI - VERMIJDEN', '#f59e0b')}
          {renderSection('BESCHERMMODI - OVERGAVE', 'BESCHERMMODI - OVERGAVE', '#d97706')}
          {renderSection('KINDMODI', 'KINDMODI', '#3b82f6')}
        </div>
      </div>
    </div>
  );
}
