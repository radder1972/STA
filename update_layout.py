import re

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'r') as f:
    content = f.read()

# 1. Update StepBadge
old_badge = """const StepBadge = ({ number, size = 24 }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: `${size}px`, height: `${size}px`, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    color: 'white', fontSize: `${size * 0.55}px`, fontWeight: 'bold',
    marginRight: '8px', flexShrink: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    {number}
  </span>
);"""
new_badge = """const StepBadge = ({ number, size = 32 }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: `${size}px`, height: `${size}px`, borderRadius: '50%',
    background: 'var(--primary)',
    color: '#ffffff', fontSize: `${size * 0.55}px`, fontWeight: 'bold',
    marginRight: '12px', flexShrink: 0,
    WebkitTextFillColor: '#ffffff'
  }}>
    {number}
  </span>
);"""
content = content.replace(old_badge, new_badge)

# 2. Remove "Hoe werkt het?" heading
content = content.replace("""<h4 style={{ color: 'var(--primary)', marginBottom: '1rem', marginTop: 0, fontSize: '1.1rem', display: 'flex', alignItems: 'center', gap: '8px' }}><CheckIcon size={20} /> Hoe werkt het?</h4>""", "")

# 3. Update the grid layout to vertical stack
old_grid_start = """          <div style={{ marginBottom: '3rem' }}>
            <h3 className="text-gradient" style={{ marginBottom: '1.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><StepBadge number="1" size={28} /> Wat was de situatie / trigger?</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '1.5rem', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                <textarea """

new_grid_start = """          <div style={{ marginBottom: '3rem' }}>
            <h3 className="text-gradient" style={{ marginBottom: '1.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><StepBadge number="1" size={28} /> Beschrijf de situatie</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <textarea """
content = content.replace(old_grid_start, new_grid_start)

# Update the middle part of the grid (where right column starts)
old_grid_mid = """                  {situationText || "Geen situatie beschreven."}
                </div>
              </div>
              
              <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}>
                <h4 className="text-gradient" style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}><StepBadge number="2" /> Automatisch voorspellen</h4>
                <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.6' }}>"""

new_grid_mid = """                  {situationText || "Geen situatie beschreven."}
                </div>
              </div>
              
              <div>
                <h3 className="text-gradient" style={{ marginBottom: '1.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><StepBadge number="2" size={28} /> Leg de kaarten op tafel</h3>
                <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}>
                  <h4 className="text-gradient" style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Automatisch voorspellen</h4>
                  <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.6', maxWidth: '650px' }}>"""
content = content.replace(old_grid_mid, new_grid_mid)

# Update the end of the predict box
old_grid_end = """                </button>
              </div>
            </div>
          </div>"""

new_grid_end = """                </button>
                </div>
              </div>
            </div>
          </div>"""
content = content.replace(old_grid_end, new_grid_end)


# 4. Update the heading for manual cards
old_manual_heading = """<h3 className="text-gradient" style={{ marginTop: '3rem', marginBottom: '2rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><StepBadge number="2" size={28} /> Of: Leg zelf handmatig de kaarten op tafel</h3>"""
new_manual_heading = """<h4 className="text-gradient" style={{ marginTop: '3rem', marginBottom: '2rem', textAlign: 'center' }}>Of: Leg zelf handmatig de kaarten op tafel</h4>"""
content = content.replace(old_manual_heading, new_manual_heading)


# 5. Update Analysis Heading
old_analysis_heading = """<h3 className="text-gradient" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StepBadge number="3" size={28} /> Diepgaande Analyse van de Keten
          </h3>"""
new_analysis_heading = """<h3 className="text-gradient" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StepBadge number="3" size={28} /> Analyseer
          </h3>"""
content = content.replace(old_analysis_heading, new_analysis_heading)

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'w') as f:
    f.write(content)

