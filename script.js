fetch("/luxdrive_site_data_full.json")
    .then(function(response) {
        if (!response.ok) {
            throw new Error("Erreur : le fichier JSON n'est pas chargé");
        }
        return response.json();
    })
    .then(function(data) {

        // Récupere les données de la bannière depuis le JSON et le stock dans la const "heroBannerData"
        const heroBannerData = data.pagesContent.Accueil.heroBanner;

        // Création d'une "div" pour la bannière 
        const bannerContainer = document.createElement("div");

        // Création du contenu HTML
        /*
        bannerContainer.innerHTML =
        "<div class='container-fluid p-0'>" + // Conteneur principal qui prend la plain largeur
            "<div class='hero-banner-content position-relative text-center'>" + //En relatif et centrer
                "<img src='" + heroBannerData.image + "' alt='Bannière principale' class='img-fluid w-100' style='height: 80vh; object-fit: cover;'/>" + // Image en pleine écran
                "<div class='position-absolute top-50 start-50 translate-middle text-white w-100'>" + // Absolute centrer sur le relatif
                    "<h1 class='display-4 fw-bold text-center'>" + heroBannerData.title + "</h1>" + // Titre principal
                    "<p class='lead text-center'>" + heroBannerData.subtitle + "</p>" + // Sous-titre
                    "<a href='/catalogue' class='btn btn-primary'>" + heroBannerData.cta + "</a>" + // Bouton principal pour rediriger vers le catalogue
                "</div>" +
            "</div>" +
        "</div>";
        */

        // ---------------------------------------------- BANNER  ---------------------------------------------- //
        let bannerHTML = "<div class='container-fluid p-0'>";
        bannerHTML += "<div class='hero-banner-content position-relative text-center'>";
        bannerHTML += "<img src='" + heroBannerData.image + "' alt='Bannière principale' class='img-fluid w-100' style='height: 80vh; object-fit: cover;'/>";
        bannerHTML += "<div class='position-absolute top-50 start-50 translate-middle text-white w-100'>";
        bannerHTML += "<h1 class='display-4 fw-bold text-center'>" + heroBannerData.title + "</h1>";
        bannerHTML += "<p class='lead text-center'>" + heroBannerData.subtitle + "</p>";
        bannerHTML += "<a href='catalogue.html' class='btn btn-outline-danger'>" + heroBannerData.cta + "</a>"
        bannerHTML += "</div>";
        bannerHTML += "</div>";
        bannerHTML += "</div>";

        bannerContainer.innerHTML = bannerHTML;

        // ---------------------------------------------- STATS  ---------------------------------------------- //

        // Récupere les données de la bannière depuis le JSON et le stock dans la const "statsData"
        const statsData = data.pagesContent.Accueil.stats;

        // Création d'une "div" pour les stats
        const statsContainer = document.createElement("div");
        statsContainer.classList.add("stats-container", "container-fluid", "mt-4");

        // On crée une variable "statsHTML pour gérer le contenu du HTML"
        let statsHTML = "<div class='d-flex justify-content-center align-items-center gap-4 text-center mt-4'>";
        for (let i = 0; i < statsData.length; i++) {
            statsHTML += "<div class='stat-item'>";
            statsHTML += "<h3 class='fw-bold'>" + statsData[i].value + "</h3>";
            statsHTML += "<p>" + statsData[i].label + "</p>"
            statsHTML += "</div>";
        }
        statsHTML += "</div>";

        statsContainer.innerHTML = statsHTML;

        // ---------------------------------------------- MARQUE  ---------------------------------------------- //

        const brands = data.brands
        const brandsContainer = document.createElement("div");
        brandsContainer.classList.add("brand-container", "container", "mt-5");

        let brandsHTML = "<div class='d-flex justify-content-center align-items-center flex-nowrap gap-4 style='white-space: nowrap;'>";
        for (let m = 0; m < brands.length; m++) {
            brandsHTML += "<div class='card bg-transparent text-center p-3' style='width: 200px; flex: 0 0 auto;'>";
            brandsHTML += "<a href='catalogue.html'><img src='" + brands[m].logo + "' alt='" + brands[m].name + "' class='img-fluid' style='max-height: 100px; object-fit: contain;'></a>";
            brandsHTML += "</div>";
        }
        brandsHTML += "</div>";
        
        brandsContainer.innerHTML = brandsHTML;

        // ---------------------------------------------- AVIS  ---------------------------------------------- //
        const testimonials = data.testimonials;
        const testimonialsContainer = document.createElement("div");
        testimonialsContainer.classList.add("testimonials-container", "container", "mt-5");

        let testimonialsHTML = "<h2 class='text-center mb-4'>Avis Clients</h2>";
        testimonialsHTML += "<div class='row'>";
        for (let p = 0; p < testimonials.length; p++) {
            testimonialsHTML += "<div class='col-md-4 d-flex justify-content-center'>";
            testimonialsHTML += "<div class='card text-center p-4 border border-light rounded-3' style='background: transparent; color: white; max-width: 350px;'>"; 
            testimonialsHTML += "<h5 class='card-title fw-bold'>" + testimonials[p].name + "</h5>"; 
            testimonialsHTML += "<p class='text-warning fs-4 mb-2'>" + "⭐".repeat(testimonials[p].note) + "</p>"; 
            testimonialsHTML += "<p class='card-text fst-italic'>" + testimonials[p].message + "</p>"; 
            testimonialsHTML += "</div>"; 
            testimonialsHTML += "</div>";
        }
        testimonialsHTML += "</div>";

        testimonialsContainer.innerHTML = testimonialsHTML;

        document.body.appendChild(bannerContainer);        
        document.body.appendChild(brandsContainer);
        document.body.appendChild(statsContainer);        
        document.body.appendChild(testimonialsContainer);
    })
    .catch(function(error) {
        console.error("Erreur lors du chargement des données :", error);
    });
