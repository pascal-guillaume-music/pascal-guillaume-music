class MediaOptimizer {
    constructor() {
        this.initLazyLoading();
        this.initAudioOptimization();
    }

    initLazyLoading() {
        // Utiliser IntersectionObserver pour les images
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    if (img.dataset.highres) {
                        img.src = img.dataset.highres;
                    }
                    observer.unobserve(img);
                }
            });
        });

        document.querySelectorAll('img[data-highres]').forEach(img => {
            imageObserver.observe(img);
        });
    }

    initAudioOptimization() {
        // Optimiser le chargement des fichiers audio
        document.querySelectorAll('.audio-player').forEach(audio => {
            const source = audio.querySelector('source');
            if (audio.dataset.src && source) {
                audio.addEventListener('play', () => {
                    if (!source.src) {
                        source.src = audio.dataset.src;
                        audio.load();
                        audio.play();
                    }
                }, { once: true });
            }
        });
    }
}

// Initialiser l'optimiseur de médias
window.addEventListener('DOMContentLoaded', () => {
    new MediaOptimizer();
});