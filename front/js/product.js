// Fonction asynchrone pour ajouter produit et ses caractéristiques au localStorage
(async function() {
    const productId = getProductId();
    console.log(productId);
    const product = await getProduct(productId);
    hydrateProduct(product);
    
    const btnBasket = document.getElementById("addToCart");
 
    // Ecoute le bouton "ajouter au panier"
    btnBasket.addEventListener("click", function(e){
        // Récupération de la valeur input 
        if(btnQuantity.value > 0 && btnColor.value !== undefined && btnColor.value !== null && btnColor.value !== ""){
            addBasket(product); 
        }
        else{
            console.error(btnQuantity.value, btnColor.value);
            alert("Renseignez une couleur et/ou une quantité");
        }
    });
})()

// Récupération du produit
function getProductId(){
    const id = new URL(location.href).searchParams.get("id");
    // Si ID non défini renvoyer vers page d'accueil 
    if( id === null){
        window.location.href = "./index.html"}
        // Sinon afficher la page produit
    else{
        return id;
    }
}

// Récupération du produit, indentation de l'id dans l'URL
function getProduct(productId){
    return fetch(`http://localhost:3000/api/products/${productId}`).then(function(res){
        if(res.ok){
            return res.json();
        }
    })    
}

// Fonction pour ajouter et "afficher" les caractéristiques du produit
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

