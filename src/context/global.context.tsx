import React, { createContext, useState } from 'react';
import { CreateCookie, GetCookie } from '../utils/cookies';
import { ANNIVERSARY_DAY, ANNIVERSARY_MONTH, ANNIVERSARY_YEAR } from '../web.config';

type ContextGlobal = {
  auth: boolean;
  sesionDurationInDays: number;
  anniversaryDate: string;
  anniversaryDateDay: number;
  anniversaryDateMonth: number;
  anniversaryDateYear: number;
  deltaAnniversaryDate: {
    year: number;
    month: number;
    day: number;
    minutes: number;
    seconds: number;
  };
  temporalPhoto: string;
  checkAnniversaryDate: (day: number, month: number, year: number) => boolean;
  updateTemporalPhoto: (photo: string) => void;
  extendSesionDuration: (isExtend: boolean) => void;
  getDateDifference: () => {
    year: number;
    month: number;
    day: number;
    minutes: number;
    seconds: number;
  };
};

type PropsGlobalContextProvider = {
  children: React.ReactNode;
};

/** Contexto que manega propiedades globales queseran necesarias en la web */
export const GlobalContext = createContext<ContextGlobal>({
  auth: false,
  sesionDurationInDays: 1,
  anniversaryDate: '',
  anniversaryDateDay: 0,
  anniversaryDateMonth: 0,
  anniversaryDateYear: 0,
  deltaAnniversaryDate: {
    year: 0,
    month: 0,
    day: 0,
    minutes: 0,
    seconds: 0,
  },
  temporalPhoto: '',
  checkAnniversaryDate: () => false,
  updateTemporalPhoto: () => {},
  extendSesionDuration: () => {},
  getDateDifference: () => {
    return {
      year: 0,
      month: 0,
      day: 0,
      minutes: 0,
      seconds: 0,
    };
  },
});

/** Componente que provee a la web de esas variables necesarias */
export const GlobalContextProvider = ({ children }: PropsGlobalContextProvider) => {
  // Variables y estados que manejaran ciertos valores en la web
  const cookieAuth: boolean = GetCookie('validate_anniversary')
    ? GetCookie('validate_anniversary') === 'true'
      ? true
      : false
    : false;
  const [auth, setAuth] = useState<boolean>(cookieAuth);
  const [deltaAnniversaryDate, setDeltaAnniversaryDate] = useState({
    year: 0,
    month: 0,
    day: 0,
    minutes: 0,
    seconds: 0,
  });
  const [temporalPhoto, setTemporalPhoto] = useState<string>('');
  const [sesionDuration, setSesionDuration] = useState<number>(1);

  const anniversaryDateYear = ANNIVERSARY_YEAR;
  const anniversaryDateMonth = ANNIVERSARY_MONTH;
  const anniversaryDateDay = ANNIVERSARY_DAY;

  /**
   * Esta funcion valida si la fecha pasada por parametro es igual a la establecida.
   *
   * @param day Dia a comparar
   * @param month Mes a comparar
   * @param year Año a comparar
   */
  const checkAnniversaryDate = (day: number, month: number, year: number) => {
    const userAnniversaryDateObject = new Date(year, month - 1, day);
    const anniversaryDateObject = new Date(anniversaryDateYear, anniversaryDateMonth - 1, anniversaryDateDay);
    const anniversaryValidate = userAnniversaryDateObject.getTime() === anniversaryDateObject.getTime();

    setAuth(anniversaryValidate);
    CreateCookie('validate_anniversary', `${anniversaryValidate}`, sesionDuration);
    return anniversaryValidate;
  };

  /** Esta funcion calculara la diferencia en años meses y dias que existe entre la fecha de aniversario y la fecha actual  */
  const getDateDifference = () => {
    // Obtener las fechas a trabajar
    const currentDate = new Date();
    const anniversaryDateObject = new Date(anniversaryDateYear, anniversaryDateMonth - 1, anniversaryDateDay);

    // Calcular la diferencia en milisegundos entre ambas fechas
    const timeDifference = currentDate.getTime() - anniversaryDateObject.getTime();

    const milisecondsInYear = 1000 * 60 * 60 * 24 * 365;
    const milisecondsInMonth = 1000 * 60 * 60 * 24 * 30;
    const milisecondsInDay = 1000 * 60 * 60 * 24;
    const milisecondsInMin = 1000 * 60;

    // Calcular las diferencias en años, meses, días, minutos y segundos
    const yearDifference = Math.floor(timeDifference / milisecondsInYear);
    const remainingTime = timeDifference - yearDifference * milisecondsInYear;

    const monthDifference = Math.floor(remainingTime / milisecondsInMonth);
    const remainingTime2 = remainingTime - monthDifference * milisecondsInMonth;

    const dayDifference = Math.floor(remainingTime2 / milisecondsInDay);
    const remainingTime3 = remainingTime2 - dayDifference * milisecondsInDay;

    const minuteDifference = Math.floor(remainingTime3 / milisecondsInMin);
    const remainingTime4 = remainingTime3 - minuteDifference * milisecondsInMin;

    const secondDifference = Math.floor(remainingTime4 / 1000);

    const deltaTime = {
      year: yearDifference,
      month: monthDifference,
      day: dayDifference,
      minutes: minuteDifference,
      seconds: secondDifference,
    };

    setDeltaAnniversaryDate(deltaTime);
    return deltaTime;
  };

  /** Funcion que actualiza el estado de la imagen global */
  const updateTemporalPhoto = (photo: string) => setTemporalPhoto(photo);

  /** Funcion que aumenta la duracion de la secion iniciada, la secion es aumentada a 10 dias */
  const extendSesionDuration = (isExtend: boolean) => (isExtend ? setSesionDuration(10) : setSesionDuration(1));

  /** Valores a servir en el contexto global de la web */
  const values = {
    auth,
    anniversaryDate: `${anniversaryDateDay}/${anniversaryDateMonth}/${anniversaryDateYear}`,
    anniversaryDateDay,
    anniversaryDateMonth,
    anniversaryDateYear,
    checkAnniversaryDate,
    deltaAnniversaryDate,
    getDateDifference,
    temporalPhoto,
    updateTemporalPhoto,
    extendSesionDuration,
    sesionDurationInDays: sesionDuration,
  };

  return <GlobalContext.Provider value={values}> {children}</GlobalContext.Provider>;
};
