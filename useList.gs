/**
 * prend une un tableau et si le premier ellement est une coix return le deuxieme sinon return false
 * @param {tab} : la le tableau
 * @return {string} : le deuxieme ellement du tab
 * @return {false}
 */
function useList(ligne) {
  if( ligne[0] == 'x'){
    return ligne[1];
  }
  return false;
}
