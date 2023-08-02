
var board = JXG.JSXGraph.initBoard("box", {
  boundingbox: [-1, 3, 6, -6],
  axis: true,
});
let puntosCorrectosSignoNegativo = false;
let marcaContradiccionSignoNegativo = false;
const manoP1 = board.create("point", [0, 0], { color: "none" });
const manoP2 = board.create("point", [4, 0], { color: "none" });
const manoP3 = board.create("point", [1, 0], { color: "none" });
const manoP4 = board.create("point", [3, 0], { color: "none" });

const manoP5 = board.create("point", [1, 3], { color: "none" });
const manoP6 = board.create("point", [1, -6], { color: "none" });
const manoP7 = board.create("point", [3, 3], { color: "none" });
const manoP8 = board.create("point", [3, -6], { color: "none" });
const manoP9 = board.create("point", [2, 3], { color: "none" });
const manoP10 = board.create("point", [2, -6], { color: "none" });

let line1 = board.create("segment", [manoP1, manoP2], {
  strokeColor: "red",
  strokeWidth: 8,
  fixed: true,
});

let line2 = board.create("segment", [manoP3, manoP4], {
  strokeColor: "blue",
  strokeWidth: 8,
  fixed: true,
});

let line3 = board.create("segment", [manoP5, manoP6], {
  strokeColor: "blue",
  strokeWidth: 4,
  dash: 2,
  fixed: true,
});
let line4 = board.create("segment", [manoP7, manoP8], {
  strokeColor: "blue",
  strokeWidth: 4,
  dash: 2,
  fixed: true,
});
let line5 = board.create("segment", [manoP9, manoP10], {
  strokeColor: "blue",
  strokeWidth: 4,
  dash: 2,
  fixed: true,
});

let g1 = board.create("glider", [2, 1, line5], {
  strokeColor: "blue",
  strokeWidth: 8,
});

let g2 = board.create("glider", [1, 1, line3], {
  strokeColor: "blue",
  strokeWidth: 8,
});

let g3 = board.create("glider", [3, 1, line4], {
  strokeColor: "blue",
  strokeWidth: 8,
});
let isButtonPaint = false;
let isDrawing = false;

// Arreglo para almacenar los puntos dibujados
let points = [];

// Función para suavizar la polilínea
function smoothPolyline(polyline, tension) {
  const numPoints = polyline.length;

  if (numPoints < 3) {
    return polyline;
  }

  const smoothedPoints = [];

  for (let i = 1; i < numPoints - 1; i++) {
    const prevPoint = polyline[i - 1];
    const currentPoint = polyline[i];
    const nextPoint = polyline[i + 1];

    const controlPoint1 = [
      currentPoint[0] + (nextPoint[0] - prevPoint[0]) * tension,
      currentPoint[1] + (nextPoint[1] - prevPoint[1]) * tension,
    ];

    const controlPoint2 = [
      currentPoint[0] - (nextPoint[0] - prevPoint[0]) * tension,
      currentPoint[1] - (nextPoint[1] - prevPoint[1]) * tension,
    ];

    smoothedPoints.push(controlPoint1);
    smoothedPoints.push(currentPoint);
    smoothedPoints.push(controlPoint2);
  }

  return smoothedPoints;
}

// Evento cuando se mueve el ratón
board.on("move", function (event) {
  if (isDrawing) {
    const currentPoint = board.getMousePosition(event);
    const scaledPoint = scaleCoordinates(
      currentPoint[0],
      currentPoint[1]
    );

    points.push(scaledPoint);

    console.log("move: ", event);
    // Dibuja la curva suavizada

    const smoothedPoints = smoothPolyline(points, 0.3);
    board.removeObject("smoothedCurve");
    console.log("puntos: ", smoothedPoints);

    var dataX = [];
    var dataY = [];
    smoothedPoints.map((item) => {
      dataX.push(item[0]);
      dataY.push(item[1]);
    });
    console.log("dataX: ", dataX);
    console.log("dataY: ", dataY);
    board.create("curve", [dataX, dataY], {
      name: "smoothedCurve",
      strokeColor: "black",
      strokeWidth: 6,
    });
  }
});

g2.on("down", function () {
  if (isButtonPaint) {
    isDrawing = true;
  } else {
    isDrawing = false;
  }
});
g3.on("down", function () {
  if (isButtonPaint) {
    isDrawing = false;
    isButtonPaint = false;
  }
});

function scaleCoordinates(x, y) {
  // Escala las coordenadas para ajustarlas al rango deseado
  var scaleX =
    (board.getBoundingBox()[2] - board.getBoundingBox()[0]) /
    board.canvasWidth;
  var scaleY =
    (board.getBoundingBox()[3] - board.getBoundingBox()[1]) /
    board.canvasHeight;
  var scaledX = x * scaleX + board.getBoundingBox()[0];
  var scaledY = y * scaleY + board.getBoundingBox()[1];
  return [scaledX, scaledY];
}

var paint = function () {
  isButtonPaint = true;
  g1.setAttribute({ fixed: true });
  g2.setAttribute({ fixed: true });
  g3.setAttribute({ fixed: true });
};
var clear = function () {
  points = [];
  board.removeObject("smoothedCurve");
  isButtonPaint = false;
  isDrawing = false;
  g1.setAttribute({ fixed: false });
  g2.setAttribute({ fixed: false });
  g3.setAttribute({ fixed: false });
};

var btn_start = board.create("button", [
  -1.0,
  -0.5,
  "Pintar",
  paint,
]);
var btn_clear = board.create("button", [
  -1.0,
  -1.2,
  "Borrar",
  clear,
]);

function validar() {
  if (points && points.length > 0) {
    let aciertos = [];
    let yPositiva = [];
    const smoothedPoints = smoothPolyline(points, 0.3);
    var dataX = [];
    var dataY = [];
    let punto1X = parseFloat(g2.X().toFixed(1));
    let punto1Y = parseFloat(g2.Y().toFixed(1));
    let punto2X = parseFloat(g1.X().toFixed(1));
    let punto2Y = parseFloat(g1.Y().toFixed(1));
    let punto3X = parseFloat(g3.X().toFixed(1));
    let punto3Y = parseFloat(g3.Y().toFixed(1));

    smoothedPoints.map((item) => {
      dataX.push(item[0]);
      dataY.push(item[1]);
      let itemX = parseFloat(item[0].toFixed(1));
      let itemY = parseFloat(item[1].toFixed(1));
      if (item[1] >= 0) {
        yPositiva.push(item[1]);
      }

      if (itemX === punto1X && itemY === punto1Y) {
        console.log(
          "punto 1 = X: ",
          itemX,
          punto1X,
          "| Y: ",
          itemY,
          punto1Y
        );
        let punto1 = aciertos.filter(
          (item) => item[0] === punto1X && item[1] === punto1Y
        );
        if (punto1.length === 0)
          aciertos.push([punto1X, punto1Y]);
      }
      if (itemX === punto2X && itemY === punto2Y) {
        console.log(
          "punto 2 = X: ",
          itemX,
          punto2X,
          "| Y: ",
          itemY,
          punto2Y
        );
        let punto2 = aciertos.filter(
          (item) => item[0] === punto2X && item[1] === punto2Y
        );
        if (punto2.length === 0)
          aciertos.push([punto2X, punto2Y]);
      }
      if (itemX === punto3X && itemY === punto3Y) {
        console.log(
          "punto 3 = X: ",
          itemX,
          punto3X,
          "| Y: ",
          itemY,
          punto3Y
        );
        let punto3 = aciertos.filter(
          (item) => item[0] === punto3X && item[1] === punto3Y
        );
        if (punto3.length === 0)
          aciertos.push([punto3X, punto3Y]);
      }
    });

    console.log("aciertos: ", aciertos);
    console.log("yPositiva: ", yPositiva);

    if (aciertos.length === 3 && yPositiva.length === 0) {
      swal({
        title: "Correcto!",
        text: "La función esta genial",
        icon: "success",
      });

      marcaContradiccionSignoNegativo = true;
    } else {
      swal({
        title: "Incorrecto!",
        text: "La función esta mal",
        icon: "error",
      });
    }
  } else {
    swal({
      title: "Incorrecto!",
      text: "pinta una función",
      icon: "error",
    });
  }
}




var getMouseCoordsSignoNegativo2 = function (e, i) {
  var cPos = board.getCoordsTopLeftCorner(e, i),
    absPos = JXG.getPosition(e, i),
    dx = absPos[0] - cPos[0],
    dy = absPos[1] - cPos[1];

  return new JXG.Coords(JXG.COORDS_BY_SCREEN, [dx, dy], board);
},
  downSignoNegativo2 = function (e) {
    console.log("entro downSignoNegativo2: ", marcaContradiccionSignoNegativo)
    if (marcaContradiccionSignoNegativo) {
      if (!puntosCorrectosSignoNegativo) {
        var canCreate = true,
          i,
          coords,
          el;

        if (e[JXG.touchProperty]) {
          i = 0;
        }
        coords = getMouseCoordsSignoNegativo2(e, i);

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
            coords.scrCoords[2]
          );
        }

        if (canCreate) {
          if (
            coords.usrCoords[1] > 2 &&
            coords.usrCoords[1] < 3 &&
            coords.usrCoords[2] < 0.02 &&
            coords.usrCoords[2] > -0.02 &&
            puntosCorrectosSignoNegativo == false
          ) {
            puntosCorrectosSignoNegativo = true;

            swal({
              title: "Muy bien!",
              text: "el punto es correcto",
              icon: "success",
            });
          } else {
            swal({
              title: "Incorrecto!",
              text: "La función no es decreciente la región propuesta",
              icon: "error",
            });
          }

          let newPunto = board.create("point", [
            coords.usrCoords[1],
            coords.usrCoords[2],
          ],{fixed: true});
        }
      }
    }
  };

board.on("down", downSignoNegativo2);
