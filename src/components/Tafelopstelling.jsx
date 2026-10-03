import React, { useState, useRef } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ArrowLeftIcon, CpuChipIcon, AlertTriangleIcon, CheckIcon, WandIcon, ArrowDownIcon, PlayingCardsIcon, CardsIcon, SparklesIcon, UploadIcon, FileTextIcon, ClipboardIcon, LightbulbIcon, HandIcon } from './Icons';
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

const WaaierNeedSelector = ({ selectedNeedTitle, onSelectNeed }) => {
  const cards = needCards.slice(0, 5);
  const angles = [-16, -8, 0, 8, 16];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', marginTop: '1.25rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '0.5rem' }}>
        <div style={{ 
          fontSize: '0.78rem', 
          fontWeight: '700', 
          textTransform: 'uppercase', 
          letterSpacing: '0.06em', 
          color: '#059669', 
          marginBottom: '0.35rem' 
        }}>
          Optioneel / Aanbevolen voor CDS
        </div>
        <div style={{ 
          fontSize: '1rem', 
          fontWeight: '700', 
          color: 'var(--text-main)', 
          lineHeight: '1.4'
        }}>
          Welke basisbehoefte kwam in deze situatie het meest in het geding?
        </div>
      </div>

      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'flex-end', 
        padding: '2.5rem 1rem 1.5rem 1rem', 
        minHeight: '220px', 
        width: '100%',
        position: 'relative',
        overflow: 'visible'
      }}>
        {cards.map((card, index) => {
          const rotation = angles[index] || 0;
          const isSelected = selectedNeedTitle === card.title;
          const cardColor = card.color || '#3b82f6';

          return (
            <div
              key={card.id || card.title}
              onClick={() => onSelectNeed(isSelected ? '' : card.title)}
              style={{
                position: 'relative',
                width: '110px',
                height: '155px',
                margin: '0 -16px',
                transform: isSelected 
                  ? `rotate(0deg) translateY(-26px) scale(1.22)` 
                  : `rotate(${rotation}deg) translateY(0px)`,
                zIndex: isSelected ? 40 : index + 1,
                cursor: 'pointer',
                transition: 'all 0.35s cubic-bezier(0.34, 1.25, 0.64, 1)',
                filter: isSelected ? `drop-shadow(0 12px 25px ${cardColor}80)` : 'drop-shadow(0 6px 15px rgba(0,0,0,0.15))',
                transformOrigin: 'bottom center'
              }}
              onMouseOver={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = `rotate(${rotation}deg) translateY(-16px) scale(1.16)`;
                  e.currentTarget.style.zIndex = '35';
                }
              }}
              onMouseOut={(e) => {
                if (!isSelected) {
                  e.currentTarget.style.transform = `rotate(${rotation}deg) translateY(0px) scale(1)`;
                  e.currentTarget.style.zIndex = `${index + 1}`;
                }
              }}
              title={`${card.title}${isSelected ? ' (Aangevinkt - klik om te wissen)' : ' (Klik om te selecteren)'}`}
            >
              <SchemaCard 
                id={card.id}
                type="need"
                title={card.title}
                src={card.src}
                color={cardColor}
                width="110px"
                height="155px"
                flipOnClick={false}
                zoomOnClick={false}
                isInteractive={false}
              />
              {isSelected && (
                <div style={{
                  position: 'absolute',
                  top: '-10px',
                  right: '-10px',
                  background: '#059669',
                  color: 'white',
                  borderRadius: '50%',
                  width: '26px',
                  height: '26px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '2px solid white',
                  boxShadow: '0 4px 10px rgba(0,0,0,0.3)',
                  zIndex: 60
                }}>
                  <CheckIcon size={14} strokeWidth={3} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {selectedNeedTitle ? (
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '0.75rem' }}>
          <span style={{ fontSize: '0.9rem', fontWeight: '700', color: '#059669' }}>
            ✓ Geselecteerd: {selectedNeedTitle}
          </span>
          <button 
            type="button"
            onClick={() => onSelectNeed('')}
            style={{ border: 'none', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', fontSize: '0.8rem', fontWeight: '600', padding: '4px 12px', borderRadius: '9999px', cursor: 'pointer' }}
          >
            Wissen / AI laten inschatten
          </button>
        </div>
      ) : (
        <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginTop: '0.5rem', textAlign: 'center' }}>
          Klik op een kaart in de waaier om de geraakte basisbehoefte te selecteren.
        </div>
      )}
    </div>
  );
};

export default function Tafelopstelling({ onBack, completedTests: initialCompletedTests, embedded = false }) {
  const [completedTests, setCompletedTests] = useState(initialCompletedTests || {});
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
  const [csvUploadedName, setCsvUploadedName] = useState(null);
  const [selectedUnmetNeed, setSelectedUnmetNeed] = useState('');
  const [differentialHypotheses, setDifferentialHypotheses] = useState(null);
  const [vstOverwrite, setVstOverwrite] = useState({
    identity: false,
    meaning: false,
    injustice: false
  });
  const fileInputRef = useRef(null);

  const handleCsvUpload = (e) => {
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
        setCompletedTests(prev => ({
          ...prev,
          ...(importedYsq ? { ysq: importedYsq } : {}),
          ...(importedSmi ? { smi: importedSmi } : {})
        }));
        setCsvUploadedName(file.name);
      } else {
        alert("Geen geldige scores gevonden in dit CSV-bestand.");
      }

      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    };
    reader.readAsText(file);
  };

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
      let topSchemasArr = completedTests?.ysq ? calculateTopScores(completedTests.ysq, ysqScoring, ysqSchemaNamesMap) : [];
      let topModesArr = completedTests?.smi ? calculateTopScores(completedTests.smi, smiScoring, smiModesMap) : [];

      if (vstOverwrite.identity && !topSchemasArr.includes('Gebrek aan coherente identiteit')) {
        topSchemasArr.unshift('Gebrek aan coherente identiteit (Klinische Observatie VSt 2021)');
      }
      if (vstOverwrite.meaning && !topSchemasArr.includes('Gebrek aan een betekenisvolle wereld')) {
        topSchemasArr.unshift('Gebrek aan een betekenisvolle wereld (Klinische Observatie VSt 2021)');
      }
      if (vstOverwrite.injustice && !topSchemasArr.includes('Onrechtvaardigheid')) {
        topSchemasArr.unshift('Onrechtvaardigheid (Klinische Observatie VSt 2021)');
      }

      const topSchemas = topSchemasArr.join(', ');
      const topModes = topModesArr.join(', ');

      const apiKey = localStorage.getItem('gemini_api_key') || DEFAULT_KEY;
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

      const availableModes = modeCards.map(c => c.title).join(', ');
      const availableSchemas = schemaCards.map(c => c.title).join(', ');
      const availableNeeds = needCards.map(c => c.title).join(', ');

      const prompt = `Je bent een expert in schematherapie en fungeert als Clinical Decision Support (CDS) voor een therapeut. 
De cliënt heeft de volgende situatie/trigger meegemaakt:
"${situationText}"
${selectedUnmetNeed ? `Geraakte Basisbehoefte volgens de therapeut: "${selectedUnmetNeed}"` : ''}
${hasProfile || topSchemas ? `
Profiel & Klinische observaties van deze cliënt:
Top Schema's: ${topSchemas}
Top Modi: ${topModes}` : ''}

Stel 2 tot 3 differentiële hypotheses op voor de best passende Modus en het best passende Schema, plus de meest waarschijnlijke Onvervulde Basisbehoefte. Geef voor elke hypothese een geschat match-percentage (bijv. 85, 60) en een korte klinische onderbouwing (Explainable AI conform VSt 2021 criteria).

Je MOET kiezen uit deze exacte lijsten:
Beschikbare Modi: ${availableModes}
Beschikbare Schema's: ${availableSchemas}
Beschikbare Behoeften: ${availableNeeds}

Geef je antwoord ALLEEN als een geldig JSON object in dit exacte formaat, zonder extra tekst of markdown eromheen:
{
  "modes": [
    { "title": "exacte titel uit de lijst", "match": 85, "reason": "Korte klinische onderbouwing van 1 zin op basis van de casus en VSt-criteria." },
    { "title": "exacte titel uit de lijst", "match": 60, "reason": "Korte klinische onderbouwing van 1 zin." }
  ],
  "schemas": [
    { "title": "exacte titel uit de lijst", "match": 80, "reason": "Korte klinische onderbouwing van 1 zin." },
    { "title": "exacte titel uit de lijst", "match": 55, "reason": "Korte klinische onderbouwing van 1 zin." }
  ],
  "need": { "title": "exacte titel uit de lijst", "match": 90, "reason": "Korte klinische onderbouwing van 1 zin." }
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
      
      const topModeTitle = parsed.modes?.[0]?.title || parsed.mode;
      const topSchemaTitle = parsed.schemas?.[0]?.title || parsed.schema;
      const topNeedTitle = parsed.need?.title || parsed.need;

      const foundMode = modeCards.find(c => c.title === topModeTitle) || modeCards[0];
      const foundSchema = schemaCards.find(c => c.title === topSchemaTitle) || schemaCards[0];
      const foundNeed = needCards.find(c => c.title === topNeedTitle) || needCards[0];

      setSelectedMode(foundMode);
      setSelectedSchema(foundSchema);
      setSelectedNeed(foundNeed);
      setDifferentialHypotheses(parsed);

      // Auto-generate analyses using top hypotheses
      generateGvAdvice(foundMode, foundSchema, foundNeed);
      generateDeepAnalysis(foundMode, foundSchema, foundNeed);

    } catch (err) {
      console.error(err);
      alert("Fout bij het genereren van hypotheses: " + (err.message || 'Onbekende fout'));
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

                {/* Pijler 3: Invoer van Onvervulde Basisbehoefte in Waaier-vorm */}
                <div className="no-print" style={{ marginTop: '1.25rem', width: '100%' }}>
                  <WaaierNeedSelector 
                    selectedNeedTitle={selectedUnmetNeed} 
                    onSelectNeed={setSelectedUnmetNeed} 
                  />
                </div>
              </div>
              
              <div>
                <h3 className="box-heading text-gradient-tafel" style={{ justifyContent: 'center', marginTop: '2.5rem', marginBottom: '1.5rem' }}><StepBadge number="2" size={28} /> Clinical Decision Support</h3>
                
                <div className="no-print" style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05) 0%, rgba(14, 165, 233, 0.06) 50%, rgba(16, 185, 129, 0.08) 100%)',
                  padding: '2.5rem 2rem',
                  borderRadius: '24px',
                  border: '1px solid rgba(16, 185, 129, 0.35)',
                  boxSizing: 'border-box',
                  boxShadow: '0 12px 35px rgba(16, 185, 129, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.6)',
                  position: 'relative'
                }}>
                  
                  {/* Premium Core Feature Badge */}
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '4px 14px',
                    borderRadius: '9999px',
                    background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
                    color: 'white',
                    fontSize: '0.75rem',
                    fontWeight: '800',
                    letterSpacing: '0.08em',
                    textTransform: 'uppercase',
                    marginBottom: '1rem',
                    boxShadow: '0 4px 14px rgba(16, 185, 129, 0.35)'
                  }}>
                    <SparklesIcon size={14} color="white" />
                    <span>CLINICAL DECISION SUPPORT (CDS)</span>
                  </div>

                  <h4 className="text-gradient-tafel" style={{ margin: '0 0 0.75rem 0', fontSize: '1.45rem', fontWeight: '800', letterSpacing: '-0.02em', textAlign: 'center' }}>
                    Differentiële Hypotheses Genereren
                  </h4>

                  <p style={{ fontSize: '1rem', color: 'var(--text-main)', marginBottom: '1.75rem', textAlign: 'center', lineHeight: '1.6', maxWidth: '640px' }}>
                    Laat de AI gewogen differentiële hypotheses opstellen op basis van de casus, geraakte basisbehoefte en het testprofiel. Elke hypothese bevat transparante klinische onderbouwing (Explainable AI). U kiest als therapeut welke kaart definitief op tafel komt.
                  </p>

                  {/* CSV Profile Import & Connection Widget */}
                  <div style={{
                    width: '100%',
                    maxWidth: '660px',
                    marginBottom: '2rem',
                    padding: '1.25rem 1.5rem',
                    borderRadius: '20px',
                    background: 'var(--bg-color)',
                    border: '1px solid rgba(16, 185, 129, 0.25)',
                    boxSizing: 'border-box',
                    boxShadow: '0 6px 20px rgba(0,0,0,0.04)',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: '14px'
                  }}>
                    <input 
                      type="file" 
                      accept=".csv" 
                      ref={fileInputRef} 
                      style={{ display: 'none' }} 
                      onChange={handleCsvUpload} 
                    />

                    {(completedTests?.ysq || completedTests?.smi) ? (
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', textAlign: 'center', margin: '4px 0 2px 0' }}>
                        <div style={{ position: 'relative', display: 'inline-block' }}>
                          <div style={{ background: 'linear-gradient(135deg, #34d399 0%, #10b981 100%)', width: '48px', height: '48px', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 18px rgba(16, 185, 129, 0.3)' }}>
                            <ClipboardIcon size={24} color="white" />
                          </div>
                          <div style={{ position: 'absolute', bottom: '-2px', right: '-2px', background: '#059669', color: 'white', borderRadius: '50%', width: '18px', height: '18px', border: '2px solid white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 2px 6px rgba(0,0,0,0.15)' }}>
                            <CheckIcon size={11} strokeWidth={3} />
                          </div>
                        </div>

                        <div style={{ color: 'var(--text-main)', fontSize: '0.94rem', fontWeight: '400', lineHeight: '1.4' }}>
                          <div style={{ fontWeight: '500', color: 'var(--text-main)' }}>Persoonlijk testprofiel gekoppeld</div>
                          {csvUploadedName ? (
                            <div style={{ fontSize: '0.84rem', color: '#059669', opacity: 0.9, marginTop: '2px', fontWeight: '400' }}>
                              {csvUploadedName}
                            </div>
                          ) : (
                            <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '2px', fontWeight: '400' }}>
                              (YSQ / SMI resultaten actief)
                            </div>
                          )}
                        </div>
                      </div>
                    ) : (
                      <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--text-main)', textAlign: 'center', lineHeight: '1.5', fontWeight: '400' }}>
                        <strong>Optioneel:</strong> Koppel je testresultaten voor een nog nauwkeurigere differentiële hypothese op maat!
                      </p>
                    )}

                    {/* Pijler 4: Klinische Overwrite Widget (VSt 2021 Schema's) */}
                    <div style={{ width: '100%', borderTop: '1px solid var(--border-color)', paddingTop: '12px', marginTop: '4px' }}>
                      <div style={{ fontSize: '0.88rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '8px', textAlign: 'center' }}>
                        🩺 Klinische Overwrite & VSt 2021 Verrijking (Interview):
                      </div>
                      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', fontSize: '0.84rem', color: 'var(--text-main)' }}>
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={vstOverwrite.identity}
                            onChange={e => setVstOverwrite(prev => ({ ...prev, identity: e.target.checked }))}
                          />
                          <span>Gebrek aan coherente identiteit</span>
                        </label>
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={vstOverwrite.meaning}
                            onChange={e => setVstOverwrite(prev => ({ ...prev, meaning: e.target.checked }))}
                          />
                          <span>Gebrek aan betekenisvolle wereld</span>
                        </label>
                        <label style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                          <input 
                            type="checkbox" 
                            checked={vstOverwrite.injustice}
                            onChange={e => setVstOverwrite(prev => ({ ...prev, injustice: e.target.checked }))}
                          />
                          <span>Onrechtvaardigheid</span>
                        </label>
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '12px', width: '100%' }}>
                      <button
                        type="button"
                        onClick={() => fileInputRef.current?.click()}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 20px',
                          borderRadius: '9999px',
                          border: '1px solid rgba(14, 165, 233, 0.35)',
                          background: 'linear-gradient(135deg, rgba(14, 165, 233, 0.08) 0%, rgba(59, 130, 246, 0.12) 100%)',
                          color: '#0284c7',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          boxShadow: '0 4px 14px rgba(14, 165, 233, 0.1)'
                        }}
                      >
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg, #0ea5e9, #2563eb)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <UploadIcon size={14} color="white" strokeWidth={2.5} />
                        </div>
                        <span>{(completedTests?.ysq || completedTests?.smi) ? 'Ander CSV-bestand inlezen' : 'Lees je CSV-score binnen'}</span>
                      </button>

                      <a
                        href="index.html"
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '10px 20px',
                          borderRadius: '9999px',
                          border: '1px solid rgba(16, 185, 129, 0.35)',
                          background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.08) 0%, rgba(5, 150, 105, 0.12) 100%)',
                          color: '#059669',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          textDecoration: 'none',
                          cursor: 'pointer',
                          transition: 'all 0.25s ease',
                          boxShadow: '0 4px 14px rgba(16, 185, 129, 0.1)'
                        }}
                        title="Nog geen test gedaan? Vul de vragenlijst in & download je CSV"
                      >
                        <div style={{ width: '26px', height: '26px', borderRadius: '50%', background: 'linear-gradient(135deg, #059669, #10b981)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FileTextIcon size={14} color="white" strokeWidth={2.5} />
                        </div>
                        <span>Vragenlijst invullen & CSV downloaden</span>
                      </a>
                    </div>
                  </div>

                  {/* Primary Flagship CDS Hypotheses Button */}
                  <button 
                    className="btn btn-gradient-tafel" 
                    onClick={predictCards} 
                    disabled={isPredicting || !situationText}
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      gap: '12px', 
                      fontSize: '1.15rem', 
                      fontWeight: '700',
                      padding: '1.1rem 3rem', 
                      minWidth: '320px', 
                      justifyContent: 'center', 
                      borderRadius: '9999px',
                      boxShadow: '0 8px 25px rgba(16, 185, 129, 0.35)',
                      cursor: (isPredicting || !situationText) ? 'not-allowed' : 'pointer',
                      transition: 'all 0.3s cubic-bezier(0.34, 1.25, 0.64, 1)'
                    }}
                    title="Genereer gewogen differentiële hypotheses op basis van situatie en profiel"
                  >
                    {isPredicting ? 'Bezig met analyseren...' : <><WandIcon size={24} color="currentColor" /> Genereer Differentiële Hypotheses (AI)</>}
                  </button>

                  {/* Pijlers 1 & 2: Differentiële Hypotheses & Explainable AI (XAI) Panel */}
                  {differentialHypotheses && (
                    <div style={{ marginTop: '2rem', width: '100%', maxWidth: '780px', background: 'var(--card-bg)', padding: '1.5rem', borderRadius: '20px', border: '1px solid var(--border-color)', textAlign: 'left' }}>
                      <h4 style={{ margin: '0 0 1rem 0', color: 'var(--text-main)', fontSize: '1.15rem', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <SparklesIcon size={20} useTafelGradient={true} /> Differentiële Hypotheses & Klinische Logica (XAI)
                      </h4>

                      {/* Modi Hypotheses */}
                      {differentialHypotheses.modes && differentialHypotheses.modes.length > 0 && (
                        <div style={{ marginBottom: '1.25rem' }}>
                          <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>🎭 Modi Hypotheses:</strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {differentialHypotheses.modes.map((h, i) => {
                              const found = modeCards.find(c => c.title === h.title);
                              return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '10px 14px', borderRadius: '12px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
                                  <div style={{ flex: 1, minWidth: '220px' }}>
                                    <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{i + 1}. {h.title}</span>
                                    <span style={{ marginLeft: '8px', padding: '2px 8px', borderRadius: '9999px', background: 'rgba(16, 185, 129, 0.15)', color: '#059669', fontWeight: '700', fontSize: '0.78rem' }}>{h.match}% Match</span>
                                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                                      💡 <em>Reden: {h.reason}</em>
                                    </div>
                                  </div>
                                  {found && (
                                    <button 
                                      type="button"
                                      onClick={() => setSelectedMode(found)}
                                      className="btn btn-outline"
                                      style={{ padding: '6px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
                                    >
                                      Plaats op tafel
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}

                      {/* Schema Hypotheses */}
                      {differentialHypotheses.schemas && differentialHypotheses.schemas.length > 0 && (
                        <div>
                          <strong style={{ display: 'block', color: 'var(--text-main)', fontSize: '0.95rem', marginBottom: '0.5rem' }}>📐 Schema Hypotheses:</strong>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                            {differentialHypotheses.schemas.map((h, i) => {
                              const found = schemaCards.find(c => c.title === h.title);
                              return (
                                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', padding: '10px 14px', borderRadius: '12px', background: 'var(--bg-color)', border: '1px solid var(--border-color)', flexWrap: 'wrap' }}>
                                  <div style={{ flex: 1, minWidth: '220px' }}>
                                    <span style={{ fontWeight: '700', color: 'var(--text-main)' }}>{i + 1}. {h.title}</span>
                                    <span style={{ marginLeft: '8px', padding: '2px 8px', borderRadius: '9999px', background: 'rgba(59, 130, 246, 0.15)', color: '#2563eb', fontWeight: '700', fontSize: '0.78rem' }}>{h.match}% Match</span>
                                    <div style={{ fontSize: '0.84rem', color: 'var(--text-muted)', marginTop: '4px', lineHeight: '1.4' }}>
                                      💡 <em>Reden: {h.reason}</em>
                                    </div>
                                  </div>
                                  {found && (
                                    <button 
                                      type="button"
                                      onClick={() => setSelectedSchema(found)}
                                      className="btn btn-outline"
                                      style={{ padding: '6px 14px', fontSize: '0.82rem', whiteSpace: 'nowrap' }}
                                    >
                                      Plaats op tafel
                                    </button>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      )}
                    </div>
                  )}
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
              
              <div style={{ width: '100%', marginTop: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                
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

                <button 
                  onClick={generateGvAdvice} 
                  disabled={isGenerating} 
                  className="btn btn-outline no-print" 
                  style={{ 
                    display: 'inline-flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '10px', 
                    padding: '12px 24px', 
                    fontSize: '1rem', 
                    background: 'var(--bg-color)', 
                    border: '1px solid rgba(16, 185, 129, 0.4)', 
                    marginTop: '1.25rem',
                    width: '100%',
                    maxWidth: '360px'
                  }}
                >
                  {isGenerating ? 'Genereren...' : <><CpuChipIcon size={20} useTafelGradient={true} /> Genereer een gezonde reactie</>}
                </button>
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
