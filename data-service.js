import './data-storage.js';

class DataService {

    #clients = [];

    constructor(){
        this.#load();
    }

    #load(){
        this.#clients = JSON.parse(localStorage.getItem('data'));
    }
    #save(){
        localStorage.setItem('data', JSON.stringify(this.#clients) );
    }

    readAll(){
        return this.#clients;
    }

    create(client){
        this.#clients.push(client);
        this.#save();
    }


}

export const dataService = new DataService();


