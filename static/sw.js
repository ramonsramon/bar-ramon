const CACHE_VERSION = "v6";
const CACHE_NAME = "bar-ramon-" + CACHE_VERSION;
const BASE_FILES = [
    "/index.html",
    "/404.html",
    "/css/styles.css",
    "/img/favicon.ico",
    "/img/boston-sour.jpg",
    "/img/classic-daiquiri.jpg",
    "/img/eggnog.jpg",
    "/img/el-diablo.jpg",
    "/img/fence-hopper.jpg",
    "/img/fish-house-punch.jpg",
    "/img/hurricane.jpg",
    "/img/la-louisiane.jpg",
    "/img/lemon-drop.jpg",
    "/img/manhattan.jpg",
    "/img/old-fashioned.jpg",
    "/img/pisco-sour.jpg",
    "/img/rattle-skull.jpg",
    "/img/rusty-nail.jpg",
    "/img/clover-club.jpg",
    "/img/ford.jpg",
    "/img/littlest-rebel.jpg",
    "/img/pink-lady.jpg",
    "/img/rolls-royce.jpg",
    "/img/white-lady.jpg",
    "/img/white-negroni.jpg"
];

self.addEventListener("install", (e) => {
    e.waitUntil(
        (async () => {
            const CACHE = await caches.open(CACHE_NAME);
            await CACHE.addAll(BASE_FILES);
        })()
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        (async () => {
            const CACHE_REQUEST = await caches.match(e.request);
            if (CACHE_REQUEST) {
                return CACHE_REQUEST;
            }
            const RES = await fetch(e.request);
            const CACHE = await caches.open(CACHE_NAME);
            CACHE.put(e.request, RES.clone());
            return RES;
        })()
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keyList) => {
            return Promise.all(
                keyList.map((key) => {
                    if (key === CACHE_NAME) {
                        return;
                    }
                    return caches.delete(key);
                })
            );
        })
    );
});
