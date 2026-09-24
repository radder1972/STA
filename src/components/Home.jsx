import { ClipboardIcon, BrainIcon, CheckIcon, ChartIcon } from './Icons'

export default function Home({ onStart, completedTests, onViewResults }) {
  const isYsqDone = !!completedTests.ysq;
  const isSmiDone = !!completedTests.smi;
  const hasAnyResult = isYsqDone || isSmiDone;

  return (
    <div className="home-container">
      <div className="header">
        <h1>Schema Therapy Questionnaires</h1>
        <p>Kies een vragenlijst. U kunt beide lijsten invullen voor een gecombineerd rapport.</p>
      </div>
      
      <div className="home-cards">
        <div className={`card glass-panel ${isYsqDone ? 'completed-card' : ''}`} onClick={() => onStart('ysq')}>
          <ClipboardIcon size={48} color={isYsqDone ? 'var(--success, #10b981)' : 'var(--primary)'} style={{ margin: '0 auto 1rem', display: 'block' }} />
          <h2>YSQ S3 {isYsqDone && <CheckIcon size={24} color="var(--success, #10b981)" style={{display: 'inline', verticalAlign: 'middle'}} />}</h2>
          <p style={{ fontWeight: 'bold' }}>Young Schema Questionnaire</p>
          <p style={{ fontSize: '0.9rem', textAlign: 'left', marginTop: '1rem' }}>
            {isYsqDone ? "U heeft deze vragenlijst reeds ingevuld! Klik om eventueel opnieuw te beginnen." : "Hieronder volgen een aantal beweringen die men kan gebruiken om zichzelf te beschrijven. Lees elke bewering en kijk hoe goed deze u, in het afgelopen jaar, beschrijft."}
          </p>
        </div>
        
        <div className={`card glass-panel ${isSmiDone ? 'completed-card' : ''}`} onClick={() => onStart('smi')}>
          <BrainIcon size={48} color={isSmiDone ? 'var(--success, #10b981)' : 'var(--accent)'} style={{ margin: '0 auto 1rem', display: 'block' }} />
          <h2>SMI {isSmiDone && <CheckIcon size={24} color="var(--success, #10b981)" style={{display: 'inline', verticalAlign: 'middle'}} />}</h2>
          <p style={{ fontWeight: 'bold' }}>Schema Mode Inventory</p>
          <p style={{ fontSize: '0.9rem', textAlign: 'left', marginTop: '1rem' }}>
             {isSmiDone ? "U heeft deze vragenlijst reeds ingevuld! Klik om eventueel opnieuw te beginnen." : "In deze vragenlijst staan uitspraken die mensen kunnen gebruiken om zichzelf te beschrijven. Beoordeel de FREQUENTIE; hoe vaak u overtuigd bent of het zo voelde."}
          </p>
        </div>
      </div>

      {hasAnyResult && (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="btn" onClick={onViewResults} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', padding: '1rem 2rem' }}>
            <ChartIcon size={24} /> Bekijk (Gecombineerd) Rapport
          </button>
        </div>
      )}
    </div>
  )
}
