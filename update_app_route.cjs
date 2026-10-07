const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

if (!code.includes("import PrintProof")) {
    code = code.replace("import OrderCards from './components/OrderCards';", "import OrderCards from './components/OrderCards';\nimport PrintProof from './components/PrintProof';");
}

code = code.replace("else if (hash === 'verantwoording') setCurrentView('verantwoording')", "else if (hash === 'verantwoording') setCurrentView('verantwoording')\n        else if (hash === 'drukproef') setCurrentView('drukproef')");
// Do this for isKaartenApp as well
code = code.replace("else if (hash === 'verantwoording') setCurrentView('verantwoording')", "else if (hash === 'verantwoording') setCurrentView('verantwoording')\n        else if (hash === 'drukproef') setCurrentView('drukproef')");

const renderBlock = `{currentView === 'order-cards' && (
        <OrderCards onBack={() => setCurrentView('game-portal')} />
      )}`;
const newRenderBlock = `{currentView === 'order-cards' && (
        <OrderCards onBack={() => setCurrentView('game-portal')} />
      )}
      {currentView === 'drukproef' && (
        <PrintProof />
      )}`;

code = code.replace(renderBlock, newRenderBlock);

fs.writeFileSync('src/App.jsx', code);
