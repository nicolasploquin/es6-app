(function(){
    "use strict";

    var c = 2;

    // ex 1
    var nom = "troadec";
    var prenom = "lou-ann";

    console.log(`Bonjour ${ prenom } ${ nom }`);
    console.log("Bonjour " + prenom + " " + nom);
    
    // ex 2
    
    if(prenom.length < 5){
        console.log(`Bonjour ${ prenom.charAt(0) } ${ nom }`);
    }else{
        console.log(`Bonjour ${ prenom } ${ nom }`);
    }
    console.log(`Bonjour ${ prenom.length < 5 ? prenom.charAt(0) : prenom } ${ nom }`);

    // ex 3a

    for (let i = 0; i <= 10; i++) {
        console.log(`7 x ${String(i).padStart(2)} = ${String(i*7).padStart(3)}`);
    }

    // ex 3b
    const alea = Math.floor(Math.random()*10) + 1;
    console.log(alea);

    // let valeur;
    // do {
    //     valeur = Number(prompt("Proposez un nombre entre 0 et 10"));
    //     if(valeur > alea){
    //         console.log(`${valeur} est trop grand...`);
    //     } else if(valeur < alea) {
    //         console.log(`${valeur} est trop petit...`);
    //     }
    // } while(valeur !== alea);
    // console.log(`${valeur}, c'est gagné !`);

    // ex 4

    let tab = [5,13,4,26,9,38,7,42,1,50];

    let somme = 0;
    let min = Number.MAX_VALUE;
    // let min = tab[0];

    for (const val of tab) {
        somme += val;
        // min = ( min < val ? min : val );
        if(val < min) min = val;
    }
    console.log(`somme = ${somme} ; moyenne = ${somme / tab.length}`);

    let [a , b, ...reste] = tab;
    console.log(`a = ${a} ; b = ${b} ; et le reste ${reste}`);

    console.log("min = " + Math.min(...tab));
    console.log("max = " + Math.max(...tab));

    

    tab = tab;;


    console.log(tab.sort( (a,b) => a - b ));

    let resultat = tab
        .filter( (val,i,tab) => val % 2 === 0 )
        .map(val => val * val)
        .reduce( (val1, val2) => val1 < val2 ? val1 : val2 )
    ;

    tab.forEach( console.log );

    console.log(resultat);

    console.log(1,2,3,4);
    
    // function addition (a,b){
        //     return a + b;
        // }
        
        // var addition = function (a,b){
            //     return a + b;
            // };
            
            let addition = function (a,b){
                // console.log(typeof arguments[0]);
                if(typeof arguments[0] === "object" && arguments[0] instanceof Array){
                    return addition(...arguments[0]);
                }
                // console.log(arguments);
                let res = Number(a) + Number(b);
                for (let i = 2; i < arguments.length; i++) {
                    res += Number(arguments[i]);
                }
                return res;
            };
            
            let multiplication = function (a,b){
                console.log(c);
                return a * b;
            }
            
            
            function operation(operateur, a, b){
                console.log(nom + prenom);
                return operateur(a,b) + c;
            }
            
            console.log(addition(2));
            console.log(addition(2,6));
            console.log(addition(2,"6",4));
            console.log(addition(tab));
            
            console.log(typeof addition);
            
            console.log(addition(2,6));
            console.log(multiplication(2,6));
            
            console.log(operation(multiplication,2,6));
            console.log(operation(function(a,b){
                console.log(c);
                return a - b;
            },2,6));


            // jeAN-mARc duRanD
            // toUpperCase(), toLowerCase(), substring(), charAt()
            function miseEnFormeNom(prenom, nom){
                nom = nom.toUpperCase();
                // prenom = prenom.charAt(0).toUpperCase() 
                //         + prenom.substring(1).toLowerCase();

                // Méthode 1 : prénoms simples
                // let pos = prenom.indexOf("-");
                // let prenom1 = prenom.substring(0,pos);
                // let prenom2 = prenom.substring(pos+1);
                
                // Méthode 2 : prénoms composés
                let tabPrenoms = prenom.split("-");
                for (const i in tabPrenoms) {
                    tabPrenoms[i] = tabPrenoms[i].charAt(0).toUpperCase() 
                                + tabPrenoms[i].substring(1).toLowerCase();
                }
                prenom = tabPrenoms.join("-");

                // prenom = prenom
                //     .split("-")
                //     .map(
                //         p => p.charAt(0).toUpperCase() + p.substring(1).toLowerCase()
                //     )
                //     .join("-")
                // ;


                function convertPrenomFunction(p){ 
                    // this propre à la fonction
                    return p.charAt(0).toUpperCase() + p.substring(1); 
                }

                let convertPrenom = p => p.charAt(0).toUpperCase() + p.substring(1); // this le même que celui de la fonction miseEnFormeNom
                
                prenom = prenom
                    .toLowerCase()
                    .split("-")
                    .map(convertPrenom)
                    .join("-")
                    .split(" ")
                    .map(convertPrenom)
                    .join(" ")
                ;


                for (const val of tabPrenoms) { }

                for (const i in tabPrenoms) {
                    tabPrenoms[i] = tabPrenoms[i].charAt(0).toUpperCase() 
                                + tabPrenoms[i].substring(1).toLowerCase();
                }
                prenom = tabPrenoms.join("-");




                return `${prenom} ${nom}`; // Jean-Marc DURAND
            }

            console.log(miseEnFormeNom("mArC", "duRanD"));
            console.log(miseEnFormeNom("lou-aNN", "trOAdeC"));



            
            let p1 = {
                nom: "Leblanc",
                prenom: "Marc",
                afficher: function(){
                    console.log("autre chose...");
                }
            }

            //let props = ["nom","prenom"];

            for (const prop of Object.keys(p1)) {
                console.log(prop + " - " + p1[prop] ); // p1["prop"]
            }



            let Personne = function(pNom, pPrenom){
                this.nom = pNom != undefined ? pNom : "";
                this.prenom = pPrenom != undefined ? pPrenom : "";
            }

            Personne.prototype.afficher = function(){
                console.log(`${this.prenom} ${this.nom}`);
            };
            

            let p2 = new Personne();
            p2.nom = "Martin";
            p2.prenom = "Laurent";
            p2.ville = "Nantes";
            p2.afficher();
            
            let p3 = new Personne("Dupont","Marie");
            p3.afficher();

            let listePersonnes = [p1,p2,p3];

            for (const pers of listePersonnes) {
                pers.afficher();
            }

            console.log(p2.ville);




        })();