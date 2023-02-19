const tex1 = document.getElementById("ahorro");
const tex2 = document.getElementById("anios");
const respuesta = document.getElementById("resp");
const btnCalcular = document.getElementById("calcular");


btnCalcular.addEventListener('click', calcular);

let ahorros = [ ];


function calcular() {

    const inversionIni = parseFloat(tex1.value);
    const t = parseFloat(tex2.value);

    let checked1 = document.getElementById('chec1').checked;
    let checked2 = document.getElementById('chec2').checked;
    let checked3 = document.getElementById('chec3').checked;


    if (checked1 === true) {

        alert("Tu fondo es conservador")

    } else {
        if (checked2 === true) {

            alert("Tu fondo es muy bueno, pero tienes riesgo de perderlo todo")
        } else {
            if (checked3 === true) {

                alert("Ganarás en dólares al tipo de cambio actual")
            }
        }
    }
    
    if (t < 5) {

        const resultado = inversionIni * (1 + (.05 * t));
        respuesta.innerText = resultado;

        for (let i = 1; i <= t; i++) {
            alert("Tu ahoroo en el año " + i + " es: " + inversionIni * (1 + .05 * i));
            ahorros.push(inversionIni * (1 + .05 * i));
            console.log("Tu ahorro en cada año fue: " + ahorros);
        
        }

    } else {

        const resultado = inversionIni * (1 + (.1 * t));
        respuesta.innerText = resultado;

        for (let i = 1; i <= t; i++) {
            alert("Tu ahoroo en el año " + i + " es: " + inversionIni * (1 + .1 * i));
            ahorros.push (inversionIni * (1 + .1 * i));
            console.log("Tu ahorro en cada año fue: " + ahorros);

        }
       
    }
}

