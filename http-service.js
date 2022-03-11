
const URL_API = 'https://banque.azurewebsites.net/api';

class HttpService {

    #clients = [];

    constructor(){
    }

    // readAll(){

    //     const attente = new Promise( (resolve, reject) => {
            
    //         fetch(`${URL_API}/clients`)
    //             .then( data => data.json() )
    //             .then( clients => resolve(clients) )
    //             .catch(reject)
    //         ;

    //     } );


    //     return attente;
    // }

    async readAll(){

        this.#clients = await fetch(`${URL_API}/clients`)
                            .then( data => data.json() )
        ;



        return this.#clients;
    }

    async create(client){

        return fetch(`${URL_API}/clients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(client)
        });

    }


}

export const httpService = new HttpService();


