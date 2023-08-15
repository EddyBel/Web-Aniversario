import { useEffect, useState } from 'react';
import { useGithubContext } from '../hook/context.hook';
import { TYPE_GITHUB_FILE } from '../types/services.types';
import {
  Image,
  Modal,
  ModalContent,
  ModalBody,
  ModalHeader,
  ModalFooter,
  Button,
  useDisclosure,
  Spinner,
} from '@nextui-org/react';

/** Componente que se encarga de renderizar la pagina que muestra las todas las fotos con un layout de Masonry */
export const Album = () => {
  // Contextos y estados utiles para la estructura de la galleria
  // githhub guarda el estado de las peticiones a la api de github en especial recupera las photos de un repositorio
  // namePhoto se encarga de guardar el nombre del archivo foto
  // focusPhoto se encarga de guardar la foto que se hizo click
  // useDisclosure se encarga de guardar los estados que manipulan los modal
  const github = useGithubContext();
  const [photos, setPhotos] = useState<TYPE_GITHUB_FILE[]>();
  const [namePhoto, setNamePhoto] = useState<string>('');
  const [focusPhoto, setFocusPhoto] = useState<string>('');
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Carga todas las fotos de la api de github que cumplan con la condicion de pertenecer al album e&b
  useEffect(() => {
    setPhotos(github?.photos.filter((photo) => photo.parentFolder.toLowerCase().includes('album e&b')));
  }, [github]);

  return (
    <div className="w-full p-10 flex justify-center items-center">
      {photos ? (
        <section className="w-full columns-5 columns-[100px] sm:columns-[200px]">
          {photos.map((photo, index) => (
            <Image
              isBlurred
              width={240}
              onClick={() => {
                setFocusPhoto(photo.url);
                setNamePhoto(photo.name);
                onOpen();
              }}
              src={photo.url}
              alt="NextUI Album Cover"
              className="mb-5 w-full"
              key={`${photo.url}-${index}`}
            />
          ))}
        </section>
      ) : (
        <section className="w-full h-[80vh] flex justify-center items-center">
          <Spinner color="danger" />
        </section>
      )}

      <Modal size={'md'} isOpen={isOpen} onClose={onClose} backdrop="blur">
        <ModalContent className="max-h-[90vh]">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{namePhoto}</ModalHeader>
              <ModalBody className="flex justify-center items-center">
                <Image isBlurred src={focusPhoto} alt="Image cover preview" className="max-h-[60vh]" />
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onClick={onClose}>
                  Close
                </Button>
                <Button
                  color="primary"
                  onPress={() => {
                    const index = photos?.findIndex((photo) => photo.url === focusPhoto);
                    if (index && photos) {
                      const newIndex = index + 1 > photos.length - 1 ? 0 : index + 1;
                      setFocusPhoto(photos ? photos[newIndex].url : focusPhoto);
                    }
                  }}
                >
                  Next
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};
