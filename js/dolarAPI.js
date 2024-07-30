const apiKeyDolar = "faf6ec0ec4b1a228d3388a0f"
const apiUrlDolar = `https://v6.exchangerate-api.com/v6/${apiKeyDolar}/latest/USD`

// funcion para consumir api y obtener el valor actualizado del dolar
async function dolarHoy(){
    try {
        const response = await fetch(apiUrlDolar);
        const data = await response.json();
        const tasaDolar = data.conversion_rates.ARS; // obtener la rasa de cambio de usd a ars
        document.getElementById("valorDolar").innerText = `1 USD = ${tasaDolar.toFixed(2)} ARS`;
        return tasaDolar; // obtener la tasa de cambio de usd a ars
    }catch(error) {
        console.error("Error al obtener el valor del dolar: ", error);
        return null;
    }
}
dolarHoy()
// Actualizar valor cada x minutos
setInterval(dolarHoy, 600000);
export {dolarHoy };



