fetch("/luxdrive_site_data_full.json") // Récupération du .JSON
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Erreur : le fichier JSON n'est pas chargé"); // Si on ne le trouve pas on affiche "Erreur : le fichier JSON n'est pas chargé"
        }
        return response.json();
    })
    .then(function(data) {
        const cars = data.cars; // On récupère les données de "cars" dans le .json et on les stock dans une constante cars
        const brands = data.brands; // On récupère les données de "brands" dans le .json et on les stock dans une constante brands

        const catalogueContainer = document.createElement("div"); // On crée une div principale qui contiendra tous le contenue HTML qu'on stock dans une constante "catalogueContainer"
        catalogueContainer.classList.add("catalogue-container", "container", "mt-5"); // On lui ajoute des class BOOSTRAP pour gérer son espace

        let catalogueHTML = "<h2 class='text-center mb-4 text-white'>Catalogue des voitures</h2>"; // On crée une variable "catalogueHTML" qui sera modifier par le contenu de la page
        catalogueHTML += "<div class='row'>"; // On modifie "catalogueHTML" grace a "+=" pour crée une class "row"

        for (let c = 0; c < cars.length; c++) { // On crée une boucle qui va parcourir le tableau "cars"
            let brandName = ""; // On crée une variable "brandName" qu'on laisse vide mais qui sera remplacer par les marques 

            for (let i = 0; i < brands.length; i++) { // On crée une boucle qui va parcourir le tableau "brands"
                if (brands[i].id === cars[c].brandId) { // Si dans le tableau "brands" on a le même id que dans le tableau "cars"
                    brandName = brands[i].name; // On remplace l'emplacement vide de "brandName" par la marque présent 
                    break; // On arrete la boucle une fois trouver
                }
            }

            catalogueHTML += "<div class='col-lg-4 col-md-6 mb-4 d-flex justify-content-center'>"; // On modifie le "catalogueHTML" par une div et une ajoute des class BOOTSTAP
            catalogueHTML += "<div class='card car-card border border-light bg-transparent text-light shadow-lg' style='width: 22rem;'>"; // Idem

            // On modifie le "catalogueHTML" par une image qu'on va chercher dans le tableau "cars" le chemin présent dans le parametre "image". Pour l'alt on fait la même chôse mais on va récuperer le parametre "name" puis on ajoute des class BOOSTRAP
            catalogueHTML += "<img src='" + cars[c].image + "' alt='" + cars[c].name + "' class='card-img-top' style='height: 200px; object-fit: cover;'>";

            catalogueHTML += "<div class='card-body'>"; // On modifie le "catalogueHTML" pour ajouter une div "card body"
            catalogueHTML += "<h4 class='card-title fw-bold'>" + cars[c].name + "</h4>";
            catalogueHTML += "<p class='card-text text-warning fw-bold'>" + cars[c].price.toLocaleString("fr-FR") + " €</p>";
            catalogueHTML += "<p class='card-text'><small class='text-muted'>Marque : " + brandName + "</small></p>";
            catalogueHTML += "<a href='id=" + cars[c].id + "' class='btn btn-outline-danger w-100'>Voir détails</a>";
            catalogueHTML += "</div>";
            catalogueHTML += "</div>"; 
            catalogueHTML += "</div>"; 
        }

        catalogueHTML += "</div>";
        catalogueContainer.innerHTML = catalogueHTML;

        document.body.appendChild(catalogueContainer);
    })