// import { clientDAO } from "./data-async/data-async-service.js";
// import { clientDAO } from "./data-async/rest-service.js";
import { clientDAO } from "./data-async/fetch-service.js";

import { FormClientCmp } from "./cmp/form-client-async-cmp.js";

import { encodeText, notification } from "./util.js";
import { authFormCmp } from "./cmp/form-auth-cmp.js";

let dao = clientDAO;

async function actualiserListeClients(){

    let clients = await dao.readAll();
    // .then(clients => {
        
    let tabClients = document.querySelector("#liste-clients table > tbody");
    tabClients.innerHTML = "";
    
    clients.forEach( cli => {
        tabClients.innerHTML += 
        `<tr><td>${encodeText(cli.nom)}</td><td>${encodeText(cli.prenom)}</td></tr>`;
    });
        
    // });
}    

actualiserListeClients();

document
    .querySelector("#btnClients")
    .addEventListener("click", actualiserListeClients);


/* --- formulaire nouveau client --- */

let formClientCmp = new FormClientCmp(actualiserListeClients);




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

/* ---- Drag & Drop d'une liste de clients ---- */
// element drop
let dropArea = document.querySelector("#liste-clients");
dropArea.addEventListener("dragover", event => {
    event.preventDefault(); // par défaut, le navigateur ignore le drag&drop en JavaScript
    let items = event.dataTransfer.items; // liste de éléments déplacés
    if(items.length > 0 && items[0].type === "application/json"){ // Si c'est un fichier JSON
        console.log('json ok');
        dropArea.classList.add("dragfile");
        // event.dataTransfer.effectAllowed = "copy";
        event.dataTransfer.dropEffect = "copy";
    }else{
        console.log('autre format');
        // event.dataTransfer.effectAllowed = "none";
        event.dataTransfer.dropEffect = "none";
    }
});
dropArea.addEventListener("dragleave", event => {
    dropArea.classList.remove("dragfile");
});

dropArea.addEventListener("drop", event => {
    event.preventDefault();
    dropArea.classList.remove("dragfile");
    console.log("drop du contenu dans la zone...");
    console.dir(event.dataTransfer.files);
    importJSON( event.dataTransfer.files ); 
});



// input type="file"
let btnImport = document.querySelector("#btnImport");
btnImport.addEventListener("change", event => importJSON(btnImport.files) ); 

function importJSON(files) {
    if(files.length > 0 && files[0].type === "application/json"){
        
        let reader = new FileReader();
        reader.addEventListener("load", event => {
            // console.log(reader.result);
            try {

                let clients = JSON.parse(reader.result);
                let promises = [];
                clients.forEach( cli => promises.push(clientDAO.create(cli.nom, cli.prenom)) );
                Promise.all(promises).then( () => actualiserListeClients() );

            } catch(e){
                console.error("Erreur lors du chargement du contenu JSON", e);
                notification("Erreur lors du chargement du contenu JSON");
            }

        });
        reader.readAsText(files[0]);
    } else {
        throw new Error("Ce type de contenu n'est pas pris en charge par l'application.");
        // notification("Ce type de contenu n'est pas pris en charge par l'application.");
        // console.error("Ce type de contenu n'est pas pris en charge par l'application.");
    }
}






/* ---- Authentification ---- */

authFormCmp.init();


