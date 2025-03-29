const { Octokit } = require("@octokit/rest");
const fs = require("fs");

const octokit = new Octokit({ auth: process.env.GITHUB_TOKEN });

async function update() {
  // 1. Lire data.json localement
  const data = { total: 42 }; // Remplacez par votre logique
  
  // 2. Pousser les changements
  await octokit.repos.createOrUpdateFileContents({
    owner: "votre-username",
    repo: "le-pain-sacre",
    path: "data.json",
    message: "Mise à jour automatique du compteur",
    content: Buffer.from(JSON.stringify(data)).toString("base64"),
    sha: "..." // Récupérez-le via l'API d'abord
  });
}

update();
