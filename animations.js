// Configuration GSAP
gsap.config({
    force3D: true
});

// Animation d'entrée
gsap.from('.hero-section h1', {
    duration: 1.5,
    y: 100,
    opacity: 0,
    ease: "elastic.out(1, 0.7)"
});

// Animation des lettres du titre
const letters = document.querySelectorAll('.letter');
letters.forEach((letter, index) => {
    const animations = ['wobble', 'bounce', 'shake'];
    const randomAnim = animations[Math.floor(Math.random() * animations.length)];
    const delay = index * 0.2;
    
    gsap.to(letter, {
        duration: 2,
        repeat: -1,
        ease: "power1.inOut",
        yoyo: true,
        delay: delay,
        ...getRandomAnimation()
    });
});

function getRandomAnimation() {
    const animations = [
        { y: 10, rotation: 5 },
        { x: 5, rotation: -5 },
        { scale: 1.1, rotation: 3 },
    ];
    return animations[Math.floor(Math.random() * animations.length)];
}

// Animation du sous-titre
gsap.to('.subtitle', {
    duration: 1.5,
    opacity: 0.8,
    y: 10,
    ease: "power1.inOut",
    yoyo: true,
    repeat: -1
});

// Supprimer l'animation des cartes
const animateOnScroll = () => {
    // Animation supprimée
};

// Animations pour la section accueil
gsap.from('.story-text', {
    scrollTrigger: {
        trigger: '.story-text',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    y: 50,
    opacity: 0,
    duration: 1,
    ease: 'back.out(1.7)'
});

gsap.from('.artist-bio, .show-description', {
    scrollTrigger: {
        trigger: '.story-container',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.3,
    ease: 'power2.out'
});

// Animation des cartes de description
gsap.from('.description-card', {
    scrollTrigger: {
        trigger: '.description-cards',
        start: 'top bottom-=100',
        toggleActions: 'play none none reverse'
    },
    y: 30,
    opacity: 0,
    duration: 0.8,
    stagger: 0.2,
    ease: 'power2.out'
});

// Interaction souris
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    gsap.to('.animated-character', {
        duration: 0.5,
        x: (mouseX - 0.5) * 30,
        y: (mouseY - 0.5) * 30,
        rotation: (mouseX - 0.5) * 10,
        ease: "power2.out"
    });
});

// Création de bulles aléatoires
function createBubbles() {
    for(let i = 0; i < 10; i++) {
        const bubble = document.createElement('div');
        bubble.className = 'bubble';
        bubble.style.left = Math.random() * 100 + 'vw';
        bubble.style.animationDelay = Math.random() * 5 + 's';
        document.body.appendChild(bubble);
    }
}

createBubbles();

// Supprimer l'animation au survol des cartes
gsap.utils.toArray('.card').forEach(card => {
    // Animation supprimée
});
