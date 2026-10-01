import React from 'react';

import imgB1 from '../assets/images/basisbehoeften/1.png';
import imgB2 from '../assets/images/basisbehoeften/2.png';
import imgB3 from '../assets/images/basisbehoeften/3.png';
import imgB4 from '../assets/images/basisbehoeften/4.png';
import imgB5 from '../assets/images/basisbehoeften/5.png';
import imgB6 from '../assets/images/basisbehoeften/6.png';
import imgB7 from '../assets/images/basisbehoeften/7.png';

import imgCoherenteIdentiteit from '../assets/images/vst/coherente_identiteit.png';
import imgBetekenisvolleWereld from '../assets/images/vst/betekenisvolle_wereld.png';
import imgOnrechtvaardigheid from '../assets/images/vst/onrechtvaardigheid.png';

import imgM1 from '../assets/images/modicategorieen/1.png';
import imgM2 from '../assets/images/modicategorieen/2.png';
import imgM3a from '../assets/images/modicategorieen/coping_overgave.png';
import imgM3b from '../assets/images/modicategorieen/coping_vermijding.png';
import imgM3c from '../assets/images/modicategorieen/coping_overcompensatie.png';
import imgM4 from '../assets/images/modicategorieen/4.png';

export const basisbehoeftenText = {
  'Veilige hechting': 'Veiligheid, stabiliteit, verzorging en onvoorwaardelijke acceptatie. Een thuishaven zonder angst voor verlating of afwijzing.',
  'Autonomie': 'Ruimte om zelf de wereld te ontdekken, fouten te mogen maken en vertrouwen te krijgen in je eigen kunnen als onafhankelijk individu.',
  'Vrije expressie': 'Ruimte om je vrij uit te drukken. Eigen gevoelens (ook boosheid of verdriet) en behoeften zijn geldig en belangrijk.',
  'Spontaniteit en spel': 'Ruimte voor plezier, creativiteit en onbezorgdheid. Niet alles hoeft nuttig, perfect of efficiënt te zijn.',
  'Realistische grenzen': 'Kaders om te leren omgaan met frustratie. Leren dat je niet altijd je zin kunt krijgen en rekening moet houden met anderen.',
  'Zelfcoherentie': 'De behoefte aan een geïntegreerd, samenhangend zelfbeeld en een stabiele identiteit. Het gevoel één geheel te zijn, met duidelijke eigen waarden, gevoelens en richting.',
  'Rechtvaardigheid': 'De behoefte aan eerlijkheid, billijkheid en een rechtvaardige behandeling. De zekerheid dat regels voor iedereen gelijk gelden, dat afspraken worden nageleefd en dat onrecht wordt gecorrigeerd.'
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
  'Veilige hechting': ['Verlating / Instabiliteit', 'Wantrouwen / Misbruik', 'Emotioneel tekort', 'Tekortschieten / Schaamte', 'Sociale isolatie / Vervreemding'],
  'Autonomie': ['Afhankelijkheid / Incompetentie', 'Kwetsbaarheid voor ziekte en gevaar', 'Kluwen / Onderontwikkeld zelf', 'Mislukken'],
  'Vrije expressie': ['Onderwerping', 'Zelfopoffering', 'Goedkeuring / Erkenning zoeken'],
  'Spontaniteit en spel': ['Negativisme / Pessimisme', 'Emotionele geremdheid', 'Meedogenloze normen', 'Bestraffendheid'],
  'Realistische grenzen': ['Veeleisendheid / Grandiositeit', 'Onvoldoende zelfcontrole']
};

export const categorieToModi = {
  'Kindmodi': ['Kwetsbare kind', 'Razende kind', 'Impulsieve kind', 'Ongedisciplineerde kind', 'Boze kind'],
  'Oudermodi': ['Straffende ouder', 'Veeleisende ouder'],
  'Coping: Overgave': ['Willoze inschikkelijke'],
  'Coping: Vermijding': ['Onthechte beschermer', 'Onthechte zelfsusser'],
  'Coping: Overcompensatie': ['Wantrouwende overcontroleerder', 'Zelfverheerlijker', 'Pest en aanval'],
  'Gezonde volwassene': ['Gezonde volwassene']
};

export const ysqSchemaNamesMap = {
  'Abandonment': 'Verlating / Instabiliteit',
  'Mistrust': 'Wantrouwen / Misbruik',
  'Defectiveness_unlovability': 'Tekortschieten / Schaamte',
  'Emotional deprivation': 'Emotioneel tekort',
  'Social isolation_Alienation': 'Sociale isolatie / Vervreemding',
  'Practical incompetence_Dependence': 'Afhankelijkheid / Incompetentie',
  'Vulnerability to harm_illness': 'Kwetsbaarheid voor ziekte en gevaar',
  'Enmeshment': 'Kluwen / Onderontwikkeld zelf',
  'Failure to achieve': 'Mislukken',
  'Insufficient self-control_self-discipline': 'Onvoldoende zelfcontrole',
  'Entitlement_Superiority': 'Veeleisendheid / Grandiositeit',
  'Subjugation': 'Onderwerping',
  'Self-sacrifice': 'Zelfopoffering',
  'Admiration_Recognition-seeking': 'Goedkeuring / Erkenning zoeken',
  'Pessimism_Worry': 'Negativisme / Pessimisme',
  'Emotional inhibition': 'Emotionele geremdheid',
  'Unrelenting Standards': 'Meedogenloze normen',
  'Self-punitiveness': 'Bestraffendheid'
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
  { group: 'Verlating & Afwijzing', titles: ['Verlating / Instabiliteit', 'Wantrouwen / Misbruik', 'Emotioneel tekort', 'Tekortschieten / Schaamte', 'Sociale isolatie / Vervreemding'] },
  { group: 'Verzwakte Autonomie', titles: ['Afhankelijkheid / Incompetentie', 'Kwetsbaarheid voor ziekte en gevaar', 'Kluwen / Onderontwikkeld zelf', 'Mislukken'] },
  { group: 'Verzwakte Grenzen', titles: ['Onvoldoende zelfcontrole', 'Veeleisendheid / Grandiositeit'] },
  { group: 'Gerichtheid op Anderen', titles: ['Onderwerping', 'Zelfopoffering', 'Goedkeuring / Erkenning zoeken'] },
  { group: 'Overmatige Waakzaamheid', titles: ['Emotionele geremdheid', 'Meedogenloze normen', 'Negativisme / Pessimisme', 'Bestraffendheid'] }
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
  { id: 'bb1', title: 'Veilige hechting', src: imgB1, description: basisbehoeftenText['Veilige hechting'], color: '#3b82f6', type: 'basisbehoefte' },
  { id: 'bb2', title: 'Autonomie', src: imgB2, description: basisbehoeftenText['Autonomie'], color: '#10b981', type: 'basisbehoefte' },
  { id: 'bb3', title: 'Vrije expressie', src: imgB3, description: basisbehoeftenText['Vrije expressie'], color: '#eab308', type: 'basisbehoefte' },
  { id: 'bb4', title: 'Spontaniteit en spel', src: imgB4, description: basisbehoeftenText['Spontaniteit en spel'], color: '#ef4444', type: 'basisbehoefte' },
  { id: 'bb5', title: 'Realistische grenzen', src: imgB5, description: basisbehoeftenText['Realistische grenzen'], color: '#f97316', type: 'basisbehoefte' },
];

export const vstBasisbehoeftenData = [
  { id: 'bb6', title: 'Zelfcoherentie', src: imgB6, description: basisbehoeftenText['Zelfcoherentie'], color: '#a855f7', type: 'basisbehoefte', isVst: true },
  { id: 'bb7', title: 'Rechtvaardigheid', src: imgB7, description: basisbehoeftenText['Rechtvaardigheid'], color: '#06b6d4', type: 'basisbehoefte', isVst: true },
];

export const vstSchemaData = [
  {
    id: 'vst_s1',
    title: 'Gebrek aan coherente identiteit',
    type: 'schema',
    src: imgCoherenteIdentiteit,
    description: 'Je ervaart jezelf niet als één geheel. Je hebt het gevoel dat je uit losse, soms tegenstrijdige delen bestaat. Dit maakt dat je vaak verwarring voelt van binnen en over wie je bent. Je hebt moeite om over jezelf te denken en te praten als een duidelijk eigen iemand.',
    color: '#a855f7',
    isVst: true
  },
  {
    id: 'vst_s2',
    title: 'Gebrek aan een betekenisvolle wereld',
    type: 'schema',
    src: imgBetekenisvolleWereld,
    description: 'Je ervaart de wereld als verwarrend en betekenisloos, waarbij je je niet verbonden voelt met zaken die in jouw leven en in de wereld om je heen spelen.',
    color: '#a855f7',
    isVst: true
  },
  {
    id: 'vst_s3',
    title: 'Onrechtvaardigheid',
    type: 'schema',
    src: imgOnrechtvaardigheid,
    description: 'Je ervaart je omgeving als onrechtvaardig en oneerlijk, waarbij onrecht in de maatschappij niet wordt gecorrigeerd. Je bent bang om slachtoffer van dat onrecht te worden.',
    color: '#06b6d4',
    isVst: true
  }
];

export { vstModiData, vstCopingData } from './vstCards';

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
  
  if (title === 'Kwetsbaarheid voor ziekte en gevaar') {
    return <>Kwetsbaarheid voor ziekte<br />en gevaar</>;
  }
  if (title === 'Kluwen / Onderontwikkeld zelf') {
    return <>Kluwen / Onderontwikkeld<br />zelf</>;
  }
  if (title === 'Spontaniteit en spel') {
    return <>Spontaniteit<br />en spel</>;
  }
  
  if (title.length > 20 && title.includes(' / ')) {
    const parts = title.split(' / ');
    return <>{parts[0]} /<br />{parts[1]}</>;
  }
  
  return title;
};
