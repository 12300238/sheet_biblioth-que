/**
 * crée un document et renvoy son objet
 * @param {string} nom_du_doc: le nom du document
 * @return {objet} le document du contrat
 */
function creationDocument(nom_du_doc) {
  let new_doc = DocumentApp.create(nom_du_doc);

  return new_doc;
}

/**
 * prend un document model et nom d'onglet et recupert le body qui est a se nom
 * @param{string} l'url du model
 * @param{string} le nom de l'onglet shouaiter
 * @return{body} l'onglet shouaiter
 * @return{false} l'objet na pas été trouver
 */
function recupertation(model, tab){
  let onglets;
  try{
    onglets = DocumentApp.openByUrl(model).getTabs();
  } catch(error){
    return null;
  }
  let find = false;
  let onglet_utile;

  let i = 0;
  while(i<onglets.length && find == false){
    if(onglets[i].getTitle() == tab){
      find = true;
      onglet_utile = onglets[i].asDocumentTab().getBody().copy();
    }
    i++;
  }

  if(find == false){
    return false;
  }
  return onglet_utile;
}

/**
 * met les dans un document les donné des body fournie
 * @param{objet body} le document ou on insert les body
 * @param{list_objet} la liste des body a inséré
 */
function insertion(new_doc, tab_utile){
  tab_utile.forEach(function(tab){
    let i=0;
    while(i<tab.getNumChildren()){
      if(tab.getChild(i).getType() == 'PARAGRAPH'){
        new_doc.getBody().appendParagraph(tab.getChild(i).copy());
      }
      else if(tab.getChild(i).getType() == 'LIST_ITEM'){
        new_doc.getBody().appendListItem(tab.getChild(i).copy());
      }
      else if(tab.getChild(i).getType() == 'TABLE'){
        new_doc.getBody().appendTable(tab.getChild(i).copy());
      }
      i++;
    }
  });
}

/**
 * ajoute des éditeur et des lecteur au document en paramétre
 * @param {objet} new_doc: le document a manipuler
 * @param {list_string} editeur: les adresse mail des editeur
 * @param {list_string} lecteur: les adresse mail des lecteur
 */
function droit_accer(new_doc, editeur, lecteur){
  editeur.forEach(function(edit){
    new_doc.addEditor(edit);
  });

  lecteur.forEach(function(lec){
    new_doc.addViewer(lec);
  });
}

/**
 * ajoute un element titre dans un document
 *
 * @param{string} le type de section
 * @param{string} le tritre
 * @param{int} le numero de l'ellement ou -1 si il n'ent a pas
 * @param{object body} le body ou ajouté le titre
 * @return {}
 */
function ajout_de_titre(sectype, titre, num, body){
  let title = sectype+' '+num+' – '+titre;
  body.insertParagraph(0, title).setHeading(DocumentApp.ParagraphHeading.HEADING1);
  var titre = body.getParagraphs()[0].editAsText();
  titre.setForegroundColor('#c00000').setFontFamily('Arial').setBold(true).setFontSize(11);
}

/**
 * prend un dossier un tableau de clé, un tableau de valeur et dans le fichier remplace le clé par les valeur du même index
 * 
 * @param{document} le document ou fair les changement
 * @param{tab_string} le nom des valuer a remplacer
 * @param{tab_string} les nouvelles valeur
 */
function replacevar(document_vide,key, val){
  if(key.length == val.length){
    let i=0;
    while(i<key.length){
      document_vide.replaceText(key[i], val[i]);
      i++;
    }
  }
  else{
    console.log("il n'y pas autent de clé que de valeur");
    Browser.msgBox("il n'y pas autent de clé que de valeur sur la feuille variable");
  }
}

function debug(){
  let list_tabs = ['Lorem Ipsume'];

  let tab_utile = [];

  let cl = ['test', 'Lorem ipsum', 'voiture'];

  let vl = ['yes', 'latin'];

  let i=0;

  list_tabs.forEach(function(tab){
    tab_utile.push(recupertation('https://docs.google.com/document/d/1ARG9a4H_rj98hgEWTNDYUkvHqpl5p_tJd7VpC2seivk/edit?tab=t.0', tab));
    ajout_de_titre('Annex', 'moi', 3, tab_utile[i]);
    i++;
  });

  if(tab_utile == false){
    let msg1 = "erreure, ellement: "
    console.log(msg1.concat(tab_utile[1]," non trouver dans le doc model"))
  }

  //let document_vide = DocumentApp.openByUrl("https://docs.google.com/document/d/18skkFZKL8q6hgcJ4mWQdIwQdsO-TdCF3f5CrpmlzMwI/edit?usp=sharing");
  let document_vide = DocumentApp.openByUrl('https://docs.google.com/document/d/1n2rxED3gLnG5Ikw3IM3ciVQfk0SEebLaE5EEdOb_xQM/edit?tab=t.0');


  insertion(document_vide, tab_utile);
  
  replacevar(document_vide, cl, vl);

  //let lect = ['michael.prades@gmail.com','latvdedd@gmail.com'];
  //let edit = ['wnln25.all@gmail.com'];

  //let collaborateur = edit.concat(lect);
  //droit_accer(document_vide, edit, lect);
}
