const fs = require('fs');

let fanCode = fs.readFileSync('src/components/HeroCardFan.jsx', 'utf8');
fanCode = fanCode.replace(
  "{ type: 'coping', title: 'Vermijding', color: '#8b5cf6', id: 'c2', src: imgVermijding, imageStyle: { transform: 'scale(0.85)' } }",
  "{ type: 'modicategorie', title: 'Coping: Vermijding', color: '#8b5cf6', id: 'c2', src: imgVermijding, imageStyle: { transform: 'scale(0.85)' } }"
);
fanCode = fanCode.replace(
  "{ type: 'coping', title: 'Overgave', color: '#8b5cf6', id: 'c1', src: imgOvergave, imageStyle: { transform: 'scale(0.85)' } }",
  "{ type: 'modicategorie', title: 'Coping: Overgave', color: '#8b5cf6', id: 'c1', src: imgOvergave, imageStyle: { transform: 'scale(0.85)' } }"
);
fs.writeFileSync('src/components/HeroCardFan.jsx', fanCode);

let tableCode = fs.readFileSync('src/components/HeroTableLayout.jsx', 'utf8');
tableCode = tableCode.replace(
  "{ type: 'coping', title: 'Overgave', color: '#8b5cf6', id: 'c1', src: imgOvergave, imageStyle: { transform: 'scale(0.85)' }, base: {x: 0, y: 20}, hover: {x: 55, y: -45} }",
  "{ type: 'modicategorie', title: 'Coping: Overgave', color: '#8b5cf6', id: 'c1', src: imgOvergave, imageStyle: { transform: 'scale(0.85)' }, base: {x: 0, y: 20}, hover: {x: 55, y: -45} }"
);
fs.writeFileSync('src/components/HeroTableLayout.jsx', tableCode);

console.log("Fixed purple cards to use modicategorie and full titles.");
