// import { ClientDAO } from "./data-service.js";
import { ClientDAO } from "../data/storage-service.js";


export class FormClientCmp{
    constructor(update){
        this.update = update;

        this.dao = new ClientDAO();

        this.formClient = document.querySelector("#form-client");
        this.btnSubmit = formClient.querySelector("[type=submit]");
        this.inputNom = formClient.querySelector("#ac-nom");
        this.inputPrenom = formClient.querySelector("#ac-prenom");
        this.inputAdresse = formClient.querySelector("textarea");
        this.inputEmail = formClient.querySelector("#ac-email");
        this.inputEmailVerif = formClient.querySelector("#ac-email-verif");

        this.inputEmail.addEventListener("input",this.emailVerif.bind(this));
        this.inputEmailVerif.addEventListener("input",this.emailVerif.bind(this));
        this.formClient.addEventListener("focusout",this.afficherErreurs.bind(this));
        this.formClient.addEventListener("submit",this.enregistrerClient.bind(this));


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


