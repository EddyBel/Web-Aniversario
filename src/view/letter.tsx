import { useEffect, useState } from 'react';
import { useGithubContext } from '../hook/context.hook';
import { useParams } from 'react-router-dom';
import { Spinner } from '@nextui-org/react';

export const Letter = () => {
  const { letter } = useParams();
  const { lettersContent } = useGithubContext();
  const [letterContent, setLetterContent] = useState<string[]>();

  useEffect(() => {
    const letterName = letter?.toLowerCase();

    if (letterName && lettersContent) {
      lettersContent.map((letter) => {
        setLetterContent(letter.content.split('\n'));
      });
    }
  }, [lettersContent, letter]);

  return (
    <div className="w-full p-2 sm:p-10">
      <section className="bg-cover bg-no-repeat bg-[url(https://images.pexels.com/photos/4226733/pexels-photo-4226733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] min-h-[500px] rounded-xl w-full animate-fade-up animate-duration-500 animate-normal"></section>
      <section className="w-full max-w-4xl m-auto p-5 sm:p-10 bg-slate-100 rounded-xl shadow-2xl shadow-slate-400 -translate-y-[300px] animate-fadeIn">
        <h1 className="mb-10 text-3xl uppercase text-center text-pink-800">{letter}</h1>
        {letterContent ? (
          letterContent.map((text, index) => (
            <p className="mb-5 text-justify sm:text-start" key={`${text}-${index}`}>
              {text}
            </p>
          ))
        ) : (
          <section>
            <Spinner color="danger" />
          </section>
        )}
      </section>
    </div>
  );
};
