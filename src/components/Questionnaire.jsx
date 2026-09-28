import { useState, useEffect, useRef } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon, DownloadIcon, AlertTriangleIcon, ClipboardIcon, BrainIcon } from './Icons'
import ysqData from '../data/ysq-s3.json'
import smiData from '../data/smi.json'

export default function Questionnaire({ type, questions, initialAnswers, completedTests, onFinish, onCancel }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [animateKey, setAnimateKey] = useState(0)
  const [hasReachedEnd, setHasReachedEnd] = useState(false)
  const [showCompletionScreen, setShowCompletionScreen] = useState(false)
  const fileInputRef = useRef(null)

  useEffect(() => {
    if (initialAnswers && Object.keys(initialAnswers).length > 0) {
      setAnswers(initialAnswers);
      let firstUnanswered = 0;
      for (let i = 0; i < questions.length; i++) {
        if (initialAnswers[questions[i].id] === undefined) {
          firstUnanswered = i;
          break;
        }
      }
      if (firstUnanswered === 0 && Object.keys(initialAnswers).length === questions.length) {
          setCurrentIndex(0); // If fully answered, start at the beginning for review
      } else {
          setCurrentIndex(firstUnanswered);
      }
      return;
    }

    const saved = localStorage.getItem(`schemaApp_progress_${type}`);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        setAnswers(parsed);
        for (let i = 0; i < questions.length; i++) {
          if (parsed[questions[i].id] === undefined) {
            setCurrentIndex(i);
            break;
          }
        }
      } catch (e) {
        console.error("Error loading progress", e);
      }
    }
  }, [type, questions, initialAnswers]);

  useEffect(() => {
    if (Object.keys(answers).length > 0) {
      localStorage.setItem(`schemaApp_progress_${type}`, JSON.stringify(answers));
    }
  }, [answers, type]);

  const handleExportCSV = () => {
    let csvContent = "Vragenlijst,Vraag_ID,Score,Vraag_Tekst\n";
    const typeLabel = type.toUpperCase();
    
    Object.entries(answers).forEach(([qId, score]) => {
      const question = questions.find(q => q.id.toString() === qId.toString());
      const text = question ? `"${question.text.replace(/"/g, '""')}"` : "";
      csvContent += `${typeLabel},${qId},${score},${text}\n`;
    });
    
    const otherType = type === 'ysq' ? 'smi' : 'ysq';
    const otherAnswers = completedTests && completedTests[otherType];
    const isOtherCompleted = otherAnswers && Object.keys(otherAnswers).length > 0;
    
    if (isOtherCompleted) {
      const otherTypeLabel = otherType.toUpperCase();
      const otherQuestions = otherType === 'ysq' ? ysqData : smiData;
      
      Object.entries(otherAnswers).forEach(([qId, score]) => {
        const question = otherQuestions.find(q => q.id.toString() === qId.toString());
        const text = question ? `"${question.text.replace(/"/g, '""')}"` : "";
        csvContent += `${otherTypeLabel},${qId},${score},${text}\n`;
      });
    }
    
    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    
    const fileName = isOtherCompleted 
      ? "schema_therapy_ysq_and_smi_scores.csv" 
      : `schema_therapy_${type}_scores.csv`;
      
    downloadAnchorNode.setAttribute("download", fileName);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  const handleResumeFile = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target.result);
        setAnswers(parsed);
        for (let i = 0; i < questions.length; i++) {
          if (parsed[questions[i].id] === undefined) {
            setCurrentIndex(i);
            break;
          }
        }
      } catch (err) {
        alert("Bestand kon niet gelezen worden. Zorg dat het een geldig voortgangsbestand is.");
      }
      if (fileInputRef.current) fileInputRef.current.value = '';
    };
    reader.readAsText(file);
  };

  const handleFinish = (goToResults = false) => {
    localStorage.removeItem(`schemaApp_progress_${type}`);
    onFinish(answers, goToResults);
  };
  
  const question = questions[currentIndex]
  const total = questions.length
  const progress = ((currentIndex) / total) * 100

  // Optional: Trigger animation when question changes
  useEffect(() => {
    setAnimateKey(prev => prev + 1)
    if (currentIndex === total - 1) setHasReachedEnd(true)
  }, [currentIndex, total])

  const getNextIndex = (currentAnswers) => {
    // First, look for any unanswered question AFTER the current index
    for (let i = currentIndex + 1; i < total; i++) {
      if (currentAnswers[questions[i].id] === undefined) return i;
    }
    // If none found after, loop back to the beginning
    for (let i = 0; i < currentIndex; i++) {
      if (currentAnswers[questions[i].id] === undefined) return i;
    }
    // If everything is answered, go to the final page to show the results button
    return total - 1;
  }

  const handleSelect = (val) => {
    const newAnswers = { ...answers, [question.id]: val }
    setAnswers(newAnswers)
    
    // Auto-advance after brief delay to the next logical question
    setTimeout(() => {
      setCurrentIndex(getNextIndex(newAnswers))
    }, 300)
  }

  const handleNext = () => {
    if (currentIndex < total - 1) setCurrentIndex(c => c + 1)
  }



  const handlePrev = () => {
    if (currentIndex > 0) setCurrentIndex(c => c - 1)
  }

  const isComplete = Object.keys(answers).length === total

  const scaleLabels = type === 'ysq' ? [
    'Helemaal niet waar',
    'Vrijwel geheel niet waar',
    'Enigszins waar',
    'Tamelijk waar',
    'Vrijwel geheel waar',
    'Helemaal waar'
  ] : [
    'Nooit of bijna nooit',
    'Zelden',
    'Af en toe',
    'Regelmatig',
    'Meestal',
    'Altijd'
  ]

  const otherType = type === 'ysq' ? 'smi' : 'ysq';
  const otherCompleted = completedTests && completedTests[otherType] !== null && Object.keys(completedTests[otherType]).length > 0;

  const renderIcon = (listType) => {
    const IconComponent = listType === 'ysq' ? ClipboardIcon : BrainIcon;
    return (
      <div key={listType} style={{ position: 'relative', display: 'inline-block', margin: '0 10px' }}>
        <div className="btn-gradient" style={{ padding: '1.2rem', borderRadius: '50%', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 8px 25px rgba(52, 211, 153, 0.3)' }}>
          <IconComponent size={48} />
        </div>
        <div style={{ position: 'absolute', bottom: '-5px', right: '-5px', background: '#10b981', color: 'white', borderRadius: '50%', padding: '4px', border: '3px solid var(--bg-main, #ffffff)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <CheckIcon size={20} strokeWidth={3} />
        </div>
      </div>
    );
  };

  if (showCompletionScreen) {
    return (
      <div className="q-container">
        <div className="q-content glass-panel" style={{ textAlign: 'center', padding: '3rem 2rem', margin: '2rem auto', maxWidth: '800px' }}>
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
            {(type === 'ysq' || otherCompleted) && renderIcon('ysq')}
            {(type === 'smi' || otherCompleted) && renderIcon('smi')}
          </div>
          <h2 className="text-gradient" style={{ fontSize: '2rem', marginBottom: '1.5rem' }}>
            {otherCompleted ? "Beide Lijsten Voltooid!" : "Lijst Voltooid!"}
          </h2>

          {!otherCompleted && (
            <div className="glass-panel" style={{ border: '1px solid var(--border-color)', padding: '1.5rem', borderRadius: '12px', color: 'var(--text-main)', marginBottom: '2rem', textAlign: 'left', display: 'flex', gap: '1.5rem', alignItems: 'center' }}>
              <div style={{ background: 'var(--bg-card)', padding: '12px', borderRadius: '50%', color: 'var(--text-muted)', flexShrink: 0 }}>
                <AlertTriangleIcon size={24} />
              </div>
              <div style={{ flex: 1 }}>
                <strong style={{ display: 'block', color: 'var(--text-main)', marginBottom: '0.5rem', fontSize: '1.1rem' }}>U heeft nu alleen de {type.toUpperCase()} ingevuld</strong>
                <p style={{ margin: 0, color: 'var(--text-muted)' }}>Het rapport is het meest waardevol als u beide lijsten invult.</p>
              </div>
              <button 
                className="btn btn-outline" 
                onClick={() => handleFinish(false)}
                style={{ flexShrink: 0, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: '8px' }}
              >
                <ArrowLeftIcon size={18} /> Naar startpagina
              </button>
            </div>
          )}

          <p style={{ color: 'var(--text-main)', lineHeight: '1.6', fontSize: '1.1rem', marginBottom: '2rem', maxWidth: '650px', margin: '0 auto 2rem auto' }}>
            Gefeliciteerd, u heeft zojuist de <strong>{type === 'ysq' ? "Young Schema Questionnaire (YSQ)" : "Schema Mode Inventory (SMI)"}</strong> succesvol ingevuld!
            {otherCompleted && (
              <span style={{ display: 'block', marginTop: '0.5rem', color: '#10b981', fontWeight: 'bold' }}>
                Fantastisch! Daarmee heeft u nu beide lijsten voltooid en is uw profiel compleet.
              </span>
            )}
            <br/><br/>
            Voordat u verdergaat naar het analyserapport, bieden we u de mogelijkheid om uw onbewerkte antwoorden lokaal op uw eigen computer op te slaan als een CSV-bestand. Door dit bestand op te slaan raakt u uw ingevulde gegevens niet kwijt en kunt u ze op een later moment eenvoudig weer inlezen via de startpagina.
            <br/><br/>
            <strong>Let op:</strong> Vanwege uw privacy worden uw antwoorden <em>nergens online opgeslagen</em>. Zodra u de applicatie afsluit, bent u de ingevulde gegevens kwijt tenzij u ze opslaat.
          </p>
          
          <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap', marginTop: '3rem' }}>
            <button className="btn btn-outline" onClick={handleExportCSV} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 24px', fontSize: '1.1rem' }}>
              <DownloadIcon size={20} /> Sla Scores Op (CSV)
            </button>
            <button className="btn btn-gradient" onClick={() => handleFinish(true)} style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'white', padding: '12px 24px', fontSize: '1.1rem' }}>
              Doorgaan naar Rapport <ArrowRightIcon size={20} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="q-container">
      <div className="q-header">
        <button className="btn btn-outline" onClick={onCancel}>
          <ArrowLeftIcon size={18} /> Cancel
        </button>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <span className="text-gradient" onDoubleClick={() => {
            const dummyAnswers = {};
            questions.forEach(q => {
              dummyAnswers[q.id] = Math.floor(Math.random() * 6) + 1;
            });
            setAnswers(dummyAnswers);
            setShowCompletionScreen(true);
          }} style={{ fontWeight: 'bold', fontSize: '1.1rem', marginBottom: '4px', cursor: 'default' }}>
            {type === 'ysq' ? "Young Schema Questionnaire (YSQ S3)" : "Schema Mode Inventory (SMI)"}
          </span>
          <span style={{color: 'var(--text-main)'}}>Vraag {currentIndex + 1} van {total}</span>
        </div>        
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center', paddingRight: '50px' }}>
          <input 
            type="file" 
            accept=".json" 
            style={{ display: 'none' }} 
            ref={fileInputRef} 
            onChange={handleResumeFile} 
          />
          <button className="btn btn-outline" onClick={() => fileInputRef.current && fileInputRef.current.click()} style={{ fontSize: '0.8rem', padding: '8px 12px' }}>
            Hervatten
          </button>
          <button className="btn btn-outline" onClick={handleExportCSV} style={{ fontSize: '0.8rem', padding: '8px 12px' }}>
            Opslaan
          </button>
          {isComplete && currentIndex === total - 1 && (
            <button className="btn btn-gradient" onClick={() => setShowCompletionScreen(true)} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
              <CheckIcon size={18} /> Bekijk Resultaten
            </button>
          )}
        </div>
      </div>

      <div className="progress-bar-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}></div>
      </div>

      {question && (
        <div 
          key={animateKey} 
          className="question-box glass-panel"
          style={hasReachedEnd && answers[question.id] === undefined ? { border: '2px solid var(--accent, #6366f1)', boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)' } : {}}
        >
          {hasReachedEnd && answers[question.id] === undefined && (
            <div style={{ color: 'var(--accent, #6366f1)', fontWeight: 'bold', marginBottom: '1rem', fontSize: '1rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
              ⚠️ Overgeslagen vraag
            </div>
          )}
          <h3>{question.text}</h3>
          
          <div className="options-grid">
            {[1, 2, 3, 4, 5, 6].map(val => (
              <div 
                key={val} 
                className={`option-btn ${answers[question.id] === val ? 'selected' : ''}`}
                onClick={() => handleSelect(val)}
              >
                {val}
                <span>{scaleLabels[val-1]}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="nav-buttons">
        <button 
          className="btn btn-outline" 
          onClick={handlePrev} 
          disabled={currentIndex === 0}
        >
            <ArrowLeftIcon size={18} /> Previous
        </button>
        
        {currentIndex < total - 1 && (
          <button 
            className="btn btn-outline" 
            onClick={handleNext} 
          >
            Next <ArrowRightIcon size={18} />
          </button>
        )}
        
        {currentIndex === total - 1 && isComplete && (
          <button className="btn btn-gradient" onClick={() => setShowCompletionScreen(true)} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
            Bekijk Resultaten <CheckIcon size={18} />
          </button>
        )}

        {currentIndex === total - 1 && !isComplete && (
          <button 
            className="btn btn-outline" 
            onClick={() => {
              const firstMissing = questions.findIndex(q => answers[q.id] === undefined);
              if (firstMissing !== -1) setCurrentIndex(firstMissing);
            }} 
            style={{ color: 'var(--error, #ef4444)', borderColor: 'var(--error, #ef4444)' }}
          >
            {total - Object.keys(answers).length} {(total - Object.keys(answers).length) === 1 ? 'Vraag' : 'Vragen'} overgeslagen? Ga terug
          </button>
        )}
      </div>
    </div>
  )
}
