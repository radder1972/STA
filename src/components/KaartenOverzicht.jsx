import React, { useState } from 'react'
import { ArrowLeftIcon } from './Icons'
import { getCardColor } from '../utils/colors'
import SchemaCard from './SchemaCard'
import imgB1 from '../assets/images/basisbehoeften/1.png'
import imgB2 from '../assets/images/basisbehoeften/2.png'
import imgB3 from '../assets/images/basisbehoeften/3.png'
import imgB4 from '../assets/images/basisbehoeften/4.png'
import imgB5 from '../assets/images/basisbehoeften/5.png'

import imgM1 from '../assets/images/modicategorieen/1.png'
import imgM2 from '../assets/images/modicategorieen/2.png'
import imgM3a from '../assets/images/modicategorieen/coping_overgave.png'
import imgM3b from '../assets/images/modicategorieen/coping_vermijding.png'
import imgM3c from '../assets/images/modicategorieen/coping_overcompensatie.png'
import imgM4 from '../assets/images/modicategorieen/4.png'

import { schemaImages, modeImages } from '../utils/images'
import { schemaDescriptions } from '../data/descriptions'
import { getVerdieping } from '../data/verdieping'

const ysqSchemaNamesMap = {
  'Abandonment': 'Verlating / Instabiliteit',
  'Mistrust': 'Wantrouwen / Misbruik',
  'Defectiveness_unlovability': 'Tekortschieten / Schaamte',
  'Emotional deprivation': 'Emotioneel tekort',
  'Social isolation_Alienation': 'Sociale isolatie / Vervreemding',
  'Practical incompetence_Dependence': 'Afhankelijkheid / Incompetentie',
  'Vulnerability to harm_illness': 'Kwetsbaarheid voor ziekte en gevaar',
  'Enmeshment': 'Kluwen / Onderontwikkeld zelf',
  'Failure to achieve': 'Mislukken',
  'Insufficient self-control_self-discipline': 'Onvoldoende zelfcontrole',
  'Entitlement_Superiority': 'Veeleisendheid / Grandiositeit',
  'Subjugation': 'Onderwerping',
  'Self-sacrifice': 'Zelfopoffering',
  'Admiration_Recognition-seeking': 'Goedkeuring / Erkenning zoeken',
  'Pessimism_Worry': 'Negativisme / Pessimisme',
  'Emotional inhibition': 'Emotionele geremdheid',
  'Unrelenting Standards': 'Meedogenloze normen',
  'Self-punitiveness': 'Bestraffendheid'
};

const smiModesMap = {
  'kk': 'Kwetsbare kind',
  'rk': 'Razende kind',
  'ik': 'Impulsieve kind',
  'ok': 'Ongedisciplineerde kind',
  'bk': 'Boze kind',
  'wi': 'Willoze inschikkelijke',
  'ob': 'Onthechte beschermer',
  'oz': 'Onthechte zelfsusser',
  'wk': 'Wantrouwende overcontroleerder',
  'zh': 'Zelfverheerlijker',
  'pa': 'Pest en aanval',
  'so': 'Straffende ouder',
  'vo': 'Veeleisende ouder',
  'gv': 'Gezonde volwassene'
};

const basisbehoeftenText = {
  'Veilige hechting': 'Veiligheid, stabiliteit, verzorging en onvoorwaardelijke acceptatie. Een thuishaven zonder angst voor verlating of afwijzing.',
  'Autonomie': 'Ruimte om zelf de wereld te ontdekken, fouten te mogen maken en vertrouwen te krijgen in je eigen kunnen als onafhankelijk individu.',
  'Vrije expressie': 'Ruimte om je vrij uit te drukken. Eigen gevoelens (ook boosheid of verdriet) en behoeften zijn geldig en belangrijk.',
  'Spontaniteit en spel': 'Ruimte voor plezier, creativiteit en onbezorgdheid. Niet alles hoeft nuttig, perfect of efficiënt te zijn.',
  'Realistische grenzen': 'Kaders om te leren omgaan met frustratie. Leren dat je niet altijd je zin kunt krijgen en rekening moet houden met anderen.'
};

const basisbehoeftenToSchemas = {
  'Veilige hechting': ['Verlating / Instabiliteit', 'Wantrouwen / Misbruik', 'Emotioneel tekort', 'Tekortschieten / Schaamte', 'Sociale isolatie / Vervreemding'],
  'Autonomie': ['Afhankelijkheid / Incompetentie', 'Kwetsbaarheid voor ziekte en gevaar', 'Kluwen / Onderontwikkeld zelf', 'Mislukken'],
  'Vrije expressie': ['Onderwerping', 'Zelfopoffering', 'Goedkeuring / Erkenning zoeken'],
  'Spontaniteit en spel': ['Negativisme / Pessimisme', 'Emotionele geremdheid', 'Meedogenloze normen', 'Bestraffendheid'],
  'Realistische grenzen': ['Veeleisendheid / Grandiositeit', 'Onvoldoende zelfcontrole']
};

const categorieText = {
  'Kindmodi': 'De modus waarin je je kwetsbaar, eenzaam, boos of impulsief voelt, net als een kind van vroeger dat iets tekortkwam.',
  'Oudermodi': 'De geïnternaliseerde stem van een veeleisende of straffende ouder. Een innerlijke criticus die zegt dat je tekortschiet.',
  'Coping: Overgave': 'Je gedraagt je alsof het schema 100% waar is. Je past je aan en ondergaat de situatie passief.',
  'Coping: Vermijding': 'Je vermijdt de emotionele pijn van het schema door situaties uit de weg te gaan of jezelf af te leiden/verdoven.',
  'Coping: Overcompensatie': 'Je vecht tegen het schema door je precies tegenovergesteld te gedragen aan wat het schema dicteert.',
  'Gezonde volwassene': 'De gezonde kant die zorgt voor het kwetsbare kind, gezonde grenzen stelt en de strenge oudermodi bestrijdt.'
};

const categorieToModi = {
  'Kindmodi': ['Kwetsbare kind', 'Razende kind', 'Impulsieve kind', 'Ongedisciplineerde kind', 'Boze kind'],
  'Oudermodi': ['Straffende ouder', 'Veeleisende ouder'],
  'Coping: Overgave': ['Willoze inschikkelijke'],
  'Coping: Vermijding': ['Onthechte beschermer', 'Onthechte zelfsusser'],
  'Coping: Overcompensatie': ['Wantrouwende overcontroleerder', 'Zelfverheerlijker', 'Pest en aanval'],
  'Gezonde volwassene': ['Gezonde volwassene']
};

export default function KaartenOverzicht({ onBack }) {
  const [filter, setFilter] = useState('domeinen');
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const schemaCards = [
    { src: imgB1, title: 'Veilige hechting', description: basisbehoeftenText['Veilige hechting'], color: '#60a5fa' }, // Domein 1 -> Blauw
    { src: imgB2, title: 'Autonomie', description: basisbehoeftenText['Autonomie'], color: '#34d399' }, // Domein 2 -> Groen
    { src: imgB3, title: 'Vrije expressie', description: basisbehoeftenText['Vrije expressie'], color: '#facc15' }, // Domein 4 -> Geel
    { src: imgB4, title: 'Spontaniteit en spel', description: basisbehoeftenText['Spontaniteit en spel'], color: '#f87171' }, // Domein 5 -> Rood
    { src: imgB5, title: 'Realistische grenzen', description: basisbehoeftenText['Realistische grenzen'], color: '#fb923c' }, // Domein 3 -> Oranje
  ]

  const modiCards = [
    { src: imgM1, title: 'Kindmodi', description: categorieText['Kindmodi'], color: '#60a5fa' }, // Blauw
    { src: imgM2, title: 'Oudermodi', description: categorieText['Oudermodi'], color: '#f87171' }, // Rood
    { src: imgM3a, title: 'Coping: Overgave', description: categorieText['Coping: Overgave'], color: '#facc15' },
    { src: imgM3b, title: 'Coping: Vermijding', description: categorieText['Coping: Vermijding'], style: { width: '80%', height: '80%' }, color: '#facc15' },
    { src: imgM3c, title: 'Coping: Overcompensatie', description: categorieText['Coping: Overcompensatie'], color: '#facc15' },
    { src: imgM4, title: 'Gezonde volwassene', description: categorieText['Gezonde volwassene'], color: '#34d399' }, // Groen
  ]

  const schemaGroups = [
    { group: 'Verlating & Afwijzing', titles: ['Verlating / Instabiliteit', 'Wantrouwen / Misbruik', 'Emotioneel tekort', 'Tekortschieten / Schaamte', 'Sociale isolatie / Vervreemding'] },
    { group: 'Verzwakte Autonomie', titles: ['Afhankelijkheid / Incompetentie', 'Kwetsbaarheid voor ziekte en gevaar', 'Kluwen / Onderontwikkeld zelf', 'Mislukken'] },
    { group: 'Verzwakte Grenzen', titles: ['Onvoldoende zelfcontrole', 'Veeleisendheid / Grandiositeit'] },
    { group: 'Gerichtheid op Anderen', titles: ['Onderwerping', 'Zelfopoffering', 'Goedkeuring / Erkenning zoeken'] },
    { group: 'Overmatige Waakzaamheid', titles: ['Emotionele geremdheid', 'Meedogenloze normen', 'Negativisme / Pessimisme', 'Bestraffendheid'] }
  ];
  const schemaSortOrder = schemaGroups.flatMap(g => g.titles);

  const modeGroups = [
    { group: 'Kindmodi', titles: ['Kwetsbare kind', 'Boze kind', 'Razende kind', 'Impulsieve kind', 'Ongedisciplineerde kind'] },
    { group: 'Coping: Overgave', titles: ['Willoze inschikkelijke'] },
    { group: 'Coping: Vermijding', titles: ['Onthechte beschermer', 'Onthechte zelfsusser'] },
    { group: 'Coping: Overcompensatie', titles: ['Wantrouwende overcontroleerder', 'Zelfverheerlijker', 'Pest en aanval'] },
    { group: 'Oudermodi', titles: ['Straffende ouder', 'Veeleisende ouder'] },
    { group: 'Gezonde Volwassene', titles: ['Gezonde volwassene'] }
  ];
  const modeSortOrder = modeGroups.flatMap(g => g.titles);

  const detailedSchemaCards = Object.keys(schemaImages).map(path => {
    const filename = path.split('/').pop().replace('.png', '');
    const title = ysqSchemaNamesMap[filename] || filename.replace(/_/g, ' ');
    return { id: filename, type: 'schema', src: schemaImages[path], title, description: schemaDescriptions[title], style: { transform: title === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(1)' } };
  }).sort((a, b) => {
    const indexA = schemaSortOrder.indexOf(a.title);
    const indexB = schemaSortOrder.indexOf(b.title);
    if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const detailedModeCards = Object.keys(modeImages).map(path => {
    const filename = path.split('/').pop().replace('.png', '');
    const title = smiModesMap[filename] || filename;
    return { id: filename, type: 'mode', src: modeImages[path], title, description: schemaDescriptions[title], style: { transform: 'scale(1.1)' } };
  }).sort((a, b) => {
    const indexA = modeSortOrder.indexOf(a.title);
    const indexB = modeSortOrder.indexOf(b.title);
    if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const renderCardList = (cards, listName, defaultImageStyle = {}) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyItems: 'center', justifyContent: 'center', padding: '1rem', marginBottom: '3rem' }}>
      {cards.map((card, idx) => {
        const uniqueKey = `${listName}-${card.title}`;
        const cardColor = card.color || getCardColor(card.type, card.id);
        return (
        <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <SchemaCard
            id={card.id}
            title={card.title}
            description={card.description}
            src={card.src}
            color={cardColor}
            width="200px"
            height="285px"
            imageStyle={{ ...defaultImageStyle, ...card.style }}
            flipOnClick={false}
            onClick={() => setSelectedCard({ ...card, listName })}
          />
        </div>
        );
      })}
    </div>
  )

  const FilterButton = ({ id, label }) => (
    <button 
      className={`btn ${filter === id ? 'btn-gradient' : 'btn-outline'}`}
      onClick={() => setFilter(id)}
      style={{ margin: 0, border: 'none', whiteSpace: 'nowrap' }}
    >
      {label}
    </button>
  );

  if (selectedCategory) {
    const isSchema = !!basisbehoeftenToSchemas[selectedCategory.title];
    const mapping = isSchema ? basisbehoeftenToSchemas[selectedCategory.title] : categorieToModi[selectedCategory.title];
    const fullList = isSchema ? detailedSchemaCards : detailedModeCards;
    const filteredCards = fullList.filter(c => mapping && mapping.includes(c.title));

    return (
      <div className="view-container">
        <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
          <button onClick={() => setSelectedCategory(null)} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeftIcon size={18} /> Terug naar Overzicht
          </button>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '3rem' }}>
          <h2 style={{ color: "var(--text-main)" }} style={{ textAlign: 'center', marginBottom: '1rem' }}>Geselecteerde Categorie</h2>
          {renderCardList([selectedCategory], isSchema ? 'schema-cat' : 'modi-cat', isSchema ? { transform: 'scale(0.85)' } : { transform: 'scale(0.85)' })}
        </div>

        <h2 style={{ color: "var(--text-main)" }} style={{ textAlign: 'center', marginBottom: '1rem' }}>
          Bijbehorende {isSchema ? "Schema's" : 'Modi'}
        </h2>
        {renderCardList(filteredCards, isSchema ? 'schema-ind' : 'modi-ind')}

        {selectedCard && (
          <div style={{
            position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
            backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
            display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
          }} onClick={() => setSelectedCard(null)}>
            <div className="glass-panel" style={{
              background: 'var(--bg-color)', maxWidth: '600px', width: '100%', 
              maxHeight: '90vh', overflowY: 'auto', padding: '2rem', position: 'relative',
              borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }} onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedCard(null)} 
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)' }}
              >×</button>
              <h2 style={{ color: "var(--text-main)", marginBottom: '0.5rem' }}>{selectedCard.title}</h2>
              <h4 style={{ color: (selectedCard.color || getCardColor(selectedCard.type, selectedCard.id)), marginBottom: '1.5rem' }}>Praktijkvoorbeeld & Tips</h4>
              
              <div style={{ marginBottom: '1.5rem' }}>
                <h5 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Herkenbaar Praktijkvoorbeeld</h5>
                <p style={{ lineHeight: '1.6', background: `${(selectedCard.color || getCardColor(selectedCard.type, selectedCard.id))}15`, padding: '1rem', borderRadius: '8px', borderLeft: `4px solid ${(selectedCard.color || getCardColor(selectedCard.type, selectedCard.id))}` }}>
                  {getVerdieping(selectedCard.title).casus}
                </p>
              </div>

              <div>
                <h5 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Concrete Tips & Handvatten</h5>
                <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                  {getVerdieping(selectedCard.title).tips.map((tip, idx) => (
                    <li key={idx} style={{ marginBottom: '0.5rem' }}>{tip}</li>
                  ))}
                </ul>
              </div>
              
              <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                <button className="btn" onClick={() => setSelectedCard(null)} style={{ background: (selectedCard.color || getCardColor(selectedCard.type, selectedCard.id)), color: 'white', border: 'none' }}>
                  Sluiten
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="view-container">
      <div className="header" style={{ marginBottom: '2rem' }}>
        <h1 style={{ color: "var(--text-main)" }}>Kaarten Overzicht</h1>
        <p>Alle illustraties uit de theorie op een rij. Klik op een kaart om de theorie te lezen!</p>
      </div>
      
      <div className="no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <button className="btn btn-outline" onClick={onBack} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeftIcon size={18} /> Terug naar Start
        </button>
      </div>

      <div className="tabs-container no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', width: '100%', overflowX: 'auto' }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '12px', gap: '8px', minWidth: 'min-content' }}>

          <FilterButton id="domeinen" label="Basisbehoeften" />
          <FilterButton id="schemas" label="Schema's" />
          <FilterButton id="modicats" label="Modi Categorieën" />
          <FilterButton id="modi" label="Modi" />
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '2rem', marginBottom: '2rem', borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)', WebkitTransform: 'translateZ(0)', transform: 'translateZ(0)' }}>
        
        {filter === 'domeinen' && (
          <div>
            <h2 style={{ color: "var(--text-main)", textAlign: 'center', marginBottom: '1rem' }}>Schema Domeinen (Basisbehoeften)</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Ieder mens heeft fundamentele emotionele basisbehoeften, zoals de behoefte aan veiligheid, verbondenheid, autonomie en spontaniteit. Als er in de kindertijd structureel niet aan deze behoeften is voldaan, kunnen er hardnekkige, negatieve patronen (schema's) ontstaan. De schema's vallen onder de volgende 5 domeinen.
            </p>
            {renderCardList(schemaCards, 'schema-cat', { transform: 'scale(0.85)' })}
          </div>
        )}

        {filter === 'schemas' && (
          <div>
            <h2 style={{ color: "var(--text-main)", textAlign: 'center', marginBottom: '1rem' }}>Individuele Schema's (18)</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Een schema is een vastgeroest patroon van denken, voelen en doen dat vaak al in de vroege jeugd is ontstaan. Ze fungeren als een soort gekleurde bril waardoor je (soms onbewust) naar jezelf, anderen en de wereld kijkt. Hieronder zie je de 18 specifieke schema's die we onderscheiden.
            </p>
            {renderCardList(detailedSchemaCards, 'schema-ind')}
          </div>
        )}

        {filter === 'modicats' && (
          <div>
            <h2 style={{ color: "var(--text-main)", textAlign: 'center', marginBottom: '1rem' }}>Modi Categorieën</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Waar schema's de dieperliggende, langdurige patronen of 'knoppen' zijn, is een <strong>modus</strong> de actuele gemoedstoestand waarin je op dít specifieke moment verkeert als een knop wordt ingedrukt. Modi worden ingedeeld in deze 4 hoofdcategorieën.
            </p>
            {renderCardList(modiCards, 'modi-cat', { transform: 'scale(0.85)' })}
          </div>
        )}

        {filter === 'modi' && (
          <div>
            <h2 style={{ color: "var(--text-main)", textAlign: 'center', marginBottom: '1rem' }}>Individuele Modi (14)</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Binnen de 4 hoofdcategorieën kunnen we specifieker inzoomen. Hier vind je de 14 meest voorkomende, specifieke gemoedstoestanden of kanten van jezelf (de modi) die geactiveerd kunnen worden wanneer je schema's worden geraakt.
            </p>
            {renderCardList(detailedModeCards, 'modi-ind')}
          </div>
        )}

      </div>

      {selectedCard && (
        <div style={{
          position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, 
          backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 9999,
          display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem'
        }} onClick={() => setSelectedCard(null)}>
          <div className="glass-panel" style={{
            background: 'var(--bg-color)', maxWidth: '600px', width: '100%', 
            maxHeight: '90vh', overflowY: 'auto', padding: '2rem', position: 'relative',
            borderRadius: '16px', border: '1px solid var(--border-color)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
          }} onClick={e => e.stopPropagation()}>
            <button 
              onClick={() => setSelectedCard(null)} 
              style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)' }}
            >×</button>
            <h2 style={{ color: "var(--text-main)" }} style={{ marginBottom: '0.5rem' }}>{selectedCard.title}</h2>
            
            <div style={{ marginBottom: '1.5rem', lineHeight: '1.6', fontSize: '1.05rem', color: 'var(--text-main)' }}>
              {selectedCard.description || 'Geen theorie beschikbaar.'}
            </div>

            {(selectedCard.listName === 'schema-cat' || selectedCard.listName === 'modi-cat') && (
              <button 
                className="btn" 
                onClick={() => { setSelectedCategory(selectedCard); setSelectedCard(null); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                style={{ width: '100%', marginBottom: '2rem', color: 'white', padding: '12px', background: (selectedCard.color || getCardColor(selectedCard.type, selectedCard.id)), border: 'none' }}
              >
                {selectedCard.listName === 'schema-cat' ? "Bekijk bijbehorende schema's" : "Bekijk bijbehorende modi"}
              </button>
            )}

            <h4 style={{ color: (selectedCard.color || getCardColor(selectedCard.type, selectedCard.id)), marginBottom: '1.5rem', marginTop: '1rem' }}>Verdieping & Tips</h4>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <h5 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Herkenbaar Praktijkvoorbeeld</h5>
              <p style={{ lineHeight: '1.6', background: `${(selectedCard.color || getCardColor(selectedCard.type, selectedCard.id))}15`, padding: '1rem', borderRadius: '8px', borderLeft: `4px solid ${(selectedCard.color || getCardColor(selectedCard.type, selectedCard.id))}` }}>
                {getVerdieping(selectedCard.title).casus}
              </p>
            </div>

            <div>
              <h5 style={{ marginBottom: '0.5rem', fontSize: '1.1rem' }}>Concrete Tips & Handvatten</h5>
              <ul style={{ paddingLeft: '1.5rem', lineHeight: '1.6' }}>
                {getVerdieping(selectedCard.title).tips.map((tip, idx) => (
                  <li key={idx} style={{ marginBottom: '0.5rem' }}>{tip}</li>
                ))}
              </ul>
            </div>
            
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className="btn" onClick={() => setSelectedCard(null)} style={{ background: (selectedCard.color || getCardColor(selectedCard.type, selectedCard.id)), color: 'white', border: 'none' }}>
                Sluiten
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  )
}
