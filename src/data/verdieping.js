export const verdiepingData = {
  // 3 Uitgewerkte voorbeelden
  'Verlating / Instabiliteit': {
    casus: "Emma heeft net een nieuwe relatie. Zodra haar partner niet direct reageert op een appje, raakt ze in paniek. Ze is ervan overtuigd dat hij het plotseling niet meer ziet zitten en haar zal verlaten, net zoals haar vader deed toen ze klein was. Uit angst stuurt ze hem nog 10 berichten, wat juist afstand creëert.",
    tips: [
      "Onderken de paniek als je 'Kwetsbare Kind'-modus die bang is, en vertel jezelf (als Gezonde Volwassene): 'Hij is gewoon aan het werk, ik ben veilig.'",
      "Probeer het contact even uit te stellen in plaats van direct te reageren vanuit angst.",
      "Vraag op een rustig moment om bevestiging, zonder de ander te overspoelen met beschuldigingen."
    ]
  },
  'Kwetsbare kind': {
    casus: "Tijdens een teamoverleg krijgt Mark een milde vorm van kritiek op zijn werk. Ineens voelt hij zich weer het onzekere jongetje van 8 jaar oud dat altijd te horen kreeg dat hij onhandig was. Hij krimpt ineen, kijkt naar de grond en durft niets meer in te brengen, ook al weet hij best dat de kritiek constructief bedoeld was.",
    tips: [
      "Oefen met het opmerken van dit gevoel. Waar voel je het in je lichaam? Zeg tegen jezelf: 'Dit is mijn Kwetsbare Kind dat geraakt wordt.'",
      "Probeer als je Gezonde Volwassene troost te bieden aan dat kind-deel: 'Het is logisch dat je schrikt, maar je hebt niks fout gedaan.'",
      "Stel in het hier-en-nu vragen over de kritiek in plaats van direct in te storten, zodat je contact houdt met het heden."
    ]
  },
  'Straffende ouder': {
    casus: "Lisa laat een glas water vallen. Meteen hoort ze een harde, gemene stem in haar hoofd: 'Stom rund! Je kunt ook echt helemaal niks goed doen!'. De hele avond voelt ze zich down en waardeloos om een heel klein foutje.",
    tips: [
      "Herken deze interne stem als de 'Straffende Ouder' en níét als de waarheid over wie jij bent.",
      "Spreek de stem tegen: 'Iedereen laat wel eens iets vallen. Het is niet eerlijk of helpend om me hiervoor zo hard te straffen.'",
      "Oefen met compassie: Wat zou je tegen een goede vriend(in) zeggen die een glas laat vallen? Zeg datzelfde tegen jezelf."
    ]
  },
};

// Functie om de juiste data te halen, met fallback placeholder
export const getVerdieping = (title) => {
  if (verdiepingData[title]) {
    return verdiepingData[title];
  }
  
  return {
    casus: "Voorbeeldcasus voor '" + title + "'. (Let op: Deze tekst is nog niet ingevuld en dient als placeholder. Hier komt straks een herkenbaar praktijkvoorbeeld dat de essentie van dit schema of deze modus beschrijft.)",
    tips: [
      "Tip 1: Placeholder voor omgaan met " + title + ".",
      "Tip 2: Placeholder voor een helpende gedachte.",
      "Tip 3: Placeholder voor een actie."
    ]
  }
};
