

var boardSupremoIzquierda = JXG.JSXGraph.initBoard("boxSupremoIzquierda", {
    boundingbox: [-2, 6, 6, -2],
    axis: true,
});

let puntosCorrectosSupremoIzquierda = 0;
let pontoSeleccionadoSupremoIzquierda;
var getMouseCoordsSupremoIzquierda = function (e, i) {
    var cPos = boardSupremoIzquierda.getCoordsTopLeftCorner(e, i),
        absPos = JXG.getPosition(e, i),
        dx = absPos[0] - cPos[0],
        dy = absPos[1] - cPos[1];

    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], boardSupremoIzquierda);
},
    downSupremoIzquierda = function (e) {
        if (puntosCorrectosSupremoIzquierda < 2) {
            var canCreate = true,
                i,
                coords,
                el;

            if (e[JXG.touchProperty]) {
                i = 0;
            }
            coords = getMouseCoordsSupremoIzquierda(e, i);

            for (el in boardSupremoIzquierda.objects) {
                if (
                    JXG.isPoint(boardSupremoIzquierda.objects[el]) &&
                    boardSupremoIzquierda.objects[el].hasPoint(
                        coords.scrCoords[1],
                        coords.scrCoords[2]
                    )
                ) {
                    canCreate = false;
                    break;
                }
                let puntos = boardSupremoIzquierda.objects[el].hasPoint(
                    coords.scrCoords[1],
                    0
                );
            }

            if (canCreate) {

                if (
                    p3SupremoIzquierda.X() <= coords.usrCoords[1] &&
                    coords.usrCoords[1] <= p4SupremoIzquierda.X() &&
                    coords.usrCoords[2] < 0.02 &&
                    coords.usrCoords[2] > -0.02 &&
                    puntosCorrectosSupremoIzquierda < 2
                ) {
                    puntosCorrectosSupremoIzquierda = puntosCorrectosSupremoIzquierda + 1;
                    if (puntosCorrectosSupremoIzquierda === 1) {
                        let newPunto = boardSupremoIzquierda.create("point", [
                            coords.usrCoords[1],
                            0
                        ], { fixed: true });
                        pontoSeleccionadoSupremoIzquierda = newPunto;
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'mueve el slider para formar la vecindad',
                            showConfirmButton: false,
                        })
                    } else {

                        let newPunto = boardSupremoIzquierda.create("point", [
                            coords.usrCoords[1],
                            0
                        ], { fixed: true });
                     
                        pontoSeleccionadoSupremoIzquierda2 = newPunto;
                    }
                } else {

                    Swal.fire({
                        position: 'top-end',
                        icon: 'warning',
                        title: 'El punto tine que estar dentro del segmento',
                        showConfirmButton: false,
                    })

                }
            }
        }
    };

boardSupremoIzquierda.on("down", downSupremoIzquierda);

const s1SupremoIzquierda = boardSupremoIzquierda.create('slider', [[0, -1], [2, -1], [0, 0, 4]], {
    name: '&delta;'
});

const p1SupremoIzquierda = boardSupremoIzquierda.create("point", [
    0,
    0
], { color: "none" });

const p2SupremoIzquierda = boardSupremoIzquierda.create("point", [
    0,
    0
], { color: "none" });


const p3SupremoIzquierda = boardSupremoIzquierda.create("point", [0, 0], { color: "none" });
const p4SupremoIzquierda = boardSupremoIzquierda.create("point", [5, 0], { color: "none" });

let lineSupremoIzquierda = boardSupremoIzquierda.create("segment", [p3SupremoIzquierda, p4SupremoIzquierda], {
    strokeColor: "blue",
    strokeWidth: 8,
});




s1SupremoIzquierda.on('drag', function () {
    if (pontoSeleccionadoSupremoIzquierda) {
        let punto1x = pontoSeleccionadoSupremoIzquierda.X() - s1SupremoIzquierda.Value();
        let punto2x = pontoSeleccionadoSupremoIzquierda.X() + s1SupremoIzquierda.Value();
        if (punto1x > 0 && punto2x < 5) {
            p1SupremoIzquierda.moveTo([punto1x, 0]);
            p2SupremoIzquierda.moveTo([punto2x, 0]);

            let lineSupremoIzquierda1 = boardSupremoIzquierda.create("segment", [p1SupremoIzquierda, pontoSeleccionadoSupremoIzquierda], {
                strokeColor: "red",
                strokeWidth: 6,
            });
            let lineSupremoIzquierda2 = boardSupremoIzquierda.create("segment", [pontoSeleccionadoSupremoIzquierda, p2SupremoIzquierda], {
                strokeColor: "yellow",
                strokeWidth: 6,
            });
        }
    }
});


s1SupremoIzquierda.on('up', function () {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'selecciona un punto que cumpla la conservación del signo.',
        showConfirmButton: false,
    })
});


function validarSupremoIzquierda() {
    let puntox = pontoSeleccionadoSupremoIzquierda2.X();
    if (  puntox <  pontoSeleccionadoSupremoIzquierda.X() &&  puntox >  p1SupremoIzquierda.X()) {
        Swal.fire({
            position: 'top-end',
            icon: 'success',
            title: 'Exito.',
            showConfirmButton: false,
        })
    }else{
        Swal.fire({
            position: 'top-end',
            icon: 'warning',
            title: 'Error.',
            showConfirmButton: false,
        })
    }

}




