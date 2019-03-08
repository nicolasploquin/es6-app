// import { clientDAO } from "./data-async/data-async-service.js";
// import { clientDAO } from "./data-async/rest-service.js";
import { clientDAO } from "./data-async/fetch-service.js";

import { FormClientCmp } from "./cmp/form-client-async-cmp.js";

import { encodeText, notification } from "./util.js";

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





/* ---- Import de clients à partir d'un fichier JSON ---- */
document
    .querySelector("#btnImport")
    .addEventListener("input", event => {
        importJson(event.target.files);
    })
;
/* ---- Import de clients à partir d'un drag&drop sur le tableau de client  ---- */

// elem  -> table client
// event -> drop ... event.preventDefault
// files -> event.dataTransfer.files
// event -> dragover ... event.preventDefault

let sectionClients = document.querySelector("#liste-clients");
sectionClients.addEventListener("drop", event => {
    event.preventDefault(); // Annuler l'ouverture du fichier dans l'onglet
    importJson(event.dataTransfer.files);
    sectionClients.classList.remove("dragfile");
});
sectionClients.addEventListener("dragover", event => {
    event.preventDefault(); // Autoriser le drop dans cette zone
    sectionClients.classList.add("dragfile");
});
sectionClients.addEventListener("dragleave", event => {
    sectionClients.classList.remove("dragfile");
});


function importJson(files){

    if(!!files[0] && files[0].type === "application/json"){
        let reader = new FileReader();
        reader.addEventListener("load", async (event) => {
            let clients = JSON.parse(reader.result);
            
            let attentes = [];
            for (const {nom,prenom} of clients) {
            // for (const client of clients) {
                //     let {nom,prenom} = client;
                attentes.push(dao.create(nom,prenom));
            }
            
            await Promise.all(attentes); // Promise.race()
            actualiserListeClients();

            notification(`${clients.length} clients importés`);
            
        });
        reader.readAsText(files[0]);
    }
}


// /* --- drag&drop fichier json list clients --- */
// let listeClients = document.querySelector("#liste-clients");
// listeClients.addEventListener("dragover", event => {
// //    console.dir(event.dataTransfer);
//     let items = event.dataTransfer.items;
//     if (items.length > 0 && items[0].type === "application/json" ) {
//         event.preventDefault();
//         listeClients.classList.add("dragfile");
//     }
// });
// listeClients.addEventListener("dragleave", event => {
//     listeClients.classList.remove("dragfile");
// });

// listeClients.addEventListener("drop", event => {
//     event.preventDefault();

//     listeClients.classList.remove("dragfile");
//     console.dir("ficher json reçu !");

//     let file = event.dataTransfer.items[0].getAsFile();
//     let reader = new FileReader();
//     reader.addEventListener("load", async (fr, event) => {
//         let attentes = [];
//         let clients = JSON.parse(reader.result);
//         clients.forEach(client => {
//             attentes.push(dao.create(client.nom,client.prenom));
//         });
//         await Promise.all(attentes);
//         actualiserListeClients();
//     });
//     reader.readAsText(file);
// });

