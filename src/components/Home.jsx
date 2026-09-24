import { ClipboardIcon, BrainIcon, CheckIcon, ChartIcon, ShieldIcon } from './Icons'

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
          <ClipboardIcon size={48} useGradient={!isYsqDone} color={isYsqDone ? 'var(--success, #10b981)' : 'currentColor'} style={{ margin: '0 auto 1rem', display: 'block' }} />
          <h2>YSQ S3 {isYsqDone && <CheckIcon size={24} color="var(--success, #10b981)" style={{display: 'inline', verticalAlign: 'middle'}} />}</h2>
          <p style={{ fontWeight: 'bold' }}>Young Schema Questionnaire</p>
          <p style={{ fontSize: '0.9rem', textAlign: 'left', marginTop: '1rem' }}>
            {isYsqDone ? "U heeft deze vragenlijst reeds ingevuld! Klik om eventueel opnieuw te beginnen." : "Hieronder volgen een aantal beweringen die men kan gebruiken om zichzelf te beschrijven. Lees elke bewering en kijk hoe goed deze u, in het afgelopen jaar, beschrijft."}
          </p>
        </div>
        
        <div className={`card glass-panel ${isSmiDone ? 'completed-card' : ''}`} onClick={() => onStart('smi')}>
          <BrainIcon size={48} useGradient={!isSmiDone} color={isSmiDone ? 'var(--success, #10b981)' : 'currentColor'} style={{ margin: '0 auto 1rem', display: 'block' }} />
          <h2>SMI {isSmiDone && <CheckIcon size={24} color="var(--success, #10b981)" style={{display: 'inline', verticalAlign: 'middle'}} />}</h2>
          <p style={{ fontWeight: 'bold' }}>Schema Mode Inventory</p>
          <p style={{ fontSize: '0.9rem', textAlign: 'left', marginTop: '1rem' }}>
             {isSmiDone ? "U heeft deze vragenlijst reeds ingevuld! Klik om eventueel opnieuw te beginnen." : "In deze vragenlijst staan uitspraken die mensen kunnen gebruiken om zichzelf te beschrijven. Beoordeel de FREQUENTIE; hoe vaak u overtuigd bent of het zo voelde."}
          </p>
        </div>
      </div>

      {hasAnyResult && (
        <div style={{ textAlign: 'center', marginTop: '3rem' }}>
          <button className="btn btn-gradient" onClick={onViewResults} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', padding: '1rem 2rem' }}>
            <ChartIcon size={24} color="white" /> Bekijk (Gecombineerd) Rapport
          </button>
        </div>
      )}

      <div style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', maxWidth: '600px', margin: '4rem auto 1rem', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          <ShieldIcon size={18} color="var(--success, #10b981)" /> Privacy & Veiligheid Gewaarborgd
        </p>
        <p style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
          Deze webapplicatie draait <strong>volledig lokaal</strong> in de browser op uw eigen apparaat. Uw gevoelige gegevens, testantwoorden en resultaten worden <strong>niet</strong> verzonden, <strong>niet</strong> opgeslagen op een server en <strong>nooit</strong> gedeeld met derden. Zodra u het venster sluit, zijn alle gegevens direct gewist. Sla uw rapport daarom altijd op via de Print-functie (als PDF), druk het direct af, of exporteer het als JSON-databestand voor uw eigen archief.
        </p>
      </div>
    </div>
  )
}
