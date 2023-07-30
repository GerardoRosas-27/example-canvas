let btnSiguenteSignoNegativo = document.getElementById('btn-siguiente-SignoNegativo');
let btnValidarSignoNegativo = document.getElementById('btn-validar-SignoNegativo');

document.addEventListener('DOMContentLoaded', function () {
    // Función a ejecutar cuando se haya cargado el HTML
    crearFormularioMultipleSignoNegativo(1);

    btnValidarSignoNegativo.style.display = 'none';


});

let opcionesCorrectasSignoNegativo = ["opcion1", "opcion2", "opcion3", "opcion4"];
let opcionesPistasSignoNegativo = ["Pista 1", "Pista 2", "Pista 3", "Pista 4"];
let formularioSignoNegativo = [
    ["pre 1", "ejemplo2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"]
]

function preguntaSiguenteSignoNegativo(element) {

    let preguntaDataSignoNegativo = 1 + parseInt(element.getAttribute('data-pregunta'));

    if (preguntaDataSignoNegativo === 5) {
        btnSiguenteSignoNegativo.style.display = 'none';
        btnValidarSignoNegativo.style.display = 'block';
    }


    console.log("pregunta: ", preguntaDataSignoNegativo);
    obtenerValoresSignoNegativo();
    crearFormularioMultipleSignoNegativo(preguntaDataSignoNegativo);
    element.setAttribute('data-pregunta', preguntaDataSignoNegativo);

}


function crearFormularioMultipleSignoNegativo(numPregunta) {
    console.log("numPregunta: ", parseInt(numPregunta));
    let formSignoNegativo = document.getElementById("formMultipleSignoNegativo");

    let htmlSignoNegativo = "";
    index0SignoNegativo = 1;

    formularioSignoNegativo.forEach(element => {
        console.log("sin entrar: ", parseInt(numPregunta), index0SignoNegativo);
        if (parseInt(numPregunta) === index0SignoNegativo) {
            console.log("parseInt(numPregunta): ", parseInt(numPregunta), index0SignoNegativo);
            console.log("index0: ", index0SignoNegativo)
            htmlSignoNegativo = htmlSignoNegativo + '<h5>Pregunta ' + index0SignoNegativo + '</h5>';
            labelSignoNegativo = "";
            indexSignoNegativo = 1;


            element.forEach(element1 => {

                labelSignoNegativo = labelSignoNegativo + '<label> <input type="radio" name="pregunta ' + index0SignoNegativo + '" value="opcion' + indexSignoNegativo + '" /> ' + element1 + '</label>'
                indexSignoNegativo++;
            });
            htmlSignoNegativo = htmlSignoNegativo + labelSignoNegativo;
        }
        index0SignoNegativo++;
    });
    console.log("Html: ", htmlSignoNegativo);
    formSignoNegativo.innerHTML = htmlSignoNegativo;

}

let valoresSeleccionadosSignoNegativo = [];
function obtenerValoresSignoNegativo() {
    var formularioSignoNegativo = document.getElementById("formMultipleSignoNegativo");
    var elementosSignoNegativo = formularioSignoNegativo.querySelectorAll("input[type='radio']");

    elementosSignoNegativo.forEach(function (elemento) {
        if (elemento.checked) {
            valoresSeleccionadosSignoNegativo.push(elemento.value);
        }
    });


}

function validarFormSignoNegativo() {
    console.log("valoresSeleccionados: ", valoresSeleccionadosSignoNegativo)

    let contadorSignoNegativo = 0;
    let valoresCorrectosSignoNegativo = [];
    let valoresIncorrectosSignoNegativo = [];
    valoresSeleccionadosSignoNegativo.forEach(elemento => {
        if (opcionesCorrectasSignoNegativo[contadorSignoNegativo] === elemento) {
            valoresCorrectosSignoNegativo.push(elemento);
        } else {
            valoresIncorrectosSignoNegativo.push({ "valor": elemento, "pista": opcionesPistasSignoNegativo[contadorSignoNegativo] })
        }
        contadorSignoNegativo++;
    });

    console.log(valoresCorrectosSignoNegativo);
    if (valoresCorrectosSignoNegativo.length === 4) {
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
                    innerHTML: '<h4>Preguntas incorrectas: </h4>, ' + getValoresIncorrectosSignoNegativo(valoresIncorrectosSignoNegativo)
                }
            }
        });
        console.log("incorectas p: ", getValoresIncorrectosSignoNegativo(valoresIncorrectosSignoNegativo))
    }
}

function getValoresIncorrectosSignoNegativo(valoresIncorrectosSignoNegativo) {
    let htmlPSignoNegativo = "";
    valoresIncorrectosSignoNegativo.map(item => {
        htmlPSignoNegativo = htmlPSignoNegativo + '<p style="color: rgb(205, 105, 105)">' + item.valor + ' | ' + item.pista + '</p>';
    })
    return htmlPSignoNegativo
}



