
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
var limite1 = 1
var limite2 = 2.3


var estaDesarrollo = false;
var estaCalcula = false;
var colorVerde = "#1e8219";
var colorLimite2 = "#214cdd";

//---------------------------Dibuja rectángulo --------------------//

//-----puntos del limote 1


var p1_eps = board.create('point', [0, limite1], {
	name: '',
	fixed: true,
	color: "#0b0eb3",
	size: 5,
});

var p1_eps2 = board.create('point', [0, limite1], {
	name: '',
	fixed: true,
	color: "#ffffff",
	size: 3,
});


var p2_eps = board.create('point', [0, 1], {
	name: '',
	fixed: true,
	color: "#0b0eb3",
	size: 5,
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
//-----puntos del limote 1
function animalimite1() {
	console.log("entro anima limite1");     // Anima la línea del límite L=1
	board.create("line", [[0, limite1], [30, limite1]], {
		straightFirst: false,
		straightLast: false,
		strokeWidth: 1,
		strokeColor: "#5a5ce9"
	});
}

animalimite1()


//-------puntos del limite 2

var limite2_p1_eps = board.create('point', [0, limite2], {
	name: '',
	fixed: true,
	color: "#3bcc13",
	size: 5,
});

var limite2_p1_eps2 = board.create('point', [0, limite2], {
	name: '',
	fixed: true,
	color: "#ffffff",
	size: 3,
});


var limite2_p2_eps = board.create('point', [0, limite2], {
	name: '',
	fixed: true,
	color: "#3bcc13",
	size: 5,
});
var limite2_p2_eps2 = board.create('point', [0, limite2], {
	name: '',
	fixed: true,
	color: "#ffffff",
	size: 3,
});

var limite2_p3_eps = board.create('point', [30, limite2], {
	name: '',
	fixed: true,
	color: "#ffffff"
});
var limite2_p4_eps = board.create('point', [30, limite2], {
	name: '',
	fixed: true,
	color: "#ffffff"
});


board.create('polygon', [limite2_p1_eps, limite2_p2_eps, limite2_p4_eps, limite2_p3_eps], {
	borders: {
		strokeColor: '#3bcc13',
		dash: 2,
	},
	fillOpacity: 0.1,
	fillColor: "#3bcc13",   // Color de la franja de radio épsilon
});

function animalimite2() {
	console.log("entro anima limite1");     // Anima la línea del límite L=1
	board.create("line", [[0, limite2], [30, limite2]], {
		straightFirst: false,
		straightLast: false,
		strokeWidth: 1,
		strokeColor: "#3bcc13"
	});
}
animalimite2()



//--------------------------Anima la sucesión---------------------//

function animaSucesion() {
	console.log("anima sucesion");

	(async () => {
		for (let i = 1; i < 18; i++) {
			await new Promise(resolve => setTimeout(() => {
				board.create('point', [i, calculaCoordenadaY(i)],
					{ name: ' ', color: colorVerde });      // name es para ponerle nombre a los puntos de la sucesión
				resolve();
			}, 300));     // velocidad de la animación
		}
	})();

	(async () => {
		for (let i = 1; i < 18; i++) {
			await new Promise(resolve => setTimeout(() => {
				board.create('point', [i, calculaCoordenadaYLimite2(i)],
					{ name: ' ', color: colorLimite2 });      // name es para ponerle nombre a los puntos de la sucesión
				resolve();
			}, 300));     // velocidad de la animación
		}
	})();

}

function calculaCoordenadaY(i) {
	return i / (i + 1);
}
function calculaCoordenadaYLimite2(i) {
	return ((7 * i) + 1) / ((3 * i) - 1);
}


//-------------------------Anima la región-------------------//

function animaRegion() {

	//------animaRegion limite1
	incX = parseFloat(limite1) + parseFloat(epsilon);
	decX = parseFloat(limite1) - parseFloat(epsilon);
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
	//------animaRegion limite2
	incXLim2 = parseFloat(limite2) + parseFloat(epsilon);
	decXLim2 = parseFloat(limite2) - parseFloat(epsilon);
	limite2_p1_eps.moveTo([0, incXLim2], 250);
	limite2_p1_eps2.moveTo([0, incXLim2], 250);
	limite2_p2_eps.moveTo([0, decXLim2], 250);
	limite2_p2_eps2.moveTo([0, decXLim2], 250);
	limite2_p3_eps.moveTo([30, incXLim2], 250);
	limite2_p4_eps.moveTo([30, decXLim2], 250);

	board.create("line", [[0, incXLim2], [0, decXLim2]], {
		straightFirst: false,
		straightLast: false,
		strokeWidth: 4,                 // Grosor de la linea que representa la vecindad de radio épsilon
		strokeColor: "#3bcc13"          // Color de la línea punteada de la franja de radio épsilon
	});
}

function ejecutarEpsilon() {

	var inputE = document.getElementById('inputEpsilon');

	epsilon = inputE.value;

	animaSucesion();
	animaRegion();

	var inputVerificaN1 = '<input onchange="ejecutarValidacionEpsilonN1()"  type="number" id="inputVerificaN1" value="0" max="3" min="0" step="0.1" >'
	var inputVerificaN2 = '<input onchange="ejecutarValidacionEpsilonN2()"  type="number" id="inputVerificaN2" value="0" max="3" min="0" step="0.1" >'

	var inputHtml = document.getElementById('validaEpsilonTexto');
	var inputEhtmlAccion = document.getElementById('validaEpsilonAccion')

	var imprimeHtml = "<p>  Dada, \\( \\varepsilon \\) =  " + epsilon + " existe \\(n  \\in  \\mathrm{I}\\!\\mathrm{N} \\) tal que para toda,    \\( n \\gt  N     \\) se satisface que,  </p>"



	imprimeHtml = imprimeHtml + "<p>  \\( \\vert  \\frac{n}{n+1}-1  \\vert   \\lt     \\) " + epsilon + "\\( \\Leftrightarrow \\)N1 > " + inputVerificaN1 + " &nbsp;&nbsp;&nbsp;  \\( \\vert  \\frac{(7 x i) + 1)}{(3 x i) - 1)}-\\frac{7}{3}  \\vert   \\lt     \\) " + epsilon + "\\( \\Leftrightarrow \\)N2 > " + inputVerificaN2 + " </p>"



	imprimeHtmlAccion = '<label for="inputVerificaEpsilon">  \\(n \\gt \\) </label> ';

	imprimeHtmlAccion = imprimeHtmlAccion + '<input onchange="ejecutarValidacionEpsilon()"  type="number" id="inputVerificaEpsilon" value="0" max="3" min="0" step="0.1" >';


	inputHtml.innerHTML = imprimeHtml;
	inputEhtmlAccion.innerHTML = imprimeHtmlAccion;
	MathJax.typeset();
}


function ejecutarValidacionEpsilon() {
	var validaEpsilom = document.getElementById("inputVerificaEpsilon");

	var valorValidar = ((1 - epsilon) / epsilon);
	console.log(valorValidar);
	if (valorValidar < parseFloat(validaEpsilom.value)) {
		swal({
			title: "Muy bien!",
			text: "El valor " + validaEpsilom.value + " es correcto.",
			icon: "success"
		});

		incy = parseFloat(limite1) + parseFloat(epsilon);
		decy = parseFloat(limite1) - parseFloat(epsilon);
		board.create('polygon', [[valorValidar, decy], [valorValidar, incy], [30, incy], [30, decy]], {
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

