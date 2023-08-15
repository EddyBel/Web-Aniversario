/**
 * Esta constante guarda las rutas que no deben de mostrar o renderizar los componentes navigation y footer
 * Esto para modificar el diseño de la web en rutas especificas
 */
export const EXCLUDE_PATHS_FROM_NAVIGATION_AND_FOOTER = ['/anniversary', '/gallery/photo'];

/** Esta constante guarda los tipos de imagenes permitidos para la galeria */
export const IMGS_FILETYPES = ['jpg', 'png', 'webp', 'web', 'gif'];
/** Esta constante guarda los tipo de archivos permitidos para las cartas */
export const LETTERS_FILETYPES = ['md'];
/** Constante que guarda el nombre de usuario de github que tiene las fotos y cartas */
export const USER_GITHUB: string = import.meta.env.VITE_GITHUB_USERNAME || '';
/** Constante que guarda el nombre del repositorio de github que tiene fotos y cartas */
export const REPO_GITHUB: string = import.meta.env.VITE_GITHUB_REPOSITORIE || '';
/** Constante que guarda la api key para hacer mas peticiones a la api de github */
export const KEY_GITHUB: string = import.meta.env.VITE_GITHUB_TOKEN || '';
/** Esta constante guarda el nombre que usara el local storage para almacenar la informacion de la api de github */
export const LOCAL_STORAGE_NAME_GITHUB_DATA = 'GITHUB_DATA';
/** Esta constante guarda el nombre que usara el local storage para almacenar la informacion de el contenido de las cartas almacenadas en github */
export const LOCAL_STORAGE_NAME_GITHUB_LETTERS = 'GITHUB_LETTERS';
/** Indica el numero de dias que va a esperar la web para volver a hacer una peticion a la api */
export const LIMIT_OF_DAYS_TO_MAKE_REQUEST = 4;
/** Indica el tiempo maximo y minimo que puede vivir una cookie (Tiempo definido en dias) */
export const MAX_AND_MIN_COOKIE_LIFE = [1, 10];

/** Dia de fecha de aniversario */
export const ANNIVERSARY_DAY = import.meta.env.VITE_ANNIVERSARY_DAY || 0;
/** Mes de fecha de aniversario */
export const ANNIVERSARY_MONTH = import.meta.env.VITE_ANNIVERSARY_MONTH || 0;
/** Año de fecha de aniversario */
export const ANNIVERSARY_YEAR = import.meta.env.VITE_ANNIVERSARY_YEAR || 0;

/** Lista que guarda las rutas que se renderizaran y se utilizaran en la web */
export const NAVIGATION = {
  anniversary: {
    name: 'Anniversary',
    path: '/anniversary',
  },
  home: {
    name: 'Inicio',
    path: '/home',
  },
  letters: {
    name: 'Cartas',
    path: '/letters',
  },
  letter: {
    name: 'Carta',
    path: '/letters/:letter',
  },
  album: {
    name: 'Album',
    path: '/album',
  },
  playlist: {
    name: 'Playlist',
    path: '/playlist',
  },
};
