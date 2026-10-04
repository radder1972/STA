import React from 'react';
import { SparklesIcon, FileTextIcon, LayoutDashboardIcon, ArrowLeftIcon, ShieldIcon } from 'lucide-react';
import { PlatformBadge } from './Icons';

export default function Snelstartgids({ onBack }) {
  return (
    <div style={{ maxWidth: '800px', margin: '0 auto', padding: '2rem 1rem 4rem 1rem', fontFamily: 'system-ui, -apple-system, sans-serif' }}>
      
      {/* Header */}
      <button 
        onClick={onBack}
        style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'none', border: 'none', color: 'var(--text-muted)', cursor: 'pointer', fontSize: '0.95rem', padding: 0, marginBottom: '2rem' }}
      >
        <ArrowLeftIcon size={18} /> Terug naar Startpagina
      </button>

      <div style={{ textAlign: 'center', marginBottom: '3rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <PlatformBadge isCurrent={false} theme="hub" marginBottom="2rem" />
        <h1 style={{ fontSize: '2.2rem', fontWeight: '800', color: 'var(--text-main)', margin: '0 0 0.5rem 0', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '12px' }}>
          <SparklesIcon size={32} color="#10b981" /> Snelstartgids
        </h1>
        <p style={{ fontSize: '1.1rem', color: 'var(--text-muted)', margin: 0 }}>
          AI-gestuurde beslissingsondersteuning voor schematherapeuten in 3 stappen.
        </p>
      </div>

      {/* Intro text */}
      <div style={{ background: 'var(--bg-color)', border: '1px solid var(--border-color)', borderRadius: '16px', padding: '1.5rem', marginBottom: '3rem', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-main)', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
        Welkom bij het <strong>Digitaal Schematherapie Platform (DSP)</strong>! Deze suite helpt je om theorie, testdata en praktijkobservaties moeiteloos samen te brengen. Of je nu theoriekaarten zoekt of een complexe casus wilt ontrafelen met AI, het platform fungeert als een scherpe, evidence-based co-therapeut.
      </div>

      {/* Step 1 */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #3b82f6 0%, #2563eb 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)' }}>
          1
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FileTextIcon size={20} color="#3b82f6" /> Data Verzamelen (Optioneel)
          </h2>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
            Laat de cliënt de vragenlijsten invullen voor een exact startpunt.
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
            <li style={{ marginBottom: '6px' }}>Ga naar de <strong>Test-module</strong>.</li>
            <li style={{ marginBottom: '6px' }}>Laat de cliënt de <strong>YSQ-S3</strong> (schema's) en/of <strong>SMI</strong> (modi) invullen.</li>
            <li>Download direct na afronding het veilige, anonieme <strong>CSV-scorebestand</strong>.<br/><em style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>(Tip: Dit bestand slaat geen namen op en kan veilig op je werkstation worden bewaard).</em></li>
          </ul>
        </div>
      </div>

      {/* Step 2 */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '2.5rem' }}>
        <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)' }}>
          2
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <LayoutDashboardIcon size={20} color="#10b981" /> De Tafelopstelling & AI Schemawizard
          </h2>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
            Breng de praktijkcasus tot leven met AI-beslissingsondersteuning.
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
            <li style={{ marginBottom: '6px' }}>Open de <strong>Tafelopstelling</strong>.</li>
            <li style={{ marginBottom: '6px' }}><strong>Koppel (optioneel)</strong> de zojuist gedownloade CSV-bestanden aan de tafel via de knop bovenaan.</li>
            <li style={{ marginBottom: '6px' }}><strong>Beschrijf de casus:</strong> Typ de recente trigger-situatie en het waargenomen gedrag van de cliënt. <em>(Let op: anonimiseer de tekst!)</em></li>
            <li style={{ marginBottom: '6px' }}><strong>Activeer de AI Schemawizard:</strong> Kies het gewenste theoretische kader (5 of 7 basisbehoeften) en geef eventueel een eigen inschatting van de geraakte behoefte.</li>
            <li><strong>Genereer:</strong> Klik op <em>Start de Schemawizard</em>. De AI analyseert nu direct het gedrag, je notities én de testprofielen.</li>
          </ul>
        </div>
      </div>

      {/* Step 3 */}
      <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '3.5rem' }}>
        <div style={{ flexShrink: 0, width: '48px', height: '48px', borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%)', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.5rem', fontWeight: '800', boxShadow: '0 4px 12px rgba(139, 92, 246, 0.3)' }}>
          3
        </div>
        <div>
          <h2 style={{ fontSize: '1.25rem', fontWeight: '800', margin: '0 0 0.5rem 0', color: 'var(--text-main)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <SparklesIcon size={20} color="#8b5cf6" /> Differentiële Hypothese & Regie
          </h2>
          <p style={{ margin: '0 0 1rem 0', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-muted)' }}>
            Verifieer de AI-suggesties en stel de definitieve tafel op.
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.5rem', fontSize: '0.95rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
            <li style={{ marginBottom: '8px' }}><strong>Explainable AI (XAI):</strong> De AI presenteert de top-hypotheses voor het actieve schema en de modus, inclusief een klinisch-logische onderbouwing.</li>
            <li style={{ marginBottom: '8px' }}><strong>Therapeut in de lead:</strong> De AI plaatst automatisch zijn hoogste voorspellingen op tafel, maar <strong>jij behoudt de regie</strong>. Via de hypothese-kaarten (of door op tafel te klikken) kun je de opstelling altijd handmatig overschrijven of overrulen.</li>
            <li><strong>Interventies:</strong> Is de tafel compleet? Gebruik de <em>Gezonde Volwassene Advies</em>-knop voor een concreet 3-stappen interventieplan (Valideer, Begrens, Bied Zorg) en print het rapport als psycho-educatie voor de cliënt.</li>
          </ul>
        </div>
      </div>

      {/* Privacy Block */}
      <div style={{ background: 'rgba(16, 185, 129, 0.05)', border: '1px solid rgba(16, 185, 129, 0.2)', borderRadius: '16px', padding: '1.5rem', display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
        <ShieldIcon size={32} color="#10b981" style={{ flexShrink: 0 }} />
        <div>
          <h3 style={{ margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: '#059669', fontWeight: '800' }}>Privacy & Veiligheid (Art. 9 AVG)</h3>
          <p style={{ margin: 0, fontSize: '0.9rem', lineHeight: '1.6', color: 'var(--text-main)' }}>
            Het DSP is <strong>Local-First</strong>. Er is géén centrale database, er worden géén patiëntgegevens opgeslagen en alles verdwijnt definitief uit het geheugen zodra je de browser sluit of herlaadt. De AI (Google Gemini) wordt enkel aangeroepen op het moment dat je zélf de Schemawizard of Analyse activeert. <strong>Zorg er daarom altijd voor dat je de casus-tekst volledig anonimiseert</strong> (geen namen, werkgevers, etc.). Jouw data wordt <em>nooit</em> gebruikt voor het trainen van modellen.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div style={{ marginTop: '3rem', textAlign: 'center' }}>
        <a 
          href="tafel.html"
          className="btn btn-gradient-tafel"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            padding: '14px 28px',
            fontSize: '1.1rem',
            fontWeight: '700',
            borderRadius: '9999px',
            color: 'white',
            textDecoration: 'none',
            boxShadow: '0 6px 20px rgba(16, 185, 129, 0.3)'
          }}
        >
          <LayoutDashboardIcon size={20} /> Open de Tafelopstelling
        </a>
      </div>

    </div>
  );
}
