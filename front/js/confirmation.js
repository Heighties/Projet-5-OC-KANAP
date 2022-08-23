const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

// Si ID non défini renvoyer vers page d'accueil 
function redirect(){
if( id === null){
    window.location.href = "./index.html"}
}

redirect();

// Récupération de l'identifiant de commande pour l'afficher
const orderId = document.getElementById('orderId');
orderId.innerHTML = id;

// Suppression du localstorage pour les prochaines commandes
localStorage.clear();