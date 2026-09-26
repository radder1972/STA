import React, { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from './components/Icons'
import Home from './components/Home'
import Questionnaire from './components/Questionnaire'
import Results from './components/Results'
import ysqData from './data/ysq-s3.json'
import smiData from './data/smi.json'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState(null)
  const [completedTests, setCompletedTests] = useState({ ysq: null, smi: null })
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const handleStart = (type) => {
    setCurrentQuestionnaire(type)
    setCurrentView('questionnaire')
  }

  const handleFinish = (finalAnswers) => {
    setCompletedTests(prev => ({ ...prev, [currentQuestionnaire]: finalAnswers }))
    setCurrentView('home')
    setCurrentQuestionnaire(null)
  }

  const viewResults = () => {
    setCurrentView('results')
  }

  const handleUpdateAnswer = (type, questionId, newScore) => {
    setCompletedTests(prev => ({
      ...prev,
      [type]: {
        ...prev[type],
        [questionId]: parseInt(newScore, 10)
      }
    }))
  }

  const handleRestart = () => {
    setCurrentView('home')
    setCurrentQuestionnaire(null)
    setCompletedTests({ ysq: null, smi: null })
  }

  const handleImport = (importedTests) => {
    setCompletedTests(prev => ({
      ysq: importedTests.ysq || prev.ysq,
      smi: importedTests.smi || prev.smi
    }))
    setCurrentView('results')
  }

  const getQuestionData = () => {
    if (currentQuestionnaire === 'ysq') return ysqData
    if (currentQuestionnaire === 'smi') return smiData
    return []
  }

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      <button 
        onClick={toggleTheme} 
        className="btn btn-outline no-print" 
        style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '10px', borderRadius: '50%', zIndex: 100 }}
        title="Toggle Theme"
      >
        {theme === 'dark' ? <SunIcon size={20} useGradient={true} /> : <MoonIcon size={20} useGradient={true} />}
      </button>
      {currentView === 'home' && (
        <Home 
          onStart={handleStart} 
          completedTests={completedTests} 
          onViewResults={viewResults} 
          onImport={handleImport}
        />
      )}
      {currentView === 'questionnaire' && (
        <Questionnaire 
          type={currentQuestionnaire} 
          questions={getQuestionData()} 
          onFinish={handleFinish} 
          onCancel={handleRestart} 
        />
      )}
      {currentView === 'results' && (
        <Results 
          completedTests={completedTests}
          onRestart={handleRestart}
          onBack={() => setCurrentView('home')}
          onUpdateAnswer={handleUpdateAnswer}
        />
      )}

      <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        v1.5.1
      </div>
    </div>
  )
}

export default App
