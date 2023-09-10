
JXG.Options.board.minimizeReflow = 'none'
let limiteSucesion = 0;
var board = JXG.JSXGraph.initBoard('edvi', {
	boundingbox: [-1, 6, 1, -1], //xmin,ymax,xmax,ymin			
	keepaspectratio: false,
	axis: false,
	grid: false,
	showCopyright: false,
	zoomX: 1.2,  //En PC y iPad 1.5 es suficiente
	zoomY: 5,  //En PC y iPad 1.5 es suficiente
	showNavigation: true,
	needsRegularUpdate: false,
	fixed: true,
	numberPointsLow: 100,
	numberPointsHigh: 100,
	pan: {
		needShift: false,
		needTwoFingers: false,
		enabled: false
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



let isAnimating = true; // Bandera para controlar la animación

function animaSucesion() {
	console.log("anima sucesion");

	(async () => {
		let i = 1;
		while (isAnimating) {
			await new Promise(resolve => setTimeout(() => {
				let puntos = parseFloat(i / (i + 1));
				console.log("puntos: ", puntos, " limiteSucesion: ", limiteSucesion);
				if (i <= limiteSucesion && puntos < (1 - epsilon)) {
					board.create('point', [0, puntos], { name: ' ', color: colorVerde });
				} else {
					isAnimating = false; // Detener la animación cuando no se cumple la condición
				}
				resolve();
				i++;
			}, 300)); // velocidad de la animación
		}
	})();


}

//-------------------------Anima la región-------------------//


let existeLineLimite = false;
function changeEpsilon() {

	epsilon = parseFloat(document.getElementById('inputEpsilon').value);

	if (existeLineLimite) {
		board.removeObject("limiteLine2");
	}

	let linelimite = board.create("line", [[-0.02, (1 - epsilon)], [0.02, (1 - epsilon)]], {
		straightFirst: false,
		straightLast: false,
		strokeWidth: 1,
		strokeColor: "red",
		name: "limiteLine2"
	});
	existeLineLimite = true;




}



function ejecutarEpsilon() {

	animaSucesion();
	board.create("line", [[0, 1], [0, 1]], {
		straightFirst: false,
		straightLast: false,
		strokeWidth: 4,                 // Grosor de la linea que representa la vecindad de radio épsilon
		strokeColor: "#0b0eb3"          // Color de la línea punteada de la franja de radio épsilon
	});
	MathJax.typeset();
}


function ejecutarN() {
	var valorN = document.getElementById("inputVerificaEpsilon");
	limiteSucesion = parseInt(valorN.value);
	var valorValidar = (1 - epsilon);
	console.log(valorValidar);

	limpiarGrafica();
	swal({
		title: "Muy bien!",
		text: "El valor " + valorN.value + " es correcto.",
		icon: "success"
	});

	incy = parseFloat(limite) + parseFloat(epsilon);
	decy = parseFloat(limite) - parseFloat(epsilon);
	board.create('polygon', [[valorValidar, decy], [valorValidar, incy], [30, incy], [30, decy]], {
		borders: {
			strokeColor: 'black',
			dash: 2,
		},
		fillOpacity: 0.08,
		fillColor: "0b268a",
		vertices: { visible: false }
	});





}


