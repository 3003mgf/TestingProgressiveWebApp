//Asignar un nombre a la version de nuestro cache. Una de las caracteristicas de las PWA es que nos permiten guardar en cache todos los recursos estaticos, es decir los recursos que no van a cambiar en nuestra aplicacion, y los podemos guardar en el disco duro del usuario que este visualizando la aplicacion.

const CACHE_NAME = "v1_cache_PWA",
urlsToCache = [
    "./",
    "https://fonts.googleapis.com/css2?family=Raleway&display=swap",
    "https://fonts.gstatic.com",
    "./style.css",
    "./script.js",
    "./assets/Untitled.png",
    "./img"
]


//Durante la fase de instalacion, generalmente se almacena en cache los activos estaticos.
self.addEventListener("install", e => {
e.waitUntil(   //Que espere  hasta que se abra nuesstro cache.
    caches.open(CACHE_NAME)
    .then(cache => {
        return cache.addAll(urlsToCache)
        .then(()=> self.skipWaiting())
    })
    .catch(err => console.log(err))
)
})


//Una vez que instalamos el SW, lo activamos, y busca los recurso para hacer  que funcione sin conexion.
//Si nos quedamos sin conexion, la aplicacion va a empezar a buscar los recursos  en el  cache, para  intentar hacer que funcione sin conexion.
self.addEventListener("activate", e => {
   const cacheWhitelist = [CACHE_NAME]; //Copia para eliminar lo que  ya no se necesite en cache porque se actualizo.

   e.waitUntil(
    caches.keys()
    .then(cachesNames => {
        cachesNames.map(cacheName => {
           //Eliminamos lo que ya no se necesita en cache
           if(cacheWhitelist.indexOf(cacheName) === -1){
            return caches.delete(cacheName);
           }
        })
    })
    .then(()=> self.clients.claim()) //Indica que termino de actualizar el cache.
   )
})


//Cuando tengamos conexion, va a recuperar los archivos. Y si se modifico algun archivo que esta en cache, lo va a actualizar.
self.addEventListener("fetch", e => {
e.respondWith(
caches.match(e.request)
.then(res => {
    if(res){
        //recuperando del cache, porque no detecto cambios en el cache
        return res;
    }
    //Si hubo cambios, realiza la peticion a la URL.
    return fetch(e.request)
})
)
})

