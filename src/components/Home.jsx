import { ClipboardIcon, BrainIcon } from './Icons'

export default function Home({ onStart }) {
  return (
    <div className="home-container">
      <div className="header">
        <h1>Schema Therapy Questionnaires</h1>
        <p>Please select a questionnaire to begin.</p>
      </div>
      
      <div className="home-cards">
        <div className="card glass-panel" onClick={() => onStart('ysq')}>
          <ClipboardIcon size={48} color="var(--primary)" style={{ margin: '0 auto 1rem', display: 'block' }} />
          <h2>YSQ S3</h2>
          <p style={{ fontWeight: 'bold' }}>Young Schema Questionnaire</p>
          <p style={{ fontSize: '0.9rem', textAlign: 'left', marginTop: '1rem' }}>
            Hieronder volgen een aantal beweringen die men kan gebruiken om zichzelf te beschrijven. 
            Lees elke bewering en kijk hoe goed deze u, in het afgelopen jaar, beschrijft. Als u niet zeker bent van uw antwoord, baseer uw antwoord dan op wat u emotioneel voelt en niet op wat u denkt dat waar is.
          </p>
        </div>
        
        <div className="card glass-panel" onClick={() => onStart('smi')}>
          <BrainIcon size={48} color="var(--accent)" style={{ margin: '0 auto 1rem', display: 'block' }} />
          <h2>SMI</h2>
          <p style={{ fontWeight: 'bold' }}>Schema Mode Inventory</p>
          <p style={{ fontSize: '0.9rem', textAlign: 'left', marginTop: '1rem' }}>
            In deze vragenlijst staan uitspraken die mensen kunnen gebruiken om zichzelf te beschrijven. We willen u vragen van deze uitspraken de FREQUENTIE te beoordelen; dus hoe vaak u over het algemeen van de uitspraak overtuigd bent of hoe vaak het zo voelde.
          </p>
        </div>
      </div>
    </div>
  )
}
