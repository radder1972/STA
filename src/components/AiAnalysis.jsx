import React, { useState, useEffect } from 'react';
import { BrainIcon, AlertTriangleIcon } from './Icons';

export default function AiAnalysis({ ysqData, smiData }) {
  const [apiKey, setApiKey] = useState('');
  const [isKeySaved, setIsKeySaved] = useState(false);
  const [loading, setLoading] = useState(false);
  const [analysisResult, setAnalysisResult] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const savedKey = localStorage.getItem('gemini_api_key');
    if (savedKey) {
      setApiKey(savedKey);
      setIsKeySaved(true);
    }
  }, []);

  const handleSaveKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini_api_key', apiKey.trim());
      setIsKeySaved(true);
    }
  };

  const handleClearKey = () => {
    localStorage.removeItem('gemini_api_key');
    setApiKey('');
    setIsKeySaved(false);
    setAnalysisResult('');
  };

  const formatPrompt = () => {
    const topYsq = ysqData?.slice(0, 3).map(s => `${s.name} (Score: ${s.mean})`).join(', ') || 'Geen YSQ data';
    const topSmi = smiData?.slice(0, 3).map(s => `${s.name} (Score: ${s.mean})`).join(', ') || 'Geen SMI data';

    return `Je bent een empathische en professionele expert in schematherapie. Hier zijn de hoogst scorende schema's en modi van een cliënt:

Top 3 Schema's (YSQ): ${topYsq}
Top 3 Modi (SMI): ${topSmi}

Schrijf een korte, heldere klinische analyse (maximaal 3 alinea's) over de waarschijnlijke wisselwerking tussen deze specifieke schema's en modi. Hoe triggeren deze schema's dit specifieke coping/modus gedrag? Gebruik begrijpelijke, professionele taal in het Nederlands. Formatteer de tekst in simpele alinea's (gebruik eventueel dikgedrukt voor namen van schema's/modi). Geef GEEN disclaimers over dat je een AI bent, spreek direct als de expert.`;
  };

  const generateAnalysis = async () => {
    if (!apiKey) return;
    setLoading(true);
    setError('');
    
    try {
      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{ text: formatPrompt() }]
          }]
        })
      });

      if (!response.ok) {
        let errorText = '';
        try {
          const errorJson = await response.json();
          errorText = errorJson.error?.message || JSON.stringify(errorJson);
        } catch (e) {
          errorText = await response.text();
        }
        throw new Error(`HTTP ${response.status}: ${errorText}`);
      }

      const data = await response.json();
      const text = data.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (text) {
        setAnalysisResult(text);
      } else {
        throw new Error('Geen geldige tekst ontvangen van Gemini.');
      }
    } catch (err) {
      console.error(err);
      setError(`Fout: ${err.message || 'Onbekende fout'}. Controleer de console (F12) voor meer details.`);
    } finally {
      setLoading(false);
    }
  };

  const renderFormattedText = (text) => {
    return text.split('\n').map((paragraph, index) => {
      if (!paragraph.trim()) return null;
      // Handle simple bold parsing **bold**
      const parts = paragraph.split(/(\*\*.*?\*\*)/g);
      return (
        <p key={index} style={{ marginBottom: '1rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
          {parts.map((part, i) => {
            if (part.startsWith('**') && part.endsWith('**')) {
              return <strong key={i}>{part.slice(2, -2)}</strong>;
            }
            return part;
          })}
        </p>
      );
    });
  };

  return (
    <div className="glass-panel" style={{ padding: '2rem', border: '1px solid var(--border-color)', borderRadius: '16px', marginTop: '3rem' }}>
      <h2 className="text-gradient" style={{ marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <BrainIcon size={28} useGradient={true} /> AI Klinische Analyse
      </h2>
      
      <p className="no-print" style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
        Genereer een interpretatie van de wisselwerking tussen de schema's en modi met behulp van AI.
      </p>

      {!isKeySaved ? (
        <div className="no-print" style={{ background: 'rgba(0,0,0,0.02)', padding: '1.5rem', borderRadius: '12px', border: '1px solid var(--border-color)' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', marginBottom: '1rem' }}>
            <AlertTriangleIcon size={24} color="#f59e0b" style={{ flexShrink: 0, marginTop: '2px' }} />
            <div>
              <h4 style={{ margin: '0 0 0.5rem 0', color: 'var(--text-main)' }}>Privacy & Bring Your Own Key</h4>
              <p style={{ fontSize: '0.9rem', color: 'var(--text-muted)', lineHeight: '1.5', margin: 0 }}>
                Om uw privacy te garanderen, draait deze app volledig lokaal. Om de AI te gebruiken, moet u eenmalig uw eigen (gratis) Google Gemini API-sleutel invoeren. Deze wordt veilig opgeslagen in uw eigen browser. Zodra u genereert, worden enkel uw Top 3 scores (geen persoonsgegevens) naar Google gestuurd.
              </p>
            </div>
          </div>
          
          <div style={{ marginTop: '0.5rem', marginBottom: '1.5rem', fontSize: '0.9rem' }}>
            Heeft u nog geen sleutel? <a href="https://aistudio.google.com/app/apikey" target="_blank" rel="noreferrer" style={{ color: '#0ea5e9', textDecoration: 'underline' }}>Haal hier gratis een Gemini API sleutel op</a>.
          </div>
          
          <div style={{ display: 'flex', gap: '10px' }}>
            <input 
              type="password" 
              placeholder="Plak uw Gemini API Key hier..." 
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              style={{ flex: 1, padding: '10px 14px', borderRadius: '8px', border: '1px solid var(--border-color)', background: 'var(--bg-color)', color: 'var(--text-main)' }}
            />
            <button 
              className="btn btn-primary" 
              onClick={handleSaveKey}
              disabled={!apiKey.trim()}
            >
              Opslaan
            </button>
          </div>
        </div>
      ) : (
        <div className="no-print" style={{ marginBottom: '2rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)' }}>
            ✓ API sleutel gekoppeld
          </span>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button 
              className="btn btn-outline"
              onClick={handleClearKey}
              style={{ padding: '8px 16px', fontSize: '0.9rem' }}
            >
              Wissen
            </button>
            <button 
              className="btn btn-primary"
              onClick={generateAnalysis}
              disabled={loading}
              style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
            >
              {loading ? (
                <>
                  <span className="spinner" style={{ width: '16px', height: '16px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite', display: 'inline-block' }}></span>
                  Analyseren...
                </>
              ) : (
                'Genereer Analyse'
              )}
            </button>
          </div>
        </div>
      )}

      {error && (
        <div className="no-print" style={{ padding: '1rem', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', borderRadius: '8px', marginTop: '1rem' }}>
          {error}
        </div>
      )}

      {analysisResult && (
        <div className="ai-result-box" style={{ marginTop: '2rem', padding: '1.5rem', background: 'rgba(56, 189, 248, 0.05)', border: '1px solid rgba(56, 189, 248, 0.3)', borderRadius: '12px' }}>
          <h3 style={{ color: '#0ea5e9', marginBottom: '1.5rem', marginTop: 0, fontSize: '1.2rem' }}>Klinische Interpretatie</h3>
          <div className="ai-content">
            {renderFormattedText(analysisResult)}
          </div>
        </div>
      )}

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
