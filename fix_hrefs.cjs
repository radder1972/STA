const fs = require('fs');
let code = fs.readFileSync('src/components/StartHub.jsx', 'utf8');

code = code.replace("window.location.href = '/test'", "window.location.href = 'test.html'");
code = code.replace("window.location.href = '/kaarten'", "window.location.href = 'kaarten.html'");
code = code.replace("window.location.href = '/tafel'", "window.location.href = 'tafel.html'");

fs.writeFileSync('src/components/StartHub.jsx', code);
