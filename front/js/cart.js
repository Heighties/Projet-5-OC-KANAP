let addProduct = JSON.parse(localStorage.getItem("basket"));


const basketDisplay = async () => {
    if(addProduct){
        await addProduct;
        console.log(addProduct);
        //rendre invisible formulaire si aucun produit dans panier
        // contactForm.classList.add("cart__order");

        // order.addEventListener("click" , () =>{
        //     contactForm.classList.remove("cart__order")
        // })
    }
};

basketDisplay();