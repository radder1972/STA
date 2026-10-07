const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

// Replace the gradient
code = code.replace(/linear-gradient\(135deg, #3b82f6 0%, #8b5cf6 100%\)/g, "linear-gradient(135deg, #475569 0%, #0284c7 50%, #059669 100%)");

// Replace chat bubble color for user
code = code.replace(/#3b82f6/g, "#0284c7");

// Add ThreeSparklesLogo import
code = code.replace(
  "import { GoogleGenerativeAI } from '@google/generative-ai';",
  "import { GoogleGenerativeAI } from '@google/generative-ai';\nimport { ThreeSparklesLogo } from './Icons';"
);

// Add stars to the floating button
const oldButtonIcon = '<Bot size={30} />';
const newButtonIcon = `
        <div style={{ position: 'relative' }}>
          <Bot size={30} />
          <div style={{ position: 'absolute', top: '-6px', right: '-10px' }}>
            <ThreeSparklesLogo size={12} theme="white" />
          </div>
        </div>
`;
code = code.replace(oldButtonIcon, newButtonIcon);

// Add stars to the header
const oldHeaderIcon = `
          <div style={{ background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%' }}>
            <Bot size={22} />
          </div>
`;
const newHeaderIcon = `
          <div style={{ position: 'relative', background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%' }}>
            <Bot size={22} />
            <div style={{ position: 'absolute', top: '-4px', right: '-8px' }}>
              <ThreeSparklesLogo size={10} theme="white" />
            </div>
          </div>
`;
code = code.replace(oldHeaderIcon, newHeaderIcon);

fs.writeFileSync('src/components/Speelbot.jsx', code);
