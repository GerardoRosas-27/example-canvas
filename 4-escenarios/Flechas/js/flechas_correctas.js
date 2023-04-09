
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    let idElemento;
    if (navigator.userAgent.indexOf('Firefox') !== -1) {
        idElemento = ev.target.id;
    } else {
        idElemento = ev.toElement.id;
    }
    console.log("idElemento", idElemento)
    let posiciones = document.getElementById(idElemento).children
    if (posiciones.length > 0) {
        swal({
            title: "Error.",
            text: "Solo se permite una respuesta en la " + idElemento,
            icon: "error"
        });
    } else {
        let itemId = idElemento.substr(0, idElemento.length - 1);
        console.log("itemId: ", itemId)
        if ('posicion' === itemId) {
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
function validarRespuesta() {
    let numPosicion = 4;

    let posicionesRespuestas = [
        'respuesta1',
        'respuesta2',
        'respuesta3',
        'respuesta4',
    ];

    let correctas = [];


    for (let index = 0; index < posicionesRespuestas.length; index++) {
        let num = index + 1;
        let itemPosicionId = 'posicion' + num;
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
