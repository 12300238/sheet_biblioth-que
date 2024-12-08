function debug() {
  let tab_sheet = getTab('https://docs.google.com/spreadsheets/d/1TvpsXcmeypRp2ZuNt02Yqsy0iWQsZRjfxpwxTiqWZcs/edit', 'Structure du contrat');
  console.log(tab_sheet);

  /*let list_onglet = [];

  tab_sheet.forEach(function(ligne){
    if(! useList(ligne) == false){
      list_onglet.push(ligne[1]);
    }
  });
  console.log(list_onglet);*/
}