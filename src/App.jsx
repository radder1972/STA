import { useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import Home from './components/Home'
import Questionnaire from './components/Questionnaire'
import Results from './components/Results'
import ysqData from './data/ysq-s3.json'
import smiData from './data/smi.json'

function App() {
  const [currentView, setCurrentView] = useState('home')
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState(null)
  const [answers, setAnswers] = useState({})
  const [theme, setTheme] = useState('dark')

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const handleStart = (type) => {
    setCurrentQuestionnaire(type)
    setAnswers({})
    setCurrentView('questionnaire')
  }

  const handleFinish = (finalAnswers) => {
    setAnswers(finalAnswers)
    setCurrentView('results')
  }

  const handleRestart = () => {
    setCurrentView('home')
    setCurrentQuestionnaire(null)
    setAnswers({})
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
        className="btn btn-outline" 
        style={{ position: 'absolute', top: '1rem', right: '1rem', padding: '10px', borderRadius: '50%', zIndex: 100 }}
        title="Toggle Theme"
      >
        {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
      </button>
      {currentView === 'home' && <Home onStart={handleStart} />}
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
          type={currentQuestionnaire}
          answers={answers}
          onRestart={handleRestart}
        />
      )}

      <div style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        v1.0.1
      </div>
    </div>
  )
}

export default App
