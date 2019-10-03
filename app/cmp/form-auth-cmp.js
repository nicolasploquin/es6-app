


const API_URL = "https://banque.azurewebsites.net/api";

class AuthFormCmp {


    constructor(){
        this.form = document.querySelector("#form-auth form");
    }
    init(){
        let btnAuth = document.querySelector("#btnAuth");
        btnAuth.addEventListener("click",()=>{
            this.showForm();
        });

        this.form.addEventListener("submit", event => {
            event.preventDefault();

            let storeAuth = this.form.elements.storeAuth.checked;
            
            let data = {
                username: this.form.elements.username.value,
                password: this.form.elements.password.value
            };
            fetch(`${API_URL}/auth`,{
                method: "POST",
                headers: new Headers({
                    "Content-Type": "application/json"
                }),
                body: JSON.stringify(data)
            })
            .then( async response => {
                if(response.status !== 200) {
                    let warn = document.createElement("p");
                    warn.textContent = "Identifiant / Mot de passe invalides !";
                    this.form.appendChild(warn);
                    return;
                }

                // Les informations d'authentification sont enregistrées 
                // dans le storage avec la clé "auth"
                if(storeAuth){ 
                    // si l'utilisateur souhaite enregistrer les info de connexion dans son navigateur
                    localStorage.auth = await response.text();
                }else{
                    sessionStorage.auth = await response.text();
                }

                this.form.parentElement.classList.remove("show");
            });
            // .then( resp => resp.json() )
            // .then( data => {
            //     if(storeAuth){
            //         localStorage.auth = JSON.stringify(data);
            //     }else{
            //         sessionStorage.auth = JSON.stringify(data);
            //     }
            // });
            
        });

    }

    afficher(){
    }

    showForm(){
        this.form.parentElement.classList.add("show");
    }




}

export const authFormCmp = new AuthFormCmp();
