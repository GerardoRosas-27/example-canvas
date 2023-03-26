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