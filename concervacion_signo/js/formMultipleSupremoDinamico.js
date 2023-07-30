let btnSiguenteSupremo = document.getElementById('btn-siguiente-Supremo');
let btnValidarSupremo = document.getElementById('btn-validar-Supremo');

document.addEventListener('DOMContentLoaded', function () {
    // Función a ejecutar cuando se haya cargado el HTML
    crearFormularioMultipleSupremo(1);

    btnValidarSupremo.style.display = 'none';


});

let opcionesCorrectasSupremo = ["opcion1", "opcion2", "opcion3", "opcion4"];
let opcionesPistasSupremo = ["Pista 1", "Pista 2", "Pista 3", "Pista 4"];
let formularioSupremo = [
    ["pre 1", "ejemplo2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"]
]

function preguntaSiguenteSupremo(element) {

    let preguntaDataSupremo = 1 + parseInt(element.getAttribute('data-pregunta'));

    if (preguntaDataSupremo === 5) {
        btnSiguenteSupremo.style.display = 'none';
        btnValidarSupremo.style.display = 'block';
    }


    console.log("pregunta: ", preguntaDataSupremo);
    obtenerValoresSupremo();
    crearFormularioMultipleSupremo(preguntaDataSupremo);
    element.setAttribute('data-pregunta', preguntaDataSupremo);

}


function crearFormularioMultipleSupremo(numPregunta) {
    console.log("numPregunta: ", parseInt(numPregunta));
    let formSupremo = document.getElementById("formMultipleSupremo");

    let htmlSupremo = "";
    index0Supremo = 1;

    formularioSupremo.forEach(element => {
        console.log("sin entrar: ", parseInt(numPregunta), index0Supremo);
        if (parseInt(numPregunta) === index0Supremo) {
            console.log("parseInt(numPregunta): ", parseInt(numPregunta), index0Supremo);
            console.log("index0: ", index0Supremo)
            htmlSupremo = htmlSupremo + '<h5>Pregunta ' + index0Supremo + '</h5>';
            labelSupremo = "";
            indexSupremo = 1;


            element.forEach(element1 => {

                labelSupremo = labelSupremo + '<label> <input type="radio" name="pregunta ' + index0Supremo + '" value="opcion' + indexSupremo + '" /> ' + element1 + '</label>'
                indexSupremo++;
            });
            htmlSupremo = htmlSupremo + labelSupremo;
        }
        index0Supremo++;
    });
    console.log("Html: ", htmlSupremo);
    formSupremo.innerHTML = htmlSupremo;

}

let valoresSeleccionadosSupremo = [];
function obtenerValoresSupremo() {
    var formularioSupremo = document.getElementById("formMultipleSupremo");
    var elementosSupremo = formularioSupremo.querySelectorAll("input[type='radio']");

    elementosSupremo.forEach(function (elemento) {
        if (elemento.checked) {
            valoresSeleccionadosSupremo.push(elemento.value);
        }
    });


}

function validarFormSupremo() {
    console.log("valoresSeleccionados: ", valoresSeleccionadosSupremo)

    let contadorSupremo = 0;
    let valoresCorrectosSupremo = [];
    let valoresIncorrectosSupremo = [];
    valoresSeleccionadosSupremo.forEach(elemento => {
        if (opcionesCorrectasSupremo[contadorSupremo] === elemento) {
            valoresCorrectosSupremo.push(elemento);
        } else {
            valoresIncorrectosSupremo.push({ "valor": elemento, "pista": opcionesPistasSupremo[contadorSupremo] })
        }
        contadorSupremo++;
    });

    console.log(valoresCorrectosSupremo);
    if (valoresCorrectosSupremo.length === 4) {
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
                    innerHTML: '<h4>Preguntas incorrectas: </h4>, ' + getValoresIncorrectosSupremo(valoresIncorrectosSupremo)
                }
            }
        });
        console.log("incorectas p: ", getValoresIncorrectosSupremo(valoresIncorrectosSupremo))
    }
}

function getValoresIncorrectosSupremo(valoresIncorrectosSupremo) {
    let htmlPSupremo = "";
    valoresIncorrectosSupremo.map(item => {
        htmlPSupremo = htmlPSupremo + '<p style="color: rgb(205, 105, 105)">' + item.valor + ' | ' + item.pista + '</p>';
    })
    return htmlPSupremo
}



