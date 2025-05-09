document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('contactForm');

    // Validation en temps réel
    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => {
        input.addEventListener('invalid', function(e) {
            e.preventDefault();
            this.classList.add('error');
        });

        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                this.classList.remove('error');
            }
        });
    });

    // Gestion de la soumission du formulaire
    form.addEventListener('submit', function(e) {
        const submitBtn = form.querySelector('.submit-btn');
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';

        // La soumission est gérée par Formspree
        // Pas besoin d'empêcher le comportement par défaut
    });
});
