fetch(`http://localhost:3000/api/products`).then(function(res){
        if(res.ok){
            return res.json();
        }
        console.log(res);
    })

function saveBasket(basket){
    //prend objet et transforme en chaine de char
    localStorage.setItem("basket", JSON.stringify(basket));
}

function getBasket(){
    let basket = localStorage.getItem("basket");
    if(basket == null){
        return [];
    }else{
        // prend chaine de char et transforme en objet
        return JSON.parse(basket);
    }
}

function addBasket(product){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if(foundProduct != undefined){
        foundProduct.quantity++;
    }else{
        product.quantity = 1;
        basket.push(product); 
    }
    saveBasket(basket);
}

function removeFromBasket(product){
    let basket = getBasket();
    basket = basket.filter(p => p.id != product.id);
    saveBasket(basket);
}

function changeQuantity(product,quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p.id == product.id);
    if(foundProduct != undefined){
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0){
            removeFromBasket(foundProduct);
        } else{
            saveBasket(basket);
        }
    }
}

function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for(let product of basket){
        number += product.quantity;
    }
    return number;
}

function getTotalPrice(){
    let basket = getBasket();
    let total = 0;
    for(let product of basket){
        total += product.quantity * product.price;
    }
    return number;
}

//récupère bouton ajouter au panier
// const btnBasket = document.getElementById("addToCart");

//ecoute le btn
// btnBasket.addEventListener("click", (event)=>{
//     event.preventDefault();
//     console.log(product);
// })

//récupère les valeurs
