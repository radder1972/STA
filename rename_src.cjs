const fs = require('fs');
const path = require('path');

function walkDir(dir) {
  let files = [];
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    if (fs.statSync(dirPath).isDirectory()) {
      files = files.concat(walkDir(dirPath));
    } else {
      if (dirPath.endsWith('.js') || dirPath.endsWith('.jsx')) {
        files.push(dirPath);
      }
    }
  });
  return files;
}

const files = walkDir('src');
files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  content = content.replace(/Digitaal Schematherapie Platform \(DSP\)/g, "Schematherapie Suite");
  content = content.replace(/Digitaal Schematherapie Platform/g, "Schematherapie Suite");
  if (content !== original) {
    fs.writeFileSync(file, content);
    console.log('Updated ' + file);
  }
});
