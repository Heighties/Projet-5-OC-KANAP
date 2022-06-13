
    const apiUrl =`http://localhost:3000/api/products`;
    // async function getProducts(){
    //     const response = await fetch(apiUrl);
    //     const data = await response.json();
    //     console.log(data);
    // }

    async function getProducts(){
    fetch(apiUrl).then((response) => response.json().then((data) => {
        console.log(data); 
    }
    ))}
    getProducts();

    let a = document.createElement('a');
    let article = document.createElement('article');
    let prdName = document.createElement('h3')

    document.getElementById("items").appendChild(a);
    a.appendChild(article);
    article.appendChild(prdName);
    prdName.classList.add("productName");
    // prdName.innerHTML = "TEST";
    prdName.textContent = data.name;