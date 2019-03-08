export const ClientCmp = {
    template: `
        <div>
            <h3>Détails</h3>
            <p>{{client.prenom}} {{client.nom}}</p>
        </div>
    `,
    props: ['client']
};