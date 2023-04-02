// Función de entrada: guardarObjetoEnSesionStorage
function guardarEnSesionStorage(nombre, valor) {
    if (typeof valor === 'object') {
        const valorSerializado = JSON.stringify(valor);
        sessionStorage.setItem(nombre, valorSerializado);
    } else {
        sessionStorage.setItem(nombre, valor);
    }
}

// Función de salida: leerObjetoDeSesionStorage
function leerDeSesionStorage(nombre) {
    const valor = sessionStorage.getItem(nombre);
    try {
        const valorParseado = JSON.parse(valor);
        if (valorParseado && typeof valorParseado === 'object') {
            return valorParseado;
        }
    } catch (e) {
        return valor;
    }
    return valor;
}

async function cargarJS(urls) {
    if(urls && urls.length > 0){
        urls.map(async url => {
            try {
                await cargaDinamicaJS(url);
            } catch (error) {
                console.log("error: ", error)
                return url
            }
        })
    }else{
        return null
    }
}

async function cargaDinamicaJS(url) {
    try {
        const response = await fetch(url);
        const js = await response.text();
        eval(js);
        return true
    } catch (error) {
        return false
    }
}