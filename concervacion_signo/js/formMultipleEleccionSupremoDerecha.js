let btnSiguente = document.getElementById('btn-siguiente');
let btnValidar = document.getElementById('btn-validar');

document.addEventListener('DOMContentLoaded', function () {
    // Función a ejecutar cuando se haya cargado el HTML
    crearFormularioMultiple(1);

    btnValidar.style.display = 'none';


});

let opcionesCorrectasSupremo = ["opcion1", "opcion2", "opcion3", "opcion4"];
let opcionesPistasSupremo = ["Pista 1", "Pista 2", "Pista 3", "Pista 4"];
let formulario = [
    ["pre 1", "ejemplo2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"]
]

function preguntaSiguente(element) {

    let preguntaData = 1 + parseInt(element.getAttribute('data-pregunta'));

    if (preguntaData === 5) {
        btnSiguente.style.display = 'none';
        btnValidar.style.display = 'block';
    }


    console.log("pregunta: ", preguntaData);
    obtenerValores();
    crearFormularioMultiple(preguntaData);
    element.setAttribute('data-pregunta', preguntaData);

}


function crearFormularioMultiple(numPregunta) {
    console.log("numPregunta: ", parseInt(numPregunta));
    let form = document.getElementById("formMultipleSupremoDerecha");

    let html = "";
    index0 = 1;

    formulario.forEach(element => {
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

let valoresSeleccionados = [];
function obtenerValores() {
    var formulario = document.getElementById("formMultipleSupremoDerecha");
    var elementos = formulario.querySelectorAll("input[type='radio']");

    elementos.forEach(function (elemento) {
        if (elemento.checked) {
            valoresSeleccionados.push(elemento.value);
        }
    });


}

function validarForm() {
    console.log("valoresSeleccionados: ", valoresSeleccionados)

    let contador = 0;
    let valoresCorrectos = [];
    let valoresIncorrectos = [];
    valoresSeleccionados.forEach(elemento => {
        if (opcionesCorrectasSupremo[contador] === elemento) {
            valoresCorrectos.push(elemento);
        } else {
            valoresIncorrectos.push({ "valor": elemento, "pista": opcionesPistasSupremo[contador] })
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
                '<h5>Preguntas incorrectas: </h5>, ' + getValoresIncorrectos(valoresIncorrectos),
            showConfirmButton: false,
        })

        console.log("incorectas p: ", getValoresIncorrectos(valoresIncorrectos))
    }
}

function getValoresIncorrectos(valoresIncorrectos) {
    let htmlP = "";
    valoresIncorrectos.map(item => {
        htmlP = htmlP + '<p style="color: rgb(205, 105, 105); font-size: 15px;">' + item.valor + ' | ' + item.pista + '</p>';
    })
    return htmlP
}



