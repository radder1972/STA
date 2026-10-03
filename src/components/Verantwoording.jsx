import React from 'react';
import { ArrowLeftIcon, ShieldIcon, InfoIcon } from './Icons';
import packageJson from '../../package.json';

// Vul hier het contactadres in om het contactblok onderaan de pagina te tonen.
export const CONTACT_EMAIL = 'dsp@gmail.com';

const sectionStyle = {
  width: '100%',
  maxWidth: '900px',
  margin: '0 auto 2rem auto',
  padding: '2rem 2.5rem',
  borderRadius: '24px',
  boxSizing: 'border-box',
  textAlign: 'left'
};

const h2StyleBase = {
  margin: '0 0 1rem 0',
  fontSize: '1.4rem',
  fontWeight: '700',
  color: 'var(--text-main)',
  display: 'flex',
  alignItems: 'center',
  gap: '10px'
};

const h3StyleBase = {
  margin: '1.5rem 0 0.4rem 0',
  fontSize: '1.05rem',
  fontWeight: '700',
  color: 'var(--text-main)'
};

const pStyleBase = {
  margin: '0 0 0.9rem 0',
  fontSize: '1rem',
  lineHeight: '1.7',
  color: 'var(--text-main)'
};

const listStyleBase = {
  margin: '0 0 0.9rem 0',
  paddingLeft: '1.4rem',
  fontSize: '1rem',
  lineHeight: '1.7',
  color: 'var(--text-main)'
};

// embedded: toont alleen de inhoud (voor gebruik binnen een tab van een andere pagina)
// showBack: toont de Terug-knop (alleen standalone)
export default function Verantwoording({ onBack, embedded = false, showBack = true, theme = 'game' }) {
  // In de Over-pagina (embedded) dezelfde look als de andere tabs: donkere koppen, 1.1rem tekst
  const h2Style = embedded ? { ...h2StyleBase, fontSize: '1.5rem', color: '#0f172a', margin: '0 0 1rem 0' } : h2StyleBase;
  const h3Style = embedded ? { ...h3StyleBase, fontSize: '1.15rem', color: '#1e293b', margin: '1.75rem 0 0.5rem 0' } : h3StyleBase;
  const pStyle = embedded ? { ...pStyleBase, fontSize: '1.1rem', color: '#475569' } : pStyleBase;
  const listStyle = embedded ? { ...listStyleBase, fontSize: '1.1rem', color: '#475569' } : listStyleBase;
  const callout = theme === 'tafel'
    ? { bg: '#ecfdf5', border: '#10b981', text: '#065f46' }
    : { bg: '#eff6ff', border: '#3b82f6', text: '#1e3a8a' };

  const sectionProps = embedded
    ? { style: { ...sectionStyle, maxWidth: 'none', margin: '0 0 2rem 0', padding: '0 0 2rem 0', borderRadius: 0, borderBottom: '1px solid #e2e8f0' }, className: 'verantwoording-section' }
    : { className: 'glass-panel', style: sectionStyle };

  const body = (
    <>

      {embedded && (
        <>
          <h3 style={{ color: '#0f172a', fontSize: '1.5rem', marginTop: 0, marginBottom: '1rem' }}>Voorbehouden &amp; privacy</h3>
          <div style={{ margin: '0 0 2rem 0', padding: '1.5rem', background: callout.bg, borderRadius: '0 12px 12px 0', borderLeft: `4px solid ${callout.border}` }}>
            <h4 style={{ color: callout.text, fontSize: '1.15rem', marginTop: 0, marginBottom: '0.75rem' }}>Kort samengevat</h4>
            <ul style={{ color: callout.text, fontSize: '1.05rem', lineHeight: '1.6', margin: 0, paddingLeft: '1.25rem' }}>
              <li>Geen accounts, geen eigen database, geen cookies en geen tracking.</li>
              <li>Uw invoer blijft in uw eigen browser, behalve bij AI-functies en bij het bestellen van kaarten.</li>
              <li>Er wordt pas iets naar de AI gestuurd als u zelf op een AI-knop klikt.</li>
              <li>Voer geen herleidbare gegevens in en anonimiseer casuïstiek.</li>
              <li>De suite is ondersteunend. De behandelaar beslist.</li>
            </ul>
          </div>
        </>
      )}

      {/* 1. Doel en reikwijdte */}
      <div {...sectionProps}>
        <h2 style={h2Style}>Doel en reikwijdte</h2>
        <p style={pStyle}>
          De Schematherapie Suite bestaat uit drie onderdelen: <strong>Vragenlijsten</strong> (YSQ-S3 en SMI), <strong>Kaarten</strong> (theoriekaarten en werkvormen) en de <strong>Tafelopstelling</strong> (met AI-ondersteuning). Ze zijn bedoeld als hulpmiddel voor psycho-educatie, reflectie, opleiding en ter ondersteuning van het gesprek tussen behandelaar en cliënt.
        </p>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          De suite is een onafhankelijk, creatief initiatief en is niet verbonden aan of geaccrediteerd door beroepsverenigingen.
        </p>
      </div>

      {/* 2. Voorbehouden */}
      <div {...sectionProps}>
        <h2 style={h2Style}>Voorbehouden</h2>
        <ul style={listStyle}>
          <li><strong>Geen diagnose of behandeling.</strong> Scores, rapportages, kaarten en AI-suggesties zijn ondersteunend en indicatief. Ze zijn geen vervanging voor formele diagnostiek of een gedegen professionele behandeling.</li>
          <li><strong>Auteursrecht vragenlijsten (YSQ-S3 & SMI).</strong> De inhoud van de YSQ-S3 en SMI vragenlijsten valt onder het auteursrecht van hun respectievelijke auteurs en het Schema Therapy Institute. Schematherapie Suite (DSP) is geen uitgever van deze lijsten en claimt geen enkel eigendomsrecht over de inhoud. Deze applicatie is uitsluitend ontworpen als een digitale verwerkingstool (invul- en scoringshulp) voor gelicentieerde zorgprofessionals die reeds rechtmatig over de betreffende vragenlijsten en scoringshandleidingen beschikken voor gebruik binnen hun eigen praktijk.</li>
          <li><strong>Professionele verantwoordelijkheid.</strong> De keuze om deze hulpmiddelen in een sessie in te zetten, en de interpretatie van wat ze laten zien, ligt bij de behandelend professional.</li>
          <li><strong>AI kan fouten maken.</strong> Antwoorden van de AI-functies kunnen onjuist of onvolledig zijn. De aanduiding &ldquo;sterke&rdquo;, &ldquo;matige&rdquo; of &ldquo;zwakke&rdquo; match is een kwalitatieve indicatie van een taalmodel en geen gemeten waarde of kans. De behandelaar beslist welke hypothese of kaart er daadwerkelijk wordt gebruikt.</li>
          <li><strong>Inhoud en bronnen.</strong> De inhoud is zorgvuldig samengesteld op basis van vakliteratuur. De basisset volgt het klassieke schemamodel van Jeffrey Young (18 schema&rsquo;s, 5 domeinen); de uitbreidingsset sluit aan op het position paper van Arntz et al. (2021). Het blijft een eigen uitwerking. Raadpleeg bij twijfel de oorspronkelijke bronnen.</li>
          <li><strong>Taal.</strong> Op de kaarten is bewust gekozen voor toegankelijke taal. Dat kan afwijken van de gangbare vakterminologie.</li>
          <li><strong>Beschikbaarheid.</strong> De suite wordt aangeboden zoals ze is. Er is geen garantie dat alle onderdelen altijd beschikbaar of foutloos zijn. De AI-functies kunnen tijdelijk niet beschikbaar zijn. Voor zover de wet dat toestaat, is de maker niet aansprakelijk voor schade door het gebruik van de suite of door beslissingen die op de uitkomsten zijn gebaseerd.</li>
        </ul>
      </div>

      {/* 3. Privacyverklaring */}
      <div {...sectionProps}>
        <h2 style={h2Style}><ShieldIcon size={26} /> Privacyverklaring</h2>
        <p style={pStyle}>
          Hieronder staat per onderdeel welke gegevens er worden verwerkt en waar ze naartoe gaan. In de suite zelf zijn er geen accounts, geen eigen database, geen cookies en geen tracking- of analysetools. Ook het lettertype wordt vanuit de suite zelf geladen, niet bij een externe partij.
        </p>

        <h3 style={h3Style}>Wie is verantwoordelijk?</h3>
        <ul style={listStyle}>
          <li>Voor de gegevens van een <strong>bestelling</strong> is de maker van de suite de verantwoordelijke in de zin van de AVG. Contact: {CONTACT_EMAIL || 'zie hieronder'}.</li>
          <li>Voor de rest verwerkt de suite uw invoer alleen in uw eigen browser. De suite zelf slaat die invoer niet op. Alleen als u een AI-functie gebruikt, gaat invoer naar Google (zie hieronder).</li>
          <li>Gebruikt u de suite met gegevens van een cliënt, dan bent u als zorgverlener zelf verantwoordelijk voor die gegevens.</li>
        </ul>

        <h3 style={h3Style}>Algemeen</h3>
        <p style={pStyle}>
          Zoals bij elke website kan de hostingpartij technische gegevens verwerken, zoals het IP-adres van uw verzoek, bijvoorbeeld in serverlogs. Daar heeft de applicatie zelf geen zicht op.
        </p>

        <h3 style={h3Style}>Vragenlijsten (YSQ-S3 en SMI)</h3>
        <ul style={listStyle}>
          <li>Uw antwoorden worden in uw eigen browser verwerkt en niet naar een eigen server gestuurd.</li>
          <li>Tijdens het invullen wordt uw voortgang tijdelijk bewaard in de lokale opslag van uw browser, zodat u kunt hervatten. Bij het afronden van een vragenlijst wordt die tussentijdse opslag gewist. Rondt u een vragenlijst niet af, dan blijft de opslag bestaan tot u hem wist via de instellingen van uw browser.</li>
          <li>De YSQ-S3 meet de 18 klassieke schema&rsquo;s en de SMI 14 modi. Schema&rsquo;s of modi daarbuiten, zoals de drie nieuw voorgestelde schema&rsquo;s uit VSt 2021, komen in de uitkomsten niet naar voren en vragen om uw eigen praktijkobservatie.</li>
          <li>Het CSV-bestand en de PDF die u zelf downloadt of print bevatten uw antwoorden en resultaten. Bewaar die zorgvuldig.</li>
          <li>Het gecombineerde rapport heeft een <strong>optionele</strong> AI-analyse. Zie het onderdeel AI-functies hieronder.</li>
        </ul>

        <h3 style={h3Style}>Kaarten</h3>
        <p style={pStyle}>
          Het bekijken van de kaarten, spelregels en printbestanden verwerkt geen persoonsgegevens. Uitzondering is het bestelformulier, zie hieronder.
        </p>

        <h3 style={h3Style}>Kaarten bestellen</h3>
        <ul style={listStyle}>
          <li>Als u kaarten bestelt, vult u naam, e-mailadres, afleveradres, aantal en eventueel een opmerking in. Deze gegevens worden alleen gebruikt om uw bestelling af te handelen. Grondslag: het uitvoeren van uw bestelling.</li>
          <li>Het formulier wordt verstuurd via de formulierdienst <strong>Web3Forms</strong>, die de bestelling als e-mail doorstuurt naar het postvak van de maker. Deze diensten kunnen gegevens buiten de Europese Economische Ruimte verwerken. Zie de privacyverklaring van Web3Forms.</li>
          <li>Bestelgegevens worden bewaard tot de bestelling is afgehandeld, daarna maximaal 7 jaar voor de administratie. Grondslag voor die bewaartermijn: de wettelijke bewaarplicht.</li>
          <li>Om uw adres aan te vullen worden uw postcode en huisnummer opgevraagd bij de <strong>PDOK Locatieserver</strong> (Nederlandse overheid). PDOK ontvangt daarbij uw IP-adres en de ingevulde postcode en huisnummer.</li>
        </ul>

        <h3 style={h3Style}>Tafelopstelling</h3>
        <ul style={listStyle}>
          <li>Verwerkt wordt de tekst die u zelf in het veld &ldquo;situatie&rdquo; typt, de gekozen basisbehoefte en kaarten, en eventueel ingelezen testscores.</li>
          <li>De applicatie slaat deze invoer niet op en stuurt die niet naar een eigen server. De invoer bestaat alleen in uw browser en verdwijnt zodra u de pagina herlaadt of sluit.</li>
          <li>Gebruikt u een AI-functie, dan gaat deze invoer naar Google Gemini. Zie het onderdeel AI-functies.</li>
        </ul>

        <h3 style={h3Style}>AI-functies (Google Gemini)</h3>
        <ul style={listStyle}>
          <li><strong>Welke functies:</strong> de differentiële hypotheses, de respons vanuit de Gezonde Volwassene en de ketenanalyse in de Tafelopstelling, en de optionele AI-analyse in het gecombineerde rapport van de vragenlijsten.</li>
          <li><strong>Welke gegevens:</strong> bij de Tafelopstelling de situatietekst, de gekozen kaarten en een eventueel ingelezen scoreprofiel. Bij het rapport het scoreprofiel (de namen en gemiddelde scores van schema&rsquo;s en modi).</li>
          <li><strong>Waar naartoe:</strong> uw browser stuurt deze informatie rechtstreeks naar de AI-dienst Google Gemini om het antwoord te genereren. Dit kan betekenen dat gegevens buiten de Europese Economische Ruimte worden verwerkt. Google kan invoer tijdelijk bewaren, bijvoorbeeld om misbruik te voorkomen. Voor wat Google daarmee doet gelden de voorwaarden van Google.</li>
          <li><strong>Keuze:</strong> niets wordt verstuurd tenzij u zelf op een AI-knop klikt.</li>
        </ul>

        <h3 style={h3Style}>Gebruik met cliëntgegevens</h3>
        <ul style={listStyle}>
          <li>Voer in de vrije tekst <strong>geen herleidbare gegevens</strong> in, zoals namen, geboortedatums, adressen of werkgevers. Anonimiseer de casus.</li>
          <li>De suite is niet bedoeld voor het verwerken van identificeerbare gezondheidsgegevens. Voor het gebruik van de AI-functies is geen verwerkersovereenkomst met u of uw praktijk gesloten. De suite biedt dus geen juridische dekking voor het verwerken van herleidbare gegevens over iemands gezondheid.</li>
          <li>Gegevens over psychische gezondheid zijn bijzondere persoonsgegevens (artikel 9 AVG) en vragen extra zorg. Een scoreprofiel zonder naam lijkt anoniem, maar kan in combinatie met andere gegevens toch herleidbaar zijn.</li>
          <li>Als professional blijft u zelf verantwoordelijk voor een zorgvuldige omgang met cliëntgegevens, en voor het informeren van uw cliënt.</li>
        </ul>

        <h3 style={h3Style}>Uw rechten</h3>
        <p style={pStyle}>
          Omdat de suite zelf vrijwel geen gegevens bewaart, valt er voor de meeste onderdelen niets in te zien of te verwijderen. Voor gegevens uit een bestelling heeft u recht op inzage, rectificatie, verwijdering, beperking van de verwerking, bezwaar en overdracht van uw gegevens.
          {CONTACT_EMAIL && (
            <> Neem daarvoor contact op via <a href={`mailto:${CONTACT_EMAIL}`} style={{ color: 'var(--primary)', fontWeight: '600' }}>{CONTACT_EMAIL}</a>. Uw verzoek wordt in principe binnen een maand beantwoord.</>
          )}
        </p>
        <p style={{ ...pStyle, marginBottom: 0 }}>
          Bent u het niet eens met de manier waarop uw gegevens worden verwerkt, dan kunt u een klacht indienen bij de Autoriteit Persoonsgegevens (autoriteitpersoonsgegevens.nl).
        </p>
      </div>

      {/* 4. Versie */}
      <div style={{ width: '100%', maxWidth: embedded ? 'none' : '900px', margin: embedded ? 0 : '0 auto 3rem auto', textAlign: 'center', color: embedded ? '#64748b' : 'var(--text-muted)', fontSize: '0.85rem', lineHeight: '1.6' }}>
        Schematherapie Suite v{packageJson.version} &bull; Laatst bijgewerkt: oktober 2026
      </div>
    </>
  );

  if (embedded) return <div className="verantwoording-embedded" style={{ "--text-main": "#334155", "--text-muted": "#64748b", "--primary": "#0284c7" }}>{body}</div>;

  return (
    <div className="view-container" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '2rem' }}>

      {showBack && (
        <div className="no-print" style={{ width: '100%', maxWidth: '900px', margin: '0 auto 1.5rem auto' }}>
          <button className="btn btn-outline" onClick={onBack} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeftIcon size={18} /> Terug
          </button>
        </div>
      )}

      <div style={{ textAlign: 'center', width: '100%', maxWidth: '800px', margin: '0 auto 2.5rem auto' }}>
        <h1 className="text-gradient-hub" style={{ marginBottom: '0.5rem', fontSize: '2.4rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px' }}>
          <InfoIcon size={40} /> Verantwoording
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: 0, fontSize: '1.1rem', lineHeight: '1.5' }}>
          Voorbehouden, werkwijze en privacyverklaring van de Schematherapie Suite
        </p>
      </div>

      {body}
    </div>
  );
}
