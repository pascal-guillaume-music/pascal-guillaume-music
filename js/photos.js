document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    let currentIndex = 0;

    // Liste des photos disponibles (excluant celles manquantes)
    const photos = [
        '10011', '10012', '10013', '10014', '10015', '10016', '10017', '10018', 
        '10019', '10020', '10021', '10022', '10023', '10024', '10025', '10026', 
        '10027', '10028', '10029', '10030', '10031', '10032', '10033', '10034', 
        '10035', '10036', '10037', '10038', '10039', '10040', '10041', '10042', 
        '10043', '10044', '10045', '10046', '10047', '10048', '10049', '10050',
        '10051', '10052', '10053'
    ].map(id => `../images/residents/${id}.jpg`);

    // Créer les slides
    photos.forEach((src, index) => {
        const slide = document.createElement('div');
        slide.className = 'carousel-slide';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `Photo ${index + 1}`;
        
        slide.appendChild(img);
        carousel.appendChild(slide);

        // Créer les points
        const dot = document.createElement('div');
        dot.className = 'dot' + (index === 0 ? ' active' : '');
        dot.addEventListener('click', () => goToSlide(index));
        dotsContainer.appendChild(dot);
    });

    // Navigation
    document.querySelector('.prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        updateCarousel();
    });

    document.querySelector('.next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % photos.length;
        updateCarousel();
    });

    function goToSlide(index) {
        currentIndex = index;
        updateCarousel();
    }

    function updateCarousel() {
        carousel.style.transform = `translateX(-${currentIndex * 100}%)`;
        
        // Mettre à jour les points
        document.querySelectorAll('.dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentIndex);
        });
    }

    // Défilement automatique
    setInterval(() => {
        currentIndex = (currentIndex + 1) % photos.length;
        updateCarousel();
    }, 5000);
});
