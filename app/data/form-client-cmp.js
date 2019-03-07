// import { ClientDAO } from "./data-service.js";
import { ClientDAO } from "./storage-service.js";


export class FormClientCmp{
    constructor(){}
}


let dao = new ClientDAO();


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

//async 
function enregistrerClient(event){
    event.preventDefault();
    let nom = inputNom.value.trim().toUpperCase();
    let prenom = inputPrenom.value.trim();
    // await dao.create(nom, prenom);
    dao.create(nom, prenom);
    // actualiserListeClients();
    // window.location = "#liste-clients"
    // notif(`Client ${nom} enregistré.`);
    
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


