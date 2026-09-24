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

  return (
    <div className="visualizer-container">
      <h3 className="visualizer-title">Modi Overzicht</h3>
      
      <div className="smi-layout">
        {/* Top Level: Parents & Healthy */}
        <div className="smi-section parent-modes">
          <h4 className="section-label">DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI</h4>
          <div className="nodes-container">
            {getGroup('DISFUNCTIONELE GEÏNTERNALISEERDE OUDERMODI').map(renderModeNode)}
          </div>
        </div>
        
        <div className="smi-section healthy-modes">
          <h4 className="section-label" style={{ color: '#10b981' }}>FUNCTIONELE MODI</h4>
          <div className="nodes-container">
            {getGroup('FUNCTIONELE MODI').map(renderModeNode)}
          </div>
        </div>

        {/* Middle Level: Coping */}
        <div className="smi-section coping-modes">
          <h4 className="section-label">BESCHERMMODI - OMKERING</h4>
          <div className="nodes-container">
            {getGroup('BESCHERMMODI - OMKERING').map(renderModeNode)}
          </div>
        </div>
        
        <div className="smi-section coping-modes">
          <h4 className="section-label">BESCHERMMODI - VERMIJDEN</h4>
          <div className="nodes-container">
            {getGroup('BESCHERMMODI - VERMIJDEN').map(renderModeNode)}
          </div>
        </div>
        
        <div className="smi-section coping-modes">
          <h4 className="section-label">BESCHERMMODI - OVERGAVE</h4>
          <div className="nodes-container">
            {getGroup('BESCHERMMODI - OVERGAVE').map(renderModeNode)}
          </div>
        </div>

        {/* Bottom Level: Child Modes */}
        <div className="smi-section child-modes">
          <h4 className="section-label">KINDMODI</h4>
          <div className="nodes-container">
            {getGroup('KINDMODI').map(renderModeNode)}
          </div>
        </div>
      </div>
    </div>
  );
}
