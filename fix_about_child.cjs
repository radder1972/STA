const fs = require('fs');
let code = fs.readFileSync('src/components/About.jsx', 'utf8');

// Add imports
code = code.replace(
  "import { Bot } from 'lucide-react';",
  "import { Bot } from 'lucide-react';\nimport SchemaCard from './SchemaCard';\nimport imgBlijeKind from '../assets/images/vst/blije_kind.png';\nimport { schemaDescriptions } from '../data/descriptions';"
);

// Replace the text
const oldText = `<h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Waarom altijd naar de Gezonde Volwassene toe?</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1.5rem 0' }}>
              De opstelling is geen diagnosekaart maar een route. Begrijpen welke modus actief is, is nuttig als het uiteindelijk helpt om een andere keuze te maken. Daarom eindigt de opstelling bij de vraag wat de Gezonde Volwassene hier zou doen.
            </p>`;

const newText = `<h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Waarom altijd naar de Gezonde Volwassene toe?</h3>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1rem 0' }}>
              De opstelling is geen diagnosekaart maar een route. Begrijpen welke modus actief is, is nuttig als het uiteindelijk helpt om een andere keuze te maken. Vaak betekent dit de regie terugpakken met de Gezonde Volwassene.
            </p>
            <p style={{ color: '#475569', fontSize: '1.1rem', lineHeight: '1.7', margin: '0 0 1.5rem 0' }}>
              Maar let op: je mag natuurlijk ook naar het <strong>Blije Kind</strong> toe! Als de basisbehoeften zijn vervuld en het Blije Kind aan het roer staat, hoeft de Gezonde Volwassene even helemaal niks te doen. Ga lekker spelen!
            </p>
            
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2.5rem', marginTop: '1rem' }}>
              <div style={{ transform: 'rotate(-2deg)', transition: 'transform 0.3s' }} onMouseEnter={(e) => e.currentTarget.style.transform = 'rotate(1deg) scale(1.05)'} onMouseLeave={(e) => e.currentTarget.style.transform = 'rotate(-2deg)'}>
                <SchemaCard 
                  id="blije_kind"
                  type="mode"
                  title="Blije kind"
                  description={schemaDescriptions['Blije kind'] || 'Zorgeloos, speels en in het hier en nu. De basisbehoeften zijn vervuld.'}
                  src={imgBlijeKind}
                  color="#10b981"
                  width="180px"
                  height="255px"
                  flipOnClick={true}
                  flipOnHover={false}
                />
              </div>
            </div>`;

code = code.replace(oldText, newText);

fs.writeFileSync('src/components/About.jsx', code);
