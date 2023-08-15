import React, { createContext, useEffect, useState } from 'react';
import axios from 'axios';
import { searchFilesInGithubRepo } from '../api/github.api';
import {
  TYPE_CONTENT_LETTER,
  TYPE_GITHUB_FILE,
  TYPE_GITHUB_TYPE_FILES,
  TYPE_CONTEXT_GITHUB,
} from '../types/services.types';
import {
  USER_GITHUB,
  REPO_GITHUB,
  KEY_GITHUB,
  LOCAL_STORAGE_NAME_GITHUB_DATA,
  LOCAL_STORAGE_NAME_GITHUB_LETTERS,
  LIMIT_OF_DAYS_TO_MAKE_REQUEST,
} from '../web.config';

/** Contexto que permite crear las propiedades github */
export const GithubContext = createContext<TYPE_CONTEXT_GITHUB>({
  photos: [],
  letters: [],
  githubData: {
    imgs: [],
    letters: [],
  },
  lettersContent: [],
});

interface PropsGithubContextProvider {
  children: React.ReactNode;
}

/** Proveddor de las propiedades necesarias para poder utilizar la informacion de la api de github. */
export const GithubContextProvider = ({ children }: PropsGithubContextProvider) => {
  /** Estados que guardan el contenido de las peticiones para utilizarlas mas adelante */
  const [photos, setPhotos] = useState<TYPE_GITHUB_FILE[]>([]);
  const [letters, setLetters] = useState<TYPE_GITHUB_FILE[]>([]);
  const [bodyLetters, setBodyLetters] = useState<TYPE_CONTENT_LETTER[]>([]);
  const [githubData, setGithubData] = useState<TYPE_GITHUB_TYPE_FILES>({
    imgs: [],
    letters: [],
  });

  /** Realiza una peticion a la api de github, y el resultado guardalo en un estado correspondiente */
  const getDataForRepo = () =>
    searchFilesInGithubRepo(USER_GITHUB, REPO_GITHUB, KEY_GITHUB).then((response) => {
      if (response != undefined && response.imgs.length > 0 && response.letters.length > 0) {
        setGithubData(response);
        setPhotos(response.imgs);
        setLetters(response.letters);
        localStorage.setItem(
          LOCAL_STORAGE_NAME_GITHUB_DATA,
          JSON.stringify({
            DATE: new Date().getTime(),
            IMGS: response.imgs,
            LETTERS: response.letters,
          }),
        );
      }
    });

  /** Obtener el contenido de las cartas extraidas previamente en github */
  const getContentLetter = async () => {
    if (letters.length > 0 && letters != undefined) {
      const contents = [];

      for (let i = 0; i < letters.length; i++) {
        const letter = letters[i];
        const response = await axios.get(letter.url);
        if (response.status === 200)
          contents.push({
            name: letter.name,
            parentFolder: letter.parentFolder,
            content: response.data,
            url: letter.url,
          });
      }

      setBodyLetters(contents);
      localStorage.setItem(
        LOCAL_STORAGE_NAME_GITHUB_LETTERS,
        JSON.stringify({
          DATE: new Date().getTime(),
          BODY_LETTERS: contents,
        }),
      );
    }
  };

  /**
   * Esta funcion compara la fecha actual con una fecha pasada por parametro
   * Retorna el calculo de los dias que an transcurrido desde esa fecha
   */
  const localDateToDays = (dateLocal: number) => {
    const currentDate = new Date().getTime();
    const dateComparate = new Date(dateLocal).getTime();
    const daysElapsed = (currentDate - dateComparate) / (1000 * 60 * 60 * 24);
    return daysElapsed;
  };

  /**
   * Este efecto se encarga de solicitar la informacion de github fotos y cartas
   * Solicita al local storage la informacion previamente guardada como cache
   * Si no existe realiza una peticion que guarde la informacion en cache
   * Si existe revisa que tan antigua es esa informacion y si es mas antigua que el tiempo establesido entonces vuelve a hacer otra peticion para actualizar los datos
   * Si no entonces solamente guarda los datos del cache en el estado github de la web
   */
  useEffect(() => {
    const localGithubData = localStorage.getItem(LOCAL_STORAGE_NAME_GITHUB_DATA);

    if (!localGithubData) getDataForRepo();
    else {
      const githubData = JSON.parse(localGithubData);

      if (githubData) {
        const storedTimestamp: number = githubData.DATE;

        if (localDateToDays(storedTimestamp) <= LIMIT_OF_DAYS_TO_MAKE_REQUEST) {
          const localimgs = githubData.IMGS;
          const localletters = githubData.LETTERS;

          setPhotos(localimgs);
          setLetters(localletters);
        } else getDataForRepo();
      }
    }
  }, []);

  /**
   * Este efecto se encarga de solicitar la informacion del contenido de cartas ubicadas en el repo de github.
   * Solicita al local storage la informacion previamente guardada como cache
   * Si no existe realiza una peticion que guarde la informacion en cache
   * Si existe revisa que tan antigua es esa informacion y si es mas antigua que el tiempo establesido entonces vuelve a hacer otra peticion para actualizar los datos
   * Si no entonces solamente guarda los datos del cache en el estado github de la web
   */
  useEffect(() => {
    const localStoreBodyLetters = localStorage.getItem(LOCAL_STORAGE_NAME_GITHUB_LETTERS);

    if (!localStoreBodyLetters) getContentLetter();
    else {
      const lettersBodyData = JSON.parse(localStoreBodyLetters);

      if (lettersBodyData) {
        const storedTimestamp: number = lettersBodyData.DATE;

        if (localDateToDays(storedTimestamp) <= LIMIT_OF_DAYS_TO_MAKE_REQUEST) {
          const localBodyLetters = lettersBodyData.BODY_LETTERS;
          setBodyLetters(localBodyLetters);
        } else if (lettersBodyData.BODY_LETTERS.lenght < 0) getContentLetter();
        else getContentLetter();
      }
    }
  }, [letters]);

  const types = {
    photos,
    letters,
    githubData,
    lettersContent: bodyLetters,
  };

  return <GithubContext.Provider value={types}>{children}</GithubContext.Provider>;
};
