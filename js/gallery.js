document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentSlide = 0;

    // Liste des médias de Clermont
    const mediaFiles = [
        // Photos
        { type: 'image', src: 'clermont/photos/20250412_195036.jpg' },
        { type: 'image', src: 'clermont/photos/20250412_210141.jpg' },
        { type: 'image', src: 'clermont/photos/20250412_210143.jpg' },
        { type: 'image', src: 'clermont/photos/image00001.jpeg' },
        { type: 'image', src: 'clermont/photos/image00002.jpeg' },
        { type: 'image', src: 'clermont/photos/image00003.jpeg' },
        { type: 'image', src: 'clermont/photos/image00004.jpeg' },
        { type: 'image', src: 'clermont/photos/image00041.jpeg' },
        { type: 'image', src: 'clermont/photos/image00042.jpeg' },
        { type: 'image', src: 'clermont/photos/image00043.jpeg' },
        { type: 'image', src: 'clermont/photos/image00044.jpeg' },
        { type: 'image', src: 'clermont/photos/image00045.jpeg' },
        // Vidéos
        { type: 'video', src: 'clermont/videos/20250412_210641~2.mp4' },
        { type: 'video', src: 'clermont/videos/20250412_211454~2.mp4' },
        { type: 'video', src: 'clermont/videos/ANGELA JF~1.mp4' },
        { type: 'video', src: 'clermont/videos/ANGELA VAL~1.mp4' },
        { type: 'video', src: 'clermont/videos/AVEC DES FLEURS  VAL~1.mp4' },
        { type: 'video', src: 'clermont/videos/JE SURVIVRAI JF~1.mp4' }
    ];

    // Créer les éléments du carrousel
    function createCarouselItems() {
        carousel.innerHTML = '';
        dotsContainer.innerHTML = '';

        mediaFiles.forEach((file, index) => {
            const item = document.createElement('div');
            item.className = 'carousel-item';

            if (file.type === 'image') {
                const img = document.createElement('img');
                img.src = file.src;
                img.alt = `Photo ${index + 1} de Clermont`;
                img.loading = 'lazy';
                item.appendChild(img);
            } else if (file.type === 'video') {
                const video = document.createElement('video');
                video.src = file.src;
                video.controls = true;
                video.controlsList = "nodownload";
                video.preload = "metadata";
                item.appendChild(video);
            }

            carousel.appendChild(item);

            // Créer les points de navigation
            const dot = document.createElement('div');
            dot.className = 'carousel-dot' + (index === 0 ? ' active' : '');
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });

        updateCarousel();
    }

    // Mettre à jour l'affichage du carrousel
    function updateCarousel() {
        const items = carousel.querySelectorAll('.carousel-item');
        const dots = dotsContainer.querySelectorAll('.carousel-dot');
        
        // Mettre à jour la position des slides
        carousel.style.transform = `translateX(-${currentSlide * 100}%)`;
        
        // Mettre à jour les points de navigation
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });

        // Gérer la lecture/pause des vidéos
        items.forEach((item, index) => {
            const video = item.querySelector('video');
            if (video) {
                if (index === currentSlide) {
                    video.play().catch(() => {}); // Ignorer les erreurs de lecture automatique
                } else {
                    video.pause();
                    video.currentTime = 0;
                }
            }
        });
    }

    // Navigation vers une slide spécifique
    function goToSlide(index) {
        const items = carousel.querySelectorAll('.carousel-item');
        currentSlide = (index + items.length) % items.length;
        updateCarousel();
    }

    // Événements des boutons de navigation
    prevButton.addEventListener('click', () => goToSlide(currentSlide - 1));
    nextButton.addEventListener('click', () => goToSlide(currentSlide + 1));

    // Navigation au clavier
    document.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowLeft') {
            goToSlide(currentSlide - 1);
        } else if (e.key === 'ArrowRight') {
            goToSlide(currentSlide + 1);
        }
    });

    // Navigation tactile
    let touchStartX = 0;
    let touchEndX = 0;
    
    carousel.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });

    carousel.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].clientX;
        handleSwipe();
    });

    function handleSwipe() {
        const minSwipeDistance = 50;
        const swipeDistance = touchEndX - touchStartX;

        if (Math.abs(swipeDistance) > minSwipeDistance) {
            if (swipeDistance > 0) {
                goToSlide(currentSlide - 1);
            } else {
                goToSlide(currentSlide + 1);
            }
        }
    }

    // Initialiser le carrousel
    createCarouselItems();
});