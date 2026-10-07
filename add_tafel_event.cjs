const fs = require('fs');
let code = fs.readFileSync('src/components/Tafelopstelling.jsx', 'utf8');

const regex = /useEffect\(\(\) => \{\n\s*if \(!situationText \|\| !selectedMode \|\| !selectedSchema \|\| !selectedNeed\) \{/;

const eventListener = `
  useEffect(() => {
    const handleSelectCard = (e) => {
      const cardName = e.detail.cardName;
      
      // Zoek de kaart in de schemaDescriptions (of een andere lijst) om te bepalen wat het is.
      // Omdat we het type (Mode, Schema, Need) niet 100% zeker weten vanaf Speelbot, proberen we ze allemaal:
      const nameLower = cardName.toLowerCase();
      
      const allModes = Object.values(modeDescriptions);
      const allSchemas = Object.values(schemaDescriptions);
      
      // Zoek in base kaarten arrays
      const findCard = (arr, title) => arr.find(c => c.title.toLowerCase() === title);
      
      let foundCard = findCard(baseModeCards, nameLower) || findCard(extensionModeCards, nameLower);
      if (foundCard) { setSelectedMode(foundCard); return; }
      
      foundCard = findCard(baseSchemaCards, nameLower) || findCard(extensionSchemaCards, nameLower);
      if (foundCard) { setSelectedSchema(foundCard); return; }
      
      foundCard = findCard(baseNeedCards, nameLower) || findCard(extensionNeedCards, nameLower);
      if (foundCard) { setSelectedNeed(foundCard); return; }
    };
    
    window.addEventListener('tafel:selectCard', handleSelectCard);
    return () => window.removeEventListener('tafel:selectCard', handleSelectCard);
  }, []);

  useEffect(() => {
    if (!situationText || !selectedMode || !selectedSchema || !selectedNeed) {`;

code = code.replace(regex, eventListener);
fs.writeFileSync('src/components/Tafelopstelling.jsx', code);
