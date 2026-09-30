import React, { useState } from 'react';
import { InfoIcon, FileTextIcon } from './Icons';

export default function About({ onBack }) {
  const [activeTab, setActiveTab] = useState('waarom');

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '2rem', width: '100%', maxWidth: '800px', margin: '0 auto 2rem auto', position: 'relative', zIndex: 10 }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <InfoIcon size={48} useGameGradient={true} /> Verantwoording
        </h1>
        <h2 style={{ color: 'var(--text-muted)', margin: 0, fontWeight: '500', fontSize: '1.5rem', lineHeight: '1.4' }}>
          {activeTab === 'waarom' ? 'De gedachte achter deze theoriekaarten' : 'Wie zit er achter dit spel?'}
        </h2>
      </div>

      {/* Submenu Tabs */}
      <div className="tabs-container" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', width: '100%', overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '12px', gap: '8px', minWidth: 'min-content' }}>
          <button 
            onClick={() => setActiveTab('waarom')}
            className={activeTab === 'waarom' ? "btn btn-gradient-game" : "btn btn-outline"} 
            style={{ margin: 0, border: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <FileTextIcon size={18} /> De Theorie
          </button>
          <button 
            onClick={() => setActiveTab('maker')}
            className={activeTab === 'maker' ? "btn btn-gradient-game" : "btn btn-outline"} 
            style={{ margin: 0, border: 'none', whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <InfoIcon size={18} /> Over de maker
          </button>
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '900px', margin: '0 auto 4rem auto', position: 'relative', zIndex: 10, borderRadius: '24px' }}>
        
        {activeTab === 'waarom' && (
          <div className="inner-box fade-in" style={{ background: 'white', display: 'flex', flexDirection: 'column', padding: '3rem' }}>
            
            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Waarom deze kaarten?</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0' }}>
              Schematherapie is een krachtige, diepgaande methode, maar de theorie kan voor cliënten soms abstract en overweldigend voelen. Met termen als 'schema's', 'modi' en 'domeinen' verlies je in je hoofd al snel het overzicht. Ons doel was helder: we wilden deze abstracte theorie tastbaar, overzichtelijk en visueel maken. Een tool waarmee je in de spreekkamer niet alleen <em>praat</em> over patronen, maar ze letterlijk op tafel kunt leggen om ze samen te onderzoeken.
            </p>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Geworteld in de theorie</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1rem 0' }}>
              Het fundament van dit deck rust stevig op de theorie van Jeffrey Young en sluit naadloos aan bij de richtlijnen van de Vereniging voor Schematherapie (VSt). We hebben de complexe materie teruggebracht tot een werkbare kern van 43 theoriekaarten, zonder concessies te doen aan de inhoudelijke diepgang:
            </p>
            <ul style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>5 Basisbehoeften (B):</strong> De universele kern van wat elk kind (en volwassene) nodig heeft.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>18 Schema's (S):</strong> De diepgewortelde patronen en overtuigingen die ontstaan als behoeften niet vervuld worden.</li>
              <li style={{ marginBottom: '0.5rem' }}><strong>14 Modi (M):</strong> De actuele gemoedstoestanden en overlevingsmechanismen (hierbij hebben we een scherpe selectie gemaakt van de meest voorkomende en werkbare kernmodi, zoals de Straffende Ouder en de Onthechte Beschermer).</li>
              <li><strong>6 Categorieën (C):</strong> De overkoepelende groepen om gedrag te clusteren.</li>
            </ul>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Twee 'kleurwerelden' voor therapeutisch inzicht</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1rem 0' }}>
              Het meest unieke aan dit ontwerp is de manier waarop we kleur gebruiken om logische therapeutische verbindingen te visualiseren. Het spel kent twee 'kleurwerelden':
            </p>
            <ol style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1rem 0', paddingLeft: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}><strong>De Inhoud (De Domeinen):</strong> De Basisbehoeften en Schema's delen samen 5 kleuren. Een onvervulde basisbehoefte (bijv. de blauwe kaart 'Veilige hechting') deelt zo exact dezelfde kleur als het schema dat daaruit ontstaat (bijv. het blauwe schema 'Verlating'). Dit maakt de route van oorzaak en gevolg in één oogopslag helder.</li>
              <li><strong>Het Gedrag (De Categorieën):</strong> De Modi hebben een eigen kleurcodering, puur gebaseerd op hun modusgroep (blauw = Kind, rood = Ouder, geel = Coping, groen = Gezonde Volwassene).</li>
            </ol>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0' }}>
              Wanneer een speler in het spel een gele Coping-modus op een blauw Schema legt, zien we op tafel letterlijk wat er in het brein gebeurt: het gedrag (de modus) overschrijft de onderliggende inhoud (het schema). De actieve kleur op tafel verandert. Om patronen te doorbreken, moet de speler (de cliënt) in de theorie terug redeneren naar de Basisbehoefte om uiteindelijk te kunnen eindigen met de groene Gezonde Volwassene.
            </p>

            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Menselijke taal en minimalistisch design</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0' }}>
              Klinisch jargon kan afstandelijk voelen. Daarom hebben we de taal op de kaarten waar mogelijk iets menselijker gemaakt. We kozen bijvoorbeeld voor de term <em>'Tekortschieten / Schaamte'</em> in plaats van de harde klinische term <em>'Defectheid'</em>. De illustraties zijn bewust minimalistisch gehouden: overzichtelijke lijntekeningen met een lichte kleuraccentuering. Dit zorgt ervoor dat de focus in de therapiesessie blijft op de emotie en de herkenning, en niet op een overprikkelend design.
            </p>

            <div style={{ marginTop: '1rem', padding: '1.5rem', background: '#eff6ff', borderRadius: '0 12px 12px 0', borderLeft: '4px solid #3b82f6' }}>
              <h3 style={{ color: '#1e3a8a', fontSize: '1.3rem', marginTop: 0, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <InfoIcon size={24} /> Het doel: Dialoog boven winnen
              </h3>
              <p style={{ color: '#1e3a8a', fontSize: '1.1rem', lineHeight: '1.6', margin: 0 }}>
                Uiteindelijk is dit deck geen gewone spelletjesdoos. De dynamiek van het matchen, het inzetten van actiekaarten en het verplicht eindigen met de Gezonde Volwassene is een speels voertuig voor het therapeutische gesprek. Het helpt cliënten om taal te geven aan hun patronen, afstand te nemen van hun modi, en stap voor stap de regie terug te pakken.
              </p>
            </div>

          </div>
        )}

        {activeTab === 'maker' && (
          <div className="inner-box fade-in" style={{ background: 'white', display: 'flex', flexDirection: 'column', padding: '3rem' }}>
            <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Over de maker</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 2rem 0' }}>
              Hier komt straks de tekst over jou, de maker van dit fantastische theorie-spel! Je kunt hier iets vertellen over je achtergrond als therapeut of ontwerper, je persoonlijke drijfveren om dit spel te maken, of een leuke anekdote over het ontwerpproces.
            </p>
            <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '12px', border: '1px dashed #cbd5e1', textAlign: 'center' }}>
              <p style={{ color: '#64748b', margin: 0, fontStyle: 'italic' }}>Plak hier straks je tekst over de maker in de code...</p>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
