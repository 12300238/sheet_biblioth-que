function getTabsname(tabs) {
  let listTab = [];
  tabs.forEach(function(tab){
    listTab.push(tab.getTitle());
  })
  return listTab;
}
