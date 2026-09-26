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
      <div className="header" style={{ marginTop: '1rem' }}>
        <h1>Schema Therapy Questionnaires</h1>
        <p>Rapportage & Analyse</p>
      </div>

      {/* 1. Top Navigation (Actions) */}
      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', padding: '1rem', margin: '0 auto', flexWrap: 'nowrap', gap: '0.5rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'nowrap', justifyItems: 'center', whiteSpace: 'nowrap' }}>
          <button className="btn btn-outline" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeftIcon size={18} /> Terug naar Start
          </button>
          <button className="btn btn-outline" onClick={onRestart} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <RefreshIcon size={18} /> Alles Wissen
          </button>
          <button className="btn btn-outline" onClick={handleExportCSV} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={18} /> CSV
          </button>
          <button className="btn btn-gradient" onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={18} color="white" /> PDF / Print
          </button>
        </div>
      </div>

      {/* 3. The View Toggles */}
      {hasYsq && hasSmi && (
        <div className="tabs-container no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '12px', gap: '8px' }}>
            <button 
              className={`btn ${activeTab === 'ysq' ? 'btn-gradient' : 'btn-outline'}`}
              onClick={() => setActiveTab('ysq')}
              style={{ margin: 0, border: 'none', background: activeTab === 'ysq' ? 'var(--primary)' : 'transparent', color: activeTab === 'ysq' ? 'white' : 'var(--text-muted)' }}
            >
              YSQ (Schema's)
            </button>
            <button 
              className={`btn ${activeTab === 'smi' ? 'btn-gradient' : 'btn-outline'}`}
              onClick={() => setActiveTab('smi')}
              style={{ margin: 0, border: 'none', background: activeTab === 'smi' ? 'var(--primary)' : 'transparent', color: activeTab === 'smi' ? 'white' : 'var(--text-muted)' }}
            >
              SMI (Modi)
            </button>
            <button 
              className={`btn ${activeTab === 'combined' ? 'btn-gradient' : 'btn-outline'}`}
              onClick={() => setActiveTab('combined')}
              style={{ margin: 0, border: 'none', background: activeTab === 'combined' ? 'var(--primary)' : 'transparent', color: activeTab === 'combined' ? 'white' : 'var(--text-muted)' }}
            >
              Gecombineerde Analyse
            </button>
          </div>
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
