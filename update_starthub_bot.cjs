const fs = require('fs');
let code = fs.readFileSync('src/components/StartHub.jsx', 'utf8');

// 1. Add Bot icon to lucide-react imports
if (!code.includes(' Bot,')) {
  code = code.replace(
    "import { Printer, Share2, Sparkles, Wand2, Play, Users, Gamepad2, FileText, ChevronRight, FileDown, Eye, Lightbulb, UserCheck, Shield } from 'lucide-react';",
    "import { Printer, Share2, Sparkles, Wand2, Play, Users, Gamepad2, FileText, ChevronRight, FileDown, Eye, Lightbulb, UserCheck, Shield, Bot } from 'lucide-react';"
  );
}

// 2. Add the bullet point
const oldBullet = `            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Uitgebreide analyse & printbaar</span>
            </div>
          </div>`;

const newBullet = `            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Uitgebreide analyse & printbaar</span>
            </div>
            
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4', background: 'rgba(2, 132, 199, 0.08)', padding: '8px 12px', borderRadius: '8px', border: '1px solid rgba(2, 132, 199, 0.2)', marginTop: '4px' }}>
              <Bot size={18} color="#0284c7" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span><strong>Nieuw:</strong> Oefen direct met de <em>Speelbot</em> (AI-rollenspel)!</span>
            </div>
          </div>`;

code = code.replace(oldBullet, newBullet);

fs.writeFileSync('src/components/StartHub.jsx', code);
