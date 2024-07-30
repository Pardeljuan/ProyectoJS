import { dolarHoy } from  './dolarAPI.js';

// Inicializar variables y cargar datos del localStorage
let saldo = parseFloat(localStorage.getItem('saldo')) || 1000;
let saldoUSD = parseFloat(localStorage.getItem('saldoUSD')) || 0;
const historialTransacciones = JSON.parse(localStorage.getItem('historialTransacciones')) || [];

// Actualizar el saldo en la interfaz
document.getElementById("saldo").innerText = `Saldo actual: $${saldo.toFixed(2)}`;
document.getElementById("saldoUSD").innerText = `Saldo actual: $${saldoUSD.toFixed(2)}`;

// Funciones de orden superior
const filtarTransacciones = (tipo) => historialTransacciones.filter(transaccion => transaccion.tipo === tipo);
const mapearTransacciones = () => historialTransacciones.map(transaccion => `${transaccion.tipo} de $${transaccion.monto} el ${transaccion.fecha}`).join('\n');

// Funcion de manejo del DOM
function actualizarSaldo() {
    document.getElementById("saldo").innerText = `Saldo Actual: $${saldo.toFixed(2)}`;
    document.getElementById("saldoUSD").innerText = `Saldo Actual: $${saldoUSD.toFixed(2)}`;
}

function mostrarFormulario(tipo){
    document.getElementById("formulario").style.display = "block";
    document.getElementById("formulario").dataset.tipo = tipo;
}

function ocultarFormulario() {
    document.getElementById("formulario").style.display ="none";
    document.getElementById("formulario").value = "";
    document.getElementById("conversion").innerText = ""; // Limpiar la conversión cuando se oculta el formulario
}

function mostrarMensaje(mensaje, tipo) {
        Swal.fire({
            text: mensaje,
            icon: tipo,
        })
    }

// Funciones
function consultarSaldo(){
    mostrarMensaje(`Su saldo actual es: $${saldo.toFixed(2)}`, 'info');
}
function consultarUsd(){
    mostrarMensaje(`Su saldo en Dolares es: $ ${saldoUSD.toFixed(2)}`, 'info');
}


function agregarAlHistoria(tipo, monto){
    const transaccion = {
        tipo: tipo,
        monto: monto,
        fecha: new Date().toLocaleDateString()
    };
    historialTransacciones.push(transaccion);
    localStorage.setItem('historialTransacciones', JSON.stringify(historialTransacciones));
}

function mostrarHistorial() {
    const historialDiv = document.getElementById("historial");
    historialDiv.innerHTML = ''; 
  
    if (historialTransacciones.length === 0) {
      historialDiv.innerHTML = "<p>No hay transacciones en el historial.</p>";
    } else {
      // Crear el HTML con clases para cada transacción
      historialTransacciones.forEach(transaccion => {
        const transaccionElement = document.createElement('p');
        transaccionElement.className = transaccion.tipo.toLowerCase(); // Usar tipo en minúsculas como clase
        transaccionElement.textContent = `${transaccion.tipo} de $${transaccion.monto} el ${transaccion.fecha}`;
        historialDiv.appendChild(transaccionElement);
      });
  
      // Mostrar el historial y luego ocultarlo después de 5 segundos
      historialDiv.style.display = "block";
      setTimeout(() => {
        historialDiv.style.display = "none";
      }, 10000); 
    }
  }

const realizarTransaccion = async () => {
    const tipo = document.getElementById("formulario").dataset.tipo;
    const monto = parseFloat(document.getElementById("monto").value);

    if (tipo ==="depositar" && monto > 0){
        saldo += monto;
        mostrarMensaje(`Deposito exitoso. Su nuevo saldo es de: $${saldo.toFixed(2)}`, 'success');
        agregarAlHistoria("Deposito ", monto);
    } else if (tipo === "retirar" && monto <= saldo && monto > 0) {
        saldo -= monto;
        mostrarMensaje(`Retiro exitoso. Su nuevo saldo es de: $${saldo.toFixed(2)}`, 'success');
        agregarAlHistoria("Retiro ", monto)
    } else if (tipo === "comprarDolares" && monto <= saldo && monto > 0){
        const tasaDolar = await dolarHoy();
        if(tasaDolar){
            const dolaresComprados = monto / tasaDolar;
            saldo -= monto;
            saldoUSD += dolaresComprados;
            mostrarMensaje(`Compra exitosa. Usted ha comprado $${dolaresComprados.toFixed(2)} USD.`, 'success');
            agregarAlHistoria("Compra de Dolares", monto);
        } else {
        mostrarMensaje("Ocurrio un error, vuelva a intentarlo.", 'error')
        } 
    }else{
        mostrarMensaje('Ocurrio un error, vuelva a intentarlo', 'error');
    }
    localStorage.setItem('saldo', saldo);
    localStorage.setItem('saldoUSD', saldoUSD);
    actualizarSaldo();
    ocultarFormulario();
}

/* async function comprarDolares(){
    const monto = parseFloat(document.getElementById("monto").value);
    const tasaDolar = await dolarHoy();

    if (tasaDolar && monto <= saldo && monto > 0){
        const dolaresComprados = monto / tasaDolar;
        saldo -= monto;
        saldoUSD += dolaresComprados;
        mostrarMensaje(`Compra exitosa. Usted ha comprado $${dolaresComprados.toFixed(2)} USD.`, 'success');
        agregarAlHistoria("Compra de Dolares", monto);
    }else {
        mostrarMensaje("Ocurrio un error, vuelva a intentarlo.", 'error');
    }
    localStorage.setItem('saldo', saldo);
    localStorage.setItem('saldoUSD', saldoUSD);
    actualizarSaldo()
    ocultarFormulario()
}
 */
function borrarHistorial(){
    Swal.fire({
        title: '¿Estas seguro que desea borrar el historial ?',
        text: 'Una vez borrado no se puede recuperar',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Si, Borrar todo"
    }).then((result) => {
        if(result.isConfirmed){
            localStorage.removeItem('historialTransacciones');
            historialTransacciones.length = 0;
            mostrarMensaje('Historial Borrado', 'success')
        }
    })
    
}
// conversión en tiempo real
document.getElementById("monto").addEventListener("input", async () => {
    const monto = parseFloat(document.getElementById("monto").value);
    const tasaDolar = await dolarHoy();
    if (tasaDolar && monto > 0) {
        const dolares = monto / tasaDolar;
        document.getElementById("conversion").innerText = `Equivale a ${dolares.toFixed(2)} USD`;
    } else {
        document.getElementById("conversion").innerText = "";
    }
});

// Asignar eventos a los botones
document.getElementById("consultarSaldo").addEventListener("click", consultarSaldo);
document.getElementById("depositar").addEventListener("click", () => mostrarFormulario("depositar"));
document.getElementById("retirar").addEventListener("click", () => mostrarFormulario("retirar"));
document.getElementById("verHistorial").addEventListener("click", mostrarHistorial);
document.getElementById("confirmarTransaccion").addEventListener("click", realizarTransaccion);
document.getElementById("cancelarTransaccion").addEventListener("click", ocultarFormulario);
document.getElementById("borrarHistorial").addEventListener("click", borrarHistorial);
document.getElementById("comprarDolares").addEventListener("click", () => mostrarFormulario("comprarDolares"));
document.getElementById("consultarUsd").addEventListener("click", consultarUsd);




