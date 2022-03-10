
console.log('Mon premier script JavaScript !');


/** @type HTMLHeadingElement */
let elemTitre = document.querySelector('header h1');

function titreClickCss(){
    elemTitre.textContent = 'Banque';
    elemTitre.style.color = 'orangered';
    elemTitre.style.fontWeight = 'bold';
}
function titreClick(){
    elemTitre.textContent = 'Banqu<sup>e</sup>';
    // elemTitre.innerHTML = 'Banqu<sup>e</sup>';
    elemTitre.parentNode.classList.toggle('nouveau'); /* add, remove, toggle, contains */
}

elemTitre.addEventListener('click', titreClick);



/*
--- Ouverture/fermeture du sidebar --- 

HTML 
- Ajouter un bouton menu
CSS 
- Créer une mise en forme réduite pour le sidebar (appliquer une classe closed)
JS 
- Ecouter le click sur le bouton menu
- Rechercher l'élément sidebar et applique la classe closed

*/