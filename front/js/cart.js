let addProduct = JSON.parse(localStorage.getItem("basket"));


const basketDisplay = async () => {
    if(addProduct){
        await addProduct;
        console.log(addProduct);

    }
};