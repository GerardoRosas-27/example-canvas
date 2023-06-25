
document.addEventListener('DOMContentLoaded', function () {
    // Función a ejecutar cuando se haya cargado el HTML
    crearFormularioMultiple(1);
});

let opcionesCorrectasSupremo = ["opcion1", "opcion2", "opcion3", "opcion4"];
let formulario = [
    ["pre 1", "ejemplo2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"],
    ["opcion1", "opcion2", "opcion3", "opcion4"]
]

function preguntaSiguente(element) {

    let preguntaData = 1 + parseInt(element.getAttribute('data-pregunta'));

    console.log("pregunta: ", preguntaData);
    obtenerValores();
    crearFormularioMultiple(preguntaData);
    element.setAttribute('data-pregunta', preguntaData);

}


function crearFormularioMultiple(numPregunta) {
    console.log("numPregunta: ", parseInt(numPregunta));
    let form = document.getElementById("formMultipleSupremo");

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
    var formulario = document.getElementById("formMultipleSupremo");
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
    valoresSeleccionados.forEach(elemento => {
        if (opcionesCorrectasSupremo[contador] === elemento) {
            valoresCorrectos.push(elemento);
        }
        contador++;
    });

    console.log(valoresCorrectos);
    if (valoresCorrectos.length === 4) {
        swal({
            title: "Correcto!",
            text: "La función esta genial",
            icon: "success",
        });
    } else {
        swal({
            title: "Incorrecto!",
            text: "La función esta mal",
            icon: "error",
        });
    }
}


