const fs = require('fs');
let code = fs.readFileSync('src/components/Speelbot.jsx', 'utf8');

const activeCardLogic = "const activeCard = selectedMode || selectedSchema || selectedNeed;";

// Add this at the top of the component
code = code.replace(
  "const [apiKey, setApiKey] = useState('');",
  "const [apiKey, setApiKey] = useState('');\n  const activeCard = selectedMode || selectedSchema || selectedNeed;"
);

// Replace selectedMode with activeCard in the avatar logic
code = code.replace(/selectedMode && selectedMode\.src/g, "activeCard && activeCard.src");
code = code.replace(/selectedMode \? selectedMode\.title/g, "activeCard ? activeCard.title");
code = code.replace(/selectedMode\.src/g, "activeCard.src");

fs.writeFileSync('src/components/Speelbot.jsx', code);
