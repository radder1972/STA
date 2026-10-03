import React, { useState } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArrowLeftIcon, CpuChipIcon, AlertTriangleIcon, CheckIcon, WandIcon, ArrowDownIcon, PlayingCardsIcon, CardsIcon, SparklesIcon } from './Icons';
import { Printer } from 'lucide-react';
import TafelNavbar from './TafelNavbar';
import { schemaImages, modeImages } from '../utils/images';
import ysqScoring from '../data/ysq-scoring.json';
import smiScoring from '../data/smi-scoring.json';
import { schemaDescriptions } from '../data/descriptions';
import { getCardColor, CardInnerBorder } from '../utils/colors';
import SchemaCard from './SchemaCard';

import imgB1 from '../assets/images/basisbehoeften/1.png';
import imgB2 from '../assets/images/basisbehoeften/2.png';
import imgB3 from '../assets/images/basisbehoeften/3.png';
import imgB4 from '../assets/images/basisbehoeften/4.png';
import imgB5 from '../assets/images/basisbehoeften/5.png';
import imgM4 from '../assets/images/modicategorieen/4.png';


import {
  ysqSchemaNamesMap,
  smiModesMap,
  schemaGroups,
  modeGroups,
  schemaSortOrder,
  modeSortOrder,
  basisbehoeftenData,
  vstBasisbehoeftenData,
  vstSchemaData,
  vstCopingData,
  vstModiData,
  basisbehoeftenToSchemas
} from '../data/cards';

const StepBadge = ({ number, size = 32 }) => (
  <span style={{
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
    width: `${size}px`, height: `${size}px`, borderRadius: '50%',
    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
    color: '#ffffff', fontSize: `${size * 0.55}px`, fontWeight: 'bold',
    marginRight: '12px', flexShrink: 0,
    WebkitTextFillColor: '#ffffff',
    boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)'
  }}>
    {number}
  </span>
);

const needCards = [
  ...basisbehoeftenData,
  ...vstBasisbehoeftenData
].map(card => ({
  ...card,
  type: 'need'
}));

const detailedSchemaCards = Object.keys(schemaImages).map(path => {
  const filename = path.split('/').pop().replace('.png', '');
  const title = ysqSchemaNamesMap[filename] || filename.replace(/_/g, ' ');
  return {
    id: filename,
    src: schemaImages[path],
    title,
    type: 'schema',
    description: schemaDescriptions[title],
    style: { transform: title === 'Kwetsbaarheid voor Ziekte en Gevaar' || title === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(1)' }
  };
});

const schemaCards = [
  ...detailedSchemaCards,
  ...vstSchemaData
].sort((a, b) => {
  const indexA = schemaSortOrder.indexOf(a.title);
  const indexB = schemaSortOrder.indexOf(b.title);
  if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
  if (indexA === -1) return 1;
  if (indexB === -1) return -1;
  return indexA - indexB;
});

const detailedModeCards = Object.keys(modeImages).map(path => {
  const filename = path.split('/').pop().replace('.png', '');
  const title = smiModesMap[filename] || filename;
  return {
    id: filename,
    src: modeImages[path],
    title,
    type: 'mode',
    description: schemaDescriptions[title],
    style: { transform: 'scale(1.1)' }
  };
});

const modeCards = [
  ...detailedModeCards,
  ...vstModiData
].sort((a, b) => {
  const indexA = modeSortOrder.indexOf(a.title);
  const indexB = modeSortOrder.indexOf(b.title);
  if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
  if (indexA === -1) return 1;
  if (indexB === -1) return -1;
  return indexA - indexB;
});

const healthyAdultCard = { id: 'gv', src: imgM4, title: 'Gezonde volwassene', type: 'mode', description: schemaDescriptions['Gezonde volwassene'], style: { transform: 'scale(0.72)' } };

const CardSlot = ({ label, card, onSelect, onRemove, isStacked = false, labelPosition = 'top', slotColor }) => {
  const cardColor = card ? (card.color || getCardColor(card.type, card.id)) : 'rgba(0,0,0,0.15)';
  const activeSlotColor = slotColor || '#9ca3af';
  
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {label && labelPosition === 'top' && (
        <div style={{ fontWeight: 'bold', fontSize: '1rem', marginBottom: '0.8rem', color: 'var(--text-main)', textAlign: 'center' }}>
          {label}
        </div>
      )}
      {card ? (
        <div style={{ position: 'relative', display: 'inline-block', transition: 'transform 0.2s ease' }}>
          {isStacked && (
            <>
              <div style={{ position: 'absolute', top: '2px', left: '-12px', width: '150px', height: '213px', background: 'var(--card-bg)', border: '2px solid rgba(59, 130, 246, 0.4)', borderRadius: '12px', zIndex: 0, transform: 'rotate(-6deg)', boxShadow: '0 6px 15px rgba(0,0,0,0.12)' }}></div>
              <div style={{ position: 'absolute', top: '6px', left: '10px', width: '150px', height: '213px', background: 'var(--bg-color)', border: '2px solid rgba(245, 158, 11, 0.4)', borderRadius: '12px', zIndex: 0, transform: 'rotate(5deg)', boxShadow: '0 6px 15px rgba(0,0,0,0.12)' }}></div>
            </>
          )}
          <SchemaCard 
            id={card.id}
            type={card.type}
            title={card.title}
            description={card.description}
            src={card.src}
            color={cardColor}
            width="150px"
            height="213px"
            imageStyle={card.style}
            flipOnClick={true}
            flipOnHover={true}
            zoomOnClick={false}
          />
          {onRemove && (
             <button onClick={onRemove} className="no-print btn-remove-card" title="Kaart verwijderen van tafel" style={{ position: 'absolute', top: '-10px', right: '-10px', background: 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)', color: 'white', border: '2px solid white', borderRadius: '50%', width: '28px', height: '28px', cursor: 'pointer', zIndex: 20, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 0, boxShadow: '0 4px 12px rgba(239,68,68,0.45)' }}>
               <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                 <line x1="18" y1="6" x2="6" y2="18" />
                 <line x1="6" y1="6" x2="18" y2="18" />
               </svg>
             </button>
          )}
        </div>
      ) : (
        <div 
          onClick={onSelect} 
          className="glass-panel no-print" 
          style={{ 
            width: '150px', 
            height: '213px', 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            border: '2px dashed #9ca3af', 
            borderRadius: '16px', 
            cursor: 'pointer', 
            background: 'rgba(156, 163, 175, 0.04)', 
            transition: 'all 0.25s cubic-bezier(0.4, 0, 0.2, 1)',
            boxShadow: '0 4px 15px rgba(0, 0, 0, 0.04)'
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = 'translateY(-4px)';
            e.currentTarget.style.borderColor = '#6b7280';
            e.currentTarget.style.background = 'rgba(156, 163, 175, 0.12)';
            e.currentTarget.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.08)';
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.borderColor = '#9ca3af';
            e.currentTarget.style.background = 'rgba(156, 163, 175, 0.04)';
            e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.04)';
          }}
        >
          <span style={{ color: '#6b7280', fontSize: '2.5rem', marginBottom: '0.5rem', fontWeight: '300' }}>+</span>
          <span style={{ color: '#4b5563', fontSize: '0.82rem', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Kies Kaart</span>
        </div>
      )}
      {label && labelPosition === 'bottom' && (
        <div style={{ fontWeight: 'bold', fontSize: '1rem', marginTop: '0.8rem', color: 'var(--text-main)', textAlign: 'center' }}>
          {label}
        </div>
      )}
    </div>
  );
};

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
  const [isStackedView, setIsStackedView] = useState(false);

  const getMatchingFeedback = () => {
    if (!selectedSchema || !selectedNeed) return null;

    const schemaTitle = selectedSchema.title;
    const needTitle = selectedNeed.title;

    let matchedNeedTitle = null;
    for (const [nTitle, schemas] of Object.entries(basisbehoeftenToSchemas)) {
      if (schemas.some(s => s.toLowerCase() === schemaTitle.toLowerCase())) {
        matchedNeedTitle = nTitle;
        break;
      }
    }

    const isDirectMatch = matchedNeedTitle && (
      matchedNeedTitle.toLowerCase() === needTitle.toLowerCase() ||
      needTitle.toLowerCase().includes(matchedNeedTitle.toLowerCase()) ||
      matchedNeedTitle.toLowerCase().includes(needTitle.toLowerCase())
    );

    if (isDirectMatch) {
      return {
        isMatch: true,
        title: "Perfecte Inhoudskoppeling",
        schemaTitle,
        needTitle
      };
    } else if (matchedNeedTitle) {
      return {
        isMatch: false,
        title: "Inhouds-Inzicht",
        schemaTitle,
        needTitle,
        matchedNeedTitle
      };
    }
    return null;
  };

  const matchingFeedback = getMatchingFeedback();

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
      const hasProfile = !!(completedTests?.ysq || completedTests?.smi);
      const topSchemas = completedTests?.ysq ? calculateTopScores(completedTests.ysq, ysqScoring, ysqSchemaNamesMap).join(', ') : '';
      const topModes = completedTests?.smi ? calculateTopScores(completedTests.smi, smiScoring, smiModesMap).join(', ') : '';

      const apiKey = localStorage.getItem('gemini_api_key') || DEFAULT_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

      const availableModes = modeCards.map(c => c.title).join(', ');
      const availableSchemas = schemaCards.map(c => c.title).join(', ');
      const availableNeeds = needCards.map(c => c.title).join(', ');

      const prompt = `Je bent een expert in schematherapie. De cliënt heeft de volgende situatie/trigger meegemaakt:
"${situationText}"
${hasProfile ? `
Profiel van deze cliënt (hoogst scorende schema's en modi uit hun test):
Top Schema's: ${topSchemas}
Top Modi: ${topModes}

Kies de best passende Modus, Schema en Onvervulde Basisbehoefte voor deze situatie, bij voorkeur rekening houdend met hun profiel (kies de schema's/modi uit hun profiel als ze passen bij de situatie, maar wijk af als de situatie overduidelijk om een andere kaart vraagt).` : `
Kies de best passende Modus, Schema en Onvervulde Basisbehoefte voor deze specifieke situatie.`}

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
    <div className={embedded ? "" : "view-container"} style={embedded ? {} : { minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      {!embedded && (
        <>
          <TafelNavbar onPrint={handlePrintTafel} onClear={clearTable} />

          <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '950px', margin: '0 auto 3rem auto' }}>
            <h1 className="text-gradient-tafel" style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
              <PlayingCardsIcon size={40} useTafelGradient={true} /> Digitale Tafelopstelling
            </h1>
            <h2 style={{ color: '#0ea5e9', margin: 0, fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.4' }}>
              Breng schema's, modi en behoeften interactief tot leven op tafel
            </h2>
          </div>
        </>
      )}

      <div className="tafel-print-header" style={{ display: 'none', textAlign: 'center', marginBottom: '2rem' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', color: 'black' }}>Tafelopstelling</h1>
        <p style={{ color: '#555', fontSize: '1.2rem' }}>Psychologisch reactiepatroon</p>
      </div>

      <div className="no-print" style={{ marginBottom: '2rem', textAlign: 'center', width: '100%', maxWidth: '950px' }}>
        <p style={{ color: 'var(--text-main)', maxWidth: '700px', margin: '0 auto 1.5rem auto', lineHeight: '1.6', fontSize: '1.05rem' }}>
          De digitale tafelopstelling helpt je om je psychologische reactiepatroon op een specifieke trigger visueel in kaart te brengen.
        </p>

        <div className="glass-panel" style={{ textAlign: 'left', maxWidth: '950px', width: '100%', margin: '0 auto 2rem auto', background: 'rgba(16, 185, 129, 0.04)', padding: '2.5rem 2.5rem', borderRadius: '24px', border: '1px solid rgba(16, 185, 129, 0.25)', boxSizing: 'border-box' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem', color: 'var(--text-main)', lineHeight: '1.6' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px', marginRight: '0.8rem' }}><StepBadge number="1" /></div>
              <div><strong>Beschrijf de situatie:</strong> Wat was de trigger? Wat gebeurde er precies? Beschrijf dit altijd als eerste, want dit vormt het vertrekpunt van je opstelling.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px', marginRight: '0.8rem' }}><StepBadge number="2" /></div>
              <div><strong>Leg de kaarten op tafel:</strong> Welke kaarten horen bij deze situatie? Wat deed je precies (Mijn Reactie / Modus)? Welke oude overtuiging werd geraakt (Geraakt Schema)? En welke fundamentele behoefte kwam in de knel (Onvervulde Behoefte)? Je kunt deze kaarten handmatig selecteren, óf – en dat is wel zo makkelijk – <strong>automatisch laten voorspellen</strong> door de app op basis van de ingevoerde situatie.</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start' }}>
              <div style={{ marginTop: '2px', marginRight: '0.8rem' }}><StepBadge number="3" /></div>
              <div><strong>Analyseer:</strong> Bekijk een uitgebreide psychologische analyse van jouw specifieke keten. Hierin lees je precies hoe de kaarten met elkaar samenhangen, plus direct toepasbaar advies voor je Gezonde Volwassene.<br/><br/><em>Goed om te weten:</em> Als je in de vorige stap hebt gekozen voor de knop 'Voorspel kaarten', wordt deze complete analyse direct al voor je klaargezet en hoef je in stap 3 dus niets meer zelf te doen!</div>
            </div>
          </div>
        </div>

        {embedded && (
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem' }}>
            <button className="btn btn-gradient-tafel" onClick={handlePrintTafel} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Printer size={18} /> Tafel Printen
            </button>
            <button className="btn btn-outline" onClick={clearTable} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              Tafel Leegmaken
            </button>
          </div>
        )}
      </div>

      <div className="glass-panel" style={{ padding: '2.5rem 2.5rem', borderRadius: '24px', maxWidth: '950px', width: '100%', margin: '0 auto', boxSizing: 'border-box' }}>
        
        <div className="inner-box" style={{ margin: 0, width: '100%' }}>
          <div style={{ width: '100%', margin: '0 auto' }}>
            <div style={{ marginBottom: '3rem' }}>
              <h3 className="box-heading text-gradient-tafel" style={{ justifyContent: 'center' }}><StepBadge number="1" size={28} /> Beschrijf de situatie</h3>
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
                <h3 className="text-gradient-tafel" style={{ marginBottom: '1.5rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><StepBadge number="2" size={28} /> Leg de kaarten op tafel</h3>
                <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-color)', padding: '2rem', borderRadius: '12px', border: '1px solid var(--border-color)', boxSizing: 'border-box' }}>
                  <h4 className="text-gradient-tafel" style={{ margin: '0 0 1rem 0', fontSize: '1.1rem' }}>Automatisch voorspellen</h4>
                  <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.5rem', textAlign: 'center', lineHeight: '1.6', maxWidth: '650px' }}>
                    Laat de kaarten automatisch op tafel leggen op basis van de beschreven situatie. De AI kiest op basis van jouw trigger de best passende combinatie van kaarten.
                  </p>

                  <button 
                    className="btn btn-gradient-tafel" 
                    onClick={predictCards} 
                    disabled={isPredicting || !situationText}
                    style={{ display: 'inline-flex', alignItems: 'center', gap: '10px', fontSize: '1.1rem', padding: '1rem 2rem', width: '100%', justifyContent: 'center' }}
                    title="Voorspel de kaarten op basis van de ingevoerde situatie"
                  >
                    {isPredicting ? 'Bezig...' : <><WandIcon size={24} color="currentColor" /> Voorspel kaarten</>}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Dynamic Heading based on placed cards */}
          <h4 className="text-gradient-tafel no-print" style={{ marginTop: '3rem', marginBottom: '0.8rem', textAlign: 'center' }}>
            {(selectedMode || selectedSchema || selectedNeed) ? 'Jouw Kaarten op Tafel' : 'Of: Leg zelf handmatig de kaarten op tafel'}
          </h4>
          <p className="no-print" style={{ color: 'var(--text-main)', textAlign: 'center', marginBottom: '1.5rem', lineHeight: '1.6', maxWidth: '600px', margin: '0 auto 1.5rem auto', fontSize: '0.95rem' }}>
            {(selectedMode || selectedSchema || selectedNeed)
              ? 'Klik op een kaart om deze te wijzigen of te verwijderen, of kies een kaart voor een leeg vak.'
              : 'Klik op een leeg vak om zelf een kaart te kiezen uit de overzichten.'
            }
          </p>

          {/* Pill Container met 3D Flip Tip */}
          <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '1.5rem' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 22px',
                fontSize: '0.92rem',
                fontWeight: '500',
                borderRadius: '9999px',
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(14, 165, 233, 0.08) 100%)',
                color: 'var(--text-main)',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                boxShadow: '0 4px 15px rgba(16, 185, 129, 0.08)',
                textAlign: 'center'
              }}
            >
              <SparklesIcon size={18} color="#10b981" />
              <span><strong>Tip:</strong> beweeg of tik op een gekozen kaart om hem in 3D te laten flippen!</span>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1rem', width: '100%' }}>
            
            {/* Vilt-Tafelmat Speelveld */}
            <div className="tafel-cards-container" style={{ 
              position: 'relative', 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center', 
              width: '100%', 
              margin: '0 auto', 
              padding: '2.5rem 1.5rem 2.5rem 1.5rem', 
              background: 'radial-gradient(ellipse at center, rgba(16, 185, 129, 0.08) 0%, rgba(15, 23, 42, 0.04) 100%)', 
              borderRadius: '28px', 
              border: '1px solid rgba(16, 185, 129, 0.28)', 
              boxShadow: 'inset 0 0 40px rgba(0, 0, 0, 0.04), 0 10px 30px rgba(0,0,0,0.03)',
              boxSizing: 'border-box', 
              overflow: 'visible' 
            }}>

              {/* NORMAL TRIANGLE VIEW */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '2rem', width: '100%', maxWidth: '560px', position: 'relative', zIndex: 2 }}>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CardSlot label="Mijn Reactie (Modus)" card={selectedMode} onSelect={() => setShowCardPicker('mode')} onRemove={() => setSelectedMode(null)} labelPosition="top" />
                </div>

                {/* Horizontale verbinding top */}
                <div className="no-print" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexShrink: 1, minWidth: '30px', marginTop: '1.5rem' }}>
                  <div style={{ height: '3px', width: '100%', minWidth: '30px', background: (selectedMode && selectedSchema) ? 'linear-gradient(to right, #f59e0b, #3b82f6)' : 'var(--border-color)', borderRadius: '2px', opacity: (selectedMode && selectedSchema) ? 0.85 : 0.4 }}></div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <CardSlot label="Geraakt Schema" card={selectedSchema} onSelect={() => setShowCardPicker('schema')} onRemove={() => setSelectedSchema(null)} labelPosition="top" />
                </div>
              </div>

              {/* Subtiele kleine diagonale verbindingslijnen */}
              <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', width: '100%', maxWidth: '280px', height: '20px', margin: '0.5rem 0', position: 'relative', zIndex: 1 }}>
                <div style={{
                  width: '40px',
                  height: '3px',
                  background: (selectedMode && selectedNeed) ? 'linear-gradient(135deg, #f59e0b, #10b981)' : 'var(--border-color)',
                  transform: 'rotate(40deg)',
                  transformOrigin: 'top left',
                  opacity: (selectedMode && selectedNeed) ? 0.75 : 0.4,
                  borderRadius: '2px'
                }} />

                <div style={{
                  width: '40px',
                  height: '3px',
                  background: (selectedSchema && selectedNeed) ? 'linear-gradient(225deg, #3b82f6, #10b981)' : 'var(--border-color)',
                  transform: 'rotate(-40deg)',
                  transformOrigin: 'top right',
                  opacity: (selectedSchema && selectedNeed) ? 0.75 : 0.4,
                  borderRadius: '2px'
                }} />
              </div>

              {/* Onderste punt van de driehoek: Onvervulde Behoefte */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', position: 'relative', zIndex: 2 }}>
                <CardSlot label="Onvervulde Behoefte" card={selectedNeed} onSelect={() => setShowCardPicker('need')} onRemove={() => setSelectedNeed(null)} labelPosition="bottom" />
              </div>

              {/* LIVE KAARTMATCHING FEEDBACK BANNER */}
              {matchingFeedback && (
                <div className="no-print" style={{
                  width: '100%',
                  maxWidth: '620px',
                  marginTop: '1.75rem',
                  padding: '16px 24px',
                  borderRadius: '20px',
                  background: matchingFeedback.isMatch 
                    ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.1) 0%, rgba(5, 150, 105, 0.16) 100%)' 
                    : 'linear-gradient(135deg, rgba(234, 88, 12, 0.08) 0%, rgba(59, 130, 246, 0.08) 100%)',
                  border: matchingFeedback.isMatch 
                    ? '1px solid rgba(16, 185, 129, 0.35)' 
                    : '1px solid rgba(234, 88, 12, 0.3)',
                  boxShadow: matchingFeedback.isMatch 
                    ? '0 8px 25px rgba(16, 185, 129, 0.12)' 
                    : '0 8px 25px rgba(234, 88, 12, 0.1)',
                  transition: 'all 0.3s ease',
                  boxSizing: 'border-box'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px', color: matchingFeedback.isMatch ? '#059669' : '#ea580c', fontWeight: '700', fontSize: '0.98rem', textTransform: 'uppercase', letterSpacing: '0.04em' }}>
                    <SparklesIcon size={20} color={matchingFeedback.isMatch ? '#059669' : '#ea580c'} />
                    <span>{matchingFeedback.title}</span>
                  </div>
                  <p style={{ margin: 0, padding: 0, color: 'var(--text-main)', fontSize: '0.94rem', fontWeight: '400', lineHeight: '1.6', textAlign: 'center' }}>
                    {matchingFeedback.isMatch ? (
                      <>
                        Het schema <strong>'{matchingFeedback.schemaTitle}'</strong> ontstaat rechtstreeks als reactie op een tekort aan de basisbehoefte <strong>'{matchingFeedback.needTitle}'</strong>.
                      </>
                    ) : (
                      <>
                        Het schema <strong>'{matchingFeedback.schemaTitle}'</strong> hoort primair bij het behoeftedomein <strong>'{matchingFeedback.matchedNeedTitle}'</strong>. U onderzoekt nu de wisselwerking met <strong>'{matchingFeedback.needTitle}'</strong>.
                      </>
                    )}
                  </p>
                </div>
              )}

            </div>

            {/* Funnel Direction Arrow */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: '1rem 0' }}>
              <div style={{ width: '3px', height: '35px', background: 'linear-gradient(to bottom, #10b981, #059669)', opacity: 0.6, marginBottom: '-2px' }}></div>
              <div style={{ 
                width: '40px', height: '40px', borderRadius: '50%', 
                background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)', 
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: 'white', boxShadow: '0 4px 10px rgba(16, 185, 129, 0.3)',
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
        <div className="inner-box no-print" style={{ marginTop: '2rem', margin: '2rem 0 0 0' }}>
          <h3 className="box-heading text-gradient-tafel" style={{ justifyContent: 'center' }}>
            <StepBadge number="3" size={28} /> AI Analyse
          </h3>
          <p style={{ color: 'var(--text-main)', textAlign: 'center', marginBottom: '2rem', lineHeight: '1.6', maxWidth: '700px', margin: '0 auto 2rem auto' }}>
            Laat de AI je opstelling analyseren op basis van je gekozen kaarten en situatie. 
            Kies voor een concrete suggestie voor je <strong>Gezonde Volwassene</strong> (wat zou je kunnen zeggen of doen?), 
            of genereer een uitgebreide <strong>beschrijvende analyse</strong> van het hele patroon.
          </p>
          
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '1rem', width: '100%' }}>
            <button onClick={generateGvAdvice} disabled={isGenerating} className="btn btn-outline" style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px 24px', fontSize: '1rem', background: 'var(--bg-color)', border: '1px solid rgba(16, 185, 129, 0.4)', minWidth: '280px', flex: '1 1 280px', maxWidth: '360px' }}>
              {isGenerating ? 'Genereren...' : <><CpuChipIcon size={20} useTafelGradient={true} /> Genereer een gezonde reactie</>}
            </button>
            
            <button className="btn btn-gradient-tafel" onClick={generateDeepAnalysis} disabled={isGeneratingAnalysis} style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '10px', padding: '12px 24px', fontSize: '1rem', minWidth: '280px', flex: '1 1 280px', maxWidth: '360px' }}>
              {isGeneratingAnalysis ? 'Bezig...' : <><WandIcon size={20} color="currentColor" /> Een beschrijvende analyse</>}
            </button>
          </div>
        </div>

        </div>

        {/* Diepgaande Analyse Weergave (Print/View) */}
        {(analysisText || isGeneratingAnalysis) && (
          <div className="glass-panel" style={{ padding: '2.5rem 2.5rem', borderRadius: '24px', maxWidth: '950px', width: '100%', margin: '2rem auto 0 auto', boxSizing: 'border-box' }}>
            <div className="inner-box" style={{ margin: 0, width: '100%' }}>
              <h3 className="box-heading text-gradient-tafel" style={{ justifyContent: 'center', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <WandIcon size={24} useTafelGradient={true} /> Uitgebreide Psychologische Analyse
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
                    boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)',
                    boxSizing: 'border-box'
                  }}
                />
                <div className="tafel-print-only" style={{ whiteSpace: 'pre-wrap', lineHeight: '1.6', fontSize: '1rem', color: 'var(--text-main)' }}>
                  {analysisText}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {showCardPicker && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 9999, padding: '4rem 1rem', overflowY: 'auto' }} onClick={() => setShowCardPicker(null)}>
          <div className="glass-panel" style={{ background: 'var(--bg-color)', width: '100%', maxWidth: '950px', margin: '0 auto', padding: '3rem', borderRadius: '24px', position: 'relative', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', boxSizing: 'border-box' }} onClick={e => e.stopPropagation()}>
            <button onClick={() => setShowCardPicker(null)} style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)' }}>&times;</button>
            <h2 className="text-gradient-tafel" style={{ textAlign: 'center', marginBottom: '2rem' }}>
              {showCardPicker === 'mode' ? 'Kies een Modus' : showCardPicker === 'schema' ? 'Kies een Schema' : 'Kies een Basisbehoefte'}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {showCardPicker === 'need' ? (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center' }}>
                  {needCards.map((card, idx) => (
                    <SchemaCard
                      key={idx}
                      id={card.id}
                      type={card.type}
                      title={card.title}
                      description={card.description}
                      src={card.src}
                      color={card.color}
                      width="160px"
                      height="228px"
                      imageStyle={card.style}
                      flipOnClick={false}
                      flipOnHover={true}
                      zoomOnClick={false}
                      onClick={() => handleSelectCard(card)}
                      className="picker-card"
                      style={{ margin: 0 }}
                    />
                  ))}
                </div>
              ) : (
                (showCardPicker === 'schema' ? schemaGroups : modeGroups).map((group, groupIdx) => {
                  const cards = showCardPicker === 'schema' ? schemaCards : modeCards;
                  const groupCards = group.titles.map(title => cards.find(c => c.title.toLowerCase() === title.toLowerCase() || c.title === title)).filter(Boolean);
                  if (groupCards.length === 0) return null;
                  
                  const firstCard = groupCards[0];
                  const groupColor = firstCard ? (firstCard.color || getCardColor(firstCard.type, firstCard.id, firstCard.title)) : 'var(--text-main)';
                  
                  return (
                    <div key={groupIdx} style={{ marginBottom: '1.5rem' }}>
                      <h4 style={{ color: groupColor, borderBottom: `2px solid ${groupColor}40`, paddingBottom: '0.5rem', marginBottom: '1rem', textAlign: 'left' }}>{group.group}</h4>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'flex-start' }}>
                        {groupCards.map((card, idx) => {
                          const cardColor = card.color || getCardColor(card.type, card.id, card.title);
                          return (
                          <SchemaCard
                            key={idx}
                            id={card.id}
                            type={card.type}
                            title={card.title}
                            description={card.description}
                            src={card.src}
                            color={cardColor}
                            width="160px"
                            height="228px"
                            imageStyle={card.style}
                            flipOnClick={false}
                            flipOnHover={true}
                            zoomOnClick={false}
                            onClick={() => handleSelectCard(card)}
                            className="picker-card"
                            style={{ margin: 0 }}
                          />
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
