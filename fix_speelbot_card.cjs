const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

// 1. Add SchemaCard and getCardColor imports
code = code.replace(
  "import SparkleEffect from './SparkleEffect';",
  "import SparkleEffect from './SparkleEffect';\nimport SchemaCard from './SchemaCard';\nimport { getCardColor } from '../utils/colors';"
);

// 2. Replace the simple image render with SchemaCard
const oldMessageRender = `{msg.type === 'card' ? (
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}>
                  <img src={msg.card.src} alt={msg.card.title} style={{ width: '80px', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }} />
                  <span style={{ fontSize: '0.8rem', fontWeight: 600 }}>{msg.card.title}</span>
                </div>
              ) : (
                msg.text
              )}`;

const newMessageRender = `{msg.type === 'card' ? (
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
                msg.text
              )}`;

code = code.replace(oldMessageRender, newMessageRender);

// Wait, the chat message container has a blue background for the user.
// If the message is a card, we shouldn't draw the blue bubble around it!
// Let's modify the styling of the message bubble if msg.type === 'card'
const bubbleStyleOld = `background: msg.role === 'user' ? '#0284c7' : 'var(--card-bg)',
              color: msg.role === 'user' ? 'white' : 'var(--text-main)',
              padding: '10px 14px',
              borderRadius: '14px',
              borderBottomRightRadius: msg.role === 'user' ? '4px' : '14px',
              borderBottomLeftRadius: msg.role === 'model' ? '4px' : '14px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.05)',
              fontSize: '0.9rem',
              lineHeight: 1.4,
              border: msg.role === 'model' ? '1px solid var(--border-color)' : 'none'`;

const bubbleStyleNew = `background: msg.type === 'card' ? 'transparent' : (msg.role === 'user' ? '#0284c7' : 'var(--card-bg)'),
              color: msg.role === 'user' ? 'white' : 'var(--text-main)',
              padding: msg.type === 'card' ? '0' : '10px 14px',
              borderRadius: '14px',
              borderBottomRightRadius: msg.role === 'user' ? '4px' : '14px',
              borderBottomLeftRadius: msg.role === 'model' ? '4px' : '14px',
              boxShadow: msg.type === 'card' ? 'none' : '0 2px 5px rgba(0,0,0,0.05)',
              fontSize: '0.9rem',
              lineHeight: 1.4,
              border: (msg.role === 'model' && msg.type !== 'card') ? '1px solid var(--border-color)' : 'none'`;

code = code.replace(bubbleStyleOld, bubbleStyleNew);

fs.writeFileSync('src/components/Speelbot.jsx', code);
