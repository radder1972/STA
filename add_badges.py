import re

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'r') as f:
    content = f.read()

# Add StepBadge component after imports
step_badge_component = """
const StepBadge = ({ number, size = 24 }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: `${size}px`, height: `${size}px`, borderRadius: '50%',
    background: 'linear-gradient(135deg, var(--primary), var(--secondary))',
    color: 'white', fontSize: `${size * 0.55}px`, fontWeight: 'bold',
    marginRight: '8px', flexShrink: 0, boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
  }}>
    {number}
  </span>
);
"""
if "const StepBadge" not in content:
    content = content.replace("const ysqSchemaNamesMap", step_badge_component + "\nconst ysqSchemaNamesMap")

# 1. Update instructions block
old_instructions = """          <ol style={{ margin: 0, paddingLeft: '1.5rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
            <li style={{ marginBottom: '0.8rem' }}><strong>Beschrijf de situatie:</strong> Wat was de trigger? Beschrijf dit altijd als eerste.</li>
            <li style={{ marginBottom: '0.8rem' }}><strong>Leg de kaarten op tafel:</strong> Op basis van deze situatie: wat deed je (modus), welk schema werd getriggerd, en welke basisbehoefte werd geraakt? Je kunt de kaarten <strong>handmatig</strong> kiezen, óf dit <strong>automatisch</strong> laten voorspellen op basis van je testresultaten.</li>
            <li><strong>Analyseer:</strong> Laat een diepgaande analyse maken van jouw specifieke keten en kijk hoe je Gezonde Volwassene kan reageren.</li>
          </ol>"""

new_instructions = """          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px' }}><StepBadge number="1" /></div>
              <div><strong>Beschrijf de situatie:</strong> Wat was de trigger? Beschrijf dit altijd als eerste.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px' }}><StepBadge number="2" /></div>
              <div><strong>Leg de kaarten op tafel:</strong> Op basis van deze situatie: wat deed je (modus), welk schema werd getriggerd, en welke basisbehoefte werd geraakt? Je kunt de kaarten <strong>handmatig</strong> kiezen, óf dit <strong>automatisch</strong> laten voorspellen op basis van je testresultaten.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px' }}><StepBadge number="3" /></div>
              <div><strong>Analyseer:</strong> Laat een diepgaande analyse maken van jouw specifieke keten en kijk hoe je Gezonde Volwassene kan reageren.</div>
            </div>
          </div>"""

content = content.replace(old_instructions, new_instructions)

# 2. Update Situation Heading
content = content.replace(
    """<h3 className="text-gradient" style={{ marginBottom: '1.5rem', textAlign: 'center' }}>Wat was de situatie / trigger?</h3>""",
    """<h3 className="text-gradient" style={{ marginBottom: '1.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><StepBadge number="1" size={28} /> Wat was de situatie / trigger?</h3>"""
)

# 3. Update Predict Box
predict_old = """              <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}>
                <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.6' }}>"""
predict_new = """              <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}>
                <h4 className="text-gradient" style={{ margin: '0 0 1rem 0', display: 'flex', alignItems: 'center', fontSize: '1.1rem' }}><StepBadge number="2" /> Automatisch voorspellen</h4>
                <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.6' }}>"""
content = content.replace(predict_old, predict_new)

# 4. Update Table Cards Heading
table_old = """          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', alignItems: 'stretch' }}>
          
          {/* Linkerkant: De Keten */}"""
table_new = """          <h3 className="text-gradient" style={{ marginTop: '3rem', marginBottom: '2rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><StepBadge number="2" size={28} /> Of: Leg zelf handmatig de kaarten op tafel</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '3rem', alignItems: 'stretch' }}>
          
          {/* Linkerkant: De Keten */}"""
content = content.replace(table_old, table_new)

# 5. Update Analysis Heading
analysis_old = """          <h3 className="text-gradient" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
            <CpuChipIcon size={24} useGradient={true} /> Diepgaande Analyse van de Keten
          </h3>"""
analysis_new = """          <h3 className="text-gradient" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <StepBadge number="3" size={28} /> Diepgaande Analyse van de Keten
          </h3>"""
content = content.replace(analysis_old, analysis_new)


with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'w') as f:
    f.write(content)

