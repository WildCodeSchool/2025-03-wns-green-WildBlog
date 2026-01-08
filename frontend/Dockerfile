# Étape 1 : Choisir une image Node.js stable et légère
FROM node:20

# Étape 2 : Créer un dossier de travail dans le conteneur
WORKDIR /app

# Étape 3 : Copier les fichiers de configuration (UNIQUEMENT ce qui est nécessaire)
COPY package*.json ./

# Étape 4 : Installer les dépendances du projet
RUN npm install

# Étape 5 : Copier les fichiers nécessaires au runtime (pas le code source)
COPY index.html .
COPY vite.config.ts .
# COPY codegen.ts . // FIXME: ajout de codegen par la suite ?
# COPY index.ts .

# ⚠️ IMPORTANT
# On NE copie PAS src/ ni public/
# Ils seront montés via les volumes docker-compose pour permettre le hot reload

# Étape 6 : Exposer le port sur lequel ton serveur tourne
EXPOSE 5173

# Étape 7 : Lancer le serveur Vite sur le réseau (important : --host)
CMD ["npm", "run", "dev", "--", "--host"]


