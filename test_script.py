import re

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'r') as f:
    content = f.read()

# Fix layout for situationText
situation_old = """          <div style={{ marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <h3 className="text-gradient" style={{ marginBottom: '1rem' }}>Wat was de situatie / trigger?</h3>
            <textarea 
              className="no-print"
              placeholder="Beschrijf hier kort de situatie (bijv. 'Tijdens een overleg werd mijn idee genegeerd...')" 
              value={situationText}
              onChange={e => setSituationText(e.target.value)}
              style={{ 
                width: '100%', minHeight: '120px', padding: '1rem', 
                borderRadius: '12px', border: '1px solid var(--border-color)', 
                background: 'rgba(0,0,0,0.02)', color: 'var(--text-main)', 
                fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical',
                lineHeight: '1.6'
              }}
            />
            <div className="tafel-print-only" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1rem', color: 'var(--text-main)', width: '100%', textAlign: 'left', background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
              {situationText || "Geen situatie beschreven."}
            </div>
            
            <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '1rem', background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)', width: '100%', boxSizing: 'border-box' }}>
              <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center', maxWidth: '650px', lineHeight: '1.6' }}>
                Laat de kaarten automatisch op tafel leggen op basis van de beschreven situatie. Jouw persoonlijke scores op de vragenlijsten (schema's en modi) vormen hierbij de basis voor een passend voorstel.
              </p>

              <button 
                className="btn btn-gradient" 
                onClick={predictCards} 
                disabled={isPredicting || !situationText}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', padding: '1rem 2rem' }}
                title="Voorspel de kaarten op basis van je situatie en testresultaten"
              >
                {isPredicting ? 'Bezig met voorspellen...' : <><WandIcon size={24} color="currentColor" /> Voorspel de kaarten</>}
              </button>
            </div>
          </div>"""

situation_new = """          <div style={{ marginBottom: '3rem' }}>
            <h3 className="text-gradient" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Wat was de situatie / trigger?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <textarea 
                  className="no-print"
                  placeholder="Beschrijf hier kort de situatie (bijv. 'Tijdens een overleg werd mijn idee genegeerd...')" 
                  value={situationText}
                  onChange={e => setSituationText(e.target.value)}
                  style={{ 
                    width: '100%', flex: 1, minHeight: '200px', padding: '1rem', 
                    borderRadius: '12px', border: '1px solid var(--border-color)', 
                    background: 'rgba(0,0,0,0.02)', color: 'var(--text-main)', 
                    fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical',
                    lineHeight: '1.6', boxSizing: 'border-box'
                  }}
                />
                <div className="tafel-print-only" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1rem', color: 'var(--text-main)', width: '100%', textAlign: 'left', background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}>
                  {situationText || "Geen situatie beschreven."}
                </div>
              </div>
              
              <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}>
                <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.6' }}>
                  Laat de kaarten automatisch op tafel leggen op basis van de beschreven situatie. Jouw persoonlijke scores (schema's en modi) vormen hierbij de basis voor een passend voorstel.
                </p>

                <button 
                  className="btn btn-gradient" 
                  onClick={predictCards} 
                  disabled={isPredicting || !situationText}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', padding: '1rem 2rem', width: '100%', justifyContent: 'center' }}
                  title="Voorspel de kaarten op basis van je situatie en testresultaten"
                >
                  {isPredicting ? 'Bezig...' : <><WandIcon size={24} color="currentColor" /> Voorspel kaarten</>}
                </button>
              </div>
            </div>
          </div>"""

if situation_old in content:
    content = content.replace(situation_old, situation_new)
else:
    print("Could not find situation text to replace.")

# Fix analysis text area auto-resize
analysis_old = """              <textarea 
                className="no-print"
                value={analysisText}
                onChange={e => setAnalysisText(e.target.value)}
                style={{ 
                  width: '100%', minHeight: '400px', padding: '1.5rem', 
                  borderRadius: '12px', border: '1px solid var(--border-color)', 
                  background: 'var(--bg-color)', color: 'var(--text-main)', 
                  fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical',
                  lineHeight: '1.6',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                }}
              />"""

analysis_new = """              <textarea 
                className="no-print"
                value={analysisText}
                onChange={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                  setAnalysisText(e.target.value);
                }}
                ref={(el) => {
                  if (el) {
                    el.style.height = 'auto';
                    el.style.height = el.scrollHeight + 'px';
                  }
                }}
                style={{ 
                  width: '100%', minHeight: '400px', padding: '1.5rem', 
                  borderRadius: '12px', border: '1px solid var(--border-color)', 
                  background: 'var(--bg-color)', color: 'var(--text-main)', 
                  fontFamily: 'inherit', fontSize: '1rem', resize: 'none', overflow: 'hidden',
                  lineHeight: '1.6',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                }}
              />"""

if analysis_old in content:
    content = content.replace(analysis_old, analysis_new)
else:
    print("Could not find analysis text to replace.")

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'w') as f:
    f.write(content)

