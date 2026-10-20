import React, { useState, useEffect, useMemo } from 'react';
import { 
  FileText, 
  TrendingUp, 
  Calendar, 
  Plus, 
  Trash2, 
  Save, 
  Printer, 
  Download, 
  Upload, 
  RotateCcw, 
  Sparkles, 
  CheckCircle2, 
  Smile, 
  Heart, 
  Shield, 
  Activity, 
  Info,
  ChevronRight,
  ListPlus,
  BookOpen
} from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar
} from 'recharts';
import { PlatformBadge } from './Icons';

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

const STORAGE_KEY = 'schematherapie_werkbladen_v1';

const SAMPLE_HISTORY = [
  {
    id: 'sample_sessie_1',
    datum: '2026-09-15',
    sessieNummer: 1,
    sessiesMax: 20,
    samenvatting: 'Eerste probleeminventarisatie en psycho-educatie over het schemamodel. We hebben gekeken naar situaties waarin de Onthechte Beschermer en Straffende Ouder opkomen.',
    vasthouden: 'Dat mijn afstandelijke reactie een overlevingsmodus is en geen karakterfout.',
    huiswerk: 'Formulier 1 en 2 invullen bij stressmomenten op het werk.',
    formulierenGebruikt: ['Formulier 1 (Sessieverslag)', 'Formulier 2 (Modusregistratie)'],
    modi: [
      { id: 'm1', modus: 'Onthechte beschermer', aantalKeer: 12, verbeteringVorige: 0, verbeteringBegin: 5 },
      { id: 'm2', modus: 'Straffende ouder', aantalKeer: 8, verbeteringVorige: 0, verbeteringBegin: 0 }
    ],
    gezondeKanten: {
      gv_keer: 2,
      gv_verbetering: 10,
      bk_keer: 1,
      bk_verbetering: 5,
      kk_keer: 1,
      kk_verbetering: 10
    }
  },
  {
    id: 'sample_sessie_2',
    datum: '2026-09-22',
    sessieNummer: 2,
    sessiesMax: 20,
    samenvatting: 'Focus op het Kwetsbare Kind dat onder de Onthechte Beschermer schuilt. Meer herkenning van lichamelijke spanning in de buik.',
    vasthouden: 'Even pas op de plaats maken en diep ademhalen vóórdat ik dichtklap.',
    huiswerk: 'Elke avond 5 minuten voelen wat het Kwetsbare Kind nodig heeft.',
    formulierenGebruikt: ['Formulier 1 (Sessieverslag)', 'Formulier 2 (Modusregistratie)', 'Pagina 22 (GV & BK)'],
    modi: [
      { id: 'm1', modus: 'Onthechte beschermer', aantalKeer: 9, verbeteringVorige: 25, verbeteringBegin: 25 },
      { id: 'm2', modus: 'Straffende ouder', aantalKeer: 6, verbeteringVorige: 20, verbeteringBegin: 20 }
    ],
    gezondeKanten: {
      gv_keer: 4,
      gv_verbetering: 25,
      bk_keer: 2,
      bk_verbetering: 15,
      kk_keer: 3,
      kk_verbetering: 25
    }
  },
  {
    id: 'sample_sessie_3',
    datum: '2026-09-29',
    sessieNummer: 3,
    sessiesMax: 20,
    samenvatting: 'Imaginaire rescripting gedaan rond een oude afwijzingsherinnering. De Gezonde Volwassene heeft grenzen gesteld naar de veeleisende stem.',
    vasthouden: 'Ik mag fouten maken zonder dat ik meteen waardeloos ben.',
    huiswerk: 'Actief ruimte maken voor een speelse activiteit voor het Blije Kind.',
    formulierenGebruikt: ['Formulier 1 (Sessieverslag)', 'Formulier 2 (Modusregistratie)', 'Pagina 22 (GV & BK)'],
    modi: [
      { id: 'm1', modus: 'Onthechte beschermer', aantalKeer: 5, verbeteringVorige: 45, verbeteringBegin: 55 },
      { id: 'm2', modus: 'Straffende ouder', aantalKeer: 4, verbeteringVorige: 35, verbeteringBegin: 45 }
    ],
    gezondeKanten: {
      gv_keer: 7,
      gv_verbetering: 50,
      bk_keer: 4,
      bk_verbetering: 40,
      kk_keer: 5,
      kk_verbetering: 50
    }
  },
  {
    id: 'sample_sessie_4',
    datum: '2026-10-06',
    sessieNummer: 4,
    sessiesMax: 20,
    samenvatting: 'Grote doorbraak op het werk: grens aangegeven naar leidinggevende vanuit de Gezonde Volwassene zónder te vluchten in overcompensatie.',
    vasthouden: 'Mijn behoeften doen ertoe. Als ik rustig blijf, luistert men.',
    huiswerk: 'Blijven monitoren met de werkbladen en in het weekend wandelen in de natuur.',
    formulierenGebruikt: ['Formulier 1 (Sessieverslag)', 'Formulier 2 (Modusregistratie)', 'Pagina 22 (GV & BK)'],
    modi: [
      { id: 'm1', modus: 'Onthechte beschermer', aantalKeer: 3, verbeteringVorige: 60, verbeteringBegin: 70 },
      { id: 'm2', modus: 'Straffende ouder', aantalKeer: 2, verbeteringVorige: 55, verbeteringBegin: 70 }
    ],
    gezondeKanten: {
      gv_keer: 10,
      gv_verbetering: 75,
      bk_keer: 6,
      bk_verbetering: 60,
      kk_keer: 6,
      kk_verbetering: 70
    }
  }
];

export default function Werkbladen({ onBack }) {
  const [activeTab, setActiveTab] = useState('form1'); // 'form1', 'form2', 'form3', 'history', 'print'
  const [notification, setNotification] = useState('');

  // Draft form data
  const [datum, setDatum] = useState(() => new Date().toISOString().split('T')[0]);
  const [sessiesGehad, setSessiesGehad] = useState('');
  const [sessiesMax, setSessiesMax] = useState('');
  const [samenvatting, setSamenvatting] = useState('');
  const [vasthouden, setVasthouden] = useState('');
  const [huiswerk, setHuiswerk] = useState('');
  const [formulierenGebruikt, setFormulierenGebruikt] = useState(['Formulier 1 (Sessieverslag)']);

  // Form 2: Modi
  const [modiItems, setModiItems] = useState([
    { id: 1, modus: 'Kwetsbare kind', aantalKeer: '', verbeteringVorige: 0, verbeteringBegin: 0 }
  ]);

  // Form 3 (Pagina 22): Gezonde Volwassene & Blije Kind
  const [gvKeer, setGvKeer] = useState('');
  const [gvVerbetering, setGvVerbetering] = useState(0);
  const [bkKeer, setBkKeer] = useState('');
  const [bkVerbetering, setBkVerbetering] = useState(0);
  const [kkKeer, setKkKeer] = useState('');
  const [kkVerbetering, setKkVerbetering] = useState(0);

  // History list
  const [savedSessions, setSavedSessions] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [];
  });

  // Print settings
  const [printMode, setPrintMode] = useState('ingevuld'); // 'ingevuld' or 'blanco'
  const [printSelection, setPrintSelection] = useState('all'); // 'all', 'form1', 'form2', 'form3'

  // Persist sessions
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(savedSessions));
    } catch (e) {
      console.error(e);
    }
  }, [savedSessions]);

  const showToast = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(''), 3500);
  };

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

  const handleSaveSession = () => {
    const nextSessionNum = sessiesGehad ? parseInt(sessiesGehad, 10) : (savedSessions.length + 1);
    const newSession = {
      id: 'sessie_' + Date.now(),
      datum: datum || new Date().toISOString().split('T')[0],
      sessieNummer: nextSessionNum,
      sessiesMax: sessiesMax ? parseInt(sessiesMax, 10) : undefined,
      samenvatting,
      vasthouden,
      huiswerk,
      formulierenGebruikt,
      modi: modiItems.map(m => ({
        ...m,
        aantalKeer: m.aantalKeer !== '' ? Number(m.aantalKeer) : 0,
        verbeteringVorige: Number(m.verbeteringVorige) || 0,
        verbeteringBegin: Number(m.verbeteringBegin) || 0
      })),
      gezondeKanten: {
        gv_keer: gvKeer !== '' ? Number(gvKeer) : 0,
        gv_verbetering: Number(gvVerbetering) || 0,
        bk_keer: bkKeer !== '' ? Number(bkKeer) : 0,
        bk_verbetering: Number(bkVerbetering) || 0,
        kk_keer: kkKeer !== '' ? Number(kkKeer) : 0,
        kk_verbetering: Number(kkVerbetering) || 0
      }
    };

    setSavedSessions(prev => [...prev, newSession]);
    showToast(`✅ Sessie ${nextSessionNum} succesvol opgeslagen in je geschiedenis!`);
    setActiveTab('history');
  };

  const handleLoadSampleData = () => {
    if (savedSessions.length > 0) {
      if (!window.confirm("Let op: Dit voegt 4 voorbeeld-sessies toe aan je huidige geschiedenis. Wil je doorgaan?")) {
        return;
      }
    }
    setSavedSessions(SAMPLE_HISTORY);
    showToast("✨ 4 voorbeeld-sessies succesvol ingeladen!");
  };

  const handleClearHistory = () => {
    if (window.confirm("Weet je zeker dat je alle opgeslagen sessies wilt wissen? Dit kan niet ongedaan worden gemaakt.")) {
      setSavedSessions([]);
      showToast("Geschiedenis gewist.");
    }
  };

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(savedSessions, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `schematherapie_werkbladen_geschiedenis_${new Date().toISOString().split('T')[0]}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    showToast("💾 Geschiedenis geëxporteerd als JSON!");
  };

  const handleImportJSON = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        if (Array.isArray(parsed)) {
          setSavedSessions(parsed);
          showToast(`✅ ${parsed.length} sessies succesvol geïmporteerd!`);
        } else {
          alert("Het bestand bevat geen geldige sessie-array.");
        }
      } catch (err) {
        alert("Fout bij het lezen van het JSON-bestand: " + err.message);
      }
    };
    reader.readAsText(file);
    e.target.value = '';
  };

  // Chart data calculation
  const chartData = useMemo(() => {
    if (!savedSessions || savedSessions.length === 0) return [];
    return savedSessions.map(s => {
      return {
        name: `Sessie ${s.sessieNummer}`,
        datum: s.datum,
        gv_verbetering: s.gezondeKanten?.gv_verbetering ?? 0,
        bk_verbetering: s.gezondeKanten?.bk_verbetering ?? 0,
        kk_verbetering: s.gezondeKanten?.kk_verbetering ?? 0,
        gv_keer: s.gezondeKanten?.gv_keer ?? 0,
        bk_keer: s.gezondeKanten?.bk_keer ?? 0,
        kk_keer: s.gezondeKanten?.kk_keer ?? 0,
        coping_keer: s.modi?.reduce((sum, m) => sum + (Number(m.aantalKeer) || 0), 0) ?? 0
      };
    });
  }, [savedSessions]);

  const handleTriggerPrint = (mode = 'ingevuld', selection = 'all') => {
    setPrintMode(mode);
    setPrintSelection(selection);
    setTimeout(() => {
      window.print();
    }, 150);
  };

  return (
    <div className="view-container" style={{ minHeight: '100vh', padding: '1.5rem 1rem', maxWidth: '1100px', margin: '0 auto' }}>
      
      {/* Platform Badge */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'center' }}>
        <PlatformBadge theme="werkbladen" marginBottom="1.5rem" href="index.html" />
      </div>

      {/* Toast Notification */}
      {notification && (
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          background: '#0f172a',
          color: '#ffffff',
          padding: '12px 24px',
          borderRadius: '12px',
          boxShadow: '0 10px 25px rgba(0,0,0,0.25)',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '0.95rem',
          fontWeight: '600',
          border: '1px solid rgba(255,255,255,0.15)'
        }}>
          {notification}
        </div>
      )}

      {/* Screen Header */}
      <div className="no-print" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '6px 16px', borderRadius: '9999px', background: 'rgba(124, 58, 237, 0.1)', color: '#7c3aed', fontWeight: '700', fontSize: '0.85rem', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          <Sparkles size={16} /> Schematherapie Behandel- &amp; Huiswerkmodule
        </div>
        <h1 style={{ fontSize: '2.5rem', fontWeight: '800', margin: '0 0 0.8rem 0', color: 'var(--text-main)', lineHeight: '1.2' }}>
          Werkbladen &amp; Voortgang
        </h1>
        <p style={{ maxWidth: '780px', margin: '0 auto', color: 'var(--text-muted)', fontSize: '1.1rem', lineHeight: '1.6' }}>
          Officiële registratie- en evaluatieformulieren voor in de spreekkamer. Schrijf sessiesamenvattingen, breng wekelijks je modusverandering in kaart en stimuleer de Gezonde Volwassene en het Blije Kind.
        </p>

        {/* Quick Action Buttons Header */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '1.5rem', flexWrap: 'wrap' }}>
          <button 
            onClick={() => handleTriggerPrint('blanco', 'all')}
            className="btn btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', fontSize: '0.92rem' }}
            title="Druk blanco formulieren af om 18x te kopiëren voor cliënten"
          >
            <Printer size={16} /> Blanco Werkbladen Printen (A4)
          </button>
          <button 
            onClick={() => handleTriggerPrint('ingevuld', 'all')}
            className="btn btn-outline"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 18px', fontSize: '0.92rem' }}
          >
            <Printer size={16} /> Ingevulde Formulieren Printen
          </button>
          <button 
            onClick={handleSaveSession}
            className="btn btn-gradient"
            style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 20px', fontSize: '0.92rem', color: 'white' }}
          >
            <Save size={16} /> Sessie Opslaan
          </button>
        </div>
      </div>

      {/* Tabs Navigation */}
      <div className="no-print" style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
        gap: '6px',
        padding: '6px',
        background: 'rgba(0,0,0,0.04)',
        borderRadius: '16px',
        marginBottom: '2rem',
        width: '100%',
        boxSizing: 'border-box'
      }}>
        <button
          onClick={() => setActiveTab('form1')}
          style={{
            padding: '10px 8px',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === 'form1' ? '#ffffff' : 'transparent',
            color: activeTab === 'form1' ? '#7c3aed' : 'var(--text-muted)',
            fontWeight: activeTab === 'form1' ? '700' : '600',
            fontSize: '0.92rem',
            boxShadow: activeTab === 'form1' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease'
          }}
        >
          <FileText size={16} />
          <span>Sessieverslag</span>
        </button>

        <button
          onClick={() => setActiveTab('form2')}
          style={{
            padding: '10px 8px',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === 'form2' ? '#ffffff' : 'transparent',
            color: activeTab === 'form2' ? '#7c3aed' : 'var(--text-muted)',
            fontWeight: activeTab === 'form2' ? '700' : '600',
            fontSize: '0.92rem',
            boxShadow: activeTab === 'form2' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease'
          }}
        >
          <Activity size={16} />
          <span>Modusverandering</span>
        </button>

        <button
          onClick={() => setActiveTab('form3')}
          style={{
            padding: '10px 8px',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === 'form3' ? '#ffffff' : 'transparent',
            color: activeTab === 'form3' ? '#059669' : 'var(--text-muted)',
            fontWeight: activeTab === 'form3' ? '700' : '600',
            fontSize: '0.92rem',
            boxShadow: activeTab === 'form3' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease'
          }}
        >
          <Smile size={16} color="#059669" />
          <span>Gezonde kanten</span>
        </button>

        <button
          onClick={() => setActiveTab('history')}
          style={{
            padding: '10px 8px',
            borderRadius: '12px',
            border: 'none',
            background: activeTab === 'history' ? '#ffffff' : 'transparent',
            color: activeTab === 'history' ? '#0284c7' : 'var(--text-muted)',
            fontWeight: activeTab === 'history' ? '700' : '600',
            fontSize: '0.92rem',
            boxShadow: activeTab === 'history' ? '0 4px 12px rgba(0,0,0,0.08)' : 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '6px',
            whiteSpace: 'nowrap',
            transition: 'all 0.2s ease'
          }}
        >
          <TrendingUp size={16} color="#0284c7" />
          <span>Voortgang</span>
        </button>
      </div>

      {/* ========================================================================= */}
      {/* TAB 1: FORMULIER 1 - EEN SAMENVATTING SCHRIJVEN (PAGINA 19)              */}
      {/* ========================================================================= */}
      {activeTab === 'form1' && (
        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px', marginBottom: '2.5rem' }}>
          
          {/* Header Strip van Formulier 1 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                Huiswerkopdrachten voor de volgende sessie • invullen huiswerkformulier 1 en 2
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                HUISWERKFORMULIER 1: Een samenvatting schrijven
              </h2>
              <div style={{ fontSize: '0.95rem', color: '#0ea5e9', fontWeight: '700' }}>
                Delen
              </div>
            </div>
            <div style={{ background: 'rgba(124, 58, 237, 0.08)', padding: '8px 14px', borderRadius: '8px', border: '1px dashed rgba(124, 58, 237, 0.3)', fontSize: '0.82rem', color: '#7c3aed', fontWeight: '600' }}>
              (s.v.p. downloaden en 18 keer kopiëren; het formulier wordt bij elke sessie gebruikt)
            </div>
          </div>

          {/* Doel / Toelichting */}
          <div style={{ background: 'rgba(14, 165, 233, 0.06)', padding: '1.25rem 1.5rem', borderRadius: '16px', borderLeft: '4px solid #0ea5e9', marginBottom: '2rem' }}>
            <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
              <strong>Waarom dit helpt:</strong> Schrijf in je eigen woorden een korte samenvatting van de laatste therapiesessie. Als je een sessie in eigen woorden opschrijft, blijft namelijk beter in je hoofd zitten wat belangrijk was. Het helpt je om de belangrijkste onderwerpen eruit te lichten en uit te leggen wat je ervan geleerd hebt.
            </p>
          </div>

          {/* Sessie tellers */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem', marginBottom: '2rem', background: 'var(--bg-color)', padding: '1.5rem', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)' }}>
                Datum van de sessie:
              </label>
              <input
                type="date"
                value={datum}
                onChange={(e) => setDatum(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)' }}>
                Hoeveel sessies heb ik tot nu toe gehad:
              </label>
              <input
                type="number"
                min="1"
                placeholder="bv. 4"
                value={sessiesGehad}
                onChange={(e) => setSessiesGehad(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1rem' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.9rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)' }}>
                Hoeveel sessies kan ik nog maximaal krijgen:
              </label>
              <input
                type="number"
                min="0"
                placeholder="bv. 16"
                value={sessiesMax}
                onChange={(e) => setSessiesMax(e.target.value)}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1rem' }}
              />
            </div>
          </div>

          {/* Vraag 1: Korte samenvatting */}
          <div style={{ marginBottom: '1.8rem' }}>
            <label style={{ display: 'block', fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>
              Korte samenvatting van de sessie datum {datum ? `(${datum})` : ''}:
            </label>
            <textarea
              rows={4}
              placeholder="Welke onderwerpen kwamen aan bod? Welke modi of schema's werden getriggerd en besproken?"
              value={samenvatting}
              onChange={(e) => setSamenvatting(e.target.value)}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', resize: 'vertical' }}
            />
          </div>

          {/* Vraag 2: Wat ik hiervan vast wil houden */}
          <div style={{ marginBottom: '1.8rem' }}>
            <label style={{ display: 'block', fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>
              Wat ik hiervan vast wil houden is:
            </label>
            <textarea
              rows={3}
              placeholder="Het belangrijkste inzicht, de helpende stem van de Gezonde Volwassene, of de troost voor het Kwetsbare Kind..."
              value={vasthouden}
              onChange={(e) => setVasthouden(e.target.value)}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', resize: 'vertical' }}
            />
          </div>

          {/* Vraag 3: Wat is mijn huiswerk */}
          <div style={{ marginBottom: '1.8rem' }}>
            <label style={{ display: 'block', fontSize: '1.05rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)' }}>
              Wat is mijn huiswerk:
            </label>
            <textarea
              rows={3}
              placeholder="Concrete oefeningen voor komende week: bv. gedragsexperiment, flashcard lezen, modusregistratie bijhouden..."
              value={huiswerk}
              onChange={(e) => setHuiswerk(e.target.value)}
              style={{ width: '100%', padding: '14px', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1rem', lineHeight: '1.6', resize: 'vertical' }}
            />
          </div>

          {/* Vraag 4: Welke formulieren gebruikt */}
          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', fontSize: '1.05rem', fontWeight: '700', marginBottom: '10px', color: 'var(--text-main)' }}>
              Geef aan welke huiswerkformulieren je voor de afgelopen sessie hebt gebruikt:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '10px' }}>
              {[
                'Formulier 1 (Sessieverslag)',
                'Formulier 2 (Modusregistratie)',
                'Pagina 22 (GV & Blije Kind)',
                'G-schema / Modusdagboek',
                'Flashcard / Oefenkaart',
                'Imaginaire rescripting log'
              ].map(fName => {
                const isSelected = formulierenGebruikt.includes(fName);
                return (
                  <div
                    key={fName}
                    onClick={() => handleToggleFormulier(fName)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: isSelected ? 'rgba(124, 58, 237, 0.1)' : 'var(--bg-color)',
                      border: isSelected ? '1px solid #7c3aed' : '1px solid var(--border-color)',
                      cursor: 'pointer',
                      fontSize: '0.92rem',
                      fontWeight: isSelected ? '700' : '500',
                      color: isSelected ? '#7c3aed' : 'var(--text-main)',
                      transition: 'all 0.15s ease'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={isSelected}
                      readOnly
                      style={{ accentColor: '#7c3aed', width: '16px', height: '16px' }}
                    />
                    <span>{fName}</span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Bottom Bar Form 1 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <button
              onClick={() => handleTriggerPrint('ingevuld', 'form1')}
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Printer size={16} /> Druk dit formulier af (A4)
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setActiveTab('form2')}
                className="btn btn-gradient"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white' }}
              >
                Volgende: Modusverandering <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 2: FORMULIER 2 - MODUSVERANDERING BIJHOUDEN (PAGINA 20)              */}
      {/* ========================================================================= */}
      {activeTab === 'form2' && (
        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px', marginBottom: '2.5rem' }}>
          
          {/* Header Formulier 2 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                Wekelijkse kwantitatieve &amp; kwalitatieve monitoring
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                HUISWERKFORMULIER 2: Het bijhouden van je modusverandering
              </h2>
              <div style={{ fontSize: '0.95rem', color: '#0ea5e9', fontWeight: '700' }}>
                Delen
              </div>
            </div>
            <div style={{ background: 'rgba(124, 58, 237, 0.08)', padding: '8px 14px', borderRadius: '8px', border: '1px dashed rgba(124, 58, 237, 0.3)', fontSize: '0.82rem', color: '#7c3aed', fontWeight: '600' }}>
              (s.v.p. downloaden en 18 keer kopiëren; het formulier wordt bij elke sessie gebruikt)
            </div>
          </div>

          {/* Doel / Toelichting */}
          <div style={{ background: 'rgba(124, 58, 237, 0.06)', padding: '1.25rem 1.5rem', borderRadius: '16px', borderLeft: '4px solid #7c3aed', marginBottom: '2rem' }}>
            <p style={{ margin: 0, fontSize: '0.98rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
              <strong>Instructie:</strong> Hierna staan de vragen die je kunnen helpen bij het in kaart brengen van de verandering in de kracht van je modi. Schrijf iedere week per modus op hoe vaak je in de modus zat en wat de verandering is ten opzichte van je vorige beoordelingen.
            </p>
          </div>

          {/* Modi Items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2rem' }}>
            {modiItems.map((item, index) => (
              <div 
                key={item.id} 
                style={{ 
                  background: 'var(--bg-color)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: '16px', 
                  padding: '1.75rem',
                  position: 'relative'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#7c3aed', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '0.85rem' }}>
                      {index + 1}
                    </span>
                    <strong style={{ fontSize: '1.1rem', color: 'var(--text-main)' }}>Modusregistratie #{index + 1}</strong>
                  </div>
                  {modiItems.length > 1 && (
                    <button
                      onClick={() => handleRemoveModus(item.id)}
                      style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.85rem', fontWeight: '600' }}
                    >
                      <Trash2 size={16} /> Verwijder
                    </button>
                  )}
                </div>

                {/* Vraag 1: Selecteer Modus & Aantal keer */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.25rem', marginBottom: '1.5rem' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)' }}>
                      1. Hoe vaak zat je deze week in de modus van:
                    </label>
                    <select
                      value={item.modus}
                      onChange={(e) => handleUpdateModus(item.id, 'modus', e.target.value)}
                      style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '0.98rem', fontWeight: '600' }}
                    >
                      {Object.entries(CATEGORIZED_MODES).map(([group, list]) => (
                        <optgroup key={group} label={group}>
                          {list.map(mName => (
                            <option key={mName} value={mName}>{mName}</option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '700', marginBottom: '6px', color: 'var(--text-main)' }}>
                      Aantal keer in deze modus:
                    </label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <input
                        type="number"
                        min="0"
                        placeholder="bv. 4"
                        value={item.aantalKeer}
                        onChange={(e) => handleUpdateModus(item.id, 'aantalKeer', e.target.value)}
                        style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1rem' }}
                      />
                      <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', whiteSpace: 'nowrap' }}>keer deze week</span>
                    </div>
                  </div>
                </div>

                {/* Vraag 2: Verandering t.o.v. vorige beoordeling */}
                <div style={{ marginBottom: '1.5rem', background: 'rgba(0,0,0,0.02)', padding: '1.25rem', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>
                      2. Verandering t.o.v. de vorige beoordeling (frequentie &amp; intensiteit):
                    </label>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: item.verbeteringVorige > 50 ? '#10b981' : item.verbeteringVorige > 20 ? '#0ea5e9' : '#64748b' }}>
                      {item.verbeteringVorige}% verbetering
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 10px 0' }}>
                    Welke verbetering heb je waargenomen in vergelijking met de vorige beoordeling (0% = geen verbetering, 100% = maximaal verbeterd).
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={item.verbeteringVorige}
                    onChange={(e) => handleUpdateModus(item.id, 'verbeteringVorige', Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#7c3aed', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span>0% (Geen verbetering)</span>
                    <span>50% (Matig verbeterd)</span>
                    <span>100% (Maximaal verbeterd)</span>
                  </div>
                </div>

                {/* Vraag 3: Verandering t.o.v. het begin van de therapie */}
                <div style={{ background: 'rgba(0,0,0,0.02)', padding: '1.25rem', borderRadius: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)' }}>
                      3. Verandering t.o.v. het begin van de therapie:
                    </label>
                    <span style={{ fontSize: '1.1rem', fontWeight: '800', color: item.verbeteringBegin > 50 ? '#10b981' : item.verbeteringBegin > 20 ? '#0ea5e9' : '#64748b' }}>
                      {item.verbeteringBegin}% verbetering
                    </span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', margin: '0 0 10px 0' }}>
                    Welke verbetering heb je waargenomen in vergelijking met de start van de therapie (0% = geen verbetering, 100% = maximaal verbeterd).
                  </p>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={item.verbeteringBegin}
                    onChange={(e) => handleUpdateModus(item.id, 'verbeteringBegin', Number(e.target.value))}
                    style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
                  />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                    <span>0% (Geen verbetering)</span>
                    <span>50% (Duidelijke afname)</span>
                    <span>100% (Modus volledig onder controle)</span>
                  </div>
                </div>

              </div>
            ))}
          </div>

          {/* Add Modus Button */}
          <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            <button
              onClick={handleAddModus}
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '10px 24px', fontSize: '0.95rem' }}
            >
              <Plus size={18} /> Nog een modus toevoegen
            </button>
          </div>

          {/* Bottom Bar Form 2 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <button
              onClick={() => handleTriggerPrint('ingevuld', 'form2')}
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Printer size={16} /> Druk Formulier 2 af (A4)
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={() => setActiveTab('form3')}
                className="btn btn-gradient"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white' }}
              >
                Volgende: Gezonde kanten <ChevronRight size={16} />
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 3: PAGINA 22 - GEZONDE VOLWASSENE EN HET BLIJE KIND (DELEN)           */}
      {/* ========================================================================= */}
      {activeTab === 'form3' && (
        <div className="glass-panel" style={{ padding: '2.5rem', borderRadius: '24px', marginBottom: '2.5rem' }}>
          
          {/* Header Pagina 22 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', borderBottom: '1px solid var(--border-color)', paddingBottom: '1.5rem', marginBottom: '2rem' }}>
            <div>
              <div style={{ fontSize: '0.85rem', fontWeight: '800', color: '#10b981', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '4px' }}>
                Functionele &amp; Kindmodi Evaluatie
              </div>
              <h2 style={{ fontSize: '1.85rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 4px 0' }}>
                Gezonde volwassene en het Blije kind
              </h2>
              <div style={{ fontSize: '0.95rem', color: '#0ea5e9', fontWeight: '700' }}>
                Delen
              </div>
            </div>
            <div style={{ background: 'rgba(16, 185, 129, 0.1)', padding: '6px 14px', borderRadius: '9999px', color: '#10b981', fontWeight: '800', fontSize: '0.9rem' }}>
              Pagina 22
            </div>
          </div>

          {/* Doel / Toelichting */}
          <div style={{ background: 'rgba(16, 185, 129, 0.08)', padding: '1.25rem 1.5rem', borderRadius: '16px', borderLeft: '4px solid #10b981', marginBottom: '2rem' }}>
            <p style={{ margin: 0, fontSize: '1rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
              Vraag jezelf af hoe vaak je vanuit de <strong>Gezonde volwassene</strong> en/of het <strong>Blije kind</strong> hebt gereageerd de afgelopen week. Vraag je ook af in welke mate dit een verandering is ten opzichte van het begin van de therapie.
            </p>
          </div>

          {/* Vraag 1: Gezonde Volwassene */}
          <div style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.75rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(16, 185, 129, 0.15)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Shield size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>1. Gezonde volwassene</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)', lineHeight: '1.4' }}>
                  1a. De afgelopen week heb ik <em>met aandacht</em> ongeveer:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="number"
                    min="0"
                    placeholder="bv. 5"
                    value={gvKeer}
                    onChange={(e) => setGvKeer(e.target.value)}
                    style={{ width: '120px', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: '700' }}
                  />
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>keer in de modus van <strong>Gezonde volwassene</strong> gezeten.</span>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.4' }}>
                    1b. Positieve verandering t.o.v. begin van de therapie:
                  </label>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#10b981' }}>{gvVerbetering}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={gvVerbetering}
                  onChange={(e) => setGvVerbetering(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#10b981', cursor: 'pointer' }}
                />
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  (0% = geen positieve verandering, 100% = maximale positieve verandering)
                </div>
              </div>
            </div>
          </div>

          {/* Vraag 2: Het Blije Kind */}
          <div style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.75rem', marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Smile size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>2. Het Blije kind</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)', lineHeight: '1.4' }}>
                  2a. De afgelopen week heb ik <em>met aandacht</em> ongeveer:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="number"
                    min="0"
                    placeholder="bv. 3"
                    value={bkKeer}
                    onChange={(e) => setBkKeer(e.target.value)}
                    style={{ width: '120px', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: '700' }}
                  />
                  <span style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>keer in de modus van <strong>het Blije kind</strong> gezeten.</span>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.4' }}>
                    2b. Positieve verandering t.o.v. begin van de therapie:
                  </label>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#f59e0b' }}>{bkVerbetering}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={bkVerbetering}
                  onChange={(e) => setBkVerbetering(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#f59e0b', cursor: 'pointer' }}
                />
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  (0% = geen positieve verandering, 100% = maximale positieve verandering)
                </div>
              </div>
            </div>
          </div>

          {/* Vraag 3: Kwetsbare Kind */}
          <div style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '18px', padding: '1.75rem', marginBottom: '2.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', background: 'rgba(14, 165, 233, 0.15)', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Heart size={20} />
              </div>
              <h3 style={{ margin: 0, fontSize: '1.25rem', color: 'var(--text-main)' }}>3. Zorg voor het Kwetsbare kind</h3>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.5rem', marginBottom: '1.25rem' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.95rem', fontWeight: '700', marginBottom: '8px', color: 'var(--text-main)', lineHeight: '1.4' }}>
                  3a. De afgelopen week heb ik <em>met aandacht</em> ongeveer:
                </label>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <input
                    type="number"
                    min="0"
                    placeholder="bv. 4"
                    value={kkKeer}
                    onChange={(e) => setKkKeer(e.target.value)}
                    style={{ width: '120px', padding: '10px 14px', borderRadius: '10px', border: '1px solid var(--border-color)', background: 'var(--card-bg)', color: 'var(--text-main)', fontSize: '1.1rem', fontWeight: '700' }}
                  />
                  <span style={{ fontSize: '0.92rem', color: 'var(--text-main)' }}>keer naar mijn <strong>Kwetsbare kind</strong> geluisterd, zonder oordeel en rekening houdend met mijn emotionele kernbehoefte.</span>
                </div>
              </div>

              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontSize: '0.95rem', fontWeight: '700', color: 'var(--text-main)', lineHeight: '1.4' }}>
                    3b. Positieve verandering t.o.v. begin van de therapie:
                  </label>
                  <span style={{ fontSize: '1.15rem', fontWeight: '800', color: '#0ea5e9' }}>{kkVerbetering}%</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="100"
                  step="5"
                  value={kkVerbetering}
                  onChange={(e) => setKkVerbetering(Number(e.target.value))}
                  style={{ width: '100%', accentColor: '#0ea5e9', cursor: 'pointer' }}
                />
                <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '4px' }}>
                  (0% = geen positieve verandering, 100% = maximale positieve verandering)
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Bar Form 3 */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', borderTop: '1px solid var(--border-color)', paddingTop: '1.5rem' }}>
            <button
              onClick={() => handleTriggerPrint('ingevuld', 'form3')}
              className="btn btn-outline"
              style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              <Printer size={16} /> Druk Gezonde kanten af (A4)
            </button>
            <div style={{ display: 'flex', gap: '10px' }}>
              <button
                onClick={handleSaveSession}
                className="btn btn-gradient"
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', color: 'white' }}
              >
                <Save size={16} /> Sla sessie op &amp; bekijk voortgang
              </button>
            </div>
          </div>

        </div>
      )}

      {/* ========================================================================= */}
      {/* TAB 4: VOORTGANG GRAFIEK & GESCHIEDENIS                                   */}
      {/* ========================================================================= */}
      {activeTab === 'history' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem', marginBottom: '3rem' }}>
          
          {/* Top Actions for History */}
          <div className="glass-panel" style={{ padding: '1.5rem 2rem', borderRadius: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '0 0 4px 0', color: 'var(--text-main)' }}>
                Voortgang &amp; Historie
              </h2>
              <div style={{ fontSize: '0.92rem', color: 'var(--text-muted)' }}>
                {savedSessions.length === 0 ? 'Nog geen opgeslagen sessies.' : `${savedSessions.length} opgeslagen registraties in je browser.`}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              {savedSessions.length === 0 && (
                <button
                  onClick={handleLoadSampleData}
                  className="btn btn-outline"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.88rem' }}
                >
                  <Sparkles size={16} color="#7c3aed" /> Laad 4 voorbeeld-sessies
                </button>
              )}
              {savedSessions.length > 0 && (
                <>
                  <button
                    onClick={handleExportJSON}
                    className="btn btn-outline"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.88rem' }}
                    title="Exporteer als back-up"
                  >
                    <Download size={16} /> Exporteer JSON
                  </button>
                  <button
                    onClick={handleClearHistory}
                    className="btn btn-outline"
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.88rem', color: '#ef4444' }}
                  >
                    <Trash2 size={16} /> Wis alles
                  </button>
                </>
              )}
              <label className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', padding: '8px 16px', fontSize: '0.88rem', cursor: 'pointer' }}>
                <Upload size={16} /> Importeer JSON
                <input type="file" accept=".json" onChange={handleImportJSON} style={{ display: 'none' }} />
              </label>
            </div>
          </div>

          {/* Charts container */}
          {savedSessions.length > 0 ? (
            <>
              {/* Stat Cards */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.25rem' }}>
                <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #10b981' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Gezonde Volwassene
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#10b981', margin: '4px 0' }}>
                    {savedSessions[savedSessions.length - 1]?.gezondeKanten?.gv_verbetering ?? 0}%
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Verbetering t.o.v. start (laatste sessie)
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #f59e0b' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Blije Kind
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#f59e0b', margin: '4px 0' }}>
                    {savedSessions[savedSessions.length - 1]?.gezondeKanten?.bk_verbetering ?? 0}%
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Ruimte voor speelsheid &amp; plezier
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #0ea5e9' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Kwetsbare Kind
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#0ea5e9', margin: '4px 0' }}>
                    {savedSessions[savedSessions.length - 1]?.gezondeKanten?.kk_verbetering ?? 0}%
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Zorg &amp; luisteren naar emotionele behoeften
                  </div>
                </div>

                <div className="glass-panel" style={{ padding: '1.25rem', borderRadius: '16px', borderLeft: '4px solid #7c3aed' }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: '700', color: 'var(--text-muted)', textTransform: 'uppercase' }}>
                    Geregistreerde Sessies
                  </div>
                  <div style={{ fontSize: '1.8rem', fontWeight: '800', color: '#7c3aed', margin: '4px 0' }}>
                    {savedSessions.length}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>
                    Totaal wekelijkse metingen
                  </div>
                </div>
              </div>

              {/* Line Chart: Percentage Verbetering over Tijd */}
              <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <TrendingUp size={20} color="#10b981" />
                  Groei van Gezonde Modi &amp; Zorg (% verbetering t.o.v. start)
                </h3>
                <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Visualisatie van de scores op Pagina 22 (Gezonde Volwassene, Blije Kind en Kwetsbare Kind) over opeenvolgende sessies.
                </p>

                <div style={{ width: '100%', height: 320 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                      <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                      <YAxis domain={[0, 100]} stroke="var(--text-muted)" fontSize={12} unit="%" />
                      <Tooltip 
                        contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px' }}
                        formatter={(val) => [`${val}%`, '']}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Line type="monotone" dataKey="gv_verbetering" name="Gezonde volwassene (%)" stroke="#10b981" strokeWidth={3} dot={{ r: 5 }} />
                      <Line type="monotone" dataKey="bk_verbetering" name="Blije kind (%)" stroke="#f59e0b" strokeWidth={3} dot={{ r: 5 }} />
                      <Line type="monotone" dataKey="kk_verbetering" name="Kwetsbare kind (%)" stroke="#0ea5e9" strokeWidth={3} dot={{ r: 5 }} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Bar Chart: Aandachtsmomenten (Frequentie per week) */}
              <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px' }}>
                <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.25rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Activity size={20} color="#7c3aed" />
                  Wekelijkse Frequentie (Keer met aandacht in modus)
                </h3>
                <p style={{ margin: '0 0 1.5rem 0', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
                  Aantal keer per week dat er met aandacht in de Gezonde Volwassene of het Blije Kind is gezeten, t.o.v. copingactiviteit.
                </p>

                <div style={{ width: '100%', height: 280 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 10, right: 30, left: -10, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(0,0,0,0.08)" />
                      <XAxis dataKey="name" stroke="var(--text-muted)" fontSize={12} />
                      <YAxis stroke="var(--text-muted)" fontSize={12} allowDecimals={false} />
                      <Tooltip 
                        contentStyle={{ background: 'var(--card-bg)', border: '1px solid var(--border-color)', borderRadius: '10px' }}
                        formatter={(val) => [`${val} keer`, '']}
                      />
                      <Legend verticalAlign="top" height={36} />
                      <Bar dataKey="gv_keer" name="Gezonde volwassene (keer)" fill="#10b981" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="bk_keer" name="Blije kind (keer)" fill="#f59e0b" radius={[4, 4, 0, 0]} />
                      <Bar dataKey="coping_keer" name="Copingmodi (keer)" fill="#f43f5e" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* History Timeline */}
              <div className="glass-panel" style={{ padding: '2rem', borderRadius: '24px' }}>
                <h3 style={{ margin: '0 0 1.5rem 0', fontSize: '1.25rem', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Calendar size={20} color="#0ea5e9" />
                  Sessielijst &amp; Notities
                </h3>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {savedSessions.slice().reverse().map(s => (
                    <div 
                      key={s.id} 
                      style={{ 
                        background: 'var(--bg-color)', 
                        border: '1px solid var(--border-color)', 
                        borderRadius: '16px', 
                        padding: '1.5rem' 
                      }}
                    >
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '8px', marginBottom: '0.75rem' }}>
                        <div>
                          <strong style={{ fontSize: '1.15rem', color: 'var(--text-main)' }}>Sessie {s.sessieNummer}</strong>
                          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', marginLeft: '10px' }}>({s.datum})</span>
                        </div>
                        <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                          <span style={{ padding: '4px 10px', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', fontSize: '0.8rem', fontWeight: '700' }}>
                            GV: +{s.gezondeKanten?.gv_verbetering ?? 0}%
                          </span>
                          <span style={{ padding: '4px 10px', borderRadius: '9999px', background: 'rgba(245, 158, 11, 0.1)', color: '#f59e0b', fontSize: '0.8rem', fontWeight: '700' }}>
                            BK: +{s.gezondeKanten?.bk_verbetering ?? 0}%
                          </span>
                        </div>
                      </div>

                      {s.samenvatting && (
                        <div style={{ fontSize: '0.92rem', marginBottom: '8px', color: 'var(--text-main)', lineHeight: '1.5' }}>
                          <strong>Samenvatting:</strong> {s.samenvatting}
                        </div>
                      )}
                      {s.vasthouden && (
                        <div style={{ fontSize: '0.92rem', marginBottom: '8px', color: '#0ea5e9', lineHeight: '1.5' }}>
                          <strong>Vasthouden:</strong> {s.vasthouden}
                        </div>
                      )}
                      {s.huiswerk && (
                        <div style={{ fontSize: '0.92rem', color: '#7c3aed', lineHeight: '1.5' }}>
                          <strong>Huiswerk:</strong> {s.huiswerk}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          ) : (
            <div className="glass-panel" style={{ padding: '4rem 2rem', textAlign: 'center', borderRadius: '24px' }}>
              <BookOpen size={48} color="#94a3b8" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', marginBottom: '0.5rem' }}>Nog geen sessies geregistreerd</h3>
              <p style={{ maxWidth: '500px', margin: '0 auto 1.5rem auto', color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Vul Formulier 1, 2 of Pagina 22 in en klik op "Sessie Opslaan" om je voortgang over tijd te volgen in deze interactieve grafiek.
              </p>
              <button
                onClick={handleLoadSampleData}
                className="btn btn-gradient"
                style={{ color: 'white', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
              >
                <Sparkles size={18} /> Laad 4 voorbeeld-sessies ter demonstratie
              </button>
            </div>
          )}

        </div>
      )}

      {/* ========================================================================= */}
      {/* PRINT-LAYOUTS: ZOWEL OP HET SCHERM ALS VOOR HET DAADWERKELIJKE AFDRUKKEN  */}
      {/* ========================================================================= */}
      <div className={activeTab === 'print' ? 'print-preview-container' : 'only-print'}>
        <style>{`
          @media screen {
            .only-print {
              display: none !important;
            }
          }
          @media print {
            .no-print {
              display: none !important;
            }
            .only-print {
              display: block !important;
            }
            body {
              background: #ffffff !important;
              color: #000000 !important;
              margin: 0 !important;
              padding: 0 !important;
            }
            .view-container {
              max-width: 100% !important;
              padding: 0 !important;
              margin: 0 !important;
            }
            .page-sheet {
              width: 100% !important;
              min-height: 297mm !important;
              padding: 18mm 20mm !important;
              box-sizing: border-box !important;
              page-break-after: always !important;
              break-after: page !important;
              background: #ffffff !important;
              color: #000000 !important;
              font-family: inherit !important;
            }
            .ruled-line {
              border-bottom: 1px solid #94a3b8 !important;
              height: 28px !important;
              width: 100% !important;
              margin-bottom: 6px !important;
            }
          }
        `}</style>

        {/* ===================================================================== */}
        {/* PRINT PAGE 19: HUISWERKFORMULIER 1 - EEN SAMENVATTING SCHRIJVEN       */}
        {/* ===================================================================== */}
        {(printSelection === 'all' || printSelection === 'form1') && (
          <div className="page-sheet" style={{ background: '#ffffff', color: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: '700', color: '#334155' }}>
                Huiswerkopdrachten voor de volgende sessie • invullen huiswerkformulier 1 en 2.
              </div>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '4px 0', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                HUISWERKFORMULIER 1
              </h1>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700', margin: '2px 0 6px 0', color: '#0f172a' }}>
                Een samenvatting schrijven
              </h2>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0284c7' }}>
                Delen
              </div>
              <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: '#475569', marginTop: '4px' }}>
                (s.v.p. downloaden en 18 keer kopiëren; het formulier wordt bij elke sessie gebruikt)
              </div>
            </div>

            <div style={{ fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem', borderLeft: '3px solid #64748b', paddingLeft: '12px' }}>
              Schrijf in je eigen woorden een korte samenvatting van de laatste therapiesessie. Als je een sessie in eigen woorden opschrijft, blijft namelijk beter in je hoofd zitten wat belangrijk was. Het helpt je om de belangrijkste onderwerpen eruit te lichten en uit te leggen wat je ervan geleerd hebt.
            </div>

            <div style={{ fontSize: '0.92rem', marginBottom: '1.25rem', lineHeight: '2' }}>
              <div>Hoeveel sessies heb ik tot nu toe gehad: <strong>{printMode === 'ingevuld' && sessiesGehad ? sessiesGehad : '_________________________'}</strong></div>
              <div>Hoeveel sessies kan ik nog maximaal krijgen: <strong>{printMode === 'ingevuld' && sessiesMax ? sessiesMax : '_________________________'}</strong></div>
              <div>Korte samenvatting van de sessie datum: <strong>{printMode === 'ingevuld' && datum ? datum : '_________________________'}</strong></div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ minHeight: printMode === 'ingevuld' && samenvatting ? 'auto' : '100px', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '6px' }}>
                {printMode === 'ingevuld' && samenvatting ? samenvatting : (
                  <>
                    <div style={{ borderBottom: '1px dotted #94a3b8', height: '24px' }} />
                    <div style={{ borderBottom: '1px dotted #94a3b8', height: '24px' }} />
                    <div style={{ borderBottom: '1px dotted #94a3b8', height: '24px' }} />
                    <div style={{ borderBottom: '1px dotted #94a3b8', height: '24px' }} />
                  </>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '4px' }}>Wat ik hiervan vast wil houden is:</div>
              <div style={{ minHeight: printMode === 'ingevuld' && vasthouden ? 'auto' : '80px', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '6px' }}>
                {printMode === 'ingevuld' && vasthouden ? vasthouden : (
                  <>
                    <div style={{ borderBottom: '1px dotted #94a3b8', height: '24px' }} />
                    <div style={{ borderBottom: '1px dotted #94a3b8', height: '24px' }} />
                    <div style={{ borderBottom: '1px dotted #94a3b8', height: '24px' }} />
                  </>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ fontWeight: '700', fontSize: '0.95rem', marginBottom: '4px' }}>Wat is mijn huiswerk:</div>
              <div style={{ minHeight: printMode === 'ingevuld' && huiswerk ? 'auto' : '80px', fontSize: '0.95rem', lineHeight: '1.7', whiteSpace: 'pre-wrap', border: '1px solid #e2e8f0', padding: '10px', borderRadius: '6px' }}>
                {printMode === 'ingevuld' && huiswerk ? huiswerk : (
                  <>
                    <div style={{ borderBottom: '1px dotted #94a3b8', height: '24px' }} />
                    <div style={{ borderBottom: '1px dotted #94a3b8', height: '24px' }} />
                    <div style={{ borderBottom: '1px dotted #94a3b8', height: '24px' }} />
                  </>
                )}
              </div>
            </div>

            <div style={{ marginBottom: '1rem', fontSize: '0.9rem' }}>
              <div style={{ fontWeight: '700', marginBottom: '4px' }}>Geef aan welke huiswerkformulieren je voor de afgelopen sessie hebt gebruikt:</div>
              <div style={{ fontSize: '0.9rem', color: '#1e293b' }}>
                {printMode === 'ingevuld' && formulierenGebruikt.length > 0 ? (
                  formulierenGebruikt.join(', ')
                ) : (
                  '_____________________________________________________________________________________'
                )}
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#64748b', marginTop: '2rem' }}>
              19
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* PRINT PAGE 20: HUISWERKFORMULIER 2 - MODUSVERANDERING                 */}
        {/* ===================================================================== */}
        {(printSelection === 'all' || printSelection === 'form2') && (
          <div className="page-sheet" style={{ background: '#ffffff', color: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '4px 0', textTransform: 'uppercase', letterSpacing: '-0.01em' }}>
                HUISWERKFORMULIER 2
              </h1>
              <h2 style={{ fontSize: '1.2rem', fontWeight: '700', margin: '2px 0 6px 0', color: '#0f172a' }}>
                Het bijhouden van je modusverandering
              </h2>
              <div style={{ fontSize: '0.95rem', fontWeight: '700', color: '#0284c7' }}>
                Delen
              </div>
              <div style={{ fontSize: '0.8rem', fontStyle: 'italic', color: '#475569', marginTop: '4px' }}>
                (s.v.p. downloaden en 18 keer kopiëren; het formulier wordt bij elke sessie gebruikt)
              </div>
            </div>

            <div style={{ fontSize: '0.9rem', lineHeight: '1.5', marginBottom: '1.5rem', borderLeft: '3px solid #64748b', paddingLeft: '12px' }}>
              Hierna staan de vragen die je kunnen helpen bij het in kaart brengen van de verandering in de kracht van je modi. Schrijf iedere week per modus op hoe vaak je in de modus zat en wat de verandering is ten opzichte van je vorige beoordelingen.
            </div>

            {/* Ingevuld or Blanco block */}
            {(printMode === 'ingevuld' ? modiItems : [1, 2]).map((item, idx) => (
              <div key={idx} style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px dashed #cbd5e1' }}>
                <div style={{ fontSize: '0.95rem', marginBottom: '8px' }}>
                  1. Hoe vaak zat je deze week in de modus van (vul hier de modus in): <strong>{printMode === 'ingevuld' ? item.modus : '____________________________________'}</strong>
                </div>
                <div style={{ fontSize: '0.95rem', marginBottom: '12px', paddingLeft: '16px' }}>
                  Aantal keer in de modus: <strong>{printMode === 'ingevuld' && item.aantalKeer ? `${item.aantalKeer} keer` : '__________________'}</strong>
                </div>

                <div style={{ fontSize: '0.92rem', marginBottom: '6px' }}>
                  2. Verandering van de mate (frequentie en intensiteit) waarin je in de modus zat; ten opzichte van de vorige beoordeling:
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569', paddingLeft: '16px', marginBottom: '6px' }}>
                  Welke verbetering heb je waargenomen in vergelijking met de vorige beoordeling (geef in procenten aan hoeveel het is verbeterd. 0% staat voor geen verbetering en 100% staat voor maximaal verbeterd).
                </div>
                <div style={{ fontSize: '0.95rem', paddingLeft: '16px', marginBottom: '12px' }}>
                  % verbetering: <strong>{printMode === 'ingevuld' ? `${item.verbeteringVorige}%` : '__________________ %'}</strong>
                </div>

                <div style={{ fontSize: '0.92rem', marginBottom: '6px' }}>
                  3. Verandering van de mate (frequentie en intensiteit) waarin je in de modus zat ten opzichte van het begin van de therapie:
                </div>
                <div style={{ fontSize: '0.85rem', color: '#475569', paddingLeft: '16px', marginBottom: '6px' }}>
                  Welke verbetering heb je waargenomen in vergelijking met de vorige beoordeling (geef in procenten aan hoeveel het is verbeterd. 0% staat voor geen verbetering en 100% staat voor maximaal verbeterd).
                </div>
                <div style={{ fontSize: '0.95rem', paddingLeft: '16px' }}>
                  % verbetering: <strong>{printMode === 'ingevuld' ? `${item.verbeteringBegin}%` : '__________________ %'}</strong>
                </div>
              </div>
            ))}

            <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#64748b', marginTop: '2rem' }}>
              20
            </div>
          </div>
        )}

        {/* ===================================================================== */}
        {/* PRINT PAGE 22: GEZONDE VOLWASSENE EN HET BLIJE KIND                   */}
        {/* ===================================================================== */}
        {(printSelection === 'all' || printSelection === 'form3') && (
          <div className="page-sheet" style={{ background: '#ffffff', color: '#111827', padding: '24px', borderRadius: '12px', border: '1px solid #cbd5e1', marginBottom: '2rem' }}>
            <div style={{ textAlign: 'left', marginBottom: '1.25rem' }}>
              <h1 style={{ fontSize: '1.5rem', fontWeight: '800', margin: '4px 0' }}>
                Gezonde volwassene en het Blije kind
              </h1>
              <div style={{ fontSize: '1.05rem', fontWeight: '700', color: '#0284c7' }}>
                Delen
              </div>
            </div>

            <div style={{ fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '1.5rem' }}>
              Vraag jezelf af hoe vaak je vanuit de Gezonde volwassene en/of het Blije kind hebt gereageerd de afgelopen week. Vraag je ook af in welke mate dit een verandering is ten opzichte van het begin van de therapie.
            </div>

            {/* Vraag 1 */}
            <div style={{ marginBottom: '1.8rem' }}>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '6px' }}>
                1a. De afgelopen week heb ik <em>met aandacht</em> ongeveer <strong>{printMode === 'ingevuld' && gvKeer ? gvKeer : '_______'}</strong> keer in de modus van Gezonde volwassene gezeten.
              </div>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '6px' }}>
                1b. Dit is een positieve verandering ten opzichte van het begin van de therapie van <strong>{printMode === 'ingevuld' && gvVerbetering ? `${gvVerbetering}%` : '_______%'}</strong>.
              </div>
              <div style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#475569', paddingLeft: '16px' }}>
                Welke positieve verandering heb je waargenomen in vergelijking met de vorige beoordeling (geef in procenten aan hoeveel het positief is veranderd. 0% staat voor geen positieve verandering en 100% staat voor maximale positieve verandering).
              </div>
            </div>

            {/* Vraag 2 */}
            <div style={{ marginBottom: '1.8rem' }}>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '6px' }}>
                2a. De afgelopen week heb ik <em>met aandacht</em> ongeveer <strong>{printMode === 'ingevuld' && bkKeer ? bkKeer : '_______'}</strong> keer in de modus van het Blije kind gezeten.
              </div>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '6px' }}>
                2b. Dit is een positieve verandering ten opzichte van het begin van de therapie van <strong>{printMode === 'ingevuld' && bkVerbetering ? `${bkVerbetering}%` : '_______%'}</strong>.
              </div>
              <div style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#475569', paddingLeft: '16px' }}>
                Welke positieve verandering heb je waargenomen in vergelijking met de vorige beoordeling (geef in procenten aan hoeveel het positief is veranderd. 0% staat voor geen positieve verandering en 100% staat voor maximale positieve verandering).
              </div>
            </div>

            {/* Vraag 3 */}
            <div style={{ marginBottom: '1.8rem' }}>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '6px' }}>
                3a. De afgelopen week heb ik <em>met aandacht</em> ongeveer <strong>{printMode === 'ingevuld' && kkKeer ? kkKeer : '_______'}</strong> keer naar mijn Kwetsbare kind geluisterd, zonder oordeel en rekening houdend met mijn emotionele kernbehoefte.
              </div>
              <div style={{ fontSize: '0.95rem', lineHeight: '1.7', marginBottom: '6px' }}>
                3b. Dit is een positieve verandering ten opzichte van het begin van de therapie van <strong>{printMode === 'ingevuld' && kkVerbetering ? `${kkVerbetering}%` : '_______%'}</strong>.
              </div>
              <div style={{ fontSize: '0.85rem', fontStyle: 'italic', color: '#475569', paddingLeft: '16px' }}>
                Welke positieve verandering heb je waargenomen in vergelijking met de vorige beoordeling (geef in procenten aan hoeveel het positief is veranderd. 0% staat voor geen positieve verandering en 100% staat voor maximale positieve verandering)
              </div>
            </div>

            <div style={{ textAlign: 'right', fontSize: '0.85rem', color: '#64748b', marginTop: '3rem' }}>
              22
            </div>
          </div>
        )}
      </div>

    </div>
  );
}
