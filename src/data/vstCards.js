import imgZelfcoherentie from '../assets/images/basisbehoeften/6.png';
import imgRechtvaardigheid from '../assets/images/basisbehoeften/7.png';
import imgCoherenteIdentiteit from '../assets/images/vst/coherente_identiteit.png';
import imgBetekenisvolleWereld from '../assets/images/vst/betekenisvolle_wereld.png';
import imgOnrechtvaardigheid from '../assets/images/vst/onrechtvaardigheid.png';

export const vstBehoeftenText = {
  'Zelfcoherentie': 'De behoefte aan een geïntegreerd, samenhangend zelfbeeld en een stabiele identiteit. Het gevoel één geheel te zijn, met duidelijke eigen waarden, gevoelens en richting.',
  'Rechtvaardigheid': 'De behoefte aan eerlijkheid, billijkheid en een rechtvaardige behandeling. De zekerheid dat regels voor iedereen gelijk gelden, dat afspraken worden nageleefd en dat onrecht wordt gecorrigeerd.'
};

export const vstSchemaText = {
  'Gebrek aan coherente identiteit': 'Je ervaart jezelf niet als één geheel. Je hebt het gevoel dat je uit losse, soms tegenstrijdige delen bestaat. Dit maakt dat je vaak verwarring voelt van binnen en over wie je bent. Je hebt moeite om over jezelf te denken en te praten als een duidelijk eigen iemand.',
  'Gebrek aan een betekenisvolle wereld': 'Je ervaart de wereld als verwarrend en betekenisloos, waarbij je je niet verbonden voelt met zaken die in jouw leven en in de wereld om je heen spelen.',
  'Onrechtvaardigheid': 'Je ervaart je omgeving als onrechtvaardig en oneerlijk, waarbij onrecht in de maatschappij niet wordt gecorrigeerd. Je bent bang om slachtoffer van dat onrecht te worden.'
};

export const vstBasisbehoeftenData = [
  { id: 'bb6', title: 'Zelfcoherentie', src: imgZelfcoherentie, description: vstBehoeftenText['Zelfcoherentie'], color: '#a855f7', type: 'basisbehoefte', isVst: true },
  { id: 'bb7', title: 'Rechtvaardigheid', src: imgRechtvaardigheid, description: vstBehoeftenText['Rechtvaardigheid'], color: '#06b6d4', type: 'basisbehoefte', isVst: true }
];

export const vstSchemaData = [
  {
    id: 'vst_s1',
    title: 'Gebrek aan coherente identiteit',
    type: 'schema',
    src: imgCoherenteIdentiteit,
    description: vstSchemaText['Gebrek aan coherente identiteit'],
    color: '#a855f7',
    isVst: true
  },
  {
    id: 'vst_s2',
    title: 'Gebrek aan een betekenisvolle wereld',
    type: 'schema',
    src: imgBetekenisvolleWereld,
    description: vstSchemaText['Gebrek aan een betekenisvolle wereld'],
    color: '#a855f7',
    isVst: true
  },
  {
    id: 'vst_s3',
    title: 'Onrechtvaardigheid',
    type: 'schema',
    src: imgOnrechtvaardigheid,
    description: vstSchemaText['Onrechtvaardigheid'],
    color: '#06b6d4',
    isVst: true
  }
];

export const vstVerdieping = {
  'Zelfcoherentie': {
    casus: "Daan merkt dat hij zich in elk gezelschap anders gedraagt en voelt zich soms een kameleon. Door bewust stil te staan bij zijn eigen kernwaarden en gevoelens, leert hij ervaren wie hij werkelijk is als één samenhangend persoon.",
    tips: [
      "Onderzoek welke waarden en interesses écht van jou zijn, ongeacht wie er in de kamer is.",
      "Erken dat verschillende gevoelens of kanten van jezelf samen één rijk en compleet geheel vormen.",
      "Geef jezelf de tijd om te reflecteren: wat voel ik nu, en wat zegt dit over mij?"
    ]
  },
  'Rechtvaardigheid': {
    casus: "Wanneer Lisa merkt dat haar collega wél opslag krijgt en zij niet ondanks dezelfde prestaties, voelt ze diepe verontwaardiging. Vanuit haar basisbehoefte aan rechtvaardigheid leert ze om rustig en constructief het gesprek aan te gaan, in plaats van zich machteloos of verongelijkt terug te trekken.",
    tips: [
      "Spreek je uit wanneer iets oneerlijk voelt; benoem feiten en afspraken in plaats van verwijten.",
      "Onderzoek of een situatie daadwerkelijk onrechtvaardig is, of dat er legitieme andere perspectieven meespelen.",
      "Zet je Gezonde Volwassene in om eerlijke kaders en duidelijke grenzen voor jezelf en anderen te bewaken."
    ]
  },
  'Gebrek aan coherente identiteit': {
    casus: "Sanne voelt zich van binnen vaak gefragmenteerd en leeg. Als iemand vraagt: 'Wat wil jij nou echt?', raakt ze in paniek omdat ze geen duidelijke kern ervaart en bang is dat ze 'niemand' is.",
    tips: [
      "Schrijf dagelijks op wat jij leuk, belangrijk of juist stom vond. Zo bouw je stap voor stap een anker op voor je identiteit.",
      "Besef dat tegenstrijdige emoties normaal zijn en niet betekenen dat je als persoon uit elkaar valt.",
      "Versterk je Gezonde Volwassene als de 'regisseur' die over al je verschillende kanten waakt."
    ]
  },
  'Gebrek aan een betekenisvolle wereld': {
    casus: "Mark kijkt naar het nieuws en de drukte om hem heen en voelt een diepe existentiële vervreemding. Het voelt alsof hij achter dik glas naar een toneelstuk kijkt waarin hij geen enkele rol of zingeving heeft.",
    tips: [
      "Begin dichtbij: zingeving ontstaat vaak niet in het grote geheel, maar in kleine, tastbare contacten of betekenisvolle bezigheden.",
      "Onderzoek welke waarden jou écht aan het hart gaan (zoals natuur, creativiteit of rechtvaardigheid) en zoek aansluiting bij gelijkgestemden.",
      "Realiseer je dat het gevoel van 'betekenisloosheid' een beschermingsmechanisme kan zijn tegen teleurstelling of overweldiging."
    ]
  },
  'Onrechtvaardigheid': {
    casus: "Kevin heeft het gevoel dat de spelregels van het leven altijd in zijn nadeel zijn gemanipuleerd. Als een situatie niet 100% eerlijk verloopt, voelt hij een diepe machteloosheid en bitterheid: 'Zie je wel, de sterken winnen altijd en ik ben het haasje'.",
    tips: [
      "Maak onderscheid tussen reëel maatschappelijk onrecht en situaties waarin toeval of menselijke onhandigheid een rol speelt.",
      "Voorkom dat je in een cynische slachtofferrol belandt; vraag jezelf af: 'Wat ligt er wél binnen mijn invloedssfeer?'",
      "Gebruik je rechtvaardigheidsgevoel als positieve kracht om voor jezelf en anderen op te komen vanuit de Gezonde Volwassene."
    ]
  }
};
