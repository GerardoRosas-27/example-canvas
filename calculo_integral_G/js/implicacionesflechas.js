let flechasCorrectas = ['flecha1', 'flecha3'];

let flechasSelecionadas = [];



function selecteFlecha(idElemnt) {
    let elemnt = document.getElementById(idElemnt).children;


    
    if (flechasSelecionadas.includes(idElemnt)) {// se elimina la flecha que ya esta selecionada
        elemnt[0].style.borderBottom = '25px solid rgb(145, 181, 236)';
        elemnt[1].style.backgroundColor = 'rgb(145, 181, 236)';
        flechasSelecionadas = flechasSelecionadas.filter(item => item !== idElemnt);
        console.log('flechas select: ', flechasSelecionadas)
    } else {// se guarda la flecha selecionada
        flechasSelecionadas.push(idElemnt)
        console.log('flechas select: ', flechasSelecionadas)
        console.log("elemnt: ", elemnt)
        elemnt[0].style.borderBottom = '25px solid rgb(225, 141, 255)';
        elemnt[1].style.backgroundColor = 'rgb(225, 141, 255)';
    }

}




function validarFlechas() {

    let correctas = [];
    flechasCorrectas.map(item => {
        if (flechasSelecionadas.includes(item)) {
            correctas.push(item)
        }
    })


    if (flechasSelecionadas.length === flechasCorrectas.length && correctas.length === flechasCorrectas.length) {
        swal({
            title: "Exito",
            text: "Las respuestas son correctas.",
            icon: "success"
        });
    } else {
        swal({
            title: "Error.",
            text: "Las respuestas son incorrectas.",
            icon: "error"
        });
    }

}





