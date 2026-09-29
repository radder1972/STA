import React, { useEffect } from 'react';
import { ArrowLeftIcon, ShoppingCartIcon, MailIcon } from './Icons';
import SchemaCard from './SchemaCard';

export default function OrderCards({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
          Binnenkort is het mogelijk om hier direct een professioneel gedrukte set van Het Schematherapie Spel te bestellen.
        </p>
      </div>

      {/* CSS 3D Card Fan */}
      <div style={{ 
        position: 'relative', 
        height: '380px', 
        width: '100%', 
        maxWidth: '800px', 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        marginBottom: '3rem',
        perspective: '1200px'
      }}>
        {/* Basisbehoefte Card */}
        <div style={{ position: 'absolute', transform: 'translateX(-140px) rotate(-15deg) translateY(30px)', zIndex: 1, cursor: 'pointer' }}>
          <SchemaCard 
            id="veilige-hechting"
            type="basisbehoefte"
            title="Veilige hechting"
            description="Veiligheid, stabiliteit, verzorging en onvoorwaardelijke acceptatie. Een thuishaven zonder angst voor verlating of afwijzing."
            color="#3b82f6"
            width="200px"
            height="284px"
            flipOnClick={true}
            style={{ boxShadow: '-10px 15px 30px rgba(0,0,0,0.15)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
          />
        </div>
        
        {/* Schema Card (Front Center) */}
        <div style={{ position: 'absolute', transform: 'translateX(0) rotate(0deg) translateY(-10px)', zIndex: 3, cursor: 'pointer' }}>
          <SchemaCard 
            id="verlating"
            type="schema"
            title="Verlating / Instabiliteit"
            description="Het gevoel dat belangrijke personen in je leven je zullen verlaten, onbetrouwbaar zijn, of er niet altijd voor je kunnen zijn."
            color="#8b5cf6"
            width="220px"
            height="312px"
            flipOnClick={true}
            style={{ boxShadow: '0 20px 50px rgba(0,0,0,0.25)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
          />
        </div>

        {/* Mode Card */}
        <div style={{ position: 'absolute', transform: 'translateX(140px) rotate(15deg) translateY(30px)', zIndex: 2, cursor: 'pointer' }}>
          <SchemaCard 
            id="kwetsbare-kind"
            type="mode"
            title="Kwetsbare kind"
            description="Voelt zich eenzaam, verlaten, misbruikt, onbegrepen, niet gesteund, angstig of kwetsbaar."
            color="#10b981"
            width="200px"
            height="284px"
            flipOnClick={true}
            style={{ boxShadow: '10px 15px 30px rgba(0,0,0,0.15)', transition: 'transform 0.3s ease, box-shadow 0.3s ease' }}
          />
        </div>
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
