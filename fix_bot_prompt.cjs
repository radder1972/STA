const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

const oldPrompt = "Houd je antwoorden kort, krachtig en in het Nederlands. Speel echt in op de kaarten die op tafel liggen!";
const newPrompt = "Houd je antwoorden kort, gespreksmatig en in het Nederlands. Speel echt in op de kaarten die op tafel liggen! BELANGRIJK: Gebruik GEEN sterretjes (*) of markdown-opmaak in je tekst. Als je in een rollenspel een handeling beschrijft, gebruik dan blokhaken, bijvoorbeeld: [zucht diep].";

code = code.replace(oldPrompt, newPrompt);

// Also, let's strip asterisks from the output just in case the model forgets.
code = code.replace(
  "const responseText = await result.response.text();",
  "let responseText = await result.response.text();\n      responseText = responseText.replace(/\\*/g, ''); // Strip asterisks if the AI ignores the prompt"
);

fs.writeFileSync('src/components/Speelbot.jsx', code);
