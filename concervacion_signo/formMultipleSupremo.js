let opcionesCorrectasSupremo = ["opcion1", "opcion2", "opcion3", "opcion4"];


function obtenerValores() {
    var formulario = document.getElementById("formMultipleSupremo");
    var elementos = formulario.querySelectorAll("input[type='radio']");

    let valoresCorrectos = [];
    let contador = 0;
    elementos.forEach(function (elemento) {
        if (elemento.checked) {

            if (opcionesCorrectasSupremo[contador] === elemento.value) {
                valoresCorrectos.push(elemento.value);
            }
            contador++;
        }
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


