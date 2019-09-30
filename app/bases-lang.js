(function(){
    "use strict";

    // ex 1
    let nom = "troadec";
    let prenom = "lou-ann";

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

    const tab = [5,13,4,26,9,38,7,42,1,50];

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



})();