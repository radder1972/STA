import React from 'react'
import SingleResult from './SingleResult'
import { DownloadIcon, RefreshIcon, ArrowLeftIcon } from './Icons'
import ysqData from '../data/ysq-s3.json'
import smiData from '../data/smi.json'

export default function Results({ completedTests, onRestart, onBack }) {
  const hasYsq = !!completedTests.ysq;
  const hasSmi = !!completedTests.smi;

  const handlePrint = () => {
    window.print();
  }

  const handleExport = () => {
    // Enrich JSON data with question text
    const enrichedTests = {};
    if (completedTests.ysq) {
      enrichedTests.ysq = Object.keys(completedTests.ysq).map(qId => {
        const question = ysqData.find(q => q.id.toString() === qId.toString());
        return { id: qId, score: completedTests.ysq[qId], text: question ? question.text : '' };
      });
    }
    if (completedTests.smi) {
      enrichedTests.smi = Object.keys(completedTests.smi).map(qId => {
        const question = smiData.find(q => q.id.toString() === qId.toString());
        return { id: qId, score: completedTests.smi[qId], text: question ? question.text : '' };
      });
    }

    const exportData = {
      timestamp: new Date().toISOString(),
      results: enrichedTests
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
    let csvContent = "Vragenlijst,Vraag_ID,Score,Vraag_Tekst\n";
    
    if (completedTests.ysq) {
      Object.entries(completedTests.ysq).forEach(([qId, score]) => {
        const question = ysqData.find(q => q.id.toString() === qId.toString());
        const text = question ? `"${question.text.replace(/"/g, '""')}"` : "";
        csvContent += `YSQ,${qId},${score},${text}\n`;
      });
    }
    
    if (completedTests.smi) {
      Object.entries(completedTests.smi).forEach(([qId, score]) => {
        const question = smiData.find(q => q.id.toString() === qId.toString());
        const text = question ? `"${question.text.replace(/"/g, '""')}"` : "";
        csvContent += `SMI,${qId},${score},${text}\n`;
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
