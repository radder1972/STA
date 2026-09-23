export default function SmiVisualizer({ groupedScores }) {
  // Helper to get scores for a specific group safely
  const getGroup = (groupName) => groupedScores[groupName] || [];

  const renderModeNode = (mode) => (
    <div key={mode.id} className="mode-node glass-panel">
      <div className="mode-name">{mode.name}</div>
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

  return (
    <div className="visualizer-container">
      <h3 className="visualizer-title">Modi Overzicht</h3>
      
      <div className="smi-layout">
        {/* Top Level: Parents & Healthy */}
        <div className="smi-row space-between">
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
        </div>

        {/* Middle Level: Coping */}
        <div className="smi-section coping-modes">
          <h4 className="section-label">BESCHERMMODI</h4>
          
          <div className="coping-subgroups">
            <div className="coping-column">
              <h5>Omkering</h5>
              <div className="nodes-container">
                {getGroup('BESCHERMMODI - OMKERING').map(renderModeNode)}
              </div>
            </div>
            
            <div className="coping-column">
              <h5>Vermijden</h5>
              <div className="nodes-container">
                {getGroup('BESCHERMMODI - VERMIJDEN').map(renderModeNode)}
              </div>
            </div>
            
            <div className="coping-column">
              <h5>Overgave</h5>
              <div className="nodes-container">
                {getGroup('BESCHERMMODI - OVERGAVE').map(renderModeNode)}
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Level: Child Modes */}
        <div className="smi-section child-modes">
          <h4 className="section-label">KINDMODI</h4>
          <div className="nodes-container row-wrap">
            {getGroup('KINDMODI').map(renderModeNode)}
          </div>
        </div>
      </div>
    </div>
  );
}
