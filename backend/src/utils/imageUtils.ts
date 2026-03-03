import { UPLOAD_CONFIG } from '../config/upload';

/**
 * Corrige une URL d'image pour qu'elle soit accessible via le serveur Express
 */
export function processImageUrl(originalUrl: string | null | undefined): string {
  if (!originalUrl) {
    return UPLOAD_CONFIG.getImageUrl('example-image.svg'); // Image par défaut
  }

  // Si l'URL est déjà complète (http/https), la retourner telle quelle
  if (originalUrl.startsWith('http://') || originalUrl.startsWith('https://')) {
    return originalUrl;
  }

  // Si c'est un chemin relatif, construire l'URL complète
  if (originalUrl.startsWith('/uploads/') || originalUrl.startsWith('uploads/')) {
    const filename = originalUrl.replace(/^\/?(uploads\/)?/, '');
    return UPLOAD_CONFIG.getImageUrl(filename);
  }

  // Si c'est juste un nom de fichier
  return UPLOAD_CONFIG.getImageUrl(originalUrl);
}

/**
 * Field resolver pour les entités Post qui ont un champ coverImage
 */
export function createImageFieldResolver() {
  return function(root: { coverImage?: string }): string {
    return processImageUrl(root.coverImage);
  };
}