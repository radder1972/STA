import re

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'r') as f:
    content = f.read()

# Add import
import_stmt = "import { schemaDescriptions } from '../data/schemaDescriptions';\n"
if "schemaDescriptions" not in content:
    content = content.replace("import smiScoring from '../data/smi-scoring.json';", "import smiScoring from '../data/smi-scoring.json';\n" + import_stmt)

# Add need descriptions
need_desc = """
const needDescriptions = {
  'Veilige hechting': "Dit is de meest fundamentele behoefte. Het draait om veiligheid, stabiliteit, verzorging en onvoorwaardelijke acceptatie. Een kind moet voelen dat het gewenst is en dat de opvoeders een veilige thuishaven bieden waarop altijd kan worden teruggevallen, zonder angst voor verlating of afwijzing.",
  'Autonomie': "Dit is de behoefte om je als een onafhankelijk, capabel individu te ontwikkelen. Het gaat om de ruimte om zelf de wereld te ontdekken, fouten te mogen maken en vertrouwen te krijgen in je eigen kunnen. Als deze behoefte in de knel komt, voelt iemand zich als volwassene vaak extreem afhankelijk of kwetsbaar.",
  'Vrije expressie': "Ieder mens heeft de behoefte om zich vrij uit te drukken. Het kind moet ervaren dat de eigen gevoelens (ook boosheid of verdriet) en behoeften geldig zijn, en niet minder belangrijk zijn dan die van anderen. Wanneer deze behoefte wordt onderdrukt, ontstaat vaak zelfopoffering of onderwerping.",
  'Spontaniteit en spel': "Er moet ruimte zijn voor plezier, creativiteit en onbezorgdheid. Niet alles hoeft nuttig, perfect of efficiënt te zijn. Deze behoefte beschermt ons tegen meedogenloze normen, overmatige prestatiedruk en het gevoel dat het leven uitsluitend uit plichten bestaat.",
  'Realistische grenzen': "Naast vrijheid heeft een kind kaders nodig om te leren omgaan met frustratie. Dit betekent leren dat je niet altijd je zin kunt krijgen, dat je rekening moet houden met anderen, en dat je discipline moet opbrengen voor taken die minder leuk zijn. Het ontbreken hiervan leidt vaak tot onvoldoende zelfcontrole of veeleisendheid richting anderen."
};

"""
if "needDescriptions" not in content:
    content = content.replace("const needCards = [", need_desc + "const needCards = [")

# Add descriptions to needCards
content = re.sub(r"title: '([^']+)', type: 'need' \},", r"title: '\1', type: 'need', description: needDescriptions['\1'] },", content)

# Add descriptions to schemaCards
content = content.replace(
    "return { src: schemaImages[path], title, type: 'schema', style:",
    "return { src: schemaImages[path], title, type: 'schema', description: schemaDescriptions[title], style:"
)

# Add descriptions to modeCards
content = content.replace(
    "return { src: modeImages[path], title, type: 'mode', style:",
    "return { src: modeImages[path], title, type: 'mode', description: schemaDescriptions[title], style:"
)

# Add descriptions to healthyAdultCard
content = content.replace(
    "type: 'mode', style:",
    "type: 'mode', description: schemaDescriptions['Gezonde volwassene'], style:"
)

# Rewrite CardSlot
card_slot_old = """const CardSlot = ({ label, card, onSelect, onRemove }) => (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--text-main)', textAlign: 'center' }}>{label}</div>
    {card ? (
      <div style={{ position: 'relative', display: 'inline-block' }}>
         <div className="schema-img playing-card" style={{ width: '140px', height: '200px', padding: '12px', display: 'flex', flexDirection: 'column', pointerEvents: 'none', margin: 0, boxSizing: 'border-box' }}>
           <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
             <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
           </div>
           <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', margin: '8px 0 6px 0', lineHeight: '1.2' }}>{formatCardTitle(card.title)}</div>
         </div>
         {onRemove && (
           <button onClick={onRemove} className="no-print" style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', lineHeight: 1, padding: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>&times;</button>
         )}
      </div>
    ) : (
      <div 
        onClick={onSelect} 
        className="glass-panel no-print" 
        style={{ width: '140px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--primary)', borderRadius: '12px', cursor: 'pointer', background: 'rgba(20, 184, 166, 0.05)', transition: 'all 0.2s' }}
      >
        <span style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>+</span>
        <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold' }}>Kies Kaart</span>
      </div>
    )}
  </div>
);"""

card_slot_new = """const CardSlot = ({ label, card, onSelect, onRemove }) => {
  const [flipped, setFlipped] = useState(false);
  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--text-main)', textAlign: 'center' }}>{label}</div>
    {card ? (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        <div className="card-scene" style={{ width: '140px', height: '200px', margin: 0 }}>
          <div className={`card-flip-container ${flipped ? 'flipped' : ''}`}>
            <div className="card-face-front schema-img playing-card" onClick={() => setFlipped(!flipped)} style={{ padding: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', margin: '8px 0 6px 0', lineHeight: '1.2' }}>{formatCardTitle(card.title)}</div>
            </div>
            
            <div className="card-face-back" onClick={() => setFlipped(!flipped)} style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', padding: '12px' }}>
              <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '0.85rem', marginTop: '0.5rem', marginBottom: '0.2rem', lineHeight: '1.2', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{card.title}</h4>
                <p style={{ fontSize: '0.65rem', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 8, WebkitBoxOrient: 'vertical', margin: 0 }}>{card.description || 'Geen theorie beschikbaar.'}</p>
              </div>
            </div>
          </div>
        </div>
        {onRemove && (
           <button onClick={onRemove} className="no-print" style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', lineHeight: 1, padding: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>&times;</button>
        )}
      </div>
    ) : (
      <div 
        onClick={onSelect} 
        className="glass-panel no-print" 
        style={{ width: '140px', height: '200px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--primary)', borderRadius: '12px', cursor: 'pointer', background: 'rgba(20, 184, 166, 0.05)', transition: 'all 0.2s' }}
      >
        <span style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>+</span>
        <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold' }}>Kies Kaart</span>
      </div>
    )}
  </div>
)};"""

content = content.replace(card_slot_old, card_slot_new)

# Now rewrite the picker cards
content = content.replace("const [isPredicting, setIsPredicting] = useState(false);", "const [isPredicting, setIsPredicting] = useState(false);\n  const [flippedCards, setFlippedCards] = useState({});\n\n  const handleFlip = (key, e) => {\n    if (e) e.stopPropagation();\n    setFlippedCards(prev => ({ ...prev, [key]: !prev[key] }));\n  };")

# We need to replace the mapping of cards in the picker
picker_old_1 = """                    <div key={idx} className="schema-img playing-card" onClick={() => handleSelectCard(card)} style={{ width: '120px', height: '170px', padding: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                      <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                        <img src={card.src} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
                      </div>
                      <div style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 'bold', margin: '6px 0 8px 0', lineHeight: '1.2' }}>{formatCardTitle(card.title)}</div>
                    </div>"""

picker_new_1 = """                    <div key={idx} className="card-scene" style={{ width: '120px', height: '170px', margin: 0 }}>
                      <div className={`card-flip-container ${flippedCards[`need-${idx}`] ? 'flipped' : ''}`}>
                        <div className="card-face-front schema-img playing-card" onClick={(e) => handleFlip(`need-${idx}`, e)} style={{ padding: '8px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <img src={card.src} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
                          </div>
                          <div style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 'bold', margin: '6px 0 8px 0', lineHeight: '1.2' }}>{formatCardTitle(card.title)}</div>
                        </div>
                        <div className="card-face-back" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '8px', pointerEvents: flippedCards[`need-${idx}`] ? 'auto' : 'none' }}>
                          <div onClick={(e) => handleFlip(`need-${idx}`, e)} style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                            <h4 style={{ fontSize: '0.8rem', marginTop: '0.2rem', marginBottom: '0.2rem', lineHeight: '1.1', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{card.title}</h4>
                            <p style={{ fontSize: '0.6rem', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', margin: 0 }}>{card.description || 'Geen theorie.'}</p>
                          </div>
                          <button onClick={(e) => { e.stopPropagation(); handleSelectCard(card); }} className="btn btn-card" style={{ fontSize: '0.65rem', padding: '4px 8px', width: '100%' }}><span className="btn-text">Kies</span></button>
                        </div>
                      </div>
                    </div>"""

content = content.replace(picker_old_1, picker_new_1)

picker_old_2 = """                          <div key={idx} className="schema-img playing-card" onClick={() => handleSelectCard(card)} style={{ width: '120px', height: '170px', padding: '8px', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                              <img src={card.src} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
                            </div>
                            <div style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 'bold', margin: '6px 0 8px 0', lineHeight: '1.2' }}>{formatCardTitle(card.title)}</div>
                          </div>"""

picker_new_2 = """                          <div key={idx} className="card-scene" style={{ width: '120px', height: '170px', margin: 0 }}>
                            <div className={`card-flip-container ${flippedCards[`${groupIdx}-${idx}`] ? 'flipped' : ''}`}>
                              <div className="card-face-front schema-img playing-card" onClick={(e) => handleFlip(`${groupIdx}-${idx}`, e)} style={{ padding: '8px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                  <img src={card.src} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
                                </div>
                                <div style={{ textAlign: 'center', fontSize: '0.7rem', fontWeight: 'bold', margin: '6px 0 8px 0', lineHeight: '1.2' }}>{formatCardTitle(card.title)}</div>
                              </div>
                              <div className="card-face-back" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '8px', pointerEvents: flippedCards[`${groupIdx}-${idx}`] ? 'auto' : 'none' }}>
                                <div onClick={(e) => handleFlip(`${groupIdx}-${idx}`, e)} style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column', cursor: 'pointer' }}>
                                  <h4 style={{ fontSize: '0.8rem', marginTop: '0.2rem', marginBottom: '0.2rem', lineHeight: '1.1', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{card.title}</h4>
                                  <p style={{ fontSize: '0.6rem', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 6, WebkitBoxOrient: 'vertical', margin: 0 }}>{card.description || 'Geen theorie.'}</p>
                                </div>
                                <button onClick={(e) => { e.stopPropagation(); handleSelectCard(card); }} className="btn btn-card" style={{ fontSize: '0.65rem', padding: '4px 8px', width: '100%' }}><span className="btn-text">Kies</span></button>
                              </div>
                            </div>
                          </div>"""

content = content.replace(picker_old_2, picker_new_2)

with open('/Users/matthias/.gemini/antigravity/scratch/schema-therapy-app/src/components/Tafelopstelling.jsx', 'w') as f:
    f.write(content)

