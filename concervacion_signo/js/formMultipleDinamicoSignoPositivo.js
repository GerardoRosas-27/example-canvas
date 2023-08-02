let btnSiguenteSignoPositivo = document.getElementById('btn-siguiente-Positivo');
let btnValidarSignoPositivo = document.getElementById('btn-validar-Positivo');

document.addEventListener('DOMContentLoaded', function () {
    // Función a ejecutar cuando se haya cargado el HTML
    crearFormularioMultipleSignoPositivo(1);

    btnValidarSignoPositivo.style.display = 'none';


});

let opcionesCorrectasSignoPositivo = ["opcion1", "opcion2", "opcion3", "opcion4"];
let opcionesPistasSignoPositivo = ["Pista 1", "Pista 2", "Pista 3", "Pista 4"];
let formularioSignoPositivo = [
    ["pre 1", "ejemplo2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"]
]

function preguntaSiguenteSignoPositivo(element) {

    let preguntaDataSignoPositivo = 1 + parseInt(element.getAttribute('data-pregunta'));

    if (preguntaDataSignoPositivo === 5) {
        btnSiguenteSignoPositivo.style.display = 'none';
        btnValidarSignoPositivo.style.display = 'block';
    }


    console.log("pregunta: ", preguntaDataSignoPositivo);
    obtenerValoresSignoPositivo();
    crearFormularioMultipleSignoPositivo(preguntaDataSignoPositivo);
    element.setAttribute('data-pregunta', preguntaDataSignoPositivo);

}


function crearFormularioMultipleSignoPositivo(numPregunta) {
    console.log("numPregunta: ", parseInt(numPregunta));
    let formSignoPositivo = document.getElementById("formMultipleSignoPositivo");

    let htmlSignoPositivo = "";
    index0SignoPositivo = 1;

    formularioSignoPositivo.forEach(element => {
        console.log("sin entrar: ", parseInt(numPregunta), index0SignoPositivo);
        if (parseInt(numPregunta) === index0SignoPositivo) {
            console.log("parseInt(numPregunta): ", parseInt(numPregunta), index0SignoPositivo);
            console.log("index0: ", index0SignoPositivo)
            htmlSignoPositivo = htmlSignoPositivo + '<h5>Pregunta ' + index0SignoPositivo + '</h5>';
            labelSignoPositivo = "";
            indexSignoPositivo = 1;


            element.forEach(element1 => {

                labelSignoPositivo = labelSignoPositivo + '<label> <input type="radio" name="pregunta ' + index0SignoPositivo + '" value="opcion' + indexSignoPositivo + '" /> ' + element1 + '</label>'
                indexSignoPositivo++;
            });
            htmlSignoPositivo = htmlSignoPositivo + labelSignoPositivo;
        }
        index0SignoPositivo++;
    });
    console.log("Html: ", htmlSignoPositivo);
    formSignoPositivo.innerHTML = htmlSignoPositivo;

}

let valoresSeleccionadosSignoPositivo = [];
function obtenerValoresSignoPositivo() {
    var formularioSignoPositivo = document.getElementById("formMultipleSignoPositivo");
    var elementosSignoPositivo = formularioSignoPositivo.querySelectorAll("input[type='radio']");

    elementosSignoPositivo.forEach(function (elemento) {
        if (elemento.checked) {
            valoresSeleccionadosSignoPositivo.push(elemento.value);
        }
    });


}

function validarFormSignoPositivo() {
    console.log("valoresSeleccionados: ", valoresSeleccionadosSignoPositivo)

    let contadorSignoPositivo = 0;
    let valoresCorrectosSignoPositivo = [];
    let valoresIncorrectosSignoPositivo = [];
    valoresSeleccionadosSignoPositivo.forEach(elemento => {
        if (opcionesCorrectasSignoPositivo[contadorSignoPositivo] === elemento) {
            valoresCorrectosSignoPositivo.push(elemento);
        } else {
            valoresIncorrectosSignoPositivo.push({ "valor": elemento, "pista": opcionesPistasSignoPositivo[contadorSignoPositivo] })
        }
        contadorSignoPositivo++;
    });

    console.log(valoresCorrectosSignoPositivo);
    if (valoresCorrectosSignoPositivo.length === 4) {
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
                    innerHTML: '<h4>Preguntas incorrectas: </h4>, ' + getValoresIncorrectosSignoPositivo(valoresIncorrectosSignoPositivo)
                }
            }
        });
        console.log("incorectas p: ", getValoresIncorrectosSignoPositivo(valoresIncorrectosSignoPositivo))
    }
}

function getValoresIncorrectosSignoPositivo(valoresIncorrectosSignoPositivo) {
    let htmlPSignoPositivo = "";
    valoresIncorrectosSignoPositivo.map(item => {
        htmlPSignoPositivo = htmlPSignoPositivo + '<p style="color: rgb(205, 105, 105)">' + item.valor + ' | ' + item.pista + '</p>';
    })
    return htmlPSignoPositivo
}



