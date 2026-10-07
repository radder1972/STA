const fs = require('fs');
let code = fs.readFileSync('src/components/Tafelopstelling.jsx', 'utf8');

// Add import
code = code.replace(
  "import WaaierNeedSelector from './WaaierNeedSelector';",
  "import WaaierNeedSelector from './WaaierNeedSelector';\nimport Speelbot from './Speelbot';"
);

// Inject component before the final </div> in Tafelopstelling
const lastDivIndex = code.lastIndexOf('</div>');
const speelbotCode = `
      {/* Speelbot Widget */}
      <Speelbot 
        situationText={situationText}
        selectedMode={selectedMode}
        selectedSchema={selectedSchema}
        selectedNeed={selectedNeed}
        selectedUnmetNeed={selectedUnmetNeed}
      />
    `;

code = code.slice(0, lastDivIndex) + speelbotCode + code.slice(lastDivIndex);

fs.writeFileSync('src/components/Tafelopstelling.jsx', code);
