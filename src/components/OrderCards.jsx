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
      subtitle: '55 theoriekaarten • Basisset (43) + VSt 2021 (12)',
      cardsCount: 55,
      price: 49.95,
      oldPrice: 56.90,
      badge: 'Aanbevolen',
      badgeColor: '#2563eb',
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
      subtitle: '43 theoriekaarten • Klassieke theorie (Young & Arntz)',
      cardsCount: 43,
      price: 39.95,
      badge: null,
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
      subtitle: '12 theoriekaarten • Officiële VSt 2021 actualisatie',
      cardsCount: 12,
      price: 16.95,
      badge: 'VSt 2021',
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
          Kun je zelf niet printen of wil je een hoogwaardige afdruk zonder zelf te hoeven knippen en snijden? Til je therapiesessies naar een hoger niveau met deze luxe kaartenset. Ontworpen om de abstracte theorie van schematherapie direct visueel en tastbaar te maken voor cliënten.
        </p>
      </div>

      {/* WEBSHOP HERO SECTION */}
      <div className="glass-panel" style={{ padding: '2.5rem', width: '100%', maxWidth: '850px', margin: '0 auto 4rem auto', position: 'relative', zIndex: 10, borderRadius: '24px' }}>
        <div className="inner-box" style={{ background: 'white', display: 'flex', flexDirection: 'column', padding: '2.5rem', borderRadius: '20px' }}>
          
          <h2 style={{ fontSize: '2rem', margin: '0 0 0.4rem 0', color: 'var(--text-main)', lineHeight: '1.2' }}>
            De Schematherapie Kaartenset
          </h2>
          <p style={{ fontSize: '1.05rem', color: '#64748b', margin: '0 0 1.5rem 0', fontWeight: '500' }}>
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
                    padding: '0.85rem 1.25rem',
                    height: '84px',
                    minHeight: '84px',
                    boxSizing: 'border-box',
                    borderRadius: '14px',
                    border: isSelected ? '2px solid #3b82f6' : '1px solid #e2e8f0',
                    background: isSelected ? '#f0f7ff' : '#ffffff',
                    cursor: 'pointer',
                    transition: 'all 0.15s ease',
                    boxShadow: isSelected ? '0 4px 14px rgba(59, 130, 246, 0.12)' : 'none'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px', minWidth: 0 }}>
                    <div style={{
                      width: '20px',
                      height: '20px',
                      borderRadius: '50%',
                      border: isSelected ? '6px solid #3b82f6' : '2px solid #cbd5e1',
                      background: 'white',
                      boxSizing: 'border-box',
                      flexShrink: 0
                    }} />
                    <div style={{ minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px', lineHeight: '1.3' }}>
                        <span style={{ fontWeight: '700', fontSize: '1.05rem', color: isSelected ? '#1e40af' : '#1e293b', whiteSpace: 'nowrap' }}>
                          {variant.title}
                        </span>
                        {variant.badge && (
                          <span style={{
                            fontSize: '0.7rem',
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
                      <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '3px', lineHeight: '1.3', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {variant.subtitle}
                      </div>
                    </div>
                  </div>

                  <div style={{ textAlign: 'right', flexShrink: 0, paddingLeft: '1rem', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', justifyContent: 'center' }}>
                    <div style={{ fontSize: '1.35rem', fontWeight: '800', color: isSelected ? '#2563eb' : '#1e293b', lineHeight: '1.2' }}>
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
            <div style={{ flex: '1 1 auto', zIndex: 1 }}>
              <h4 style={{ margin: '0 0 0.8rem 0', fontSize: '1.05rem', color: 'var(--text-main)' }}>
                Inhoud van {activeVariant.title}:
              </h4>
              <ul style={{ listStyleType: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
                {activeVariant.specs.map((spec, i) => (
                  <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#334155', fontSize: '0.98rem', fontWeight: '500' }}>
                    <div style={{ color: '#3b82f6', display: 'flex', marginTop: '2px', fontWeight: 'bold' }}>✓</div> 
                    <span>{spec}</span>
                  </li>
                ))}
              </ul>
            </div>
            
            <div style={{ 
              flex: '0 0 210px', 
              borderRadius: '16px', 
              overflow: 'hidden', 
              boxShadow: '0 20px 40px rgba(0,0,0,0.2)', 
              border: '5px solid white', 
              transform: 'translate(25px, -20px) rotate(4deg)',
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
                
                {/* Gekozen selectie & Aantal samenvatting */}
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1.25rem', borderBottom: '1px solid #e2e8f0', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <span style={{ fontSize: '0.82rem', color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: '600', display: 'block' }}>Gekozen pakket</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: '700', color: '#1e293b' }}>{activeVariant.title}</span>
                    <span style={{ fontSize: '0.88rem', color: '#64748b', marginLeft: '6px' }}>({activeVariant.cardsCount} kaarten)</span>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
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

                    <div style={{ textAlign: 'right' }}>
                      <span style={{ fontSize: '0.82rem', color: '#64748b', display: 'block' }}>Totaalbedrag</span>
                      <span style={{ fontSize: '1.5rem', fontWeight: '800', color: '#3b82f6' }}>€ {totalPrice}</span>
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
