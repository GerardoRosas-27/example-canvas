let btnSiguenteConjunto = document.getElementById('btn-siguiente-conjunto');
let btnValidarConjunto = document.getElementById('btn-validar-conjunto');

document.addEventListener('DOMContentLoaded', function () {
    // Función a ejecutar cuando se haya cargado el HTML
    crearFormularioMultipleConjunto(1);

    btnValidarConjunto.style.display = 'none';


});

let opcionesCorrectasConjunto = ["opcion1", "opcion2", "opcion3", "opcion4"];
let opcionesPistasConjunto = ["Pista 1", "Pista 2", "Pista 3", "Pista 4"];
let formularioConjunto = [
    ["pre 1", "ejemplo2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"]
]

function preguntaSiguenteConjunto(element) {

    let preguntaDataConjunto = 1 + parseInt(element.getAttribute('data-pregunta'));

    if (preguntaDataConjunto === 5) {
        btnSiguenteConjunto.style.display = 'none';
        btnValidarConjunto.style.display = 'block';
    }


    console.log("pregunta: ", preguntaDataConjunto);
    obtenerValoresConjunto();
    crearFormularioMultipleConjunto(preguntaDataConjunto);
    element.setAttribute('data-pregunta', preguntaDataConjunto);

}


function crearFormularioMultipleConjunto(numPregunta) {
    console.log("numPregunta: ", parseInt(numPregunta));
    let formConjunto = document.getElementById("formMultipleConjunto");

    let htmlConjunto = "";
    index0Conjunto = 1;

    formularioConjunto.forEach(element => {
        console.log("sin entrar: ", parseInt(numPregunta), index0Conjunto);
        if (parseInt(numPregunta) === index0Conjunto) {
            console.log("parseInt(numPregunta): ", parseInt(numPregunta), index0Conjunto);
            console.log("index0: ", index0Conjunto)
            htmlConjunto = htmlConjunto + '<h5>Pregunta ' + index0Conjunto + '</h5>';
            labelConjunto = "";
            indexConjunto = 1;


            element.forEach(element1 => {

                labelConjunto = labelConjunto + '<label> <input type="radio" name="pregunta ' + index0Conjunto + '" value="opcion' + indexConjunto + '" /> ' + element1 + '</label>'
                indexConjunto++;
            });
            htmlConjunto = htmlConjunto + labelConjunto;
        }
        index0Conjunto++;
    });
    console.log("Html: ", htmlConjunto);
    formConjunto.innerHTML = htmlConjunto;

}

let valoresSeleccionadosConjunto = [];
function obtenerValoresConjunto() {
    var formularioConjunto = document.getElementById("formMultipleConjunto");
    var elementosConjunto = formularioConjunto.querySelectorAll("input[type='radio']");

    elementosConjunto.forEach(function (elemento) {
        if (elemento.checked) {
            valoresSeleccionadosConjunto.push(elemento.value);
        }
    });


}

function validarFormConjunto() {
    console.log("valoresSeleccionados: ", valoresSeleccionadosConjunto)

    let contadorConjunto = 0;
    let valoresCorrectosConjunto = [];
    let valoresIncorrectosConjunto = [];
    valoresSeleccionadosConjunto.forEach(elemento => {
        if (opcionesCorrectasConjunto[contadorConjunto] === elemento) {
            valoresCorrectosConjunto.push(elemento);
        } else {
            valoresIncorrectosConjunto.push({ "valor": elemento, "pista": opcionesPistasConjunto[contadorConjunto] })
        }
        contadorConjunto++;
    });

    console.log(valoresCorrectosConjunto);
    if (valoresCorrectosConjunto.length === 4) {
        swal({
            title: "Correcto!",
            text: "La función esta genial",
            icon: "success",
        });
    } else {
        swal({
            title: "Incorrecto!",
            icon: "error",
            content: {
                element: "div",
                attributes: {
                    innerHTML: '<h4>Preguntas incorrectas: </h4>, ' + getValoresIncorrectosConjunto(valoresIncorrectosConjunto)
                }
            }
        });
        console.log("incorectas p: ", getValoresIncorrectosConjunto(valoresIncorrectosConjunto))
    }
}

function getValoresIncorrectosConjunto(valoresIncorrectosConjunto) {
    let htmlPConjunto = "";
    valoresIncorrectosConjunto.map(item => {
        htmlPConjunto = htmlPConjunto + '<p style="color: rgb(205, 105, 105)">' + item.valor + ' | ' + item.pista + '</p>';
    })
    return htmlPConjunto
}



