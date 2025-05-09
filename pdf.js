function openPdfModal() {
    const modal = document.getElementById('pdfModal');
    modal.style.display = 'block';
}

function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    modal.style.display = 'none';
}

// Fermer la modale si on clique en dehors
window.onclick = function(event) {
    const modal = document.getElementById('pdfModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}
