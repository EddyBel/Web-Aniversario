import { Routes as Switch, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { NAVIGATION } from '../web.config';
import { useGlobalContext } from '../hook/context.hook';
import { RouteProtector } from './router.protector';
import { Anniversary } from '../view/anniversary';
import { Home } from '../view/home';
import { Letters } from '../view/letters';
import { Album } from '../view/album';
import { Playlist } from '../view/playlist';
import { Letter } from '../view/letter';
import { Error404 } from '../view/404';

/** Este es un componente que se encarga de que cada cambio de ruta el scroll regrese al inicio */
const ScrollToTop = () => {
  // Captura el cambio de ruta de la web
  // Si la web cambia entones mueve el scroll al inicio
  // No retornes ningun componente
  const location = useLocation();
  useEffect(() => window.scrollTo(0, 0), [location]);
  return null;
};

/**
 * Este componente se encargara de manejar las paginas y rutas de paginas de la web
 * - El componente cuenta con un manejador de rutas que solo autoriza las rutas si cumple las caracteristicas
 * - El componente cuenta con un manjeador de scroll si cambia de ruta el scroll regresa al inicio
 */
export const Views = () => {
  // Estados que pueden manejar autorizaciones
  const { auth } = useGlobalContext();

  return (
    <>
      <Switch>
        {/* Pagina de autenticacion */}
        <Route element={<RouteProtector isAllowed={!auth} to="/home" />}>
          <Route path={NAVIGATION.anniversary.path} element={<Anniversary />} />
        </Route>

        {/* Estas rutas seran redirigidas a la autenticacion si el usario aun no se autentica */}
        <Route element={<RouteProtector isAllowed={auth} to="/anniversary" />}>
          <Route path={NAVIGATION.home.path} element={<Home />} />
          <Route path={NAVIGATION.letters.path} element={<Letters />} />
          <Route path={NAVIGATION.letter.path} element={<Letter />} />
          <Route path={NAVIGATION.album.path} element={<Album />} />
          <Route path={NAVIGATION.playlist.path} element={<Playlist />} />
        </Route>

        {/* Estas rutas seran redirigidas en automatico a la HOME PAGE */}
        <Route element={<RouteProtector isAllowed={false} to="/home" />}>
          <Route path="/" element={<></>} />
        </Route>

        {/* Pagina que indica un error al buscar la web */}
        <Route path="*" element={<Error404 />} />
      </Switch>
      {/* Componente que rediriger a la parte inicial de la web */}
      <ScrollToTop />
    </>
  );
};
