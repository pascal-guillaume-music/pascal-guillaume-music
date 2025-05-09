const audioPlayer = document.getElementById('audioPlayer');
const playlist = document.getElementById('playlist');
let currentlyPlaying = null;

// Liste directe des chansons pour éviter les problèmes avec GitHub Pages
const songs = [
    "Hercule le poisson rouge",
    "Histoire d'une ile",
    "Le coucou sur la branche",
    "Le loup triste et pas beau",
    "Le vitrier",
    "Les bébés oiseaux",
    "Les ciel c'est tout bleu",
    "Les crapauds",
    "Les pieds désacordés",
    "Marie ange l'orange et Léon le citron",
    "Miaou ouaf Pic"
];

// Créer la liste de lecture
function createPlaylist() {
    songs.forEach((song, index) => {
        const songElement = document.createElement('div');
        songElement.className = 'playlist-item';
        songElement.textContent = song;
        songElement.onclick = () => playSong(`chut-on-ecoute/${song}.mp3`, songElement);
        playlist.appendChild(songElement);
    });
}

function playSong(src, element) {
    if (currentlyPlaying === element && !audioPlayer.paused) {
        audioPlayer.pause();
        element.classList.remove('active');
        currentlyPlaying = null;
        return;
    }

    audioPlayer.src = src;
    audioPlayer.play()
        .then(() => {
            updateActiveState(element);
            currentlyPlaying = element;
        })
        .catch(error => {
            console.error('Erreur de lecture:', error);
        });
}

function updateActiveState(element) {
    // Retirer la classe active de tous les éléments
    document.querySelectorAll('.playlist-item').forEach(item => {
        item.classList.remove('active');
    });
    // Ajouter la classe active à l'élément en cours
    element.classList.add('active');
}

// Gérer la fin de la lecture
audioPlayer.addEventListener('ended', () => {
    if (currentlyPlaying) {
        currentlyPlaying.classList.remove('active');
        currentlyPlaying = null;
    }
});

// Initialiser la playlist au chargement
createPlaylist();
