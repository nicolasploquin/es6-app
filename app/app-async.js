// import { ClientDAO } from "./data-service.js";
// import { ClientDAO } from "./storage-service.js";
import { ClientDAO } from "./rest-service.js";
// import { ClientDAO } from "./fetch-service.js";
// import { ClientDAO } from "./data-async-service.js";
import { encodeText } from "./util.js";
import { FormClientCmp } from "./cmp/form-client-cmp.js/index.js";

let dao = new ClientDAO();

/* --- Construction du tableau des clients --- */
function actualiserListeClients(){
    let attente = dao.readAll();
    attente.then( clients => {

        let tabClients = document.querySelector("#liste-clients table > tbody");
        tabClients.innerHTML = "";
        
        let trInnerHtml = cli => {
            if(cli){
                let trHTML = `<tr>
                                <td>${encodeText(cli.nom)}</td>
                                <td>${encodeText(cli.prenom)}</td>
                              </tr>`;
                tabClients.innerHTML += trHTML;
            }
        };
        
        let trCreateElement = cli => {
            let trHTML = document.createElement("tr");
            let tdNom = document.createElement("td");
            tdNom.textContent = cli.nom;  
            let tdPrenom = document.createElement("td");
            tdPrenom.textContent = cli.prenom;
            trHTML.appendChild(tdNom); 
            trHTML.appendChild(tdPrenom);
            tabClients.appendChild(trHTML);
        };
        clients.forEach( trInnerHtml );
    } );    

}    

actualiserListeClients();
document
    .querySelector("#btnClients")
    .addEventListener("click", actualiserListeClients);


/* --- formulaire nouveau client --- */

let formClientCmp = new FormClientCmp();




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


