

var board = JXG.JSXGraph.initBoard("box", {
    boundingbox: [-2, 6, 6, -2],
    axis: true,
});

let puntosCorrectos = 0;
let pontoSeleccionado;
var getMouseCoords = function (e, i) {
    var cPos = board.getCoordsTopLeftCorner(e, i),
        absPos = JXG.getPosition(e, i),
        dx = absPos[0] - cPos[0],
        dy = absPos[1] - cPos[1];

    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
},
    down = function (e) {
        if (puntosCorrectos < 2) {
            var canCreate = true,
                i,
                coords,
                el;

            if (e[JXG.touchProperty]) {
                i = 0;
            }
            coords = getMouseCoords(e, i);

            for (el in board.objects) {
                if (
                    JXG.isPoint(board.objects[el]) &&
                    board.objects[el].hasPoint(
                        coords.scrCoords[1],
                        coords.scrCoords[2]
                    )
                ) {
                    canCreate = false;
                    break;
                }
                let puntos = board.objects[el].hasPoint(
                    coords.scrCoords[1],
                    0
                );
            }

            if (canCreate) {

                if (
                    p3.X() <= coords.usrCoords[1] &&
                    coords.usrCoords[1] <= p4.X() &&
                    coords.usrCoords[2] < 0.02 &&
                    coords.usrCoords[2] > -0.02 &&
                    puntosCorrectos < 2
                ) {
                    puntosCorrectos = puntosCorrectos + 1;
                    if (puntosCorrectos === 1) {
                        let newPunto = board.create("point", [
                            coords.usrCoords[1],
                            0
                        ], { fixed: true });
                        pontoSeleccionado = newPunto;
                        Swal.fire({
                            position: 'top-end',
                            icon: 'success',
                            title: 'mueve el slider para formar la vecindad',
                            showConfirmButton: false,
                        })
                    } else {

                        let newPunto = board.create("point", [
                            coords.usrCoords[1],
                            0
                        ], { fixed: true });
                     
                        pontoSeleccionado2 = newPunto;
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

board.on("down", down);

const s1 = board.create('slider', [[0, -1], [2, -1], [0, 0, 4]], {
    name: '&delta;'
});

const p1 = board.create("point", [
    0,
    0
], { color: "none" });

const p2 = board.create("point", [
    0,
    0
], { color: "none" });


const p3 = board.create("point", [0, 0], { color: "none" });
const p4 = board.create("point", [5, 0], { color: "none" });

let line = board.create("segment", [p3, p4], {
    strokeColor: "blue",
    strokeWidth: 8,
});




s1.on('drag', function () {
    if (pontoSeleccionado) {
        let punto1x = pontoSeleccionado.X() - s1.Value();
        let punto2x = pontoSeleccionado.X() + s1.Value();
        if (punto1x > 0 && punto2x < 5) {
            p1.moveTo([punto1x, 0]);
            p2.moveTo([punto2x, 0]);

            let line1 = board.create("segment", [p1, pontoSeleccionado], {
                strokeColor: "red",
                strokeWidth: 6,
            });
            let line2 = board.create("segment", [pontoSeleccionado, p2], {
                strokeColor: "yellow",
                strokeWidth: 6,
            });
        }
    }
});


s1.on('up', function () {
    Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'selecciona un punto que cumpla la conservación del signo.',
        showConfirmButton: false,
    })
});


function validar() {
    let puntox = pontoSeleccionado2.X();
    if (puntox <  pontoSeleccionado.X() &&  puntox >  p1.X()) {
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



