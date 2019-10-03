import {Client} from "../model/client.js";

const url = "https://banque.azurewebsites.net/api";

class ClientDAO {

    constructor(){
       
    }

    async readAll(){
        return fetch(`${url}/clients`).then(resp => resp.json());
    }

    read(id){ 
        return fetch(`${url}/clients/${id}`).then(resp => resp.json());
    }
    readNom(nom){
        return {}; // this.clients.filter(cli => cli.nom === nom);       
    }
    async create(nom, prenom){

        let auth = localStorage.auth || sessionStorage.auth;

        // Si le token n'existe pas retour
        if(!auth) {
            return Promise.resolve();
        }

        let token = JSON.parse(auth).token;

        return fetch(`${url}/clients/auth`, {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(new Client(nom,prenom))
        });

    }

}

export const clientDAO = new ClientDAO();

