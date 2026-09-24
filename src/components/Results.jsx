import React from 'react'
import SingleResult from './SingleResult'
import { DownloadIcon, RefreshIcon, ArrowLeftIcon } from './Icons'

export default function Results({ completedTests, onRestart, onBack }) {
  const hasYsq = !!completedTests.ysq;
  const hasSmi = !!completedTests.smi;

  const handlePrint = () => {
    window.print();
  }

  return (
    <div className="combined-results-container">
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', maxWidth: '900px', margin: '0 auto' }}>
        <button className="btn btn-outline" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeftIcon size={18} /> Terug naar Menu
        </button>
        
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button className="btn" onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={18} /> Sla op als PDF / Print
          </button>
          <button className="btn btn-outline" onClick={onRestart} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshIcon size={18} /> Alles Wissen
          </button>
        </div>
      </div>

      <div id="print-area">
        {hasYsq && <SingleResult type="ysq" answers={completedTests.ysq} />}
        {hasSmi && <div style={{pageBreakBefore: 'always'}}><SingleResult type="smi" answers={completedTests.smi} /></div>}
      </div>
    </div>
  )
}
