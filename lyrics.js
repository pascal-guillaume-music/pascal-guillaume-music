function openLyricsModal() {
    document.getElementById('lyricsModal').style.display = 'block';
}

function closeLyricsModal() {
    document.getElementById('lyricsModal').style.display = 'none';
}

function toggleLyrics(id) {
    const content = document.getElementById(id);
    const allContents = document.querySelectorAll('.lyrics-content');
    
    allContents.forEach(item => {
        if (item.id !== id) {
            item.classList.remove('active');
        }
    });
    
    content.classList.toggle('active');
}

// Fermer la modale si on clique en dehors
window.onclick = function(event) {
    if (event.target == document.getElementById('lyricsModal')) {
        closeLyricsModal();
    }
}
