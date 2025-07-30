# backend/Dockerfile

# Étape 1 : Choisir une image Node.js stable et légère
FROM node:20

# Étape 2 : Créer un dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 : Installer les dépendances du projet
COPY *.json . 

# Étape 4 : Copier tout le code source du projet
RUN npm install

# Étape 5 : Copier les fichiers de configuration
COPY src src

# Étape 6 : Démarrer l’application
CMD ["npm", "start"]
