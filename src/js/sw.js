const CACHE_NAME = "V3";

self.addEventListener("install", (event) => {
  console.log("Service Worker installing.");
});

self.addEventListener("activate", (event) => {
  // delete any unexpected caches
  event.waitUntil(
    caches
      .keys()
      .then((keys) => keys.filter((key) => key !== CACHE_NAME))
      .then((keys) =>
        Promise.all(
          keys.map((key) => {
            console.log(`Deleting cache ${key}`);
            return caches.delete(key);
          })
        )
      )
  );
});

self.addEventListener("fetch", (event) => {
  // Cache-First Strategy
  event.respondWith(
    caches
      .match(event.request) // check if the request has already been cached
      .then((cached) => cached || fetch(event.request)) // otherwise request network
      .then((response) => response)
    // .then(
    //   (response) =>
    //     cache(event.request, response) // put response in cache
    //       .then(() => response) // resolve promise with the network response
    // )
  );
});

function cache(request, response) {
  console.log("Caching the document:" + request.url);
  /* if (response.type === "error" || response.type === "opaque") {
    return Promise.resolve(); // do not put in cache network errors
  } else */ if (
    isStaticContent(request) &&
    caches.match(request) != undefined
  ) {
    return Promise.resolve(); // do not cache static content again
  }

  console.log("Caching the document2:" + request.url);

  return caches
    .open(CACHE_NAME)
    .then((cache) => cache.put(request, response.clone()));
}

function isStaticContent(request) {
  const content = [];
  const url = request.url;
  if (
    url.indexOf("/img/") > -1 ||
    url.indexOf("/assets/") > -1 ||
    url.indexOf(".ico") > -1 ||
    url.indexOf(".css") > -1 ||
    url.indexOf(".js") > -1
  ) {
    return true;
  } else return false;
}

function isApiCall(request) {
  const content = [];
  const url = request.url;
  if (url.indexOf("/api/") > -1) {
    return true;
  } else return false;
}
