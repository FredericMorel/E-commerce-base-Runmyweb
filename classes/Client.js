class Client {
    constructor({ name, adresse, tel, email, age, dateInscription=new Date() }) {

        this.name=name;
        this.adresse=adresse;
        this.tel=tel;
        this.email=email;
        this.age=age;
        this.dateInscription=dateInscription;

    }

    addClientInDataBase() {

        /* format date inscription */

        let DateInsription=this.dateInscription.getDay()+"/"+this.dateInscription.getMonth()+"/"+this.dateInscription.getFullYear();

        /* add client in database */

        let client={
            id: clientsTable.lastId++,
            name: this.name,
            age: this.age,
            city: this.adresse,
            date: DateInsription
        }
        clientsTable.lastId=clientsTable.lastId++;
        clientsTable.clients.push(client);
        SaveStorage.save("listClients", clientsTable.clients);
        return client;
    }
    static getClientById(id) {
        return clientsTable.clients.find(client => client.id===id);
    }
    static getClientByName(name) {
        return clientsTable.clients.find(client => client.name.toLowerCase()===name.toLowerCase());
    }
    static getClientByCity(city) {
        return clientsTable.clients.find(client => client.city===city);
    }
    static getClientByDate(date) {
        return clientsTable.clients.find(client => client.date===date);
    }

    static getClients() {
        return clientsTable.clients;
    }
    static deleteClient(id) {
        /* get index client */
        let index=clientsTable.clients.findIndex(client => client.id===id);
        /* delete client */
        clientsTable.clients.splice(index, 1);
    }
}