
class commandes {
    constructor({ reference, clientId, date=new date(), products=[], status="payment validation" }) {

        this.reference=reference;
        this.clientId=clientId;
        this.date=date;
        this.products=products;
        this.status=status;
        
    }

    addCommandeInDataBase() {
        let commande={
            id: commandeTable.lastId++,
            clientId: this.clientId,
            date: this.date,
            products: this.products,
            status: this.status
        }
        commandeTable.lastId=commandeTable.lastId++;
        commandeTable.commandes.push(commande);
        SaveStorage.save("commandes",commandeTable.commanges);
        return commande;
    }

    static getCommandeById(id) {
        return commandeTable.commandes.find(commande => commande.id===id);
    }
    static getCommandeByClientId(clientId) {
        return commandeTable.commandes.find(commande => commande.clientId===clientId);
    }

    static getCommandeByDate(date) {
        return commandeTable.commandes.find(commande => commande.date===date);
    }
    static getCommandeByStatus(status) {
        return commandeTable.commandes.find(commande => commande.status===status);

    }
    static getCommandes() {
        return commandeTable.commandes;
    }
    static deleteCommande(id) {
        /* get index commande */
        let index=commandeTable.commandes.findIndex(commande => commande.id===id);
        /* delete commande */
        commandeTable.commandes.splice(index, 1);
    }

    static serializeProductsData(products) {
        let productsData=[];
        for (let index=0;index<products.length;index++) {
            const product=products[index];
            productsData.push(
                `<p> id : ${product.id}</p>
                 
                 <p> name : ${product.name}</p>
                    
                    <p> price : ${product.price}</p>
                    
                    <p> quantity : ${product.quantity}</p>
                 `
            );
        }
        return productsData;
    }
}