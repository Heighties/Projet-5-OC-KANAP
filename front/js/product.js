
(async function() {
    const productId = getProductId();
    console.log(productId);
    const product = await getProduct(productId);
    // console.log(product);
    hydrateProduct(product);
    
    //input choisir quantité produit

    // const btnQuantity = document.getElementById("quantity");

    // const btnColor = document.getElementById("colors");

    //bouton ajouté au panier

    const btnBasket = document.getElementById("addToCart");
    
    // let basket = new Basket();
    
    function showMsg(){
        console.log(product);
    }

    //ecoute le bouton "ajouter au panier"

    btnBasket.addEventListener("click", function(e){
        // je récupère valeur input 
        if(btnQuantity.value > 0 && btnColor.value !== undefined && btnColor.value !== null && btnColor.value !== ""){
            addBasket(product);
            // console.log(btnColor.value);
        }else{
            console.error(btnQuantity.value, btnColor.value);
        }
    });
//ecoute le btn
// btnBasket.addEventListener("click", (event)=>{
    
//     event.preventDefault();
//     console.log(product);
//     basket.add(product);
// })
})()

function getProductId(){
    return new URL(location.href).searchParams.get("id");
}

function getProduct(productId){
    return fetch(`http://localhost:3000/api/products/${productId}`).then(function(res){
        if(res.ok){
            return res.json();
        }
    })    

}

function hydrateProduct(product){
    const img = document.createElement('img');
        itemImg = document.getElementsByClassName("item__img");
        itemImg[0].appendChild(img)
        img.src = product.imageUrl;
        img.alt = product.altTxt;
        document.getElementById('price').textContent = product.price;
        document.getElementById("description").textContent = product.description;
        document.getElementById("title").textContent = product.name;
    
    const colors = product.colors;
    // console.log(colors);

    for (let i = 0; i < colors.length; i++){
        option = document.createElement('option');
        option.text = colors[i];
        option.value = colors[i];
        document.getElementById('colors').appendChild(option);
    }

    
}


//stocker produit ajouté dans le local storage
