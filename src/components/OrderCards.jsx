import React, { useEffect } from 'react';
import { ArrowLeftIcon, ShoppingCartIcon, MailIcon } from './Icons';
import SchemaCard from './SchemaCard';
import { ysqSchemaNamesMap, smiModesMap, basisbehoeftenToSchemas } from '../data/cards';
import { schemaDescriptions } from '../data/descriptions';
import { getCardColor } from '../utils/colors';

export default function OrderCards({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const allCards = [
    ...Object.entries(ysqSchemaNamesMap).map(([filename, title]) => ({
      id: filename,
      type: 'schema',
      title,
      src: `/images/schemas/${filename}.png`,
      color: getCardColor('schema', filename),
      description: schemaDescriptions[title] || ''
    })),
    ...Object.entries(smiModesMap).map(([filename, title]) => ({
      id: filename,
      type: 'mode',
      title,
      src: `/images/modes/${filename}.png`,
      color: getCardColor('mode', filename),
      description: schemaDescriptions[title] || ''
    })),
    ...Object.keys(basisbehoeftenToSchemas).map(title => ({
      id: title.toLowerCase().replace(/\s+/g, '-'),
      type: 'basisbehoefte',
      title,
      src: null,
      color: getCardColor('basisbehoefte', title.toLowerCase().replace(/\s+/g, '-')),
      description: schemaDescriptions[title] || ''
    }))
  ];

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', overflow: 'hidden' }}>
      
      <div className="no-print" style={{ alignSelf: 'flex-start', marginBottom: '2rem', position: 'relative', zIndex: 10 }}>
        <button onClick={onBack} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeftIcon size={18} /> Terug naar het Spelportaal
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '2rem', maxWidth: '800px', position: 'relative', zIndex: 10 }}>
        <h1 className="text-gradient-game" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1rem' }}>
          <ShoppingCartIcon size={48} useGameGradient={true} /> Kaarten Bestellen
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
          Binnenkort is het mogelijk om hier direct een professioneel gedrukte set van Het Schematherapie Spel te bestellen. Bekijk hieronder alvast alle kaarten!
        </p>
      </div>

      {/* Horizontal Carousel */}
      <div style={{ 
        width: '100vw', 
        padding: '2rem', 
        display: 'flex', 
        gap: '2rem', 
        overflowX: 'auto',
        scrollSnapType: 'x mandatory',
        scrollPadding: '2rem',
        marginBottom: '3rem',
        WebkitOverflowScrolling: 'touch',
        alignItems: 'center'
      }}>
        {allCards.map((c, i) => (
          <div key={c.id + i} style={{ scrollSnapAlign: 'center', flexShrink: 0, padding: '1rem' }}>
            <SchemaCard 
              id={c.id}
              type={c.type}
              title={c.title}
              src={c.src}
              description={c.description}
              color={c.color}
              width="220px"
              height="312px"
              flipOnClick={true}
              style={{ boxShadow: '0 15px 35px rgba(0,0,0,0.15)' }}
            />
          </div>
        ))}
      </div>

      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '700px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        
        <div style={{ display: 'inline-flex', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: '#3b82f6', marginBottom: '2rem' }}>
          <MailIcon size={48} useGameGradient={true} />
        </div>
        
        <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.8rem' }}>Heb je nu al interesse?</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
          Wil je alvast een exemplaar reserveren of heb je vragen over prijzen en oplages voor jouw praktijk? Neem dan gerust contact met ons op via e-mail.
        </p>
        
        <a 
          href="mailto:info@schematherapiespel.nl?subject=Interesse in Het Schematherapie Spel" 
          className="btn btn-gradient-game"
          style={{ display: 'inline-flex', alignItems: 'center', gap: '12px', padding: '1rem 2rem', fontSize: '1.1rem' }}
        >
          <MailIcon size={20} /> Stuur ons een e-mail
        </a>
      </div>
      
    </div>
  );
}
