// Attend que le DOM soit entièrement chargé
      document.addEventListener("DOMContentLoaded", function () {
        
        // Sélectionne toutes les cartes de produit
        const productCards = document.querySelectorAll(".card");

        // Parcourt chaque carte de produit pour ajouter les écouteurs d'événements
        productCards.forEach(function (card) {
          
          // Trouve les éléments à l'intérieur de la carte actuelle
          const plusBtn = card.querySelector(".fa-plus-circle");
          const minusBtn = card.querySelector(".fa-minus-circle");
          const quantitySpan = card.querySelector(".quantity");

          // --- Événement pour le bouton "Plus" ---
          plusBtn.addEventListener("click", function () {
            // Récupère la quantité actuelle et la convertit en nombre
            let currentQuantity = parseInt(quantitySpan.innerText);
            // Incrémente la quantité
            currentQuantity++;
            // Met à jour l'affichage de la quantité
            quantitySpan.innerText = currentQuantity;
            // Met à jour le prix total (fonction à ajouter)
            updateTotalPrice();
          });

          // --- Événement pour le bouton "Moins" ---
          minusBtn.addEventListener("click", function () {
            // Récupère la quantité actuelle
            let currentQuantity = parseInt(quantitySpan.innerText);
            // Vérifie si la quantité est supérieure à 0 avant de décrémenter
            if (currentQuantity > 0) {
              currentQuantity--;
              // Met à jour l'affichage de la quantité
              quantitySpan.innerText = currentQuantity;
              // Met à jour le prix total (fonction à ajouter)
              updateTotalPrice();
            }
          });
          
          // J'ajoute aussi la logique pour le bouton "aimer" (coeur)
          const heartBtn = card.querySelector(".fa-heart");
          heartBtn.addEventListener("click", function() {
            // Bascule la classe "liked"
            heartBtn.classList.toggle("liked");
          });

          // Logique pour le bouton "supprimer"
          const trashBtn = card.querySelector(".fa-trash-alt");
          trashBtn.addEventListener("click", function() {
            // Met la quantité à 0 et met à jour le total
            quantitySpan.innerText = "0";
            updateTotalPrice();
            
          });

        });

        // --- Fonction pour mettre à jour le prix total ---
        
        const totalSpan = document.querySelector(".total");

        function updateTotalPrice() {
          let total = 0;
          // Ré-sélectionne toutes les cartes pour obtenir les valeurs à jour
          const allCards = document.querySelectorAll(".card");
          
          allCards.forEach(function(card) {
            // Récupère le prix unitaire de l'article
            const unitPriceText = card.querySelector(".unit-price").innerText; // ex: "100 $"
            const unitPrice = parseInt(unitPriceText.replace(" $", "")); // ex: 100
            
            // Récupère la quantité de l'article
            const quantity = parseInt(card.querySelector(".quantity").innerText); // ex: 2
            
            // Calcule le prix pour cet article et l'ajoute au total
            total += unitPrice * quantity;
          });
          
          // Met à jour l'affichage du prix total
          totalSpan.innerText = total + " $";
        }

        // Initialise le prix total au chargement (il sera de 0 $ si toutes les quantités sont à 0)
        updateTotalPrice();
        
      });