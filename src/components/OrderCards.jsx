import React, { useEffect, useState } from 'react';
import { ArrowLeftIcon, ArrowRightIcon, ShoppingCartIcon } from './Icons';
import { Plus, Minus, Check } from 'lucide-react';
import SchemaCard from './SchemaCard';
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
      subtitle: 'Basisset (43) + VSt 2021 Uitbreiding (12)',
      cardsCount: 55,
      price: 49.95,
      oldPrice: 56.90,
      badge: 'Meest Gekozen',
      badgeColor: '#3b82f6',
      specs: [
        'Alle 55 theoriekaarten in één complete professionele set',
        '43 klassieke theoriekaarten + 12 officiële VSt 2021 kaarten',
        'Inclusief 7 basisbehoeften, 21 schema\'s, 20 modi en 7 categorieën',
        'Handzaam speelkaartenformaat (64 x 94 mm) met afgeronde hoeken',
        'Luxe matte afwerking, vuilafstotend en krasvast voor intensief praktijkgebruik'
      ],
      cards: completeCards
    },
    base: {
      id: 'base',
      title: 'Klassieke Basisset',
      subtitle: '43 theoriekaarten (Young & Arntz)',
      cardsCount: 43,
      price: 39.95,
      badge: 'Klassieke Standaard',
      badgeColor: '#10b981',
      specs: [
        '43 theoriekaarten volgens de beproefde Young- & Arntz-theorie',
        '18 schema\'s, 14 modi, 6 modi-categorieën en 5 basisbehoeften',
        'Consistente domein-kleurcodering voor directe visuele herkenning op tafel',
        'Handzaam speelkaartenformaat (64 x 94 mm) met afgeronde hoeken',
        'Luxe matte afwerking, vuilafstotend en krasvast'
      ],
      cards: baseCards
    },
    vst: {
      id: 'vst',
      title: 'VSt 2021 Uitbreidingsset',
      subtitle: '12 officiële VSt theoriekaarten',
      cardsCount: 12,
      price: 16.95,
      badge: 'VSt 2021 Update',
      badgeColor: '#ea580c',
      specs: [
        '12 officiële uitbreidingskaarten (Arntz et al., 2021)',
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
        <h2 style={{ color: 'var(--text-muted)', margin: 0, fontWeight: '500', fontSize: '1.25rem', lineHeight: '1.4' }}>
          Een professioneel gedrukte set voor in jouw praktijk
        </h2>
        <p style={{ marginTop: '1.25rem', fontSize: '1.15rem', color: '#475569', lineHeight: '1.6' }}>
          Kun je zelf niet printen of wil je een hoogwaardige afdruk zonder zelf te hoeven knippen en snijden? Til je therapiesessies naar een hoger niveau met deze luxe theoriekaartenset. Ontworpen om de abstracte theorie van schematherapie direct visueel en tastbaar te maken voor cliënten. Kies hieronder jouw gewenste uitvoering: de complete set, de klassieke basisset of de losse VSt 2021 uitbreiding.
        </p>
      </div>

      {/* WEBSHOP HERO SECTION */}
      <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '960px', margin: '0 auto 4rem auto', position: 'relative', zIndex: 10, borderRadius: '24px' }}>
        <div className="inner-box" style={{ background: 'white', display: 'flex', flexDirection: 'column', padding: '2.5rem', borderRadius: '20px' }}>
          
          {/* VARIANT SELECTOR */}
          <div style={{ marginBottom: '2.5rem' }}>
            <label style={{ display: 'block', fontSize: '1.1rem', fontWeight: '700', color: 'var(--text-main)', marginBottom: '1.2rem' }}>
              1. Kies jouw uitvoering:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.2rem' }}>
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
                      border: isSelected ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                      borderRadius: '16px',
                      padding: '1.4rem',
                      background: isSelected ? 'rgba(59, 130, 246, 0.05)' : 'white',
                      boxShadow: isSelected ? '0 8px 24px rgba(59, 130, 246, 0.16)' : '0 2px 6px rgba(0,0,0,0.03)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      position: 'relative',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      transform: isSelected ? 'translateY(-2px)' : 'none'
                    }}
                  >
                    {/* Badge */}
                    {variant.badge && (
                      <div style={{
                        position: 'absolute',
                        top: '-11px',
                        right: '12px',
                        background: variant.badgeColor || '#3b82f6',
                        color: 'white',
                        fontSize: '0.72rem',
                        fontWeight: '700',
                        padding: '3px 10px',
                        borderRadius: '9999px',
                        textTransform: 'uppercase',
                        letterSpacing: '0.04em',
                        boxShadow: '0 2px 6px rgba(0,0,0,0.15)'
                      }}>
                        {variant.badge}
                      </div>
                    )}

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.4rem' }}>
                        <h3 style={{ margin: 0, fontSize: '1.15rem', color: isSelected ? '#1e40af' : '#1e293b', fontWeight: '700' }}>
                          {variant.title}
                        </h3>
                        <div style={{
                          width: '22px',
                          height: '22px',
                          borderRadius: '50%',
                          border: isSelected ? '6px solid #3b82f6' : '2px solid #cbd5e1',
                          background: 'white',
                          boxSizing: 'border-box',
                          flexShrink: 0
                        }} />
                      </div>

                      <p style={{ margin: '0 0 1.2rem 0', fontSize: '0.88rem', color: '#64748b' }}>
                        {variant.subtitle}
                      </p>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px', marginTop: 'auto', paddingTop: '0.9rem', borderTop: '1px solid #f1f5f9' }}>
                      <span style={{ fontSize: '1.45rem', fontWeight: '800', color: isSelected ? '#3b82f6' : '#1e293b' }}>
                        € {variant.price.toFixed(2).replace('.', ',')}
                      </span>
                      {variant.oldPrice && (
                        <span style={{ fontSize: '0.9rem', color: '#94a3b8', textDecoration: 'line-through' }}>
                          € {variant.oldPrice.toFixed(2).replace('.', ',')}
                        </span>
                      )}
                      <span style={{ fontSize: '0.82rem', color: '#94a3b8', marginLeft: 'auto' }}>
                        {variant.cardsCount} kaarten
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <div style={{ height: '1px', background: '#f1f5f9', margin: '0 0 2.5rem 0' }} />

          {/* PRODUCT DETAILS HEADER */}
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.85rem', margin: '0 0 0.4rem 0', color: 'var(--text-main)', lineHeight: '1.2' }}>
              {activeVariant.title}
            </h2>
            <p style={{ fontSize: '1.05rem', color: '#64748b', margin: 0, fontWeight: '500' }}>
              {activeVariant.subtitle} ({activeVariant.cardsCount} theoriekaarten)
            </p>
          </div>
          
          {/* Price */}
          <div style={{ display: 'flex', alignItems: 'baseline', gap: '12px', marginBottom: '2rem' }}>
            <span style={{ fontSize: '2.5rem', fontWeight: '800', color: '#3b82f6' }}>€ {totalPrice}</span>
            {quantity > 1 && (
              <span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>
                (€ {pricePerUnit.toFixed(2).replace('.', ',')} per stuk)
              </span>
            )}
          </div>

          {/* Specifications Box with Overlapping Image */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            alignItems: 'center', 
            background: 'var(--inner-box-bg, rgba(255,255,255,0.05))', 
            borderRadius: '16px', 
            padding: '1.5rem', 
            marginBottom: '3rem', 
            border: '1px solid var(--border-color)',
            position: 'relative',
            gap: '1.5rem'
          }}>
            {/* Specifications Text */}
            <div style={{ flex: '1 1 320px', zIndex: 1 }}>
              <h4 style={{ margin: '0 0 1rem 0', fontSize: '1.1rem', color: 'var(--text-main)' }}>Specificaties & Inhoud:</h4>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
                {activeVariant.specs.map((spec, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', color: '#334155', fontSize: '1.02rem', fontWeight: '500' }}>
                    <div style={{ color: '#3b82f6', display: 'flex', marginTop: '2px', fontWeight: 'bold' }}>✓</div> 
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            {/* Product Mockup Image */}
            <div style={{ 
              flex: '0 0 210px', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.18)', 
              border: '5px solid white', 
              background: 'white',
              margin: '0 auto',
              position: 'relative',
              zIndex: 2
            }}>
              <img 
                src="/images/cards-mockup.jpeg" 
                alt="Fysieke kaartenset" 
                style={{ width: '100%', height: 'auto', display: 'block' }} 
              />
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
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#1e293b', fontWeight: '600' }}>2. Jouw Gegevens & Afleveradres</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  
                  {/* Aantal Selector */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '0.5rem' }}>
                    <div>
                      <span style={{ fontSize: '1.05rem', color: '#1e293b', fontWeight: '600', display: 'block' }}>Aantal:</span>
                      <span style={{ fontSize: '0.85rem', color: '#64748b' }}>{activeVariant.title}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', background: 'white', borderRadius: '10px', border: '1px solid #cbd5e1', overflow: 'hidden', boxShadow: '0 2px 4px rgba(0,0,0,0.02)' }}>
                      <button type="button" onClick={decreaseQuantity} style={{ border: 'none', background: 'transparent', padding: '8px 12px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Minus size={16} />
                      </button>
                      <div style={{ width: '36px', textAlign: 'center', fontSize: '1.1rem', fontWeight: '600', color: '#334155' }}>
                        {quantity}
                      </div>
                      <button type="button" onClick={increaseQuantity} style={{ border: 'none', background: 'transparent', padding: '8px 12px', cursor: 'pointer', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Plus size={16} />
                      </button>
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.95rem', color: '#475569', fontWeight: '500' }}>Naam</label>
                    <input 
                      type="text" 
                      placeholder="Voor- en achternaam" 
                      required
                      value={orderName}
                      onChange={(e) => setOrderName(e.target.value)}
                      style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '100%', outline: 'none', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', color: '#334155' }}
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
                      style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '100%', outline: 'none', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', color: '#334155' }}
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
                        style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: `1px solid ${addressError ? '#ef4444' : '#cbd5e1'}`, fontSize: '1rem', width: '100%', outline: 'none', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', color: '#334155' }}
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
                          style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: `1px solid ${addressError ? '#ef4444' : '#cbd5e1'}`, fontSize: '1rem', width: '60%', outline: 'none', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', color: '#334155' }}
                        />
                        <input 
                          type="text" 
                          placeholder="Toev" 
                          value={orderToevoeging}
                          onChange={(e) => setOrderToevoeging(e.target.value)}
                          style={{ padding: '0.8rem 0.5rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '40%', outline: 'none', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', color: '#334155', textAlign: 'center' }}
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
                      style={{ padding: '0.8rem 1rem', borderRadius: '10px', border: '1px solid #cbd5e1', fontSize: '1rem', width: '100%', resize: 'vertical', outline: 'none', fontFamily: 'inherit', background: 'white', boxShadow: '0 2px 4px rgba(0,0,0,0.02)', color: '#334155' }}
                    />
                  </div>
                </div>

                <button 
                  type="submit"
                  disabled={orderStatus === 'submitting'}
                  className="btn btn-gradient-game" 
                  style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    gap: '12px', 
                    width: '100%', 
                    padding: '1.2rem', 
                    fontSize: '1.2rem', 
                    borderRadius: '12px', 
                    border: 'none',
                    cursor: orderStatus === 'submitting' ? 'wait' : 'pointer',
                    opacity: orderStatus === 'submitting' ? 0.7 : 1,
                    boxShadow: '0 10px 25px rgba(59, 130, 246, 0.4)',
                    color: 'white',
                    marginTop: '2rem'
                  }}
                >
                  <ShoppingCartIcon size={22} /> {orderStatus === 'submitting' ? 'Bezig met verzenden...' : `Bestel ${activeVariant.title} (€ ${totalPrice})`}
                </button>
                
                <p style={{ margin: '1rem 0 0 0', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
                  Je bestelling wordt handmatig verwerkt. Je zit nergens aan vast tot na de bevestiging.
                </p>
              </div>
            </form>
          )}

        </div>
      </div>

      {/* CAROUSEL HEADER */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem', width: '100%', maxWidth: '800px', margin: '0 auto 2.5rem auto', position: 'relative', zIndex: 10 }}>
        <h3 style={{ fontSize: '2rem', marginBottom: '0.5rem', color: 'var(--text-main)' }}>Bekijk alvast de kaarten</h3>
        <p style={{ color: 'var(--text-muted)', fontSize: '1.1rem', margin: 0 }}>
          Blader digitaal door de geselecteerde set ({activeVariant.title} • {activeVariant.cardsCount} kaarten)
        </p>
      </div>

      {/* Interactive Single Card Carousel */}
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        gap: '2rem', 
        marginBottom: '2rem', 
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
        Kaart {currentIndex + 1} van {currentCards.length}
      </div>

    </div>
  );
}
