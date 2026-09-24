import React from 'react'
import SingleResult from './SingleResult'
import { DownloadIcon, RefreshIcon, ArrowLeftIcon } from './Icons'

export default function Results({ completedTests, onRestart, onBack }) {
  const hasYsq = !!completedTests.ysq;
  const hasSmi = !!completedTests.smi;

  const handlePrint = () => {
    window.print();
  }

  const handleExport = () => {
    const exportData = {
      timestamp: new Date().toISOString(),
      completedTests
    };
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `schema_therapy_results.json`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  const handleExportCSV = () => {
    let csvContent = "Vragenlijst,Vraag_ID,Antwoord_Score\n";
    
    if (completedTests.ysq) {
      Object.entries(completedTests.ysq).forEach(([qId, score]) => {
        csvContent += `YSQ,${qId},${score}\n`;
      });
    }
    
    if (completedTests.smi) {
      Object.entries(completedTests.smi).forEach(([qId, score]) => {
        csvContent += `SMI,${qId},${score}\n`;
      });
    }
    
    const dataStr = "data:text/csv;charset=utf-8," + encodeURIComponent(csvContent);
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", `schema_therapy_results.csv`);
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }

  return (
    <div className="combined-results-container">
      <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem', maxWidth: '900px', margin: '0 auto', flexWrap: 'wrap', gap: '1rem' }}>
        <button className="btn btn-outline" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeftIcon size={18} /> Terug naar Menu
        </button>
        
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
          <button className="btn btn-outline" onClick={handleExport} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={18} /> JSON
          </button>
          <button className="btn btn-outline" onClick={handleExportCSV} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={18} /> CSV
          </button>
          <button className="btn btn-gradient" onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={18} color="white" /> Sla op als PDF / Print
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
