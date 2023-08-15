import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

// Propiedades que puede recibir el RouterProtector
interface PropsRouteProtector {
  isAllowed: boolean;
  to: string;
  children?: React.ReactNode;
}

/**
 * Este componente es un manejador de ruta que autoriza el acceso a la ruta si se cumple una condicion pasada por parametro
 * @param {boolean} isAllowed Validacion para saber a que ruta redirigir
 * @param {string} to Ruta que usara en caso de ser falsa la validacion
 * @param {React.ReactNode } children Ruta que usara en caso de ser verdadera la validacion
 * @returns {React.ReactNode | Outlet} Retorna un conjunto de rutas o una sola ruta si es necesario.
 */
export const RouteProtector = (props: PropsRouteProtector) => {
  if (!props.isAllowed) return <Navigate to={props.to} />;
  return props.children ? props.children : <Outlet />;
};
