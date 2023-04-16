

let arrayForm = [
    { 'id': '1', 'value': 'Por hipótesis, $ y\\cdot z=0 $  y $ y=\\lambda x,$  $\\lambda \\neq 0 $' },
    { 'id': '2', 'value': 'Sustituyendo, $ \\lambda x\\cdot z=0 $  ' },
    { 'id': '3', 'value': 'Asociando, tenemos $ \\lambda \\left( x\\cdot z \\right) =0$ ' },
    { 'id': '4', 'value': 'Como  $\\lambda \\neq 0 ,$ entonces $ x\\cdot z=0 $ ' },
    { 'id': '5', 'value': 'Por lo tanto, $ \ x\\bot z $' }

];
arrayForm = _.shuffle(arrayForm);
function htmlForm() {
    let datahtml = ''
    arrayForm.map(item => {
        datahtml = datahtml + '<li data-id="' + item.id + '">' + item.value + '</li>';
    })
    $('#list').html(datahtml);

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