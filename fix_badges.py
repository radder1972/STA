import re

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'r') as f:
    content = f.read()

# 1. Update StepBadge background to the exact blue/green gradient
old_badge = """const StepBadge = ({ number, size = 32 }) => (
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

new_badge = """const StepBadge = ({ number, size = 32 }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: `${size}px`, height: `${size}px`, borderRadius: '50%',
    background: 'linear-gradient(135deg, #14b8a6, #3b82f6)',
    color: '#ffffff', fontSize: `${size * 0.55}px`, fontWeight: 'bold',
    marginRight: '12px', flexShrink: 0,
    WebkitTextFillColor: '#ffffff',
    boxShadow: '0 4px 10px rgba(20, 184, 166, 0.3)'
  }}>
    {number}
  </span>
);"""
content = content.replace(old_badge, new_badge)

# 2. Update Instructions Text
old_instructions = """          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
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

new_instructions = """          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px' }}><StepBadge number="1" /></div>
              <div><strong>Beschrijf de situatie:</strong> Wat was de trigger? Wat gebeurde er precies? Beschrijf dit altijd als eerste, want dit vormt het vertrekpunt van je opstelling.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px' }}><StepBadge number="2" /></div>
              <div><strong>Leg de kaarten op tafel:</strong> Welke kaarten horen bij deze situatie? Wat deed je precies (Mijn Reactie / Modus)? Welke oude overtuiging werd geraakt (Geraakt Schema)? En welke fundamentele behoefte kwam in de knel (Onvervulde Behoefte)? Je kunt deze kaarten handmatig selecteren, óf – en dat is wel zo makkelijk – <strong>automatisch laten voorspellen</strong> door de app op basis van jouw persoonlijke testresultaten.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px' }}><StepBadge number="3" /></div>
              <div><strong>Analyseer:</strong> Bekijk een uitgebreide psychologische analyse van jouw specifieke keten. Hierin lees je precies hoe de kaarten met elkaar samenhangen, plus direct toepasbaar advies voor je Gezonde Volwassene.<br/><br/><em>Goed om te weten:</em> Als je in de vorige stap hebt gekozen voor de knop 'Voorspel kaarten', wordt deze complete analyse direct al voor je klaargezet en hoef je in stap 3 dus niets meer zelf te doen!</div>
            </div>
          </div>"""

content = content.replace(old_instructions, new_instructions)

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'w') as f:
    f.write(content)

