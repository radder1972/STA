const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

// 1. Add Plus icon to lucide-react import
code = code.replace(
  "import { Bot, X, Send, User, Sparkles, MessageSquare } from 'lucide-react';",
  "import { Bot, X, Send, User, Sparkles, MessageSquare, Plus } from 'lucide-react';"
);

// 2. Add state for the attachment menu
code = code.replace(
  "const [isHovered, setIsHovered] = useState(false);",
  "const [isHovered, setIsHovered] = useState(false);\n  const [showAttachMenu, setShowAttachMenu] = useState(false);"
);

// 3. Add handleSendCard function
const handleSendCardCode = `
  const handleSendCard = async (card) => {
    if (!apiKey) {
      alert("Let op: je hebt nog geen Gemini API sleutel ingesteld.");
      return;
    }
    setShowAttachMenu(false);
    const newMessages = [...messages, { role: 'user', type: 'card', card: card }];
    setMessages(newMessages);
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-3.8-flash" });

      const contextText = \`
Je bent 'Speelbot', een AI-assistent in een web-app voor schematherapie.
De behandelaar is bezig met een 'Tafelopstelling'.
Huidige context van de tafel:
- Casus: \${situationText || 'Niet ingevuld'}

Houd je antwoorden kort, gespreksmatig en in het Nederlands. Gebruik GEEN sterretjes (*) of markdown-opmaak. Gebruik blokhaken voor handelingen, bijv: [zucht diep].
\`;

      const history = newMessages.map(msg => {
        if (msg.type === 'card') {
          return { role: msg.role, parts: [{ text: \`[De therapeut laat de \${msg.card.type || 'kaart'} '\${msg.card.title}' zien]\` }] };
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

      const result = await chat.sendMessage(\`[De therapeut laat de kaart '\${card.title}' zien]\`);
      let responseText = await result.response.text();
      responseText = responseText.replace(/\\*/g, '');

      setMessages([...newMessages, { role: 'model', text: responseText }]);
    } catch (err) {
      console.error(err);
      setMessages([...newMessages, { role: 'model', text: 'Oeps, verbinding mislukt.' }]);
    } finally {
      setIsLoading(false);
    }
  };
`;

// Wait, we need to inject handleSendCard before handleKeyDown
code = code.replace(
  "const handleKeyDown = (e) => {",
  handleSendCardCode + "\n  const handleKeyDown = (e) => {"
);

// We need to also modify handleSend to use the new history mapping logic
const oldHistoryMapping = `      const history = newMessages.map(msg => ({
        role: msg.role,
        parts: [{ text: msg.text }]
      }));`;
const newHistoryMapping = `      const history = newMessages.map(msg => {
        if (msg.type === 'card') {
          return { role: msg.role, parts: [{ text: \`[De therapeut laat de \${msg.card.type || 'kaart'} '\${msg.card.title}' zien]\` }] };
        }
        return { role: msg.role, parts: [{ text: msg.text }] };
      });`;
code = code.replace(oldHistoryMapping, newHistoryMapping);

// 4. Update the render of messages to support type === 'card'
const oldMessageRender = `{msg.text}`;
const newMessageRender = `{msg.type === 'card' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <img src={msg.card.src} alt={msg.card.title} style={{ width: '80px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{msg.card.title}</span>
                </div>
              ) : (
                msg.text
              )}`;
code = code.replace(oldMessageRender, newMessageRender);

// 5. Add the [+] button to the input area and the popup menu
const oldInputArea = `<div style={{
        padding: '12px',
        borderTop: '1px solid var(--border-color)',
        background: 'var(--card-bg)',
        display: 'flex',
        gap: '8px'
      }}>`;
const newInputArea = `<div style={{
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
`;
code = code.replace(oldInputArea, newInputArea);

fs.writeFileSync('src/components/Speelbot.jsx', code);
