import { clientDAO } from "./data/fetch-service.js";
import { encodeText, notification } from "./util.js";

let dao = clientDAO;

/* --- Construction du tableau des clients --- */

let dataVue = {
    titreCmp: "Liste des clients",
    clients: []
};


let clientsCmp = new Vue({
    el: "#liste-clients",
    data: dataVue,
    methods: {
        actualiser: actualiserClients
    } ,
    mounted: function(){
        actualiserClients();
    }
});

async function actualiserClients(){ 
    // dao.readAll()
    //     .then( (liste) => dataVue.clients = liste );

    dataVue.clients = await dao.readAll();
}

/* --- formulaire nouveau client --- */

let formClient = document.querySelector("#form-client");
let btnSubmit = formClient.querySelector("[type=submit]");
let inputNom = formClient.querySelector("#ac-nom");
let inputPrenom = formClient.querySelector("#ac-prenom");
let inputAdresse = formClient.querySelector("textarea");
let inputEmail = formClient.querySelector("#ac-email");
let inputEmailVerif = formClient.querySelector("#ac-email-verif");

// inputAdresse.setCustomValidity("Il y a une erreur dans l'adresse...");
// // inputAdresse.setCustomValidity("");
// formClient.reportValidity();

function emailVerif(){
    let email1 = inputEmail.value.trim();
    let email2 = inputEmailVerif.value.trim();

    if(email1 === email2){
        inputEmailVerif.setCustomValidity("");
    }else{
        inputEmailVerif.setCustomValidity("Les deux adresses e-mail doivent être identiques.");
    }
};
function afficherErreurs(){
    formClient.reportValidity();
}
async function enregistrerClient(event){
    event.preventDefault();
    let nom = inputNom.value.trim().toUpperCase();
    let prenom = inputPrenom.value.trim();
    await dao.create(nom, prenom);
    actualiserClients();
    window.location = "#liste-clients"
    notification(`Client ${nom} enregistré.`);
}

inputEmail.addEventListener("input",emailVerif);
inputEmailVerif.addEventListener("input",emailVerif);
formClient.addEventListener("focusout",afficherErreurs);
formClient.addEventListener("submit",enregistrerClient);


btnSubmit.disabled = !formClient.checkValidity(); // vérification initiale

formClient.addEventListener("input",()=>{
    btnSubmit.disabled = !formClient.checkValidity();
});

// écouter l'événement input sur les deux champs
// lire et comparer les deux valeurs
// vérifier et afficher l'erreur avec setCustomValidity()


// formClient.addEventListener("invalid",()=>{
//     btnSubmit.disabled = true;
// });
// formClient.addEventListener("valid",()=>{
//     btnSubmit.disabled = false;
// });


/* Validation des adresses e-mail */




// ...addEventListener("invalid", () => {})
// ...addEventListener("input", () => {})
// monForm.checkValidity() ... true/false
// monForm.reportValidity() ... true/false







/* --- démo js sur titre h1 --- */
let titre = document.querySelector("body > header > h1");
titre.addEventListener("click", (event) => {
    titre.textContent += " en JavaScript";
    titre.style.color = "#c60";
});

/* --- menu gauche --- */
let btnMenu = document.querySelector("body > nav > #btn-menu-close");
btnMenu.addEventListener("click", (event) => {
    document.body.classList.toggle("menu-closed");
});

// window.clients = window.clients || [];

/* --- drag&drop fichier json list clients --- */
let listeClients = document.querySelector("#liste-clients");
listeClients.addEventListener("dragover", event => {
//    console.dir(event.dataTransfer);
    let items = event.dataTransfer.items;
    if (items.length > 0 && items[0].type === "application/json" ) {
        event.preventDefault();
        listeClients.classList.add("dragfile");
    }
});
listeClients.addEventListener("dragleave", event => {
    listeClients.classList.remove("dragfile");
});

listeClients.addEventListener("drop", event => {
    event.preventDefault();

    listeClients.classList.remove("dragfile");
    console.dir("ficher json reçu !");

    let file = event.dataTransfer.items[0].getAsFile();
    let reader = new FileReader();
    reader.addEventListener("load", async (fr, event) => {
        let attentes = [];
        let clients = JSON.parse(reader.result);
        clients.forEach(client => {
            attentes.push(dao.create(client.nom,client.prenom));
        });
        await Promise.all(attentes);
        actualiserListeClients();
    });
    reader.readAsText(file);
});
// document.body.parentNode.addEventListener("drop", event => {
//     event.preventDefault();
// }, true);


/* --- carte google maps --- */

let eniNantes = {lat: 47.22, lng: -1.63};

let carte = new google.maps.Map(
    document.querySelector('#carte'), 
    {
        zoom: 12,
        center: eniNantes
    }
);
let agence1 = new google.maps.Marker({
    position: eniNantes, 
    map: carte,
    mapTypeId: google.maps.MapTypeId.SATELLITE
});



