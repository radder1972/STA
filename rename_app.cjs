const fs = require('fs');

function renameInFile(file) {
  if (!fs.existsSync(file)) return;
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  
  content = content.replace(/Digitaal Schematherapie Platform \(DSP\)/g, "Schematherapie Suite");
  content = content.replace(/Digitaal Schematherapie Platform/g, "Schematherapie Suite");
  content = content.replace(/DSP/g, "Suite"); // risky, but let's check
  
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Renamed in ' + file);
  }
}

const htmlFiles = [
  'index.html', 'kaarten.html', 'snelstart.html', 'tafel.html', 'test.html', 'spel.html',
  'public/linkedin.html', 'public/facebook.html'
];
htmlFiles.forEach(renameInFile);

