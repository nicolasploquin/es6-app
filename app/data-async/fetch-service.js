import {Client} from "../model/client.js";

const url = "https://core-webapi.azurewebsites.net/api/clients";

class ClientDAO {

    constructor(){
       
    }

    // readAll(){
    //     return new Promise((resolve,reject) => {
    //         fetch(`${url}/clients`).then(resp => {
    //             resolve(resp.json());
    //         });
    //     });
    // }
    async readAll(){
        return fetch(url).then(resp => resp.json());
    }

    read(id){ 
        return fetch(`${url}/${id}`).then(resp => resp.json());
    }
    readNom(nom){
        return {}; // this.clients.filter(cli => cli.nom === nom);       
    }
    async create(nom, prenom){
        return fetch(url,{
            method: 'POST',
            headers:{
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new Client(nom,prenom))
        });

    }

}

export const clientDAO = new ClientDAO();

