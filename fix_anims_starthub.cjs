const fs = require('fs');
let code = fs.readFileSync('src/components/StartHub.jsx', 'utf8');

const target1 = `<p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.8rem', minHeight: '5.5rem' }}>
            Breng je onderliggende kwetsbaarheden en huidige patronen in kaart met de gevalideerde <strong>YSQ-S3</strong> en <strong>SMI</strong> vragenlijsten. Inclusief uitgebreid gecombineerd analyserapport.
          </p>`;

if (code.includes(target1) && !code.includes("<HeroRadarChart")) {
    code = code.replace(target1, `<HeroRadarChart isHovered={hoveredCard === 'test'} />\n          ` + target1);
}

const target3 = `<p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.8rem', minHeight: '5.5rem' }}>
            Breng een concrete conflictsituatie of emotionele trigger interactief in kaart. Koppel de reactie (modus) aan het geraakte schema en ontvang direct advies voor je Gezonde Volwassene.
          </p>`;

if (code.includes(target3) && !code.includes("<HeroTableLayout")) {
    code = code.replace(target3, `<HeroTableLayout isHovered={hoveredCard === 'tafel'} />\n          ` + target3);
}

fs.writeFileSync('src/components/StartHub.jsx', code);
console.log("Fixed injections.");
