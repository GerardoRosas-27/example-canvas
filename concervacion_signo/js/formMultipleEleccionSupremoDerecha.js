let btnSiguenteSupremoDerecha = document.getElementById('btn-siguiente-SupremoDerecha');
let btnValidarSupremoDerecha = document.getElementById('btn-validar-SupremoDerecha');

document.addEventListener('DOMContentLoaded', function () {
    // Función a ejecutar cuando se haya cargado el HTML
    crearFormularioMultipleSupremoDerecha(1);

    btnValidarSupremoDerecha.style.display = 'none';


});

let opcionesCorrectasSupremoDerecha = ["opcion1", "opcion2", "opcion3", "opcion4"];
let opcionesPistasSupremoSupremoDerecha = ["Pista 1", "Pista 2", "Pista 3", "Pista 4"];
let formularioSupremoDerecha = [
    ["pre 1", "ejemplo2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"]
]

function preguntaSiguenteSupremoDerecha(element) {

    let preguntaData = 1 + parseInt(element.getAttribute('data-pregunta'));

    if (preguntaData === 5) {
        btnSiguenteSupremoDerecha.style.display = 'none';
        btnValidarSupremoDerecha.style.display = 'block';
    }


    console.log("pregunta: ", preguntaData);
    obtenerValoresSupremoDerecha();
    crearFormularioMultipleSupremoDerecha(preguntaData);
    element.setAttribute('data-pregunta', preguntaData);

}


function crearFormularioMultipleSupremoDerecha(numPregunta) {
    console.log("numPregunta: ", parseInt(numPregunta));
    let form = document.getElementById("formMultipleSupremoDerecha");

    let html = "";
    index0 = 1;

    formularioSupremoDerecha.forEach(element => {
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

let valoresSeleccionadosSupremoDerecha = [];
function obtenerValoresSupremoDerecha() {
    var formulario = document.getElementById("formMultipleSupremoDerecha");
    var elementos = formulario.querySelectorAll("input[type='radio']");

    elementos.forEach(function (elemento) {
        if (elemento.checked) {
            valoresSeleccionadosSupremoDerecha.push(elemento.value);
        }
    });


}

function validarFormSupremoDerecha() {
    console.log("valoresSeleccionadosSupremoDerecha: ", valoresSeleccionadosSupremoDerecha)

    let contador = 0;
    let valoresCorrectos = [];
    let valoresIncorrectos = [];
    valoresSeleccionadosSupremoDerecha.forEach(elemento => {
        if (opcionesCorrectasSupremoDerecha[contador] === elemento) {
            valoresCorrectos.push(elemento);
        } else {
            valoresIncorrectos.push({ "valor": elemento, "pista": opcionesPistasSupremoSupremoDerecha[contador] })
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
                '<h5>Preguntas incorrectas: </h5>, ' + getValoresIncorrectosSupremoDerecha(valoresIncorrectos),
            showConfirmButton: false,
        })

        console.log("incorectas p: ", getValoresIncorrectosSupremoDerecha(valoresIncorrectos))
    }
}

function getValoresIncorrectosSupremoDerecha(valoresIncorrectos) {
    let htmlP = "";
    valoresIncorrectos.map(item => {
        htmlP = htmlP + '<p style="color: rgb(205, 105, 105); font-size: 15px;">' + item.valor + ' | ' + item.pista + '</p>';
    })
    return htmlP
}



