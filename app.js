
console.log('Mon premier script JavaScript !');

let message = 'quelque chose';

console.log(message);

// message = message.toUpperCase();

console.log(message);


/** @type HTMLHeadingElement */
let elemTitre = document.querySelector('header h1');

function titreClickCss(){
    elemTitre.textContent = 'Banque';
    elemTitre.style.color = 'orangered';
    elemTitre.style.fontWeight = 'bold';
}
function titreClick(){
    let nb = 1;
    console.log('nombre = ' + nb);
    console.log(`nombre = ${nb}`);
    
    
    if(true){
        let nb = 2;
        console.log(nb);        
    }
    
    console.log(nb);        


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

let btnMenu = document.querySelector('#btn-menu-close');
let menu = document.querySelector('body > nav.sidebar');

btnMenu.addEventListener('click', reduireMenu);

function reduireMenu(){
    const btnMenuLabel = btnMenu.querySelector('.material-icons');
    menu.classList.toggle('small');
    if(menu.classList.contains('small')){
        btnMenuLabel.textContent = 'menu';
    }else{
        btnMenuLabel.textContent = 'clear';
    }

}

/* ------ Formulaire ------ */

/** @type HTMLFormElement */
const formClient = document.querySelector('#form-client');

/** @type HTMLInputElement */
const inputNom = formClient.querySelector('[name="nom"]');
/** 
 * Champ email
 * @type HTMLInputElement 
 */
const inputEmail = formClient.querySelector('[name="email"]');
/** @type HTMLInputElement */
const inputEmailVerif = formClient.querySelector('[name="email-verif"]');

// 1 -
inputNom.addEventListener('input', (event) => {
    inputNom.value = inputNom.value.toUpperCase();
});

// // 2 -
// inputNom.addEventListener('input', function (){
//     inputNom.value = inputNom.value.toUpperCase();
// });

// // 3 -
// inputNom.addEventListener('input',transformeNom );
// function transformeNom(){
//     inputNom.value = inputNom.value.toUpperCase();
// }


// inputNom.setCustomValidity('Il y a une erreur dans cette valeur !');
// inputNom.setCustomValidity('');

// formClient.checkValidity();
// formClient.reportValidity();


inputEmail.addEventListener('input', checkEmail);
inputEmailVerif.addEventListener('input', checkEmail);

/**
 * Vérifie que les deux adresse e-mail saisies sont identiques.
 * @param {Event} event objet décrivant l'événement HTML généré
 * @returns void 
 */
function checkEmail(event) {
    const email = inputEmail.value.trim();
    const emailVerif = inputEmailVerif.value.trim();
    if(email !== emailVerif){
        inputEmailVerif.setCustomValidity('Les deux adresses email doivent être identiques.');
    } else {
        inputEmailVerif.setCustomValidity('');
    }
}