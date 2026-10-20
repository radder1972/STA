import React, { useState } from 'react';
import { 
  Plus, 
  Trash2, 
  Printer, 
  ChevronRight,
  Eye,
  Shield,
  Smile,
  Heart
} from 'lucide-react';
import { 
  PlatformBadge, 
  WerkbladenIcon, 
  SessieverslagIcon, 
  ModusveranderingIcon, 
  GezondeKantenIcon, 
  CheckIcon 
} from './Icons';
import SchemaCard from './SchemaCard';
import { schemaDescriptions } from '../data/descriptions';
import { getModeImage } from '../utils/images';
import imgGv from '../assets/images/modes/gv.png';
import imgBk from '../assets/images/vst/blije_kind.png';
import imgKk from '../assets/images/modes/kk.png';
import imgBozeBeschermer from '../assets/images/vst/boze_beschermer.png';
import imgPerfectionistischeOvercontroleerder from '../assets/images/vst/perfectionistische_overcontroleerder.png';
import imgBedrogManipulatie from '../assets/images/vst/bedrog_en_manipulatie.png';
import imgAandachtErkenningzoeker from '../assets/images/vst/aandacht_erkenningzoeker.png';
import imgRoofdier from '../assets/images/vst/roofdier.png';

const CATEGORIZED_MODES = {
  'Functionele modi (Gezond)': [
    'Gezonde volwassene',
    'Blije kind'
  ],
  'Kindmodi': [
    'Kwetsbare kind',
    'Boze kind',
    'Razende kind',
    'Impulsieve kind',
    'Ongedisciplineerde kind'
  ],
  'Coping: Overgave': [
    'Willoze inschikkelijke'
  ],
  'Coping: Vermijding': [
    'Onthechte beschermer',
    'Onthechte zelfsusser',
    'Boze beschermer'
  ],
  'Coping: Overcompensatie / Omkering': [
    'Wantrouwende overcontroleerder',
    'Zelfverheerlijker',
    'Pest en aanval',
    'Perfectionistische overcontroleerder',
    'Bedrog en manipulatie',
    'Aandacht- en erkenningzoeker',
    'Roofdier'
  ],
  'Disfunctionele oudermodi': [
    'Straffende ouder',
    'Veeleisende ouder'
  ]
};

const MODE_DETAILS_MAP = {
  'Gezonde volwassene': { id: 'gv', src: imgGv },
  'Blije kind': { id: 'vst_m_bk', src: imgBk },
  'Kwetsbare kind': { id: 'kk', src: imgKk },
  'Boze kind': { id: 'wk', src: getModeImage('wk') },
  'Razende kind': { id: 'rk', src: getModeImage('rk') },
  'Impulsieve kind': { id: 'ik', src: getModeImage('ik') },
  'Ongedisciplineerde kind': { id: 'ok', src: getModeImage('ok') },
  'Willoze inschikkelijke': { id: 'wi', src: getModeImage('wi') },
  'Onthechte beschermer': { id: 'ob', src: getModeImage('ob') },
  'Onthechte zelfsusser': { id: 'oz', src: getModeImage('oz') },
  'Boze beschermer': { id: 'vst_m_bb', src: imgBozeBeschermer },
  'Zelfverheerlijker': { id: 'zh', src: getModeImage('zh') },
  'Pest en aanval': { id: 'pa', src: getModeImage('pa') },
  'Perfectionistische overcontroleerder': { id: 'vst_m_po', src: imgPerfectionistischeOvercontroleerder },
  'Wantrouwende overcontroleerder': { id: 'woc', src: getModeImage('woc') },
  'Bedrog en manipulatie': { id: 'vst_m_bm', src: imgBedrogManipulatie },
  'Aandacht- en erkenningzoeker': { id: 'vst_m_ae', src: imgAandachtErkenningzoeker },
  'Roofdier': { id: 'vst_m_rd', src: imgRoofdier },
  'Straffende ouder': { id: 'so', src: getModeImage('so') },
  'Veeleisende ouder': { id: 'vo', src: getModeImage('vo') }
};

const getModusCardInfo = (modusName) => {
  const item = MODE_DETAILS_MAP[modusName];
  const id = item?.id || 'kk';
  const src = item?.src || getModeImage(id) || imgKk;
  const description = schemaDescriptions[modusName] || '';
  return { id, src, description };
};

const activePill = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45rem',
  padding: '0.5rem 1.15rem',
  borderRadius: '9999px',
  border: 'none',
  background: 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)',
  color: 'white',
  fontWeight: '600',
  fontSize: '0.9rem',
  whiteSpace: 'nowrap',
  boxShadow: '0 4px 12px rgba(124, 58, 237, 0.25)',
  cursor: 'pointer',
  transition: 'all 0.2s ease'
};

const idlePill = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: '0.45rem',
  padding: '0.5rem 1.15rem',
  borderRadius: '9999px',
  border: 'none',
  background: 'transparent',
  color: 'var(--text-muted)',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  whiteSpace: 'nowrap',
  fontSize: '0.9rem'
};

const hoverIn = (e) => {
  e.currentTarget.style.background = 'var(--hover-bg, rgba(0,0,0,0.05))';
  e.currentTarget.style.color = 'var(--text-main)';
};
const hoverOut = (e) => {
  e.currentTarget.style.background = 'transparent';
  e.currentTarget.style.color = 'var(--text-muted)';
};

export default function Werkbladen({ onBack }) {
  const [activeTab, setActiveTab] = useState('form1'); // 'form1', 'form2', 'form3'

  // Formulier 1 data
  const [datum, setDatum] = useState(() => new Date().toISOString().split('T')[0]);
  const [samenvatting, setSamenvatting] = useState('');
  const [vasthouden, setVasthouden] = useState('');
  const [huiswerk, setHuiswerk] = useState('');
  const [formulierenGebruikt, setFormulierenGebruikt] = useState(['Huiswerkformulier 1: Samenvatting']);

  // Formulier 2 data: Modi
  const [modiItems, setModiItems] = useState([
    { id: 1, modus: 'Kwetsbare kind', aantalKeer: '', verbeteringVorige: 0, verbeteringBegin: 0 }
  ]);

  // Formulier 3 data: Gezonde Volwassene & Blije Kind
  const [gvKeer, setGvKeer] = useState('');
  const [gvVerbetering, setGvVerbetering] = useState(0);
  const [bkKeer, setBkKeer] = useState('');
  const [bkVerbetering, setBkVerbetering] = useState(0);
  const [kkKeer, setKkKeer] = useState('');
  const [kkVerbetering, setKkVerbetering] = useState(0);

  const handleAddModus = () => {
    setModiItems(prev => [
      ...prev,
      {
        id: Date.now(),
        modus: 'Onthechte beschermer',
        aantalKeer: '',
        verbeteringVorige: 0,
        verbeteringBegin: 0
      }
    ]);
  };

  const handleRemoveModus = (id) => {
    setModiItems(prev => prev.filter(m => m.id !== id));
  };

  const handleUpdateModus = (id, field, value) => {
    setModiItems(prev => prev.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleToggleFormulier = (name) => {
    setFormulierenGebruikt(prev => 
      prev.includes(name) ? prev.filter(f => f !== name) : [...prev, name]
    );
  };

  const handleTriggerPrint = () => {
    window.print();
  };

  return (
    <div className="view-container" style={{ minHeight: '100vh', padding: '0 0 2rem 0', maxWidth: '100%', margin: '0 auto' }}>
      
      {/* Platform Badge */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'center' }}>
        <PlatformBadge theme="werkbladen" marginBottom="1.5rem" href="index.html" />
      </div>

      {/* Screen Header */}
      <div className="no-print" style={{ textAlign: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', fontWeight: '700', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <WerkbladenIcon size={18} useWerkbladenGradient={true} /> Schematherapie Behandel- &amp; Huiswerkmodule
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 0.8rem 0', color: 'var(--text-main)', lineHeight: '1.2' }}>
          Werkbladen
        </h1>
        <p style={{ maxWidth: '780px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
          Registratie- en evaluatieformulieren. Schrijf sessiesamenvattingen, breng wekelijks je modusverandering in kaart en stimuleer de Gezonde Volwassene en het Blije Kind.
        </p>
      </div>

      {/* Submenu onder de kop: in lijn met de rest van de suite */}
      <div className="tabs-container no-print" style={{
        display: 'flex',
        justifyContent: 'center',
        marginBottom: '2.5rem',
        width: '100%'
      }}>
        <div style={{
          background: 'var(--bg-color)',
          border: '1px solid var(--border-color)',
          padding: '0.45rem',
          borderRadius: '9999px',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.4rem',
          boxShadow: '0 4px 15px rgba(0, 0, 0, 0.05)',
          maxWidth: '100%',
          overflowX: 'auto'
        }}>
          {/* Tab 1: Sessieverslag */}
          <button
            onClick={() => setActiveTab('form1')}
            style={activeTab === 'form1' ? activePill : idlePill}
            onMouseOver={activeTab === 'form1' ? undefined : hoverIn}
            onMouseOut={activeTab === 'form1' ? undefined : hoverOut}
          >
            <SessieverslagIcon size={17} color={activeTab === 'form1' ? '#ffffff' : 'currentColor'} />
            <span>Sessieverslag</span>
          </button>

          {/* Tab 2: Modusverandering */}
          <button
            onClick={() => setActiveTab('form2')}
            style={activeTab === 'form2' ? activePill : idlePill}
            onMouseOver={activeTab === 'form2' ? undefined : hoverIn}
            onMouseOut={activeTab === 'form2' ? undefined : hoverOut}
          >
            <ModusveranderingIcon size={17} color={activeTab === 'form2' ? '#ffffff' : 'currentColor'} />
            <span>Modusverandering</span>
          </button>

          {/* Tab 3: Gezonde kanten */}
          <button
            onClick={() => setActiveTab('form3')}
            style={activeTab === 'form3' ? activePill : idlePill}
            onMouseOver={activeTab === 'form3' ? undefined : hoverIn}
            onMouseOut={activeTab === 'form3' ? undefined : hoverOut}
          >
            <GezondeKantenIcon size={17} color={activeTab === 'form3' ? '#ffffff' : 'currentColor'} />
            <span>Gezonde kanten</span>
          </button>

          {/* Scheidingslijn */}
          <div style={{ width: '1px', height: '20px', background: 'var(--border-color)', margin: '0 2px' }} />

          {/* Print actie */}
          <button
            onClick={handleTriggerPrint}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.4rem',
              padding: '0.5rem 1rem',
              borderRadius: '9999px',
              border: 'none',
              background: 'transparent',
              color: 'var(--text-main)',
              fontWeight: '500',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              whiteSpace: 'nowrap',
              fontSize: '0.9rem'
            }}
            onMouseOver={(e) => { e.currentTarget.style.background = 'var(--hover-bg, rgba(0,0,0,0.05))'; }}
            onMouseOut={(e) => { e.currentTarget.style.background = 'transparent'; }}
            title="Druk het actieve formulier direct netjes af op A4"
          >
            <Printer size={16} color="currentColor" />
            <span>Printen</span>
          </button>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FORMULIER 1 - EEN SAMENVATTING SCHRIJVEN (PAGINA 19)              */}
      {/* ========================================================================= */}
      {activeTab === 'form1' && (
        <div className="glass-panel form1-container" style={{ padding: '2.5rem', borderRadius: '24px', marginBottom: '2.5rem' }}>
          
          {/* Header van Formulier 1 */}
          <div className="form1-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#7c3aed', marginBottom: '4px' }}>
              Huiswerkformulier 1
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--text-main)', margin: '0' }}>
              Een samenvatting schrijven
            </h2>
          </div>

          {/* Waarom dit helpt - licht paars */}
          <div className="form1-waarom" style={{ background: 'rgba(124, 58, 237, 0.08)', padding: '1.25rem 1.5rem', borderRadius: '16px', borderLeft: '4px solid #7c3aed', marginBottom: '2rem' }}>
            <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
              <strong style={{ color: '#7c3aed' }}>Waarom dit helpt:</strong> Schrijf in je eigen woorden een korte samenvatting van de laatste therapiesessie. Als je een sessie in eigen woorden opschrijft, blijft namelijk beter in je hoofd zitten wat belangrijk was. Het helpt je om de belangrijkste onderwerpen eruit te lichten en uit te leggen wat je ervan geleerd hebt.
            </p>
          </div>

          {/* Datum van de sessie */}
          <div className="form1-datum" style={{ 
            marginBottom: '2rem', 
            background: 'var(--bg-color)', 
            padding: '1.25rem 1.5rem', 
            borderRadius: '16px', 
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            flexWrap: 'wrap'
          }}>
            <label style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-main)', margin: 0, whiteSpace: 'nowrap' }}>
              Datum van de sessie:
            </label>
            <input
              className="screen-only-input"
              type="date"
              value={datum}
              onChange={(e) => setDatum(e.target.value)}
              style={{ width: '220px', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1rem', height: '44px', boxSizing: 'border-box' }}
            />
            <div className="print-only-inline" style={{ minWidth: '180px', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '8px', background: '#fff', fontSize: '0.95rem', fontWeight: '600' }}>
              {datum || ''}
            </div>
          </div>

          {/* Vraag 1: Korte samenvatting */}
          <div className="form1-vraag" style={{ marginBottom: '1.8rem' }}>
            <label style={{ display: 'block', fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>
              Korte samenvatting van de sessie {datum ? `(${datum})` : ''}:
            </label>
            <textarea
              className="screen-only-input"
              rows={5}
              placeholder="Welke onderwerpen kwamen aan bod? Welke modi of schema's werden getriggerd en besproken?"
              value={samenvatting}
              onChange={(e) => setSamenvatting(e.target.value)}
              style={{ width: '100%', height: '140px', minHeight: '140px', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', resize: 'vertical', boxSizing: 'border-box' }}
            />
            <div className="print-only-block" style={{ height: '148px', minHeight: '148px', padding: '12px 14px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '1rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', background: '#fff', boxSizing: 'border-box' }}>
              {samenvatting || ''}
            </div>
          </div>

          {/* Vraag 2: Wat ik hiervan vast wil houden */}
          <div className="form1-vraag" style={{ marginBottom: '1.8rem' }}>
            <label style={{ display: 'block', fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>
              Wat ik hiervan vast wil houden is:
            </label>
            <textarea
              className="screen-only-input"
              rows={5}
              placeholder="Het belangrijkste inzicht, de helpende stem van de Gezonde Volwassene, of de troost voor het Kwetsbare Kind..."
              value={vasthouden}
              onChange={(e) => setVasthouden(e.target.value)}
              style={{ width: '100%', height: '140px', minHeight: '140px', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', resize: 'vertical', boxSizing: 'border-box' }}
            />
            <div className="print-only-block" style={{ height: '148px', minHeight: '148px', padding: '12px 14px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '1rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', background: '#fff', boxSizing: 'border-box' }}>
              {vasthouden || ''}
            </div>
          </div>

          {/* Vraag 3: Wat is mijn huiswerk */}
          <div className="form1-vraag" style={{ marginBottom: '1.8rem' }}>
            <label style={{ display: 'block', fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>
              Wat is mijn huiswerk:
            </label>
            <textarea
              className="screen-only-input"
              rows={5}
              placeholder="Concrete oefeningen voor komende week: bv. gedragsexperiment, flashcard lezen, modusregistratie bijhouden..."
              value={huiswerk}
              onChange={(e) => setHuiswerk(e.target.value)}
              style={{ width: '100%', height: '140px', minHeight: '140px', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', resize: 'vertical', boxSizing: 'border-box' }}
            />
            <div className="print-only-block" style={{ height: '148px', minHeight: '148px', padding: '12px 14px', border: '1px solid #cbd5e1', borderRadius: '10px', fontSize: '1rem', lineHeight: '1.6', whiteSpace: 'pre-wrap', background: '#fff', boxSizing: 'border-box' }}>
              {huiswerk || ''}
            </div>
          </div>

          {/* Gebruikte formulieren voor deze sessie (strakke checklist zonder storende gekleurde box onder tekst/vinkje) */}
          <div className="form1-formulieren" style={{ marginBottom: '2.5rem', paddingTop: '0.5rem' }}>
            <span className="form1-formulieren-title" style={{ display: 'block', fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '10px' }}>
              Gebruikte formulieren voor de afgelopen sessie:
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', width: '100%', maxWidth: '440px' }}>
              {[
                { id: 'f1', label: 'Huiswerkformulier 1: Samenvatting' },
                { id: 'f2', label: 'Huiswerkformulier 2: Modusverandering' },
                { id: 'f3', label: 'Huiswerkformulier 3: Gezonde volwassene en kind' }
              ].map(f => {
                const isSelected = formulierenGebruikt.includes(f.label);
                return (
                  <div
                    key={f.id}
                    onClick={() => handleToggleFormulier(f.label)}
                    className="form1-checkbox-item"
                    role="checkbox"
                    aria-checked={isSelected}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === ' ' || e.key === 'Enter') {
                        e.preventDefault();
                        handleToggleFormulier(f.label);
                      }
                    }}
                    style={{
                      width: '100%',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      padding: '6px 4px',
                      background: 'transparent',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.15s ease',
                      boxSizing: 'border-box',
                      textAlign: 'left',
                      userSelect: 'none'
                    }}
                  >
                    <span style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '6px',
                      border: isSelected ? '1.5px solid #7c3aed' : '1.5px solid var(--border-color, #cbd5e1)',
                      background: isSelected ? 'linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)' : '#ffffff',
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      boxShadow: 'none',
                      transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                      flexShrink: 0
                    }}>
                      {isSelected && (
                        <CheckIcon 
                          size={13} 
                          strokeWidth={2.8} 
                          color="#ffffff" 
                        />
                      )}
                    </span>
                    <span style={{ 
                      fontSize: '0.92rem', 
                      color: isSelected ? '#7c3aed' : 'var(--text-main)', 
                      fontWeight: isSelected ? '700' : '500',
                      whiteSpace: 'nowrap', 
                      overflow: 'hidden', 
                      textOverflow: 'ellipsis' 
                    }}>
                      {f.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar Form 1 */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem', marginTop: '2.5rem' }}>
            <button
              onClick={handleTriggerPrint}
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              title="Druk dit formulier direct netjes af op A4"
            >
              <Printer size={16} /> Dit Formulier Afdrukken (A4)
            </button>
            <button
              onClick={() => setActiveTab('form2')}
              className="btn btn-gradient"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white' }}
            >
              Volgende: Modusverandering <ChevronRight size={16} />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FORMULIER 2 - MODUSVERANDERING BIJHOUDEN (PAGINA 20)              */}
      {/* ========================================================================= */}
      {activeTab === 'form2' && (
        <div className="glass-panel form2-container" style={{ padding: '2.5rem', borderRadius: '24px', marginBottom: '2.5rem' }}>
          
          {/* Header van Formulier 2 */}
          <div className="form2-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '1.25rem', marginBottom: '2rem' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#7c3aed', marginBottom: '4px' }}>
              Huiswerkformulier 2
            </div>
            <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--text-main)', margin: '0' }}>
              Het bijhouden van je modusverandering
            </h2>
          </div>

          {/* Waarom dit helpt - licht paars */}
          <div className="form2-waarom" style={{ background: 'rgba(124, 58, 237, 0.08)', padding: '1.25rem 1.5rem', borderRadius: '16px', borderLeft: '4px solid #7c3aed', marginBottom: '2rem' }}>
            <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
              <strong style={{ color: '#7c3aed' }}>Waarom dit helpt:</strong> Hierna staan de vragen die je kunnen helpen bij het in kaart brengen van de verandering in de kracht van je modi. Schrijf iedere week per modus op hoe vaak je in de modus zat en wat de verandering is ten opzichte van je vorige beoordelingen.
            </p>
          </div>

          {/* Modi Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
            {modiItems.map((item, index) => (
              <div 
                key={item.id} 
                className="form2-modus-card"
                style={{ 
                  background: 'var(--bg-color)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '18px', 
                  padding: '1.75rem',
                  position: 'relative',
                  boxShadow: '0 2px 8px rgba(0,0,0,0.02)'
                }}
              >
                {/* Header van Modusregistratie */}
                <div className="form2-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '8px', 
                      background: 'rgba(124, 58, 237, 0.1)', 
                      color: '#7c3aed', 
                      fontWeight: '800', 
                      fontSize: '0.92rem',
                      letterSpacing: '0.02em'
                    }}>
                      Modusregistratie #{index + 1}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                      ({item.modus})
                    </span>
                  </div>
                  {modiItems.length > 1 && (
                    <button
                      onClick={() => handleRemoveModus(item.id)}
                      className="no-print"
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '600' }}
                    >
                      <Trash2 size={16} /> Verwijder
                    </button>
                  )}
                </div>

                {/* Vraag 1: Selecteer Modus & Aantal keer + Kaart */}
                <div className="form2-box form2-box-q1" style={{ 
                  background: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '16px', 
                  padding: '1.25rem 1.5rem', 
                  marginBottom: '1.25rem' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                    <span style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      background: '#7c3aed', 
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: '800', 
                      fontSize: '0.82rem',
                      flexShrink: 0 
                    }}>
                      1
                    </span>
                    <label style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                      Hoe vaak zat je deze week in de modus van:
                    </label>
                  </div>

                  {(() => {
                    const cardInfo = getModusCardInfo(item.modus);
                    return (
                      <div style={{ paddingLeft: '34px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1.5rem', flexWrap: 'wrap' }}>
                        {/* Invoervelden links */}
                        <div style={{ flex: '1 1 240px', minWidth: '220px', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                          <div>
                            <span style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
                              Selecteer de modus:
                            </span>
                            <select
                              className="screen-only-input"
                              value={item.modus}
                              onChange={(e) => handleUpdateModus(item.id, 'modus', e.target.value)}
                              style={{ 
                                width: '100%', 
                                maxWidth: '320px',
                                padding: '10px 38px 10px 14px', 
                                borderRadius: '10px', 
                                border: '1px solid var(--border-color)', 
                                background: 'var(--bg-color)', 
                                color: 'var(--text-main)', 
                                fontSize: '0.95rem', 
                                fontWeight: '500',
                                appearance: 'none',
                                WebkitAppearance: 'none',
                                MozAppearance: 'none',
                                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='%237c3aed' stroke-width='2.2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`,
                                backgroundRepeat: 'no-repeat',
                                backgroundPosition: 'right 14px center',
                                backgroundSize: '16px 16px',
                                cursor: 'pointer',
                                boxSizing: 'border-box'
                              }}
                            >
                              {Object.entries(CATEGORIZED_MODES).map(([group, list]) => (
                                <optgroup key={group} label={group}>
                                  {list.map(mName => (
                                    <option key={mName} value={mName}>{mName}</option>
                                  ))}
                                </optgroup>
                              ))}
                            </select>
                            <div className="print-only-inline" style={{ padding: '8px 14px', border: '1px solid #cbd5e1', borderRadius: '10px', fontWeight: '700', color: '#7c3aed', background: '#faf5ff' }}>
                              {item.modus}
                            </div>
                          </div>

                          <div>
                            <span style={{ display: 'block', fontSize: '0.88rem', color: 'var(--text-muted)', marginBottom: '6px', fontWeight: '600' }}>
                              Frequentie in afgelopen week:
                            </span>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <input
                                type="number"
                                min="0"
                                placeholder="bv. 4"
                                value={item.aantalKeer}
                                onChange={(e) => handleUpdateModus(item.id, 'aantalKeer', e.target.value)}
                                style={{ 
                                  width: '95px', 
                                  padding: '7px 12px', 
                                  borderRadius: '9px', 
                                  border: '1px solid var(--border-color)', 
                                  background: 'var(--bg-color)', 
                                  color: 'var(--text-main)', 
                                  fontSize: '1.05rem', 
                                  fontWeight: '700',
                                  boxSizing: 'border-box'
                                }}
                              />
                              <span style={{ fontSize: '0.92rem', color: 'var(--text-main)', whiteSpace: 'nowrap' }}>keer deze week</span>
                            </div>
                          </div>
                        </div>

                        {/* Kaartweergave rechts */}
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                          <div 
                            style={{ 
                              cursor: 'pointer', 
                              borderRadius: '12px', 
                              boxShadow: '0 5px 14px rgba(124, 58, 237, 0.16)',
                              transition: 'transform 0.2s ease'
                            }}
                            title={`Klik om de kaart ${item.modus} te openen en om te draaien`}
                          >
                            <SchemaCard
                              id={cardInfo.id}
                              type="mode"
                              title={item.modus}
                              description={cardInfo.description}
                              src={cardInfo.src}
                              width="118px"
                              height="168px"
                              zoomOnClick={true}
                              flipOnClick={false}
                            />
                          </div>
                          <button
                            type="button"
                            className="no-print"
                            onClick={(e) => {
                              const cardEl = e.currentTarget.parentElement?.querySelector('.card-scene');
                              if (cardEl) cardEl.click();
                            }}
                            style={{ 
                              background: 'rgba(124, 58, 237, 0.08)', 
                              border: '1px solid rgba(124, 58, 237, 0.22)', 
                              color: '#7c3aed', 
                              fontSize: '0.76rem', 
                              fontWeight: '700', 
                              padding: '3px 10px', 
                              borderRadius: '9999px',
                              display: 'inline-flex', 
                              alignItems: 'center', 
                              gap: '5px', 
                              cursor: 'pointer' 
                            }}
                            title="Klik om uitleg te lezen"
                          >
                            <Eye size={12} /> Bekijk uitleg
                          </button>
                        </div>
                      </div>
                    );
                  })()}
                </div>

                {/* Vraag 2: Verandering t.o.v. vorige beoordeling */}
                <div className="form2-box form2-box-q2" style={{ 
                  background: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '14px', 
                  padding: '1.25rem', 
                  marginBottom: '1.25rem' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      background: '#7c3aed', 
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: '800', 
                      fontSize: '0.82rem',
                      flexShrink: 0 
                    }}>
                      2
                    </span>
                    <label style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                      Verandering t.o.v. de vorige beoordeling (frequentie &amp; intensiteit):
                    </label>
                  </div>

                  <p className="form2-p-desc" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 10px 34px', lineHeight: '1.4' }}>
                    Welke verbetering heb je waargenomen in vergelijking met de vorige beoordeling (0% = geen verbetering, 100% = maximaal verbeterd).
                  </p>

                  <div style={{ paddingLeft: '34px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '4px 14px',
                        borderRadius: '8px',
                        background: 'rgba(124, 58, 237, 0.1)',
                        border: '1px solid rgba(124, 58, 237, 0.25)',
                        color: '#7c3aed',
                        fontWeight: '800',
                        fontSize: '0.92rem',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}>
                        {item.verbeteringVorige}% verbetering
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={item.verbeteringVorige}
                      onChange={(e) => handleUpdateModus(item.id, 'verbeteringVorige', Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', fontWeight: '500' }}>
                      <span>0% (Geen verbetering)</span>
                      <span>50% (Matig verbeterd)</span>
                      <span>100% (Maximaal verbeterd)</span>
                    </div>
                  </div>
                </div>

                {/* Vraag 3: Verandering t.o.v. het begin van de therapie */}
                <div className="form2-box form2-box-q3" style={{ 
                  background: 'var(--card-bg)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '14px', 
                  padding: '1.25rem' 
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                    <span style={{ 
                      width: '24px', 
                      height: '24px', 
                      borderRadius: '50%', 
                      background: '#7c3aed', 
                      color: 'white', 
                      display: 'flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      fontWeight: '800', 
                      fontSize: '0.82rem',
                      flexShrink: 0 
                    }}>
                      3
                    </span>
                    <label style={{ fontSize: '0.98rem', fontWeight: '700', color: 'var(--text-main)', margin: 0 }}>
                      Verandering t.o.v. het begin van de therapie:
                    </label>
                  </div>

                  <p className="form2-p-desc" style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 10px 34px', lineHeight: '1.4' }}>
                    Welke verbetering heb je waargenomen in vergelijking met het begin van de therapie (0% = geen verbetering, 100% = maximaal verbeterd).
                  </p>

                  <div style={{ paddingLeft: '34px' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '8px' }}>
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        padding: '4px 14px',
                        borderRadius: '8px',
                        background: 'rgba(124, 58, 237, 0.1)',
                        border: '1px solid rgba(124, 58, 237, 0.25)',
                        color: '#7c3aed',
                        fontWeight: '800',
                        fontSize: '0.92rem',
                        whiteSpace: 'nowrap',
                        flexShrink: 0
                      }}>
                        {item.verbeteringBegin}% verbetering
                      </div>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="100"
                      step="5"
                      value={item.verbeteringBegin}
                      onChange={(e) => handleUpdateModus(item.id, 'verbeteringBegin', Number(e.target.value))}
                      style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer' }}
                    />
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '6px', fontWeight: '500' }}>
                      <span>0% (Geen verbetering)</span>
                      <span>50% (Matig verbeterd)</span>
                      <span>100% (Maximaal verbeterd)</span>
                    </div>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Add Modus Button */}
          <div className="no-print" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <button
              onClick={handleAddModus}
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', fontSize: '0.95rem' }}
            >
              <Plus size={18} /> Nog een modus toevoegen
            </button>
          </div>

          {/* Bottom Bar Form 2 */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <button
              onClick={handleTriggerPrint}
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              title="Druk dit formulier direct netjes af op A4"
            >
              <Printer size={16} /> Dit Formulier Afdrukken (A4)
            </button>
            <button
              onClick={() => setActiveTab('form3')}
              className="btn btn-gradient"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white' }}
            >
              Volgende: Gezonde kanten <ChevronRight size={16} />
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PAGINA 22 - GEZONDE VOLWASSENE EN HET BLIJE KIND (DELEN)           */}
      {/* ========================================================================= */}
      {activeTab === 'form3' && (
        <div className="glass-panel form3-container" style={{ padding: '2.25rem 2.5rem', borderRadius: '24px', marginBottom: '2.5rem' }}>
          
          {/* Header van Formulier 3 */}
          <div className="form3-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '0.85rem', marginBottom: '1.25rem' }}>
            <div style={{ fontSize: '0.92rem', fontWeight: '700', color: '#7c3aed', marginBottom: '4px' }}>
              Huiswerkformulier 3
            </div>
            <h2 style={{ fontSize: '1.8rem', fontWeight: '800', color: 'var(--text-main)', margin: '0' }}>
              Gezonde volwassene en het blije kind
            </h2>
          </div>

          {/* Waarom dit helpt - licht paars */}
          <div className="form3-waarom" style={{ background: 'rgba(124, 58, 237, 0.08)', padding: '0.9rem 1.35rem', borderRadius: '14px', borderLeft: '4px solid #7c3aed', marginBottom: '1.25rem' }}>
            <p style={{ margin: 0, fontSize: '0.92rem', lineHeight: '1.5', color: 'var(--text-main)' }}>
              <strong style={{ color: '#7c3aed' }}>Waarom dit helpt:</strong> Vraag jezelf af hoe vaak je vanuit de <strong>Gezonde volwassene</strong> en/of het <strong>Blije kind</strong> hebt gereageerd de afgelopen week. Vraag je ook af in welke mate dit een verandering is ten opzichte van het begin van de therapie. Klik op de kaarten of op 'Bekijk uitleg' om de toelichting en omschrijving te raadplegen.
            </p>
          </div>

          {/* Vraag 1: Gezonde Volwassene */}
          <div className="form3-box" style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.85rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.18rem', color: 'var(--text-main)', fontWeight: '800' }}>1. Gezonde volwassene</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Functionele modus &amp; innerlijke regisseur</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Kaart Box 1 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <div 
                  style={{ 
                    cursor: 'pointer', 
                    borderRadius: '12px', 
                    boxShadow: '0 5px 14px rgba(124, 58, 237, 0.16)',
                    transition: 'transform 0.2s ease'
                  }}
                  title="Klik om de kaart Gezonde volwassene te openen en om te draaien"
                >
                  <SchemaCard
                    id="gv"
                    type="mode"
                    title="Gezonde volwassene"
                    description={schemaDescriptions['Gezonde volwassene']}
                    src={imgGv}
                    width="118px"
                    height="168px"
                    zoomOnClick={true}
                    flipOnClick={false}
                  />
                </div>
                <button
                  type="button"
                  className="no-print"
                  onClick={(e) => {
                    const cardEl = e.currentTarget.parentElement?.querySelector('.card-scene');
                    if (cardEl) cardEl.click();
                  }}
                  style={{ 
                    background: 'rgba(124, 58, 237, 0.08)', 
                    border: '1px solid rgba(124, 58, 237, 0.22)', 
                    color: '#7c3aed', 
                    fontSize: '0.76rem', 
                    fontWeight: '700', 
                    padding: '3px 10px', 
                    borderRadius: '9999px',
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '5px', 
                    cursor: 'pointer' 
                  }}
                  title="Klik om uitleg te lezen"
                >
                  <Eye size={12} /> Bekijk uitleg
                </button>
              </div>

              {/* Vragen Box 1 */}
              <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)', lineHeight: '1.35' }}>
                    1a. De afgelopen week heb ik <em>met aandacht</em> ongeveer:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="number"
                      min="0"
                      placeholder="bv. 5"
                      value={gvKeer}
                      onChange={(e) => setGvKeer(e.target.value)}
                      style={{ width: '95px', padding: '7px 12px', borderRadius: '9px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: '700' }}
                    />
                    <span style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>keer in de modus van <strong>Gezonde volwassene</strong> gezeten.</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <label style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.35', flex: '1 1 200px', margin: 0 }}>
                      1b. Positieve verandering t.o.v. begin van de therapie:
                    </label>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 14px',
                      borderRadius: '8px',
                      background: 'rgba(124, 58, 237, 0.1)',
                      border: '1px solid rgba(124, 58, 237, 0.25)',
                      color: '#7c3aed',
                      fontWeight: '800',
                      fontSize: '0.92rem',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {gvVerbetering}% verbetering
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={gvVerbetering}
                    onChange={(e) => setGvVerbetering(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer', margin: '4px 0' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>0% (Geen verandering)</span>
                    <span>50% (Matig verbeterd)</span>
                    <span>100% (Maximale verandering)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vraag 2: Het Blije Kind */}
          <div className="form3-box" style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.25rem 1.5rem', marginBottom: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.85rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Smile size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.18rem', color: 'var(--text-main)', fontWeight: '800' }}>2. Het Blije kind</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Functionele kindmodus &amp; spontaniteit, vreugde en spel</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Kaart Box 2 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <div 
                  style={{ 
                    cursor: 'pointer', 
                    borderRadius: '12px', 
                    boxShadow: '0 5px 14px rgba(124, 58, 237, 0.16)',
                    transition: 'transform 0.2s ease'
                  }}
                  title="Klik om de kaart Blije kind te openen en om te draaien"
                >
                  <SchemaCard
                    id="vst_m_bk"
                    type="mode"
                    title="Blije kind"
                    description={schemaDescriptions['Blije kind']}
                    src={imgBk}
                    width="118px"
                    height="168px"
                    zoomOnClick={true}
                    flipOnClick={false}
                  />
                </div>
                <button
                  type="button"
                  className="no-print"
                  onClick={(e) => {
                    const cardEl = e.currentTarget.parentElement?.querySelector('.card-scene');
                    if (cardEl) cardEl.click();
                  }}
                  style={{ 
                    background: 'rgba(124, 58, 237, 0.08)', 
                    border: '1px solid rgba(124, 58, 237, 0.22)', 
                    color: '#7c3aed', 
                    fontSize: '0.76rem', 
                    fontWeight: '700', 
                    padding: '3px 10px', 
                    borderRadius: '9999px',
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '5px', 
                    cursor: 'pointer' 
                  }}
                  title="Klik om uitleg te lezen"
                >
                  <Eye size={12} /> Bekijk uitleg
                </button>
              </div>

              {/* Vragen Box 2 */}
              <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)', lineHeight: '1.35' }}>
                    2a. De afgelopen week heb ik <em>met aandacht</em> ongeveer:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="number"
                      min="0"
                      placeholder="bv. 3"
                      value={bkKeer}
                      onChange={(e) => setBkKeer(e.target.value)}
                      style={{ width: '95px', padding: '7px 12px', borderRadius: '9px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: '700' }}
                    />
                    <span style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>keer in de modus van <strong>het Blije kind</strong> gezeten.</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <label style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.35', flex: '1 1 200px', margin: 0 }}>
                      2b. Positieve verandering t.o.v. begin van de therapie:
                    </label>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 14px',
                      borderRadius: '8px',
                      background: 'rgba(124, 58, 237, 0.1)',
                      border: '1px solid rgba(124, 58, 237, 0.25)',
                      color: '#7c3aed',
                      fontWeight: '800',
                      fontSize: '0.92rem',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {bkVerbetering}% verbetering
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={bkVerbetering}
                    onChange={(e) => setBkVerbetering(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer', margin: '4px 0' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>0% (Geen verandering)</span>
                    <span>50% (Matig verbeterd)</span>
                    <span>100% (Maximale verandering)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Vraag 3: Kwetsbare Kind */}
          <div className="form3-box" style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.25rem 1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '0.85rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.6rem' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '9px', background: 'rgba(124, 58, 237, 0.12)', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={18} />
              </div>
              <div>
                <h3 style={{ margin: 0, fontSize: '1.18rem', color: 'var(--text-main)', fontWeight: '800' }}>3. Zorg voor het Kwetsbare kind</h3>
                <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Aandacht, emotionele veiligheid en troost voor de basisbehoeften</span>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', alignItems: 'center', flexWrap: 'wrap' }}>
              {/* Kaart Box 3 */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
                <div 
                  style={{ 
                    cursor: 'pointer', 
                    borderRadius: '12px', 
                    boxShadow: '0 5px 14px rgba(124, 58, 237, 0.16)',
                    transition: 'transform 0.2s ease'
                  }}
                  title="Klik om de kaart Kwetsbare kind te openen en om te draaien"
                >
                  <SchemaCard
                    id="kk"
                    type="mode"
                    title="Kwetsbare kind"
                    description={schemaDescriptions['Kwetsbare kind']}
                    src={imgKk}
                    width="118px"
                    height="168px"
                    zoomOnClick={true}
                    flipOnClick={false}
                  />
                </div>
                <button
                  type="button"
                  className="no-print"
                  onClick={(e) => {
                    const cardEl = e.currentTarget.parentElement?.querySelector('.card-scene');
                    if (cardEl) cardEl.click();
                  }}
                  style={{ 
                    background: 'rgba(124, 58, 237, 0.08)', 
                    border: '1px solid rgba(124, 58, 237, 0.22)', 
                    color: '#7c3aed', 
                    fontSize: '0.76rem', 
                    fontWeight: '700', 
                    padding: '3px 10px', 
                    borderRadius: '9999px',
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    gap: '5px', 
                    cursor: 'pointer' 
                  }}
                  title="Klik om uitleg te lezen"
                >
                  <Eye size={12} /> Bekijk uitleg
                </button>
              </div>

              {/* Vragen Box 3 */}
              <div style={{ flex: '1 1 320px', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.92rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)', lineHeight: '1.35' }}>
                    3a. De afgelopen week heb ik <em>met aandacht</em> ongeveer:
                  </label>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <input
                      type="number"
                      min="0"
                      placeholder="bv. 4"
                      value={kkKeer}
                      onChange={(e) => setKkKeer(e.target.value)}
                      style={{ width: '95px', padding: '7px 12px', borderRadius: '9px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1.05rem', fontWeight: '700' }}
                    />
                    <span style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>keer naar mijn <strong>Kwetsbare kind</strong> geluisterd, zonder oordeel en rekening houdend met mijn behoeften.</span>
                  </div>
                </div>

                <div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '14px', marginBottom: '8px', flexWrap: 'wrap' }}>
                    <label style={{ fontSize: '0.92rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.35', flex: '1 1 200px', margin: 0 }}>
                      3b. Positieve verandering t.o.v. begin van de therapie:
                    </label>
                    <div style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '4px 14px',
                      borderRadius: '8px',
                      background: 'rgba(124, 58, 237, 0.1)',
                      border: '1px solid rgba(124, 58, 237, 0.25)',
                      color: '#7c3aed',
                      fontWeight: '800',
                      fontSize: '0.92rem',
                      whiteSpace: 'nowrap',
                      flexShrink: 0
                    }}>
                      {kkVerbetering}% verbetering
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={kkVerbetering}
                    onChange={(e) => setKkVerbetering(Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer', margin: '4px 0' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    <span>0% (Geen verandering)</span>
                    <span>50% (Matig verbeterd)</span>
                    <span>100% (Maximale verandering)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar Form 3 */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', borderTop: '1px solid var(--border-color)', paddingTop: '1.25rem' }}>
            <button
              onClick={handleTriggerPrint}
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              title="Druk dit formulier direct netjes af op A4"
            >
              <Printer size={16} /> Dit Formulier Afdrukken (A4)
            </button>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* PRINT STYLESHEET: SCHOON EN DIRECT AFDRUKKEN VAN HET ACTIEVE WERKBLAD    */}
      {/* ========================================================================= */}
      <style>{`
        @media screen {
          .print-only-block,
          .print-only-inline {
            display: none !important;
          }
        }
        @media print {
          .no-print,
          .screen-only-input {
            display: none !important;
          }
          .print-only-block {
            display: block !important;
          }
          .print-only-inline {
            display: inline-block !important;
          }
          @page {
            size: A4 portrait;
            margin: 0mm;
          }
          html, body {
            background: #ffffff !important;
            color: #0f172a !important;
            margin: 0 !important;
            padding: 0 !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .view-container {
            width: 100% !important;
            max-width: 210mm !important;
            margin: 0 auto !important;
            padding: 28mm 22mm 20mm 22mm !important;
            box-sizing: border-box !important;
          }
          .glass-panel {
            background: #ffffff !important;
            box-shadow: none !important;
            border: none !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
          }
          input, textarea, select {
            border: 1px solid #cbd5e1 !important;
            background: #ffffff !important;
            color: #0f172a !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          input[type="range"] {
            accent-color: #7c3aed !important;
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          /* Formulier 1: Compact en gegarandeerd passend op 1 A4 */
          .form1-container {
            padding: 0 !important;
            margin: 0 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .form1-header {
            padding-bottom: 6px !important;
            margin-bottom: 10px !important;
          }
          .form1-header h2 {
            font-size: 1.55rem !important;
            margin: 0 !important;
          }
          .form1-waarom {
            padding: 8px 14px !important;
            margin-bottom: 10px !important;
            font-size: 0.86rem !important;
            line-height: 1.4 !important;
          }
          .form1-datum {
            padding: 6px 14px !important;
            margin-bottom: 10px !important;
            font-size: 0.9rem !important;
          }
          .form1-vraag {
            margin-bottom: 10px !important;
          }
          .form1-vraag label {
            font-size: 0.92rem !important;
            margin-bottom: 4px !important;
          }
          .form1-vraag .print-only-block {
            height: 148px !important;
            min-height: 148px !important;
            max-height: 148px !important;
            padding: 10px 14px !important;
            font-size: 0.95rem !important;
            line-height: 1.45 !important;
            box-sizing: border-box !important;
          }
          .form1-formulieren {
            margin-bottom: 0 !important;
            padding-top: 4px !important;
          }
          .form1-formulieren-title {
            font-size: 0.88rem !important;
            margin-bottom: 6px !important;
          }
          .form1-checkbox-item {
            padding: 2px 0 !important;
            background: transparent !important;
            border: none !important;
            box-shadow: none !important;
          }
          .form1-checkbox-item span {
            box-shadow: none !important;
            filter: none !important;
          }
          /* Formulier 2: Compacte styling gegarandeerd passend op 1 A4 */
          .form2-container {
            padding: 0 !important;
            margin: 0 !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .form2-header {
            padding-bottom: 4px !important;
            margin-bottom: 8px !important;
          }
          .form2-header h2 {
            font-size: 1.45rem !important;
            margin: 0 !important;
          }
          .form2-waarom {
            padding: 6px 12px !important;
            margin-bottom: 8px !important;
            font-size: 0.8rem !important;
            line-height: 1.35 !important;
          }
          .form2-modus-card {
            padding: 8px 12px !important;
            margin-bottom: 0 !important;
            border-radius: 12px !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
          .form2-card-header {
            margin-bottom: 6px !important;
            padding-bottom: 4px !important;
          }
          .form2-box {
            padding: 6px 10px !important;
            margin-bottom: 6px !important;
            border-radius: 10px !important;
          }
          .form2-box-q1 {
            padding: 6px 10px !important;
          }
          .form2-box-q1 .card-scene {
            width: 100px !important;
            height: 142px !important;
          }
          .form2-p-desc {
            display: none !important;
          }
          /* Formulier 3: Compacte styling op 1 A4 */
          .form3-container {
            padding: 0 !important;
            margin: 0 !important;
          }
          .form3-header {
            padding-bottom: 4px !important;
            margin-bottom: 6px !important;
          }
          .form3-waarom {
            padding: 6px 10px !important;
            margin-bottom: 8px !important;
            font-size: 0.8rem !important;
            line-height: 1.35 !important;
          }
          .form3-box {
            padding: 8px 12px !important;
            margin-bottom: 8px !important;
            border-radius: 10px !important;
            page-break-inside: avoid !important;
            break-inside: avoid !important;
          }
        }
      `}</style>

    </div>
  );
}
