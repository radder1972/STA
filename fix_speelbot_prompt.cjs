const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

const oldPrompt = `Houd je antwoorden kort, gespreksmatig en in het Nederlands. Gebruik GEEN sterretjes (*) of markdown-opmaak. Gebruik blokhaken voor handelingen, bijv: [zucht diep].`;
const newPrompt = `Houd je antwoorden kort, gespreksmatig en in het Nederlands. Gebruik GEEN sterretjes (*) of markdown-opmaak. Gebruik blokhaken voor handelingen, bijv: [zucht diep].

Belangrijk: Als je tijdens het gesprek voelt dat een bepaald schema, modus of basisbehoefte sterk geraakt wordt (dat nog NIET op tafel ligt), mag je dat suggereren aan de therapeut.
Doe dit door helemaal aan het einde van je bericht (op een nieuwe regel) exact de volgende code te plaatsen:
SUGGEST_CARD: [Naam van de theoriekaart]
Bijvoorbeeld: SUGGEST_CARD: Verlating of SUGGEST_CARD: Straf`;

code = code.replace(oldPrompt, newPrompt); // Replace the second occurrence if any

fs.writeFileSync('src/components/Speelbot.jsx', code);
