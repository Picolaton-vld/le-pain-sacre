document.addEventListener("DOMContentLoaded", function() {
    const bouton = document.getElementById("devenirMembre");
    const message = document.getElementById("messageAdhesion");
    const compteur = document.getElementById("nombreAdherents");

    // Charger le compteur depuis data.json (statique)
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            compteur.textContent = data.total || 0;
        })
        .catch(() => {
            compteur.textContent = "Chargement...";
        });

    // Vérifier si déjà membre (localStorage)
    if (localStorage.getItem('estMembre')) {
        bouton.style.display = 'none';
        message.style.display = 'block';
        message.textContent = "🙏 Vous êtes déjà membre !";
    }

    // Gestion du clic
    bouton.addEventListener('click', function() {
        // Créer une issue GitHub pour enregistrer l'adhésion
        fetch("https://api.github.com/repos/votreuser/le-pain-sacre/issues", {
            method: "POST",
            headers: {
                "Authorization": "token ghp_votre_token_personnel", // À utiliser uniquement en test !
                "Accept": "application/vnd.github.v3+json"
            },
            body: JSON.stringify({
                title: "Nouvelle adhésion",
                body: `Date: ${new Date().toISOString()}`,
                labels: ["adhesion"]
            })
        })
        .then(response => {
            if (response.ok) {
                localStorage.setItem('estMembre', 'true');
                bouton.style.display = 'none';
                message.style.display = 'block';
                message.textContent = "🎉 Demande envoyée !";
            } else {
                message.textContent = "⚠️ Erreur, réessayez plus tard";
            }
        })
        .catch(error => {
            console.error("Erreur:", error);
            message.textContent = "📡 Pas de connexion, réessayez plus tard";
        });
    });
});
