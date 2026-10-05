import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ShoppingCartIcon } from './Icons';
import { Plus, Minus, Check } from 'lucide-react';
import SchemaCard from './SchemaCard';
import Box3D from './Box3D';
import { 
  ysqSchemaNamesMap, 
  smiModesMap, 
  basisbehoeftenData, 
  modicategorieenData, 
  schemaSortOrder, 
  modeSortOrder,
  vstBasisbehoeftenData,
  vstSchemaData,
  vstModiData,
  vstCopingData 
} from '../data/cards';
import cardsStackImg from '../assets/images/cards-stack.jpg';
import { schemaDescriptions } from '../data/descriptions';
import { getCardColor } from '../utils/colors';
import { schemaImages, modeImages } from '../utils/images';

export default function OrderCards({ onBack }) {
  const [selectedVariant, setSelectedVariant] = useState('complete');
  const [quantity, setQuantity] = useState(1);
  const [orderName, setOrderName] = useState('');
  const [orderEmail, setOrderEmail] = useState('');
  const [orderPostcode, setOrderPostcode] = useState('');
  const [orderHuisnummer, setOrderHuisnummer] = useState('');
  const [orderToevoeging, setOrderToevoeging] = useState('');
  const [orderStraat, setOrderStraat] = useState('');
  const [orderWoonplaats, setOrderWoonplaats] = useState('');
  const [addressLoading, setAddressLoading] = useState(false);
  const [addressError, setAddressError] = useState('');
  const [orderAddress, setOrderAddress] = useState('');
  const [orderStatus, setOrderStatus] = useState('idle');
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchAddress = async () => {
      const pc = orderPostcode.replace(/\s+/g, '').toUpperCase();
      if (/^[1-9][0-9]{3}[A-Z]{2}$/.test(pc) && orderHuisnummer) {
        setAddressLoading(true);
        setAddressError('');
        try {
          const res = await fetch(`https://api.pdok.nl/bzk/locatieserver/search/v3_1/free?fq=postcode:${pc}&fq=huisnummer:${orderHuisnummer}&fq=type:adres`);
          const data = await res.json();
          if (data.response && data.response.numFound > 0) {
            const doc = data.response.docs[0];
            setOrderStraat(doc.straatnaam);
            setOrderWoonplaats(doc.woonplaatsnaam);
          } else {
            setOrderStraat('');
            setOrderWoonplaats('');
            setAddressError('Adres niet gevonden. Controleer postcode en huisnummer.');
          }
        } catch {
          setOrderStraat('');
          setOrderWoonplaats('');
          setAddressError('Fout bij ophalen adres.');
        }
        setAddressLoading(false);
      } else {
        setOrderStraat('');
        setOrderWoonplaats('');
        setAddressError('');
      }
    };

    const timer = setTimeout(() => {
      fetchAddress();
    }, 500);

    return () => clearTimeout(timer);
  }, [orderPostcode, orderHuisnummer]);

  // Construct card decks
  const classicalBasisbehoeften = basisbehoeftenData.map(c => ({
    ...c,
    type: 'basisbehoefte',
    style: { transform: 'scale(0.85)' }
  }));

  const vstBasisbehoeften = vstBasisbehoeftenData.map(c => ({
    ...c,
    type: 'basisbehoefte',
    style: { transform: 'scale(0.85)' }
  }));

  const classicalSchemas = Object.keys(schemaImages).map(path => {
    const filename = path.split('/').pop().replace('.png', '');
    const title = ysqSchemaNamesMap[filename] || filename.replace(/_/g, ' ');
    return { 
      id: filename, 
      type: 'schema', 
      src: schemaImages[path], 
      title, 
      color: getCardColor('schema', filename),
      description: schemaDescriptions[title] || '',
      style: { transform: title === 'Kwetsbaarheid voor ziekte en gevaar' ? 'scale(1.4)' : 'scale(1)' }
    };
  }).sort((a, b) => {
    const indexA = schemaSortOrder.indexOf(a.title);
    const indexB = schemaSortOrder.indexOf(b.title);
    if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const vstSchemas = vstSchemaData.map(c => ({
    ...c,
    type: 'schema',
    style: c.style || { transform: 'scale(0.80)' }
  }));

  const classicalModiCategorieen = modicategorieenData.map(c => ({
    ...c,
    type: 'modicategorie',
    style: c.style || { transform: 'scale(0.85)' }
  }));

  const vstCoping = vstCopingData.map(c => ({
    ...c,
    type: 'modicategorie',
    style: c.style || { transform: 'scale(0.75)' }
  }));

  const classicalModi = Object.keys(modeImages).map(path => {
    const filename = path.split('/').pop().replace('.png', '');
    const title = smiModesMap[filename] || filename;
    return { 
      id: filename, 
      type: 'mode', 
      src: modeImages[path], 
      title, 
      color: getCardColor('mode', filename),
      description: schemaDescriptions[title] || '', 
      style: { transform: 'scale(1.1)' } 
    };
  }).sort((a, b) => {
    const indexA = modeSortOrder.indexOf(a.title);
    const indexB = modeSortOrder.indexOf(b.title);
    if (indexA === -1 && indexB === -1) return a.title.localeCompare(b.title);
    if (indexA === -1) return 1;
    if (indexB === -1) return -1;
    return indexA - indexB;
  });

  const vstModi = vstModiData.map(c => ({
    ...c,
    type: 'mode',
    style: c.style || { transform: 'scale(0.70)' }
  }));

  const baseCards = [
    ...classicalBasisbehoeften,
    ...classicalSchemas,
    ...classicalModiCategorieen,
    ...classicalModi
  ];

  const vstCards = [
    ...vstBasisbehoeften,
    ...vstSchemas,
    ...vstCoping,
    ...vstModi
  ];

  const completeCards = [
    ...classicalBasisbehoeften,
    ...vstBasisbehoeften,
    ...classicalSchemas,
    ...vstSchemas,
    ...classicalModiCategorieen,
    ...vstCoping,
    ...classicalModi,
    ...vstModi
  ];

  const VARIANTS = {
    complete: {
      id: 'complete',
      title: 'Complete Kaartenset',
      subtitle: '55 theoriekaarten • 100% 2021 Update Afgestemd',
      description: 'De complete praktijkset met 7 basisbehoeften, 21 schema\'s, 20 modi en 7 coping/categorieën (met B/S/M type-badges).',
      cardsCount: 55,
      price: 19.95,
      oldPrice: 49.95,
      badge: 'POPULAIR',
      badgeColor: '#0ea5e9',
      specs: [
        'Alle 55 theoriekaarten in één complete set voor in de praktijk én thuis',
        '100% Afgestemd op VSt (2021) behandelrichtlijnen van Arntz et al.',
        'Slimme B/S/M type-badges bovenaan elke kaart voor direct sorteren op tafel',
        'Minimalistische poppetjes-illustraties met zachte pastel-gradiënt randen',
        'Handzaam speelkaartformaat (63.5 x 88.9 mm) met luxe matte afwerking',
        'Brievenbuspost € 3,95 in NL & BE (vandaag besteld = binnen 1-2 werkdagen in huis)'
      ],
      cards: completeCards
    },
    base: {
      id: 'base',
      title: 'Klassieke Basisset',
      subtitle: '43 theoriekaarten • Young & Arntz standaard',
      description: 'De beproefde Young & Arntz theorie: 5 basisbehoeften, 18 schema\'s, 14 modi en 6 modi-categorieën voor diagnostiek en behandeling.',
      cardsCount: 43,
      price: 16.95,
      oldPrice: 39.95,
      badge: null,
      badgeColor: '#10b981',
      specs: [
        '43 theoriekaarten volgens de beproefde Young- & Arntz-theorie',
        '18 schema\'s, 14 modi, 6 modi-categorieën en 5 basisbehoeften',
        'Consistente domein-kleurcodering voor directe visuele herkenning op tafel',
        'Handzaam speelkaartformaat (63.5 x 88.9 mm) met afgeronde hoeken',
        'Luxe matte afwerking, vuilafstotend en krasvast'
      ],
      cards: baseCards
    },
    vst: {
      id: 'vst',
      title: 'Theorie Uitbreidingsset',
      subtitle: '12 theoriekaarten • Aanvullende theorie (Arntz et al., 2021)',
      description: 'Theoretische actualisatie (Arntz et al.): 6 aanvullende modi, 3 extra schema\'s, 2 nieuwe behoeften en copingvorm Omkering als update.',
      cardsCount: 12,
      price: 9.95,
      oldPrice: 16.95,
      badge: 'Uitbreiding',
      badgeColor: '#ea580c',
      specs: [
        '12 aanvullende theoriekaarten gebaseerd op Arntz et al. (2021)',
        '6 aanvullende modi (o.a. Blije Kind, Boze Beschermer, Roofdier)',
        '3 aanvullende schema\'s en 1 extra copingvorm (Omkering)',
        '2 nieuwe basisbehoeften (Zelfcoherentie & Rechtvaardigheid)',
        'Ideale aanvulling als je de klassieke basisset al bezit'
      ],
      cards: vstCards
    }
  };

  const activeVariant = VARIANTS[selectedVariant] || VARIANTS.complete;
  const currentCards = activeVariant.cards;

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? currentCards.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === currentCards.length - 1 ? 0 : prev + 1));
  };

  const currentCard = currentCards[currentIndex] || currentCards[0];

  const increaseQuantity = () => setQuantity(prev => prev + 1);
  const decreaseQuantity = () => setQuantity(prev => (prev > 1 ? prev - 1 : 1));

  const pricePerUnit = activeVariant.price;
  const totalPrice = (pricePerUnit * quantity).toFixed(2).replace('.', ',');

  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!orderName || !orderEmail) return;
    setOrderStatus('submitting');
    
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            access_key: "0462cd42-b71e-4a5a-8fa9-ad2d8f5b6626",
            subject: `Nieuwe bestelling: ${quantity}x ${activeVariant.title} (${activeVariant.cardsCount} kaarten)`,
            from_name: orderName,
            replyto: orderEmail,
            Product: `${activeVariant.title} (${activeVariant.cardsCount} kaarten)`,
            Variant: activeVariant.id,
            Prijs_per_stuk: `€ ${activeVariant.price.toFixed(2).replace('.', ',')}`,
            Totaalbedrag: `€ ${totalPrice}`,
            Naam: orderName,
            Emailadres: orderEmail,
            Aantal: quantity,
            Postcode: orderPostcode,
            Huisnummer: orderHuisnummer,
            Toevoeging: orderToevoeging,
            Straat: orderStraat,
            Woonplaats: orderWoonplaats,
            Opmerkingen: orderAddress
        })
      });
      
      if (response.ok) {
        setOrderStatus('success');
      } else {
        alert("Er ging iets mis bij het verzenden van je bestelling. Probeer het later nog eens.");
        setOrderStatus('idle');
      }
    } catch (error) {
      console.error("FormSubmit Error:", error);
      alert("Fout bij verbinden met de mailserver: " + error.message);
      setOrderStatus('idle');
    }
  };

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem', overflow: 'hidden' }}>
      
      {/* HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%', maxWidth: '800px', margin: '0 auto 3rem auto', position: 'relative', zIndex: 10 }}>
        <h1 className="text-gradient-game" style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px' }}>
          <ShoppingCartIcon size={40} useGameGradient={true} /> Bestellen
        </h1>
        <h2 style={{ color: '#0ea5e9', margin: 0, fontWeight: '600', fontSize: '1.25rem', lineHeight: '1.4' }}>
          Een professioneel gedrukte set voor in jouw praktijk
        </h2>
        <p style={{ marginTop: '1.25rem', fontSize: '1.15rem', color: '#475569', lineHeight: '1.6' }}>
          Kun je zelf niet printen of wil je een hoogwaardige afdruk zonder zelf te hoeven knippen en snijden? Til je therapiesessies naar een hoger niveau met deze luxe kaartenset. Ontworpen om de abstracte theorie van schematherapie direct visueel en tastbaar te maken voor cliënten.
        </p>
      </div>

      {/* WEBSHOP HERO SECTION */}
      <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '850px', margin: '0 auto 4rem auto', position: 'relative', zIndex: 10, borderRadius: '24px' }}>
        <div className="inner-box" style={{ background: 'transparent', display: 'flex', flexDirection: 'column', padding: '2.5rem', borderRadius: '20px' }}>
          
          <h2 style={{ fontSize: '2rem', margin: '0 0 0.4rem 0', color: 'var(--text-main)', lineHeight: '1.2' }}>
            De Schematherapie Kaartenset
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#0ea5e9', margin: '0 0 1.5rem 0', fontWeight: '600' }}>
            Kies jouw gewenste uitvoering:
          </p>

          {/* 3 HORIZONTAL VARIANT ROWS */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '2rem' }}>
            {Object.values(VARIANTS).map((variant) => {
              const isSelected = selectedVariant === variant.id;
              return (
                <div
                  key={variant.id}
                  onClick={() => { 
                    setSelectedVariant(variant.id); 
                    setCurrentIndex(0); 
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '1.1rem 1.25rem',
                    boxSizing: 'border-box',
                    borderRadius: '14px',
                    border: isSelected ? '2px solid #0ea5e9' : '1px solid #e2e8f0',
                    background: isSelected ? '#f0f9ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 4px 14px rgba(14, 165, 233, 0.18)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0, flex: 1 }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '6px solid #0ea5e9' : '2px solid #cbd5e1',
                      background: 'transparent',
                      boxSizing: 'border-box',
                      flexShrink: 0
                    }} />
                    <div style={{ minWidth: 0, flex: 1, paddingRight: '0.75rem' }}>
                      {/* Titel + Aantal + Badge */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', lineHeight: '1.3', flexWrap: 'wrap', marginBottom: '4px' }}>
                        <span style={{ fontWeight: '700', fontSize: '1.05rem', color: '#0f172a' }}>
                          {variant.title} <span style={{ color: '#475569', fontWeight: '600', fontSize: '0.95rem' }}>({variant.cardsCount} kaarten)</span>
                        </span>
                        {variant.badge && (
                          <span style={{
                            fontSize: '0.68rem',
                            background: variant.badgeColor,
                            color: 'white',
                            padding: '2px 8px',
                            borderRadius: '9999px',
                            fontWeight: '700',
                            textTransform: 'uppercase',
                            letterSpacing: '0.03em',
                            whiteSpace: 'nowrap',
                            flexShrink: 0
                          }}>
                            {variant.badge}
                          </span>
                        )}
                      </div>

                      {/* Beschrijving */}
                      <div style={{ fontSize: '0.84rem', color: '#475569', lineHeight: '1.4' }}>
                        {variant.description}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: '0.75rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: '#0f172a', lineHeight: '1.2' }}>
                      € {variant.price.toFixed(2).replace('.', ',')}
                    </div>
                    {variant.oldPrice ? (
                      <div style={{ fontSize: '0.8rem', color: '#94a3b8', textDecoration: 'line-through', lineHeight: '1.2', marginTop: '2px' }}>
                        € {variant.oldPrice.toFixed(2).replace('.', ',')}
                      </div>
                    ) : (
                      <div style={{ fontSize: '0.8rem', color: 'transparent', lineHeight: '1.2', marginTop: '2px', userSelect: 'none' }}>
                        &nbsp;
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Specifications Box with Angled Mockup Image */}
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
            <div style={{ flex: '1 1 auto', zIndex: 1, paddingRight: '1.25rem' }}>
              <h4 style={{ margin: '0 0 0.9rem 0', fontSize: '1.1rem', fontWeight: '700', color: '#0f172a', lineHeight: '1.4' }}>
                Inhoud van {activeVariant.title}:
              </h4>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {activeVariant.specs.map((spec, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#334155', fontSize: '0.96rem', lineHeight: '1.55', fontWeight: '400' }}>
                    <Check size={16} color="#0ea5e9" strokeWidth={2.5} style={{ flexShrink: 0, marginTop: '4px' }} />
                    <span style={{ lineHeight: '1.55' }}>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Grote Productfoto buiten de box */}
            <div 
              style={{ 
                flex: '0 0 250px', 
                borderRadius: '18px', 
                overflow: 'visible', 
                boxShadow: '0 25px 50px rgba(0,0,0,0.25), 0 10px 22px rgba(0,0,0,0.12)', 
                 
                transform: 'translate(36px, -24px)',
                background: 'transparent',
                position: 'relative',
                zIndex: 4,
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translate(36px, -28px) scale(1.04)';
                e.currentTarget.style.boxShadow = '0 32px 64px rgba(0,0,0,0.32), 0 12px 26px rgba(0,0,0,0.15)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translate(36px, -24px)';
                e.currentTarget.style.boxShadow = '0 25px 50px rgba(0,0,0,0.25), 0 10px 22px rgba(0,0,0,0.12)';
              }}
            >
              <Box3D scale={1.2} spinning={true} />
            </div>
          </div>

          {/* CAROUSEL: Bekijk alvast de kaarten */}
          <div style={{ 
            marginBottom: '2.5rem', 
            padding: '2.5rem 1.5rem', 
            background: 'rgba(0,0,0,0.02)', 
            borderRadius: '20px', 
            border: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center'
          }}>
            <h3 style={{ fontSize: '1.75rem', marginBottom: '0.4rem', color: 'var(--text-main)', fontWeight: '700' }}>
              Bekijk alvast de kaarten
            </h3>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', margin: '0 0 2rem 0' }}>
              Blader digitaal door de geselecteerde set ({activeVariant.title} • {activeVariant.cardsCount} kaarten)
            </p>

            {/* Interactive Single Card Carousel */}
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '1.75rem', 
              marginBottom: '1.25rem', 
              width: '100%', 
              maxWidth: '650px' 
            }}>
              <button 
                type="button"
                onClick={handlePrev} 
                className="btn btn-gradient-game" 
                style={{ 
                  borderRadius: '50%', 
                  width: '56px', 
                  height: '56px', 
                  padding: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.35)',
                  cursor: 'pointer',
                  border: 'none',
                  flexShrink: 0
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(59, 130, 246, 0.55)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.35)'; }}
              >
                <ArrowLeftIcon size={24} />
              </button>

              <div style={{ 
                position: 'relative', 
                width: '260px', 
                height: '370px', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center'
              }}>
                {currentCard && (
                  <SchemaCard 
                    key={currentCard.id || currentCard.title}
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
                )}
              </div>

              <button 
                type="button"
                onClick={handleNext} 
                className="btn btn-gradient-game" 
                style={{ 
                  borderRadius: '50%', 
                  width: '56px', 
                  height: '56px', 
                  padding: 0, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  boxShadow: '0 10px 25px rgba(59, 130, 246, 0.35)',
                  cursor: 'pointer',
                  border: 'none',
                  flexShrink: 0
                }}
                onMouseOver={(e) => { e.currentTarget.style.transform = 'scale(1.1)'; e.currentTarget.style.boxShadow = '0 15px 30px rgba(59, 130, 246, 0.55)'; }}
                onMouseOut={(e) => { e.currentTarget.style.transform = 'scale(1)'; e.currentTarget.style.boxShadow = '0 10px 25px rgba(59, 130, 246, 0.35)'; }}
              >
                <ArrowRightIcon size={24} />
              </button>
            </div>

            <div style={{ color: 'var(--text-muted)', fontSize: '1rem', fontWeight: '500' }}>
              Kaart {currentIndex + 1} van {currentCards.length}
            </div>
          </div>

          {/* Order Actions */}
          {orderStatus === 'success' ? (
            <div style={{ background: '#f0fdf4', padding: '2.5rem', borderRadius: '16px', border: '1px solid #bbf7d0', textAlign: 'center', width: '100%' }}>
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#22c55e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1rem auto' }}>
                <Check size={28} />
              </div>
              <h3 style={{ color: '#166534', marginBottom: '0.8rem', fontSize: '1.4rem' }}>
                Bedankt voor je bestelling!
              </h3>
              <p style={{ color: '#15803d', margin: 0, fontSize: '1.05rem', lineHeight: '1.6' }}>
                We hebben je bestelling van <strong>{quantity}x {activeVariant.title}</strong> (€ {totalPrice}) in goede orde ontvangen. Je krijgt spoedig een e-mail naar <strong>{orderEmail}</strong> met de verdere afhandeling en betaalinstructies.
              </p>
            </div>
          ) : (
            <form onSubmit={handleOrderSubmit} style={{ width: '100%' }}>
              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                
                {/* Gekozen selectie & Aantal / Totaalbedrag */}
                <div style={{ paddingBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem' }}>
                  <div style={{ marginBottom: '1.2rem' }}>
                    <span style={{ fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', display: 'block', marginBottom: '3px' }}>
                      Gekozen pakket
                    </span>
                    <span style={{ fontSize: '1.25rem', fontWeight: '700', color: '#1e293b' }}>
                      {activeVariant.title}
                    </span>
                    <span style={{ fontSize: '0.9rem', color: '#64748b', marginLeft: '6px' }}>
                      ({activeVariant.cardsCount} theoriekaarten)
                    </span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', gap: '1rem' }}>
                    <div>
                      <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'block', marginBottom: '6px', fontWeight: '500' }}>
                        Aantal sets
                      </span>
                      <div style={{ display: 'inline-flex', alignItems: 'center', background: 'transparent', borderRadius: '10px', border: '1px solid #cbd5e1', overflow: 'visible', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                        <button type="button" onClick={decreaseQuantity} style={{ border: 'none', background: 'transparent', padding: '8px 12px', cursor: 'pointer', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Minus size={16} />
                        </button>
                        <div style={{ width: '36px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '600', color: '#334155' }}>
                          {quantity}
                        </div>
                        <button type="button" onClick={increaseQuantity} style={{ border: 'none', background: 'transparent', padding: '8px 12px', cursor: 'pointer', color: '#0ea5e9', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <Plus size={16} />
                        </button>
                      </div>
                    </div>

                    <div style={{ textAlign: 'right', marginLeft: 'auto' }}>
                      <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'block', marginBottom: '4px', fontWeight: '500' }}>
                        Totaalbedrag
                      </span>
                      <span style={{ fontSize: '1.65rem', fontWeight: '800', color: '#0f172a', lineHeight: '1' }}>
                        € {totalPrice}
                      </span>
                    </div>
                  </div>
                </div>

                <h3 style={{ fontSize: '1.15rem', marginBottom: '1.25rem', color: '#1e293b', fontWeight: '600' }}>Jouw Gegevens & Afleveradres</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#475569', fontWeight: '500' }}>Naam</label>
                    <input 
                      type="text" 
                      placeholder="Voor- en achternaam" 
                      required
                      value={orderName}
                      onChange={(e) => setOrderName(e.target.value)}
                      style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '100%', outline: 'none', background: 'transparent', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', color: '#334155' }}
                    />
                  </div>
                  
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#475569', fontWeight: '500' }}>E-mailadres</label>
                    <input 
                      type="email" 
                      placeholder="Jouw e-mailadres" 
                      required
                      value={orderEmail}
                      onChange={(e) => setOrderEmail(e.target.value)}
                      style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '100%', outline: 'none', background: 'transparent', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', color: '#334155' }}
                    />
                  </div>

                  <div style={{ display: 'flex', gap: '1rem' }}>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#475569', fontWeight: '500' }}>Postcode</label>
                      <input 
                        type="text" 
                        placeholder="1234 AB" 
                        required
                        value={orderPostcode}
                        onChange={(e) => setOrderPostcode(e.target.value)}
                        style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: `1px solid ${addressError ? '#ef4444' : '#cbd5e1'}`, fontSize: '1rem', width: '100%', outline: 'none', background: 'transparent', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', color: '#334155' }}
                      />
                    </div>
                    <div style={{ flex: 1 }}>
                      <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#475569', fontWeight: '500' }}>Huisnummer</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input 
                          type="text" 
                          placeholder="Nr" 
                          required
                          value={orderHuisnummer}
                          onChange={(e) => setOrderHuisnummer(e.target.value)}
                          style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: `1px solid ${addressError ? '#ef4444' : '#cbd5e1'}`, fontSize: '1rem', width: '60%', outline: 'none', background: 'transparent', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', color: '#334155' }}
                        />
                        <input 
                          type="text" 
                          placeholder="Toev" 
                          value={orderToevoeging}
                          onChange={(e) => setOrderToevoeging(e.target.value)}
                          style={{ padding: '0.8rem 0.5rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '40%', outline: 'none', background: 'transparent', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', color: '#334155', textAlign: 'center' }}
                        />
                      </div>
                    </div>
                  </div>

                  {addressLoading && <div style={{ fontSize: '0.85rem', color: '#3b82f6', marginTop: '-0.5rem' }}>Adres zoeken...</div>}
                  {addressError && <div style={{ fontSize: '0.85rem', color: '#ef4444', marginTop: '-0.5rem' }}>{addressError}</div>}
                  {orderStraat && orderWoonplaats && (
                    <div style={{ background: '#f1f5f9', padding: '1rem', borderRadius: '10px', border: '1px solid #cbd5e1', marginTop: '-0.5rem' }}>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155', fontWeight: '500' }}>{orderStraat} {orderHuisnummer}{orderToevoeging}</p>
                      <p style={{ margin: 0, fontSize: '0.95rem', color: '#334155' }}>{orderPostcode.replace(/\s+/g, '').toUpperCase()}, {orderWoonplaats}</p>
                    </div>
                  )}

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#475569', fontWeight: '500' }}>Opmerkingen <span style={{ color: '#94a3b8', fontWeight: 'normal' }}>(optioneel)</span></label>
                    <textarea 
                      placeholder="Vul hier eventueel een afwijkend afleveradres of een opmerking in..." 
                      rows={3}
                      value={orderAddress}
                      onChange={(e) => setOrderAddress(e.target.value)}
                      style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '100%', resize: 'vertical', outline: 'none', fontFamily: 'inherit', background: 'transparent', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', color: '#334155' }}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'center', marginTop: '1.75rem' }}>
                  <button 
                    type="submit"
                    disabled={orderStatus === 'submitting'}
                    className="btn btn-gradient-game" 
                    style={{ 
                      display: 'inline-flex', 
                      alignItems: 'center', 
                      justifyContent: 'center', 
                      gap: '8px', 
                      padding: '0.75rem 2.5rem', 
                      fontSize: '1.05rem', 
                      fontWeight: '600',
                      borderRadius: '10px', 
                      border: 'none',
                      cursor: orderStatus === 'submitting' ? 'wait' : 'pointer',
                      opacity: orderStatus === 'submitting' ? 0.7 : 1,
                      boxShadow: '0 4px 15px rgba(59, 130, 246, 0.3)',
                      color: 'white'
                    }}
                  >
                    <ShoppingCartIcon size={18} /> {orderStatus === 'submitting' ? 'Bezig met verzenden...' : 'Bestellen'}
                  </button>
                </div>
                
                <p style={{ margin: '0.85rem 0 0 0', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
                  Je bestelling wordt handmatig verwerkt. Je zit nergens aan vast tot na de bevestiging.
                </p>
              </div>
            </form>
          )}

        </div>
      </div>

    </div>
  );
}
