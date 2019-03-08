import {Client} from "../model/client.js";

class ClientDAO {

    constructor(){
        if(localStorage.clients){
            this.clients = load();
        }else{
            this.clients = [];
            this.create("ainslie","ben");
            this.create("scheidt","robert");
            this.create("troadec","nolwenn");
        }
    }

    readAll(){
        return this.clients;       
    }
    read(id){
        return this.clients.find(cli => cli.id == id);  
    }
    readNom(nom){
        return this.clients.filter(cli => cli.nom === nom);       
    }
    create(nom, prenom){
        let client = new Client(nom, prenom);
        client.id = 0;
        if(this.clients.length > 0)
            client.id = Math.max(...this.clients.map(cli => cli.id)) + 1;
        this.clients.push(client);
        save(this.clients);
    }
}

function load(){
    return JSON.parse(localStorage.clients);
}

function save(clients){
    localStorage.clients = JSON.stringify(clients);
}

export const clientDAO = new ClientDAO();
