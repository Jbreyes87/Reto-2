/**
 * Reto JS — La Cafetería Asíncrona
 * Solución anotada
 *
 * Objetivo:
 * - Practicar Promesas con new Promise, resolve y reject.
 * - Simular esperas usando setTimeout.
 * - Orquestar el flujo usando async/await.
 * - Manejar errores con try/catch.
 */

// Menú oficial del reto. Solo estos productos son válidos.
const menu = ["espresso", "cappuccino", "latte", "americano"];

/**
 * Paso 1 — Recibir el pedido.
 *
 * Esta función recibe el nombre de un producto y retorna una Promesa.
 * La promesa espera 3 segundos antes de resolver o rechazar.
 *
 * @param {string} producto Nombre del producto solicitado.
 * @returns {Promise<string>} Promesa con el mensaje del pedido recibido.
 */
function recibirPedido(producto) {
  return new Promise((resolve, reject) => {
    // setTimeout simula una operación asíncrona que demora 3 segundos.
    setTimeout(() => {
      // includes valida si el producto existe dentro del arreglo menu.
      if (menu.includes(producto)) {
        resolve(`Pedido recibido: ${producto}`);
      } else {
        reject(`No tenemos ${producto} en el menú`);
      }
    }, 3000);
  });
}

/**
 * Paso 2 — Preparar el café.
 *
 * Esta función recibe el mensaje generado por recibirPedido.
 * A partir de ese mensaje extrae el producto y simula la preparación.
 *
 * Tiene 20% de probabilidad de fallar para representar una máquina rota.
 *
 * @param {string} mensajePrevio Mensaje recibido desde el paso anterior.
 * @returns {Promise<string>} Promesa con el mensaje del café listo.
 */
function prepararCafe(mensajePrevio) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Math.random() genera un número entre 0 y 1.
      // Si el número es menor a 0.2, ocurre la falla del 20%.
      const maquinaFallo = Math.random() < 0.2;

      if (maquinaFallo) {
        reject("La máquina está rota, no se pudo preparar el café");
        return;
      }

      // El mensaje previo tiene el formato: "Pedido recibido: <producto>".
      // split(": ") separa el texto en dos partes y tomamos la segunda.
      const producto = mensajePrevio.split(": ")[1];

      resolve(`☕ Café listo: ${producto}`);
    }, 3000);
  });
}

/**
 * Paso 3 — Procesar el pedido con async/await.
 *
 * Esta función orquesta todo el flujo:
 * 1. Recibe el pedido.
 * 2. Prepara el café.
 * 3. Entrega el pedido.
 * 4. Captura cualquier error ocurrido en los pasos anteriores.
 *
 * Importante:
 * - No usamos .then() dentro de esta función porque el reto pide async/await.
 *
 * @param {string} producto Nombre del producto a procesar.
 * @returns {Promise<void>}
 */
async function procesarPedido(producto) {
  try {
    const pedidoRecibido = await recibirPedido(producto);
    const cafePreparado = await prepararCafe(pedidoRecibido);

    console.log(`✅ Entregado: ${cafePreparado}`);
  } catch (error) {
    console.log(`❌ Error: ${error}`);
  }
}

/**
 * Ejecuciones de prueba.
 *
 * Puedes cambiar el producto para probar distintos casos:
 * - Producto válido: "latte", "espresso", "cappuccino", "americano".
 * - Producto inválido: "mocha", "té", "chocolate".
 */
procesarPedido("latte");
procesarPedido("espresso");
procesarPedido("cappuccino");
procesarPedido("americano");
procesarPedido("moccha");



// Exportamos las funciones para que también puedan probarse desde otro archivo si se desea.
module.exports = {
  menu,
  recibirPedido,
  prepararCafe,
  procesarPedido,
};
