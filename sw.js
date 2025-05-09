const CACHE_NAME = 'pascal-guillaume-v1';
const MEDIA_CACHE = 'media-cache-v1';

// Ressources à mettre en cache
const CACHE_URLS = [
    '/',
    '/index.html',
    '/pascal-guillaume.html',
    '/styles.css',
    '/portal-styles.css',
    '/scripts.js',
    '/js/media-optimizer.js',
    '/js/album-manager.js'
];

// Installation du Service Worker
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => cache.addAll(CACHE_URLS))
    );
});

// Stratégie de cache pour les médias
self.addEventListener('fetch', event => {
    const url = new URL(event.request.url);
    
    // Gestion spéciale pour les fichiers audio et images
    if (url.pathname.match(/\.(wav|mp3|jpg|png|avif|jpeg)$/)) {
        event.respondWith(
            caches.open(MEDIA_CACHE)
                .then(cache => 
                    cache.match(event.request)
                        .then(response => {
                            const fetchPromise = fetch(event.request)
                                .then(networkResponse => {
                                    cache.put(event.request, networkResponse.clone());
                                    return networkResponse;
                                });
                            return response || fetchPromise;
                        })
                )
        );
        return;
    }

    // Stratégie standard pour les autres ressources
    event.respondWith(
        caches.match(event.request)
            .then(response => response || fetch(event.request))
    );
});