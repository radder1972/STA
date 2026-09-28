const fs = require('fs');
const html = fs.readFileSync('dist/index.html', 'utf8');
const scriptMatch = html.match(/<script.*?>(.*?)<\/script>/s);
if (scriptMatch) {
  const script = scriptMatch[1];
  const idx = script.indexOf('Leg zelf handmatig');
  console.log(script.substring(idx - 100, idx + 2000));
}
