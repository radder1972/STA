import { useState, useEffect } from 'react'
import { ArrowLeftIcon, ArrowRightIcon, CheckIcon } from './Icons'

export default function Questionnaire({ type, questions, onFinish, onCancel }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [animateKey, setAnimateKey] = useState(0)
  const [hasReachedEnd, setHasReachedEnd] = useState(false)
  
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

  const handleFillRandom = () => {
    const randomAnswers = {}
    questions.forEach(q => {
      randomAnswers[q.id] = Math.floor(Math.random() * 6) + 1
    })
    onFinish(randomAnswers)
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

  return (
    <div className="q-container">
      <div className="q-header">
        <button className="btn btn-outline" onClick={onCancel}>
          <ArrowLeftIcon size={18} /> Cancel
        </button>
        <span style={{color: 'var(--text-muted)'}}>Question {currentIndex + 1} of {total}</span>
        
        <div style={{ display: 'flex', gap: '10px', paddingRight: '40px' }}>
          <button className="btn btn-outline" onClick={handleFillRandom} style={{ fontSize: '0.8rem', padding: '8px 12px' }}>
            Fill Randomly
          </button>
          {isComplete && currentIndex === total - 1 && (
            <button className="btn btn-gradient" onClick={() => onFinish(answers)} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '5px' }}>
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
            <div style={{ color: 'var(--accent, #6366f1)', fontWeight: 'bold', marginBottom: '1rem', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '5px' }}>
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
          <button className="btn btn-gradient" onClick={() => onFinish(answers)} style={{ color: 'white', display: 'flex', alignItems: 'center', gap: '8px' }}>
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
