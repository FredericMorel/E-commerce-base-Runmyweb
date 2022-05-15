

let body=document.getElementById("App");


document.getElementById("formCommande").addEventListener("submit",function(e){
    e.preventDefault();
    const commande={
        reference : generateReference(),
        clientId:0,
        date: new Date(),
        products: [],
    }
    const client=Client.getClientByName(e.target.name.value);

    if(client){
        commande.clientId=client.id;
        let p=document.getElementById("error");
        if(p){
            p.remove();
        }
    } else {
        console.error("client not found");
        let p=document.getElementById("error");
        if(!p){
            p=document.createElement("p");
        }
       
        p.innerHTML="Client disparu";
        p.style.color="red";
        p.id="error";
        e.target.name.before(p);
        return;
    }

    switch (e.target.product.value){
        case "1" :
         commande.products.push({
            id: commandeTable.lastId++,
            name: "product 1",
            price: 10,
            quantity: Math.floor(Math.random()*10)+1 
         });
         break;
         case "2":
         commande.products.push({
             id: commandeTable.lastId++,
             name: "product 2",
             price: 20,
             quantity: Math.floor(Math.random()*10)+1 
         });
         break;
         case "3":
            commande.products.push({
                id: commandeTable.lastId++,
                name: "product 3",
                price: 5,
                quantity: Math.floor(Math.random()*10)+1 
            });
            break ;
            default:
                console.error("product not found");
                return;
      
    };
    const myCommande=new commandes(commande).addCommandeInDataBase();
   /* Afficher la commande */
   tableCommandes.insertLine({
       data:[myCommande.id,
        Client.getClientById(myCommande.clientId).name,
        myCommande.date,
        commandes.serializeProductsData(myCommande.products)
]});
   console.log({data:[]});
})

document.getElementById("formclient").addEventListener("submit", function (e) {

    /* stop event submit formulaire */
    e.preventDefault();

    /* create new client */
    let myClient=new Client({ name: e.target.name.value, adresse: e.target.city.value, tel: e.target.tel.value, email: e.target.email.value, age: e.target.age.value }).addClientInDataBase();

    /* update view */
   tableClients.insertLine({data:[myClient.id, myClient.name,myClient.age,myClient.city,myClient.date]})
});
console.log(SaveStorage.get("listClients"));
let listClients=SaveStorage.get("listClients")?SaveStorage.get("listClients"):clientsTable.clients;

let dataClients=[];

listClients.map(client => {

    dataClients.push([client.id, client.name, client.age, client.city, client.date,client.categorie],);

});

const tableClients=new tableau({ name: "Clients", data: dataClients, headers: ["id", "name", "age", "city", "date","catégorie"],options:{research:true} });
tableClients.generateTable({ elementId: "formclient", order:"after" });
tableClients.addFilterTable({values: {particulier:"particulier",boulangerie:"boulangerie",magasin:"magasin"}});


let listCommandes=SaveStorage.get("listCommandes")?SaveStorage.get(listCommandes):commandeTable.commandes;
let dataCommandes=[];

for (let index=0;index<listCommandes.length;index++) {
    const commande=listCommandes[index];
    dataCommandes.push([
        commande.id,
        Client.getClientById(commande.clientId).name,
        commande.date,
        commandes.serializeProductsData(commande.products)
    ]);

}
// 
const tableCommandes=new tableau({ name: "Commandes", data: dataCommandes, headers: ["id", "clientId", "date", "products"],options:{research:true}});
tableCommandes.generateTable({ elementId: "formCommande",order:"after"});

/* Générer les cards pour les produits */

for (let index=0; index<produitsTable.produits.length;index++){
    const produit=produitsTable.produits[index];

    document.getElementById("App").appendChild(new CardProduct(
        {
            name:produit.name,
            price: produit.price,
            id: produit.id,
            pic: produit.pic,
            description: produit.description
        }).render());
}