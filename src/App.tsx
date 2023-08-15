import { useLocation } from 'react-router-dom';
import { Navigation, Footer } from './components/index';
import { Views } from './router/router';
import { EXCLUDE_PATHS_FROM_NAVIGATION_AND_FOOTER } from './web.config';

interface TYPE_VALIDATE_EXCLUDE_PATHS {
  location: string;
  isTrue: React.ReactNode;
  isFalse: React.ReactNode;
}

/** Componente que valida si se encuentra en una ruta valida o no
 * @param {string} location Ruta actual a validar
 * @param {React.ReactDOM} isTrue Valor a retornar si la ruta actual se encuentra entre la lista de rutas excluidas
 * @param {React.ReactDOM} isFalse Valor a retornar si la ruta actual no se encuentra entre la lista de rutas excluidas
 */
const ValidateExcludePaths = ({ location, isTrue, isFalse }: TYPE_VALIDATE_EXCLUDE_PATHS) => {
  return EXCLUDE_PATHS_FROM_NAVIGATION_AND_FOOTER.includes(location) ? isTrue : isFalse;
};

export const App = () => {
  const location = useLocation();

  return (
    <>
      <ValidateExcludePaths location={location.pathname} isTrue="" isFalse={<Navigation />} />

      <main className="min-h-screen">
        <Views />
      </main>

      <ValidateExcludePaths location={location.pathname} isTrue="" isFalse={<Footer />} />
    </>
  );
};
