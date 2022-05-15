class SaveStorage{
   
   
    static save(key, value){
        value = JSON.stringify(value);
        localStorage.setItem(key,value);
    }
    static get(key){
        return JSON.parse(localStorage.getItem(key));
    }
    static delete(key){
        localStorage.removeItem(key);
    }
    static clear(){
        localStorage.clear();
    }
    static getAll(){
        return localStorage;
    }
    static getAllkeys(){
        return Object.keys(localStorage);
    }
    static getAllvalues(){
        return Object.values(localStorage);
    }
    static getAllEntries(){
        return Object.entries(localStorage);
    }
    static getAllKeysAndValues(){
        return Object.entries(localStorage);
    }
}