const fs = require('fs');
let code = fs.readFileSync('src/components/StartHub.jsx', 'utf8');

code = code.replace("import packageJson from '../../package.json';", "import SparkleEffect from './SparkleEffect';\nimport packageJson from '../../package.json';");

const bannerRegex = /\{isBannerHovered && \([\s\S]*?<style>[\s\S]*?<\/style>[\s\S]*?<\/div>\s*\)\}/;
code = code.replace(bannerRegex, "{isBannerHovered && <SparkleEffect count={15} />}");

const testCardRegex = /(<ThreeSparklesLogo size=\{52\} theme="test" \/>\n\s*<\/div>)/;
code = code.replace(testCardRegex, "$1\n          {hoveredCard === 'test' && <SparkleEffect count={10} />}");

const kaartenCardRegex = /(<ThreeSparklesLogo size=\{52\} theme="kaarten" \/>\n\s*<\/div>)/;
code = code.replace(kaartenCardRegex, "$1\n          {hoveredCard === 'kaarten' && <SparkleEffect count={10} />}");

const tafelCardRegex = /(<ThreeSparklesLogo size=\{52\} theme="tafel" \/>\n\s*<\/div>)/;
code = code.replace(tafelCardRegex, "$1\n          {hoveredCard === 'tafel' && <SparkleEffect count={10} />}");

fs.writeFileSync('src/components/StartHub.jsx', code);
