import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArrowLeftIcon, CpuChipIcon, AlertTriangleIcon, CheckIcon, WandIcon, ArrowDownIcon } from './Icons';
import { schemaImages, modeImages } from '../utils/images';
import ysqScoring from '../data/ysq-scoring.json';
import smiScoring from '../data/smi-scoring.json';
import { schemaDescriptions } from '../data/descriptions';
import { getCardColor, CardInnerBorder } from '../utils/colors';


import imgB1 from '../assets/images/basisbehoeften/1.png';
import imgB2 from '../assets/images/basisbehoeften/2.png';
import imgB3 from '../assets/images/basisbehoeften/3.png';
import imgB4 from '../assets/images/basisbehoeften/4.png';
import imgB5 from '../assets/images/basisbehoeften/5.png';
import imgM4 from '../assets/images/modicategorieen/4.png';


const StepBadge = ({ number, size = 32 }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: `${size}px`, height: `${size}px`, borderRadius: '50%',
    background: 'linear-gradient(135deg, #14b8a6, #3b82f6)',
    color: '#ffffff', fontSize: `${size * 0.55}px`, fontWeight: 'bold',
    marginRight: '12px', flexShrink: 0,
    WebkitTextFillColor: '#ffffff',
    boxShadow: '0 4px 10px rgba(20, 184, 166, 0.3)'
  }}>
    {number}
  </span>
);

const ysqSchemaNamesMap = {
  'Abandonment': 'Verlating / Instabiliteit',
  'Mistrust': 'Wantrouwen / Misbruik',
  'Defectiveness_unlovability': 'Tekortschieten / Schaamte',
  'Emotional deprivation': 'Emotioneel tekort',
  'Social isolation_Alienation': 'Sociale isolatie / Vervreemding',
  'Practical incompetence_Dependence': 'Afhankelijkheid / Incompetentie',
  'Vulnerability to harm_illness': 'Kwetsbaarheid voor ziekte en gevaar',
  'Enmeshment': 'Kluwen / Onderontwikkeld zelf',
  'Failure to achieve': 'Mislukken',
  'Insufficient self-control_self-discipline': 'Onvoldoende zelfcontrole',
  'Entitlement_Superiority': 'Veeleisendheid / Grandiositeit',
  'Subjugation': 'Onderwerping',
  'Self-sacrifice': 'Zelfopoffering',
  'Admiration_Recognition-seeking': 'Goedkeuring / Erkenning zoeken',
  'Pessimism_Worry': 'Negativisme / Pessimisme',
  'Emotional inhibition': 'Emotionele geremdheid',
  'Unrelenting Standards': 'Meedogenloze normen',
  'Self-punitiveness': 'Bestraffendheid'
};

const smiModesMap = {
  'kk': 'Kwetsbare kind',
  'rk': 'Razende kind',
  'ik': 'Impulsieve kind',
  'ok': 'Ongedisciplineerde kind',
  'bk': 'Boze kind',
  'wi': 'Willoze inschikkelijke',
  'ob': 'Onthechte beschermer',
  'oz': 'Onthechte zelfsusser',
  'wk': 'Wantrouwende overcontroleerder',
  'zh': 'Zelfverheerlijker',
  'pa': 'Pest en aanval',
  'so': 'Straffende ouder',
  'vo': 'Veeleisende ouder',
  'gv': 'Gezonde volwassene'
};


const needDescriptions = {
  'Veilige hechting': "Dit is de meest fundamentele behoefte. Het draait om veiligheid, stabiliteit, verzorging en onvoorwaardelijke acceptatie. Een kind moet voelen dat het gewenst is en dat de opvoeders een veilige thuishaven bieden waarop altijd kan worden teruggevallen, zonder angst voor verlating of afwijzing.",
  'Autonomie': "Dit is de behoefte om je als een onafhankelijk, capabel individu te ontwikkelen. Het gaat om de ruimte om zelf de wereld te ontdekken, fouten te mogen maken en vertrouwen te krijgen in je eigen kunnen. Als deze behoefte in de knel komt, voelt iemand zich als volwassene vaak extreem afhankelijk of kwetsbaar.",
  'Vrije expressie': "Ieder mens heeft de behoefte om zich vrij uit te drukken. Het kind moet ervaren dat de eigen gevoelens (ook boosheid of verdriet) en behoeften geldig zijn, en niet minder belangrijk zijn dan die van anderen. Wanneer deze behoefte wordt onderdrukt, ontstaat vaak zelfopoffering of onderwerping.",
  'Spontaniteit en spel': "Er moet ruimte zijn voor plezier, creativiteit en onbezorgdheid. Niet alles hoeft nuttig, perfect of efficiënt te zijn. Deze behoefte beschermt ons tegen meedogenloze normen, overmatige prestatiedruk en het gevoel dat het leven uitsluitend uit plichten bestaat.",
  'Realistische grenzen': "Naast vrijheid heeft een kind kaders nodig om te leren omgaan met frustratie. Dit betekent leren dat je niet altijd je zin kunt krijgen, dat je rekening moet houden met anderen, en dat je discipline moet opbrengen voor taken die minder leuk zijn. Het ontbreken hiervan leidt vaak tot onvoldoende zelfcontrole of veeleisendheid richting anderen."
};

const needCards = [
  { src: imgB1, title: 'Veilige hechting', type: 'need', description: needDescriptions['Veilige hechting'], color: '#60a5fa' },
  { src: imgB2, title: 'Autonomie', type: 'need', description: needDescriptions['Autonomie'], color: '#34d399' },
  { src: imgB3, title: 'Vrije expressie', type: 'need', description: needDescriptions['Vrije expressie'], color: '#facc15' },
  { src: imgB4, title: 'Spontaniteit en spel', type: 'need', description: needDescriptions['Spontaniteit en spel'], color: '#f87171' },
  { src: imgB5, title: 'Realistische grenzen', type: 'need', description: needDescriptions['Realistische grenzen'], color: '#fb923c' },
];

const schemaGroups = [
  { group: 'Verlating & Afwijzing', titles: ['Verlating / Instabiliteit', 'Wantrouwen / Misbruik', 'Emotioneel tekort', 'Tekortschieten / Schaamte', 'Sociale isolatie / Vervreemding'] },
  { group: 'Verzwakte Autonomie', titles: ['Afhankelijkheid / Incompetentie', 'Kwetsbaarheid voor ziekte en gevaar', 'Kluwen / Onderontwikkeld zelf', 'Mislukken'] },
  { group: 'Verzwakte Grenzen', titles: ['Onvoldoende zelfcontrole', 'Veeleisendheid / Grandiositeit'] },
  { group: 'Gerichtheid op Anderen', titles: ['Onderwerping', 'Zelfopoffering', 'Goedkeuring / Erkenning zoeken'] },
  { group: 'Overmatige Waakzaamheid', titles: ['Emotionele geremdheid', 'Meedogenloze normen', 'Negativisme / Pessimisme', 'Bestraffendheid'] }
];

const schemaSortOrder = schemaGroups.flatMap(g => g.titles);

const schemaCards = Object.keys(schemaImages).map(path => {
  const filename = path.split('/').pop().replace('.png', '');
  const title = ysqSchemaNamesMap[filename] || filename.replace(/_/g, ' ');
  return { id: filename, src: schemaImages[path], title, type: 'schema', description: schemaDescriptions[title], style: { transform: title === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(1)' } };
}).sort((a, b) => {
  const indexA = schemaSortOrder.indexOf(a.title);
  const indexB = schemaSortOrder.indexOf(b.title);
  if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
  if (indexA === -1) return 1;
  if (indexB === -1) return -1;
  return indexA - indexB;
});

const modeGroups = [
  { group: 'Kindmodi', titles: ['Kwetsbare kind', 'Boze kind', 'Razende kind', 'Impulsieve kind', 'Ongedisciplineerde kind'] },
  { group: 'Coping: Overgave', titles: ['Willoze inschikkelijke'] },
  { group: 'Coping: Vermijding', titles: ['Onthechte beschermer', 'Onthechte zelfsusser'] },
  { group: 'Coping: Overcompensatie', titles: ['Wantrouwende overcontroleerder', 'Zelfverheerlijker', 'Pest en aanval'] },
  { group: 'Oudermodi', titles: ['Straffende ouder', 'Veeleisende ouder'] },
  { group: 'Gezonde Volwassene', titles: ['Gezonde volwassene'] }
];

const modeSortOrder = modeGroups.flatMap(g => g.titles);

const modeCards = Object.keys(modeImages).map(path => {
  const filename = path.split('/').pop().replace('.png', '');
  const title = smiModesMap[filename] || filename;
  return { id: filename, src: modeImages[path], title, type: 'mode', description: schemaDescriptions[title], style: { transform: 'scale(1.1)' } };
}).sort((a, b) => {
  const indexA = modeSortOrder.indexOf(a.title);
  const indexB = modeSortOrder.indexOf(b.title);
  if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
  if (indexA === -1) return 1;
  if (indexB === -1) return -1;
  return indexA - indexB;
});

const healthyAdultCard = { id: 'gv', src: imgM4, title: 'Gezonde volwassene', type: 'mode', description: schemaDescriptions['Gezonde volwassene'], style: { transform: 'scale(1.1)' } };

const formatCardTitle = (title) => {
  if (!title) return title;
  const words = title.trim().split(/\s+/);
  if (words.length === 2) {
    return <>{words[0]}<br />{words[1]}</>;
  }
  return title;
};

const CardSlot = ({ label, card, onSelect, onRemove, isStacked = false }) => {
  const [flipped, setFlipped] = useState(false);
  const cardColor = card ? (card.color || getCardColor(card.type, card.id)) : 'rgba(0,0,0,0.15)';
  
  return (
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
    {label && <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--text-main)', textAlign: 'center' }}>{label}</div>}
    {card ? (
      <div style={{ position: 'relative', display: 'inline-block' }}>
        {isStacked && (
          <>
            <div style={{ position: 'absolute', top: '2px', left: '-12px', width: '190px', height: '270px', background: '#f8fafc', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '12px', zIndex: 0, transform: 'rotate(-6deg)', boxShadow: '0 4px 8px rgba(0,0,0,0.08)' }}></div>
            <div style={{ position: 'absolute', top: '6px', left: '10px', width: '190px', height: '270px', background: '#f1f5f9', border: '1px solid rgba(0,0,0,0.15)', borderRadius: '12px', zIndex: 0, transform: 'rotate(5deg)', boxShadow: '0 4px 8px rgba(0,0,0,0.08)' }}></div>
          </>
        )}
        <div className="card-scene" style={{ width: '190px', height: '270px', margin: 0, position: 'relative' }}>
          <div className={`card-flip-container ${flipped ? 'flipped' : ''}`}>
            <div className="card-face-front schema-img playing-card" onClick={() => setFlipped(!flipped)} style={{ padding: '12px', boxSizing: 'border-box', cursor: 'pointer', display: 'flex', flexDirection: 'column' }}>
              <CardInnerBorder color={cardColor} />
              <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                <img src={card.src} alt={card.title} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
              </div>
              <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', margin: '8px 0 6px 0', lineHeight: '1.2' }}>{formatCardTitle(card.title)}</div>
            </div>
            
            <div className="card-face-back" onClick={() => setFlipped(!flipped)} style={{ display: 'flex', flexDirection: 'column', cursor: 'pointer', padding: '12px' }}>
              <CardInnerBorder color={cardColor} />
              <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <h4 style={{ fontSize: '0.75rem', marginTop: '0.4rem', marginBottom: '0.2rem', lineHeight: '1.2', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{card.title}</h4>
                <p style={{ fontSize: '0.6rem', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 10, WebkitBoxOrient: 'vertical', margin: 0 }}>{card.description || 'Geen theorie beschikbaar.'}</p>
              </div>
            </div>
          </div>
        </div>
        {onRemove && (
           <button onClick={onRemove} className="no-print btn-remove-card" style={{ position: 'absolute', top: '-10px', right: '-10px', background: '#ef4444', color: 'white', border: 'none', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', zIndex: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', lineHeight: 1, padding: 0, boxShadow: '0 2px 5px rgba(0,0,0,0.2)' }}>&times;</button>
        )}
      </div>
    ) : (
      <div 
        onClick={onSelect} 
        className="glass-panel no-print" 
        style={{ width: '190px', height: '270px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', border: '2px dashed var(--primary)', borderRadius: '12px', cursor: 'pointer', background: 'rgba(20, 184, 166, 0.05)', transition: 'all 0.2s' }}
      >
        <span style={{ color: 'var(--primary)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>+</span>
        <span style={{ color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 'bold' }}>Kies Kaart</span>
      </div>
    )}
  </div>
)};

export default function Tafelopstelling({ onBack, completedTests, embedded = false }) {
  const [situationText, setSituationText] = useState('');
  const [selectedMode, setSelectedMode] = useState(null);
  const [selectedSchema, setSelectedSchema] = useState(null);
  const [selectedNeed, setSelectedNeed] = useState(null);
  const [gvNotes, setGvNotes] = useState('');
  const [analysisText, setAnalysisText] = useState('');
  const [showCardPicker, setShowCardPicker] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isGeneratingAnalysis, setIsGeneratingAnalysis] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [flippedCards, setFlippedCards] = useState({});

  const handleFlip = (key, e) => {
    if (e) e.stopPropagation();
    setFlippedCards(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const calculateTopScores = (answers, scoringData, mapDict) => {
    if (!answers) return [];
    return Object.entries(scoringData).map(([key, items]) => {
      let sum = 0; let answeredCount = 0;
      items.forEach(qId => {
        if (answers[qId]) {
          sum += answers[qId];
          answeredCount++;
        }
      });
      const mean = answeredCount > 0 ? sum / answeredCount : 0;
      const name = mapDict[key] || key;
      return { name, mean };
    }).sort((a, b) => b.mean - a.mean).slice(0, 5).map(s => s.name);
  };

  const predictCards = async () => {
    if (!situationText) {
      alert("Beschrijf eerst kort de situatie/trigger in het tekstvak.");
      return;
    }

    setIsPredicting(true);
    try {
      const topSchemas = completedTests?.ysq ? calculateTopScores(completedTests.ysq, ysqScoring, ysqSchemaNamesMap).join(', ') : 'Onbekend';
      const topModes = completedTests?.smi ? calculateTopScores(completedTests.smi, smiScoring, smiModesMap).join(', ') : 'Onbekend';

      const apiKey = localStorage.getItem('gemini_api_key') || DEFAULT_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

      const availableModes = modeCards.map(c => c.title).join(', ');
      const availableSchemas = schemaCards.map(c => c.title).join(', ');
      const availableNeeds = needCards.map(c => c.title).join(', ');

      const prompt = `Je bent een expert in schematherapie. De cliënt heeft de volgende situatie/trigger meegemaakt:
"${situationText}"

Profiel van deze cliënt (hoogst scorende schema's en modi uit hun test):
Top Schema's: ${topSchemas}
Top Modi: ${topModes}

Kies de best passende Modus, Schema en Onvervulde Basisbehoefte voor deze situatie, bij voorkeur rekening houdend met hun profiel (kies de schema's/modi uit hun profiel als ze passen bij de situatie, maar wijk af als de situatie overduidelijk om een andere kaart vraagt).
Je MOET kiezen uit deze exacte lijsten:
Beschikbare Modi: ${availableModes}
Beschikbare Schema's: ${availableSchemas}
Beschikbare Behoeften: ${availableNeeds}

Geef je antwoord ALLEEN als een geldig JSON object in dit exacte formaat, zonder extra tekst of markdown eromheen:
{
  "mode": "exacte titel uit de lijst",
  "schema": "exacte titel uit de lijst",
  "need": "exacte titel uit de lijst"
}`;

      const result = await model.generateContent(prompt);
      let text = await result.response.text();
      text = text.trim();
      if (text.startsWith('\`\`\`json')) {
        text = text.replace(/^\`\`\`json/, '').replace(/\`\`\`$/, '').trim();
      } else if (text.startsWith('\`\`\`')) {
        text = text.replace(/^\`\`\`/, '').replace(/\`\`\`$/, '').trim();
      }
      
      const parsed = JSON.parse(text);
      
      const foundMode = modeCards.find(c => c.title === parsed.mode) || modeCards[0];
      const foundSchema = schemaCards.find(c => c.title === parsed.schema) || schemaCards[0];
      const foundNeed = needCards.find(c => c.title === parsed.need) || needCards[0];

      setSelectedMode(foundMode);
      setSelectedSchema(foundSchema);
      setSelectedNeed(foundNeed);

      // Auto-generate analyses using the newly found cards
      generateGvAdvice(foundMode, foundSchema, foundNeed);
      generateDeepAnalysis(foundMode, foundSchema, foundNeed);

    } catch (err) {
      console.error(err);
      alert("Fout bij het voorspellen van de kaarten: " + (err.message || 'Onbekende fout'));
    } finally {
      setIsPredicting(false);
    }
  };

  const DEFAULT_KEY = ['x4lUf2byenEbjpA', 'vKjFVKEc6MmRk4LOh5r', 'AQ.Ab8RN6J2MKKxlGjl'].reverse().join('');

  const generateGvAdvice = async (overrideMode = null, overrideSchema = null, overrideNeed = null) => {
    const m = overrideMode || selectedMode;
    const s = overrideSchema || selectedSchema;
    const n = overrideNeed || selectedNeed;

    if (!situationText || !m || !s || !n) {
      alert("Vul eerst de situatie en de drie kaarten in (Modus, Schema, Basisbehoefte) voordat de AI advies kan geven.");
      return;
    }
    
    setIsGenerating(true);
    try {
      const apiKey = localStorage.getItem('gemini_api_key') || DEFAULT_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });
      
      const prompt = `Je bent een expert in schematherapie. Een cliënt heeft een tafelopstelling gemaakt:
Situatie: "${situationText}"
Zijn/haar reactie (Modus): ${m.title}
Geraakte Schema: ${s.title}
Onvervulde Basisbehoefte: ${n.title}

Schrijf vanuit de rol van de 'Gezonde Volwassene' precies op wat deze gezonde kant nu tegen het gekwetste kind of de strenge ouder zou moeten zeggen. Wees validerend voor de pijn (schema/behoefte), maar grensstellend voor destructief gedrag (modus). Schrijf in de ik-vorm of jij-vorm richting het kind/de modus. Maximaal 2 of 3 korte, krachtige zinnen. Geen uitleg eromheen, alleen de letterlijke tekst die de GV zegt.`;

      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      setGvNotes(text.trim());
    } catch (err) {
      console.error(err);
      alert("Fout bij het genereren: " + (err.message || 'Onbekende fout'));
    } finally {
      setIsGenerating(false);
    }
  };

  const generateDeepAnalysis = async (overrideMode = null, overrideSchema = null, overrideNeed = null) => {
    const m = overrideMode || selectedMode;
    const s = overrideSchema || selectedSchema;
    const n = overrideNeed || selectedNeed;

    if (!situationText || !m || !s || !n) {
      alert("Vul eerst de situatie en de drie kaarten in (Modus, Schema, Basisbehoefte) voordat de AI een analyse kan maken.");
      return;
    }
    
    setIsGeneratingAnalysis(true);
    try {
      const apiKey = localStorage.getItem('gemini_api_key') || DEFAULT_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });
      
      const prompt = `Je bent een expert in schematherapie. Een cliënt heeft een tafelopstelling gemaakt:
Situatie: "${situationText}"
Zijn/haar reactie (Modus): ${m.title}
Geraakte Schema: ${s.title}
Onvervulde Basisbehoefte: ${n.title}

Geef een heldere, compassievolle en inzichtgevende analyse van hoe deze keten werkt. Leg uit waarom deze specifieke trigger, via deze onvervulde behoefte en dit geraakte schema, leidt tot deze specifieke modus. Geef 2 concrete tips voor de cliënt om hier in de toekomst bewuster mee om te gaan. Richt je direct tot de cliënt op een steunende toon (gebruik 'je'). Gebruik maximaal 3 alinea's en maak het concreet. BELANGRIJK: Gebruik uitsluitend platte tekst. Gebruik GEEN markdown (zoals ** of *) om woorden te accentueren.`;

      const result = await model.generateContent(prompt);
      const text = await result.response.text();
      setAnalysisText(text.trim());
    } catch (err) {
      console.error(err);
      alert("Fout bij het genereren: " + (err.message || 'Onbekende fout'));
    } finally {
      setIsGeneratingAnalysis(false);
    }
  };

  const handleSelectCard = (card) => {
    if (showCardPicker === 'mode') setSelectedMode(card);
    if (showCardPicker === 'schema') setSelectedSchema(card);
    if (showCardPicker === 'need') setSelectedNeed(card);
    setShowCardPicker(null);
  };

  const handlePrintTafel = () => {
    document.body.classList.add('printing-tafel');
    
    const afterPrint = () => {
      document.body.classList.remove('printing-tafel');
      window.removeEventListener('afterprint', afterPrint);
    };
    window.addEventListener('afterprint', afterPrint);
    
    window.print();
    
    setTimeout(() => {
      document.body.classList.remove('printing-tafel');
      window.removeEventListener('afterprint', afterPrint);
    }, 1000);
  };

  const clearTable = () => {
    if (window.confirm('Weet je zeker dat je de tafel wilt leegmaken?')) {
      setSituationText('');
      setSelectedMode(null);
      setSelectedSchema(null);
      setSelectedNeed(null);
      setGvNotes('');
      setAnalysisText('');
    }
  };

  return (
    <div className={embedded ? "" : "view-container"}>
      {!embedded && (
        <>
          <div className="header no-print" style={{ marginBottom: '2rem' }}>
            <h1 className="text-gradient">Digitale Tafelopstelling</h1>
            <p>Visualiseer je psychologische reactiepatroon op een specifieke trigger.</p>
          </div>
          
          <div className="no-print" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
            <button className="btn btn-outline" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <ArrowLeftIcon size={18} /> Terug naar Start
            </button>
            <button className="btn btn-outline" onClick={handlePrintTafel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              PDF / Printen
            </button>
            <button className="btn btn-outline" onClick={clearTable} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Tafel Leegmaken
            </button>
          </div>
        </>
      )}

      <div className="no-print" style={{ marginBottom: '2rem', textAlign: 'center' }}>
        <p style={{ color: 'var(--text-main)', maxWidth: '700px', margin: '0 auto 1.5rem auto', lineHeight: '1.6', fontSize: '1.05rem' }}>
          De digitale tafelopstelling helpt je om je psychologische reactiepatroon op een specifieke trigger visueel in kaart te brengen.
        </p>

        <div style={{ textAlign: 'left', maxWidth: '750px', margin: '0 auto 2rem auto', background: 'rgba(20, 184, 166, 0.05)', padding: '3rem 5rem', borderRadius: '12px', border: '1px solid rgba(20, 184, 166, 0.2)' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px', marginRight: '0.8rem' }}><StepBadge number="1" /></div>
              <div><strong>Beschrijf de situatie:</strong> Wat was de trigger? Wat gebeurde er precies? Beschrijf dit altijd als eerste, want dit vormt het vertrekpunt van je opstelling.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px', marginRight: '0.8rem' }}><StepBadge number="2" /></div>
              <div><strong>Leg de kaarten op tafel:</strong> Welke kaarten horen bij deze situatie? Wat deed je precies (Mijn Reactie / Modus)? Welke oude overtuiging werd geraakt (Geraakt Schema)? En welke fundamentele behoefte kwam in de knel (Onvervulde Behoefte)? Je kunt deze kaarten handmatig selecteren, óf – en dat is wel zo makkelijk – <strong>automatisch laten voorspellen</strong> door de app op basis van jouw persoonlijke testresultaten.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px', marginRight: '0.8rem' }}><StepBadge number="3" /></div>
              <div><strong>Analyseer:</strong> Bekijk een uitgebreide psychologische analyse van jouw specifieke keten. Hierin lees je precies hoe de kaarten met elkaar samenhangen, plus direct toepasbaar advies voor je Gezonde Volwassene.<br/><br/><em>Goed om te weten:</em> Als je in de vorige stap hebt gekozen voor de knop 'Voorspel kaarten', wordt deze complete analyse direct al voor je klaargezet en hoef je in stap 3 dus niets meer zelf te doen!</div>
            </div>
          </div>
        </div>

        {embedded && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="btn btn-outline" onClick={handlePrintTafel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              PDF / Printen
            </button>
            <button className="btn btn-outline" onClick={clearTable} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Tafel Leegmaken
            </button>
          </div>
        )}
      </div>

      <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', maxWidth: '1000px', margin: '0 auto', background: 'var(--card-bg)' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto' }}>
          <div style={{ marginBottom: '3rem' }}>
            <h3 className="text-gradient" style={{ marginBottom: '1.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><StepBadge number="1" size={28} /> Beschrijf de situatie</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
              <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                <textarea 
                  className="no-print"
                  placeholder="Beschrijf hier kort de situatie (bijv. 'Tijdens een overleg werd mijn idee genegeerd...')" 
                  value={situationText}
                  onChange={e => setSituationText(e.target.value)}
                  style={{ 
                    width: '100%', flex: 1, minHeight: '200px', padding: '1rem', 
                    borderRadius: '12px', border: '1px solid var(--border-color)', 
                    background: 'rgba(0,0,0,0.02)', color: 'var(--text-main)', 
                    fontFamily: 'inherit', fontSize: '1rem', resize: 'vertical',
                    lineHeight: '1.6', boxSizing: 'border-box'
                  }}
                />
                <div className="tafel-print-only" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1rem', color: 'var(--text-main)', width: '100%', textAlign: 'left', background: 'rgba(0,0,0,0.02)', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}>
                  {situationText || "Geen situatie beschreven."}
                </div>
              </div>
              
              <div>
                <h3 className="text-gradient" style={{ marginBottom: '1.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><StepBadge number="2" size={28} /> Leg de kaarten op tafel</h3>
                <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}>
                  <h4 className="text-gradient" style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Automatisch voorspellen</h4>
                  <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.6', maxWidth: '650px' }}>
                  Laat de kaarten automatisch op tafel leggen op basis van de beschreven situatie. Jouw persoonlijke scores (schema's en modi) vormen hierbij de basis voor een passend voorstel.
                </p>

                <button 
                  className="btn btn-gradient" 
                  onClick={predictCards} 
                  disabled={isPredicting || !situationText}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', padding: '1rem 2rem', width: '100%', justifyContent: 'center' }}
                  title="Voorspel de kaarten op basis van je situatie en testresultaten"
                >
                  {isPredicting ? 'Bezig...' : <><WandIcon size={24} color="currentColor" /> Voorspel kaarten</>}
                </button>
                </div>
              </div>
            </div>
          </div>

          <h4 className="text-gradient no-print" style={{ marginTop: '3rem', marginBottom: '1rem', textAlign: 'center' }}>Of: Leg zelf handmatig de kaarten op tafel</h4>
          <p className="no-print" style={{ color: 'var(--text-main)', textAlign: 'center', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 2rem auto' }}>
            Klik op een leeg vak om zelf een kaart te kiezen. 
            <strong> Tip:</strong> je kunt altijd op een gekozen kaart klikken of tikken om hem om te draaien en de theorie te lezen!
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
            
            {/* Top Row: De 3 Kaarten */}
            <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', gap: '0.5rem', width: '100%', minWidth: 'max-content', margin: '0 auto', padding: '2rem 1rem', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)', alignItems: 'center' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '190px' }}>
                <CardSlot label="Mijn Reactie (Modus)" card={selectedMode} onSelect={() => setShowCardPicker('mode')} onRemove={() => setSelectedMode(null)} />
              </div>
              <div className="no-print" style={{ height: '3px', minWidth: '20px', width: '40px', background: 'var(--primary)', opacity: 0.3, margin: '0 5px', flexShrink: 1 }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '190px' }}>
                <CardSlot label="Geraakt Schema" card={selectedSchema} onSelect={() => setShowCardPicker('schema')} onRemove={() => setSelectedSchema(null)} />
              </div>
              <div className="no-print" style={{ height: '3px', minWidth: '20px', width: '40px', background: 'var(--primary)', opacity: 0.3, margin: '0 5px', flexShrink: 1 }}></div>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '190px' }}>
                <CardSlot label="Onvervulde Behoefte" card={selectedNeed} onSelect={() => setShowCardPicker('need')} onRemove={() => setSelectedNeed(null)} />
              </div>
            </div>

            {/* Funnel Direction Arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}>
              <div style={{ width: '3px', height: '35px', background: 'linear-gradient(to bottom, var(--primary), #3b82f6)', opacity: 0.5, marginBottom: '-2px' }}></div>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                background: 'linear-gradient(135deg, #14b8a6, #3b82f6)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', boxShadow: '0 4px 10px rgba(20,184,166,0.3)',
                position: 'relative', zIndex: 1
              }}>
                <ArrowDownIcon size={24} />
              </div>
            </div>

            {/* Bottom Row: Gezonde Volwassene */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '600px', padding: '2rem', background: 'var(--card-bg)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
              <CardSlot card={healthyAdultCard} isStacked={true} />
              
              <div style={{ width: '100%', marginTop: '1.5rem', display: 'flex', flexDirection: 'column' }}>
                
                <p style={{ fontSize: '1rem', color: 'var(--text-main)', textAlign: 'center', marginBottom: '1rem', lineHeight: '1.6' }}>
                  De Gezonde Volwassene stelt grenzen aan disfunctionele reacties en biedt zorg voor onvervulde behoeften. Wat zou deze in deze situatie zeggen of doen?
                </p>
                <textarea 
                  className="no-print"
                  placeholder="" 
                  value={gvNotes}
                  onChange={e => setGvNotes(e.target.value)}
                  style={{ 
                    width: '100%', flex: 1, minHeight: '180px', padding: '1rem', 
                    borderRadius: '12px', border: '1px solid var(--border-color)', 
                    background: 'var(--bg-color)', color: 'var(--text-main)', 
                    fontFamily: 'inherit', fontSize: '1rem', resize: 'none',
                    lineHeight: '1.6',
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                  }}
                />
                <div className="tafel-print-only" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1rem', color: 'var(--text-main)', width: '100%', minHeight: '180px', padding: '1rem', borderRadius: '12px', border: '1px solid var(--border-color)', background: 'var(--bg-color)' }}>
                  {gvNotes}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>

      {/* Stap 3: Analyse */}
      <div className="no-print glass-panel" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', maxWidth: '1000px', margin: '3rem auto 0 auto', background: 'var(--card-bg)' }}>
        <h3 className="text-gradient" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <StepBadge number="3" size={28} /> AI Analyse
        </h3>
        <p style={{ color: 'var(--text-main)', textAlign: 'center', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
          Laat de AI je opstelling analyseren op basis van je gekozen kaarten en testresultaten. 
          Kies voor een concrete suggestie voor je <strong>Gezonde Volwassene</strong> (wat zou je kunnen zeggen of doen?), 
          of genereer een uitgebreide <strong>beschrijvende analyse</strong> van het hele patroon.
        </p>
        
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem' }}>
          <button onClick={generateGvAdvice} disabled={isGenerating} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '1rem', background: 'var(--bg-color)' }}>
            {isGenerating ? 'Genereren...' : <><CpuChipIcon size={20} useGradient={true} /> Genereer een gezonde reactie</>}
          </button>
          
          <button className="btn btn-gradient" onClick={generateDeepAnalysis} disabled={isGeneratingAnalysis} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '1rem' }}>
            {isGeneratingAnalysis ? 'Bezig...' : <><WandIcon size={20} color="currentColor" /> Een beschrijvende analyse</>}
          </button>
        </div>
      </div>

      {/* Diepgaande Analyse Weergave (Print/View) */}
      {(analysisText || isGeneratingAnalysis) && (
        <div className="glass-panel" style={{ padding: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', maxWidth: '1000px', margin: '2rem auto 0 auto', background: 'var(--card-bg)' }}>
          <h3 className="text-gradient" style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            Uitgebreide Psychologische Analyse
          </h3>
          {isGeneratingAnalysis ? (
            <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--text-main)' }}>
              De AI analyseert momenteel jouw opstelling...
            </div>
          ) : (
            <>
              <textarea 
                className="no-print"
                value={analysisText}
                onChange={e => {
                  e.target.style.height = 'auto';
                  e.target.style.height = e.target.scrollHeight + 'px';
                  setAnalysisText(e.target.value);
                }}
                ref={(el) => {
                  if (el) {
                    el.style.height = 'auto';
                    el.style.height = el.scrollHeight + 'px';
                  }
                }}
                style={{ 
                  width: '100%', minHeight: '400px', padding: '1.5rem', 
                  borderRadius: '12px', border: '1px solid var(--border-color)', 
                  background: 'var(--bg-color)', color: 'var(--text-main)', 
                  fontFamily: 'inherit', fontSize: '1rem', resize: 'none', overflow: 'hidden',
                  lineHeight: '1.6',
                  boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
                }}
              />
              <div className="tafel-print-only" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1rem', color: 'var(--text-main)' }}>
                {analysisText}
              </div>
            </>
          )}
        </div>
      )}

      {showCardPicker && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999, padding: '4rem 1rem', overflowY: 'auto' }} onClick={() => setShowCardPicker(null)}>
          <div className="glass-panel" style={{ background: 'var(--bg-color)', width: '100%', maxWidth: '900px', margin: '0 auto', padding: '3rem', borderRadius: '16px', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.3)' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowCardPicker(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)' }}>&times;</button>
            <h2 className="text-gradient" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              {showCardPicker === 'mode' ? 'Kies een Modus' : showCardPicker === 'schema' ? 'Kies een Schema' : 'Kies een Basisbehoefte'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {showCardPicker === 'need' ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                  {needCards.map((card, idx) => (
                    <div key={idx} onClick={() => handleSelectCard(card)} className="card-scene picker-card" style={{ width: '160px', height: '228px', margin: 0, cursor: 'pointer' }}>
                      <div className="card-flip-container" style={{ transition: 'transform 0.2s' }}>
                        <div className="card-face-front schema-img playing-card" style={{ padding: '8px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                          <CardInnerBorder color={card.color} />
                          <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                            <img src={card.src} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
                          </div>
                          <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', margin: '6px 0', lineHeight: '1.2', zIndex: 1 }}>{formatCardTitle(card.title)}</div>
                        </div>
                        <div className="card-face-back" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '8px' }}>
                          <CardInnerBorder color={card.color} />
                          <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                            <h4 style={{ fontSize: '0.75rem', marginTop: '0.4rem', marginBottom: '0.2rem', lineHeight: '1.2', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{card.title}</h4>
                            <p style={{ fontSize: '0.6rem', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 10, WebkitBoxOrient: 'vertical', margin: 0 }}>{card.description || 'Geen theorie.'}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                (showCardPicker === 'schema' ? schemaGroups : modeGroups).map((group, groupIdx) => {
                  const cards = showCardPicker === 'schema' ? schemaCards : modeCards;
                  const groupCards = group.titles.map(title => cards.find(c => c.title === title)).filter(Boolean);
                  if (groupCards.length === 0) return null;
                  
                  const firstCard = groupCards[0];
                  const groupColor = firstCard ? getCardColor(firstCard.type, firstCard.id) : 'var(--text-main)';
                  
                  return (
                    <div key={groupIdx} style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ color: groupColor, borderBottom: `2px solid ${groupColor}40`, paddingBottom: '0.5rem', marginBottom: '1rem', textAlign: 'left' }}>{group.group}</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'flex-start' }}>
                        {groupCards.map((card, idx) => {
                          const cardColor = getCardColor(card.type, card.id);
                          return (
                          <div key={idx} onClick={() => handleSelectCard(card)} className="card-scene picker-card" style={{ width: '160px', height: '228px', margin: 0, cursor: 'pointer' }}>
                            <div className="card-flip-container" style={{ transition: 'transform 0.2s' }}>
                              <div className="card-face-front schema-img playing-card" style={{ padding: '8px', boxSizing: 'border-box', display: 'flex', flexDirection: 'column' }}>
                                <CardInnerBorder color={cardColor} />
                                <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
                                  <img src={card.src} style={{ width: '100%', height: '100%', objectFit: 'contain', ...card.style }} />
                                </div>
                                <div style={{ textAlign: 'center', fontSize: '0.75rem', fontWeight: 'bold', margin: '6px 0', lineHeight: '1.2', zIndex: 1 }}>{formatCardTitle(card.title)}</div>
                              </div>
                              <div className="card-face-back" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between', padding: '8px' }}>
                                <CardInnerBorder color={cardColor} />
                                <div style={{ flex: 1, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                                  <h4 style={{ fontSize: '0.75rem', marginTop: '0.4rem', marginBottom: '0.2rem', lineHeight: '1.2', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>{card.title}</h4>
                                  <p style={{ fontSize: '0.6rem', lineHeight: '1.3', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 10, WebkitBoxOrient: 'vertical', margin: 0 }}>{card.description || 'Geen theorie.'}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        )})}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
