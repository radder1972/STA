import re

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'r') as f:
    content = f.read()

# Replace the layout
old_layout = """          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', alignItems: 'stretch' }}>
          
          {/* Linkerkant: De Keten */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '300px', padding: '2rem', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <CardSlot label="Mijn Reactie (Modus)" card={selectedMode} onSelect={() => setShowCardPicker('mode')} onRemove={() => setSelectedMode(null)} />
            
            <div style={{ height: '30px', width: '3px', background: 'var(--primary)', opacity: 0.3, margin: '15px 0' }}></div>
            
            <CardSlot label="Geraakt Schema" card={selectedSchema} onSelect={() => setShowCardPicker('schema')} onRemove={() => setSelectedSchema(null)} />
            
            <div style={{ height: '30px', width: '3px', background: 'var(--primary)', opacity: 0.3, margin: '15px 0' }}></div>
            
            <CardSlot label="Onvervulde Behoefte" card={selectedNeed} onSelect={() => setShowCardPicker('need')} onRemove={() => setSelectedNeed(null)} />
          </div>

          {/* Rechterkant: Gezonde Volwassene */}
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1, minWidth: '300px', padding: '2rem', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <CardSlot label="Gezonde Volwassene" card={healthyAdultCard} />
            <div style={{ width: '100%', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
              <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--text-main)', textAlign: 'center', marginBottom: '0.5rem' }}>Grenzen stellen & Zorgen</div>
              <p style={{ fontSize: '1rem', color: 'var(--text-main)', textAlign: 'center', marginBottom: '1rem', lineHeight: '1.6' }}>
                De Gezonde Volwassene stelt grenzen aan disfunctionele reacties en biedt zorg voor onvervulde behoeften. Wat zou deze in deze situatie zeggen of doen?
              </p>
              <textarea 
                className="no-print"
                placeholder="" 
                value={gvNotes}
                onChange={e => setGvNotes(e.target.value)}
                style={{ 
                  width: '100%', flex: 1, minHeight: '180px', padding: '1rem', 
                  borderRadius: '12px', border: '1px solid var(--border-color)', 
                  background: 'var(--bg-color)', color: 'var(--text-main)', 
                  fontFamily: 'inherit', fontSize: '1rem', resize: 'none',
                  lineHeight: '1.6',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                }}
              />
              <div className="tafel-print-only" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1rem', color: 'var(--text-main)', width: '100%', minHeight: '180px', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>
                {gvNotes}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.8rem' }}>
                <button onClick={generateGvAdvice} disabled={isGenerating} className="btn btn-outline no-print" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '1rem' }}>
                  {isGenerating ? 'Genereren...' : <><CpuChipIcon size={16} useGradient={true} /> AI Analyse</>}
                </button>
                </div>
              </div>
            </div>
          </div>"""

new_layout = """          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
            
            {/* Top Row: De 3 Kaarten */}
            <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', width: '100%', padding: '2rem', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardSlot label="Mijn Reactie (Modus)" card={selectedMode} onSelect={() => setShowCardPicker('mode')} onRemove={() => setSelectedMode(null)} />
              </div>
              <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardSlot label="Geraakt Schema" card={selectedSchema} onSelect={() => setShowCardPicker('schema')} onRemove={() => setSelectedSchema(null)} />
              </div>
              <div style={{ flex: 1, minWidth: '220px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <CardSlot label="Onvervulde Behoefte" card={selectedNeed} onSelect={() => setShowCardPicker('need')} onRemove={() => setSelectedNeed(null)} />
              </div>
            </div>

            {/* Accolade */}
            <svg width="100%" height="40" viewBox="0 0 100 40" preserveAspectRatio="none" style={{ display: 'block', maxWidth: '800px', margin: '0.5rem 0' }}>
              <path d="M 5,0 C 5,20 50,20 50,40 C 50,20 95,20 95,0" fill="none" stroke="var(--primary)" strokeWidth="2" opacity="0.4" />
            </svg>

            {/* Bottom Row: Gezonde Volwassene */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px', padding: '2rem', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <CardSlot label="Gezonde Volwassene" card={healthyAdultCard} />
              
              <div style={{ width: '100%', marginTop: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ fontWeight: 'bold', fontSize: '1rem', color: 'var(--text-main)', textAlign: 'center', marginBottom: '0.5rem' }}>Grenzen stellen & Zorgen</div>
                <p style={{ fontSize: '1rem', color: 'var(--text-main)', textAlign: 'center', marginBottom: '1rem', lineHeight: '1.6' }}>
                  De Gezonde Volwassene stelt grenzen aan disfunctionele reacties en biedt zorg voor onvervulde behoeften. Wat zou deze in deze situatie zeggen of doen?
                </p>
                <textarea 
                  className="no-print"
                  placeholder="" 
                  value={gvNotes}
                  onChange={e => setGvNotes(e.target.value)}
                  style={{ 
                    width: '100%', flex: 1, minHeight: '180px', padding: '1rem', 
                    borderRadius: '12px', border: '1px solid var(--border-color)', 
                    background: 'var(--bg-color)', color: 'var(--text-main)', 
                    fontFamily: 'inherit', fontSize: '1rem', resize: 'none',
                    lineHeight: '1.6',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                  }}
                />
                <div className="tafel-print-only" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1rem', color: 'var(--text-main)', width: '100%', minHeight: '180px', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>
                  {gvNotes}
                </div>
                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '0.8rem' }}>
                  <button onClick={generateGvAdvice} disabled={isGenerating} className="btn btn-outline no-print" style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '8px 16px', fontSize: '1rem' }}>
                    {isGenerating ? 'Genereren...' : <><CpuChipIcon size={16} useGradient={true} /> Genereer een gezonde reactie</>}
                  </button>
                </div>
              </div>
            </div>

          </div>"""

content = content.replace(old_layout, new_layout)

content = content.replace("<CpuChipIcon size={20} useGradient={true} /> Diepgaande AI Analyse", "<CpuChipIcon size={20} useGradient={true} /> Een beschrijvende analyse")

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'w') as f:
    f.write(content)

