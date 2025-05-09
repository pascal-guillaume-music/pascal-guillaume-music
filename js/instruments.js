document.addEventListener('DOMContentLoaded', function() {
    // Mapping des instruments et leurs sons
    const instrumentSounds = {
        cymbale: 'cymbale.mp3',
        lames: 'lames.mp3',
        bongo: 'bongo.mp3',
        rototom: 'rototom.mp3',
        clochettes: 'clochettes.mp3',
        percussions: 'percussions.mp3'
    };

    // Créer un pool d'objets Audio pour permettre plusieurs sons simultanés
    const audioPool = {};

    // Pré-charger tous les sons
    for (const [instrument, soundFile] of Object.entries(instrumentSounds)) {
        audioPool[instrument] = new Audio(`../audio/instruments/${soundFile}`);
    }

    // Ajouter les gestionnaires d'événements aux cartes
    document.querySelectorAll('.instrument-card').forEach(card => {
        card.addEventListener('click', function() {
            const instrument = this.dataset.sound;
            if (audioPool[instrument]) {
                // Arrêter et rembobiner le son s'il est en cours
                audioPool[instrument].currentTime = 0;
                audioPool[instrument].play();

                // Ajouter une classe pour l'animation
                this.classList.add('playing');
                setTimeout(() => {
                    this.classList.remove('playing');
                }, 300);
            }
        });
    });
});
