const fs = require('fs');
let code = fs.readFileSync('src/components/Tafelopstelling.jsx', 'utf8');

const anchor = `  // Joker Easter Egg Logic
  useEffect(() => {
    if (selectedMode?.title === 'Blije kind') {
      setShowJoker(true);
    } else {
      setShowJoker(false);
    }
  }, [selectedMode]);`;

const eventListener = `  // Joker Easter Egg Logic
  useEffect(() => {
    if (selectedMode?.title === 'Blije kind') {
      setShowJoker(true);
    } else {
      setShowJoker(false);
    }
  }, [selectedMode]);

  // Listen to Speelbot card suggestions
  useEffect(() => {
    const handleSelectCard = (e) => {
      const cardName = e.detail.cardName;
      const nameLower = cardName.toLowerCase();
      
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
  }, []);`;

code = code.replace(anchor, eventListener);
fs.writeFileSync('src/components/Tafelopstelling.jsx', code);
