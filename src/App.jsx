import React, { useState, useEffect } from 'react'
import { SunIcon, MoonIcon } from './components/Icons'
import StartHub from './components/StartHub'
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
import PrintProof from './components/PrintProof'
import About from './components/About'
import ModusWeb from './components/ModusWeb'

import Tafelopstelling from './components/Tafelopstelling'
import TafelNavbar from './components/TafelNavbar'
import Snelstartgids from './components/Snelstartgids'
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
  const isTestApp = typeof window !== 'undefined' && (
    window.location.pathname.endsWith('test.html') || 
    window.location.pathname.includes('/test')
  );

  const isTafelApp = typeof window !== 'undefined' && (
    window.location.pathname.endsWith('tafel.html') || 
    window.location.pathname.endsWith('tafelopstelling.html') ||
    window.location.pathname.includes('/tafel')
  );

  const isKaartenApp = typeof window !== 'undefined' && !isTafelApp && !isTestApp && (
    window.location.pathname.endsWith('kaarten.html') || 
    window.location.pathname.endsWith('spel.html') || 
    window.location.pathname.includes('/kaarten') ||
    window.location.pathname.includes('/spel')
  );

  const isSnelstartApp = window.location.pathname.endsWith('snelstart.html');
  const isModusWebApp = window.location.pathname.endsWith('modusweb.html') || window.location.pathname.includes('/modusweb');

  const isHubApp = !isTestApp && !isTafelApp && !isKaartenApp && !isSnelstartApp && !isModusWebApp;

  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash.replace('#', '')
    if (hash === 'verantwoording') return 'verantwoording'
    if (hash === 'drukproef') return 'drukproef';
    if (hash === 'modusweb') return 'modusweb';
    if (isSnelstartApp) return 'snelstart'
    if (isModusWebApp) return 'modusweb'

    if (isHubApp) {
      if (hash === 'test' || hash === 'zelftest') {
        window.location.href = 'test.html'
        return 'hub'
      }
      if (['kaarten', 'spelportaal', 'spelregels', 'theoriekaarten', 'print-shop', 'bestel-kaarten', 'over', 'spel'].includes(hash)) {
        window.location.href = `kaarten.html#${hash}`
        return 'hub'
      }
      if (hash === 'tafelopstelling' || hash === 'tafel') {
        window.location.href = 'tafel.html'
        return 'hub'
      }
      return 'hub'
    }
    if (isTafelApp) {
      if (['kaarten', 'spelportaal', 'spelregels', 'theoriekaarten', 'print-shop', 'bestel-kaarten', 'over', 'spel'].includes(hash)) {
        window.location.href = `kaarten.html#${hash}`
        return 'tafelopstelling'
      }
      if (hash === 'home' || hash === 'hub') {
        window.location.href = 'index.html'
        return 'tafelopstelling'
      }
      if (hash === 'test' || hash === 'zelftest') {
        window.location.href = 'test.html'
        return 'tafelopstelling'
      }
      return 'tafelopstelling'
    }
    if (isKaartenApp) {
      if (hash === 'tafelopstelling' || hash === 'tafel') {
        window.location.href = 'tafel.html'
        return 'game-portal'
      }
      if (hash === 'home' || hash === 'hub') {
        window.location.href = 'index.html'
        return 'game-portal'
      }
      if (hash === 'test' || hash === 'zelftest') {
        window.location.href = 'test.html'
        return 'game-portal'
      }
      if (hash === 'spelregels') return 'game-rules'
      if (hash === 'theoriekaarten' || hash === 'kaarten') return 'kaartenoverzicht'
      if (hash === 'print-shop') return 'print-shop'
      if (hash === 'bestel-kaarten') return 'order-cards'
      if (hash === 'over') return 'about'
      return 'game-portal'
    }
    // isTestApp (test.html)
    if (hash === 'hub' || hash === 'home-hub') {
      window.location.href = 'index.html'
      return 'home'
    }
    if (hash === 'tafelopstelling' || hash === 'tafel') {
      window.location.href = 'tafel.html'
      return 'home'
    }
    if (['kaarten', 'spelregels', 'theoriekaarten', 'print-shop', 'bestel-kaarten', 'over', 'spelportaal', 'spel'].includes(hash)) {
      window.location.href = `kaarten.html#${hash}`
      return 'home'
    }
    return 'home'
  })
  const [aboutTab, setAboutTab] = useState(() => window.location.hash.replace('#', '') === 'verantwoording' ? 'verantwoording' : 'suite')
  const [currentQuestionnaire, setCurrentQuestionnaire] = useState(null)
  const [completedTests, setCompletedTests] = useState({ ysq: null, smi: null })
  const [theme, setTheme] = useState('light')

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', 'light')
    
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '')
      if (hash === 'drukproef') {
        setCurrentView('drukproef')
        return
      }
      if (hash === 'verantwoording') {
        setAboutTab('verantwoording')
        setCurrentView('verantwoording')
        return
      }
      if (isHubApp) {
        if (hash === 'test' || hash === 'zelftest') {
          window.location.href = 'test.html'
          return
        }
        if (['kaarten', 'spelportaal', 'spelregels', 'theoriekaarten', 'print-shop', 'bestel-kaarten', 'over', 'spel'].includes(hash)) {
          window.location.href = `kaarten.html#${hash}`
          return
        }
        if (hash === 'tafelopstelling' || hash === 'tafel') {
          window.location.href = 'tafel.html'
          return
        }
        setCurrentView('hub')
        return
      }
      if (isTafelApp) {
        if (['kaarten', 'spelportaal', 'spelregels', 'theoriekaarten', 'print-shop', 'bestel-kaarten', 'over', 'spel'].includes(hash)) {
          window.location.href = `kaarten.html#${hash}`
          return
        }
        if (hash === 'home' || hash === 'hub') {
          window.location.href = 'index.html'
          return
        }
        if (hash === 'zelftest' || hash === 'test') {
          window.location.href = 'test.html'
          return
        }
        setCurrentView('tafelopstelling')
        return
      }
      if (isKaartenApp) {
        if (hash === 'tafelopstelling' || hash === 'tafel') {
          window.location.href = 'tafel.html'
          return
        }
        if (hash === 'home' || hash === 'hub') {
          window.location.href = 'index.html'
          return
        }
        if (hash === 'zelftest' || hash === 'test') {
          window.location.href = 'test.html'
          return
        }
        if (hash === 'spelportaal' || hash === 'spel' || hash === 'kaarten-home') setCurrentView('game-portal')
        else if (hash === 'spelregels') setCurrentView('game-rules')
        else if (hash === 'theoriekaarten' || hash === 'kaarten') setCurrentView('kaartenoverzicht')
        else if (hash === 'print-shop') setCurrentView('print-shop')
        else if (hash === 'bestel-kaarten') setCurrentView('order-cards')
        else if (hash === 'over') setCurrentView('about')
        else setCurrentView('game-portal')
        return
      }
      // isTestApp
      if (hash === 'hub' || hash === 'home-hub') {
        window.location.href = 'index.html'
        return
      }
      if (hash === 'tafelopstelling' || hash === 'tafel') {
        window.location.href = 'tafel.html'
        return
      }
      if (['kaarten', 'spelregels', 'theoriekaarten', 'print-shop', 'bestel-kaarten', 'over', 'spelportaal', 'spel'].includes(hash)) {
        window.location.href = `kaarten.html#${hash}`
        return
      }
      if (hash === 'results') setCurrentView('results')
      else if (hash === 'basisbehoeften') setCurrentView('basisbehoeften')
      else if (hash === 'modicategorieen') setCurrentView('modicategorieen')
      else setCurrentView('home')
    }
    
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [isKaartenApp, isTafelApp, isTestApp, isHubApp])

  useEffect(() => {
    let hash = ''
    if (currentView === 'game-portal') { hash = 'kaarten-home' }
    else if (currentView === 'game-rules') { hash = 'spelregels' }
    else if (currentView === 'kaartenoverzicht') { hash = 'theoriekaarten' }
    else if (currentView === 'print-shop') { hash = 'print-shop' }
    else if (currentView === 'order-cards') { hash = 'bestel-kaarten' }
    else if (currentView === 'about') { hash = 'over' }
    else if (currentView === 'verantwoording') { hash = 'verantwoording'; window.scrollTo(0, 0) }
    else if (currentView === 'drukproef') { hash = 'drukproef' }
    
    // Dynamic document title
    if (isHubApp) {
      document.title = 'Schematherapie Suite - Startpagina'
    } else if (isTafelApp) {
      document.title = 'Schematherapie Tafelopstelling'
    } else if (isKaartenApp) {
      document.title = 'Schematherapie Kaarten'
    } else {
      document.title = 'Schematherapie Zelftest - YSQ-S3 & SMI Vragenlijsten'
    }

    const faviconLink = document.querySelector("link[rel~='icon']")
    if (faviconLink) {
      faviconLink.href = isHubApp ? './favicon-hub.svg' : (isTafelApp ? './favicon-tafel.svg' : (isKaartenApp ? './favicon-game.svg' : './favicon-test.svg'))
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
  }, [currentView, isKaartenApp, isTafelApp, isHubApp])

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
    <div className={isHubApp ? "hub-wrapper" : "app-container"} style={isHubApp ? { maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' } : { position: 'relative' }}>
      {currentView === 'hub' && (
        <StartHub />
      )}
      {currentView === 'snelstart' && (
        <Snelstartgids onBack={() => { window.location.href = 'index.html' }} />
      )}

      {/* Kaarten Navbar: uitsluitend voor de Kaarten pagina's */}
      {isKaartenApp && ['game-portal', 'kaartenoverzicht', 'game-rules', 'print-shop', 'home-print-export', 'order-cards', 'about', 'verantwoording'].includes(currentView) && (
        <GameNavbar currentView={currentView} setCurrentView={setCurrentView} />
      )}

      {currentView === 'home' && (
        <Home 
          onStart={handleStart} 
          completedTests={completedTests} 
          onViewResults={viewResults} 
          onImport={handleImport}
          onViewGamePortal={() => {
            window.location.href = 'kaarten.html'
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
            window.location.href = 'index.html'
          }} 
          completedTests={completedTests} 
          embedded={false} 
          onOpenAbout={() => { setAboutTab('suite'); setCurrentView('verantwoording') }}
        />
      )}
      {currentView === 'game-portal' && (
        <GamePortal 
          onBack={() => {
            window.location.href = 'index.html'
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
      {currentView === 'modusweb' && (
        <ModusWeb />
      )}

      {currentView === 'drukproef' && (
        <PrintProof />
      )}
      {currentView === 'about' && (
        <About initialTab="suite" onBack={() => setCurrentView('game-portal')} />
      )}
      {/* 'Over' is voor de hele suite dezelfde pagina (About), met dezelfde tabs */}
      {currentView === 'verantwoording' && isKaartenApp && (
        <About key={aboutTab} initialTab={aboutTab} onBack={() => setCurrentView('game-portal')} />
      )}
      {currentView === 'verantwoording' && isTafelApp && (
        <div style={{ width: '100%', maxWidth: '950px', margin: '0 auto', padding: '2rem 1rem 0 1rem', boxSizing: 'border-box' }}>
          <TafelNavbar activeView="over" onOpenTafel={() => setCurrentView('tafelopstelling')} onOpenAbout={() => {}} />
          <About key={aboutTab} initialTab={aboutTab} theme="tafel" />
        </div>
      )}
      {currentView === 'verantwoording' && !isKaartenApp && !isTafelApp && (
        <About key={aboutTab} initialTab={aboutTab} theme={isHubApp ? 'hub' : 'test'} showBadge />
      )}
      {currentView !== 'questionnaire' && currentView !== 'hub' && (
        <div className="no-print" style={{ textAlign: 'center', marginTop: '3rem', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
          v{packageJson.version}
          {currentView !== 'verantwoording' && (
            <>
              {' '}&bull;{' '}
              <a href="#verantwoording" style={{ color: 'var(--text-muted)', textDecoration: 'underline' }}>Verantwoording &amp; privacy</a>
            </>
          )}
        </div>
      )}
    </div>
  )
}

export default App
