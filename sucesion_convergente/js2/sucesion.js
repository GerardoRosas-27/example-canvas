
JXG.Options.board.minimizeReflow = 'none'

var board = JXG.JSXGraph.initBoard('edvi', {
	boundingbox: [-1, 4, 20, -1], //xmin,ymax,xmax,ymin			
	keepaspectratio: false,
	axis: false,
	grid: false,
	showCopyright: false,
	zoomX: 1.2,  //En PC y iPad 1.5 es suficiente
	zoomY: 1.2,  //En PC y iPad 1.5 es suficiente
	showNavigation: true,
	needsRegularUpdate: false,
	fixed: true,
	numberPointsLow: 100,
	numberPointsHigh: 100,
	pan: {
		needShift: false,
		needTwoFingers: false,
		enabled: false
	},
	zoom: {
		factorX: 1,
		factorY: 1,
		wheel: false,
	}
});

//-----------------------------Dibuja ejes----------------------//

var ejeX = board.create('axis', [[0, 0], [1, 0]], {

	ticks: {
		drawZero: false,
		ticksDistance: 0.5,
		minorTicks: 5,
		majorHeight: 10,
		label: { offset: [-5, -15] }
	}

});

ejeX.removeAllTicks();

board.create('ticks', [ejeX, 1], { // The number here is the distance between Major ticks
	grid: false,
	strokeColor: '#ccc',
	majorHeight: 12, // Need this because the JXG.Options one doesn't apply
	drawLabels: true, // Needed, and only works for equidistant ticks
	label: { offset: [-4, -15] },
	minorTicks: 0, // The NUMBER of small ticks between each Major tick
	drawZero: false
}
);

var ejeY = board.create('axis', [[0, 0], [0, 1]], {

	ticks: {
		minorTicks: 5,
		ticksDistance: 0.1,
		majorHeight: 20,
		label: { offset: [-30, -1] },
		drawZero: false
	}

});


var epsilon = 0
var limite = 1

var estaDesarrollo = false;
var estaCalcula = false;
var colorVerde = "#1e8219";

//---------------------------Dibuja rectángulo --------------------//

var p1_eps = board.create('point', [0, 1], {
	name: '',
	fixed: true,
	color: "#0b0eb3",
	size: 3,
});
var p1_eps2 = board.create('point', [0, 1], {
	name: '',
	fixed: true,
	color: "#ffffff",
	size: 3,
});


var p2_eps = board.create('point', [0, 1], {
	name: '',
	fixed: true,
	color: "#0b0eb3",
	size: 3,
});
var p2_eps2 = board.create('point', [0, 1], {
	name: '',
	fixed: true,
	color: "#ffffff",
	size: 3,
});

var p3_eps = board.create('point', [30, 1], {
	name: '',
	fixed: true,
	color: "#ffffff"
});
var p4_eps = board.create('point', [30, 1], {
	name: '',
	fixed: true,
	color: "#ffffff"
});


board.create('polygon', [p1_eps, p2_eps, p4_eps, p3_eps], {
	borders: {
		strokeColor: 'blue',
		dash: 2,
	},
	fillOpacity: 0.1,
	fillColor: "purple",   // Color de la franja de radio épsilon
});



function animaLimite() {
	console.log("entro anima limite");     // Anima la línea del límite L=1
	board.create("line", [[0, limite], [30, limite]], {
		straightFirst: false,
		straightLast: false,
		strokeWidth: 1,
		strokeColor: "#5a5ce9"
	});
}


animaLimite()

//--------------------------Anima la sucesión---------------------//

function animaSucesion() {
	console.log("anima sucesion");

	(async () => {
		for (let i = 1; i < 18; i++) {
			await new Promise(resolve => setTimeout(() => {
				board.create('point', [i, function (x) {
					return i / (i + 1);
				}], { name: ' ', color: colorVerde });      // name es para ponerle nombre a los puntos de la sucesión
				resolve();
			}, 300));     // velocidad de la animación
		}
	})();

}

//-------------------------Anima la región-------------------//

function animaRegion() {
	incX = parseFloat(limite) + parseFloat(epsilon);
	decX = parseFloat(limite) - parseFloat(epsilon);
	p1_eps.moveTo([0, incX], 250);
	p1_eps2.moveTo([0, incX], 250);
	p2_eps.moveTo([0, decX], 250);
	p2_eps2.moveTo([0, decX], 250);
	p3_eps.moveTo([30, incX], 250);
	p4_eps.moveTo([30, decX], 250);
	board.create("line", [[0, incX], [0, decX]], {
		straightFirst: false,
		straightLast: false,
		strokeWidth: 4,                 // Grosor de la linea que representa la vecindad de radio épsilon
		strokeColor: "#0b0eb3"          // Color de la línea punteada de la franja de radio épsilon
	});
}

function changeEpsilon() {
	
	var inputE = document.getElementById('inputEpsilon').value;
	epsilon = document.getElementById('inputEpsilon').value;
	console.log("epsilon: ", inputE)

	var epsilonChange1 = document.getElementById('epsilonChange1');
	var epsilonChange2 = document.getElementById('epsilonChange2');

	if (epsilonChange1 && epsilonChange2) {
		epsilonChange1.innerHTML = inputE;
		epsilonChange2.innerHTML = inputE;
	} else {
		console.error("No se encontró el elemento con el id 'epsilonChange1'.");
	}

	animaRegion()

}


function ejecutarEpsilon() {

	animaSucesion();
	
	MathJax.typeset();
}


function ejecutarValidacionN() {
	var validaEpsilom = document.getElementById("inputVerificaEpsilon");
    let NInicio = parseInt(validaEpsilom.value); 
	var valorValidar = ((1 - epsilon) / epsilon);
	console.log(valorValidar);
	limpiarGrafica();
	if (valorValidar < parseFloat(validaEpsilom.value)) {
		
		swal({
			title: "Muy bien!",
			text: "El valor " + validaEpsilom.value + " es correcto.",
			icon: "success"
		});

		incy = parseFloat(limite) + parseFloat(epsilon);
		decy = parseFloat(limite) - parseFloat(epsilon);
		board.create('polygon', [[NInicio + 1 , decy], [NInicio + 1, incy], [30, incy], [30, decy]], {
			borders: {
				strokeColor: 'black',
				dash: 2,
			},
			fillOpacity: 0.08,
			fillColor: "0b268a",
			vertices: { visible: false }
		});
		

	} else {
		swal({
			title: "Ups! Revisa tus cálculos!",
			text: "El valor " + validaEpsilom.value + " no es correcto.",
			icon: "error"
		});
	}

}

function limpiarGrafica() {
	while (board.objects.length > 0) {
		board.removeObject(board.objects[0]); // Elimina el primer objeto en cada iteración
	}
	board.update(); // Actualiza el tablero
}

