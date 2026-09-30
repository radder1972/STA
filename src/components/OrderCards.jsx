import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ShoppingCartIcon, MailIcon } from './Icons';
import SchemaCard from './SchemaCard';
import { ysqSchemaNamesMap, smiModesMap, basisbehoeftenToSchemas, categorieToModi, categorieText, basisbehoeftenText } from '../data/cards';
import { schemaDescriptions } from '../data/descriptions';
import { getCardColor } from '../utils/colors';

export default function OrderCards({ onBack }) {
  const [filter, setFilter] = useState('optie1');
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
    ...Object.keys(basisbehoeftenToSchemas).map((title, index) => ({
      id: title.toLowerCase().replace(/\s+/g, '-'),
      type: 'basisbehoefte',
      title,
      src: `/images/basisbehoeften/${index + 1}.png`,
      color: getCardColor('basisbehoefte', title.toLowerCase().replace(/\s+/g, '-')),
      description: basisbehoeftenText[title] || ''
    })),
    ...Object.keys(categorieToModi).map(title => {
      let img = '';
      if (title === 'Kindmodi') img = '1.png';
      else if (title === 'Oudermodi') img = '2.png';
      else if (title === 'Gezonde volwassene') img = '4.png';
      else if (title === 'Coping: Overgave') img = 'coping_overgave.png';
      else if (title === 'Coping: Vermijding') img = 'coping_vermijding.png';
      else if (title === 'Coping: Overcompensatie') img = 'coping_overcompensatie.png';
      
      const safeId = title.toLowerCase().replace(/[^a-z0-9]/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
      
      return {
        id: safeId,
        type: 'modicategorie',
        title,
        src: `/images/modicategorieen/${img}`,
        color: getCardColor('modicategorie', safeId),
        description: categorieText[title] || ''
      };
    })
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? allCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === allCards.length - 1 ? 0 : prev + 1));
  };

  const currentCard = allCards[currentIndex];

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', overflow: 'hidden' }}>
      


      <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto', position: 'relative', zIndex: 10 }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <ShoppingCartIcon size={48} useGameGradient={true} /> Bestellen
        </h1>
        <h2 style={{ color: 'var(--text-muted)', margin: 0, fontWeight: '500', fontSize: '1.5rem', lineHeight: '1.4' }}>
          Een professioneel gedrukte set voor in je praktijk
        </h2>
      </div>

      <div className="tabs-container no-print" style={{ display: 'flex', justifyContent: 'center', marginBottom: '3rem', width: '100%', overflowX: 'auto', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexWrap: 'nowrap', justifyContent: 'center', background: 'rgba(0,0,0,0.1)', padding: '6px', borderRadius: '12px', gap: '8px', minWidth: 'min-content' }}>
          <a href="mailto:info@schematherapiespel.nl?subject=Interesse in Het Schematherapie Spel" className="btn btn-gradient-game" style={{ display: 'flex', alignItems: 'center', gap: '8px', margin: 0, border: 'none', whiteSpace: 'nowrap', textDecoration: 'none' }}>
            <MailIcon size={18} /> Stuur ons een e-mail
          </a>
        </div>
      </div>

      <div className="order-promo-box">
        {/* Promotional Text */}
        <div style={{ flex: '1 1 auto', minWidth: 0, textAlign: 'left' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', color: 'var(--text-main)', lineHeight: '1.4' }}>Kwaliteit voor in de Praktijk</h3>
          <p style={{ fontSize: '1.15rem', lineHeight: '1.6', color: 'var(--text-muted)', marginBottom: '2rem' }}>
            Het Schematherapie Spel wordt professioneel gedrukt op stevig speelkaartenkarton. Speciaal ontworpen om lang mee te gaan, zelfs bij intensief dagelijks gebruik door therapeuten en cliënten.
          </p>
          <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)', fontWeight: '500', fontSize: '1.05rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '50%', minWidth: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div> 
              Handzaam formaat (64 x 94 mm)
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)', fontWeight: '500', fontSize: '1.05rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '50%', minWidth: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div> 
              Mooie afgeronde hoeken (radius 5 mm)
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)', fontWeight: '500', fontSize: '1.05rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '50%', minWidth: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div> 
              Hoogwaardige matte afwerking
            </li>
            <li style={{ display: 'flex', alignItems: 'center', gap: '12px', color: 'var(--text-main)', fontWeight: '500', fontSize: '1.05rem' }}>
              <div style={{ background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', borderRadius: '50%', minWidth: '28px', height: '28px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>✓</div> 
              Krasbestendig en vuilafstotend
            </li>
          </ul>
        </div>

        {/* Product Photo */}
        <div style={{
          flex: '0 0 240px',
          borderRadius: '24px',
          overflow: 'hidden',
          boxShadow: '0 25px 50px rgba(0,0,0,0.2)',
          border: '1px solid var(--border-color)',
          background: 'white'
        }}>
          <img 
            src="/images/cards-mockup.jpeg" 
            alt="Fysieke set van Het Schematherapie Spel" 
            style={{ width: '100%', height: 'auto', display: 'block' }} 
          />
        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto', position: 'relative', zIndex: 10 }}>
        <h3 style={{ fontSize: '1.5rem', marginBottom: '2rem', color: 'var(--text-main)' }}>Bekijk alvast de interactieve digitale kaarten:</h3>
      </div>

      {/* Interactive Single Card Carousel */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '2rem', 
        marginBottom: '3rem', 
        width: '100%', 
        maxWidth: '800px' 
      }}>
        <button 
          onClick={handlePrev} 
          className="btn" 
          style={{ 
            borderRadius: '50%', 
            width: '60px', 
            height: '60px', 
            padding: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
            border: 'none', 
            color: 'white', 
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(59, 130, 246, 0.6)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)'; }}
        >
          <ArrowLeftIcon size={24} />
        </button>

        <div style={{ 
          position: 'relative', 
          width: '260px', 
          height: '370px', 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center', 
          perspective: '1200px' 
        }}>
          <SchemaCard 
            key={currentCard.id} // forces re-render for flip state reset if needed, though react handles it.
            id={currentCard.id}
            type={currentCard.type}
            title={currentCard.title}
            src={currentCard.src}
            description={currentCard.description}
            color={currentCard.color}
            width="240px"
            height="340px"
            flipOnClick={true}
            style={{ boxShadow: '0 25px 50px rgba(0,0,0,0.2)' }}
          />
        </div>

        <button 
          onClick={handleNext} 
          className="btn" 
          style={{ 
            borderRadius: '50%', 
            width: '60px', 
            height: '60px', 
            padding: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)', 
            border: 'none', 
            color: 'white', 
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
            cursor: 'pointer',
            transition: 'all 0.2s ease'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(59, 130, 246, 0.6)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)'; }}
        >
          <ArrowRightIcon size={24} />
        </button>
      </div>

      <div style={{ color: 'var(--text-muted)', marginBottom: '3rem', fontSize: '1.1rem', fontWeight: '500' }}>
        Kaart {currentIndex + 1} van {allCards.length}
      </div>

      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '700px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)', textAlign: 'center', position: 'relative', zIndex: 10 }}>
        
        <div style={{ display: 'inline-flex', padding: '1.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '50%', color: '#3b82f6', marginBottom: '2rem' }}>
          <MailIcon size={48} useGameGradient={true} />
        </div>
        
        <h2 style={{ color: 'var(--text-main)', marginBottom: '1rem', fontSize: '1.8rem' }}>Heb je nu al interesse?</h2>
        <p style={{ color: 'var(--text-muted)', lineHeight: '1.7', marginBottom: '2.5rem', fontSize: '1.1rem' }}>
          Wil je alvast een exemplaar reserveren of heb je vragen over prijzen en oplages voor jouw praktijk? Neem dan gerust contact met ons op via e-mail.
        </p>
        
      </div>
      
    </div>
  );
}
