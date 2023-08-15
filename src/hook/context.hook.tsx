import React from 'react';
import { GlobalContext } from '../context/global.context';
import { GithubContext } from '../context/github.context';

/** Esta fucion permite obtener las propiedades guardados en el contexto */
export const useGlobalContext = () => React.useContext(GlobalContext);

/** Esta funcion permite obtener las propiedades guardadas en el contexto de github */
export const useGithubContext = () => React.useContext(GithubContext);
