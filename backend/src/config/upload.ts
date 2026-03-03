// Configuration pour la gestion des uploads
export const UPLOAD_CONFIG = {
  // Dossier de destination des uploads
  uploadDir: 'uploads',
  
  // URL de base pour servir les fichiers
  baseUrl: process.env.BASE_URL || 'http://localhost:4200',
  
  // Taille maximale des fichiers (10MB)
  maxFileSize: 10 * 1024 * 1024,
  
  // Types MIME autorisés pour les images
  allowedMimeTypes: [
    'image/jpeg',
    'image/png',
    'image/gif',
    'image/webp',
    'image/svg+xml'
  ],
  
  // Générer l'URL complète d'une image
  getImageUrl: (filename: string): string => {
    const baseUrl = process.env.BASE_URL || 'http://localhost:4200';
    return `${baseUrl}/uploads/${filename}`;
  }
};