
let arrayForm = [
    { 'id': '1', 'value': '(1) Sea $ x \\in A^c \\cap B^c$   ' },
    { 'id': '2', 'value': '(2) Es decir, $ x \\in A^c$  y $x \\in B^c$ ' },
    { 'id': '3', 'value': '(3) Así, $x \\notin A $ y $x \\notin B$ ' },
    { 'id': '4', 'value': '(4) De manera que $x \\notin A \\cup B$' },
    { 'id': '5', 'value': '(5) Por lo tanto, $x \\in (A \\cup B)^c$' }

];
arrayForm = _.shuffle(arrayForm);
function htmlForm() {
    let datahtml = ''
    arrayForm.map(item => {
        datahtml = datahtml + '<li data-id="' + item.id + '">' + item.value + '</li>';
    })
    $('#list').html(datahtml);
console.log("cargo listas: ", datahtml)
}

htmlForm();

let arrayOpcionesCorrectas = ['1', '2', '3', '4', '5'];


let arrayErrores = [];
let arrayVerdaderos = [];


let multiDragDemo = document.getElementById('list');


function verificarLista() {
    //let array_list = Array.from($('#list'))
    let lista = $('#list').children();
    console.log(lista)
    arrayVerdaderos = [];

    for (let index = 0; index < arrayOpcionesCorrectas.length; index++) {
        const respuesta = arrayOpcionesCorrectas[index];
        const evaluarLista = lista[index]

        let valorDataId = parseFloat($(evaluarLista).data('id'))
        console.log("respuesta: ", respuesta)
        console.log("evaluarLista: ", valorDataId)


        if (parseFloat(respuesta) === valorDataId) {
            arrayVerdaderos.push(respuesta);
        }

    }

    console.log('arrayVerdaderos: ', arrayVerdaderos)
    console.log('arrayOpcionesCorrectas: ', arrayOpcionesCorrectas)
    if (arrayVerdaderos.length === arrayOpcionesCorrectas.length) {
        swal({
            title: "Exito.",
            text: "Respuesta correcta",
            icon: "success"
        });
    } else {
        swal({
            title: "Error.",
            text: "Respuesta incorrecta",
            icon: "error"
        });
    }

}

let move = new Sortable(multiDragDemo, {
    multiDrag: true, // Enable multi-drag
    selectedClass: 'selected', // The class applied to the selected items
    fallbackTolerance: 3, // So that we can select items on mobile
    animation: 150,

});