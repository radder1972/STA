import React from 'react';

import imgB1 from '../assets/images/basisbehoeften/1.png';
import imgB2 from '../assets/images/basisbehoeften/2.png';
import imgB3 from '../assets/images/basisbehoeften/3.png';
import imgB4 from '../assets/images/basisbehoeften/4.png';
import imgB5 from '../assets/images/basisbehoeften/5.png';

import imgM1 from '../assets/images/modicategorieen/1.png';
import imgM2 from '../assets/images/modicategorieen/2.png';
import imgM3a from '../assets/images/modicategorieen/coping_overgave.png';
import imgM3b from '../assets/images/modicategorieen/coping_vermijding.png';
import imgM3c from '../assets/images/modicategorieen/coping_overcompensatie.png';
import imgM4 from '../assets/images/modicategorieen/4.png';

export const basisbehoeftenText = {
  'Veiligheid & Verbinding': 'Deze ervaren met anderen. Zorg en aandacht krijgen in een veilige, betrouwbare omgeving. Je beschermd, verbonden en gewaardeerd voelen.',
  'Veilige hechting': 'Deze ervaren met anderen. Zorg en aandacht krijgen in een veilige, betrouwbare omgeving. Je beschermd, verbonden en gewaardeerd voelen.',
  'Autonomie & Competentie': 'De wereld mogen onderzoeken. Je eigen keuzes leren maken en ervaringen opdoen, op een veilige manier.',
  'Autonomie': 'De wereld mogen onderzoeken. Je eigen keuzes leren maken en ervaringen opdoen, op een veilige manier.',
  'Vrijheid van expressie': 'Je gevoelens en belevingen mogen uiten en ervaren. Voelen dat je mag zijn wie je bent.',
  'Vrije expressie': 'Je gevoelens en belevingen mogen uiten en ervaren. Voelen dat je mag zijn wie je bent.',
  'Spontaniteit en spel': 'De ruimte hebben om te ontdekken, leren, voelen, verbazen, experimenteren en ervaren, en daarvan te genieten.',
  'Spontaniteit & Spel': 'De ruimte hebben om te ontdekken, leren, voelen, verbazen, experimenteren en ervaren, en daarvan te genieten.',
  'Realistische grenzen': 'Vaardigheden leren om je eigen en andermans grenzen te respecteren, en om te kunnen functioneren in een groep. Je emoties op een gezonde manier leren reguleren.',
  'Zelfcoherentie': 'Er wordt tegemoet gekomen aan je verlangen om jezelf te zien als samenhangend geheel, je psychisch gezond te voelen en een zinvol leven te leiden. Aan deze behoefte kan pas worden voldaan als ook aan andere behoeften is voldaan.',
  'Rechtvaardigheid': 'De wereld leren kennen in een sfeer van rechtvaardigheid, waarin onrecht waar mogelijk wordt gecorrigeerd en waarin jou uitleg gegeven wordt over regels.'
};

export const categorieText = {
  'Kindmodi': 'De modus waarin je je kwetsbaar, eenzaam, boos of impulsief voelt, net als een kind van vroeger dat iets tekortkwam.',
  'Oudermodi': 'De geïnternaliseerde stem van een veeleisende of straffende ouder. Een innerlijke criticus die zegt dat je tekortschiet.',
  'Coping: Overgave': 'Je gedraagt je alsof het schema 100% waar is. Je past je aan en ondergaat de situatie passief.',
  'Coping: Vermijding': 'Je vermijdt de emotionele pijn van het schema door situaties uit de weg te gaan of jezelf af te leiden/verdoven.',
  'Coping: Overcompensatie': 'Je vecht tegen het schema door je precies tegenovergesteld te gedragen aan wat het schema dicteert.',
  'Gezonde volwassene': 'De gezonde kant die zorgt voor het kwetsbare kind, gezonde grenzen stelt en de strenge oudermodi bestrijdt.'
};

export const basisbehoeftenToSchemas = {
  'Veiligheid & Verbinding': ['Verlating / Instabiliteit', 'Wantrouwen / Misbruik', 'Emotionele verwaarlozing', 'Minderwaardigheid / Schaamte', 'Sociaal isolement / Vervreemding'],
  'Veilige hechting': ['Verlating / Instabiliteit', 'Wantrouwen / Misbruik', 'Emotionele verwaarlozing', 'Minderwaardigheid / Schaamte', 'Sociaal isolement / Vervreemding'],
  'Autonomie & Competentie': ['Afhankelijkheid / Onbekwaamheid', 'Kwetsbaarheid voor ziekte en gevaar', 'Verstrengeling / Kluwen', 'Mislukking'],
  'Autonomie': ['Afhankelijkheid / Onbekwaamheid', 'Kwetsbaarheid voor ziekte en gevaar', 'Verstrengeling / Kluwen', 'Mislukking'],
  'Vrijheid van expressie': ['Onderwerping', 'Zelfopoffering', 'Goedkeuring en erkenning zoeken'],
  'Vrije expressie': ['Onderwerping', 'Zelfopoffering', 'Goedkeuring en erkenning zoeken'],
  'Spontaniteit en spel': ['Negativiteit en pessimisme', 'Emotionele geremdheid', 'Meedogenloze normen / Overmatig kritisch', 'Bestraffende houding'],
  'Realistische grenzen': ['Zich rechten toe-eigenen', 'Gebrek aan zelfcontrole / Zelfdiscipline'],
  'Zelfcoherentie': ['Gebrek aan coherente identiteit', 'Gebrek aan een betekenisvolle wereld'],
  'Rechtvaardigheid': ['Onrechtvaardigheid']
};

export const categorieToModi = {
  'Kindmodi': ['Kwetsbare kind', 'Razende kind', 'Impulsieve kind', 'Ongedisciplineerde kind', 'Boze kind', 'Blije kind'],
  'Oudermodi': ['Straffende ouder', 'Veeleisende ouder'],
  'Coping: Overgave': ['Willoze inschikkelijke'],
  'Coping: Vermijding': ['Onthechte beschermer', 'Onthechte zelfsusser', 'Boze beschermer'],
  'Coping: Overcompensatie': ['Wantrouwende overcontroleerder', 'Zelfverheerlijker', 'Pest en aanval', 'Perfectionistische overcontroleerder', 'Bedrog en manipulatie', 'Aandacht- en erkenningzoeker', 'Roofdier'],
  'Coping: Omkering': ['Wantrouwende overcontroleerder', 'Zelfverheerlijker', 'Pest en aanval', 'Perfectionistische overcontroleerder', 'Bedrog en manipulatie', 'Aandacht- en erkenningzoeker', 'Roofdier'],
  'Gezonde volwassene': ['Gezonde volwassene', 'Blije kind']
};

export const ysqSchemaNamesMap = {
  'Abandonment': 'Verlating / Instabiliteit',
  'Mistrust': 'Wantrouwen / Misbruik',
  'Defectiveness_unlovability': 'Minderwaardigheid / Schaamte',
  'Emotional deprivation': 'Emotionele verwaarlozing',
  'Social isolation_Alienation': 'Sociaal isolement / Vervreemding',
  'Practical incompetence_Dependence': 'Afhankelijkheid / Onbekwaamheid',
  'Vulnerability to harm_illness': 'Kwetsbaarheid voor ziekte en gevaar',
  'Enmeshment': 'Verstrengeling / Kluwen',
  'Failure to achieve': 'Mislukking',
  'Insufficient self-control_self-discipline': 'Gebrek aan zelfcontrole / Zelfdiscipline',
  'Entitlement_Superiority': 'Zich rechten toe-eigenen',
  'Subjugation': 'Onderwerping',
  'Self-sacrifice': 'Zelfopoffering',
  'Admiration_Recognition-seeking': 'Goedkeuring en erkenning zoeken',
  'Pessimism_Worry': 'Negativiteit en pessimisme',
  'Emotional inhibition': 'Emotionele geremdheid',
  'Unrelenting Standards': 'Meedogenloze normen / Overmatig kritisch',
  'Self-punitiveness': 'Bestraffende houding'
};

export const smiModesMap = {
  'kk': 'Kwetsbare kind',
  'rk': 'Razende kind',
  'ik': 'Impulsieve kind',
  'ok': 'Ongedisciplineerde kind',
  'bk': 'Boze kind',
  'wi': 'Willoze inschikkelijke',
  'ob': 'Onthechte beschermer',
  'oz': 'Onthechte zelfsusser',
  'wk': 'Wantrouwende overcontroleerder',
  'zh': 'Zelfverheerlijker',
  'pa': 'Pest en aanval',
  'so': 'Straffende ouder',
  'vo': 'Veeleisende ouder',
  'gv': 'Gezonde volwassene'
};

export const schemaGroups = [
  { group: 'Verlating & Afwijzing', titles: ['Verlating / Instabiliteit', 'Wantrouwen / Misbruik', 'Emotionele verwaarlozing', 'Minderwaardigheid / Schaamte', 'Sociaal isolement / Vervreemding'] },
  { group: 'Verzwakte Autonomie', titles: ['Afhankelijkheid / Onbekwaamheid', 'Kwetsbaarheid voor ziekte en gevaar', 'Verstrengeling / Kluwen', 'Mislukking'] },
  { group: 'Verzwakte Grenzen', titles: ['Gebrek aan zelfcontrole / Zelfdiscipline', 'Zich rechten toe-eigenen'] },
  { group: 'Gerichtheid op Anderen', titles: ['Onderwerping', 'Zelfopoffering', 'Goedkeuring en erkenning zoeken'] },
  { group: 'Overmatige Waakzaamheid', titles: ['Emotionele geremdheid', 'Meedogenloze normen / Overmatig kritisch', 'Negativiteit en pessimisme', 'Bestraffende houding'] }
];
export const schemaSortOrder = schemaGroups.flatMap(g => g.titles);

export const modeGroups = [
  { group: 'Kindmodi', titles: ['Kwetsbare kind', 'Boze kind', 'Razende kind', 'Impulsieve kind', 'Ongedisciplineerde kind'] },
  { group: 'Coping: Overgave', titles: ['Willoze inschikkelijke'] },
  { group: 'Coping: Vermijding', titles: ['Onthechte beschermer', 'Onthechte zelfsusser'] },
  { group: 'Coping: Overcompensatie', titles: ['Wantrouwende overcontroleerder', 'Zelfverheerlijker', 'Pest en aanval'] },
  { group: 'Oudermodi', titles: ['Straffende ouder', 'Veeleisende ouder'] },
  { group: 'Gezonde Volwassene', titles: ['Gezonde volwassene'] }
];
export const modeSortOrder = modeGroups.flatMap(g => g.titles);

export const basisbehoeftenData = [
  { id: 'bb1', title: 'Veiligheid & Verbinding', src: imgB1, description: basisbehoeftenText['Veiligheid & Verbinding'], color: '#3b82f6', type: 'basisbehoefte' },
  { id: 'bb2', title: 'Autonomie & Competentie', src: imgB2, description: basisbehoeftenText['Autonomie & Competentie'], color: '#10b981', type: 'basisbehoefte' },
  { id: 'bb3', title: 'Vrijheid van expressie', src: imgB3, description: basisbehoeftenText['Vrijheid van expressie'], color: '#eab308', type: 'basisbehoefte' },
  { id: 'bb4', title: 'Spontaniteit en spel', src: imgB4, description: basisbehoeftenText['Spontaniteit en spel'], color: '#ef4444', type: 'basisbehoefte' },
  { id: 'bb5', title: 'Realistische grenzen', src: imgB5, description: basisbehoeftenText['Realistische grenzen'], color: '#f97316', type: 'basisbehoefte' },
];

export { vstBasisbehoeftenData, vstSchemaData, vstModiData, vstCopingData } from './vstCards';

export const modicategorieenData = [
  { id: 'mc1', title: 'Kindmodi', src: imgM1, description: categorieText['Kindmodi'], color: '#3b82f6', type: 'modicategorie' },
  { id: 'mc2', title: 'Oudermodi', src: imgM2, description: categorieText['Oudermodi'], color: '#ef4444', type: 'modicategorie' },
  { id: 'mc3a', title: 'Coping: Overgave', src: imgM3a, description: categorieText['Coping: Overgave'], color: '#eab308', type: 'modicategorie' },
  { id: 'mc3b', title: 'Coping: Vermijding', src: imgM3b, description: categorieText['Coping: Vermijding'], style: { width: '80%', height: '80%' }, color: '#eab308', type: 'modicategorie' },
  { id: 'mc3c', title: 'Coping: Overcompensatie', src: imgM3c, description: categorieText['Coping: Overcompensatie'], color: '#eab308', type: 'modicategorie' },
  { id: 'mc4', title: 'Gezonde volwassene', src: imgM4, description: categorieText['Gezonde volwassene'], color: '#10b981', type: 'modicategorie' },
];

export const getCardTypeLetter = (type) => {
  if (type === 'schema') return 'S';
  if (type === 'mode') return 'M';
  if (type === 'basisbehoefte') return 'B';
  if (type === 'modicategorie') return 'C';
  return '';
};

export const formatCardTitle = (title) => {
  if (!title) return title;
  
  // 1. Zich rechten toe-eigenen: exact 2 regels en 'toe-eigenen' nooit afbreken
  if (title === 'Zich rechten toe-eigenen' || title.toLowerCase().includes('rechten toe')) {
    return (
      <span style={{ display: 'inline-block', lineHeight: '1.15' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Zich rechten</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>toe&#8209;eigenen</span>
      </span>
    );
  }

  // 2. Gebrek aan zelfcontrole / Zelfdiscipline: echt op twee regels proppen
  if (
    title === 'Gebrek aan zelfcontrole / Zelfdiscipline' ||
    title === 'Gebrek aan zelfcontrole/zelfdiscipline' ||
    title.startsWith('Gebrek aan zelfcontrole')
  ) {
    return (
      <span style={{ display: 'inline-block', fontSize: '0.74rem', lineHeight: '1.1' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Gebrek aan zelfcontrole /</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>Zelfdiscipline</span>
      </span>
    );
  }

  // 3. Gebrek aan coherente identiteit: op 2 regels
  if (title === 'Gebrek aan coherente identiteit') {
    return (
      <span style={{ display: 'inline-block', fontSize: '0.78rem', lineHeight: '1.12' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Gebrek aan coherente</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>identiteit</span>
      </span>
    );
  }

  // 4. Gebrek aan (een) betekenisvolle wereld: op 2 regels
  if (title.startsWith('Gebrek aan') && title.includes('wereld')) {
    const isEen = title.includes('een');
    return (
      <span style={{ display: 'inline-block', fontSize: '0.75rem', lineHeight: '1.1' }}>
        <span style={{ whiteSpace: 'nowrap' }}>{isEen ? 'Gebrek aan een' : 'Gebrek aan'}</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>betekenisvolle wereld</span>
      </span>
    );
  }

  // 5. Meedogenloze normen / Overmatig kritisch: op 2 regels
  if (title.startsWith('Meedogenloze normen')) {
    return (
      <span style={{ display: 'inline-block', fontSize: '0.75rem', lineHeight: '1.1' }}>
        <span style={{ whiteSpace: 'nowrap' }}>Meedogenloze normen /</span>
        <br />
        <span style={{ whiteSpace: 'nowrap' }}>Overmatig kritisch</span>
      </span>
    );
  }

  if (title === 'Kwetsbaarheid voor ziekte en gevaar') {
    return <>Kwetsbaarheid voor ziekte<br />en gevaar</>;
  }
  if (title === 'Kluwen / Onderontwikkeld zelf' || title === 'Verstrengeling / Kluwen' || title === 'Verstrengeling/kluwen') {
    return <>Verstrengeling /<br />Kluwen</>;
  }
  if (title === 'Minderwaardigheid / Schaamte' || title === 'Minderwaardigheid/schaamte') {
    return <>Minderwaardigheid /<br />Schaamte</>;
  }
  if (title === 'Afhankelijkheid / Onbekwaamheid' || title === 'Afhankelijkheid/onbekwaamheid') {
    return <>Afhankelijkheid /<br />Onbekwaamheid</>;
  }
  if (title === 'Goedkeuring en erkenning zoeken') {
    return <>Goedkeuring en<br />erkenning zoeken</>;
  }
  if (title === 'Negativiteit en pessimisme') {
    return <>Negativiteit en<br />pessimisme</>;
  }
  if (title === 'Bestraffende houding') {
    return <>Bestraffende<br />houding</>;
  }
  if (title === 'Veiligheid & Verbinding') {
    return <>Veiligheid &<br />Verbinding</>;
  }
  if (title === 'Autonomie & Competentie') {
    return <>Autonomie &<br />Competentie</>;
  }
  if (title === 'Vrijheid van expressie') {
    return <>Vrijheid van<br />expressie</>;
  }
  if (title === 'Spontaniteit en spel') {
    return <>Spontaniteit<br />en spel</>;
  }
  if (title === 'Perfectionistische overcontroleerder') {
    return <>Perfectionistische<br />overcontroleerder</>;
  }
  if (title === 'Wantrouwende overcontroleerder') {
    return <>Wantrouwende<br />overcontroleerder</>;
  }
  if (title === 'Aandacht- en erkenningzoeker') {
    return <>Aandacht- en<br />erkenningzoeker</>;
  }
  if (title === 'Bedrog en manipulatie') {
    return <>Bedrog en<br />manipulatie</>;
  }
  
  if (title.length > 20 && title.includes(' / ')) {
    const parts = title.split(' / ');
    return <>{parts[0]} /<br />{parts[1]}</>;
  }
  
  return title;
};
