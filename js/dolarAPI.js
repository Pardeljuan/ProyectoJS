const apiKeyDolar = "faf6ec0ec4b1a228d3388a0f"
const apiUrlDolar = "https://v6.exchangerate-api.com/v6/faf6ec0ec4b1a228d3388a0f/latest/USD"

// funcion para consumir api y obtener el valor actualizado del dolar
async function dolarHoy(){
    try {
        const response = await fetch(apiUrlDolar);
        const data = await response.json();
        const tasaDolar = data.conversion_rates.ARS; // obtener la rasa de cambio de usd a ars
        document.getElementById("valorDolar").innerText = `1 USD = ${tasaDolar.toFixed(2)} ARS`;
        return ;
    }catch(error) {
        console.error("Error al obtener el valor del dolar: ", error);
    }
}
dolarHoy()


// Actualizar valor cada x minutos
setInterval(dolarHoy, 600000);

