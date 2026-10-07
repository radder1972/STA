const fs = require('fs');
let code = fs.readFileSync('src/components/About.jsx', 'utf8');

// 1. Add Bot import
code = code.replace(
  "import imgMatthias from '../assets/images/team/matthias.jpg';",
  "import imgMatthias from '../assets/images/team/matthias.jpg';\nimport { Bot } from 'lucide-react';"
);

// 2. Fix Sanne's title
const sanneOld = `<span style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4', display: 'block', marginTop: '0.2rem' }}>Klinisch psycholoog &amp; senior schematherapeut</span>`;
const sanneNew = `<span style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4', display: 'block', marginTop: '0.2rem' }}>Senior schematherapeut &amp; opleider</span>`;
code = code.replace(sanneOld, sanneNew);

// 3. Fix Jeroen's title
const jeroenOld = `<span style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4', display: 'block', marginTop: '0.2rem' }}>GZ-psycholoog &amp; systeemtherapeut</span>`;
const jeroenNew = `<span style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4', display: 'block', marginTop: '0.2rem' }}>Schematherapeut &amp; systeemtherapeut</span>`;
code = code.replace(jeroenOld, jeroenNew);

// 4. Add Speelbot as the 3rd team member
const teamEndOld = `              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img src={imgJeroen} alt="Jeroen van der Meer" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: \`3px solid \${accent}\` }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '1.2rem', color: '#0f172a' }}>Jeroen van der Meer</strong>
                  <span style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4', display: 'block', marginTop: '0.2rem' }}>Schematherapeut &amp; systeemtherapeut</span>
                  <span style={{ color: accent, fontSize: '0.85rem', fontStyle: 'italic', display: 'block', marginTop: '0.35rem' }}>Kent geen Onthechte beschermer, hooguit een stand-bymodus.</span>
                </div>
              </div>
            </div>`;

const teamEndNew = `              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <img src={imgJeroen} alt="Jeroen van der Meer" style={{ width: '90px', height: '90px', borderRadius: '50%', objectFit: 'cover', border: \`3px solid \${accent}\` }} />
                <div>
                  <strong style={{ display: 'block', fontSize: '1.2rem', color: '#0f172a' }}>Jeroen van der Meer</strong>
                  <span style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4', display: 'block', marginTop: '0.2rem' }}>Schematherapeut &amp; systeemtherapeut</span>
                  <span style={{ color: accent, fontSize: '0.85rem', fontStyle: 'italic', display: 'block', marginTop: '0.35rem' }}>Kent geen Onthechte beschermer, hooguit een stand-bymodus.</span>
                </div>
              </div>
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <div style={{ width: '90px', height: '90px', borderRadius: '50%', background: 'linear-gradient(135deg, #475569, #0284c7, #059669)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: \`3px solid \${accent}\`, flexShrink: 0 }}>
                  <Bot size={40} color="white" />
                </div>
                <div>
                  <strong style={{ display: 'block', fontSize: '1.2rem', color: '#0f172a' }}>Speelbot</strong>
                  <span style={{ color: '#64748b', fontSize: '0.95rem', lineHeight: '1.4', display: 'block', marginTop: '0.2rem' }}>Virtuele Trainingsacteur</span>
                  <span style={{ color: accent, fontSize: '0.85rem', fontStyle: 'italic', display: 'block', marginTop: '0.35rem' }}>Kent geen schaamte en springt onvermoeibaar in elke rol.</span>
                </div>
              </div>
            </div>`;

code = code.replace(teamEndOld, teamEndNew);

// 5. Update the "Even eerlijk: " text
const disclaimerOld = `Even eerlijk: Sanne en Jeroen bestaan alleen in pixels. Net als een flink deel van deze suite zijn ze met AI gemaakt. Ze hebben nog nooit een sessie gemist, drinken geen koffie en hun eigen YSQ hebben ze wijselijk nooit ingevuld. Achter de schermen zitten wel degelijk echte mensen (techneuten en een schematherapeut); Sanne en Jeroen zijn simpelweg ons virtuele gezicht. Mail je ons, dan antwoordt er gewoon een mens van vlees en bloed.`;
const disclaimerNew = `Even eerlijk: Sanne, Jeroen en natuurlijk de Speelbot bestaan alleen in pixels. Net als een flink deel van deze suite zijn ze met AI gemaakt. Ze hebben nog nooit een sessie gemist, drinken geen koffie en hun eigen YSQ hebben ze wijselijk nooit ingevuld. Achter de schermen zitten wel degelijk echte mensen (techneuten en een schematherapeut); Sanne en Jeroen zijn simpelweg ons virtuele gezicht. Mail je ons, dan antwoordt er gewoon een mens van vlees en bloed.`;

code = code.replace(disclaimerOld, disclaimerNew);

fs.writeFileSync('src/components/About.jsx', code);
