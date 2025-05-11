const fs = require('fs');
const path = require('path');

function scanDirectory(dir) {
    const result = [];
    const files = fs.readdirSync(dir);
    
    for (const file of files) {
        if (file === '.' || file === '..') continue;
        
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);
        
        if (stats.isDirectory()) {
            result.push(...scanDirectory(filePath));
        } else {
            const ext = path.extname(file).toLowerCase();
            const type = ['.jpg', '.jpeg', '.png'].includes(ext) ? 'image' 
                      : ['.mp4', '.webm'].includes(ext) ? 'video' 
                      : null;
            
            if (type) {
                // Convertir le chemin en format URL (avec des forward slashes)
                const relativePath = path.relative(
                    path.join(__dirname, '..', 'clermont'),
                    filePath
                ).replace(/\\/g, '/');
                
                result.push({
                    type,
                    src: relativePath
                });
            }
        }
    }
    
    return result;
}

// Chemins des dossiers à scanner
const photosDir = path.join(__dirname, '..', 'clermont', 'photos');
const videosDir = path.join(__dirname, '..', 'clermont', 'videos');

// Récupérer tous les fichiers
const mediaFiles = {
    mediaFiles: [
        ...scanDirectory(photosDir),
        ...scanDirectory(videosDir)
    ]
};

// Écrire le fichier JSON
const outputPath = path.join(__dirname, '..', 'clermont', 'media-files.json');
fs.writeFileSync(outputPath, JSON.stringify(mediaFiles, null, 2));

console.log('Fichier media-files.json mis à jour avec succès !');
