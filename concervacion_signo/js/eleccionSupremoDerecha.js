

var boardSupremoDerecha = JXG.JSXGraph.initBoard("boxSupremoDerecha", {
    boundingbox: [-2, 6, 6, -2],
    axis: true,
});

let puntosCorrectosSupremoDerecha = 0;
let pontoSeleccionadoSupremoDerecha;
var getMouseCoordsSupremoDerecha = function (e, i) {
    var cPos = boardSupremoDerecha.getCoordsTopLeftCorner(e, i),
        absPos = JXG.getPosition(e, i),
        dx = absPos[0] - cPos[0],
        dy = absPos[1] - cPos[1];

    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], boardSupremoDerecha);
},
    downSupremoDerecha = function (e) {
        if (puntosCorrectosSupremoDerecha < 2) {
            var canCreate = true,
                i,
                coords,
                el;

            if (e[JXG.touchProperty]) {
                i = 0;
            }
            coords = getMouseCoordsSupremoDerecha(e, i);

            for (el in boardSupremoDerecha.objects) {
                if (
                    JXG.isPoint(boardSupremoDerecha.objects[el]) &&
                    boardSupremoDerecha.objects[el].hasPoint(
                        coords.scrCoords[1],
                        coords.scrCoords[2]
                    )
                ) {
                    canCreate = false;
                    break;
                }
                let puntos = boardSupremoDerecha.objects[el].hasPoint(
                    coords.scrCoords[1],
                    0
                );
            }

            if (canCreate) {

                if (
                    p3SupremoDerecha.X() <= coords.usrCoords[1] &&
                    coords.usrCoords[1] <= p4SupremoDerecha.X() &&
                    coords.usrCoords[2] < 0.02 &&
                    coords.usrCoords[2] > -0.02 &&
                    puntosCorrectosSupremoDerecha < 2
                ) {
                    puntosCorrectosSupremoDerecha = puntosCorrectosSupremoDerecha + 1;
                    if (puntosCorrectosSupremoDerecha === 1) {
                        let newPunto = boardSupremoDerecha.create("point", [
                            coords.usrCoords[1],
                            0
                        ], { fixed: true });
                        pontoSeleccionadoSupremoDerecha = newPunto;
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'mueve el slider para formar la vecindad',
                            showConfirmButton: false,
                        })
                    } else {

                        let newPunto = boardSupremoDerecha.create("point", [
                            coords.usrCoords[1],
                            0
                        ], { fixed: true });
                     
                        pontoSeleccionadoSupremoDerecha2 = newPunto;
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

boardSupremoDerecha.on("down", downSupremoDerecha);

const s1SupremoDerecha = boardSupremoDerecha.create('slider', [[0, -1], [2, -1], [0, 0, 4]], {
    name: '&delta;'
});

const p1SupremoDerecha = boardSupremoDerecha.create("point", [
    0,
    0
], { color: "none" });

const p2SupremoDerecha = boardSupremoDerecha.create("point", [
    0,
    0
], { color: "none" });


const p3SupremoDerecha = boardSupremoDerecha.create("point", [0, 0], { color: "none" });
const p4SupremoDerecha = boardSupremoDerecha.create("point", [5, 0], { color: "none" });

let lineSupremoDerecha = boardSupremoDerecha.create("segment", [p3SupremoDerecha, p4SupremoDerecha], {
    strokeColor: "blue",
    strokeWidth: 8,
});




s1SupremoDerecha.on('drag', function () {
    if (pontoSeleccionadoSupremoDerecha) {
        let punto1x = pontoSeleccionadoSupremoDerecha.X() - s1SupremoDerecha.Value();
        let punto2x = pontoSeleccionadoSupremoDerecha.X() + s1SupremoDerecha.Value();
        if (punto1x > 0 && punto2x < 5) {
            p1SupremoDerecha.moveTo([punto1x, 0]);
            p2SupremoDerecha.moveTo([punto2x, 0]);

            let lineSupremoDerecha1 = boardSupremoDerecha.create("segment", [p1SupremoDerecha, pontoSeleccionadoSupremoDerecha], {
                strokeColor: "red",
                strokeWidth: 6,
            });
            let lineSupremoDerecha2 = boardSupremoDerecha.create("segment", [pontoSeleccionadoSupremoDerecha, p2SupremoDerecha], {
                strokeColor: "yellow",
                strokeWidth: 6,
            });
        }
    }
});


s1SupremoDerecha.on('up', function () {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'selecciona un punto que cumpla la conservación del signo.',
        showConfirmButton: false,
    })
});


function validarSupremoDerecha() {
    let puntox = pontoSeleccionadoSupremoDerecha2.X();
    if (pontoSeleccionadoSupremoDerecha.X() < puntox && puntox < p2SupremoDerecha.X()) {
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



