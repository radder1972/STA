const fs = require('fs');

const files = [
  'index.html', 'kaarten.html', 'snelstart.html', 'tafel.html', 'test.html', 'spel.html',
  'public/linkedin.html', 'public/facebook.html', 'public/sitemap.xml', 'public/robots.txt',
  'add_og.sh', 'inject_seo.cjs'
];

files.forEach(file => {
  if (fs.existsSync(file)) {
    let content = fs.readFileSync(file, 'utf8');
    if (content.includes('sta-lime.vercel.app')) {
      content = content.replace(/sta-lime\.vercel\.app/g, 'schematherapiesuite.vercel.app');
      fs.writeFileSync(file, content);
      console.log('Updated ' + file);
    }
  }
});
