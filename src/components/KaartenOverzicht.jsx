import React, { useState } from 'react'
import { ArrowLeftIcon, CardsIcon } from './Icons'
import { getCardColor } from '../utils/colors'
import SchemaCard from './SchemaCard'
import { Sparkles } from 'lucide-react'

import { schemaImages, modeImages } from '../utils/images'
import { schemaDescriptions } from '../data/descriptions'
import { getVerdieping } from '../data/verdieping'
import {
  ysqSchemaNamesMap,
  smiModesMap,
  basisbehoeftenToSchemas,
  categorieToModi,
  schemaGroups,
  modeGroups,
  schemaSortOrder,
  modeSortOrder,
  basisbehoeftenData,
  vstBasisbehoeftenData,
  vstSchemaData,
  vstCopingData,
  vstModiData,
  modicategorieenData
} from '../data/cards';

export default function KaartenOverzicht({ onBack }) {
  const [filter, setFilter] = useState('domeinen');
  const [selectedCard, setSelectedCard] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);

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

  const allCards = [
    ...detailedSchemaCards,
    ...vstSchemaData,
    ...detailedModeCards,
    ...vstModiData,
    ...basisbehoeftenData,
    ...vstBasisbehoeftenData,
    ...modicategorieenData,
    ...vstCopingData
  ];

  const renderCardList = (cards, listName, defaultImageStyle = {}) => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyItems: 'center', justifyContent: 'center', padding: '1rem', marginBottom: '3rem' }}>
      {cards.map((card, idx) => {
        const uniqueKey = `${listName}-${card.title}`;
        const cardColor = card.color || getCardColor(card.type, card.id);
        const buttonLabel = listName === 'schema-cat' 
          ? "Praktijkvoorbeeld & Schema's" 
          : listName === 'modi-cat' 
            ? "Praktijkvoorbeeld & Modi" 
            : "Praktijkvoorbeeld & Tips";

        return (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <SchemaCard
              id={card.id}
              type={card.type}
              title={card.title}
              description={card.description}
              src={card.src}
              color={cardColor}
              width="200px"
              height="304px"
              imageStyle={{ ...defaultImageStyle, ...card.style }}
              flipOnClick={true}
            />
            <button
              type="button"
              className="btn btn-outline"
              onClick={() => setSelectedCard({ ...card, listName })}
              style={{
                marginTop: '0.85rem',
                padding: '6px 14px',
                fontSize: '0.82rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                borderRadius: '10px'
              }}
            >
              <Sparkles size={14} color={cardColor} /> {buttonLabel}
            </button>
          </div>
        );
      })}
    </div>
  )

  const FilterButton = ({ id, label }) => (
    <button 
      className={`btn ${filter === id ? 'btn-gradient-game' : 'btn-outline'}`}
      onClick={() => setFilter(id)}
      style={{ margin: 0, border: 'none', whiteSpace: 'nowrap' }}
    >
      {label}
    </button>
  );

  if (selectedCategory) {
    const isSchema = !!basisbehoeftenToSchemas[selectedCategory.title];
    const mapping = isSchema ? basisbehoeftenToSchemas[selectedCategory.title] : categorieToModi[selectedCategory.title];
    const fullList = isSchema ? [...detailedSchemaCards, ...vstSchemaData] : [...detailedModeCards, ...vstModiData];
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
              borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 10px 40px rgba(0,0,0,0.3)'
            }} onClick={e => e.stopPropagation()}>
              <button 
                onClick={() => setSelectedCard(null)} 
                style={{ position: 'absolute', top: '15px', right: '15px', background: 'transparent', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: 'var(--text-main)' }}
              >×</button>
              {selectedCard.isVst && (
                <div style={{ marginBottom: '1.25rem' }}>
                  <span style={{ fontSize: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', border: '1px solid rgba(234, 88, 12, 0.25)', padding: '4px 12px', borderRadius: '9999px', fontWeight: '700', display: 'inline-block' }}>
                    Theorie-uitbreiding
                  </span>
                </div>
              )}
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
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto' }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <CardsIcon size={40} useGameGradient={true} /> Theoriekaarten
        </h1>
        <h2 style={{ color: '#0ea5e9', margin: 0, fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.4' }}>Bestudeer theorie, voorbeelden en tips</h2>
      </div>
      


      <div className="tabs-container no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', width: '100%' }}>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '12px', gap: '8px' }}>

          <FilterButton id="domeinen" label="Basisbehoeften" />
          <FilterButton id="schemas" label="Schema's" />
          <FilterButton id="modicats" label="Modi Categorieën" />
          <FilterButton id="modi" label="Modi" />
        </div>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', marginBottom: '2rem', borderRadius: '24px', position: 'relative' }}>
        
        {/* Ronde sticker: Theorie-uitbreiding (in plaats van menu item) */}
        <button
          type="button"
          onClick={() => setFilter(filter === 'vst' ? 'domeinen' : 'vst')}
          title={filter === 'vst' ? 'Klik om terug te gaan naar het basisoverzicht' : 'Klik om de 12 theorie-uitbreidingskaarten te bekijken'}
          style={{
            position: 'absolute',
            top: '-26px',
            right: '-22px',
            width: '112px',
            height: '112px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #f59e0b 0%, #ea580c 100%)',
            color: '#ffffff',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            boxShadow: filter === 'vst' 
              ? '0 0 0 3px #ffffff, 0 10px 30px rgba(234, 88, 12, 0.7)' 
              : '0 10px 25px rgba(234, 88, 12, 0.45), 0 3px 8px rgba(0, 0, 0, 0.15)',
            transform: filter === 'vst' ? 'rotate(12deg) scale(1.08)' : 'rotate(12deg)',
            zIndex: 10,
            border: 'none',
            cursor: 'pointer',
            userSelect: 'none',
            transition: 'transform 0.2s ease, box-shadow 0.2s ease',
            padding: 0
          }}
          onMouseEnter={(e) => {
            if (filter !== 'vst') {
              e.currentTarget.style.transform = 'rotate(12deg) scale(1.06)';
              e.currentTarget.style.boxShadow = '0 12px 28px rgba(234, 88, 12, 0.6), 0 4px 10px rgba(0, 0, 0, 0.2)';
            }
          }}
          onMouseLeave={(e) => {
            if (filter !== 'vst') {
              e.currentTarget.style.transform = 'rotate(12deg)';
              e.currentTarget.style.boxShadow = '0 10px 25px rgba(234, 88, 12, 0.45), 0 3px 8px rgba(0, 0, 0, 0.15)';
            }
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '3px', fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.95 }}>
            <Sparkles size={11} /> {filter === 'vst' ? 'Actief' : 'Inclusief'}
          </div>
          <div style={{ fontSize: '1.15rem', fontWeight: '900', letterSpacing: '-0.02em', lineHeight: '1.1', margin: '2px 0', textShadow: '0 1px 2px rgba(0,0,0,0.25)' }}>
            12 Extra
          </div>
          <div style={{ fontSize: '0.62rem', fontWeight: '800', letterSpacing: '0.05em', textTransform: 'uppercase', opacity: 0.95, lineHeight: 1.15 }}>
            Theorie-<br />kaarten
          </div>
        </button>

        <div className="inner-box" style={{ margin: 0 }}>
        
        {filter === 'domeinen' && (
          <div>
            <h2 className="box-heading" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Schema Domeinen (Klassieke Basisbehoeften) (5)</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Ieder mens heeft fundamentele emotionele basisbehoeften, zoals de behoefte aan veiligheid, verbondenheid, autonomie en spontaniteit. Als er in de kindertijd structureel niet aan deze behoeften is voldaan, kunnen er hardnekkige, negatieve patronen (schema's) ontstaan. De schema's vallen onder de volgende 5 klassieke domeinen.
            </p>
            {renderCardList(basisbehoeftenData, 'schema-cat', { transform: 'scale(0.85)' })}

            {vstBasisbehoeftenData.length > 0 && (
              <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px dashed var(--border-color)' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', border: '1px solid rgba(234, 88, 12, 0.25)', padding: '4px 12px', borderRadius: '9999px', fontWeight: '700', display: 'inline-block', marginBottom: '1.1rem' }}>
                    Theorie-uitbreiding
                  </span>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', margin: '0 0 0.4rem 0' }}>
                    Aanvullende Basisbehoeften ({vstBasisbehoeftenData.length})
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
                    Aanvullende basisbehoeften uit recente theorievorming (Arntz et al., 2021).
                  </p>
                </div>
                {renderCardList(vstBasisbehoeftenData, 'schema-cat-vst', { transform: 'scale(0.85)' })}
              </div>
            )}
          </div>
        )}

        {filter === 'vst' && (
          <div>
            <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
              <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', border: '1px solid rgba(234, 88, 12, 0.25)', padding: '4px 12px', borderRadius: '9999px', fontWeight: '700', display: 'inline-block', marginBottom: '1.1rem' }}>
                Theorie-uitbreiding
              </span>
              <h2 className="box-heading" style={{ justifyContent: 'center', margin: '0 0 0.5rem 0' }}>
                Theorie Uitbreidingsset ({vstBasisbehoeftenData.length + vstSchemaData.length + vstCopingData.length + vstModiData.length})
              </h2>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '750px', margin: '0 auto', lineHeight: '1.6' }}>
                Gebaseerd op het internationale position paper (Arntz et al., 2021). Klik op een kaart om de theorie, praktijkcasus en Gezonde Volwassene-tips te bekijken.
              </p>
              <div style={{ marginTop: '1rem' }}>
                <button 
                  type="button"
                  className="btn btn-outline" 
                  onClick={() => setFilter('domeinen')}
                  style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.85rem', padding: '6px 14px', borderRadius: '8px' }}
                >
                  <ArrowLeftIcon size={14} color="#0ea5e9" /> Terug naar basisoverzicht
                </button>
              </div>
            </div>

            <div style={{ marginBottom: '3rem' }}>
              <h3 style={{ textAlign: 'center', color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                Basisbehoeften ({vstBasisbehoeftenData.length})
              </h3>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                De twee nieuw toegevoegde universele behoeften: Zelfcoherentie en Rechtvaardigheid.
              </p>
              {renderCardList([...vstBasisbehoeftenData], 'vst-behoeften', { transform: 'scale(0.85)' })}
            </div>

            <div style={{ paddingTop: '2rem', borderTop: '1px dashed var(--border-color)', marginBottom: '3rem' }}>
              <h3 style={{ textAlign: 'center', color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                Nieuw voorgestelde Schema's ({vstSchemaData.length})
              </h3>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                De drie nieuwe schema's die ontstaan wanneer niet aan Zelfcoherentie of Rechtvaardigheid wordt voldaan.
              </p>
              {renderCardList([...vstSchemaData], 'vst-schemas')}
            </div>

            <div style={{ paddingTop: '2rem', borderTop: '1px dashed var(--border-color)', marginBottom: '3rem' }}>
              <h3 style={{ textAlign: 'center', color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                Coping Categoriekaart ({vstCopingData.length})
              </h3>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Vernieuwde benaming en verheldering voor overcompensatie: Coping: Omkering.
              </p>
              {renderCardList([...vstCopingData], 'vst-coping', { transform: 'scale(0.85)' })}
            </div>

            <div style={{ paddingTop: '2rem', borderTop: '1px dashed var(--border-color)' }}>
              <h3 style={{ textAlign: 'center', color: 'var(--text-main)', fontSize: '1.3rem', marginBottom: '0.5rem' }}>
                Aanvullende & Forensische Modi ({vstModiData.length})
              </h3>
              <p style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.95rem', marginBottom: '1.5rem' }}>
                Aanvullende modi uit de literatuur (Arntz et al., 2021): het Blije Kind, de Boze Beschermer, Perfectionistische Overcontroleerder en Bedrog & Manipulatie.
              </p>
              {renderCardList([...vstModiData], 'vst-modi')}
            </div>
          </div>
        )}

        {filter === 'schemas' && (
          <div>
            <h2 className="box-heading" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Individuele Schema's (18)</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Een schema is een vastgeroest patroon van denken, voelen en doen dat vaak al in de vroege jeugd is ontstaan. Ze fungeren als een soort gekleurde bril waardoor je (soms onbewust) naar jezelf, anderen en de wereld kijkt. Hieronder zie je de 18 klassieke schema's die we onderscheiden.
            </p>
            {renderCardList(detailedSchemaCards, 'schema-ind')}

            {vstSchemaData.length > 0 && (
              <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px dashed var(--border-color)' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', border: '1px solid rgba(234, 88, 12, 0.25)', padding: '4px 12px', borderRadius: '9999px', fontWeight: '700', display: 'inline-block', marginBottom: '1.1rem' }}>
                    Theorie-uitbreiding
                  </span>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', margin: '0 0 0.4rem 0' }}>
                    Aanvullende Schema's ({vstSchemaData.length})
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
                    Nieuw voorgestelde schema's uit het internationale position paper (Arntz et al., 2021), gekoppeld aan de behoeften Zelfcoherentie en Rechtvaardigheid.
                  </p>
                </div>
                {renderCardList(vstSchemaData, 'schema-vst')}
              </div>
            )}
          </div>
        )}

        {filter === 'modicats' && (
          <div>
            <h2 className="box-heading" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Modi Categorieën ({modicategorieenData.length})</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Waar schema's de dieperliggende, langdurige patronen of 'knoppen' zijn, is een <strong>modus</strong> de actuele gemoedstoestand waarin je op dít specifieke moment verkeert als een knop wordt ingedrukt. Modi worden ingedeeld in deze 4 hoofdcategorieën.
            </p>
            {renderCardList(modicategorieenData, 'modi-cat', { transform: 'scale(0.85)' })}

            {vstCopingData.length > 0 && (
              <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px dashed var(--border-color)' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', border: '1px solid rgba(234, 88, 12, 0.25)', padding: '4px 12px', borderRadius: '9999px', fontWeight: '700', display: 'inline-block', marginBottom: '1.1rem' }}>
                    Theorie-uitbreiding
                  </span>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', margin: '0 0 0.4rem 0' }}>
                    Aanvullende Copingkaart: Omkering ({vstCopingData.length})
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
                    Geïntroduceerd in de literatuur (Arntz et al., 2021) als vernieuwde benaming voor overcompensatie.
                  </p>
                </div>
                {renderCardList(vstCopingData, 'modi-cat-vst', { transform: 'scale(0.85)' })}
              </div>
            )}
          </div>
        )}

        {filter === 'modi' && (
          <div>
            <h2 className="box-heading" style={{ justifyContent: 'center', marginBottom: '1rem' }}>Individuele Modi (14)</h2>
            <p style={{ textAlign: 'center', color: 'var(--text-muted)', maxWidth: '800px', margin: '0 auto 2rem auto', lineHeight: '1.6' }}>
              Binnen de 4 hoofdcategorieën kunnen we specifieker inzoomen. Hier vind je de 14 meest voorkomende, specifieke gemoedstoestanden of kanten van jezelf (de modi) die geactiveerd kunnen worden wanneer je schema's worden geraakt.
            </p>
            {renderCardList(detailedModeCards, 'modi-ind')}

            {vstModiData.length > 0 && (
              <div style={{ marginTop: '3rem', paddingTop: '2.5rem', borderTop: '1px dashed var(--border-color)' }}>
                <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
                  <span style={{ fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '0.05em', background: 'rgba(234, 88, 12, 0.12)', color: '#ea580c', border: '1px solid rgba(234, 88, 12, 0.25)', padding: '4px 12px', borderRadius: '9999px', fontWeight: '700', display: 'inline-block', marginBottom: '1.1rem' }}>
                    Theorie-uitbreiding
                  </span>
                  <h3 style={{ fontSize: '1.3rem', color: 'var(--text-main)', margin: '0 0 0.4rem 0' }}>
                    Aanvullende & Forensische Modi ({vstModiData.length})
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', maxWidth: '650px', margin: '0 auto' }}>
                    Aanvullende en forensische modi uit de literatuur (Arntz et al., 2021), waaronder het Blije Kind, de Boze Beschermer, Perfectionistische Overcontroleerder en Bedrog & Manipulatie.
                  </p>
                </div>
                {renderCardList(vstModiData, 'modi-vst')}
              </div>
            )}
          </div>
        )}

        </div>
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
