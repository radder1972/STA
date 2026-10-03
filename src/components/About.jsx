import React, { useState } from 'react';
import { InfoIcon, FileTextIcon, ShieldIcon, ArrowLeftIcon, BrainIcon, PlayingCardsIcon } from './Icons';
import Verantwoording from './Verantwoording';

// Gedeelde 'Over'-pagina voor de hele suite (Kaarten, Tafelopstelling, Hub en Vragenlijsten).
// theme: 'game' (blauw) of 'tafel' (groen); showBack: toon een Terug-knop (voor apps zonder menubalk)
export default function About({ onBack, initialTab = 'suite', theme = 'game', showBack = false }) {
  const [activeTab, setActiveTab] = useState(initialTab);
  const accent = theme === 'tafel' ? '#10b981' : '#0ea5e9';
  const btnActive = theme === 'tafel' ? 'btn btn-gradient-tafel' : 'btn btn-gradient-game';

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      
      {showBack && (
        <div className="no-print" style={{ width: '100%', maxWidth: '900px', margin: '0 auto 1.5rem auto' }}>
          <button className="btn btn-outline" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeftIcon size={18} /> Terug
          </button>
        </div>
      )}

      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto', position: 'relative', zIndex: 10 }}>
        <h1 className={theme === 'tafel' ? "text-gradient-tafel" : "text-gradient-game"} style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <InfoIcon size={40} useGameGradient={theme !== 'tafel'} /> Over de suite
        </h1>
        <h2 style={{ color: accent, margin: 0, fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.4', minHeight: '34px' }}>
          {activeTab === 'suite' ? 'De gedachte achter de Schematherapie Suite' : activeTab === 'waarom' ? 'De gedachte achter deze theoriekaarten' : activeTab === 'tafel' ? 'De gedachte achter de Digitale Tafelopstelling' : activeTab === 'maker' ? 'Wie zit er achter deze kaartenset?' : 'Voorbehouden en privacyverklaring van de suite'}
        </h2>
      </div>

      {/* Submenu Tabs */}
      <div className="tabs-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', width: '100%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '12px', gap: '8px', maxWidth: '100%' }}>
          <button 
            onClick={() => setActiveTab('suite')}
            className={activeTab === 'suite' ? btnActive : "btn btn-outline"} 
            style={{ margin: 0, border: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <BrainIcon size={18} color={activeTab === 'suite' ? 'white' : accent} /> Waarom de suite
          </button>
          <button 
            onClick={() => setActiveTab('waarom')}
            className={activeTab === 'waarom' ? btnActive : "btn btn-outline"} 
            style={{ margin: 0, border: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FileTextIcon size={18} color={activeTab === 'waarom' ? 'white' : accent} /> Waarom de kaarten
          </button>
          <button 
            onClick={() => setActiveTab('tafel')}
            className={activeTab === 'tafel' ? btnActive : "btn btn-outline"} 
            style={{ margin: 0, border: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <PlayingCardsIcon size={18} color={activeTab === 'tafel' ? 'white' : accent} /> Waarom de tafel
          </button>
          <button 
            onClick={() => setActiveTab('maker')}
            className={activeTab === 'maker' ? btnActive : "btn btn-outline"} 
            style={{ margin: 0, border: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <InfoIcon size={18} color={activeTab === 'maker' ? 'white' : accent} /> Over de maker
          </button>
          <button 
            onClick={() => setActiveTab('verantwoording')}
            className={activeTab === 'verantwoording' ? btnActive : "btn btn-outline"} 
            style={{ margin: 0, border: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <ShieldIcon size={18} color={activeTab === 'verantwoording' ? 'white' : accent} /> Voorbehouden &amp; privacy
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '900px', margin: '0 auto 4rem auto', position: 'relative', zIndex: 10, borderRadius: '24px' }}>
        
        {activeTab === 'suite' && (
          <div className="inner-box fade-in" style={{ background: 'white', display: 'flex', flexDirection: 'column', padding: '3rem' }}>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Waarom deze suite?</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1.5rem 0' }}>
              Schematherapie is rijk aan theorie, en juist dat maakt het in de praktijk lastig. Er zijn vragenlijsten om patronen in kaart te brengen, kaarten om ze bespreekbaar te maken, en een model om alles te verbinden. Maar die onderdelen staan vaak los van elkaar. Deze suite brengt ze samen, zodat een behandelaar of student van meting, naar begrip, naar gesprek kan werken, met dezelfde taal en dezelfde kleuren in elke stap.
            </p>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Drie onderdelen, één lijn</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#1e293b', fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem' }}>1. Vragenlijsten: eerst in beeld brengen</strong>
                <span style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.98rem' }}>
                  De YSQ-S3 en de SMI geven een scoreprofiel van schema's en modi, inclusief een gecombineerd rapport. Dat levert een gestructureerd beginpunt voor het gesprek, geen oordeel.
                </span>
              </div>
              <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#1e293b', fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem' }}>2. Kaarten: begrijpelijk en tastbaar maken</strong>
                <span style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.98rem' }}>
                  De theoriekaarten en werkvormen vertalen de abstracte begrippen naar iets wat je op tafel kunt leggen, bespreken en samen onderzoeken. Waarom de kaarten zijn zoals ze zijn, staat op het tabblad <em>Waarom de kaarten</em>.
                </span>
              </div>
              <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#1e293b', fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem' }}>3. Tafelopstelling: een concrete situatie ontleden</strong>
                <span style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.98rem' }}>
                  Met een eigen situatie koppel je trigger, modus, schema en onvervulde basisbehoefte aan elkaar en werk je toe naar een reactie vanuit de Gezonde Volwassene. Optionele AI-ondersteuning denkt mee met hypotheses, maar de behandelaar beslist. Zie het tabblad <em>Waarom de tafel</em>.
                </span>
              </div>
            </div>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Voor wie?</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1.5rem 0' }}>
              De suite is gemaakt voor behandelaars en professionals in opleiding. Voor de behandelaar is het een hulpmiddel in en rond de sessie. Voor de student is het een manier om de theorie te oefenen en te zien hoe de onderdelen samenhangen. Cliënten werken er in de spreekkamer mee, samen met hun behandelaar.
            </p>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Uitgangspunten</h3>
            <ul style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Ondersteunend, niet beslissend.</strong> Scores, kaarten en AI-suggesties helpen het gesprek. De professional blijft verantwoordelijk voor interpretatie en keuzes.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Eén taal.</strong> Dezelfde begrippen en kleurcodering lopen door alle onderdelen heen.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Privacy-bewust.</strong> Geen accounts en geen eigen database. Wat er met gegevens gebeurt, staat per onderdeel op het tabblad <em>Voorbehouden &amp; privacy</em>.</li>
              <li><strong>Transparant.</strong> De inhoud is openbaar in te zien, zodat je vooraf kunt beoordelen of het past bij jouw werkwijze.</li>
            </ul>

            <div style={{ marginTop: '1rem', padding: '1.5rem', background: '#eff6ff', borderRadius: '0 12px 12px 0', borderLeft: '4px solid #3b82f6' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '1.3rem', marginTop: 0, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <InfoIcon size={24} /> Het doel
              </h3>
              <p style={{ color: '#1e3a8a', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
                Schematherapie toegankelijker en samenhangender maken: voor de behandelaar in de praktijk, voor de student die de theorie leert, en voor de cliënt die taal zoekt voor zijn of haar patronen.
              </p>
            </div>

          </div>
        )}

        {activeTab === 'waarom' && (
          <div className="inner-box fade-in" style={{ background: 'white', display: 'flex', flexDirection: 'column', padding: '3rem' }}>
            
            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Waarom deze kaarten?</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0' }}>
              Schematherapie is een krachtige, diepgaande methode, maar de theorie kan voor cliënten soms abstract en overweldigend voelen. Met termen als 'schema's', 'modi' en 'domeinen' verlies je in je hoofd al snel het overzicht. Ons doel was helder: we wilden deze abstracte theorie tastbaar, overzichtelijk en visueel maken. Een tool waarmee je in de spreekkamer niet alleen <em>praat</em> over patronen, maar ze letterlijk op tafel kunt leggen om ze samen te onderzoeken.
            </p>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Geworteld in de theorie</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1rem 0' }}>
              Het fundament van dit deck rust stevig op het klassieke, empirisch getoetste grondmodel van Jeffrey Young (bekend van o.a. de YSQ-S3 en de SMI). We hebben de complexe materie teruggebracht tot een werkbare kern van 43 theoriekaarten in de basisset (en 55 kaarten in de volledige set inclusief uitbreiding), zonder concessies te doen aan de inhoudelijke diepgang:
            </p>
            <ul style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>Basisbehoeften (B):</strong> 5 behoeften in de basisset (7 in de volledige set). De universele kern van wat elk kind (en volwassene) nodig heeft.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Schema's (S):</strong> 18 schema's in de basisset (21 in de volledige set). De diepgewortelde patronen en overtuigingen die ontstaan als behoeften niet vervuld worden.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>Modi (M):</strong> 14 kernmodi in de basisset (20 in de volledige set, waaronder het Blije Kind). De actuele gemoedstoestanden en overlevingsmechanismen.</li>
              <li><strong>Categorieën (C):</strong> 6 groepen in de basisset (7 in de volledige set, inclusief Coping: Omkering) om gedrag en coping overzichtelijk te clusteren.</li>
            </ul>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: '2.5rem', marginBottom: '1rem' }}>Theoretische positionering: Klassiek model vs. recente theorie-ontwikkelingen</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1.25rem 0' }}>
              De theorie rondom schematherapie blijft in beweging. Op basis van een internationaal position paper (Arntz et al., 2021) zijn er in de vakliteratuur verschillende theoretische toevoegingen voorgesteld. Voor de basisset van dit kaartendeck is een bewuste en gefundeerde keuze gemaakt om primair uit te gaan van het <strong>klassieke, afgebakende en empirisch gevalideerde model van Jeffrey Young</strong>. 
            </p>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1.5rem 0' }}>
              De belangrijkste verschillen met nieuwere theoretische voorstellen op een rij:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '1.8rem' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#1e293b', fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem' }}>
                  1. Vijf in plaats van zeven basisbehoeften
                </strong>
                <span style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.98rem' }}>
                  Het basisdeck hanteert de 5 oorspronkelijke basisbehoeften. In recentere theorievorming zijn twee behoeften toegevoegd (<em>'Zelfcoherentie'</em> en <em>'Rechtvaardigheid'</em>). Wij kiezen in de basis voor de klassieke 5 behoeften vanwege hun directe, eenduidige aansluiting op de 5 schemadomeinen.
                </span>
              </div>

              <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#1e293b', fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem' }}>
                  2. Achttien in plaats van eenentwintig schema's
                </strong>
                <span style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.98rem' }}>
                  Het basisdeck bevat de 18 klassieke schema's die één-op-één aansluiten bij gevalideerde meetinstrumenten zoals de YSQ-S3. De drie nieuw voorgestelde schema's (<em>'Gebrek aan coherente identiteit'</em>, <em>'Gebrek aan een betekenisvolle wereld'</em> en <em>'Onrechtvaardigheid'</em>) vormen een waardevolle theoretische verdieping en zijn beschikbaar in de theorie-uitbreidingsset.
                </span>
              </div>

              <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#1e293b', fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem' }}>
                  3. Terminologie: 'Overcompensatie' versus 'Omkering'
                </strong>
                <span style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.98rem' }}>
                  In ons deck gebruiken we de internationaal vertrouwde term <em>Coping: Overcompensatie</em> (op de gele categoriekaart). In nieuwere publicaties wordt deze schemacoping ook wel 'omkering' genoemd. Beide begrippen beschrijven exact hetzelfde mechanisme: vechten tegen het schema door het tegenovergestelde gedrag te vertonen.
                </span>
              </div>

              <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#1e293b', fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem' }}>
                  4. Selectie van 14 kernmodi (geen forensische / specialistische modi)
                </strong>
                <span style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.98rem' }}>
                  In de bredere theorie bestaat een grotere waaier aan disfunctionele copingmodi, waaronder specialistische en forensische modi zoals <em>'Bedrog en manipulatie'</em> of <em>'Roofdier'</em>. Voor de algemene praktijk, psycho-educatie en de veiligheid binnen therapeutische sessies en werkvormen hebben we in de basisset bewust gekozen voor een compacte, breed herkenbare selectie van 14 kernmodi conform de Schema Mode Inventory (SMI).
                </span>
              </div>
            </div>

            <div style={{ padding: '1.5rem', background: '#eff6ff', borderRadius: '0 12px 12px 0', borderLeft: '4px solid #3b82f6', marginBottom: '2.5rem' }}>
              <h4 style={{ color: '#1e3a8a', fontSize: '1.15rem', marginTop: 0, marginBottom: '0.5rem' }}>
                Waarom deze keuze voor de praktijk?
              </h4>
              <p style={{ color: '#1e3a8a', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
                Voor een visuele en interactieve interventie op tafel staat <strong>behapbaarheid en herkenbaarheid voorop</strong>. Een overdaad aan complexe nuances zorgt bij cliënten snel voor cognitieve overbelasting. Door uit te gaan van het robuuste 18-schema's en 5-domeinen fundament van Young behoudt het deck zijn maximale didactische kracht, wetenschappelijke helderheid en directe bruikbaarheid in de spreekkamer. Voor therapeuten die ook de nieuwere concepten willen gebruiken, is er de theorie-uitbreidingsset.
              </p>
            </div>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Twee 'kleurwerelden' voor therapeutisch inzicht</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1rem 0' }}>
              Het meest unieke aan dit ontwerp is de manier waarop we kleur gebruiken om logische therapeutische verbindingen te visualiseren. De kaartenset kent twee 'kleurwerelden':
            </p>
            <ol style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1rem 0', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>De Inhoud (De Domeinen):</strong> De Basisbehoeften en Schema's delen samen hun kleurcodering: 5 domeinkleuren in de basisset, aangevuld tot 7 domeinkleuren in de volledige set (met paars voor Zelfcoherentie en bruin voor Rechtvaardigheid). Een onvervulde basisbehoefte (bijv. de blauwe kaart 'Veiligheid & Verbinding') deelt zo exact dezelfde kleur als het schema dat daaruit ontstaat (bijv. het blauwe schema 'Verlating / Instabiliteit'). Dit maakt de route van oorzaak en gevolg in één oogopslag helder.</li>
              <li><strong>Het Gedrag (De Categorieën):</strong> De Modi hebben een eigen kleurcodering, puur gebaseerd op hun modusgroep (blauw = Kind, rood = Ouder, geel = Coping, groen = Gezonde kant).</li>
            </ol>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0' }}>
              Wanneer binnen een interactieve werkvorm een gele Coping-modus op een blauw Schema wordt gelegd, zien we op tafel letterlijk wat er in het brein gebeurt: het gedrag (de modus) overschrijft de onderliggende inhoud (het schema). De actieve kleur op tafel verandert. Om patronen te doorbreken, redeneert de cliënt in de theorie terug naar de Basisbehoefte om uiteindelijk te eindigen met de Gezonde Volwassene of het Blije Kind.
            </p>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Menselijke taal en minimalistisch design</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0' }}>
              Vakjargon kan afstandelijk voelen. Daarom hebben we de taal op de kaarten waar mogelijk iets menselijker gemaakt. We kozen bijvoorbeeld voor de term <em>'Minderwaardigheid / Schaamte'</em> in plaats van de harde vakterm <em>'Defectheid'</em>. De illustraties zijn bewust minimalistisch gehouden: overzichtelijke lijntekeningen met een lichte kleuraccentuering. Dit zorgt ervoor dat de focus in de therapiesessie blijft op de emotie en de herkenning, en niet op een overprikkelend design.
            </p>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>De balans tussen ernst en toegankelijkheid</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1rem 0' }}>
              De spanning tussen de ernst van problematiek en toegankelijkheid is een belangrijk uitgangspunt bij de ontwikkeling van deze set. We positioneren het primair als een tastbare, visuele toolset voor psycho-educatie. Speelse elementen in therapie bagatelliseren de problematiek niet, maar verlagen juist de drempel om erover in gesprek te gaan. Juist bij abstracte en zware thema's, waar cliënten vaak vastlopen in diepe patronen of schaamte, helpt een fysiek object op tafel om de dynamiek te doorbreken. Het externeert het probleem: de cliënt is niet zijn afwijzingsschema of boze modus, maar kijkt naar een kaartje op tafel. Dat creëert direct een veilige, psychologische afstand waardoor het ineens veel makkelijker wordt om de eigen mechanismen te analyseren. De therapeut bepaalt of de kaarten puur als visuele tafelopstelling worden gebruikt, of dat er een interactieve spelvorm wordt ingezet.
            </p>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0' }}>
              Voor wie dat aanspreekt, bieden de werkvormen een interactieve spelvorm die de theorie in actie brengt. De theorie is niet gereduceerd tot winnen of verliezen; de dynamiek stimuleert de cliënt tot het zetten van kloppende therapeutische stappen. Dat een modus de 'kleurwereld' van de inhoud dwarsboomt, patronen herleid moeten worden naar een basisbehoefte, en dat altijd wordt geëindigd met een gezonde eindkaart (de Gezonde Volwassene of het Blije Kind), zijn interactieve vertalingen van serieuze therapeutische doelen. De set fungeert hiermee als een vehikel voor dialoog en bewustwording, en levert zo een waardevolle en verantwoorde bijdrage in de spreekkamer.
            </p>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Interactieve studietool voor professionals</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0' }}>
              Naast het gebruik in de spreekkamer, is de set uitermate geschikt als interactieve studietool voor professionals in opleiding (zoals psychologiestudenten, GZ-psychologen en SPV'ers). De theorie is taai om uit het hoofd te leren, maar omdat de kleuren de verbindingen tussen behoefte, schema en modus visueel maken, functioneren de kaarten als superieure flashcards. Studenten kunnen de verschillende spelvormen toepassen om elkaar te overhoren, wat hen stimuleert om razendsnel te schakelen tussen de theorie zonder de emotionele zwaarte van een echte sessie.
            </p>

            <div style={{ marginTop: '1rem', padding: '1.5rem', background: '#eff6ff', borderRadius: '0 12px 12px 0', borderLeft: '4px solid #3b82f6' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '1.3rem', marginTop: 0, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <InfoIcon size={24} /> Het doel: Psycho-educatie & Dialoog
              </h3>
              <p style={{ color: '#1e3a8a', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
                Uiteindelijk is deze toolset geen speelgoed of gezelschapsspel, maar een visueel therapeutisch hulpmiddel. De dynamiek van het matchen, het inzetten van categoriekaarten en het verplicht eindigen met een gezonde eindkaart (de Gezonde Volwassene of het Blije Kind) is een optionele werkvorm voor het therapeutische gesprek. Het helpt cliënten om taal te geven aan hun patronen, afstand te nemen van hun modi, en stap voor stap de regie terug te pakken.
              </p>
            </div>

          </div>
        )}

        {activeTab === 'tafel' && (
          <div className="inner-box fade-in" style={{ background: 'white', display: 'flex', flexDirection: 'column', padding: '3rem' }}>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Waarom een tafelopstelling?</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1.5rem 0' }}>
              Een cliënt reageert op een moment in zijn of haar leven op een manier die hem of haar zelf vaak ook verbaast: boosheid, terugtrekken, pleasen. In schematherapie is de verklaring een keten: een trigger raakt een onvervulde basisbehoefte, activeert een schema en roept een modus op. Die keten is lastig te volgen als je hem alleen in gedachten of in woorden houdt. Door de onderdelen als kaarten op tafel te leggen, wordt de keten zichtbaar en kan de cliënt er samen met de behandelaar naar kijken, in plaats van erin te zitten.
            </p>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Waarom digitaal?</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1.5rem 0' }}>
              De digitale versie helpt een behandelaar om de opstelling te structureren en voor te bereiden, en maakt het mogelijk om de uitkomst te printen of op te slaan als PDF. Daarnaast kan optionele AI-ondersteuning een tweede blik bieden: een voorstel voor schema's, modi en de geraakte basisbehoefte, om de eigen hypothese naast te leggen. De fysieke gedachte blijft staan: het gaat om het gesprek aan tafel.
            </p>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Drie stappen</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
              <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#1e293b', fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem' }}>1. Beschrijf de situatie</strong>
                <span style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.98rem' }}>
                  Je begint bij een concrete, objectief beschreven trigger-situatie. Een goed begin voorkomt dat het gesprek meteen in interpretaties blijft hangen.
                </span>
              </div>
              <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#1e293b', fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem' }}>2. Stel de opstelling samen</strong>
                <span style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.98rem' }}>
                  Je kiest de geraakte basisbehoefte en legt schema's en modi op tafel. Op verzoek geeft de AI differentiële hypotheses met een kwalitatieve indicatie (sterk, matig of zwak). De behandelaar bepaalt welke kaarten er daadwerkelijk komen te liggen.
                </span>
              </div>
              <div style={{ padding: '1.25rem 1.5rem', background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0' }}>
                <strong style={{ color: '#1e293b', fontSize: '1.05rem', display: 'block', marginBottom: '0.35rem' }}>3. Analyseer en werk naar de Gezonde Volwassene</strong>
                <span style={{ color: '#475569', lineHeight: '1.6', fontSize: '0.98rem' }}>
                  Met een ketenanalyse en psycho-educatie maak je de modus-cyclus begrijpelijk, en je kunt een voorstel laten maken voor een reactie vanuit de Gezonde Volwassene. Ook dit zijn suggesties om mee te werken, geen vastgestelde uitkomsten.
                </span>
              </div>
            </div>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Waarom altijd naar de Gezonde Volwassene toe?</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1.5rem 0' }}>
              De opstelling is geen diagnosekaart maar een route. Begrijpen welke modus actief is, is nuttig als het uiteindelijk helpt om een andere keuze te maken. Daarom eindigt de opstelling bij de vraag wat de Gezonde Volwassene hier zou doen.
            </p>

            <div style={{ marginTop: '1rem', padding: '1.5rem', background: '#ecfdf5', borderRadius: '0 12px 12px 0', borderLeft: '4px solid #10b981' }}>
              <h3 style={{ color: '#065f46', fontSize: '1.15rem', marginTop: 0, marginBottom: '0.75rem' }}>
                Let op bij AI
              </h3>
              <p style={{ color: '#065f46', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
                AI-suggesties zijn indicatief en kunnen fouten bevatten. Ze vervangen geen professioneel oordeel. Voer in de situatiebeschrijving geen herleidbare gegevens in en anonimiseer de casus. Wat er precies met de invoer gebeurt, staat op het tabblad <em>Voorbehouden &amp; privacy</em>.
              </p>
            </div>

          </div>
        )}

        {activeTab === 'maker' && (
          <div className="inner-box fade-in" style={{ background: 'white', display: 'flex', flexDirection: 'column', padding: '3rem' }}>
            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Over de maker & Verantwoording</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0' }}>
              Deze theoriekaarten zijn met veel zorg en aandacht ontwikkeld vanuit de wens om de waardevolle, maar soms complexe materie van schematherapie visueel en direct toepasbaar te maken. De inhoud, de begrippen en de mechanismen in deze kaartenset zijn zorgvuldig samengesteld op basis van erkende vakliteratuur, de grondbeginselen van Jeffrey Young (het klassieke 18-schema's en 5-domeinen model) en de gangbare diagnostische indelingen (YSQ en SMI).
            </p>

            <div style={{ marginTop: '1rem', padding: '1.5rem', background: '#eff6ff', borderRadius: '0 12px 12px 0', borderLeft: '4px solid #3b82f6' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '1.15rem', marginTop: 0, marginBottom: '0.75rem' }}>
                Belangrijke disclaimer:
              </h3>
              <p style={{ color: '#1e3a8a', fontSize: '1.05rem', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
                Deze kaartenset is een onafhankelijk, creatief initiatief, ontworpen als praktisch hulpmiddel om de dialoog over patronen en behoeften op een visuele en tastbare manier te faciliteren. Het is een onafhankelijke uitgave en niet verbonden aan of geaccrediteerd door beroepsverenigingen.
              </p>
              <p style={{ color: '#1e3a8a', fontSize: '1.05rem', lineHeight: '1.6', margin: '0 0 1rem 0' }}>
                Om volledige transparantie te bieden, zijn de exacte teksten, begrippen en de indeling van alle kaarten openbaar in te zien op deze website. Therapeuten kunnen zo vooraf tot in detail controleren wat het deck bevat en zelf beoordelen of dit aansluit bij hun visie en werkwijze. De keuze om deze kaarten als hulpmiddel in te zetten binnen een sessie valt dan ook onder de eigen professionele verantwoordelijkheid van de behandelend professional. De kaartenset is nadrukkelijk bedoeld als aanvullende, laagdrempelige ondersteuning en is geen vervanging voor formele diagnostiek of een gedegen professionele behandeling.
              </p>
              <p style={{ color: '#1e3a8a', fontSize: '1.05rem', lineHeight: '1.6', margin: 0 }}>
                Alle voorbehouden en de privacyverklaring van de hele suite staan op het tabblad <a href="#verantwoording" onClick={(e) => { e.preventDefault(); setActiveTab('verantwoording'); window.scrollTo(0, 0); }} style={{ color: '#1e3a8a', fontWeight: '700' }}>Voorbehouden &amp; privacy</a>.
              </p>
            </div>
          </div>
        )}

        {activeTab === 'verantwoording' && (
          <div className="inner-box fade-in" style={{ background: 'white', display: 'flex', flexDirection: 'column', padding: '3rem' }}>
            <Verantwoording embedded />
          </div>
        )}

      </div>
    </div>
  );
}
