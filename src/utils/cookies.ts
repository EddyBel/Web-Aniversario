import Cookies from 'js-cookie';

/**
 * Esta funcion crea una cookie con los datos pasados por parametro
 *
 * @param nameCookie Nombre de la cookie
 * @param valueCookie Valor de la cookie
 * @param expireCookie Tiempo de expiracion de la cookie en dias
 */
export const CreateCookie = (nameCookie: string, valueCookie: string, expireCookie: number = 1) => {
  Cookies.set(nameCookie, valueCookie, { expires: expireCookie });
};

/**
 * Esta funcion busca una cookie y retorna su valor
 *
 * @param nameCookie Nombre de la cookie a recuperar
 * @returns Valor de la cookie encontrada
 */
export const GetCookie = (nameCookie: string) => Cookies.get(nameCookie);
