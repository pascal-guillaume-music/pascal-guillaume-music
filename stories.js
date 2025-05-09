function openStoriesModal() {
    document.getElementById('storiesModal').style.display = 'block';
}

function closeStoriesModal() {
    document.getElementById('storiesModal').style.display = 'none';
}

function toggleStory(id) {
    const content = document.getElementById(id);
    const allContents = document.querySelectorAll('.story-content');
    
    allContents.forEach(item => {
        if (item.id !== id) {
            item.classList.remove('active');
        }
    });
    
    content.classList.toggle('active');
}

// Fermer la modale si on clique en dehors
window.onclick = function(event) {
    if (event.target == document.getElementById('storiesModal')) {
        closeStoriesModal();
    }
}
