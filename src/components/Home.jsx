import { useRef, useState } from 'react'
import { ClipboardIcon, BrainIcon, CheckIcon, ChartIcon, ShieldIcon, InfoIcon, AlertTriangleIcon, CardsIcon } from './Icons'

export default function Home({ onStart, completedTests, onViewResults, onImport, onViewKaartenOverzicht, onViewTafelopstelling }) {
  const fileInputRef = useRef(null)
  const [ysqExpanded, setYsqExpanded] = useState(false);
  const [smiExpanded, setSmiExpanded] = useState(false);
  const [theoryExpanded, setTheoryExpanded] = useState(false);
  
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

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target.result;
      const lines = text.split('\n');
      let importedYsq = null;
      let importedSmi = null;
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        const parts = line.split(',');
        if (parts.length >= 3) {
          const type = parts[0];
          const qId = parseInt(parts[1], 10);
          const score = parseInt(parts[2], 10);
          if (!isNaN(qId) && !isNaN(score)) {
            if (type === 'YSQ') {
              if (!importedYsq) importedYsq = {};
              importedYsq[qId] = score;
            } else if (type === 'SMI') {
              if (!importedSmi) importedSmi = {};
              importedSmi[qId] = score;
            }
          }
        }
      }
      
      if (importedYsq || importedSmi) {
        onImport && onImport({ ysq: importedYsq, smi: importedSmi });
      } else {
        alert("Geen geldige scores gevonden in dit bestand.");
      }
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="home-container">
      <div className="header">
        <h1>Schema Therapy Questionnaires</h1>
        <p style={{ fontSize: '1rem', lineHeight: '1.6' }}>
          Hieronder vindt u twee vragenlijsten die worden ingezet binnen de schematherapie. 
          Door deze in te vullen krijgt u inzichten in uw onderliggende gevoeligheden (schema's) en uw huidige gedragspatronen (modi). 
          Vul beide vragenlijsten in voor een uitgebreid en gecombineerd analyserapport.
        </p>
      </div>
      
      <div className="home-cards">
        <div className={`card glass-panel ${isYsqDone ? 'completed-card' : ''}`} onClick={() => onStart('ysq')} style={{ display: 'flex', flexDirection: 'column' }}>
          <ClipboardIcon size={48} useGradient={!isYsqDone} color={isYsqDone ? 'var(--success, #10b981)' : 'currentColor'} style={{ margin: '0 auto 1rem', display: 'block' }} />
          <h2>YSQ S3 {isYsqDone && <CheckIcon size={24} color="var(--success, #10b981)" style={{display: 'inline', verticalAlign: 'middle'}} />}</h2>
          <p style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Young Schema Questionnaire</p>
          <div style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6', textAlign: 'left', marginTop: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
            {isYsqDone ? <span style={{ display: 'block' }}>U heeft deze vragenlijst reeds ingevuld! Klik om eventueel opnieuw te beginnen.</span> : (
              <>
                <span 
                  onClick={(e) => { e.stopPropagation(); setYsqExpanded(!ysqExpanded); }}
                  style={{ display: 'block', marginBottom: ysqExpanded ? '0.8rem' : 'auto', cursor: 'pointer' }}
                >
                  In deze vragenlijst volgt een aantal beweringen die men kan gebruiken om zichzelf te beschrijven.
                  {!ysqExpanded && <span style={{ display: 'block', marginTop: '8px', color: '#14b8a6', fontWeight: 'bold' }}>Lees meer...</span>}
                </span>
                
                {ysqExpanded && (
                  <div onClick={(e) => e.stopPropagation()} style={{ cursor: 'default', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ display: 'block', marginBottom: '0.8rem' }}>Lees elke bewering en kijk hoe goed deze u, in het afgelopen jaar, beschrijft. Als u niet zeker bent van uw antwoord, baseer uw antwoord dan op wat u emotioneel voelt en niet op wat u denkt dat waar is.</span>
                    <span style={{ display: 'block', marginBottom: '0.8rem' }}>Een aantal beweringen gaat over uw relaties met uw ouders of partner. Als één of meerdere van deze personen inmiddels overleden zijn, baseer dan uw antwoord op hoe uw relatie was toen zij nog leefden. Als u momenteel geen partner heeft, maar wel partners in het verleden hebt gehad, baseer dan uw antwoord op uw meest recente betekenisvolle partner.</span>
                    <span style={{ display: 'block', marginBottom: '1.5rem' }}>Kies vervolgens het antwoord uit de opties 1-6 dat op u van toepassing is.</span>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'auto' }}>
                      © 2020 Rijkeboer, M.M., Videler, A.C. , Rossi, G., van Alphen, S.P.J., & Legra, M.J.H. Nederlandse vertaling van de Young Schema Questionnaire - Short Form Version 3 (YSQ-3S) van Young, J.E., & Brown, G. (2005). Dutch translation approved by the International Society of Schema Therapy (ISST) and G. Brown, one of the original authors.
                      <span onClick={() => setYsqExpanded(false)} style={{ display: 'block', marginTop: '8px', color: '#14b8a6', cursor: 'pointer', fontWeight: 'bold' }}>Toon minder</span>
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
        
        <div className={`card glass-panel ${isSmiDone ? 'completed-card' : ''}`} onClick={() => onStart('smi')} style={{ display: 'flex', flexDirection: 'column' }}>
          <BrainIcon size={48} useGradient={!isSmiDone} color={isSmiDone ? 'var(--success, #10b981)' : 'currentColor'} style={{ margin: '0 auto 1rem', display: 'block' }} />
          <h2>SMI {isSmiDone && <CheckIcon size={24} color="var(--success, #10b981)" style={{display: 'inline', verticalAlign: 'middle'}} />}</h2>
          <p style={{ fontWeight: 'bold', color: 'var(--text-main)' }}>Schema Mode Inventory</p>
          <div style={{ fontSize: '1rem', color: 'var(--text-muted)', lineHeight: '1.6', textAlign: 'left', marginTop: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
             {isSmiDone ? <span style={{ display: 'block' }}>U heeft deze vragenlijst reeds ingevuld! Klik om eventueel opnieuw te beginnen.</span> : (
              <>
                <span 
                  onClick={(e) => { e.stopPropagation(); setSmiExpanded(!smiExpanded); }}
                  style={{ display: 'block', marginBottom: smiExpanded ? '0.8rem' : 'auto', cursor: 'pointer' }}
                >
                  In deze vragenlijst staan uitspraken die mensen kunnen gebruiken om zichzelf te beschrijven.
                  {!smiExpanded && <span style={{ display: 'block', marginTop: '8px', color: '#14b8a6', fontWeight: 'bold' }}>Lees meer...</span>}
                </span>
                
                {smiExpanded && (
                  <div onClick={(e) => e.stopPropagation()} style={{ cursor: 'default', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ display: 'block', marginBottom: '0.8rem' }}>We willen u vragen van deze uitspraken de FREQUENTIE te beoordelen; dus hoe vaak u over het algemeen van de uitspraak overtuigd bent of hoe vaak het zo voelde.</span>
                    <span style={{ display: 'block', marginBottom: '1.5rem' }}>Kies vervolgens het antwoord uit de opties 1-6 dat op u van toepassing is.</span>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: 'auto' }}>
                      © 2007 Young, J., Arntz, A., Atkinson, T., Lobbestael, J., Weishaar, M., van Vreeswijk, M en Klokman, J.
                      <span onClick={() => setSmiExpanded(false)} style={{ display: 'block', marginTop: '8px', color: '#14b8a6', cursor: 'pointer', fontWeight: 'bold' }}>Toon minder</span>
                    </span>
                  </div>
                )}
              </>
             )}
          </div>
        </div>
      </div>


      <div style={{ color: 'var(--text-muted)', padding: '2rem', background: 'var(--glass-bg, rgba(255, 255, 255, 0.05))', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'left', lineHeight: '1.6', fontSize: '0.95rem', maxWidth: '900px', margin: '3rem auto 2rem' }}>
        <h3 className="text-gradient" style={{ marginBottom: '1rem', fontSize: '1.2rem', textAlign: 'center' }}>Het verschil tussen de YSQ en de SMI</h3>
        <p style={{ marginBottom: theoryExpanded ? '1.5rem' : '0', textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
          Het belangrijkste verschil tussen de YSQ en de SMI zit in de diepte en de tijdelijkheid van wat ze meten.
          {!theoryExpanded && <span onClick={() => setTheoryExpanded(true)} style={{ display: 'block', marginTop: '8px', color: '#14b8a6', cursor: 'pointer', fontWeight: 'bold' }}>Lees meer...</span>}
        </p>
        
        {theoryExpanded && (
          <>
            <p style={{ marginBottom: '1.5rem', textAlign: 'center', maxWidth: '750px', margin: '0 auto 2rem' }}>
              De YSQ meet je chronische kwetsbaarheden (de littekens), terwijl de SMI meet hoe je op dit moment reageert als die kwetsbaarheden worden geraakt (de overlevingsmechanismen).
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.5rem', background: 'rgba(20, 184, 166, 0.05)', borderRadius: '12px', border: '1px solid rgba(20, 184, 166, 0.1)' }}>
                <div style={{ minHeight: '3.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '1rem', paddingBottom: '0.5rem', display: 'flex', alignItems: 'flex-end' }}>
                  <h4 className="text-gradient" style={{ fontSize: '1.05rem', margin: 0 }}>YSQ: De Wonden & Overtuigingen</h4>
                </div>
                <p style={{ marginBottom: '0.8rem' }}><strong style={{ color: 'var(--text-main)' }}>Wat het meet:</strong> Vroege maladaptieve schema's. Dit zijn de diepgewortelde, vastgeroeste overtuigingen over jezelf en de wereld.</p>
                <p style={{ marginBottom: '0.8rem' }}><strong style={{ color: 'var(--text-main)' }}>Karakter:</strong> Chronisch, stabiel en altijd op de achtergrond aanwezig (te vergelijken met je 'klimaat'). Ze zijn ontstaan door tekorten in de kindertijd en vormen de kern van je kwetsbaarheid.</p>
                <p><strong style={{ color: 'var(--text-main)' }}>Voorbeeld:</strong> De hardnekkige overtuiging "Niemand zal er ooit echt voor mij zijn" of "Ik mag geen fouten maken". Dit is de knop die kan worden ingedrukt.</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgba(20, 184, 166, 0.05)', borderRadius: '12px', border: '1px solid rgba(20, 184, 166, 0.1)' }}>
                <div style={{ minHeight: '3.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '1rem', paddingBottom: '0.5rem', display: 'flex', alignItems: 'flex-end' }}>
                  <h4 className="text-gradient" style={{ fontSize: '1.05rem', margin: 0 }}>SMI: De Reacties & Staten</h4>
                </div>
                <p style={{ marginBottom: '0.8rem' }}><strong style={{ color: 'var(--text-main)' }}>Wat het meet:</strong> Schemamodi. Dit zijn de actuele, wisselende emotionele toestanden, interne stemmen en gedragingen in het hier-en-nu.</p>
                <p style={{ marginBottom: '0.8rem' }}><strong style={{ color: 'var(--text-main)' }}>Karakter:</strong> Tijdelijk, veranderlijk en situatie-afhankelijk (te vergelijken met het 'weer'). Een modus is de acute overlevingsstand of emotie die direct 'aanspringt' zodra een oude wond uit de YSQ wordt geraakt.</p>
                <p><strong style={{ color: 'var(--text-main)' }}>Voorbeeld:</strong> Je trekt je terug, verdooft jezelf met werk of afleiding, of weigert nog iets uit te voeren (luiheid). Dit is niet wie je fundamenteel bént, maar de tijdelijke verdedigingslinie (zoals de Onthechte Zelfsusser of het Ongedisciplineerde Kind) die actief wordt om de pijn van het schema niet te voelen.</p>
              </div>
            </div>
            
            <div style={{ padding: '1.2rem 1.5rem', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '8px', borderLeft: '4px solid var(--primary)', maxWidth: '650px', margin: '0 auto', color: 'var(--text-main)' }}>
              <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>In de praktijk verhouden ze zich als volgt:</p>
              <ul style={{ margin: '0 0 0 1.5rem', padding: 0, color: 'var(--text-muted)' }}>
                <li style={{ marginBottom: '0.3rem' }}>De <strong className="text-gradient">YSQ</strong> brengt in kaart waar je pijn zit en waarom (de <em style={{ color: 'var(--text-main)' }}>oorzaak</em>).</li>
                <li>De <strong className="text-gradient">SMI</strong> brengt in kaart hoe je dat in het dagelijks leven oplost, wegduwt of overschreeuwt (het <em style={{ color: 'var(--text-main)' }}>gevolg</em>).</li>
              </ul>
            </div>

            <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
              <span onClick={() => setTheoryExpanded(false)} style={{ color: '#14b8a6', cursor: 'pointer', fontWeight: 'bold' }}>Toon minder</span>
            </div>
          </>
        )}
      </div>

      <div style={{ maxWidth: '900px', margin: '3rem auto 2rem', padding: '0 1rem' }}>
        <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '1.5rem' }}>Therapeutische Tools</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
          <div className="card glass-panel" onClick={onViewTafelopstelling} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '320px', padding: '2rem', cursor: 'pointer' }}>
            <div style={{ background: 'transparent', color: 'var(--primary)', padding: '10px', borderRadius: '50%', marginBottom: '1rem' }}>
              <CardsIcon size={56} useGradient={true} />
            </div>
            <h2 style={{ margin: '0 0 1rem 0' }}>Tafelopstelling</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem', flex: 1, margin: 0 }}>
              Interactief canvas om fysiek (digitaal) je eigen triggers in kaart te brengen. Sleep Modus, Schema en Basisbehoefte bij elkaar op tafel.
            </p>
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

      <div style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-muted)', maxWidth: '600px', margin: '4rem auto 2rem auto', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <p className="text-gradient" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          <AlertTriangleIcon size={24} useGradient={true} /> Let op: Uw antwoorden worden nergens opgeslagen!
        </p>
        <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Omdat de applicatie lokaal draait, bent u na het afsluiten van de pagina uw gegevens kwijt. U kunt na het invullen uw resultaten vastleggen door het rapport op te slaan als <strong>PDF of CSV</strong>. Heeft u al een CSV-bestand? Laad deze dan hieronder&nbsp;in.
        </p>
        <input 
          type="file" 
          accept=".csv" 
          ref={fileInputRef} 
          style={{ display: 'none' }} 
          onChange={handleFileUpload} 
        />
        <button 
          className="btn btn-outline" 
          onClick={() => fileInputRef.current?.click()}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="17 8 12 3 7 8"></polyline><line x1="12" y1="3" x2="12" y2="15"></line></svg>
          Importeer eerdere score (CSV)
        </button>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', maxWidth: '600px', margin: '2rem auto 1rem', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <p className="text-gradient" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.05rem' }}>
          <InfoIcon size={24} useGradient={true} /> Meer weten over Schematherapie?
        </p>
        <p style={{ lineHeight: '1.6', fontSize: '1rem' }}>
          Wilt u meer achtergrondinformatie over de theorie achter schema's en modi, of zoekt u een geregistreerde behandelaar? Bezoek dan de officiële website van de <strong>Nederlandse Vereniging voor Schematherapie</strong>.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          <button 
            onClick={onViewKaartenOverzicht}
            className="btn btn-outline"
            style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="3" y1="9" x2="21" y2="9"></line><line x1="9" y1="21" x2="9" y2="9"></line></svg> Bekijk alle theoriekaarten
          </button>
          <a 
            href="https://www.schematherapie.nl/home" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn btn-outline"
            style={{ textDecoration: 'none' }}
          >
            Naar schematherapie.nl
          </a>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-muted)', maxWidth: '600px', margin: '2rem auto 1rem', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <p className="text-gradient" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.05rem' }}>
          <ShieldIcon size={24} useGradient={true} /> Privacy & Veiligheid Gewaarborgd
        </p>
        <p style={{ lineHeight: '1.6', fontSize: '0.9rem' }}>
          Deze webapplicatie draait <strong>volledig lokaal</strong> in de browser op uw eigen apparaat. Uw gevoelige gegevens, testantwoorden en resultaten worden <strong>niet</strong> verzonden, <strong>niet</strong> opgeslagen op een server en <strong>nooit</strong> gedeeld met derden. Zodra u het venster sluit, zijn alle gegevens direct gewist. Sla uw rapport daarom altijd op via de PDF/Print functie, druk het direct af, of exporteer het als CSV-databestand voor uw eigen archief.
        </p>
      </div>
    </div>
  )
}
