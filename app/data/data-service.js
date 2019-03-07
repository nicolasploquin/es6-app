import {Client} from "../model/client.js";

class ClientDAO {

    constructor(){
        this.clients = [
            new Client("ainslie","ben"),
            new Client("scheidt","robert"),
            new Client("leblanc","marie")
        ];
    }

    readAll(){
        return this.clients;       
    }
    read(id){
        return this.clients.find(cli => cli.id === id);  
    }
    readNom(nom){
        return this.clients.filter(cli => cli.nom === nom);       
    }
    create(nom, prenom){
        this.clients.push(new Client(nom, prenom));
    }

}

export const clientDAO = new ClientDAO();

