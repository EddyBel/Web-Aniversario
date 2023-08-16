import {
  Card,
  CardBody,
  CardHeader,
  Image,
  Spinner,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from '@nextui-org/react';
import { useGithubContext } from '../hook/context.hook';
import { useEffect, useState } from 'react';
import { TYPE_CONTENT_LETTER } from '../types/services.types';
import { LOVE_IMGS } from '../assets/index';
import { getRandomItemFromArray } from '../utils/parserAndFormat';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

/** Componente que renderiza la pagina que enlista todas las cartas obtenidas desde el repositorio */
export const Letters = () => {
  /** Estados para manipular la pagina web */
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { lettersContent } = useGithubContext();
  const [letters, setLetters] = useState<TYPE_CONTENT_LETTER[]>();
  const [letterContent, setLetterContent] = useState<string>();
  const [letterName, setLetterName] = useState<string>();

  /** Carga en el estado las cartas  obtenidas en el repsitorio de github */
  useEffect(() => {
    setLetters(lettersContent);
  }, [lettersContent]);

  return (
    <div className="w-full">
      {/* Renderiza la lista de cartas encontradas en la api de github */}
      {letters ? (
        <section className="w-full m-auto mt-6 p-5 flex flex-wrap justify-center max-w-[950px] gap-4">
          {letters.map((letter) => {
            const ownerOfLetter =
              letter.parentFolder && letter.parentFolder.toLowerCase().includes('bel')
                ? 'Belem Gutierrez'
                : 'Eduardo Rangel';

            const name = letter.name.replace('.md', '');
            const cover =
              getRandomItemFromArray(LOVE_IMGS) ??
              'https://images.pexels.com/photos/7586656/pexels-photo-7586656.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1';

            return (
              <div
                onClick={() => {
                  setLetterContent(letter.content);
                  setLetterName(name);
                  onOpen();
                }}
                key={`letter-${letter.url}`}
              >
                <Card
                  className="py-4 max-w-[280px] mb-4 bg-gradient-to-br to-black from-slate-900 text-gray-400"
                  key={letter.url}
                >
                  <CardHeader className="pb-0 pt-2 w-full px-4 flex-col items-start">
                    <p className="text-tiny uppercase font-bold text-gray-400/80">Por {ownerOfLetter}</p>
                    <h4 className="font-bold text-large text-ellipsis capitalize">{name}</h4>
                  </CardHeader>
                  <CardBody className="overflow-visible py-2">
                    <Image
                      isBlurred
                      alt="Card background"
                      className="object-cover rounded-xl"
                      src={letter.cover ? letter.cover : cover}
                      width={270}
                      // height={220}
                      classNames={{
                        img: 'h-56',
                      }}
                    />
                  </CardBody>
                </Card>
              </div>
            );
          })}
        </section>
      ) : (
        <section className="w-full min-h-[70vh] flex justify-center items-center">
          <Spinner color="danger" />
        </section>
      )}

      {/* Modal que muestra el contenido de la carta */}
      <Modal scrollBehavior="inside" backdrop="blur" size={'md'} isOpen={isOpen} onClose={onClose}>
        <ModalContent className="bg-black text-gray-400">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1 uppercase text-pink-700 font-EduSa">
                {letterName ? letterName : 'Buscando carta'}
              </ModalHeader>
              <ModalBody>
                {letterContent ? (
                  <ReactMarkdown>{letterContent}</ReactMarkdown>
                ) : (
                  <section className="w-full p-10 flex justify-center items-center">
                    <Spinner color="danger" />
                  </section>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Link
                  to={`/letters/${letterName}`}
                  className="p-2 pl-4 pr-4 bg-pink-600 text-pink-300 hover:bg-pink-900 transition-background duration-300 rounded-xl"
                >
                  View
                </Link>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
