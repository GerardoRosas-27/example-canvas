let btnSiguenteSupremoIzquierda = document.getElementById('btn-siguiente-SupremoIzquierda');
let btnValidarSupremoIzquierda = document.getElementById('btn-validar-SupremoIzquierda');

document.addEventListener('DOMContentLoaded', function () {
    // Función a ejecutar cuando se haya cargado el HTML
    crearFormularioMultipleSupremoIzquierda(1);

    btnValidarSupremoIzquierda.style.display = 'none';


});

let opcionesCorrectasSupremoIzquierda = ["opcion1", "opcion2", "opcion3", "opcion4"];
let opcionesPistasSupremoSupremoIzquierda = ["Pista 1", "Pista 2", "Pista 3", "Pista 4"];
let formularioSupremoIzquierda = [
    ["pre 1", "ejemplo2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"]
]

function preguntaSiguenteSupremoIzquierda(element) {

    let preguntaData = 1 + parseInt(element.getAttribute('data-pregunta'));

    if (preguntaData === 5) {
        btnSiguenteSupremoIzquierda.style.display = 'none';
        btnValidarSupremoIzquierda.style.display = 'block';
    }


    console.log("pregunta: ", preguntaData);
    obtenerValoresSupremoIzquierda();
    crearFormularioMultipleSupremoIzquierda(preguntaData);
    element.setAttribute('data-pregunta', preguntaData);

}


function crearFormularioMultipleSupremoIzquierda(numPregunta) {
    console.log("numPregunta: ", parseInt(numPregunta));
    let form = document.getElementById("formMultipleSupremoIzquierda");

    let html = "";
    index0 = 1;

    formularioSupremoIzquierda.forEach(element => {
        console.log("sin entrar: ", parseInt(numPregunta), index0);
        if (parseInt(numPregunta) === index0) {
            console.log("parseInt(numPregunta): ", parseInt(numPregunta), index0);
            console.log("index0: ", index0)
            html = html + '<h5>Pregunta ' + index0 + '</h5>';
            label = "";
            index = 1;


            element.forEach(element1 => {

                label = label + '<label> <input type="radio" name="pregunta ' + index0 + '" value="opcion' + index + '" /> ' + element1 + '</label>'
                index++;
            });
            html = html + label;
        }
        index0++;
    });
    console.log("Html: ", html);
    form.innerHTML = html;

}

let valoresSeleccionadosSupremoIzquierda = [];
function obtenerValoresSupremoIzquierda() {
    var formulario = document.getElementById("formMultipleSupremoIzquierda");
    var elementos = formulario.querySelectorAll("input[type='radio']");

    elementos.forEach(function (elemento) {
        if (elemento.checked) {
            valoresSeleccionadosSupremoIzquierda.push(elemento.value);
        }
    });


}

function validarFormSupremoIzquierda() {
    console.log("valoresSeleccionadosSupremoIzquierda: ", valoresSeleccionadosSupremoIzquierda)

    let contador = 0;
    let valoresCorrectos = [];
    let valoresIncorrectos = [];
    valoresSeleccionadosSupremoIzquierda.forEach(elemento => {
        if (opcionesCorrectasSupremoIzquierda[contador] === elemento) {
            valoresCorrectos.push(elemento);
        } else {
            valoresIncorrectos.push({ "valor": elemento, "pista": opcionesPistasSupremoSupremoIzquierda[contador] })
        }
        contador++;
    });

    console.log(valoresCorrectos);


    if (valoresCorrectos.length === 4) {

        Swal.fire({
            icon: 'success',
            title: 'La función esta genial',
            showConfirmButton: false,
        })
    } else {

        Swal.fire({
            icon: 'warning',
            title: 'Incorrecto!',
            html:
                '<h5>Preguntas incorrectas: </h5>, ' + getValoresIncorrectosSupremoIzquierda(valoresIncorrectos),
            showConfirmButton: false,
        })

        console.log("incorectas p: ", getValoresIncorrectosSupremoIzquierda(valoresIncorrectos))
    }
}

function getValoresIncorrectosSupremoIzquierda(valoresIncorrectos) {
    let htmlP = "";
    valoresIncorrectos.map(item => {
        htmlP = htmlP + '<p style="color: rgb(205, 105, 105); font-size: 15px;">' + item.valor + ' | ' + item.pista + '</p>';
    })
    return htmlP
}



