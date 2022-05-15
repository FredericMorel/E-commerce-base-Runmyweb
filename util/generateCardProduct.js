class CardProduct {
    constructor({name,price,description,pic}){
        this.name=name;
        this.price=price;
        this.description=description;
        this.image=pic;
    }

    render(){
        let card=document.createElement("div");
        card.className="card";

        let img=document.createElement("img");
        img.src=this.image;
        console.log(this.image);
        card.appendChild(img);

        let cardBody=document.createElement("div");
        cardBody.className="card-body";


        let cardTitle=document.createElement("h5");
        cardTitle.className="card-title";
        cardTitle.innerHTML=this.name;

        cardBody.appendChild(cardTitle);

        let cardText=document.createElement("p");
        cardText.className="card-text";
        cardText.innerHtml=this.description;
        
        cardBody.appendChild(cardText);

        let cardPrice=document.createElement("p");
        cardPrice.className="card-text";
        cardPrice.innerHTML=`<strong>${this.price}</strong>`;

        cardBody.appendChild(cardPrice);
        card.appendChild(cardBody);
        return card;
    }


}

