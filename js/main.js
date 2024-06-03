let saldo= 1000
const historialTrans = [];

function consultarSaldo() {
    alert("Su saldo actual es : $ " + saldo)
    console.log("Saldo consultado: $" + saldo)
}

function agregarHistorial(tipo, monto){
    const transaccion = {
        tipo: tipo,
        monto: monto,
    };
    historialTrans.push(transaccion)
}

function mostrarHistorial(){
    if(historialTrans === 0){
        alert("No existen transacciones pervias")
        console.log("No hay historial")
    }else{
        let mensajeHistoria = "Historial de transacciones: \n"
        for(let i = 0 ; i <historialTrans.length; i++){
            mensajeHistoria += i+1 + "- " + historialTrans[i].tipo + " de $" +  historialTrans[i].monto + "\n"
        }
        alert(mensajeHistoria)
    }
}

function depositarDinero() {
    let monto = parseFloat(prompt("Ingrese monto a depositar: "))
    if( monto >  0){
        let confirmar = confirm("¿Esta seguro que quiere depositar: $" + monto + " ?")
        if(confirmar){
            saldo = saldo + monto 
            alert("Deposito exitoso, su saldo acutal es de : $ " + saldo)
            console.log("Deposito de : $" + monto )
            console.log("Saldo final : $" + saldo)  
            agregarHistorial("Deposito", monto)  
        }else{
            alert("Deposito cancelador")
            console.log("Se cancelo el deposito")
        }
    }else{
        alert("Monto invalido, ingrese un valor correcto.")
        console.log("Error monto incalido")
    }
}

function retirarDinero(){
    let retiro = parseFloat(prompt("Ingrese un monto de retiro: "))
    if (retiro <= saldo){
        let confirmar = confirm("¿Esta seguro que quiere retirar: $" + retiro + " ?")
        if(confirmar){
            saldo = saldo - retiro
            alert("Se genero el retiro con exito")
            alert("Su saldo disponible es de : $ " + saldo)
            console.log("Retiro: $" + retiro + " Saldo actual : $" + saldo)
            agregarHistorial("Retiro", saldo)
        }else{
            alert("Retiro cancelado")
            console.log("Se cancelo el retiro")
        }
    }else{
        alert("Dinero insuficiente. Coloque un monto correcto.")
        alert("Dinero disponible: $" + saldo)
        console.log("Monto no valido para retiro")
    }   
}

function menuCajero(){
    let opcion;
    do {
        opcion = prompt("Seleccione una opcion: \n1. Consultar saldo \n2. Depositar Dinero \n3. Retirar dinero \n4. Mostrar historial de transacciones. \n5. Salir")
        switch (opcion) {
            case "1" :
                consultarSaldo();
                break;
            case "2" :
                depositarDinero();
                break;
            case "3" :
                retirarDinero();
                break;
            case "4" :
                mostrarHistorial();
                break;
            case "5":
                alert("Gracias por usar la app.");
            default :
            alert("Opcion invalida. Vuelva a intentarlo.");
        }
    } while (opcion !== "5")
}

menuCajero()

