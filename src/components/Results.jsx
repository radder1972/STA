import React, { useState, useEffect } from 'react'
import SingleResult from './SingleResult'
import CombinedAnalysis from './CombinedAnalysis'
import { DownloadIcon, RefreshIcon, ArrowLeftIcon, PlatformBadge } from './Icons'
import ysqData from '../data/ysq-s3.json'
import smiData from '../data/smi.json'

export default function Results({ completedTests, onRestart, onBack, onUpdateAnswer, onViewBasisbehoeften, onViewModiCategorieen }) {
  const hasYsq = !!completedTests.ysq;
  const hasSmi = !!completedTests.smi;
  
  // Default to YSQ if it exists, otherwise SMI
  const [activeTab, setActiveTab] = useState(hasYsq ? 'ysq' : 'smi');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
      <div className="header no-print" style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PlatformBadge theme="test" marginBottom="1.5rem" />
        <h1 className="text-gradient">Schema Therapy Questionnaires</h1>
        <p style={{ color: '#0ea5e9', fontWeight: '600', fontSize: '1.25rem', marginTop: '0.5rem' }}>Rapportage & Analyse</p>
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
          <button className="btn btn-outline" onClick={handlePrint} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <DownloadIcon size={18} /> PDF / Print
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
              style={{ margin: 0, border: 'none' }}
            >
              YSQ (Schema's)
            </button>
            <button 
              className={`btn ${activeTab === 'smi' ? 'btn-gradient' : 'btn-outline'}`}
              onClick={() => setActiveTab('smi')}
              style={{ margin: 0, border: 'none' }}
            >
              SMI (Modi)
            </button>
            <button 
              className={`btn ${activeTab === 'combined' ? 'btn-gradient' : 'btn-outline'}`}
              onClick={() => setActiveTab('combined')}
              style={{ margin: 0, border: 'none' }}
            >
              Analyse
            </button>
          </div>
        </div>
      )}

      <div id="print-area">
        <div style={{ maxWidth: '900px', margin: '0 auto 1.5rem auto', padding: '0.85rem 1.25rem', borderLeft: '4px solid #94a3b8', background: 'rgba(148, 163, 184, 0.12)', borderRadius: '0 10px 10px 0', fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-muted)', textAlign: 'left' }}>
          <strong>Let op:</strong> de YSQ-S3 meet de 18 klassieke schema's en de SMI 14 modi. Schema's of modi daarbuiten (zoals de drie nieuw voorgestelde schema's uit VSt 2021) komen in deze uitkomsten niet naar voren en vragen om uw eigen praktijkobservatie.
        </div>
        {/* Render based on active tab, but for print we always render all available tests */}
        {hasYsq && (
          <div className={activeTab === 'ysq' ? 'print-visible' : 'print-only'}>
            <SingleResult type="ysq" answers={completedTests.ysq} onUpdateAnswer={onUpdateAnswer} onViewBasisbehoeften={onViewBasisbehoeften} />
          </div>
        )}
        
        {hasSmi && (
          <div className={activeTab === 'smi' ? 'print-visible' : 'print-only'} style={{pageBreakBefore: 'always'}}>
            <SingleResult type="smi" answers={completedTests.smi} onUpdateAnswer={onUpdateAnswer} onViewModiCategorieen={onViewModiCategorieen} />
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
