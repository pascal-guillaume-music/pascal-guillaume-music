// Configuration pour le chargement optimisé des images
const imageLoader = {
    // Vérifier le support des formats modernes
    checkWebpSupport() {
        const canvas = document.createElement('canvas');
        if (canvas.getContext && canvas.getContext('2d')) {
            return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;
    },

    // Charger l'image dans le format optimal
    loadOptimalImage(imgElement) {
        const src = imgElement.getAttribute('src');
        const hasWebp = this.checkWebpSupport();

        // Si l'image est déjà en WebP, pas besoin de conversion
        if (src.endsWith('.webp')) return;

        // Créer le chemin WebP
        const webpSrc = src.replace(/\.(jpg|jpeg|png)$/i, '.webp');

        // Si le navigateur supporte WebP et que l'image WebP existe, l'utiliser
        if (hasWebp) {
            fetch(webpSrc)
                .then(response => {
                    if (response.ok) {
                        imgElement.src = webpSrc;
                    }
                })
                .catch(() => {
                    // Garder l'image originale en cas d'erreur
                    console.log('WebP version not found, keeping original format');
                });
        }
    },

    // Initialiser le chargement optimisé pour toutes les images
    init() {
        const images = document.querySelectorAll('img[loading="lazy"]');
        images.forEach(img => this.loadOptimalImage(img));

        // Observer les nouvelles images ajoutées dynamiquement
        const observer = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === 1 && node.tagName === 'IMG' && node.getAttribute('loading') === 'lazy') {
                        this.loadOptimalImage(node);
                    }
                });
            });
        });

        observer.observe(document.body, {
            childList: true,
            subtree: true
        });
    }
};

// Initialiser le chargement optimisé des images
document.addEventListener('DOMContentLoaded', () => {
    imageLoader.init();
});