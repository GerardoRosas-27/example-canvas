
var board0 = JXG.JSXGraph.initBoard("box00", {
    boundingbox: [-4, 4, 4, -4],
    axis: true,
});

let puntosCorrectos = false;

var getMouseCoords = function (e, i) {
    var cPos = board0.getCoordsTopLeftCorner(e, i),
        absPos = JXG.getPosition(e, i),
        dx = absPos[0] - cPos[0],
        dy = absPos[1] - cPos[1];

    return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board0);
},
    down = function (e) {
        if (!puntosCorrectos) {
            var canCreate = true,
                i,
                coords,
                el;

            if (e[JXG.touchProperty]) {
                i = 0;
            }
            coords = getMouseCoords(e, i);

            for (el in board0.objects) {
                if (
                    JXG.isPoint(board0.objects[el]) &&
                    board0.objects[el].hasPoint(
                        coords.scrCoords[1],
                        coords.scrCoords[2]
                    )
                ) {
                    canCreate = false;
                    break;
                }
                let puntos = board0.objects[el].hasPoint(
                    coords.scrCoords[1],
                    coords.scrCoords[2]
                );
            }

            console.log("validar: ",  p3.Y() , coords.usrCoords[2], p4.Y(), coords.usrCoords[2])
            let newPunto = board0.create("point", [
                coords.usrCoords[1],
                coords.usrCoords[2],
            ]);
            if (canCreate) {

                if ( p3.Y() >= coords.usrCoords[2] &&
                coords.usrCoords[2] >= p4.Y() &&
                coords.usrCoords[1] < 0.02 &&
                coords.usrCoords[1] > -0.02 &&
                puntosCorrectos == false
                ) {
                    puntosCorrectos = true;

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

board0.on("down", down);

function crearSegmentosDivididos(point) {
    let line1 = board0.create("segment", [p1, point], {
        strokeColor: "red",
        strokeWidth: 6,
    });
    let line2 = board0.create("segment", [point, p2], {
        strokeColor: "yellow",
        strokeWidth: 6,
    });
}

const p1 = board0.create("point", [1, 0], { color: "none" });
const p2 = board0.create("point", [4, 0], { color: "none" });
const p3 = board0.create("point", [0, -1], { color: "none" });
const p4 = board0.create("point", [0, -4], { color: "none" });


let line = board0.create("segment", [p1, p2], {
    strokeColor: "blue",
    strokeWidth: 6,
});
let line2 = board0.create("segment", [p3, p4], {
    strokeColor: "red",
    strokeWidth: 6,
});
