import React, { useState } from 'react';
import { ArrowLeftIcon, FileTextIcon, ScrollTextIcon, DicesIcon, LightbulbIcon, CardsIcon } from './Icons';
import { Printer } from 'lucide-react';

const TurnBox = ({ turnNumber, playerTitle, children }) => (
  <div style={{ background: 'white', borderRadius: '12px', border: '1px solid #cbd5e1', padding: '1.5rem', marginBottom: '1.5rem', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.02)' }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1rem' }}>
      <div style={{ background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', fontWeight: 'bold', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', fontSize: '1rem', flexShrink: 0, boxShadow: '0 2px 4px rgba(59, 130, 246, 0.3)' }}>
        {turnNumber}
      </div>
      <h4 style={{ color: '#0f172a', margin: 0, fontSize: '1.15rem' }}>{playerTitle}</h4>
    </div>
    <div style={{ color: '#334155', fontSize: '1rem', lineHeight: '1.6' }}>
      {children}
    </div>
  </div>
);

const ColorBadge = ({ color, text }) => {
  const colorStyles = {
    'Blauw': { bg: '#eff6ff', text: '#1e3a8a', border: '#bfdbfe', dot: '#3b82f6' },
    'Geel': { bg: '#fefce8', text: '#854d0e', border: '#fef08a', dot: '#eab308' },
    'Groen': { bg: '#f0fdf4', text: '#166534', border: '#bbf7d0', dot: '#22c55e' },
    'Rood': { bg: '#fef2f2', text: '#991b1b', border: '#fecaca', dot: '#ef4444' },
    'Oranje': { bg: '#fff7ed', text: '#9a3412', border: '#fed7aa', dot: '#f97316' },
    'Paars': { bg: '#faf5ff', text: '#6b21a8', border: '#e9d5ff', dot: '#a855f7' },
    'Roze': { bg: '#fdf2f8', text: '#9d174d', border: '#fbcfe8', dot: '#ec4899' },
    'Bruin': { bg: '#fbf7ee', text: '#78350f', border: '#e6d5bc', dot: '#78350f' }
  };
  const style = colorStyles[color] || colorStyles['Blauw'];
  return (
    <span style={{ display: 'inline-flex', alignItems: 'center', background: style.bg, color: style.text, border: `1px solid ${style.border}`, padding: '2px 8px', borderRadius: '12px', fontSize: '0.85rem', fontWeight: '600', marginLeft: '4px', marginRight: '4px', whiteSpace: 'nowrap' }}>
      <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: style.dot, marginRight: '6px' }}></span>
      {text || color}
    </span>
  );
};

export default function GameRules({ onBack }) {
  const [filter, setFilter] = useState('optie1');
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="view-container game-rules-page" style={{ padding: '2rem', minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .game-rules-page { background: white !important; padding: 0 !important; }
          .rules-content { box-shadow: none !important; border: none !important; padding: 0 !important; }
          .rule-box { border: none !important; box-shadow: none !important; background: white !important; padding: 1rem 0 !important; }
          body { color: black !important; }
        }
        
        .rule-box {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          display: flex;
          gap: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03);
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        
        .rule-box:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        }
        
        .rule-number {
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 40px;
          width: 40px;
          height: 40px;
          background: linear-gradient(135deg, #64748b 0%, #3b82f6 100%);
          color: white;
          border-radius: 50%;
          font-weight: bold;
          font-size: 1.25rem;
          box-shadow: 0 4px 6px rgba(59, 130, 246, 0.3);
        }

        .rule-title {
          font-size: 1.25rem;
          color: #1e293b;
          margin: 0 0 0.5rem 0;
          font-weight: 700;
        }

        .rule-text {
          font-size: 1.05rem;
          line-height: 1.6;
          color: #475569;
          margin: 0;
        }
        
        @media (max-width: 600px) {
          .rule-box {
            flex-direction: column;
            gap: 1rem;
          }
        }
      `}</style>
      <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <FileTextIcon size={40} useGameGradient={true} /> Werkvormen & Spelvormen
        </h1>
        <h2 style={{ color: '#0ea5e9', margin: 0, fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.4' }}>Zet de theorie in actie met interactieve werkvormen en spelvormen</h2>
      </div>

      <div className="tabs-container no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', width: '100%', overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '12px', gap: '8px', minWidth: 'min-content' }}>
          <button onClick={handlePrint} className="btn btn-gradient-game" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, border: 'none', whiteSpace: 'nowrap' }}>
            <Printer size={18} /> Print Werkvormen
          </button>
        </div>
      </div>
      
      <div className="glass-panel rules-content" style={{ 
        maxWidth: '850px', 
        margin: '0 auto', 
        padding: '3rem', 
        borderRadius: '24px',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
      }}>

        
        <div className="inner-box">
          <h3 className="box-heading">
            <CardsIcon size={28} useGameGradient={true} /> Wat zit er in de kaartenset?
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#475569', marginBottom: '1.5rem' }}>
            De werkvormen en spelvormen kunnen gespeeld worden met zowel de <strong>Klassieke Basisset (43 theoriekaarten)</strong> als de <strong>Volledige Set (55 theoriekaarten)</strong> inclusief de theorie-uitbreiding. Alle kaarten hebben een eigen <strong>Letter</strong> (de kaartsoort) en <strong>Kleur</strong> (het thema of het domein):
          </p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            {/* B: Basisbehoeften */}
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#64748b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>B</div>
                Basisbehoeften
              </div>
              <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}><strong>Basis: 5 stuks • Volledig: 7 stuks</strong><br />Vormen de kern van de therapie. Ze delen hun kleur met de bijbehorende Schema Domeinen (5 klassieke kleuren + Paars voor Zelfcoherentie en Bruin voor Rechtvaardigheid).</div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                <div title="Blauw" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
                <div title="Groen" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                <div title="Geel" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></div>
                <div title="Rood" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
                <div title="Oranje" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }}></div>
                <div title="Paars" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }}></div>
                <div title="Bruin" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#78350f' }}></div>
              </div>
            </div>

            {/* S: Schema's */}
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#64748b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>S</div>
                Schema-kaarten
              </div>
              <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}><strong>Basis: 18 stuks • Volledig: 21 stuks</strong><br />Tonen hardnekkige patronen en overtuigingen. Gekleurd naar het specifieke <strong>Schema Domein</strong> (5 domeinen in de basisset, 7 in de volledige set).</div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                <div title="Blauw" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
                <div title="Groen" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                <div title="Geel" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></div>
                <div title="Rood" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
                <div title="Oranje" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f97316' }}></div>
                <div title="Paars" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#a855f7' }}></div>
                <div title="Bruin" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#78350f' }}></div>
              </div>
            </div>
            
            {/* C: Categorieën */}
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#64748b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>C</div>
                Categorie-kaarten
              </div>
              <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}><strong>Basis: 6 stuks • Volledig: 7 stuks</strong><br />De Modi Categorieën (zoals Kindmodi, Oudermodi of specifieke Coping, plus Coping: Omkering in de volledige set).</div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                <div title="Blauw" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
                <div title="Groen" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                <div title="Geel" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></div>
                <div title="Rood" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
              </div>
            </div>

            {/* M: Modi */}
            <div style={{ padding: '1rem', background: 'white', borderRadius: '12px', border: '1px solid #e2e8f0', boxShadow: '0 1px 3px rgba(0,0,0,0.05)', position: 'relative' }}>
              <div style={{ fontWeight: 'bold', color: '#0f172a', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ width: '24px', height: '24px', borderRadius: '6px', background: '#64748b', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.85rem' }}>M</div>
                Modus-kaarten
              </div>
              <div style={{ fontSize: '0.95rem', color: '#475569', lineHeight: '1.5' }}><strong>Basis: 14 stuks • Volledig: 20 stuks</strong><br />Tonen actuele gemoedstoestanden. Gekleurd naar Modus Categorie (Kind, Ouder, Coping, Gezonde kant). De volledige set bevat o.a. ook het Blije Kind.</div>
              <div style={{ display: 'flex', gap: '4px', marginTop: '12px' }}>
                <div title="Blauw" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#3b82f6' }}></div>
                <div title="Groen" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#10b981' }}></div>
                <div title="Geel" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#eab308' }}></div>
                <div title="Rood" style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ef4444' }}></div>
              </div>
            </div>
          </div>
          
          <p style={{ fontSize: '1.05rem', lineHeight: '1.6', color: '#0f172a', margin: 0, padding: '1.5rem', background: '#f1f5f9', borderRadius: '8px' }}>
            <strong style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px', fontSize: '1.1rem' }}>
              <LightbulbIcon size={20} useGameGradient={true} /> Uitleg van de kleuren (de stippen):
            </strong>
            De theoriekaarten gebruiken kleur om logische verbindingen te leggen. Voor de Basisbehoeften en Schema's verwijst de kleur naar de inhoudelijke domeinen: de 5 klassieke domeinen in de basisset (Blauw, Groen, Geel, Rood, Oranje) of 7 domeinen in de volledige set (aangevuld met Paars voor <em>Zelfcoherentie</em> en Bruin voor <em>Rechtvaardigheid</em>).<br /><br />
            De set kent daardoor twee 'kleurwerelden': de Schema's/Behoeften (de inhoudelijke levensdomeinen) en de Modi (het gedrag: Kind, Ouder, Coping en Gezonde kant). De Modus trekt de interactie naar zijn eigen kleurwereld, dwars door de inhoud heen.<br /><br />
            Daarom kun je in een werkvorm een S-kaart moeiteloos op een B-kaart leggen, mits ze <strong>dezelfde kleur</strong> (dus hetzelfde achterliggende thema) delen. Binnen de spelvorm mag je kaarten met dezelfde kleur óf dezelfde letter op elkaar leggen.
          </p>
        </div>
        
        <div className="inner-box">
          <h3 className="box-heading">
            <DicesIcon size={28} useGameGradient={true} /> Voorbereiding
          </h3>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.7', color: '#475569', margin: 0 }}>
            Kies met welke set je speelt: de <strong>Klassieke Basisset van 43 theoriekaarten</strong> (18 S, 14 M, 5 B, 6 C) of de <strong>Volledige Set van 55 theoriekaarten</strong> (21 S, 20 M, 7 B, 7 C). Schud de gekozen stapel kaarten. Deel elke deelnemer 5 kaarten uit. Leg de overgebleven kaarten gesloten in het midden van de tafel; dit vormt de trekstapel. Draai de bovenste kaart van de trekstapel open om de aflegstapel te beginnen (zorg bij voorkeur dat dit een Schema of een Basisbehoefte is).
          </p>
        </div>

        <div className="inner-box" style={{ marginBottom: '2rem' }}>
          <h3 className="box-heading" style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <ScrollTextIcon size={28} useGameGradient={true} /> Interactieve Spelvorm (Bonus optie)
          </h3>
          
          <div className="rule-box">
            <div className="rule-number">1</div>
            <div>
              <h4 className="rule-title">Matchen</h4>
              <p className="rule-text">Je mag een kaart inzetten als deze dezelfde <strong>Kleur</strong> (Domein) óf dezelfde <strong>Letter</strong> (Type: S, M, B of C) heeft als de bovenste kaart op de aflegstapel.</p>
            </div>
          </div>

          <div className="rule-box">
            <div className="rule-number">2</div>
            <div>
              <h4 className="rule-title">Modus-regel (Kleur veranderen)</h4>
              <p className="rule-text">Modi (M-kaarten) mag je inzetten als reactie op een Schema, zelfs als de kleur niet matcht. De Modus verandert dan de actieve kleur naar zijn eigen kleur!</p>
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#eff6ff', borderRadius: '0 12px 12px 0', color: '#1e3a8a', fontSize: '0.95rem', lineHeight: '1.6', borderLeft: '4px solid #3b82f6' }}>
                <strong>Therapeutische twist:</strong> De deelnemer benoemt kort hoe deze Modus in de praktijk zou reageren op dat specifieke Schema.
              </div>
            </div>
          </div>

          <div className="rule-box">
            <div className="rule-number">3</div>
            <div>
              <h4 className="rule-title">Terug naar de Kern</h4>
              <p className="rule-text">Je mag een Basisbehoefte (B-kaart) <strong>alleen op een Schema (S-kaart)</strong> leggen (zolang de kleur matcht). In therapie ga je namelijk vanuit het Schema (de overtuiging) terug naar de Basisbehoefte (het gemis). Vanuit een Copingmodus direct naar een Basisbehoefte springen is in de praktijk vaak te hoog gegrepen zonder eerst het schema te (h)erkennen.</p>
            </div>
          </div>

          <div className="rule-box">
            <div className="rule-number">4</div>
            <div>
              <h4 className="rule-title">De Categorie-kaarten</h4>
              <p className="rule-text">De Categorie-kaarten (C-kaarten) geven sturing aan het gesprek op een manier die perfect aansluit bij wat de modus in de theorie doet:</p>
              <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem', color: '#475569', lineHeight: '1.6', fontSize: '1.05rem' }}>
                <li><strong>Coping: Vermijding (Geel):</strong> <em>Beurt overslaan.</em> (Je gaat het contact uit de weg).</li>
                <li><strong>Coping: Overgave (Geel):</strong> <em>Pak 2 kaarten van de stapel.</em> (Je laat je overspoelen door het probleem).</li>
                <li><strong>Coping: Overcompensatie / Omkering (Geel):</strong> <em>Draai de beurtrichting om / wissel van beurt.</em> (Je gaat in de tegenaanval of keert de dynamiek om).</li>
                <li><strong>Oudermodi (Rood):</strong> <em>Geef 1 van jouw kaarten aan de volgende deelnemer.</em> (Je legt straf of schuld bij de ander neer).</li>
                <li><strong>Kindmodi (Blauw):</strong> <em>Ruil blind 1 kaart met de andere deelnemer.</em> (Kwetsbaarheid en behoefte aan sturing/hulp).</li>
                <li><strong>Gezonde Volwassene (Groen):</strong> <em>Neutraliseer de vorige actie en bepaal de actieve kleur.</em> (Neemt de regie en herstelt balans).</li>
              </ul>
            </div>
          </div>

          <div className="rule-box">
            <div className="rule-number">5</div>
            <div>
              <h4 className="rule-title">Het Einddoel: Gezonde Volwassene of Blije Kind</h4>
              <p className="rule-text">
                De ronde is niet zomaar afgelopen als je kaarten op zijn. Je rondt de werkvorm pas af als jouw allerlaatste kaart een gezonde groeikaart is: de groene <strong>'Gezonde Volwassene'</strong> óf het <strong>'Blije Kind'</strong> (beschikbaar in de volledige set).
              </p>
              <p className="rule-text" style={{ marginTop: '0.5rem' }}>
                Wil je je laatste kaart inzetten, maar is dit een schema, copingreactie of kwetsbare/destructieve modus? Dan mag je niet uitgaan: je pakt een kaart van de trekstapel en de beurt gaat door.
              </p>
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#f0fdf4', borderRadius: '0 12px 12px 0', color: '#166534', fontSize: '0.95rem', lineHeight: '1.6', borderLeft: '4px solid #10b981' }}>
                <strong>Therapeutische betekenis van de uit-kaarten:</strong><br />
                In schematherapie kent herstel twee complementaire einddoelen:
                <ul style={{ margin: '0.4rem 0 0 0', paddingLeft: '1.25rem' }}>
                  <li><strong>Gezonde Volwassene:</strong> De interne regisseur die grenzen bewaakt, zelfzorg organiseert en emotionele stabiliteit waarborgt.</li>
                  <li><strong>Blije Kind:</strong> Het vermogen om weer onbevangen vreugde, speelsheid, spontaniteit en oprechte verbinding te ervaren wanneer de veiligheid is hersteld.</li>
                </ul>
                Het kunnen uitgaan met het Blije Kind in de volledige set weerspiegelt dat het doel van therapie niet alleen controle en beheersing is, maar juist ook het herontdekken van levensvreugde en speelsheid.
              </div>
              <div style={{ marginTop: '0.75rem', padding: '1rem', background: '#eff6ff', borderRadius: '0 12px 12px 0', color: '#1e3a8a', fontSize: '0.95rem', lineHeight: '1.6', borderLeft: '4px solid #3b82f6' }}>
                <strong>Let op:</strong> Deze spelvorm is bedoeld als een interactieve manier om schema's, modi en basisbehoeften te verkennen en te bespreken. De nadruk ligt op de <strong>dialoog</strong> (het uitleggen van de verbindingen) en psycho-educatie, niet op competitie.
              </div>
            </div>
          </div>

        </div>

        <div className="inner-box no-print" style={{ marginBottom: '2rem' }}>
          <h3 className="box-heading" style={{ borderBottom: '2px solid #e2e8f0', paddingBottom: '1rem', marginBottom: '2rem' }}>
            <LightbulbIcon size={28} useGameGradient={true} /> Voorbeeld: Een Beurt in de Praktijk
          </h3>
          
          <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', color: '#334155', fontSize: '1.05rem' }}>
            
            <div style={{ background: 'white', padding: '1.5rem', borderRadius: '12px', border: '1px dashed #cbd5e1', marginBottom: '2rem' }}>
              <h4 style={{ color: '#0f172a', margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>De Opstelling</h4>
              <p style={{ margin: 0, lineHeight: '1.6' }}>
                Stel, we doen deze werkvorm met twee personen: Deelnemer 1 (de cliënt) en Deelnemer 2 (de therapeut). Beide deelnemers krijgen 5 kaarten.<br />
                De startkaart wordt in het midden opengedraaid: een <strong>S-kaart</strong> <ColorBadge color="Blauw" text="Blauw" /> - <strong>Schema: Verlating</strong>.
              </p>
            </div>

            <TurnBox turnNumber="1" playerTitle="Deelnemer 1 (Cliënt)">
              <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>De Kaart:</strong> Deelnemer 1 heeft geen blauwe kaart en geen S-kaart, maar besluit Regel 2 te gebruiken en zet een <strong>M-kaart</strong> <ColorBadge color="Geel" text="Geel" /> in - <strong>Modus: Afstandelijke Beschermer</strong>.</li>
                <li><strong>De Regel:</strong> Een Modus mag altijd als reactie op een Schema ingezet worden, ongeacht de kleur. De actieve kleur op tafel verandert nu van <ColorBadge color="Blauw" text="Blauw" /> naar <ColorBadge color="Geel" text="Geel" />.</li>
              </ul>
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#eff6ff', borderRadius: '0 12px 12px 0', color: '#1e3a8a', fontSize: '0.95rem', lineHeight: '1.6', borderLeft: '4px solid #3b82f6' }}>
                <strong>Therapeutische twist:</strong> Deelnemer 1 benoemt de link:<br/><em>"Als ik getriggerd word in mijn verlatingsangst (blauwe schema), is mijn automatische reactie om me terug te trekken en niks meer te voelen (gele modus), zodat een eventuele afwijzing geen pijn doet."</em>
              </div>
            </TurnBox>

            <TurnBox turnNumber="2" playerTitle="Deelnemer 2 (Therapeut)">
              <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>De Kaart:</strong> Deelnemer 2 zet een <strong>C-kaart</strong> <ColorBadge color="Geel" text="Geel" /> in - <strong>Categorie: Coping Vermijding</strong>.</li>
                <li style={{ marginBottom: '0.5rem' }}><strong>De Regel:</strong> Deze kaart matcht op de actieve kleur (Geel) van de vorige kaart.</li>
                <li><strong>De Consequentie (Regel 4):</strong> Omdat dit een gele Vermijdings-kaart is, is de consequentie: <em>Beurt overslaan</em>. Deelnemer 1 slaat een beurt over (bij twee deelnemers betekent dit dat Deelnemer 2 direct nóg een keer aan de beurt is).</li>
              </ul>
            </TurnBox>

            <TurnBox turnNumber="3" playerTitle="Deelnemer 2 (Therapeut - extra beurt)">
              <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>De Kaart:</strong> Deelnemer 2 zet nu een <strong>S-kaart</strong> <ColorBadge color="Geel" text="Geel" /> in - <strong>Schema: Zelfopoffering</strong>.</li>
                <li><strong>De Regel:</strong> Deze matcht op kleur (Geel) met de C-kaart die er al lag. De actieve kleur blijft <ColorBadge color="Geel" text="Geel" />, maar het type op de aflegstapel is nu 'S'.</li>
              </ul>
            </TurnBox>

            <TurnBox turnNumber="4" playerTitle="Deelnemer 1 (Cliënt)">
              <ul style={{ margin: 0, paddingLeft: '1.5rem', lineHeight: '1.6', marginBottom: '1rem' }}>
                <li style={{ marginBottom: '0.5rem' }}><strong>De Kaart:</strong> Deelnemer 1 kijkt naar de aflegstapel en legt de <strong>B-kaart</strong> <ColorBadge color="Geel" text="Geel" /> neer - <strong>Basisbehoefte: Vrijheid van expressie</strong>.</li>
                <li><strong>De Regel:</strong> Dit is een perfecte uitvoering van Regel 3 ('Terug naar de Kern'). Een B-kaart mag uitsluitend op een S-kaart gelegd worden, mits de kleur matcht (van Geel naar Geel).</li>
              </ul>
              <div style={{ marginTop: '1rem', padding: '1rem', background: '#eff6ff', borderRadius: '0 12px 12px 0', color: '#1e3a8a', fontSize: '0.95rem', lineHeight: '1.6', borderLeft: '4px solid #3b82f6' }}>
                <strong>Therapeutische twist:</strong> Deelnemer 1 benoemt het patroon:<br/><em>"Onder die drang om altijd maar voor anderen te zorgen en mezelf weg te cijferen (Zelfopoffering), zit eigenlijk mijn onvervulde basisbehoefte om gewoon mijn eigen grenzen en emoties te mogen uiten (Vrijheid van expressie)."</em>
              </div>
            </TurnBox>

            <div style={{ background: '#fef2f2', padding: '1.5rem', borderRadius: '12px', border: '1px solid #fecaca', color: '#991b1b', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px' }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/></svg>
              </div>
              <div>
                <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem' }}>Richting de afronding van de werkvorm...</h4>
                <p style={{ margin: 0, lineHeight: '1.6' }}>Deelnemer 1 heeft nog maar één kaart over en geeft aan: "Laatste kaart!". Het is de <strong>M-kaart</strong> <ColorBadge color="Blauw" text="Blauw" /> - <strong>Boze Kindmodus</strong>. Omdat je volgens Regel 5 alléén mag afronden met een gezonde eindkaart (de Gezonde Volwassene of in de volledige set het Blije Kind), mag Deelnemer 1 deze blauwe kaart wel inzetten (als het qua kleur of letter past), maar is de werkvorm nog niet voltooid. Deelnemer 1 pakt een nieuwe kaart van de trekstapel en gaat door tot de regie daadwerkelijk weer bij de Gezonde Volwassene ligt of het Blije Kind weer veilig de ruimte krijgt.</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
