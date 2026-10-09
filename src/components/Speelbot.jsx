import React, { useState, useEffect, useRef } from 'react';
import { Bot, X, Send, User, Sparkles, MessageSquare, Plus, Mic } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ThreeSparklesLogo } from './Icons';
import SparkleEffect from './SparkleEffect';
import SchemaCard from './SchemaCard';
import { getCardColor } from '../utils/colors';

const DEFAULT_KEY = ['x4lUf2byenEbjpA', 'vKjFVKEc6MmRk4LOh5r', 'AQ.Ab8RN6J2MKKxlGjl'].reverse().join('');

const Speelbot = ({ situationText, selectedMode, selectedSchema, selectedNeed, selectedUnmetNeed }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [inputText, setInputText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini_api_key') || DEFAULT_KEY);
  const activeCard = selectedMode || selectedSchema || selectedNeed;
  const [isHovered, setIsHovered] = useState(false);
  const [showAttachMenu, setShowAttachMenu] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const messagesEndRef = useRef(null);

  
  
  // Auto-react when activeCard changes
  useEffect(() => {
    const activeKey = apiKey || localStorage.getItem('gemini_api_key') || DEFAULT_KEY;
    if (!activeCard || !activeKey || messages.length > 5) return;
    
    // Check if the last message was already an auto-react for this card
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.autoReactCard === activeCard.title) return;

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const genAI = new GoogleGenerativeAI(activeKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });
        const triggerPrompt = `De therapeut heeft zojuist de kaart '${activeCard.title}' op tafel gelegd. Geef vanuit deze rol/context één spontane, ultrakorte openingszin (max 1 zin) om het rollenspel te starten. Gebruik blokhaken voor een handeling.`;
        
        const chat = model.startChat({ history: [{ role: 'user', parts: [{ text: "Je bent Speelbot. Reageer in-character." }]}, { role: 'model', parts: [{ text: "Ok." }]}] });
        const result = await chat.sendMessage(triggerPrompt);
        let responseText = await result.response.text();
        responseText = responseText.replace(/\*/g, '');
        
        setMessages(prev => [...prev, { role: 'model', text: responseText, autoReactCard: activeCard.title }]);
        if (messages.length === 0) setIsOpen(true); // Open bot automatically if it's the first interaction!
      } catch (e) { console.error(e); }
      setIsLoading(false);
    }, 1500); // Wait 1.5s after card drop
    
    return () => clearTimeout(timer);
  }, [activeCard?.title, apiKey]);

  useEffect(() => {
    const handleOefen = async (e) => {
      const { promptText } = e.detail;
      setIsOpen(true);
      const activeKey = apiKey || localStorage.getItem('gemini_api_key') || DEFAULT_KEY;
      if (!activeKey) return;
      
      const newMessages = [...messages, { role: 'user', text: promptText }];
      setMessages(newMessages);
      setIsLoading(true);
      
      try {
        const genAI = new GoogleGenerativeAI(activeKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });
        
        const contextText = `Je bent 'Speelbot', een AI-assistent in een web-app voor schematherapie. ${activeCard ? 'Neem de rol aan van: ' + activeCard.title : ''}`;
        
        const chat = model.startChat({
          history: [{ role: 'user', parts: [{ text: contextText }]}, { role: 'model', parts: [{ text: "Begrepen." }]}]
        });
        
        const result = await chat.sendMessage(promptText);
        let responseText = await result.response.text();
        responseText = responseText.replace(/\*/g, '');
        setMessages([...newMessages, { role: 'model', text: responseText }]);
      } catch(err) {
        setMessages([...newMessages, { role: 'model', text: 'Verbinding mislukt.' }]);
      } finally {
        setIsLoading(false);
      }
    };
    window.addEventListener('speelbot:oefen', handleOefen);
    return () => window.removeEventListener('speelbot:oefen', handleOefen);
  }, [messages, apiKey, activeCard]);

  useEffect(() => {
    const key = localStorage.getItem('gemini_api_key') || DEFAULT_KEY;
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

  
  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("Spraakherkenning wordt helaas niet ondersteund in deze browser. Gebruik Google Chrome.");
      return;
    }
    
    const recognition = new SpeechRecognition();
    recognition.lang = 'nl-NL';
    recognition.interimResults = true;
    recognition.continuous = false;
    
    recognition.onstart = () => {
      setIsListening(true);
    };
    
    recognition.onresult = (event) => {
      for (let i = event.resultIndex; i < event.results.length; i++) {
        if (event.results[i].isFinal) {
          setInputText(prev => prev + (prev.length > 0 ? ' ' : '') + event.results[i][0].transcript);
        }
      }
    };
    
    recognition.onerror = (event) => {
      console.error("Speech error", event);
      setIsListening(false);
    };
    
    recognition.onend = () => {
      setIsListening(false);
    };
    
    recognition.start();
  };

  const handleSend = async () => {
    if (!inputText.trim()) return;
    const activeKey = apiKey || localStorage.getItem('gemini_api_key') || DEFAULT_KEY;
    if (!activeKey) {
      alert("Let op: er kon geen verbinding met de Gemini API worden gemaakt.");
      return;
    }

    const newMessages = [...messages, { role: 'user', text: inputText }];
    setMessages(newMessages);
    setInputText('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(activeKey);
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

Houd je antwoorden kort, gespreksmatig en in het Nederlands. Speel echt in op de kaarten die op tafel liggen! BELANGRIJK: Gebruik GEEN sterretjes (*) of markdown-opmaak in je tekst. Als je in een rollenspel een handeling beschrijft, gebruik dan blokhaken, bijvoorbeeld: [zucht diep].
`;

      const history = newMessages.map(msg => {
        if (msg.type === 'card') {
          return { role: msg.role, parts: [{ text: `[De therapeut laat de ${msg.card.type || 'kaart'} '${msg.card.title}' zien]` }] };
        }
        return { role: msg.role, parts: [{ text: msg.text }] };
      });

      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: contextText }] },
          { role: 'model', parts: [{ text: "Begrepen! Ik sta klaar als Speelbot." }] },
          ...history.slice(0, -1) // All except the last user message
        ]
      });

      const result = await chat.sendMessage(newMessages[newMessages.length - 1].text);
      let responseText = await result.response.text();
      responseText = responseText.replace(/\*/g, ''); // Strip asterisks if the AI ignores the prompt

      setMessages([...newMessages, { role: 'model', text: responseText }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'model', text: 'Oeps, er ging iets mis met de verbinding (check je API sleutel).' }]);
    } finally {
      setIsLoading(false);
    }
  };

  
  const handleSendCard = async (card) => {
    const activeKey = apiKey || localStorage.getItem('gemini_api_key') || DEFAULT_KEY;
    if (!activeKey) {
      alert("Let op: er kon geen verbinding met de Gemini API worden gemaakt.");
      return;
    }
    setShowAttachMenu(false);
    const newMessages = [...messages, { role: 'user', type: 'card', card: card }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(activeKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

      const contextText = `
Je bent 'Speelbot', een AI-assistent in een web-app voor schematherapie.
De behandelaar is bezig met een 'Tafelopstelling'.
Huidige context van de tafel:
- Casus: ${situationText || 'Niet ingevuld'}

Houd je antwoorden kort, gespreksmatig en in het Nederlands. Gebruik GEEN sterretjes (*) of markdown-opmaak. Gebruik blokhaken voor handelingen, bijv: [zucht diep].

Belangrijk: Als je tijdens het gesprek voelt dat een bepaald schema, modus of basisbehoefte sterk geraakt wordt (dat nog NIET op tafel ligt), mag je dat suggereren aan de therapeut.
Doe dit door helemaal aan het einde van je bericht (op een nieuwe regel) exact de volgende code te plaatsen:
SUGGEST_CARD: [Naam van de theoriekaart]
Bijvoorbeeld: SUGGEST_CARD: Verlating of SUGGEST_CARD: Straf

Belangrijk: Als je tijdens het gesprek voelt dat een bepaald schema, modus of basisbehoefte sterk geraakt wordt (dat nog NIET op tafel ligt), mag je dat suggereren aan de therapeut.
Doe dit door helemaal aan het einde van je bericht (op een nieuwe regel) exact de volgende code te plaatsen:
SUGGEST_CARD: [Naam van de theoriekaart]
Bijvoorbeeld: SUGGEST_CARD: Verlating of SUGGEST_CARD: Straf
`;

      const history = newMessages.map(msg => {
        if (msg.type === 'card') {
          return { role: msg.role, parts: [{ text: `[De therapeut laat de ${msg.card.type || 'kaart'} '${msg.card.title}' zien]` }] };
        }
        return { role: msg.role, parts: [{ text: msg.text }] };
      });

      const chat = model.startChat({
        history: [
          { role: 'user', parts: [{ text: contextText }] },
          { role: 'model', parts: [{ text: "Begrepen! Ik sta klaar als Speelbot." }] },
          ...history.slice(0, -1)
        ]
      });

      const result = await chat.sendMessage(`[De therapeut laat de kaart '${card.title}' zien]`);
      let responseText = await result.response.text();
      responseText = responseText.replace(/\*/g, '');

      setMessages([...newMessages, { role: 'model', text: responseText }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'model', text: 'Oeps, verbinding mislukt.' }]);
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
          top: '120px',
          right: '24px',
          width: 'auto',
          padding: '0 24px',
          height: '56px',
          borderRadius: '28px',
          background: 'linear-gradient(135deg, #475569 0%, #0284c7 50%, #059669 100%)',
          color: 'white',
          border: 'none',
          boxShadow: '0 8px 25px rgba(59, 130, 246, 0.35)',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '12px',
          zIndex: 9999,
          transition: 'all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)'
        }}
        onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.05) translateY(-3px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(59, 130, 246, 0.45)'; setIsHovered(true); }}
        onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1) translateY(0)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(59, 130, 246, 0.35)'; setIsHovered(false); }}
        title="Speelbot Openen"
      >
        <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {activeCard && activeCard.src ? <img src={activeCard.src} style={{ width: '28px', height: '28px', objectFit: 'contain', filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' }} /> : <Bot size={26} />}
          <div style={{ position: 'absolute', top: '-6px', right: '-10px' }}>
            <ThreeSparklesLogo size={16} theme="white" />
          </div>
        </div>
        <span style={{ fontWeight: '600', fontSize: '1.05rem', letterSpacing: '0.5px' }}>Oefen met AI</span>
      </button>
    );
  }

  return (
    <div style={{
      position: 'fixed',
      top: '120px',
      right: '24px',
      width: '380px',
      height: '550px',
      maxHeight: 'calc(100vh - 140px)',
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
              background: msg.type === 'card' ? 'transparent' : (msg.role === 'user' ? '#0284c7' : 'var(--card-bg)'),
              color: msg.role === 'user' ? 'white' : 'var(--text-main)',
              padding: msg.type === 'card' ? '0' : '10px 14px',
              borderRadius: '14px',
              borderBottomRightRadius: msg.role === 'user' ? '4px' : '14px',
              borderBottomLeftRadius: msg.role === 'model' ? '4px' : '14px',
              boxShadow: msg.type === 'card' ? 'none' : '0 2px 5px rgba(0,0,0,0.05)',
              fontSize: '0.9rem',
              lineHeight: 1.4,
              border: (msg.role === 'model' && msg.type !== 'card') ? '1px solid var(--border-color)' : 'none'
            }}>
              {msg.type === 'card' ? (
                <div style={{ display: 'flex', justifyContent: 'flex-end', margin: '4px 0' }}>
                  <div style={{ pointerEvents: 'auto' }}>
                    <SchemaCard 
                      id={msg.card.id}
                      type={msg.card.type}
                      title={msg.card.title}
                      description={msg.card.description}
                      src={msg.card.src}
                      color={getCardColor(msg.card.type, msg.card.id, msg.card.title)}
                      width="100px"
                      height="142px"
                      flipOnClick={true}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  {msg.text.split(/SUGGEST_CARD:\s*(.+)/i)[0]}
                  {msg.text.match(/SUGGEST_CARD:\s*(.+)/i) && (
                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>💡 De AI suggereert een kaart:</span>
                      <button 
                        onClick={() => {
                          const cardName = msg.text.match(/SUGGEST_CARD:\s*(.+)/i)[1].trim();
                          window.dispatchEvent(new CustomEvent('tafel:selectCard', { detail: { cardName } }));
                        }}
                        style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontWeight: 600 }}
                      >
                         Leg '{msg.text.match(/SUGGEST_CARD:\s*(.+)/i)[1].trim()}' op tafel
                      </button>
                    </div>
                  )}
                </div>
              )}
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
        gap: '8px',
        position: 'relative'
      }}>
        {/* Attachment Menu */}
        {showAttachMenu && (
          <div style={{
            position: 'absolute',
            bottom: '65px',
            left: '12px',
            background: 'var(--bg-color)',
            border: '1px solid var(--border-color)',
            borderRadius: '12px',
            padding: '8px',
            boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            zIndex: 10
          }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 600, color: 'var(--text-muted)', padding: '0 4px' }}>Stuur een kaart van tafel:</div>
            {selectedMode && (
               <button onClick={() => handleSendCard(selectedMode)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '6px', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--card-bg)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                 <img src={selectedMode.src} style={{ width: '20px', height: '20px', objectFit: 'contain' }} /> {selectedMode.title}
               </button>
            )}
            {selectedSchema && (
               <button onClick={() => handleSendCard(selectedSchema)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '6px', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--card-bg)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                 <img src={selectedSchema.src} style={{ width: '20px', height: '20px', objectFit: 'contain' }} /> {selectedSchema.title}
               </button>
            )}
            {selectedNeed && (
               <button onClick={() => handleSendCard(selectedNeed)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '6px 12px', background: 'transparent', border: 'none', cursor: 'pointer', borderRadius: '6px', textAlign: 'left' }} onMouseEnter={e => e.currentTarget.style.background = 'var(--card-bg)'} onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                 <img src={selectedNeed.src} style={{ width: '20px', height: '20px', objectFit: 'contain' }} /> {selectedNeed.title}
               </button>
            )}
            {!selectedMode && !selectedSchema && !selectedNeed && (
              <div style={{ fontSize: '0.8rem', padding: '4px', color: 'var(--text-muted)' }}>Geen kaarten op tafel</div>
            )}
          </div>
        )}
        
        <button
          onClick={() => setShowAttachMenu(!showAttachMenu)}
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '22px',
            background: showAttachMenu ? 'var(--border-color)' : 'transparent',
            color: 'var(--text-main)',
            border: '1px solid var(--border-color)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s'
          }}
        >
          <Plus size={20} />
        </button>

        <button
          onClick={isListening ? undefined : startListening}
          title="Spraakgestuurd typen"
          style={{
            width: '44px',
            height: '44px',
            borderRadius: '22px',
            background: isListening ? 'rgba(239, 68, 68, 0.1)' : 'transparent',
            color: isListening ? '#ef4444' : 'var(--text-muted)',
            border: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            flexShrink: 0,
            transition: 'all 0.2s',
            animation: 'none'
          }}
        >
          <Mic size={20} />
        </button>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={isListening ? "Aan het luisteren..." : "Zeg iets tegen de cliënt..."}
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
