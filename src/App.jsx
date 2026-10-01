import React, { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from './components/Icons'
import Home from './components/Home'
import Questionnaire from './components/Questionnaire'
import Results from './components/Results'
import Basisbehoeften from './components/Basisbehoeften'
import ModiCategorieen from './components/ModiCategorieen'
import KaartenOverzicht from './components/KaartenOverzicht'
import PrintShopExport from './components/PrintShopExport'
import HomePrintExport from './components/HomePrintExport'
import GameRules from './components/GameRules'
import GamePortal from './components/GamePortal'
import OrderCards from './components/OrderCards'
import About from './components/About'
import Tafelopstelling from './components/Tafelopstelling'
import ysqData from './data/ysq-s3.json'
import smiData from './data/smi.json'
import packageJson from '../package.json'
import GameNavbar from './components/GameNavbar'

window.addEventListener('error', function(event) {
  alert("Error: " + event.message + "\nFile: " + event.filename + "\nLine: " + event.lineno);
});
window.addEventListener('unhandledrejection', function(event) {
  alert("Promise Error: " + event.reason);
});

function App() {
  const isTafelApp = typeof window !== 'undefined' && (
    window.location.pathname.endsWith('tafel.html') || 
    window.location.pathname.endsWith('tafelopstelling.html') ||
    window.location.pathname.includes('/tafel')
  );

  const isSpelApp = typeof window !== 'undefined' && !isTafelApp && (
    window.location.pathname.endsWith('spel.html') || 
    window.location.pathname.includes('/spel')
  );

  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    if (isTafelApp) {
      if (['spelportaal', 'spelregels', 'theoriekaarten', 'print-shop', 'bestel-kaarten', 'over'].includes(hash)) {
        window.location.href = `spel.html#${hash}`
        return 'tafelopstelling'
      }
      return 'tafelopstelling'
    }
    if (isSpelApp) {
      if (hash === 'tafelopstelling') {
        window.location.href = 'tafel.html'
        return 'game-portal'
      }
      if (hash === 'spelregels') return 'game-rules'
      if (hash === 'theoriekaarten') return 'kaartenoverzicht'
      if (hash === 'print-shop') return 'print-shop'
      if (hash === 'bestel-kaarten') return 'order-cards'
      if (hash === 'over') return 'about'
      return 'game-portal'
    }
    // Test app (index.html)
    if (hash === 'tafelopstelling') {
      window.location.href = 'tafel.html'
      return 'home'
    }
    if (['spelregels', 'theoriekaarten', 'print-shop', 'bestel-kaarten', 'over', 'spelportaal', 'spel'].includes(hash)) {
      window.location.href = `spel.html#${hash}`
      return 'home'
    }
    return 'home'
  })
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState(null)
  const [completedTests, setCompletedTests] = useState({ ysq: null, smi: null })
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (isTafelApp) {
        if (['spelportaal', 'spelregels', 'theoriekaarten', 'print-shop', 'bestel-kaarten', 'over'].includes(hash)) {
          window.location.href = `spel.html#${hash}`
          return
        }
        if (hash === 'home' || hash === 'zelftest') {
          window.location.href = 'index.html'
          return
        }
        setCurrentView('tafelopstelling')
        return
      }
      if (isSpelApp) {
        if (hash === 'tafelopstelling') {
          window.location.href = 'tafel.html'
          return
        }
        if (hash === 'spelportaal' || hash === 'spel') setCurrentView('game-portal')
        else if (hash === 'spelregels') setCurrentView('game-rules')
        else if (hash === 'theoriekaarten') setCurrentView('kaartenoverzicht')
        else if (hash === 'print-shop') setCurrentView('print-shop')
        else if (hash === 'bestel-kaarten') setCurrentView('order-cards')
        else if (hash === 'over') setCurrentView('about')
        else setCurrentView('game-portal')
        return
      }
      // Test app
      if (hash === 'tafelopstelling') {
        window.location.href = 'tafel.html'
        return
      }
      if (['spelregels', 'theoriekaarten', 'print-shop', 'bestel-kaarten', 'over', 'spelportaal', 'spel'].includes(hash)) {
        window.location.href = `spel.html#${hash}`
        return
      }
      if (hash === 'results') setCurrentView('results')
      else if (hash === 'basisbehoeften') setCurrentView('basisbehoeften')
      else if (hash === 'modicategorieen') setCurrentView('modicategorieen')
      else setCurrentView('home')
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [isSpelApp, isTafelApp])

  useEffect(() => {
    let hash = ''
    let isGameView = isSpelApp || isTafelApp
    if (currentView === 'game-portal') { hash = 'spelportaal'; isGameView = true }
    else if (currentView === 'tafelopstelling') { hash = isTafelApp ? '' : 'tafelopstelling'; isGameView = true }
    else if (currentView === 'game-rules') { hash = 'spelregels'; isGameView = true }
    else if (currentView === 'kaartenoverzicht') { hash = 'theoriekaarten'; isGameView = true }
    else if (currentView === 'print-shop') { hash = 'print-shop'; isGameView = true }
    else if (currentView === 'order-cards') { hash = 'bestel-kaarten'; isGameView = true }
    else if (currentView === 'about') { hash = 'over'; isGameView = true }
    
    // Dynamic document title
    if (isTafelApp) {
      document.title = 'Digitale Tafelopstelling - Schematherapie'
    } else if (isSpelApp) {
      document.title = 'Schematherapie Kaartenspel - Breng schema\'s en modi tot leven'
    } else {
      document.title = 'Schematherapie Zelftest - YSQ-S3 & SMI Vragenlijsten'
    }

    const faviconLink = document.querySelector("link[rel~='icon']")
    if (faviconLink) {
      faviconLink.href = (isSpelApp || isTafelApp) ? '/favicon-game.svg' : '/favicon.svg'
    }
    
    if (hash) {
      if (window.location.hash !== `#${hash}`) {
        window.history.pushState(null, '', `#${hash}`)
      }
    } else {
      if (window.location.hash && window.location.hash !== '#') {
        window.history.pushState(null, '', window.location.pathname + window.location.search)
      }
    }
  }, [currentView, isSpelApp, isTafelApp])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.setAttribute('data-theme', newTheme)
  }

  const handleStart = (type) => {
    setCurrentQuestionnaire(type)
    setCurrentView('questionnaire')
  }

  const handleFinish = (finalAnswers, goToResults = false) => {
    setCompletedTests(prev => ({ ...prev, [currentQuestionnaire]: finalAnswers }))
    if (goToResults) {
      setCurrentView('results')
    } else {
      setCurrentView('home')
    }
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
  }

  const getQuestionData = () => {
    if (currentQuestionnaire === 'ysq') return ysqData
    if (currentQuestionnaire === 'smi') return smiData
    return []
  }

  return (
    <div className="app-container" style={{ position: 'relative' }}>
      {['game-portal', 'tafelopstelling', 'kaartenoverzicht', 'game-rules', 'print-shop', 'home-print-export', 'order-cards', 'about'].includes(currentView) && (
        <GameNavbar currentView={currentView} setCurrentView={setCurrentView} isTafelApp={isTafelApp} isSpelApp={isSpelApp} />
      )}

      {currentView === 'home' && (
        <Home 
          onStart={handleStart} 
          completedTests={completedTests} 
          onViewResults={viewResults} 
          onImport={handleImport}
          onViewGamePortal={() => {
            if (isSpelApp) setCurrentView('game-portal')
            else window.location.href = 'spel.html'
          }}
        />
      )}
      {currentView === 'questionnaire' && (
        <Questionnaire 
          type={currentQuestionnaire} 
          questions={getQuestionData()} 
          initialAnswers={completedTests[currentQuestionnaire]}
          completedTests={completedTests}
          onFinish={handleFinish} 
          onCancel={handleRestart} 
        />
      )}
      {currentView === 'results' && (
        <Results 
          completedTests={completedTests}
          onRestart={handleRestart}
          onBack={() => setCurrentView('home')}
          onViewBasisbehoeften={() => setCurrentView('basisbehoeften')}
          onViewModiCategorieen={() => setCurrentView('modicategorieen')}
          onUpdateAnswer={handleUpdateAnswer}
        />
      )}
      {currentView === 'basisbehoeften' && (
        <Basisbehoeften onBack={() => setCurrentView('results')} />
      )}
      {currentView === 'modicategorieen' && (
        <ModiCategorieen onBack={() => setCurrentView('results')} />
      )}
      {currentView === 'kaartenoverzicht' && (
        <KaartenOverzicht onBack={() => setCurrentView('game-portal')} />
      )}
      {currentView === 'print-shop' && (
        <PrintShopExport 
          onBack={() => setCurrentView('game-portal')} 
          onViewHomePrintExport={() => setCurrentView('home-print-export')}
        />
      )}
      {currentView === 'home-print-export' && (
        <HomePrintExport 
          onBack={() => setCurrentView('game-portal')} 
          onViewPrintShop={() => setCurrentView('print-shop')}
        />
      )}
      {currentView === 'game-rules' && (
        <GameRules onBack={() => setCurrentView('game-portal')} />
      )}
      {currentView === 'tafelopstelling' && (
        <Tafelopstelling 
          onBack={() => {
            if (isTafelApp) window.location.href = 'spel.html'
            else setCurrentView('game-portal')
          }} 
          completedTests={completedTests} 
          embedded={false} 
        />
      )}
      {currentView === 'game-portal' && (
        <GamePortal 
          onBack={() => {
            if (isSpelApp) window.location.href = 'index.html'
            else setCurrentView('home')
          }} 
          onViewTafelopstelling={() => {
            window.location.href = 'tafel.html'
          }}
          onViewKaartenOverzicht={() => setCurrentView('kaartenoverzicht')}
          onViewGameRules={() => setCurrentView('game-rules')}
          onViewPrintShop={() => setCurrentView('print-shop')}
          onViewOrderCards={() => setCurrentView('order-cards')}
          onViewAbout={() => setCurrentView('about')}
        />
      )}
      {currentView === 'order-cards' && (
        <OrderCards onBack={() => setCurrentView('game-portal')} />
      )}
      {currentView === 'about' && (
        <About onBack={() => setCurrentView('game-portal')} />
      )}
      {currentView !== 'questionnaire' && (
        <div className="no-print" style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          v{packageJson.version}
        </div>
      )}
    </div>
  )
}

export default App
