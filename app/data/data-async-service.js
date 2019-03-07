import {Client} from "../model/client.js";

export class ClientDAO {

    constructor(){
        this.clients = [
            new Client("ainslie","ben"),
            new Client("scheidt","robert"),
            new Client("leblanc","marie")
        ];
    }

    readAll(){
        return Promise.resolve(this.clients);       
    }
    read(id){
        return Promise.resolve(this.clients.find(cli => cli.id === id));  
    }
    readNom(nom){
        return Promise.resolve(this.clients.filter(cli => cli.nom === nom));       
    }
    create(nom, prenom){
        this.clients.push(new Client(nom, prenom));
        return Promise.resolve();
    }






}