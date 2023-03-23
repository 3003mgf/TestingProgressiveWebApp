

if('serviceWorker' in navigator){  //Esto es para ver si soporta el service worker nuestro navegador.
    navigator.serviceWorker.register('./sw.js')
    .then(reg => console.log("Registro de service worker exitoso", reg))
    .catch(err => console.warn("Error al tratar de registrar el service worker", err))
}




document.addEventListener("pointerover", (e)=>{
    if(e.target.matches("i")){
        e.target.classList.add("fa-bounce");
    }else{
        let as = document.querySelectorAll("i");
        as.forEach(el => {
            if(el.classList.contains("fa-bounce")){
                el.classList.remove("fa-bounce");
            }
        })
    }
})



