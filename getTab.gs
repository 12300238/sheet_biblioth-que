/**
 * prend en une feuille et renvois un tableau avec toute ces case utile
 * @param {string} : l'url du classeur
 * @param {string} : le nom de la feuille utiliser
 * @return {srting_tab} : les vale de ma feuille sous forme de double tableau
 */
function getTab(feuille_url, nom_feuille) {
  var sheet = SpreadsheetApp.openByUrl(feuille_url).getSheetByName(nom_feuille);

  let range = sheet.getDataRange();
  let tab = range.getValues();
  return tab;
}
