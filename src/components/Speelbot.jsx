import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, User, Sparkles, MessageSquare } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ThreeSparklesLogo } from './Icons';
import SparkleEffect from './SparkleEffect';

const Speelbot = ({ situationText, selectedMode, selectedSchema, selectedNeed, selectedUnmetNeed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const key = localStorage.getItem('gemini_api_key');
    if (key) setApiKey(key);
  }, []);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // If chat is opened for the first time and empty, add a greeting
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([{
        role: 'model',
        text: 'Hoi! Ik ben de Speelbot 🤖. Ik kan de rol aannemen van de cliënt in de modus die op tafel ligt, of met je meedenken over de opstelling. Wat wil je oefenen?'
      }]);
    }
  }, [isOpen, messages.length]);

  const handleSend = async () => {
    if (!inputText.trim()) return;
    if (!apiKey) {
      alert("Let op: je hebt nog geen Gemini API sleutel ingesteld. Ga naar de instellingen om dit te doen.");
      return;
    }

    const newMessages = [...messages, { role: 'user', text: inputText }];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

      const contextText = `
Je bent 'Speelbot', een AI-assistent in een web-app voor schematherapie.
De behandelaar is bezig met een 'Tafelopstelling' (het uitleggen van kaarten).
Huidige context van de tafel:
- Casus/Situatie: ${situationText || 'Niet ingevuld'}
- Modus op tafel: ${selectedMode ? selectedMode.title : 'Geen'}
- Schema op tafel: ${selectedSchema ? selectedSchema.title : 'Geen'}
- Basisbehoefte: ${selectedNeed ? selectedNeed.title : selectedUnmetNeed || 'Geen'}

Je kunt twee dingen doen:
1. Rollenspel: Speel de cliënt vanuit de actieve modus (bijv. als het 'Boze Kind' op tafel ligt, reageer dan boos/gefrustreerd op de therapeut).
2. Meedenken: Geef advies over de tafelopstelling als de therapeut daar om vraagt.

Houd je antwoorden kort, krachtig en in het Nederlands. Speel echt in op de kaarten die op tafel liggen!
`;

      const history = newMessages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));

      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: contextText }] },
          { role: 'model', parts: [{ text: "Begrepen! Ik sta klaar als Speelbot." }] },
          ...history.slice(0, -1) // All except the last user message
        ]
      });

      const result = await chat.sendMessage(newMessages[newMessages.length - 1].text);
      const responseText = await result.response.text();

      setMessages([...newMessages, { role: 'model', text: responseText }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'model', text: 'Oeps, er ging iets mis met de verbinding (check je API sleutel).' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  if (!isOpen) {
    return (
      <button 
        onClick={() => setIsOpen(true)}
        style={{
          position: 'fixed',
          bottom: '24px',
          right: '24px',
          width: '60px',
          height: '60px',
          borderRadius: '30px',
          background: 'linear-gradient(135deg, #475569 0%, #0284c7 50%, #059669 100%)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.4)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 9999,
          transition: 'transform 0.2s',
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; setIsHovered(true); }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; setIsHovered(false); }}
        title="Speelbot Openen"
      >
        
        <Bot size={30} />
        {isHovered && <SparkleEffect count={8} />}
        
        {/* Grotere sterren die voor de helft buiten de knop vallen */}
        <div style={{ 
          position: 'absolute', 
          top: '-8px', 
          right: '-12px',
          filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
          transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'scale(1) rotate(0deg)',
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}>
          <ThreeSparklesLogo size={22} theme="white" />
        </div>

      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      right: '24px',
      width: '360px',
      height: '500px',
      backgroundColor: 'var(--bg-color)',
      borderRadius: '16px',
      boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
      display: 'flex',
      flexDirection: 'column',
      zIndex: 9999,
      overflow: 'hidden',
      border: '1px solid var(--border-color)'
    }}>
      {/* Header */}
      <div style={{
        background: 'linear-gradient(135deg, #475569 0%, #0284c7 50%, #059669 100%)',
        padding: '16px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        color: 'white'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{ position: 'relative', background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%' }}>
            <Bot size={22} />
            <div style={{ position: 'absolute', top: '-6px', right: '-10px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
              <ThreeSparklesLogo size={16} theme="white" />
            </div>
          </div>
          <div>
            <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700 }}>Speelbot</h3>
            <div style={{ fontSize: '0.75rem', opacity: 0.9 }}>Interactieve Rollenspel AI</div>
          </div>
        </div>
        <button 
          onClick={() => setIsOpen(false)}
          style={{ background: 'transparent', border: 'none', color: 'white', cursor: 'pointer', padding: '4px', display: 'flex' }}
        >
          <X size={24} />
        </button>
      </div>

      {/* Chat Area */}
      <div style={{
        flex: 1,
        padding: '16px',
        overflowY: 'auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
        background: 'var(--bg-color)'
      }}>
        {messages.map((msg, idx) => (
          <div key={idx} style={{
            alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
            maxWidth: '85%',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <div style={{
              fontSize: '0.75rem',
              color: 'var(--text-muted)',
              marginLeft: '4px',
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start'
            }}>
              {msg.role === 'user' ? <User size={12} /> : <Sparkles size={12} />}
              {msg.role === 'user' ? 'Jij' : 'Speelbot'}
            </div>
            <div style={{
              background: msg.role === 'user' ? '#0284c7' : 'var(--card-bg)',
              color: msg.role === 'user' ? 'white' : 'var(--text-main)',
              padding: '10px 14px',
              borderRadius: '14px',
              borderBottomRightRadius: msg.role === 'user' ? '4px' : '14px',
              borderBottomLeftRadius: msg.role === 'model' ? '4px' : '14px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              fontSize: '0.9rem',
              lineHeight: 1.4,
              border: msg.role === 'model' ? '1px solid var(--border-color)' : 'none'
            }}>
              {msg.text}
            </div>
          </div>
        ))}
        {isLoading && (
          <div style={{ alignSelf: 'flex-start', color: 'var(--text-muted)', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', padding: '8px' }}>
            <Bot size={16} className="animate-pulse" /> Typen...
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div style={{
        padding: '12px',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--card-bg)',
        display: 'flex',
        gap: '8px'
      }}>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Zeg iets tegen de cliënt..."
          style={{
            flex: 1,
            padding: '10px 14px',
            borderRadius: '20px',
            border: '1px solid var(--border-color)',
            background: 'var(--bg-color)',
            color: 'var(--text-main)',
            fontSize: '0.9rem',
            resize: 'none',
            height: '44px',
            outline: 'none',
            fontFamily: 'inherit'
          }}
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !inputText.trim()}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '22px',
            background: (isLoading || !inputText.trim()) ? 'var(--border-color)' : '#0284c7',
            color: 'white',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: (isLoading || !inputText.trim()) ? 'not-allowed' : 'pointer',
            transition: 'background 0.2s'
          }}
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default Speelbot;
