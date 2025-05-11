const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    photosDir: path.join(__dirname, '..', 'clermont', 'photos'),
    videosDir: path.join(__dirname, '..', 'clermont', 'videos'),
    outputFile: path.join(__dirname, '..', 'clermont', 'media-files.json'),
    imageExts: ['.jpg', '.jpeg', '.png'],
    videoExts: ['.mp4', '.webm']
};

// Fonction pour scanner un dossier
function scanDirectory(dir, exts) {
    const files = [];
    try {
        const entries = fs.readdirSync(dir);
        for (const entry of entries) {
            const fullPath = path.join(dir, entry);
            const stat = fs.statSync(fullPath);
            
            if (stat.isFile()) {
                const ext = path.extname(entry).toLowerCase();
                if (exts.includes(ext)) {
                    // Convertir le chemin en format URL (avec des forward slashes)
                    const relativePath = path.relative(path.join(__dirname, '..'), fullPath)
                        .split(path.sep).join('/');
                    
                    files.push({
                        type: config.imageExts.includes(ext) ? 'image' : 'video',
                        src: relativePath
                    });
                }
            }
        }
    } catch (error) {
        console.error(`Erreur lors du scan du dossier ${dir}:`, error);
    }
    return files;
}

// Scanner les dossiers et générer le JSON
function updateMediaFiles() {
    const photos = scanDirectory(config.photosDir, config.imageExts);
    const videos = scanDirectory(config.videosDir, config.videoExts);
    
    const mediaFiles = {
        mediaFiles: [...photos, ...videos]
    };
    
    try {
        fs.writeFileSync(config.outputFile, JSON.stringify(mediaFiles, null, 2));
        console.log('Fichier media-files.json mis à jour avec succès !');
    } catch (error) {
        console.error('Erreur lors de l\'écriture du fichier JSON:', error);
    }
}

// Exécuter la mise à jour
updateMediaFiles();
