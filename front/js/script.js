
    // const apiUrl =`http://localhost:3000/api/products`;
    // async function getProducts(){
    //     const response = await fetch(apiUrl);
    //     const data = await response.json();
    //     console.log(data);
    // }

    // async function getProducts(){
    // fetch(apiUrl).then((response) => response.json().then((data) => {
    //     console.log(data); 
    // }
    // ))}
    // getProducts();

    // let a = document.createElement('a');
    // let article = document.createElement('article');
    // let prdName = document.createElement('h3')

    // document.getElementById("items").appendChild(a);
    // a.appendChild(article);
    // article.appendChild(prdName);
    // prdName.classList.add("productName");
    // prdName.innerHTML = "TEST";
   
    fetch(`http://localhost:3000/api/products`).then(function(res){
        if(res.ok){
            return res.json();
        }
        console.log(res);
    })
    .then(function(datas){
        datas.forEach(product =>{
            let items = document.getElementById('items');
            a = document.createElement('a');
            article = document.createElement('article');
            article.classList.add("productCard");
            img = document.createElement('img');
            img.classList.add("productImage");
            h3 = document.createElement('h3');
            h3.classList.add("productName");
            p = document.createElement('p');
            p.classList.add("productDescription");

            items.appendChild(a);
            a.appendChild(article);
            article.appendChild(img);
            article.appendChild(h3);
            article.appendChild(p);

            a.href = product._id;
            img.src = product.imageUrl;
            img.alt = product.altTxt;
            h3.innerHTML = product.name;
            p.innerHTML = product.description;
        });
    });