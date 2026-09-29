import React, { useEffect } from 'react';
import { ArrowLeftIcon, ShoppingCartIcon, MailIcon } from './Icons';

export default function OrderCards({ onBack }) {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>
      
      <div className="no-print" style={{ alignSelf: 'flex-start', marginBottom: '2rem' }}>
        <button onClick={onBack} className="btn btn-outline" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <ArrowLeftIcon size={18} /> Terug naar het Spelportaal
        </button>
      </div>

      <div style={{ textAlign: 'center', marginBottom: '4rem', maxWidth: '800px' }}>
        <h1 className="text-gradient-game" style={{ fontSize: '3rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '1.5rem' }}>
          <ShoppingCartIcon size={48} useGameGradient={true} /> Kaarten Bestellen
        </h1>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.8', color: 'var(--text-main)' }}>
          Binnenkort is het mogelijk om hier direct een professioneel gedrukte set van Het Schematherapie Spel te bestellen.
        </p>
      </div>

      <div className="glass-panel" style={{ padding: '3rem', width: '100%', maxWidth: '700px', borderRadius: '24px', border: '1px solid var(--border-color)', boxShadow: '0 20px 60px rgba(0, 0, 0, 0.1)', textAlign: 'center' }}>
        
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
