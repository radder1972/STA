const fs = require('fs');
let code = fs.readFileSync('src/components/PrintProof.jsx', 'utf8');

// Add the download function inside the component
const functionString = `
  const downloadSVG = () => {
    const svgElement = document.getElementById('box-svg-layout');
    if (!svgElement) return;
    
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgElement);
    
    if(!source.match(/^<svg[^>]+xmlns="http\\:\\/\\/www\\.w3\\.org\\/2000\\/svg"/)){
        source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    
    const svgBlob = new Blob([source], {type: 'image/svg+xml;charset=utf-8'});
    const svgUrl = URL.createObjectURL(svgBlob);
    
    const downloadLink = document.createElement('a');
    downloadLink.href = svgUrl;
    downloadLink.download = 'schematherapie-doosje-plano-v4.2.1.svg';
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
`;

code = code.replace(
    "export default function PrintProof() {",
    "export default function PrintProof() {\n" + functionString
);

// Add the ID to the SVG
code = code.replace(
    '<svg width="100%" height="auto"',
    '<svg id="box-svg-layout" width="100%" height="auto"'
);

// Add the download button next to the print button
const printButton = `<button onClick={() => window.print()} style={{ backgroundColor: '#e4e4e7', color: '#27272a', padding: '6px 16px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Afdrukken / Opslaan</button>`;
const bothButtons = `<button onClick={downloadSVG} style={{ backgroundColor: '#3b82f6', color: 'white', padding: '6px 16px', borderRadius: '4px', fontSize: '14px', fontWeight: 'bold', border: 'none', cursor: 'pointer' }}>Download Vector (SVG)</button>\n          ` + printButton;

code = code.replace(printButton, bothButtons);

fs.writeFileSync('src/components/PrintProof.jsx', code);
