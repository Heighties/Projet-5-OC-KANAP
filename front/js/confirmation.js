const id = new URL(window.location.href).searchParams.get("id");
console.log(id);

// Récupération de l'identifiant de commande pour l'afficher
const orderId = document.getElementById('orderId');
orderId.innerHTML = id;

// Suppression du localstorage pour les prochaines commandes
localStorage.clear();