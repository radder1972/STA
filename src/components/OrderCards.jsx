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
        } catch (e) {
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
  
  const handleOrderSubmit = async (e) => {
    e.preventDefault();
    if (!orderName || !orderEmail) return;
    setOrderStatus('submitting');
    
    try {
      const response = await fetch("https://formsubmit.co/ajax/matthias.radder@gmail.com", {
        method: "POST",
        headers: { 
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        body: JSON.stringify({
            Naam: orderName,
            Email: orderEmail,
            Aantal: quantity,
            Postcode: orderPostcode,
            Huisnummer: orderHuisnummer,
            Toevoeging: orderToevoeging,
            Straat: orderStraat,
            Woonplaats: orderWoonplaats,
            Opmerkingen: orderAddress,
            _subject: `Nieuwe bestelling: ${quantity}x Het Schematherapie Spel`,
            _replyto: orderEmail
        })
      });
      
      if (response.ok) {
        setOrderStatus('success');
      } else {
        alert("Er ging iets mis bij het verzenden van je bestelling. Probeer het later nog eens.");
        setOrderStatus('idle');
      }
    } catch (error) {
      alert("Fout bij verbinden met de mailserver.");
      setOrderStatus('idle');
    }
  };

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
            marginBottom: '3rem', 
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
              flex: '0 0 140px', 
              borderRadius: '12px', 
              overflow: 'hidden', 
              boxShadow: '0 15px 35px rgba(0,0,0,0.15)', 
              border: '4px solid white', 
              transform: 'translate(20px, -15px) rotate(4deg)',
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
            <div style={{ background: '#f0fdf4', padding: '2rem', borderRadius: '16px', border: '1px solid #bbf7d0', textAlign: 'center', width: '100%' }}>
              <h3 style={{ color: '#166534', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span style={{ fontSize: '1.5rem' }}>✓</span> Bedankt voor je bestelling!
              </h3>
              <p style={{ color: '#15803d', margin: 0, lineHeight: '1.5' }}>
                We hebben je bestelling van <strong>{quantity}x</strong> Het Schematherapie Spel in goede orde ontvangen. Je krijgt z.s.m. een e-mail naar <strong>{orderEmail}</strong> met de verdere afhandeling en betalingsgegevens.
              </p>
            </div>
          ) : (
            <form onSubmit={handleOrderSubmit} style={{ width: '100%' }}>
              <div style={{ background: '#f8fafc', padding: '2rem', borderRadius: '16px', border: '1px solid #e2e8f0', width: '100%', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
                <h3 style={{ fontSize: '1.25rem', marginBottom: '1.5rem', color: '#1e293b', fontWeight: '600' }}>Jouw Gegevens</h3>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.2rem' }}>
                  
                  {/* Aantal Selector integrated */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingBottom: '1rem', borderBottom: '1px solid #e2e8f0', marginBottom: '0.5rem' }}>
                    <span style={{ fontSize: '1.05rem', color: '#475569', fontWeight: '500' }}>Aantal spellen:</span>
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
                      placeholder="Vul hier eventueel een afwijkend afleveradres in..." 
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
                  <ShoppingCartIcon size={22} /> {orderStatus === 'submitting' ? 'Bezig met verzenden...' : 'Bestelling Plaatsen'}
                </button>
                
                <p style={{ margin: '1rem 0 0 0', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
                  Je bestelling wordt handmatig verwerkt. Je zit nergens aan vast tot na de bevestiging.
                </p>
              </div>
            </form>
          )}

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
