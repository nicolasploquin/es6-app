import {Client} from "./client.js";

const url = "https://banque-api.azurewebsites.net/api";

export class ClientDAO {

    constructor(){
       
    }

    readAll(){
        let attente = new Promise( (resolve, reject) => {
            
            let clients = [];
    
            let xhr = new XMLHttpRequest();
            xhr.open("GET",`${url}/clients`);
            xhr.responseType = "json";
            xhr.addEventListener("load",()=>{
                 clients = xhr.response;
                 console.log(`${clients.length} clients.`);
                 resolve(clients);
            });
            // xhr.addEventListener("error",(err)=>{reject(err)});
            xhr.send();

        } );

        return attente;
    }
    read(id){
        let client = {};

        let xhr = new XMLHttpRequest();
        xhr.open("GET",`${url}/clients/${id}`);
        xhr.responseType = "json";
        xhr.addEventListener("load",()=>{
             client = xhr.response;
             console.log(`${client.nom} trouvé.`);
        });
        xhr.send();

        return client;
    }
    readNom(nom){
        return {}; // this.clients.filter(cli => cli.nom === nom);       
    }
    create(nom, prenom){
        return new Promise((resolve,reject)=>{

            let client = new Client(nom,prenom);
            let xhr = new XMLHttpRequest();
            xhr.open("POST",`${url}/clients/post`);
            xhr.setRequestHeader("Content-Type","application/json");
            xhr.addEventListener("load",resolve);
            xhr.send( JSON.stringify(client) );
            
        });
    }

}


