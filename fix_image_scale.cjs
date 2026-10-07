const fs = require('fs');
let code = fs.readFileSync('src/components/About.jsx', 'utf8');

const oldCard = `<SchemaCard 
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
                />`;

const newCard = `<SchemaCard 
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
                  imageStyle={{ transform: 'scale(1.05)' }}
                />`;

code = code.replace(oldCard, newCard);

fs.writeFileSync('src/components/About.jsx', code);
