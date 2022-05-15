class tableau {

    constructor({ name = "", data = [], headers = [], color = "black", options = {
        research: false,
        filter: {
            active: false,
            type: "",
            values: {},
            key: ""

        }
    } }) {

        if (!options.filter) {
            options.filter = {
                active: false,
                type: "",
                values: {},
            }
        }

        this.name = name;
        this.data = data;
        this.headers = headers;
        this.color = color;
        this.tbody = null;
        this.order = null
        this.options = options;

    }

    generateTable({ elementId = "", order = "after" }) {

        /* update last order */
        if (this.order === null) {

            this.order = order;
        }

        let content = document.createElement("div");
        content.id = this.name;
        content.innerHTML = `<h1 
        id="title-${this.name}"
        style="color:${this.color}">${this.name}</h1> ${this.options.research ? `<input type="text"id="search-${this.name}" placeholder="Search...">` : ""}`;



        let table = document.createElement("table");
        let contentTable = document.getElementById(elementId);
        table.className ="tg";
        let thead = document.createElement("thead");
        this.tbody = document.createElement("tbody");


        /* Generate Head tableaux */
        let trhead = document.createElement("tr");
        for (let index = 0; index < this.headers.length; index++) {
            const element = this.headers[index];
            let th = document.createElement("th");
            th.className = "tg-0lax";
            th.innerHTML = element;
            trhead.appendChild(th);

        }
        thead.appendChild(trhead);

        /* Generate Body tableaux */
        for (let index = 0; index < this.data.length; index++) {
            const element = this.data[index];

            if (element !== null) {
                this.insertLine({ data: element });
            }
        }

        table.appendChild(thead);
        table.appendChild(this.tbody);
        table.style.color = this.color;
        content.appendChild(table);


        switch (this.order) {
            case "before":
                contentTable.before(content);
                break;
            case "after":
                contentTable.after(content);
                break;

            default:
                contentTable.appendChild(content);
                break;
        }

        if (this.options.research) {
            document.getElementById(`search-${this.name}`).addEventListener("keyup", (e) => {
                console.log(e);
                this.cherche(e.target.value);

            });
        }


    }

    insertLine({ data = [] }) {

        let tr = document.createElement("tr");

        for (let index = 0; index < data.length; index++) {
            const element = data[index];
            let td = document.createElement("td");
            td.className = "tg-0lax";
            td.innerHTML = element;
            tr.appendChild(td);

        }



        this.tbody.appendChild(tr);


    }

    deleteLine({ index }) {
        this.tbody.removeChild(this.tbody.childNodes[index]);
    }

    updateLine({ index, data: [] }) {
        this.deleteLine({ index });
        this.insertLine({ data: data });

    }

    deleteTable() {
        document.getElementById(this.name).remove();

    }

    updateTable({ data: [] }) {
        this.deleteTable();
        this.generateTable({ elementId: this.name, data: data });


    }

    getIndexLine({ data: [] }) {
        let index = null;
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i] === data) {
                index = i;
                break;
            }

        }
        return index;
    }

    cherche(inputValue = "") {
        let tr = this.tbody.childNodes;
        for (let i = 0; i < tr.length; i++) {
            let td = tr[i].childNodes;
            for (let j = 0; j < td.length; j++) {
                if (td[j].innerHTML.toLowerCase().includes(inputValue.toLowerCase())) {
                    tr[i].style.display = "";
                    break;
                } else {
                    tr[i].style.display = "none";
                }


            }

        }
    }
    addFilterTable({ type = "categorie", values = {} }) {
        this.options.filter.active = true;
        this.options.filter.type = type;
        this.options.filter.values = values;


        /* Generate buttons categorie */
        if (type === "categorie") {
            let div = document.createElement("div");
            div.id = `filter-${this.name}`;
            div.className = "filter";
            let label = document.createElement("label");
            label.innerHTML = "Categorie";
            div.appendChild(label);
            let select = document.createElement("select");
            select.id = `select-${this.name}`;
            select.className = "select";
            div.appendChild(select);
            let option = document.createElement("option");
            option.innerHTML = "Tout";
            option.value = "";
            select.appendChild(option);
            for (let key in values) {
                let option = document.createElement("option");
                option.innerHTML = key;
                option.value = key;
                select.appendChild(option);

            }
            document.getElementById(`title-${this.name}`).after(div);
            /* document.getElementById(`filter-${this.name}`).appendChild(div); */
            document.getElementById(`select-${this.name}`).addEventListener("change", (e) => {
                this.filterTable({ type: "categorie", value: e.target.value });
            });
        }
    }
    filterTable({ type = "", value = "" }) {
        if (type === "categorie") {
            let tr = this.tbody.childNodes;
            for (let i = 0; i < tr.length; i++) {
                let td = tr[i].childNodes;
                for (let j = 0; j < td.length; j++) {
                    if(value===""){
                        tr[i].style.display="";
                    }else{
                        if (td[j].innerHTML === value) {
                            tr[i].style.display = "";
                        } else {
                            tr[i].style.display = "none";
                        }
                    }
                }
            }
        }
    }
}