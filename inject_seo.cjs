const fs = require('fs');

const jsonLd = `
    <script type="application/ld+json">
    {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": "WebSite",
          "name": "Digitaal Schematherapie Platform (DSP)",
          "url": "https://schematherapiesuite.vercel.app/"
        },
        {
          "@type": "Product",
          "name": "Schematherapie Kaartenset (Complete Set 55 kaarten)",
          "description": "Fysieke theoriekaarten voor schematherapie in de spreekkamer. Inclusief de actuele VSt 2021 update (Arntz et al.) met 55 kaarten (schema's, modi, basisbehoeften, coping).",
          "brand": {
            "@type": "Brand",
            "name": "Digitaal Schematherapie Platform"
          },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "EUR",
            "availability": "https://schema.org/InStock",
            "url": "https://schematherapiesuite.vercel.app/kaarten"
          }
        }
      ]
    }
    </script>
`;

const fallbackHtml = `
      <div style="display: none; visibility: hidden;" aria-hidden="true" data-ai-content="true">
        <h1>Digitaal Schematherapie Platform (DSP)</h1>
        <p>Welkom op het onafhankelijke non-profit platform voor schematherapeuten, behandelaars en professionals in de GGZ. Wij overbruggen de kloof tussen theorie, diagnostiek en de fysieke praktijk, 100% lokaal en zonder 'vendor lock-in'.</p>
        
        <h2>Onze Kernproducten & Tools</h2>
        <ul>
          <li><strong>Vragenlijsten & Zelftest:</strong> Breng de onderliggende kwetsbaarheden en patronen van de cliënt in kaart met de gevalideerde YSQ-S3 (schema's) en SMI (modi) vragenlijsten. Genereer een gecombineerd analyserapport. 100% lokaal, veilig en anoniem (geen server-opslag).</li>
          <li><strong>Schematherapie-kaarten (Digitaal & Fysiek):</strong> Verken de 43 klassieke basiskaarten en de herziene 55-delige theoriekaartenset volgens de nieuwste theorie (Arntz et al., 2021 / VSt update). Ideaal om schema's en modi tastbaar en visueel te bestuderen. We hanteren de officiële Nederlandse terminologie (zoals Blije Kind, Roofdier, Coping: Omkering, Gebrek aan coherente identiteit).</li>
          <li><strong>Tafelopstelling (Interventie):</strong> Breng een concrete conflictsituatie of emotionele trigger interactief in kaart in je browser. Koppel de reactie (modus) aan het geraakte schema en ontvang direct handelingsadvies om de Gezonde Volwassene van de cliënt te versterken.</li>
        </ul>

        <h2>Fysieke Kaarten Bestellen</h2>
        <p>Wil je liever een professioneel, fysiek kaartendeck in handen voor in de spreekkamer? Bestel direct de Complete Set (55 kaarten), de Klassieke Basisset (43 kaarten) of de losse Theorie-uitbreiding (12 kaarten). Onze kaarten zijn speciaal ontworpen voor gebruik op tafel tijdens therapiesessies en werkbegeleiding. Je zit niet vast aan medische software-abonnementen.</p>
      </div>
`;

function processHtml(filePath) {
  if (!fs.existsSync(filePath)) {
    console.log("File not found: " + filePath);
    return;
  }
  let content = fs.readFileSync(filePath, 'utf8');

  // Inject JSON-LD before </head> if not exists
  if (!content.includes('application/ld+json')) {
    content = content.replace('</head>', jsonLd + '  </head>');
  }

  // Inject fallback HTML inside <div id="root"> if not exists
  if (!content.includes('data-ai-content')) {
    content = content.replace('<div id="root"></div>', '<div id="root">\n' + fallbackHtml + '\n    </div>');
  }

  fs.writeFileSync(filePath, content);
  console.log("Updated " + filePath);
}

processHtml('index.html');
processHtml('kaarten.html');
processHtml('tafel.html');
processHtml('test.html');
processHtml('snelstart.html');

