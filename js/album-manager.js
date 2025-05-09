class AlbumManager {
    constructor() {
        this.currentTrack = null;
        this.currentAudio = null;
        this.players = new Map();
        this.init();
    }

    init() {
        this.setupAudioPlayers();
        this.setupEventListeners();
    }

    setupAudioPlayers() {
        document.querySelectorAll('.album-player').forEach(player => {
            const audioElement = player.querySelector('audio');
            const playPauseBtn = player.querySelector('.play-pause');
            const progressBar = player.querySelector('.progress-bar');
            const progressContainer = player.querySelector('.progress-container');
            const timeDisplay = player.querySelector('.time-display');
            const playerTitle = player.querySelector('.player-title span');

            this.players.set(player, {
                audio: audioElement,
                playPauseBtn,
                progressBar,
                progressContainer,
                timeDisplay,
                playerTitle
            });

            // Configurer les contrôles pour ce lecteur
            if (playPauseBtn && audioElement) {
                this.setupPlayerControls(player);
            }
        });
    }

    setupPlayerControls(player) {
        const controls = this.players.get(player);
        if (!controls) return;

        const { audio, playPauseBtn, progressContainer, progressBar, timeDisplay } = controls;

        // Gestion du bouton play/pause
        playPauseBtn.addEventListener('click', () => {
            if (audio.paused) {
                audio.play();
            } else {
                audio.pause();
            }
        });

        // Mise à jour de l'interface pendant la lecture
        audio.addEventListener('timeupdate', () => {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
            
            // Mise à jour de l'affichage du temps
            const currentMinutes = Math.floor(audio.currentTime / 60);
            const currentSeconds = Math.floor(audio.currentTime % 60);
            const totalMinutes = Math.floor(audio.duration / 60);
            const totalSeconds = Math.floor(audio.duration % 60);
            
            timeDisplay.textContent = `${currentMinutes}:${currentSeconds.toString().padStart(2, '0')} / ${totalMinutes}:${totalSeconds.toString().padStart(2, '0')}`;
        });

        // Gestion du clic sur la barre de progression
        progressContainer.addEventListener('click', (e) => {
            const rect = progressContainer.getBoundingClientRect();
            const ratio = (e.clientX - rect.left) / rect.width;
            audio.currentTime = ratio * audio.duration;
        });

        // Mise à jour de l'icône play/pause
        audio.addEventListener('play', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });

        audio.addEventListener('pause', () => {
            playPauseBtn.innerHTML = '<i class="fas fa-play"></i>';
        });
    }

    setupEventListeners() {
        document.querySelectorAll('.track').forEach(track => {
            track.addEventListener('click', () => this.playTrack(track));
        });
    }

    playTrack(trackElement) {
        const albumPlayer = trackElement.closest('.album-player');
        const controls = this.players.get(albumPlayer);
        if (!controls) return;

        const { audio, playerTitle } = controls;
        const audioPath = trackElement.getAttribute('data-src');
        
        // Arrêter toutes les autres pistes
        this.players.forEach(({ audio: otherAudio }) => {
            if (otherAudio !== audio) {
                otherAudio.pause();
            }
        });

        // Mettre à jour la classe playing sur les pistes
        document.querySelectorAll('.track').forEach(t => {
            t.classList.remove('playing');
        });
        
        if (audio.src !== audioPath) {
            audio.src = audioPath;
            playerTitle.textContent = trackElement.textContent;
        }

        trackElement.classList.add('playing');
        audio.play().catch(error => {
            console.error('Erreur de lecture:', error);
            trackElement.classList.remove('playing');
        });
    }
}

// Initialiser le gestionnaire d'albums
document.addEventListener('DOMContentLoaded', () => {
    new AlbumManager();
});