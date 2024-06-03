let saldo= 1000

function consultarSaldo() {
    alert("Su saldo actual es : $ " + saldo)
    console.log("Saldo consultado: $" + saldo)
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
        opcion = prompt("Seleccione una opcion: \n1. Consultar saldo \n2. Depositar Dinero \n3. Retirar dinero \n4. Salir")
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
                alert("Gracias, vuelva pronto.");
                break;
            default :
            alert("Opcion invalida. Vuelva a intentarlo.");
        }
    } while (opcion !== "4")
}

menuCajero()

