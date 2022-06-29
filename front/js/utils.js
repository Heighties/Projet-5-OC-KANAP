//*****************************BASKET**********************************//


//en mode orienté objet

// fetch(`http://localhost:3000/api/products`).then(function(res){
//         if(res.ok){
//             return res.json();
//         }
//         console.log(res);
//     })

// class Basket{
//     constructor(){
//         let basket = localStorage.getItem("basket");
//         if(basket == null){
//             this.basket = [];
//         }else{
//             this.basket = JSON.parse(basket);
//         }
//     }
    

//     save(){
//         localStorage.setItem("basket", JSON.stringify(this.basket));
//     }


//     add(product){
//         let foundProduct = this.basket.find(p => p._id == product._id);
//         if(foundProduct != undefined){
//             foundProduct.quantity++;
//         }else{
//             product.quantity = 1;
//             basket.push(product); 
//         }
//         this.save();
//     }

//     remove(product){
//         this.basket = this.basket.filter(p => p._id != product._id);
//         this.save();
//     }

//     changeQuantity(product,quantity){
//         let foundProduct = this.basket.find(p => p._id == product._id);
//         if(foundProduct != undefined){
//             foundProduct.quantity += quantity;
//             if(foundProduct.quantity <= 0){
//                 remove(foundProduct);
//             } else{
//                 this.save();
//             }
//         }
//     }

//     getNumberProduct(){
//         let number = 0;
//         for(let product of this.basket){
//             number += product.quantity;
//         }
//         return number;
//     }

//     getTotalPrice(){
//         let total = 0;
//         for(let product of this.basket){
//             total += product.quantity * product.price;
//         }
//         return number;
//     }
    
// }


// PREMIERE METHODE

const btnColor = document.getElementById("colors");
const btnQuantity = document.getElementById("quantity");

//enregistrer le panier dans le local storage

function saveBasket(basket){
    //prend objet et transforme en chaine de char (serialization)
    localStorage.setItem("basket", JSON.stringify(basket));
}

//récupérer le panier

function getBasket(){
    let basket = localStorage.getItem("basket");
    //si donnée n'existe pas dans local storage => retourne null (tableau/panier vide)
    if(basket == null){
        return [];
    }else{
        // prend chaine de char et transforme en objet/tableau/donnée...
        return JSON.parse(basket);
    }
}

//ajouter un produit au panier

function addBasket(product){
    let basket = getBasket();
    //recherche dans panier s'il y a un id = id du produit à ajouter
    let foundProduct = basket.find(p => p._id === product._id);
    console.log(basket, product);
    //Pour modifier la couleur et la quantité du produit à ajouter au panier
    const productModif = Object.assign({}, product, {
        colors : `${btnColor.value}`,
        quantity: `${btnQuantity.value}`
    });
    
    console.log(productModif);

    // if(foundProduct !== undefined){
    //     foundProduct.quantity++;
    if(foundProduct !== undefined){
        basket.push(productModif);
        localStorage.setItem("basket", JSON.stringify(basket));
        console.log(basket);
    }
    else{
        product.quantity = 1;
        basket.push(productModif); 
    }
    saveBasket(basket);
}

//supprimer un produit

function removeFromBasket(product){
    let basket = getBasket();
    basket = basket.filter(p => p._id != product._id);
    saveBasket(basket);
}

//changer la quantité de produit

function changeQuantity(product,quantity){
    let basket = getBasket();
    let foundProduct = basket.find(p => p._id == product._id);
    if(foundProduct != undefined){
        foundProduct.quantity += quantity;
        if(foundProduct.quantity <= 0){
            removeFromBasket(foundProduct);
        } else{
            saveBasket(basket);
        }
    }
}


//calculer la quantité de produits dans le panier 

function getNumberProduct(){
    let basket = getBasket();
    let number = 0;
    for(let product of basket){
        number += product.quantity;
    }
    return number;
}

//avoir le prix total du panier

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
