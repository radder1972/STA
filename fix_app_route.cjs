const fs = require('fs');
let code = fs.readFileSync('src/App.jsx', 'utf8');

// Fix useState initialization
code = code.replace(
  "if (hash === 'verantwoording') return 'verantwoording'",
  "if (hash === 'verantwoording') return 'verantwoording'\n    if (hash === 'drukproef') return 'drukproef'"
);

// Fix handleHashChange
code = code.replace(
  "if (hash === 'verantwoording') {\n        setAboutTab('verantwoording')",
  "if (hash === 'drukproef') {\n        setCurrentView('drukproef')\n        return\n      }\n      if (hash === 'verantwoording') {\n        setAboutTab('verantwoording')"
);

fs.writeFileSync('src/App.jsx', code);
