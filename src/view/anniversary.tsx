import { ChangeEvent, useState } from 'react';
import { LOGO } from '../assets/index';
import { useGlobalContext } from '../hook/context.hook';
import { Navigate } from 'react-router-dom';
import { Button } from '@nextui-org/react';
import { BsSendFill } from 'react-icons/bs';

interface DateStructure {
  day: number;
  month: number;
  year: number;
}

/**
 * Este componente renderiza la pagina de login para dar acceso a la web
 * Si la fecha que ingresa el usario es la correcta entonces deja ingresar a la pagina /home
 */
export const Anniversary = () => {
  // Contextos utilies para manejar la pagina web
  const { extendSesionDuration, checkAnniversaryDate, auth } = useGlobalContext();
  const [error, setError] = useState<boolean>(true);
  const [date, setDate] = useState<DateStructure>({
    day: 0,
    month: 0,
    year: 0,
  });

  /**
   * Esta funcion se ejecuta cada que ocurre un cambio o evento en el input date
   * La funcion toma la fecha ingresada por el usario la convierte en un objeto date y descompone las propiedades
   * Al final guarda las propiedades en el estado date
   */
  const handleDate = (event: ChangeEvent<HTMLInputElement>) => {
    const dateString = event.target.value;
    const dateObject = new Date(dateString);

    setDate({
      day: dateObject.getDate() + 1,
      month: dateObject.getMonth() + 1,
      year: dateObject.getFullYear(),
    });
  };

  /**
   * Esta funcion se ejecuta cuando el chekbox tiene un cambio.
   * La funcion del chekbox es extender la duracion de la sesion de la pagina.
   */
  const handleIndicateSesionExted = (event: ChangeEvent<HTMLInputElement>) =>
    extendSesionDuration(event.target.checked ? event.target.checked : false);

  /** Esta  funcion captura el evento click y lo que hace es ejecutar un comparador de la fecha actual con la previamente guardada, esto para dar autorizacion en la web. */
  const submitDateAnniversary = () => setError(checkAnniversaryDate(date.day, date.month, date.year));

  // Si la autorizacion esta permitida entonces te mueves directamente a /home
  if (auth) return <Navigate to="/home" />;

  // Pagina web para llenar el formulario correspondiente
  return (
    <div className="min-h-screen bg-cover bg-center bg-[url(https://images.pexels.com/photos/1453808/pexels-photo-1453808.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)]">
      <section className="backdrop-blur-lg min-h-screen">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
          <a
            href="/"
            className="flex items-center mb-6 text-2xl font-Poppins font-semibold text-gray-100 uppercase bg-gray-950 rounded-lg w-full sm:max-w-md p-2 flex justify-center items-center"
          >
            <img className="w-8 h-8 mr-2 img-invert" src={LOGO} alt="logo img-invert" />
            Feliz Aniversario
          </a>
          <div className="w-full bg-gray-950 rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl leading-tight tracking-tight md:text-2xl text-gray-200 uppercase text-center font-Poppins">
                ¿Cuando es nuestro aniversario?
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-400 font-Poppins">
                    Ingresa la fecha
                  </label>

                  {/* Entrada para la fecha */}
                  <div className="relative max-w-sm">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3.5 pointer-events-none">
                      <svg
                        className={`w-4 h-4 ${!error ? 'text-red-600' : 'text-gray-500'}`}
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z" />
                      </svg>
                    </div>
                    <input
                      datatype=""
                      type="date"
                      className={`bg-gray-950 border text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5 dark:focus:ring-blue-500 dark:focus:border-blue-500 ${
                        !error ? 'text-red-600 border-red-500' : 'text-gray-600 border-gray-600'
                      }`}
                      placeholder="Select date"
                      required={true}
                      onChange={handleDate}
                    />
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex items-center h-5">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        onChange={handleIndicateSesionExted}
                        className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
                        required={false}
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label htmlFor="remember" className="text-gray-500 dark:text-gray-300">
                        Mantener sesion
                      </label>
                    </div>
                  </div>
                </div>
                {/* <button
                  type="submit"
                  onClick={submitDateAnniversary}
                  className="w-full text-white transition-transform-background duration-200 bg-pink-500 hover:bg-pink-700 hover:-translate-y-1 focus:ring-4 focus:outline-none focus:ring-pink-400 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                >
                  Enviar fecha
                </button> */}
                <Button
                  onClick={submitDateAnniversary}
                  className="w-full"
                  color="danger"
                  variant="bordered"
                  startContent={<BsSendFill />}
                >
                  Valida la fecha
                </Button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
