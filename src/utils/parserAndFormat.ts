/**
 * Esta funcion recibe una lista y retorna un elemento aleatorio de la misma
 * @param array Lista desde donde se va a extraer el elemento de manera aleatoria
 * @returns Retorna un elemento aleatorio de la lista
 */
export const getRandomItemFromArray = (array: any[]) => {
  if (array.length <= 0 || array === undefined || array === null) return null;
  return array[Math.floor(Math.random() * array.length)];
};
