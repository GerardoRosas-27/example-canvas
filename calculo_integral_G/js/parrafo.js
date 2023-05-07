


function allowDropParrafo(ev) {
    ev.preventDefault();
}

function dragParrafo(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function dropParrafo(ev) {
    ev.preventDefault();
    let idElemento;
    if (navigator.userAgent.indexOf('Firefox') !== -1) {
        idElemento = ev.target.id;
    } else {
        idElemento = ev.toElement.id;
    }
    console.log("idElemento", idElemento)
    let posicion = document.getElementById(idElemento);
    console.log("posicion: ", posicion)
    posicion.style.padding = '0px';
    posicion.innerHTML = '';

    let posiciones = document.getElementById(idElemento).children;

    if (posiciones.length > 0) {
        swal({
            title: "Error.",
            text: "Solo se permite una respuesta en la " + idElemento,
            icon: "error"
        });
    } else {
        let itemId = idElemento.substr(0, idElemento.length - 1);
        console.log("itemId: ", itemId)
        if ('posicionP' === itemId) {
            var data = ev.dataTransfer.getData("text");
            ev.target.appendChild(document.getElementById(data));
        } else {
            swal({
                title: "Error.",
                text: "Solo puedes colocar la respuesta dentro de una casilla ",
                icon: "error"
            });
        }
    }
}

function validarRespuestaParrafo() {
    let numPosicion = 3;

    let posicionesRespuestas = [
        'respuesta1p',
        'respuesta2p',
        'respuesta3p'
    ];

    let correctas = [];


    for (let index = 0; index < posicionesRespuestas.length; index++) {
        let num = index + 1;
        let itemPosicionId = 'posicionP' + num;
        const element = document.getElementById(itemPosicionId).children;

        if (element[0]) {

            if (posicionesRespuestas[index] === element[0].getAttribute('id')) {
                correctas.push(posicionesRespuestas[index])
            }

        }
    }
    if (correctas.length === numPosicion) {
        swal({
            title: "Exito",
            text: "Las respuestas son correctas.",
            icon: "success"
        });
    } else {
        swal({
            title: "Error.",
            text: "Las respuestas son incorrectas.",
            icon: "error"
        });
    }

}