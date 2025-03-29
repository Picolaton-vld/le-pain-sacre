document.addEventListener("DOMContentLoaded", async function () {
    const boutonAdhesion = document.getElementById("devenirMembre");
    const messageAdhesion = document.getElementById("messageAdhesion");
    const nombreAdherents = document.getElementById("nombreAdherents");

    // URL de votre endpoint sécurisé (à remplacer)
    const API_ENDPOINT = "https://votre-api.com/pain-sacre";

    async function fetchAdherents() {
        try {
            const response = await fetch(`${API_ENDPOINT}/adherents`);
            const data = await response.json();
            nombreAdherents.textContent = data.total;
        } catch (error) {
            console.error("Erreur:", error);
            // Fallback local
            nombreAdherents.textContent = localStorage.getItem("localAdherents") || "0";
        }
    }

    async function registerAdherent() {
        try {
            const response = await fetch(`${API_ENDPOINT}/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" }
            });
            
            if (response.ok) {
                const data = await response.json();
                localStorage.setItem("membrePainSacre", "true");
                localStorage.setItem("localAdherents", data.total);
                nombreAdherents.textContent = data.total;
                return true;
            }
            return false;
        } catch (error) {
            console.error("Erreur:", error);
            return false;
        }
    }

    // Initialisation
    await fetchAdherents();

    // Vérifier si déjà membre
    if (localStorage.getItem("membrePainSacre") === "true") {
        boutonAdhesion.style.display = "none";
        messageAdhesion.style.display = "block";
        messageAdhesion.textContent = "🙏 Vous êtes déjà membre !";
        return;
    }

    // Gestion du clic
    boutonAdhesion.addEventListener("click", async function() {
        const success = await registerAdherent();
        
        if (success) {
            boutonAdhesion.style.display = "none";
            messageAdhesion.style.display = "block";
            messageAdhesion.textContent = "🎉 Bienvenue !";
        } else {
            messageAdhesion.style.display = "block";
            messageAdhesion.textContent = "⚠️ Erreur, réessayez plus tard";
        }
    });
});
