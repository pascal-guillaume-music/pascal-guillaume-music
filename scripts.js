function openPdfModal() {
    const modal = document.getElementById('pdfModal');
    modal.style.display = 'block';
}

function closePdfModal() {
    const modal = document.getElementById('pdfModal');
    modal.style.display = 'none';
}

// Fermer la modale si on clique en dehors
window.addEventListener('click', (event) => {
    const modal = document.getElementById('pdfModal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
});

function handleSubmit(event) {
    event.preventDefault();
    
    // Récupération des données du formulaire
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    
    // Ici, vous pouvez ajouter le code pour envoyer les données à votre serveur
    console.log('Données du formulaire:', data);
    
    // Réinitialisation du formulaire
    event.target.reset();
    
    // Message de confirmation
    alert('Votre demande a été envoyée avec succès !');
}
