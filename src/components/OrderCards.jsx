import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ShoppingCartIcon, MailIcon, StarIcon } from './Icons';
import { Plus, Minus } from 'lucide-react';
import SchemaCard from './SchemaCard';
import { ysqSchemaNamesMap, smiModesMap, basisbehoeftenToSchemas, categorieToModi, categorieText, basisbehoeftenText } from '../data/cards';
import { schemaDescriptions } from '../data/descriptions';
import { getCardColor } from '../utils/colors';

export default function OrderCards({ onBack }) {
  const [filter, setFilter] = useState('optie1');
  const [quantity, setQuantity] = useState(1);

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
      description: schemaDescriptions[title] || '',
      style: { transform: title === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(1)' }
    })),
    ...Object.entries(smiModesMap).map(([filename, title]) => ({
      id: filename,
      type: 'mode',
      title,
      src: `/images/modes/${filename}.png`,
      color: getCardColor('mode', filename),
      description: schemaDescriptions[title] || '',
      style: { transform: 'scale(1.1)' }
    })),
    ...Object.keys(basisbehoeftenToSchemas).map((title, index) => ({
      id: title.toLowerCase().replace(/\s+/g, '-'),
      type: 'basisbehoefte',
      title,
      src: `/images/basisbehoeften/${index + 1}.png`,
      color: getCardColor('basisbehoefte', title.toLowerCase().replace(/\s+/g, '-')),
      description: basisbehoeftenText[title] || '',
      style: { transform: 'scale(0.85)' }
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
        description: categorieText[title] || '',
        style: title === 'Coping: Vermijding' 
          ? { transform: 'scale(0.85)', width: '80%', height: '80%' } 
          : { transform: 'scale(0.85)' }
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

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const pricePerUnit = 39.95;
  const totalPrice = (pricePerUnit * quantity).toFixed(2).replace('.', ',');
  
  const mailBody = `Beste,\n\nIk wil graag ${quantity} set(s) van Het Schematherapie Spel bestellen.\n\nKunt u mij informeren over de verdere afhandeling en betaling?\n\nMet vriendelijke groet,\n[Jouw naam]`;
  const mailHref = `mailto:info@schematherapiespel.nl?subject=Bestelling: ${quantity}x Het Schematherapie Spel&body=${encodeURIComponent(mailBody)}`;

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', overflow: 'hidden' }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '1000px', margin: '0 auto 3rem auto', position: 'relative', zIndex: 10 }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '2.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <ShoppingCartIcon size={40} useGameGradient={true} /> Bestellen
        </h1>
        <h2 style={{ color: 'var(--text-muted)', margin: 0, fontWeight: '500', fontSize: '1.25rem', lineHeight: '1.4' }}>
          De professioneel gedrukte set voor in jouw praktijk
        </h2>
      </div>

      {/* WEBSHOP HERO SECTION */}
      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '900px', margin: '0 auto 4rem auto', position: 'relative', zIndex: 10 }}>
        <div className="inner-box" style={{ background: 'white', display: 'flex', flexDirection: 'column', padding: '2.5rem' }}>
          
          <h2 style={{ fontSize: '2rem', margin: '0 0 0.5rem 0', color: 'var(--text-main)', lineHeight: '1.2' }}>Het Schematherapie Spel</h2>
          <p style={{ fontSize: '1.1rem', color: '#64748b', margin: '0 0 2rem 0', fontWeight: '500' }}>Complete Fysieke Kaartenset</p>
          
          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#3b82f6' }}>€ {totalPrice}</span>
            {quantity > 1 && <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>(€ {pricePerUnit.toString().replace('.', ',')} per stuk)</span>}
          </div>

          {/* Specifications Box with Overlapping Image */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'nowrap', 
            alignItems: 'center', 
            background: 'var(--inner-box-bg, rgba(255,255,255,0.05))', 
            borderRadius: '16px', 
            padding: '1.5rem', 
            paddingRight: '1rem',
            marginBottom: '2.5rem', 
            border: '1px solid var(--border-color)',
            position: 'relative'
          }}>
            {/* Specifications Text */}
            <div style={{ flex: '1 1 auto', zIndex: 1 }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>Specificaties:</h4>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#334155', fontSize: '1.05rem', fontWeight: '500' }}>
                  <div style={{ color: '#3b82f6', display: 'flex', marginTop: '2px' }}>✓</div> 
                  <span>43 theoriekaarten & actiekaarten</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#334155', fontSize: '1.05rem', fontWeight: '500' }}>
                  <div style={{ color: '#3b82f6', display: 'flex', marginTop: '2px' }}>✓</div> 
                  <span>Handzaam speelformaat (64 x 94 mm)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#334155', fontSize: '1.05rem', fontWeight: '500' }}>
                  <div style={{ color: '#3b82f6', display: 'flex', marginTop: '2px' }}>✓</div> 
                  <span>Mooie afgeronde hoeken (radius 5 mm)</span>
                </li>
                <li style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#334155', fontSize: '1.05rem', fontWeight: '500' }}>
                  <div style={{ color: '#3b82f6', display: 'flex', marginTop: '2px' }}>✓</div> 
                  <span>Hoogwaardige matte afwerking (vuilafstotend)</span>
                </li>
              </ul>
            </div>
            
            {/* Overlapping Product Image */}
            <div style={{ 
              flex: '0 0 160px', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              boxShadow: '0 15px 35px rgba(0,0,0,0.15)', 
              border: '4px solid white', 
              transform: 'translate(15px, -15px) rotate(3deg)',
              background: 'white',
              position: 'relative',
              zIndex: 2
            }}>
              <img 
                src="/images/cards-mockup.jpeg" 
                alt="Fysieke set van Het Schematherapie Spel" 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
            </div>
          </div>

          {/* Order Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', maxWidth: '400px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ fontSize: '1.1rem', color: 'var(--text-main)', fontWeight: '500' }}>Aantal:</span>
              <div style={{ display: 'flex', alignItems: 'center', background: 'var(--bg-color)', borderRadius: '12px', border: '1px solid var(--border-color)', overflow: 'hidden' }}>
                <button onClick={decreaseQuantity} style={{ border: 'none', background: 'transparent', padding: '12px 16px', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Minus size={18} />
                </button>
                <div style={{ width: '40px', textAlign: 'center', fontSize: '1.2rem', fontWeight: '600', color: 'var(--text-main)' }}>
                  {quantity}
                </div>
                <button onClick={increaseQuantity} style={{ border: 'none', background: 'transparent', padding: '12px 16px', cursor: 'pointer', color: 'var(--text-main)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Plus size={18} />
                </button>
              </div>
            </div>

            <a 
              href={mailHref} 
              className="btn btn-gradient-game" 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center', 
                gap: '12px', 
                width: '100%', 
                padding: '1.2rem', 
                fontSize: '1.3rem', 
                borderRadius: '16px', 
                textDecoration: 'none',
                boxShadow: '0 10px 30px rgba(59, 130, 246, 0.3)'
              }}
            >
              <ShoppingCartIcon size={24} /> Bestel Nu via E-mail
            </a>
            <p style={{ margin: 0, textAlign: 'center', fontSize: '0.9rem', color: 'var(--text-muted)' }}>
              Je bestelling wordt per e-mail verwerkt. Je zit nog nergens aan vast.
            </p>
          </div>

        </div>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto', position: 'relative', zIndex: 10 }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '1rem', color: 'var(--text-main)' }}>Bekijk alvast de kaarten</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem' }}>Blader digitaal door de complete set theoriekaarten</p>
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
          className="btn btn-gradient-game" 
          style={{ 
            borderRadius: '50%', 
            width: '60px', 
            height: '60px', 
            padding: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center', 
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
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
            key={currentCard.id}
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
            imageStyle={currentCard.style}
          />
        </div>

        <button 
          onClick={handleNext} 
          className="btn btn-gradient-game" 
          style={{ 
            borderRadius: '50%', 
            width: '60px', 
            height: '60px', 
            padding: 0, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)'
          }}
          onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(59, 130, 246, 0.6)'; }}
          onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.4)'; }}
        >
          <ArrowRightIcon size={24} />
        </button>
      </div>

      <div style={{ color: 'var(--text-muted)', marginBottom: '4rem', fontSize: '1.1rem', fontWeight: '500' }}>
        Kaart {currentIndex + 1} van {allCards.length}
      </div>

    </div>
  );
}
