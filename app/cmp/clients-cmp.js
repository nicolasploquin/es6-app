
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

