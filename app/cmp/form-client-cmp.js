// import { clientDAO } from "../data/data-service.js";
import { clientDAO } from "../data/storage-service.js";


export class FormClientCmp{
    constructor(update){
        this.update = update;

        this.dao = clientDAO;

        this.formClient = document.querySelector("#form-client");
        this.btnSubmit = this.formClient.querySelector("[type=submit]");
        this.inputNom = this.formClient.querySelector("#ac-nom");
        this.inputPrenom = this.formClient.querySelector("#ac-prenom");
        this.inputAdresse = this.formClient.querySelector("textarea");
        this.inputEmail = this.formClient.querySelector("#ac-email");
        this.inputEmailVerif = this.formClient.querySelector("#ac-email-verif");

        this.inputEmail.addEventListener("input", event => { this.emailVerif(event); });
        this.inputEmailVerif.addEventListener("input", event => { this.emailVerif(event); });
        this.formClient.addEventListener("focusout", event => { this.afficherErreurs(event); });
        this.formClient.addEventListener("submit", event => { this.enregistrerClient(event); });


        this.btnSubmit.disabled = !this.formClient.checkValidity(); // vérification initiale

        this.formClient.addEventListener("input",()=>{
            this.btnSubmit.disabled = !this.formClient.checkValidity();
        });

    }

    emailVerif(){
        let email1 = this.inputEmail.value.trim();
        let email2 = this.inputEmailVerif.value.trim();
    
        if(email1 === email2){
            this.inputEmailVerif.setCustomValidity("");
        }else{
            this.inputEmailVerif.setCustomValidity("Les deux adresses e-mail doivent être identiques.");
        }
    };
    afficherErreurs(){
        this.formClient.reportValidity();
    }
    
    enregistrerClient(event){
        event.preventDefault();
        let nom = this.inputNom.value.trim().toUpperCase();
        let prenom = this.inputPrenom.value.trim();
        // await dao.create(nom, prenom);
        this.dao.create(nom, prenom);
        // actualiserListeClients();
        // window.location = "#liste-clients"
        // notif(`Client ${nom} enregistré.`);
        console.log(nom);
        this.update();
    }
    
}



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


