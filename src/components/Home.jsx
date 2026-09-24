import { ClipboardIcon, BrainIcon, CheckIcon, ChartIcon, ShieldIcon, InfoIcon } from './Icons'

export default function Home({ onStart, completedTests, onViewResults }) {
  const isYsqDone = !!completedTests.ysq;
  const isSmiDone = !!completedTests.smi;
  const hasAnyResult = isYsqDone || isSmiDone;

  const handleViewResults = () => {
    if (isYsqDone && !isSmiDone) {
      if (!window.confirm("Let op: U heeft tot nu toe alleen de YSQ (Schema's) ingevuld.\n\nHet rapport is het meest waardevol als u beide lijsten invult.\nWilt u toch nu al het rapport bekijken?\n\nKlik op 'OK' om te bekijken, of 'Annuleren' om ook de SMI in te vullen.")) {
        return;
      }
    } else if (!isYsqDone && isSmiDone) {
      if (!window.confirm("Let op: U heeft tot nu toe alleen de SMI (Modi) ingevuld.\n\nHet rapport is het meest waardevol als u beide lijsten invult.\nWilt u toch nu al het rapport bekijken?\n\nKlik op 'OK' om te bekijken, of 'Annuleren' om ook de YSQ in te vullen.")) {
        return;
      }
    }
    onViewResults();
  }

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
            {isYsqDone ? "U heeft deze vragenlijst reeds ingevuld! Klik om eventueel opnieuw te beginnen." : "In deze vragenlijst volgt een aantal beweringen die men kan gebruiken om zichzelf te beschrijven. Lees elke bewering en kijk hoe goed deze u, in het afgelopen jaar, beschrijft. Als u niet zeker bent van uw antwoord, baseer uw antwoord dan op wat u emotioneel voelt en niet op wat u denkt dat waar is. Een aantal beweringen vragen naar uw relaties met uw ouders of partner. Als één of meerdere van deze personen inmiddels overleden zijn, baseer dan uw antwoord op hoe uw relatie was toen zij nog leefden. Als u momenteel geen partner heeft, maar wel partners in het verleden hebt gehad, baseer dan uw antwoord op uw meest recente betekenisvolle partner. Kies vervolgens het antwoord uit de opties 1-6 dat op u van toepassing is."}
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
          <button className="btn btn-gradient" onClick={handleViewResults} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', padding: '1rem 2rem' }}>
            <ChartIcon size={24} color="white" /> Bekijk {isYsqDone && isSmiDone ? '(Gecombineerd)' : ''} Rapport
          </button>
        </div>
      )}

      <div style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', maxWidth: '600px', margin: '4rem auto 1rem', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          <InfoIcon size={24} useGradient={true} /> Meer weten over Schematherapie?
        </p>
        <p style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
          Wilt u meer achtergrondinformatie over de theorie achter schema's en modi, of zoekt u een geregistreerde behandelaar? Bezoek dan de officiële website van de <strong>Nederlandse Vereniging voor Schematherapie</strong>.
        </p>
        <a 
          href="https://www.schematherapie.nl/home" 
          target="_blank" 
          rel="noopener noreferrer"
          className="btn btn-outline"
          style={{ display: 'inline-block', marginTop: '1rem', textDecoration: 'none' }}
        >
          Naar schematherapie.nl
        </a>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', maxWidth: '600px', margin: '2rem auto 1rem', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <p style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          <ShieldIcon size={24} useGradient={true} /> Privacy & Veiligheid Gewaarborgd
        </p>
        <p style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
          Deze webapplicatie draait <strong>volledig lokaal</strong> in de browser op uw eigen apparaat. Uw gevoelige gegevens, testantwoorden en resultaten worden <strong>niet</strong> verzonden, <strong>niet</strong> opgeslagen op een server en <strong>nooit</strong> gedeeld met derden. Zodra u het venster sluit, zijn alle gegevens direct gewist. Sla uw rapport daarom altijd op via de Print-functie (als PDF), druk het direct af, of exporteer het als JSON of CSV-databestand voor uw eigen archief.
        </p>
      </div>
    </div>
  )
}
