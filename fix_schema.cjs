const fs = require('fs');

const files = ['index.html', 'kaarten.html', 'snelstart.html', 'tafel.html', 'test.html', 'spel.html'];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    
    // The Product block starts with { "@type": "Product" and ends before ] }
    // It is the second element in the @graph array.
    const productRegex = /,\s*\{\s*"@type":\s*"Product"[\s\S]*?(?=\s*\]\s*\})/g;
    
    if (productRegex.test(content)) {
      content = content.replace(productRegex, '');
      fs.writeFileSync(file, content);
      console.log('Fixed ' + file);
    }
  }
});
