# Étape 1 : Choisir une image Node.js stable et légère
FROM node:20

# Étape 2 : Créer un dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers de configuration
COPY src src
COPY public public

# Étape 4 : Installer les dépendances du projet
COPY *.json . 
# COPY codegen.ts . // FIXME: ajout de codegen par la suite ?
# COPY index.ts . 
COPY index.html . 
COPY vite.config.ts .

# Étape 5 : Copier tout le code source du projet
RUN npm install

# Étape 6 : Exposer le port sur lequel ton serveur tourne
EXPOSE 5173

# Étape 7 : Lancer le serveur Vite sur le réseau (important : --host)
CMD ["npm", "run", "dev", "--", "--host"]

