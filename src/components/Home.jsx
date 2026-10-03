import { useRef, useState } from 'react'
import { ClipboardIcon, BrainIcon, CheckIcon, ChartIcon, ShieldIcon, InfoIcon, AlertTriangleIcon, CardsIcon, ArrowLeftIcon, ArrowRightIcon, PlayingCardsIcon, PlatformBadge } from './Icons'
import { ScrollText, Printer } from 'lucide-react'

export default function Home({ onStart, completedTests, onViewResults, onImport, onViewGamePortal }) {
  const fileInputRef = useRef(null)
  const [ysqExpanded, setYsqExpanded] = useState(false);
  const [smiExpanded, setSmiExpanded] = useState(false);
  const [theoryExpanded, setTheoryExpanded] = useState(false);
  const [showImportScreen, setShowImportScreen] = useState(false);
  const [justImported, setJustImported] = useState({ ysq: false, smi: false });
  
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
        setJustImported({ ysq: !!importedYsq, smi: !!importedSmi });
        setShowImportScreen(true);
      } else {
        alert("Geen geldige scores gevonden in dit bestand.");
      }
      
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

  if (showImportScreen) {
    const isYsqImported = justImported.ysq;
    const isSmiImported = justImported.smi;
    const bothCompletedNow = !!completedTests.ysq && !!completedTests.smi;

    const renderIcon = (listType) => {
      const IconComponent = listType === 'ysq' ? ClipboardIcon : BrainIcon;
      return (
        <div key={listType} style={{ position: 'relative', display: 'inline-block', margin: '0 10px' }}>
          <div style={{ background: 'linear-gradient(135deg, #34d399, #10b981)', padding: '1.2rem', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 25px rgba(16, 185, 129, 0.3)' }}>
            <IconComponent size={48} />
          </div>
          <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: '#10b981', color: 'white', borderRadius: '50%', padding: '4px', border: '3px solid var(--bg-main, #ffffff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <CheckIcon size={20} strokeWidth={3} />
          </div>
        </div>
      );
    };

    return (
      <div className="q-container" style={{ display: 'flex', alignItems: 'center' }}>
        <div className="q-content glass-panel" style={{ textAlign: 'center', padding: '3rem 2rem', margin: '2rem auto', maxWidth: '800px', width: '100%' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            {(isYsqImported || bothCompletedNow) && renderIcon('ysq')}
            {(isSmiImported || bothCompletedNow) && renderIcon('smi')}
          </div>
          <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
            {bothCompletedNow ? "Beide Lijsten Voltooid!" : "Lijst Ingeladen!"}
          </h2>

          {!bothCompletedNow && (
            <div className="glass-panel" style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '24px', color: 'var(--text-main)', marginBottom: '2rem', textAlign: 'left', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '50%', color: 'var(--text-muted)', flexShrink: 0 }}>
                <AlertTriangleIcon size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>U heeft nu alleen de {isYsqImported ? "YSQ" : "SMI"} ingeladen</strong>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>Het rapport is het meest waardevol als u beide lijsten invult of inlaadt.</p>
              </div>
              <button 
                className="btn btn-outline" 
                onClick={() => setShowImportScreen(false)}
                style={{ flexShrink: 0, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <ArrowLeftIcon size={18} /> Naar startpagina
              </button>
            </div>
          )}

          <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '650px', margin: '0 auto 2rem auto' }}>
            U heeft zojuist succesvol een CSV-bestand ingeladen.
            {bothCompletedNow && (
              <span style={{ display: 'block', marginTop: '0.5rem', color: '#10b981', fontWeight: 'bold' }}>
                Fantastisch! Daarmee heeft u nu beide lijsten voltooid en is uw profiel compleet.
              </span>
            )}
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3rem' }}>
            <button className="btn btn-gradient" onClick={() => onViewResults()} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', padding: '12px 24px', fontSize: '1.1rem' }}>
              Doorgaan naar Rapport <ArrowRightIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="home-container">
      <div className="header" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PlatformBadge theme="test" marginBottom="1.5rem" />
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
          <div style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.6', textAlign: 'left', marginTop: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
            {isYsqDone ? <span style={{ display: 'block' }}>U heeft deze vragenlijst reeds ingevuld! Klik om eventueel opnieuw te beginnen.</span> : (
              <>
                <span 
                  onClick={(e) => { e.stopPropagation(); setYsqExpanded(!ysqExpanded); }}
                  style={{ display: 'block', marginBottom: ysqExpanded ? '0.8rem' : 'auto', cursor: 'pointer' }}
                >
                  Breng je onderliggende kwetsbaarheden en patronen (schema's) in kaart. Deze vragenlijst helpt je ontdekken welke diepgewortelde overtuigingen over jezelf en de wereld bij jou een rol spelen.
                  {!ysqExpanded && <span style={{ display: 'block', marginTop: '8px', color: 'var(--primary)', fontWeight: 'bold' }}>Lees meer...</span>}
                </span>
                
                {ysqExpanded && (
                  <div onClick={(e) => e.stopPropagation()} style={{ cursor: 'default', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ display: 'block', marginBottom: '0.8rem' }}>Lees elke bewering en kijk hoe goed deze u, in het afgelopen jaar, beschrijft. Als u niet zeker bent van uw antwoord, baseer uw antwoord dan op wat u emotioneel voelt en niet op wat u denkt dat waar is.</span>
                    <span style={{ display: 'block', marginBottom: '0.8rem' }}>Een aantal beweringen gaat over uw relaties met uw ouders of partner. Als één of meerdere van deze personen inmiddels overleden zijn, baseer dan uw antwoord op hoe uw relatie was toen zij nog leefden. Als u momenteel geen partner heeft, maar wel partners in het verleden hebt gehad, baseer dan uw antwoord op uw meest recente betekenisvolle partner.</span>
                    <span style={{ display: 'block', marginBottom: '1.5rem' }}>Kies vervolgens het antwoord uit de opties 1-6 dat op u van toepassing is.</span>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-main)', marginTop: 'auto' }}>
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
          <div style={{ fontSize: '1rem', color: 'var(--text-main)', lineHeight: '1.6', textAlign: 'left', marginTop: '1rem', display: 'flex', flexDirection: 'column', flex: 1 }}>
             {isSmiDone ? <span style={{ display: 'block' }}>U heeft deze vragenlijst reeds ingevuld! Klik om eventueel opnieuw te beginnen.</span> : (
              <>
                <span 
                  onClick={(e) => { e.stopPropagation(); setSmiExpanded(!smiExpanded); }}
                  style={{ display: 'block', marginBottom: smiExpanded ? '0.8rem' : 'auto', cursor: 'pointer' }}
                >
                  Breng je actuele overlevingsmechanismen en gemoedstoestanden (modi) in kaart. Deze vragenlijst laat zien op welke manier je in het dagelijks leven reageert wanneer je geraakt wordt.
                  {!smiExpanded && <span style={{ display: 'block', marginTop: '8px', color: 'var(--primary)', fontWeight: 'bold' }}>Lees meer...</span>}
                </span>
                
                {smiExpanded && (
                  <div onClick={(e) => e.stopPropagation()} style={{ cursor: 'default', display: 'flex', flexDirection: 'column', flex: 1 }}>
                    <span style={{ display: 'block', marginBottom: '0.8rem' }}>We willen u vragen van deze uitspraken de FREQUENTIE te beoordelen; dus hoe vaak u over het algemeen van de uitspraak overtuigd bent of hoe vaak het zo voelde.</span>
                    <span style={{ display: 'block', marginBottom: '1.5rem' }}>Kies vervolgens het antwoord uit de opties 1-6 dat op u van toepassing is.</span>
                    <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--text-main)', marginTop: 'auto' }}>
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

      {hasAnyResult && (
        <div style={{ textAlign: 'center', margin: '2rem 0' }}>
          <button className="btn btn-gradient" onClick={handleViewResults} style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', padding: '1rem 2rem' }}>
            <ChartIcon size={24} color="white" /> Bekijk {isYsqDone && isSmiDone ? '(Gecombineerd)' : ''} Rapport
          </button>
        </div>
      )}

      <div style={{ color: 'var(--text-main)', padding: '2rem', background: 'var(--glass-bg, rgba(255, 255, 255, 0.05))', borderRadius: '16px', border: '1px solid var(--border-color)', textAlign: 'left', lineHeight: '1.6', fontSize: '1rem', maxWidth: '900px', margin: hasAnyResult ? '0 auto 2rem' : '3rem auto 2rem' }}>
        <h3 className="text-gradient" style={{ marginBottom: '1rem', fontSize: '1.2rem', textAlign: 'center' }}>Het verschil tussen de YSQ en de SMI</h3>
        <p style={{ marginBottom: '1rem', textAlign: 'center', maxWidth: '750px', margin: '0 auto 1rem auto' }}>
          Het belangrijkste verschil tussen de YSQ en de SMI zit in de diepte en de tijdelijkheid van wat ze meten.
        </p>
        <p style={{ marginBottom: theoryExpanded ? '2rem' : '0', textAlign: 'center', maxWidth: '750px', margin: '0 auto' }}>
          De YSQ meet je chronische kwetsbaarheden (de littekens), terwijl de SMI meet hoe je op dit moment reageert als die kwetsbaarheden worden geraakt (de overlevingsmechanismen).
          {!theoryExpanded && <span onClick={() => setTheoryExpanded(true)} style={{ display: 'block', marginTop: '8px', color: 'var(--primary)', cursor: 'pointer', fontWeight: 'bold' }}>Lees meer...</span>}
        </p>
        
        {theoryExpanded && (
          <>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.5rem', background: 'rgba(107, 114, 128, 0.05)', borderRadius: '12px', border: '1px solid rgba(107, 114, 128, 0.2)' }}>
                <div style={{ minHeight: '3.5rem', borderBottom: '1px solid rgba(255,255,255,0.05)', marginBottom: '1rem', paddingBottom: '0.5rem', display: 'flex', alignItems: 'flex-end' }}>
                  <h4 className="text-gradient" style={{ fontSize: '1.05rem', margin: 0 }}>YSQ: De Wonden & Overtuigingen</h4>
                </div>
                <p style={{ marginBottom: '0.8rem' }}><strong style={{ color: 'var(--text-main)' }}>Wat het meet:</strong> Vroege maladaptieve schema's. Dit zijn de diepgewortelde, vastgeroeste overtuigingen over jezelf en de wereld.</p>
                <p style={{ marginBottom: '0.8rem' }}><strong style={{ color: 'var(--text-main)' }}>Karakter:</strong> Chronisch, stabiel en altijd op de achtergrond aanwezig (te vergelijken met je 'klimaat'). Ze zijn ontstaan door tekorten in de kindertijd en vormen de kern van je kwetsbaarheid.</p>
                <p><strong style={{ color: 'var(--text-main)' }}>Voorbeeld:</strong> De hardnekkige overtuiging "Niemand zal er ooit echt voor mij zijn" of "Ik mag geen fouten maken". Dit is de knop die kan worden ingedrukt.</p>
              </div>
              <div style={{ padding: '1.5rem', background: 'rgba(107, 114, 128, 0.05)', borderRadius: '12px', border: '1px solid rgba(107, 114, 128, 0.2)' }}>
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
              <ul style={{ margin: '0 0 0 1.5rem', padding: 0, color: 'var(--text-main)' }}>
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




      <div style={{ marginTop: '4rem', textAlign: 'center', color: 'var(--text-main)', maxWidth: '600px', margin: '4rem auto 2rem auto', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <p className="text-gradient" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.05rem' }}>
          <CardsIcon size={24} useGradient={true} /> Kaarten & Tafelopstelling
        </p>
        <p style={{ lineHeight: '1.6', fontSize: '1rem' }}>
          Gebruik deze visuele toepassingen voor psycho-educatie in de spreekkamer, of zet ze in als interactieve studietool voor professionals in opleiding.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
          <a 
            href="kaarten.html"
            className="btn btn-outline" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '1rem', textDecoration: 'none' }}
          >
            <CardsIcon size={18} /> Kaarten
          </a>
          <a 
            href="tafel.html"
            className="btn btn-gradient-tafel" 
            style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', fontSize: '1rem', textDecoration: 'none', color: 'white' }}
          >
            <PlayingCardsIcon size={18} color="white" /> Tafelopstelling
          </a>
        </div>
      </div>

      <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-main)', maxWidth: '600px', margin: '2rem auto 2rem auto', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <p className="text-gradient" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.05rem' }}>
          <InfoIcon size={24} useGradient={true} /> Meer weten over Schematherapie?
        </p>
        <p style={{ lineHeight: '1.6', fontSize: '1rem' }}>
          Wilt u meer achtergrondinformatie over de theorie achter schema's en modi, of zoekt u een geregistreerde behandelaar? Bezoek dan de website van de <strong>Vereniging voor Schematherapie</strong>.
        </p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', marginTop: '1rem', flexWrap: 'wrap' }}>
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

      <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-main)', maxWidth: '600px', margin: '2rem auto 1rem', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <p className="text-gradient" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '1.05rem', lineHeight: '1.6', marginBottom: '0.5rem', fontWeight: 'bold' }}>
          <AlertTriangleIcon size={24} useGradient={true} /> Let op: Uw antwoorden worden niet automatisch opgeslagen!
        </p>
        <p style={{ color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
          Omdat de applicatie lokaal draait, bent u bij het afsluiten van de pagina uw gegevens kwijt. Sla daarom na het invullen uw resultaten op als PDF (alleen het rapport) of als CSV-bestand (alleen de resultaten).
          <br /><br />
          Heeft u de vragenlijst eerder al ingevuld en uw resultaten opgeslagen als een CSV-bestand? Dan kunt u deze hieronder direct inlezen om meteen door te gaan naar het rapport.
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

      <div style={{ marginTop: '2rem', textAlign: 'center', color: 'var(--text-main)', maxWidth: '600px', margin: '2rem auto 1rem', padding: '1rem', borderTop: '1px solid var(--border-color)' }}>
        <p className="text-gradient" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '0.5rem', fontWeight: 'bold', fontSize: '1.05rem' }}>
          <ShieldIcon size={24} useGradient={true} /> Privacy & Veiligheid
        </p>
        <p style={{ lineHeight: '1.6', fontSize: '1rem' }}>
          Deze webapplicatie verwerkt uw testantwoorden in de browser op uw eigen apparaat. Ze worden <strong>niet</strong> naar een eigen server gestuurd en <strong>niet</strong> centraal opgeslagen. Tijdens het invullen staat uw voortgang tijdelijk in de lokale opslag van uw browser, tot u de vragenlijst afrondt. Uw resultaten verdwijnen zodra u het venster sluit. Sla uw rapport daarom op via de PDF/Print-functie, druk het direct af, of exporteer uitsluitend uw testresultaten als CSV-databestand voor in uw eigen archief. U kunt dit CSV-bestand hier later altijd weer inlezen om het rapport opnieuw te genereren.<br /><br />
          <strong>Let op:</strong> De gecombineerde rapportage bevat een <em>optionele</em> AI-functionaliteit voor analyse. Indien u ervoor kiest deze te gebruiken, worden uw anonieme testresultaten (zonder herleidbare persoonsgegevens) ter analyse naar Google verzonden. Lees de{' '}
          <a href="#verantwoording" style={{ color: 'var(--primary)', fontWeight: '600' }}>verantwoording en privacyverklaring</a>.
        </p>
      </div>
    </div>
  )
}
