// Inicializar variables y cargar datos del localStorage
let saldo = parseFloat(localStorage.getItem('saldo')) || 1000;
const historialTransacciones = JSON.parse(localStorage.getItem('historialTransacciones')) || [];


// Actualizar el saldo en la interfaz
document.getElementById("saldo").innerText = `Saldo actual: $${saldo.toFixed(2)}`;

// Funciones de orden superior
const filtarTransacciones = (tipo) => historialTransacciones.filter(transaccion => transaccion.tipo === tipo);
const mapearTransacciones = () => historialTransacciones.map(transaccion => `${transaccion.tipo} de $${transaccion.monto} el ${transaccion.fecha}`).join('\n');

// Funcion de manejo del DOM
function actualizarSaldo() {
    document.getElementById("saldo").innerText = `Saldo Actual: $${saldo.toFixed(2)}`;
}

function mostrarFormulario(tipo){
    document.getElementById("formulario").style.display = "block";
    document.getElementById("formulario").dataset.tipo = tipo;
}

function ocultarFormulario() {
    document.getElementById("formulario").style.display ="none";
    document.getElementById("formulario").value = "";
}

// funcion mostrar mensaje
function mostrarMensaje(mensaje){
    document.getElementById("mensaje").innerText = mensaje;
    setTimeout(() => {
        document.getElementById("mensaje").innerText = "";
    }, 3000);
}

// Funciones
function consultarSaldo(){
    mostrarMensaje(`Su saldo actual es: $${saldo.toFixed(2)}`);
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

function realizarTransaccion(){
    const tipo = document.getElementById("formulario").dataset.tipo;
    const monto = parseFloat(document.getElementById("monto").value);

    if (tipo ==="depositar" && monto > 0){
        saldo += monto;
        mostrarMensaje(`Deposito exitoso. Su nuevo saldo es de: $${saldo.toFixed(2)}`);
        agregarAlHistoria("Deposito ", monto);
    }else if (tipo === "retirar" && monto <= saldo && monto > 0) {
        saldo -= monto;
        mostrarMensaje(`Retiro exitoso. Su nuevo saldo es de: $${saldo.toFixed(2)}`);
        agregarAlHistoria("Retiro ", monto)
    }else {
        mostrarMensaje("Ocurrio un error, vuelva a intentarlo.")
    }
    localStorage.setItem('saldo', saldo);
    actualizarSaldo();
    ocultarFormulario();
}


// Asignar eventos a los botones
document.getElementById("consultarSaldo").addEventListener("click", consultarSaldo);
document.getElementById("depositar").addEventListener("click", () => mostrarFormulario("depositar"));
document.getElementById("retirar").addEventListener("click", () => mostrarFormulario("retirar"));
document.getElementById("verHistorial").addEventListener("click", mostrarHistorial);
document.getElementById("confirmarTransaccion").addEventListener("click", realizarTransaccion);
document.getElementById("cancelarTransaccion").addEventListener("click", ocultarFormulario);


