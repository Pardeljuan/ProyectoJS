# Simulador de Cajero Automático

## Descripción

Este proyecto es un simulador de cajero automático que permite realizar operaciones básicas como consultar saldo, realizar depósitos, extracciones, comprar dólares y ver el historial de transacciones. Está desarrollado utilizando HTML, CSS (SASS) y JavaScript, consumiendo una API externa para obtener la cotización del dólar en tiempo real.

## Características

- **Consultar Saldo:** Muestra el saldo actual en pesos.
- **Realizar Depósitos:** Permite ingresar una cantidad en pesos al saldo.
- **Realizar Extracciones:** Permite retirar una cantidad en pesos del saldo.
- **Comprar Dólares:** Permite comprar dólares utilizando el saldo en pesos, con cotización en tiempo real.
- **Consultar Saldo en Dólares:** Muestra el saldo actual en dólares.
- **Ver Historial de Transacciones:** Muestra un historial de todas las transacciones realizadas.
- **Borrar Historial de Transacciones:** Permite borrar el historial de transacciones con una confirmación previa.

## Tecnologías Utilizadas

- **HTML5**
- **CSS3 (SASS)**
- **JavaScript ES6+**
- **Fetch API** para consumir la API de cotización del dólar.
- **LocalStorage** para persistencia de datos.
- **SweetAlert2** para alertas y confirmaciones.

## Estructura del Proyecto

- `index.html`: Archivo principal del proyecto que contiene la estructura básica del HTML.
- `css/`: Carpeta que contiene los archivos de estilos, incluyendo los archivos SASS.
  - `style.scss`: Archivo SASS principal.
  - `style.css`: Archivo CSS compilado.
- `js/`: Carpeta que contiene los archivos JavaScript.
  - `main.js`: Lógica principal del simulador.
  - `dolarAPI.js`: Módulo para obtener la cotización del dólar.
- `README.md`: Este archivo.
