const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

// --- 1. Bot Suggestions Parsing ---
// We need to change how msg.text is rendered to parse SUGGEST_CARD
const oldMessageRender = `              ) : (
                msg.text
              )}`;
              
const newMessageRender = `              ) : (
                <div>
                  {msg.text.split(/SUGGEST_CARD:\\s*(.+)/i)[0]}
                  {msg.text.match(/SUGGEST_CARD:\\s*(.+)/i) && (
                    <div style={{ marginTop: '10px', paddingTop: '10px', borderTop: '1px dashed rgba(0,0,0,0.1)' }}>
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'block', marginBottom: '4px' }}>💡 De AI suggereert een kaart:</span>
                      <button 
                        onClick={() => {
                          const cardName = msg.text.match(/SUGGEST_CARD:\\s*(.+)/i)[1].trim();
                          window.dispatchEvent(new CustomEvent('tafel:selectCard', { detail: { cardName } }));
                        }}
                        style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', padding: '6px 12px', borderRadius: '6px', cursor: 'pointer', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px', color: '#0284c7', fontWeight: 600 }}
                      >
                         Leg '{msg.text.match(/SUGGEST_CARD:\\s*(.+)/i)[1].trim()}' op tafel
                      </button>
                    </div>
                  )}
                </div>
              )}`;
code = code.replace(oldMessageRender, newMessageRender);


// --- 2. Update Prompt for Suggestions ---
const oldPrompt = `Houd je antwoorden kort, gespreksmatig en in het Nederlands. Gebruik GEEN sterretjes (*) of markdown-opmaak. Gebruik blokhaken voor handelingen, bijv: [zucht diep].`;
const newPrompt = `Houd je antwoorden kort, gespreksmatig en in het Nederlands. Gebruik GEEN sterretjes (*) of markdown-opmaak. Gebruik blokhaken voor handelingen, bijv: [zucht diep].

Belangrijk: Als je tijdens het gesprek voelt dat een bepaald schema, modus of basisbehoefte sterk geraakt wordt (dat nog NIET op tafel ligt), mag je dat suggereren aan de therapeut.
Doe dit door helemaal aan het einde van je bericht (op een nieuwe regel) exact de volgende code te plaatsen:
SUGGEST_CARD: [Naam van de theoriekaart]
Bijvoorbeeld: SUGGEST_CARD: Verlating of SUGGEST_CARD: Straf`;
code = code.replace(oldPrompt, newPrompt);


// --- 3. Event Listener for "Oefen dit direct" (External Trigger) ---
// We add a useEffect to listen to 'speelbot:oefen'
const eventListener = `
  useEffect(() => {
    const handleOefen = async (e) => {
      const { promptText } = e.detail;
      setIsOpen(true);
      if (!apiKey) return;
      
      const newMessages = [...messages, { role: 'user', text: promptText }];
      setMessages(newMessages);
      setIsLoading(true);
      
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });
        
        const contextText = \`Je bent 'Speelbot', een AI-assistent in een web-app voor schematherapie. \${activeCard ? 'Neem de rol aan van: ' + activeCard.title : ''}\`;
        
        const chat = model.startChat({
          history: [{ role: 'user', parts: [{ text: contextText }]}, { role: 'model', parts: [{ text: "Begrepen." }]}]
        });
        
        const result = await chat.sendMessage(promptText);
        let responseText = await result.response.text();
        responseText = responseText.replace(/\\*/g, '');
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
`;

code = code.replace(
  "useEffect(() => {",
  eventListener + "\n  useEffect(() => {"
);


// --- 4. Auto-react on Card Change ---
const autoReactCode = `
  // Auto-react when activeCard changes
  useEffect(() => {
    if (!activeCard || !apiKey || messages.length > 5) return;
    
    // Check if the last message was already an auto-react for this card
    const lastMsg = messages[messages.length - 1];
    if (lastMsg && lastMsg.autoReactCard === activeCard.title) return;

    const timer = setTimeout(async () => {
      setIsLoading(true);
      try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });
        const triggerPrompt = \`De therapeut heeft zojuist de kaart '\${activeCard.title}' op tafel gelegd. Geef vanuit deze rol/context één spontane, ultrakorte openingszin (max 1 zin) om het rollenspel te starten. Gebruik blokhaken voor een handeling.\`;
        
        const chat = model.startChat({ history: [{ role: 'user', parts: [{ text: "Je bent Speelbot. Reageer in-character." }]}, { role: 'model', parts: [{ text: "Ok." }]}] });
        const result = await chat.sendMessage(triggerPrompt);
        let responseText = await result.response.text();
        responseText = responseText.replace(/\\*/g, '');
        
        setMessages(prev => [...prev, { role: 'model', text: responseText, autoReactCard: activeCard.title }]);
        if (messages.length === 0) setIsOpen(true); // Open bot automatically if it's the first interaction!
      } catch (e) { console.error(e); }
      setIsLoading(false);
    }, 1500); // Wait 1.5s after card drop
    
    return () => clearTimeout(timer);
  }, [activeCard?.title, apiKey]);
`;

code = code.replace(
  "useEffect(() => {",
  autoReactCode + "\n  useEffect(() => {"
);


fs.writeFileSync('src/components/Speelbot.jsx', code);
