import React, { useState } from 'react'
import SingleResult from './SingleResult'
import CombinedAnalysis from './CombinedAnalysis'
import { DownloadIcon, RefreshIcon, ArrowLeftIcon } from './Icons'
import ysqData from '../data/ysq-s3.json'
import smiData from '../data/smi.json'

export default function Results({ completedTests, onRestart, onBack }) {
  const hasYsq = !!completedTests.ysq;
  const hasSmi = !!completedTests.smi;
  
  // Default to combined if both exist, otherwise the one that exists
  const [activeTab, setActiveTab] = useState(hasYsq && hasSmi ? 'combined' : (hasYsq ? 'ysq' : 'smi'));

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

      {hasYsq && hasSmi && (
        <div className="tabs-container no-print" style={{ display: 'flex', justifyContent: 'center', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            className={`btn ${activeTab === 'ysq' ? 'btn-gradient' : 'btn-outline'}`}
            onClick={() => setActiveTab('ysq')}
          >
            YSQ (Schema's)
          </button>
          <button 
            className={`btn ${activeTab === 'smi' ? 'btn-gradient' : 'btn-outline'}`}
            onClick={() => setActiveTab('smi')}
          >
            SMI (Modi)
          </button>
          <button 
            className={`btn ${activeTab === 'combined' ? 'btn-gradient' : 'btn-outline'}`}
            onClick={() => setActiveTab('combined')}
          >
            Gecombineerde Analyse
          </button>
        </div>
      )}

      <div id="print-area">
        {/* Render based on active tab, but for print we always render all available tests */}
        {hasYsq && (
          <div className={activeTab === 'ysq' ? 'print-visible' : 'print-only'}>
            <SingleResult type="ysq" answers={completedTests.ysq} />
          </div>
        )}
        
        {hasSmi && (
          <div className={activeTab === 'smi' ? 'print-visible' : 'print-only'} style={{pageBreakBefore: 'always'}}>
            <SingleResult type="smi" answers={completedTests.smi} />
          </div>
        )}
        
        {hasYsq && hasSmi && (
          <div className={activeTab === 'combined' ? 'print-visible' : 'print-only'} style={{pageBreakBefore: 'always', marginTop: activeTab === 'combined' ? '0' : '4rem'}}>
            <CombinedAnalysis ysqAnswers={completedTests.ysq} smiAnswers={completedTests.smi} />
          </div>
        )}
      </div>
    </div>
  )
}
