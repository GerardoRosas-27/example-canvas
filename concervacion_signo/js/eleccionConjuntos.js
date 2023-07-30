let puntosCorrectosConjuntos = false;

var board00 = JXG.JSXGraph.initBoard("box00", {
    boundingbox: [-4, 4, 4, -4],
    axis: true,
});



var getMouseCoordsConjunto = function (e, i) {
    var cPos = board00.getCoordsTopLeftCorner(e, i),
        absPos = JXG.getPosition(e, i),
        dx = absPos[0] - cPos[0],
        dy = absPos[1] - cPos[1];

    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board00);
},
    downConjunto = function (e) {
        if (!puntosCorrectosConjuntos) {
            var canCreate = true,
                i,
                coords,
                el;

            if (e[JXG.touchProperty]) {
                i = 0;
            }
            coords = getMouseCoordsConjunto(e, i);

            for (el in board00.objects) {
                if (
                    JXG.isPoint(board00.objects[el]) &&
                    board00.objects[el].hasPoint(
                        coords.scrCoords[1],
                        coords.scrCoords[2]
                    )
                ) {
                    canCreate = false;
                    break;
                }
                let puntos = board00.objects[el].hasPoint(
                    coords.scrCoords[1],
                    coords.scrCoords[2]
                );
            }

            console.log("validar: ",  pConjunto3.Y() , coords.usrCoords[2], pConjunto4.Y(), coords.usrCoords[2])
            let newPunto = board00.create("point", [
                coords.usrCoords[1],
                coords.usrCoords[2],
            ]);
            if (canCreate) {

                if ( pConjunto3.Y() >= coords.usrCoords[2] &&
                coords.usrCoords[2] >= pConjunto4.Y() &&
                coords.usrCoords[1] < 0.02 &&
                coords.usrCoords[1] > -0.02 &&
                puntosCorrectosConjuntos == false
                ) {
                    puntosCorrectosConjuntos = true;

                    swal({
                        title: "Muy bien!",
                        text: "La región de monotonía que elegiste es correcta",
                        icon: "success",
                    });

                } else {
                    swal({
                        title: "Incorrecto!",
                        text: "La función no es decreciente la región propuesta",
                        icon: "error",
                    });
                }
            }
        }
    };

board00.on("down", downConjunto);

const pConjunto1 = board00.create("point", [1, 0], { color: "none" });
const pConjunto2 = board00.create("point", [4, 0], { color: "none" });
const pConjunto3 = board00.create("point", [0, -1], { color: "none" });
const pConjunto4 = board00.create("point", [0, -4], { color: "none" });


let lineConjunto0 = board00.create("segment", [pConjunto1, pConjunto2], {
    strokeColor: "blue",
    strokeWidth: 6,
});
let lineConjunto2 = board00.create("segment", [pConjunto3, pConjunto4], {
    strokeColor: "red",
    strokeWidth: 6,
});
