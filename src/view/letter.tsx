import { useEffect, useState } from 'react';
import { useGithubContext } from '../hook/context.hook';
import { useParams } from 'react-router-dom';
import { Spinner } from '@nextui-org/react';
import ReactMarkdown from 'react-markdown';
import { MDComponents } from '../markdown';

export const Letter = () => {
  const { letter } = useParams();
  const { lettersContent } = useGithubContext();
  const [letterContent, setLetterContent] = useState<string>();

  useEffect(() => {
    const letterName = letter?.toLowerCase();

    if (letterName && lettersContent) {
      lettersContent.map((dataLetter) => {
        if (dataLetter.name.toLocaleLowerCase().includes(letterName)) setLetterContent(dataLetter.content);
      });
    }
  }, [lettersContent, letter]);

  return (
    <div className="w-full p-2 sm:p-10">
      <section className="bg-cover bg-no-repeat bg-[url(https://images.pexels.com/photos/4226733/pexels-photo-4226733.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1)] min-h-[500px] rounded-xl w-full animate-fade-up animate-duration-500 animate-normal"></section>
      <section className="w-full max-w-4xl m-auto p-5 sm:p-10 bg-black text-gray-400 rounded-xl -translate-y-[300px] animate-fadeIn">
        <h1 className="mb-10 text-3xl uppercase text-center font-Courgette text-pink-500/80">{letter}</h1>
        {letterContent ? (
          <ReactMarkdown components={MDComponents}>{letterContent}</ReactMarkdown>
        ) : (
          <section>
            <Spinner color="danger" />
          </section>
        )}
      </section>
    </div>
  );
};
