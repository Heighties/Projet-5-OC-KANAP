
(async function() {
    const productId = getProductId();
    console.log(productId);
    const product = await getProduct(productId);
    console.log(product);
    hydrateProduct(product);
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
    
}