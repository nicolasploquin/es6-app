/* --- Classe ECMASCRIPT 6 --- */
export class Client {

    constructor(nom, prenom) {
        this.id = 0;
        this.nom = nom?nom:"";
        this.prenom = prenom?prenom:"";
    }
    get nom(){
        return this._nom;
    }
    set nom(value){
        this._nom = value.toUpperCase();
    }
    get prenom(){
        return this._prenom;
    }
    set prenom(value){
        this._prenom = value.toLowerCase()
            .split('-')
            .map(prenom => prenom.charAt(0).toUpperCase() + prenom.substring(1))
            .join('-')
            .split(' ')
            .map(prenom => prenom.charAt(0).toUpperCase() + prenom.substring(1))
            .join(' ');
    }
    afficher(){
        console.log(`${this.prenom} ${this.nom} ${this.id}`);
    }
    toString(){
        return `${this.prenom} ${this.nom} ${this.id}`;
    }
    toJSON(){ // JSON.stringify()
        return {
            id: this.id,
            nom: this.nom,
            prenom: this.prenom
        };
    }
};

// Client.genID = 0;

// /* --- Classe Javascript 5 --- */
// let Client = function(nom, prenom) {
//     this.id = Client.prototype.genID++;
//     this.nom = nom?nom:"";
//     this.prenom = prenom?prenom:"";
//     // this.afficher = function() {
//     //     console.log(`${this.prenom} ${this.nom}`);
//     // };
// };

// Client.prototype.afficher = function(){     // Méthode de classe
//     console.log(`${this.prenom} ${this.nom}`);
// }

// Client.prototype.genID = 0;    // Attribut de classe (static)
