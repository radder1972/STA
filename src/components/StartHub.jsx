import React from 'react';
import { 
  ClipboardIcon, 
  BrainIcon, 
  CardsIcon, 
  PlayingCardsIcon, 
  ArrowRightIcon, 
  CheckIcon, 
  ShieldIcon, 
  InfoIcon
} from './Icons';
import { Sparkles } from 'lucide-react';
import packageJson from '../../package.json';

export default function StartHub() {
  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '3rem 1.5rem', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* Top Badge */}
      <div style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '8px',
        padding: '6px 16px',
        borderRadius: '9999px',
        background: 'rgba(59, 130, 246, 0.08)',
        border: '1px solid rgba(59, 130, 246, 0.25)',
        color: '#3b82f6',
        fontSize: '0.9rem',
        fontWeight: '600',
        marginBottom: '1.5rem'
      }}>
        <Sparkles size={16} /> Digitaal Schematherapie Platform
      </div>

      {/* Main Title & Subtitle */}
      <div style={{ textAlign: 'center', marginBottom: '3.5rem', maxWidth: '850px' }}>
        <h1 className="text-gradient" style={{ fontSize: '3rem', fontWeight: '800', marginBottom: '1rem', lineHeight: '1.2' }}>
          Schematherapie Suite
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-muted)', lineHeight: '1.6', margin: '0 auto' }}>
          Drie complementaire digitale toepassingen voor cliënten, therapeuten en professionals in opleiding. 
          Kies hieronder de gewenste werkvorm om direct aan de slag te gaan.
        </p>
      </div>

      {/* 3 Main Choice Cards */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
        gap: '2rem',
        width: '100%',
        marginBottom: '4rem',
        alignItems: 'stretch'
      }}>

        {/* Optie 1: Vragenlijsten & Zelftest */}
        <div className="glass-panel" style={{
          padding: '2.5rem',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          border: '1px solid var(--border-color)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'rgba(107, 114, 128, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--text-main)'
            }}>
              <ClipboardIcon size={32} useGradient={true} />
            </div>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#6b7280',
              background: 'rgba(107, 114, 128, 0.08)',
              padding: '4px 12px',
              borderRadius: '9999px'
            }}>
              Diagnostiek
            </span>
          </div>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: 'var(--text-main)', fontWeight: '700', minHeight: '3.6rem', display: 'flex', alignItems: 'flex-start' }}>
            Vragenlijsten & Zelftest
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.8rem', minHeight: '5.5rem' }}>
            Breng je onderliggende kwetsbaarheden en huidige patronen in kaart met de gevalideerde <strong>YSQ-S3</strong> en <strong>SMI</strong> vragenlijsten. Inclusief uitgebreid gecombineerd analyserapport.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>18 Schema's & 14 Modi in kaart</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Gecombineerd diagnostisch rapport</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>PDF afdrukken & CSV exporteren</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>100% lokaal en vertrouwelijk</span>
            </div>
          </div>

          <a 
            href="test.html" 
            className="btn btn-gradient"
            style={{
              textDecoration: 'none',
              padding: '14px 20px',
              fontSize: '1.05rem',
              fontWeight: '600',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: 'white',
              boxShadow: '0 4px 15px rgba(107, 114, 128, 0.25)'
            }}
          >
            Open Vragenlijsten <ArrowRightIcon size={18} />
          </a>
        </div>

        {/* Optie 2: Kaarten */}
        <div className="glass-panel" style={{
          padding: '2.5rem',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          border: '1px solid var(--border-color)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'rgba(59, 130, 246, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#3b82f6'
            }}>
              <CardsIcon size={32} useGameGradient={true} />
            </div>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#3b82f6',
              background: 'rgba(59, 130, 246, 0.08)',
              padding: '4px 12px',
              borderRadius: '9999px'
            }}>
              Theorie & Print
            </span>
          </div>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: 'var(--text-main)', fontWeight: '700', minHeight: '3.6rem', display: 'flex', alignItems: 'flex-start' }}>
            Kaarten
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.8rem', minHeight: '5.5rem' }}>
            Verken alle 37 theoriekaarten, speelse werkvormen en printopties. Ideaal om schema's en modi tastbaar en visueel te bestuderen in de praktijk of supervisie.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Alle 37 kaarten incl. theorie & tips</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Speelse werkvormen & handleiding</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Drukwerk-export (PeterPrint formaat)</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#3b82f6" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Fysieke kaartenset bestellen</span>
            </div>
          </div>

          <a 
            href="kaarten.html" 
            className="btn btn-gradient-game"
            style={{
              textDecoration: 'none',
              padding: '14px 20px',
              fontSize: '1.05rem',
              fontWeight: '600',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: 'white',
              boxShadow: '0 4px 15px rgba(59, 130, 246, 0.25)'
            }}
          >
            Open Kaarten <ArrowRightIcon size={18} />
          </a>
        </div>

        {/* Optie 3: Tafelopstelling */}
        <div className="glass-panel" style={{
          padding: '2.5rem',
          borderRadius: '24px',
          display: 'flex',
          flexDirection: 'column',
          transition: 'transform 0.2s ease, box-shadow 0.2s ease',
          border: '1px solid var(--border-color)',
          boxShadow: '0 10px 30px rgba(0, 0, 0, 0.05)',
          position: 'relative'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: '16px',
              background: 'rgba(16, 185, 129, 0.1)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#10b981'
            }}>
              <PlayingCardsIcon size={32} useTafelGradient={true} />
            </div>
            <span style={{
              fontSize: '0.8rem',
              fontWeight: '700',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              color: '#059669',
              background: 'rgba(16, 185, 129, 0.1)',
              padding: '4px 12px',
              borderRadius: '9999px'
            }}>
              Interventie
            </span>
          </div>

          <h2 style={{ fontSize: '1.5rem', marginBottom: '0.8rem', color: 'var(--text-main)', fontWeight: '700', minHeight: '3.6rem', display: 'flex', alignItems: 'flex-start' }}>
            Tafelopstelling
          </h2>

          <p style={{ color: 'var(--text-muted)', fontSize: '1rem', lineHeight: '1.6', marginBottom: '1.8rem', minHeight: '5.5rem' }}>
            Breng een concrete conflictsituatie of emotionele trigger interactief in kaart. Koppel de reactie (modus) aan het geraakte schema en ontvang direct advies voor je Gezonde Volwassene.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', marginTop: 'auto', marginBottom: '2rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Interactieve opstelling op tafel</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Automatisch voorspellen o.b.v. situatie</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Gezonde Volwassene handelingsadvies</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '0.95rem', color: 'var(--text-main)', lineHeight: '1.4' }}>
              <CheckIcon size={18} color="#10b981" style={{ flexShrink: 0, marginTop: '2px' }} />
              <span>Uitgebreide analyse & printbaar</span>
            </div>
          </div>

          <a 
            href="tafel.html" 
            className="btn btn-gradient-tafel"
            style={{
              textDecoration: 'none',
              padding: '14px 20px',
              fontSize: '1.05rem',
              fontWeight: '600',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              color: 'white',
              boxShadow: '0 4px 15px rgba(16, 185, 129, 0.25)'
            }}
          >
            Open Tafelopstelling <ArrowRightIcon size={18} />
          </a>
        </div>

      </div>

      {/* Trust & Info Strip */}
      <div className="glass-panel" style={{
        width: '100%',
        padding: '2rem 2.5rem',
        borderRadius: '20px',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '2rem',
        marginBottom: '3rem',
        border: '1px solid var(--border-color)'
      }}>
        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(16, 185, 129, 0.1)', color: '#10b981', flexShrink: 0 }}>
            <ShieldIcon size={24} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-main)', fontSize: '1.05rem' }}>100% Privacy & Lokaal</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Alle antwoorden en situaties worden uitsluitend lokaal in je browser verwerkt. Geen tracking, geen accounts, geen centrale database.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', flexShrink: 0 }}>
            <BrainIcon size={24} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-main)', fontSize: '1.05rem' }}>Gevalideerde Theorie</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Gebaseerd op het wetenschappelijk onderbouwde schematherapie model van Jeffrey Young en de richtlijnen van de VSt / ISST.
            </p>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
          <div style={{ padding: '10px', borderRadius: '12px', background: 'rgba(107, 114, 128, 0.1)', color: 'var(--text-main)', flexShrink: 0 }}>
            <InfoIcon size={24} />
          </div>
          <div>
            <h4 style={{ margin: '0 0 0.3rem 0', color: 'var(--text-main)', fontSize: '1.05rem' }}>Meer Informatie</h4>
            <p style={{ margin: 0, fontSize: '0.95rem', color: 'var(--text-muted)', lineHeight: '1.5' }}>
              Zoek je achtergrondinformatie of een geregistreerde therapeut? Bezoek de officiële website van de{' '}
              <a href="https://www.schematherapie.nl/home" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--primary)', fontWeight: '600' }}>
                Vereniging voor Schematherapie
              </a>.
            </p>
          </div>
        </div>
      </div>

      {/* Version Footer */}
      <div style={{ textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.85rem' }}>
        Schematherapie Suite v{packageJson.version} &bull; Vrij te gebruiken voor psycho-educatie en opleiding
      </div>

    </div>
  );
}
