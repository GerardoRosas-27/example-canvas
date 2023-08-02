
var boardSignoPositivo = JXG.JSXGraph.initBoard("boxSignoPositivo", {
  boundingbox: [-1, 3, 6, -6],
  axis: true,
});

const manoP1SignoPositivo = boardSignoPositivo.create("point", [0, 0], { color: "none" });
const manoP2SignoPositivo = boardSignoPositivo.create("point", [4, 0], { color: "none" });
const manoP3SignoPositivo = boardSignoPositivo.create("point", [1, 0], { color: "none" });
const manoP4SignoPositivo = boardSignoPositivo.create("point", [3, 0], { color: "none" });

const manoP5SignoPositivo = boardSignoPositivo.create("point", [1, 3], { color: "none" });
const manoP6SignoPositivo = boardSignoPositivo.create("point", [1, -6], { color: "none" });
const manoP7SignoPositivo = boardSignoPositivo.create("point", [3, 3], { color: "none" });
const manoP8SignoPositivo = boardSignoPositivo.create("point", [3, -6], { color: "none" });
const manoP9SignoPositivo = boardSignoPositivo.create("point", [2, 3], { color: "none" });
const manoP1SignoPositivo0 = boardSignoPositivo.create("point", [2, -6], { color: "none" });

let line1SignoPositivo = boardSignoPositivo.create("segment", [manoP1SignoPositivo, manoP2SignoPositivo], {
  strokeColor: "red",
  strokeWidth: 8,
  fixed: true,
});

let line2SignoPositivo = boardSignoPositivo.create("segment", [manoP3SignoPositivo, manoP4SignoPositivo], {
  strokeColor: "blue",
  strokeWidth: 8,
  fixed: true,
});

let line3SignoPositivo = boardSignoPositivo.create("segment", [manoP5SignoPositivo, manoP6SignoPositivo], {
  strokeColor: "blue",
  strokeWidth: 4,
  dash: 2,
  fixed: true,
});
let line4SignoPositivo = boardSignoPositivo.create("segment", [manoP7SignoPositivo, manoP8SignoPositivo], {
  strokeColor: "blue",
  strokeWidth: 4,
  dash: 2,
  fixed: true,
});
let line5SignoPositivo = boardSignoPositivo.create("segment", [manoP9SignoPositivo, manoP1SignoPositivo0], {
  strokeColor: "blue",
  strokeWidth: 4,
  dash: 2,
  fixed: true,
});

let g1SignoPositivo = boardSignoPositivo.create("glider", [2, -1, line5SignoPositivo], {
  strokeColor: "blue",
  strokeWidth: 8,
});

let g2SignoPositivo = boardSignoPositivo.create("glider", [1, -1, line3SignoPositivo], {
  strokeColor: "blue",
  strokeWidth: 8,
});

let g3SignoPositivo = boardSignoPositivo.create("glider", [3, -1, line4SignoPositivo], {
  strokeColor: "blue",
  strokeWidth: 8,
});
let isButtonPaintSignoPositivo = false;
let isDrawingSignoPositivo = false;

// Arreglo para almacenar los puntos dibujados
let pointsSignoPositivo = [];

// Función para suavizar la polilínea
function smoothPolylineSignoPositivo(polyline, tension) {
  const numPointsSignoPositivo = polyline.length;

  if (numPointsSignoPositivo < 3) {
    return polyline;
  }

  const smoothedPoints = [];

  for (let i = 1; i < numPointsSignoPositivo - 1; i++) {
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
boardSignoPositivo.on("move", function (event) {
  if (isDrawingSignoPositivo) {
    const currentPoint = boardSignoPositivo.getMousePosition(event);
    const scaledPoint = scaleCoordinatesSignoPositivo(
      currentPoint[0],
      currentPoint[1]
    );

    pointsSignoPositivo.push(scaledPoint);

    console.log("move: ", event);
    // Dibuja la curva suavizada

    const smoothedPoints = smoothPolylineSignoPositivo(pointsSignoPositivo, 0.3);
    boardSignoPositivo.removeObject("smoothedCurve");
    console.log("puntos: ", smoothedPoints);

    var dataX = [];
    var dataY = [];
    smoothedPoints.map((item) => {
      dataX.push(item[0]);
      dataY.push(item[1]);
    });
    console.log("dataX: ", dataX);
    console.log("dataY: ", dataY);
    boardSignoPositivo.create("curve", [dataX, dataY], {
      name: "smoothedCurve",
      strokeColor: "black",
      strokeWidth: 6,
    });
  }
});

g2SignoPositivo.on("down", function () {
  if (isButtonPaintSignoPositivo) {
    isDrawingSignoPositivo = true;
  } else {
    isDrawingSignoPositivo = false;
  }
});
g3SignoPositivo.on("down", function () {
  if (isButtonPaintSignoPositivo) {
    isDrawingSignoPositivo = false;
    isButtonPaintSignoPositivo = false;
  }
});

function scaleCoordinatesSignoPositivo(x, y) {
  // Escala las coordenadas para ajustarlas al rango deseado
  var scaleX =
    (boardSignoPositivo.getBoundingBox()[2] - boardSignoPositivo.getBoundingBox()[0]) /
    boardSignoPositivo.canvasWidth;
  var scaleY =
    (boardSignoPositivo.getBoundingBox()[3] - boardSignoPositivo.getBoundingBox()[1]) /
    boardSignoPositivo.canvasHeight;
  var scaledX = x * scaleX + boardSignoPositivo.getBoundingBox()[0];
  var scaledY = y * scaleY + boardSignoPositivo.getBoundingBox()[1];
  return [scaledX, scaledY];
}

var paintSignoPositivo = function () {
  isButtonPaintSignoPositivo = true;
  g1SignoPositivo.setAttribute({ fixed: true });
  g2SignoPositivo.setAttribute({ fixed: true });
  g3SignoPositivo.setAttribute({ fixed: true });
};
var clearSignoPositivo = function () {
  pointsSignoPositivo = [];
  boardSignoPositivo.removeObject("smoothedCurve");
  isButtonPaintSignoPositivo = false;
  isDrawingSignoPositivo = false;
  g1SignoPositivo.setAttribute({ fixed: false });
  g2SignoPositivo.setAttribute({ fixed: false });
  g3SignoPositivo.setAttribute({ fixed: false });
};

var btn_startSignoPositivo = boardSignoPositivo.create("button", [
  -1.0,
  -0.5,
  "Pintar",
  paintSignoPositivo,
]);
var btn_clearSignoPositivo = boardSignoPositivo.create("button", [
  -1.0,
  -1.2,
  "Borrar",
  clearSignoPositivo,
]);

function validarSignoPositivo() {
  if (pointsSignoPositivo && pointsSignoPositivo.length > 0) {
    let aciertos = [];
    let yPositiva = [];
    const smoothedPoints = smoothPolylineSignoPositivo(pointsSignoPositivo, 0.3);
    var dataX = [];
    var dataY = [];
    let punto1X = parseFloat(g2SignoPositivo.X().toFixed(1));
    let punto1Y = parseFloat(g2SignoPositivo.Y().toFixed(1));
    let punto2X = parseFloat(g1SignoPositivo.X().toFixed(1));
    let punto2Y = parseFloat(g1SignoPositivo.Y().toFixed(1));
    let punto3X = parseFloat(g3SignoPositivo.X().toFixed(1));
    let punto3Y = parseFloat(g3SignoPositivo.Y().toFixed(1));

    smoothedPoints.map((item) => {
      dataX.push(item[0]);
      dataY.push(item[1]);
      let itemX = parseFloat(item[0].toFixed(1));
      let itemY = parseFloat(item[1].toFixed(1));
      if (item[1] <= 0) {
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
    } else {
      swal({
        title: "Incorrecto!",
        text: "La función esta mal",
        icon: "error",
      });
    }
  }else{
    swal({
        title: "Incorrecto!",
        text: "pinta una función",
        icon: "error",
      });
  }
}




