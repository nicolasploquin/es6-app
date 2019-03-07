import {Client} from "../model/client.js";

const url = "https://banque-api.azurewebsites.net/api";

export class ClientDAO {

    constructor(){
       
    }

    readAll(){
        return new Promise((resolve,reject) => {
            fetch(`${url}/clients`).then(resp => {
                resolve(resp.json());
            });
        });
    }
    // readAll(){
    //     return new Promise((resolve,reject) => {
    //         fetch(`${url}/clients`).then(resp => {
    //             resolve(resp.json());
    //         });
    //     });
    // }
    // async readAll(){
    //     let clients = await fetch(`${url}/clients`)
    //                 .then(resp => resp.json());
    //     // let clients = await resp.json();
    //     console.log(`${clients.length} clients reçus.`);
    //     return clients;
    // }
    read(id){
        
        return {};
    }
    readNom(nom){
        return {}; // this.clients.filter(cli => cli.nom === nom);       
    }
    async create(nom, prenom){
        let client = new Client(nom,prenom);
        return fetch(`${url}/clients/post`,{
            method: 'POST',
            body: JSON.stringify(client),
            headers:{
                'Content-Type': 'application/json'
            }
        });

    }

}


