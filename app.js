import {dataService} from './data-service.js';
import {httpService} from './http-service.js';

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
/** @type HTMLInputElement */
const inputPrenom = formClient.querySelector('[name="prenom"]');
/** 
 * Champ email
 * @type HTMLInputElement 
 */
const inputEmail = formClient.querySelector('[name="email"]');
/** @type HTMLInputElement */
const inputEmailVerif = formClient.querySelector('[name="email-verif"]');

// Mise en majuscule de la valeur saisie dans le champ nom
inputNom.addEventListener('input', (event) => {
    inputNom.value = inputNom.value.toUpperCase();
});

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

/* supprimer les espaces autour des textes saisis dans les champs */
formClient.addEventListener('change', event => {
    const champModifie = event.target;
    champModifie.value = champModifie.value.trim();
});

// const listeChamps = formClient.querySelectorAll('[name]');

// for(const champ of listeChamps){
//     console.log(champ.name);
//     champ.addEventListener('change', event => {
//         event.target.value = event.target.value.trim();
//     });
// }

// enregistrement des données saisies

formClient.addEventListener('submit', event => {

    event.preventDefault();
    
    const client = {
        nom: inputNom.value.trim(),
        prenom: inputPrenom.value.trim()
    };

    httpService.create(client).then( actualiserListeClients );

    // actualiserListeClients();

    location.href = '#liste-clients';

    formClient.reset();

});



/* --------- Data Service ------------------------ */

const clients = dataService.readAll();

console.dir(clients);

// dataService.create({
//     nom: 'Leblanc',
//     prenom: 'Marc'
// });

console.dir(clients);


/* --------- Liste des clients ------------------------------------------ */

/** @type HTMLTableSectionElement */
const tableClients = document.querySelector('#table-clients tbody');

tableClients.innerHTML = '<tr><td>Leblanc</td><td>Marc</td></tr>';

async function actualiserListeClients(){
    tableClients.innerHTML = '<tr><td colspan="*">chargement en cours...</td></tr>';

    // const clients = httpService.readAll();

    const clients = await httpService.readAll();

    tableClients.innerHTML = '';
    
    clients.forEach( client => {
        const tr = document.createElement('tr');
        const tdNom = document.createElement('td');
        const tdPrenom = document.createElement('td');
        
        tdNom.textContent = client.nom;
        tdPrenom.textContent = client.prenom;
        
        tr.append(tdNom, tdPrenom);
        tableClients.append(tr);
    });
        
}
// function actualiserListeClients(){
//     tableClients.innerHTML = '<tr><td colspan="*">chargement en cours...</td></tr>';

//     // const clients = httpService.readAll();

//     const attente = httpService.readAll();

//     attente.then( clients => {
//         tableClients.innerHTML = '';

//         clients.forEach( client => {
//             const tr = document.createElement('tr');
//             const tdNom = document.createElement('td');
//             const tdPrenom = document.createElement('td');
            
//             tdNom.textContent = client.nom;
//             tdPrenom.textContent = client.prenom;
            
//             tr.append(tdNom, tdPrenom);
//             tableClients.append(tr);
//         });
//     });
        
// }

document.querySelector('#btnClients')
    .addEventListener('click', actualiserListeClients);

// actualiserListeClients();





