document.addEventListener('DOMContentLoaded', function() {
    const carousel = document.getElementById('carousel');
    const dotsContainer = document.getElementById('carousel-dots');
    const prevButton = document.querySelector('.carousel-button.prev');
    const nextButton = document.querySelector('.carousel-button.next');
    let currentSlide = 0;
    let mediaFiles = [];

    // Scanner les dossiers pour trouver les médias
    async function scanMediaDirectories() {
        const mediaFiles = [];

        // Extensions supportées
        const imageExts = ['.jpg', '.jpeg', '.png'];
        const videoExts = ['.mp4', '.webm'];
        
        // Fonction pour détecter le type de fichier
        function getFileType(filename) {
            const ext = filename.toLowerCase().substring(filename.lastIndexOf('.'));
            if (imageExts.includes(ext)) return 'image';
            if (videoExts.includes(ext)) return 'video';
            return null;
        }

        try {
            // Scan du dossier photos
            const photosResponse = await fetch('clermont/photos/');
            const photosText = await photosResponse.text();
            const photosDoc = new DOMParser().parseFromString(photosText, 'text/html');
            const photoLinks = Array.from(photosDoc.querySelectorAll('a'))
                .map(a => a.href)
                .filter(href => imageExts.some(ext => href.toLowerCase().endsWith(ext)));

            // Scan du dossier vidéos
            const videosResponse = await fetch('clermont/videos/');
            const videosText = await videosResponse.text();
            const videosDoc = new DOMParser().parseFromString(videosText, 'text/html');
            const videoLinks = Array.from(videosDoc.querySelectorAll('a'))
                .map(a => a.href)
                .filter(href => videoExts.some(ext => href.toLowerCase().endsWith(ext)));

            // Combiner les résultats
            const allFiles = [...photoLinks, ...videoLinks].map(url => {
                const path = new URL(url).pathname;
                return {
                    type: getFileType(path),
                    src: path.substring(path.indexOf('clermont/'))
                };
            });

            return allFiles;
        } catch (error) {
            console.error('Erreur lors du scan des dossiers:', error);
            return [];
        }
    }

    // Charger les médias
    async function loadMediaFiles() {
        try {
            mediaFiles = await scanMediaDirectories();
            if (mediaFiles.length === 0) {
                throw new Error('Aucun média trouvé');
            }
            createCarouselItems();
        } catch (error) {
            console.error('Erreur lors du chargement des médias:', error);
            carousel.innerHTML = '<div class="error-message">Impossible de charger la galerie</div>';
        }
    }

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
    loadMediaFiles();
});