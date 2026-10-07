const fs = require('fs');

const pages = {
  'index.html': {
    title: 'Digitaal Schematherapie Platform (DSP) - Tools voor Therapeuten',
    desc: 'Onafhankelijk Digitaal Schematherapie Platform (DSP) met online theoriekaarten, vragenlijsten (YSQ-S3, SMI) en interactieve tafelopstelling met AI-analyse.',
    kw: 'schematherapie, digitaal schematherapie platform, dsp, schemawizard, schematherapeut, YSQ-S3, SMI, modi kaarten, schema kaarten, tafelopstelling'
  },
  'kaarten.html': {
    title: 'Digitale Schematherapie Theoriekaarten (VSt 2021)',
    desc: 'Verken 55 klassieke en herziene schematherapie theoriekaarten (VSt 2021). Maak schema\'s en modi visueel en tastbaar voor je cliënten.',
    kw: 'schematherapie kaarten, theoriekaarten, VSt 2021, modi kaarten, schema kaarten, schematherapie materiaal'
  },
  'tafel.html': {
    title: 'Tafelopstelling Schematherapie & AI Schemawizard',
    desc: 'Breng casuïstiek tot leven met de interactieve tafelopstelling voor schematherapie. Inclusief veilige, local-first AI co-therapeut voor scherpe hypothesen.',
    kw: 'tafelopstelling schematherapie, AI schemawizard, schematherapie casus, stoelentechniek digitaal'
  },
  'test.html': {
    title: 'Schematherapie Vragenlijsten (YSQ-S3 & SMI) met Analyse',
    desc: 'Neem veilig en lokaal de YSQ-S3 en SMI schematherapie vragenlijsten af. Genereer direct een uitgebreid diagnostisch analyserapport.',
    kw: 'YSQ-S3, SMI vragenlijst, schematherapie test, schematherapie vragenlijst online, diagnostiek schematherapie'
  },
  'snelstart.html': {
    title: 'Snelstartgids - Digitaal Schematherapie Platform',
    desc: 'Korte handleiding voor therapeuten om direct aan de slag te gaan met het Digitaal Schematherapie Platform (DSP), kaarten en de AI Schemawizard.',
    kw: 'handleiding schematherapie platform, snelstartgids dsp, uitleg schemawizard'
  }
};

for (const [file, data] of Object.entries(pages)) {
  let content = fs.readFileSync(file, 'utf8');
  
  // Remove existing title if any
  content = content.replace(/<title>.*?<\/title>/g, '');
  // Remove existing meta desc if any
  content = content.replace(/<meta name="description".*?>/g, '');
  // Remove existing keywords if any
  content = content.replace(/<meta name="keywords".*?>/g, '');
  
  const seoTags = `
    <title>${data.title}</title>
    <meta name="description" content="${data.desc}" />
    <meta name="keywords" content="${data.kw}" />
    <meta name="author" content="Digitaal Schematherapie Platform" />
    <meta property="og:title" content="${data.title}" />
    <meta property="og:description" content="${data.desc}" />
    <meta property="og:type" content="website" />
    <meta name="robots" content="index, follow" />
  `.trim();
  
  content = content.replace('</head>', `  ${seoTags}\n  </head>`);
  fs.writeFileSync(file, content);
  console.log(`Updated SEO tags for ${file}`);
}
