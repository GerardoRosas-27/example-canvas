
/*  <math> (a_n)_{n\in{\mathbb N}}</math> */

const tex1 = document.getElementById("ahorro");
const tex2 = document.getElementById("anios");
const respuesta = document.getElementById("resp");
const btnCalcular = document.getElementById("cal");
let ahorros = [];


var board = JXG.JSXGraph.initBoard('box4', { axis: true, boundingbox: [-1, 6, 11, -1] });
var seq = board.create('curve', [[], []], { strokeColor: 'red' });
var n;

var seq_add = function () {
  var val = a_n(n);
  seq.dataX.push(n);
  seq.dataY.push(val);
  n++;
};

var txt1 = board.create('text', [8, 2, function () { return 'n=' + (seq.dataX.length - 1) + ': value = ' + seq.dataY[seq.dataY.length - 1]; }], { strokeColor: 'green' });

var TO;

var approx = function () {
  seq_add();
  board.update();
  if (n <= 20) {
    TO = setTimeout(approx, 500);
  }
};

var a_n;
var start_approx = function () {
  var txtraw = document.getElementById('input').value;
  a_n = board.jc.snippet(txtraw, true, 'n', true);
  seq.dataX = [];
  seq.dataY = [];
  n = parseInt(document.getElementById('startval').value);
  approx();
}

var clear_all = function () {
  clearTimeout(TO);
};




