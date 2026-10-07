const fs = require('fs');
let code = fs.readFileSync('src/components/StartHub.jsx', 'utf8');

if (!code.includes("import HeroCardFan from './HeroCardFan';")) {
    code = code.replace(
        "import React, { useState } from 'react';",
        "import React, { useState } from 'react';\nimport HeroCardFan from './HeroCardFan';"
    );
    fs.writeFileSync('src/components/StartHub.jsx', code);
    console.log("Fixed import.");
}
