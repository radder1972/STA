const fs = require('fs');
let code = fs.readFileSync('src/components/StartHub.jsx', 'utf8');

if (!code.includes("import HeroCardFan")) {
    code = code.replace(
        "import React, { useState, useEffect } from 'react';",
        "import React, { useState, useEffect } from 'react';\nimport HeroCardFan from './HeroCardFan';"
    );
}

const target = `          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.8rem', minHeight: '5.5rem' }}>
            Verken de 43 klassieke basiskaarten en de herziene 55-delige theoriekaartenset (VSt 2021). Ideaal om schema's en modi tastbaar en visueel te bestuderen in de praktijk of supervisie.
          </p>`;

if (code.includes(target) && !code.includes("<HeroCardFan")) {
    code = code.replace(target, `<HeroCardFan isHovered={hoveredCard === 'kaarten'} />\n` + target);
    fs.writeFileSync('src/components/StartHub.jsx', code);
    console.log("Injected HeroCardFan successfully.");
} else {
    console.log("Could not find target or already injected.");
}
