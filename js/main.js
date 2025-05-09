// Script principal
document.addEventListener('DOMContentLoaded', function() {
    const burgerMenu = document.querySelector('.burger-menu');
    const navMenu = document.querySelector('.nav-menu');
    
    if (burgerMenu && navMenu) {
        const menuItems = navMenu.querySelectorAll('li');
        
        // Ajouter l'index pour le délai d'animation
        menuItems.forEach((item, index) => {
            item.style.setProperty('--i', index);
        });

        burgerMenu.addEventListener('click', () => {
            burgerMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Fermer le menu si on clique sur un lien
        menuItems.forEach(item => {
            item.querySelector('a').addEventListener('click', () => {
                burgerMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // Gestion de l'audio (générique pour toutes les pages)
    const pageAudio = document.getElementById('pageAudio') || document.getElementById('homeAudio');
    const playButton = document.getElementById('playButton');

    if (pageAudio && playButton) {
        playButton.addEventListener('click', () => {
            if (pageAudio.paused) {
                pageAudio.play();
            }
        });

        pageAudio.addEventListener('ended', () => {
            playButton.style.opacity = '0.5';
            playButton.disabled = true;
        });
    }

    // Animation des éléments au scroll
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-element');
        elements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const elementBottom = element.getBoundingClientRect().bottom;
            
            if (elementTop < window.innerHeight && elementBottom > 0) {
                element.classList.add('visible');
            }
        });
    };

    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Initial check
    
    // Code à exécuter une fois le DOM chargé
    console.log('Site Vibration Résonance chargé');

    // Diaporama
    const initSlideshow = () => {
        const slideshow = document.getElementById('residentsSlideshow');
        if (!slideshow) return;

        // Liste des photos disponibles (excluant celles manquantes)
        const photos = [
            '10011', '10012', '10013', '10014', '10015', '10016', '10017', '10018', 
            '10019', '10020', '10021', '10022', '10023', '10024', '10025', '10026', 
            '10027', '10028', '10029', '10030', '10031', '10032', '10033', '10034', 
            '10035', '10036', '10037', '10038', '10039', '10040', '10041', '10042', 
            '10043', '10044', '10045', '10046', '10047', '10048', '10049', '10050',
            '10051', '10052', '10053'
        ].map(id => `images/residents/${id}.jpg`);

        // Créer et précharger les images
        photos.forEach((src, index) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Image ${index + 1}`;
            img.className = index === 0 ? 'active' : '';
            slideshow.appendChild(img);
        });

        if (photos.length > 1) {
            let currentSlide = 0;
            setInterval(() => {
                const slides = slideshow.getElementsByTagName('img');
                slides[currentSlide].classList.remove('active');
                currentSlide = (currentSlide + 1) % slides.length;
                slides[currentSlide].classList.add('active');
            }, 4000);
        }
    };
    
    initSlideshow();

    // Initialiser le chargement différé des médias audio
    initLazyAudioLoading();

    // Add auto-play next track functionality
    const albums = document.querySelectorAll('.album-player');
    albums.forEach(album => {
        const player = album.querySelector('audio');
        const tracks = album.querySelectorAll('.track');
        let currentTrackIndex = 0;

        player.addEventListener('ended', () => {
            currentTrackIndex = (currentTrackIndex + 1) % tracks.length;
            const nextTrack = tracks[currentTrackIndex];
            if (nextTrack) {
                player.src = nextTrack.dataset.src;
                player.play();
                updateTrackUI(album, nextTrack);
            }
        });
    });

    function updateTrackUI(albumPlayer, activeTrack) {
        const tracks = albumPlayer.querySelectorAll('.track');
        tracks.forEach(track => track.classList.remove('playing'));
        activeTrack.classList.add('playing');
        const titleSpan = albumPlayer.querySelector('.player-title span');
        if (titleSpan) {
            titleSpan.textContent = activeTrack.textContent;
        }
    }
});

// Fonction pour le chargement différé des médias audio
function initLazyAudioLoading() {
    const audioPlayers = document.querySelectorAll('audio');
    const options = {
        root: null,
        rootMargin: '50px',
        threshold: 0.1
    };

    const audioObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const audioElement = entry.target;
                const tracks = audioElement.closest('.album-player').querySelectorAll('.track');
                
                // Charger uniquement la première piste
                if (tracks.length > 0) {
                    const firstTrack = tracks[0];
                    audioElement.src = firstTrack.dataset.src;
                }
                
                observer.unobserve(audioElement);
            }
        });
    }, options);

    audioPlayers.forEach(player => {
        audioObserver.observe(player);
    });
}

// Gestion du menu mobile
document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const nav = document.querySelector('nav');
    const overlay = document.querySelector('.overlay');
    const menuLinks = document.querySelectorAll('nav a');

    function closeMenu() {
        nav.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Toggle menu
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
        document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
    });

    // Fermer le menu en cliquant sur l'overlay
    overlay.addEventListener('click', closeMenu);

    // Fermer le menu quand on clique sur un lien
    menuLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Fermer le menu en appuyant sur Échap
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            closeMenu();
        }
    });
});
