const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

// 1. Add SparkleEffect import
code = code.replace(
  "import { ThreeSparklesLogo } from './Icons';",
  "import { ThreeSparklesLogo } from './Icons';\nimport SparkleEffect from './SparkleEffect';"
);

// 2. Add isHovered state
code = code.replace(
  "const [apiKey, setApiKey] = useState('');",
  "const [apiKey, setApiKey] = useState('');\n  const [isHovered, setIsHovered] = useState(false);"
);

// 3. Update the floating button
const oldButtonHtml = `        <div style={{ position: 'relative' }}>
          <Bot size={30} />
          <div style={{ position: 'absolute', top: '-6px', right: '-10px' }}>
            <ThreeSparklesLogo size={12} theme="white" />
          </div>
        </div>

      </button>`;

const newButtonHtml = `        <Bot size={30} />
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

      </button>`;

code = code.replace(oldButtonHtml, newButtonHtml);

// Make sure to add event handlers for isHovered on the button
code = code.replace(
  "onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.08)'}",
  "onMouseEnter={(e) => { e.currentTarget.style.transform = 'scale(1.08)'; setIsHovered(true); }}"
);
code = code.replace(
  "onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}",
  "onMouseLeave={(e) => { e.currentTarget.style.transform = 'scale(1)'; setIsHovered(false); }}"
);

// 4. Also increase the stars in the header a bit and add hover effect?
const oldHeaderHtml = `          <div style={{ position: 'relative', background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%' }}>
            <Bot size={22} />
            <div style={{ position: 'absolute', top: '-4px', right: '-8px' }}>
              <ThreeSparklesLogo size={10} theme="white" />
            </div>
          </div>`;
          
const newHeaderHtml = `          <div style={{ position: 'relative', background: 'rgba(255,255,255,0.2)', padding: '6px', borderRadius: '50%' }}>
            <Bot size={22} />
            <div style={{ position: 'absolute', top: '-6px', right: '-10px', filter: 'drop-shadow(0 1px 2px rgba(0,0,0,0.2))' }}>
              <ThreeSparklesLogo size={16} theme="white" />
            </div>
          </div>`;
          
code = code.replace(oldHeaderHtml, newHeaderHtml);

fs.writeFileSync('src/components/Speelbot.jsx', code);
