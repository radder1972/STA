import imgZelfcoherentie from '../assets/images/basisbehoeften/6.png';
import imgRechtvaardigheid from '../assets/images/basisbehoeften/7.png';
import imgCoherenteIdentiteit from '../assets/images/vst/coherente_identiteit.png';
import imgBetekenisvolleWereld from '../assets/images/vst/betekenisvolle_wereld.png';
import imgOnrechtvaardigheid from '../assets/images/vst/onrechtvaardigheid.png';

import imgBlijeKind from '../assets/images/vst/blije_kind.png';
import imgBozeBeschermer from '../assets/images/vst/boze_beschermer.png';
import imgPerfectionistischeOvercontroleerder from '../assets/images/vst/perfectionistische_overcontroleerder.png';
import imgCopingOmkering from '../assets/images/vst/coping_omkering.png';
import imgBedrogManipulatie from '../assets/images/vst/bedrog_en_manipulatie.png';

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

export const vstCopingData = [
  {
    id: 'mc3d',
    title: 'Coping: Omkering',
    type: 'modicategorie',
    src: imgCopingOmkering,
    description: 'Je vecht tegen het schema door je precies tegenovergesteld te gedragen aan wat het schema dicteert: van binnen voel je je kwetsbaar of ontoereikend, maar naar buiten toe zet je een onkwetsbare, krachtige of superieure houding neer.',
    color: '#eab308',
    isVst: true
  }
];

export const vstModiData = [
  {
    id: 'vst_m_bk',
    title: 'Blije kind',
    type: 'mode',
    src: imgBlijeKind,
    description: 'In deze modus voel je je vrij, geliefd, tevreden, beschermd, begrepen, veilig, gewaardeerd en verbonden met anderen. Je kunt spontaan reageren, je bent ondernemend, optimistisch en speels, zoals een gelukkig klein kind.',
    color: '#34d399',
    isVst: true
  },
  {
    id: 'vst_m_bb',
    title: 'Boze beschermer',
    type: 'mode',
    src: imgBozeBeschermer,
    description: 'In deze modus scherm je jezelf af voor (heftige) gevoelens en probeer je anderen op afstand te houden door een bozige, cynische, pessimistische of afwijzende houding aan te nemen. Je wantrouwt anderen, en laat boosheid zien om jezelf te beschermen tegen vermeende dreiging.',
    color: '#facc15',
    isVst: true
  },
  {
    id: 'vst_m_po',
    title: 'Perfectionistische overcontroleerder',
    type: 'mode',
    src: imgPerfectionistischeOvercontroleerder,
    description: 'In deze modus probeer je jezelf te beschermen tegen het maken van fouten of andere risico’s door zeer perfectionistisch te zijn. Je controleert jezelf of anderen op een dwangmatige manier. Je werkt hard en doet er alles aan om dingen zo goed mogelijk te doen.',
    color: '#facc15',
    isVst: true
  },
  {
    id: 'vst_m_bm',
    title: 'Bedrog en manipulatie',
    type: 'mode',
    src: imgBedrogManipulatie,
    description: 'In deze modus bedrieg je, lieg je, of manipuleer je anderen om een bepaald doel te bereiken, zoals het ontlopen van straf of afwijzing, of om een voordeel voor jezelf te behalen.',
    color: '#facc15',
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
  },
  'Coping: Omkering': {
    casus: "Wanneer David zich diep onzeker voelt over zijn kwaliteiten op een netwerkborrel, compenseert hij dat door juist luidkeels op te scheppen over zijn successen en anderen te kleineren. Zo hoeft hij zijn eigen minderwaardigheidsgevoel niet onder ogen te zien.",
    tips: [
      "Herken de paradox van omkering: hoe harder je vecht om 'onkwetsbaar' te lijken, hoe meer spanning het van binnen kost.",
      "Onderzoek welk kwetsbaar kindgevoel (bijv. angst voor afwijzing of schaamte) schuilgaat onder het stoere pantser.",
      "Laat de Gezonde Volwassene authentieke zelfwaardering opbouwen die niet afhankelijk is van bravouregedrag."
    ]
  },
  'Blije kind': {
    casus: "Tim heeft altijd hard gewerkt en gunt zichzelf zelden rust. Tijdens een wandeling op het strand laat hij zijn telefoon in zijn zak, trekt hij zijn schoenen uit en rent hij spontaan door de branding. Hij voelt opeens weer pure pret en verwondering, zonder dat iets 'moet' of 'nuttig' hoeft te zijn.",
    tips: [
      "Maak bewust tijd vrij voor speelsheid, hobby's en onbezorgde activiteiten zonder prestatiedruk.",
      "Geef jezelf toestemming om te genieten van kleine, alledaagse dingen en laat het moeten even los.",
      "Bescherm het Blije Kind tegen de veeleisende of straffende oudermodus die zegt dat 'spelen tijdverspilling is'."
    ]
  },
  'Boze beschermer': {
    casus: "Wanneer een goede vriend vraagt hoe het echt met hem gaat na zijn scheiding, reageert Robin bits en sarcastisch: 'Bemoei je lekker met je eigen leven'. Van binnen voelt hij zich doodsbang om in tranen uit te barsten, maar door boos en stekelig te doen houdt hij iedereen op veilige afstand.",
    tips: [
      "Merk op wanneer boosheid of cynisme opkomt: is er reëel gevaar, of ben je bang dat iemand je kwetsbaarheid ziet?",
      "Bedank de Boze Beschermer voor zijn poging je veilig te houden, maar vertel hem dat de Gezonde Volwassene het gesprek nu overneemt.",
      "Oefen in veilige situaties om te zeggen wat je écht raakt, in plaats van direct de stekels op te zetten."
    ]
  },
  'Perfectionistische overcontroleerder': {
    casus: "Moniek herleest een zakelijke e-mail wel vijftien keer en controleert elk leesteken. Pas als alles volmaakt lijkt, durft ze hem te verzenden. Van binnen is ze bang om door de mand te vallen als incompetent, waardoor ze zichzelf uitput met dwangmatige controle.",
    tips: [
      "Hanteer de 80/20-regel: goed is vaak meer dan goed genoeg. De laatste 20% kost disproportioneel veel energie.",
      "Daag de aanname uit dat een foutje direct catastrofaal is; oefen bewust met kleine, veilige 'onvolkomenheden'.",
      "Vraag jezelf af: 'Wat probeer ik nu krampachtig onder controle te houden, en wat voel ik eigenlijk van binnen?'"
    ]
  },
  'Bedrog en manipulatie': {
    casus: "Als Sarah te laat op haar werk komt en haar taken niet af heeft, verzint ze ter plekke een overtuigend verhaal over een ziek familielid en speelt ze in op het medeleven van haar manager. Ze vermijdt daarmee kritiek, maar raakt steeds meer verstrikt in haar eigen web van halve waarheden en voelt zich van binnen eenzaam en onecht.",
    tips: [
      "Wees eerlijk naar jezelf: wat probeer je met manipulatie of een leugen te vermijden (bijvoorbeeld schaamte, straf of afwijzing)?",
      "Ervaar dat het dragen van een onecht masker je vervreemdt van anderen en van je eigen waarden.",
      "Gebruik de Gezonde Volwassene om fouten openlijk te erkennen; echte verbinding ontstaat door transparantie en authenticiteit."
    ]
  }
};
