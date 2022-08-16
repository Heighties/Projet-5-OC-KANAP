
(async function() {
    const productId = getProductId();
    console.log(productId);
    const product = await getProduct(productId);
    hydrateProduct(product);
    
    const btnBasket = document.getElementById("addToCart");
 
    function showMsg(){
        console.log(product);
    }

    //ecoute le bouton "ajouter au panier"

    btnBasket.addEventListener("click", function(e){
        // je récupère valeur input 
        if(btnQuantity.value > 0 && btnColor.value !== undefined && btnColor.value !== null && btnColor.value !== ""){
            addBasket(product); 
        }
        else{
            console.error(btnQuantity.value, btnColor.value);
            alert("Renseignez une couleur et/ou une quantité");
        }
    });
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


    for (let i = 0; i < colors.length; i++){
        option = document.createElement('option');
        option.text = colors[i];
        option.value = colors[i];
        document.getElementById('colors').appendChild(option);
    }

    
}

