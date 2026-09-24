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
        <div className={`card glass-panel ${isYsqDone ? 'completed-card' : ''}`} onClick={() => onStart('ysq')} style={{ display: 'flex', flexDirection: 'column' }}>
          <ClipboardIcon size={48} useGradient={!isYsqDone} color={isYsqDone ? 'var(--success, #10b981)' : 'currentColor'} style={{ margin: '0 auto 1rem', display: 'block' }} />
          <h2>YSQ S3 {isYsqDone && <CheckIcon size={24} color="var(--success, #10b981)" style={{display: 'inline', verticalAlign: 'middle'}} />}</h2>
          <p style={{ fontWeight: 'bold' }}>Young Schema Questionnaire</p>
          <div style={{ fontSize: '0.9rem', textAlign: 'left', marginTop: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
            {isYsqDone ? <span style={{ display: 'block' }}>U heeft deze vragenlijst reeds ingevuld! Klik om eventueel opnieuw te beginnen.</span> : (
              <>
                <span style={{ display: 'block', marginBottom: '0.8rem' }}>In deze vragenlijst volgt een aantal beweringen die men kan gebruiken om zichzelf te beschrijven. Lees elke bewering en kijk hoe goed deze u, in het afgelopen jaar, beschrijft. Als u niet zeker bent van uw antwoord, baseer uw antwoord dan op wat u emotioneel voelt en niet op wat u denkt dat waar is.</span>
                <span style={{ display: 'block', marginBottom: '0.8rem' }}>Een aantal beweringen vragen naar uw relaties met uw ouders of partner. Als één of meerdere van deze personen inmiddels overleden zijn, baseer dan uw antwoord op hoe uw relatie was toen zij nog leefden. Als u momenteel geen partner heeft, maar wel partners in het verleden hebt gehad, baseer dan uw antwoord op uw meest recente betekenisvolle partner.</span>
                <span style={{ display: 'block', marginBottom: '1.5rem' }}>Kies vervolgens het antwoord uit de opties 1-6 dat op u van toepassing is.</span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 'auto' }}>© 2020 Rijkeboer, M.M., Videler, A.C. , Rossi, G., van Alphen, S.P.J., & Legra, M.J.H. Nederlandse vertaling van de Young Schema Questionnaire - Short Form Version 3 (YSQ-3S) van Young, J.E., & Brown, G. (2005). Dutch translation approved by the International Society of Schema Therapy (ISST) and G. Brown, one of the original authors.</span>
              </>
            )}
          </div>
        </div>
        
        <div className={`card glass-panel ${isSmiDone ? 'completed-card' : ''}`} onClick={() => onStart('smi')} style={{ display: 'flex', flexDirection: 'column' }}>
          <BrainIcon size={48} useGradient={!isSmiDone} color={isSmiDone ? 'var(--success, #10b981)' : 'currentColor'} style={{ margin: '0 auto 1rem', display: 'block' }} />
          <h2>SMI {isSmiDone && <CheckIcon size={24} color="var(--success, #10b981)" style={{display: 'inline', verticalAlign: 'middle'}} />}</h2>
          <p style={{ fontWeight: 'bold' }}>Schema Mode Inventory</p>
          <div style={{ fontSize: '0.9rem', textAlign: 'left', marginTop: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
             {isSmiDone ? <span style={{ display: 'block' }}>U heeft deze vragenlijst reeds ingevuld! Klik om eventueel opnieuw te beginnen.</span> : (
              <>
                <span style={{ display: 'block', marginBottom: '1.5rem' }}>In deze vragenlijst staan uitspraken die mensen kunnen gebruiken om zichzelf te beschrijven. We willen u vragen van deze uitspraken de FREQUENTIE te beoordelen; dus hoe vaak u over het algemeen van de uitspraak overtuigd bent of hoe vaak het zo voelde.</span>
                <span style={{ display: 'block', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: 'auto' }}>© 2007 Young, J., Arntz, A., Atkinson, T., Lobbestael, J., Weishaar, M., van Vreeswijk, M en Klokman, J.</span>
              </>
             )}
          </div>
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
