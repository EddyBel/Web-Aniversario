import { User, Button } from '@nextui-org/react';
import { FiHeadphones } from 'react-icons/fi';

export const Playlist = () => {
  return (
    <div>
      <section className="p-6">
        <div className="w-full min-h-[500px] relative bg-cover bg-no-repeat bg-center bg-[url(https://daily.jstor.org/wp-content/uploads/2023/01/good_times_with_bad_music_1050x700.jpg)] rounded-xl overflow-hidden">
          <div className="absolute w-full h-full flex flex-col justify-center items-center gap-3 bg-gray-950/70 backdrop-blur-xl p-10">
            <h1 className="text-2xl sm:text-5xl uppercase text-pink-100/70 text-center font-Righteous">
              Nuestra playlist
            </h1>
            <p className="text-lg sm:text-3xl text-gray-300/80 max-w-3xl text-center font-Courgette">
              "Cada canción es un hermoso recuerdo de lo que hemos vivido juntos"
            </p>
            <a href="https://youtube.com/playlist?list=PLE6LAwf7TwbnldTWaNEHJYiQ9vXCeTloY">
              <Button
                className="text-sm sm:text-xl mt-5"
                color="success"
                variant="bordered"
                startContent={<FiHeadphones />}
              >
                Escucha nuestra playlist
              </Button>
            </a>
            <User
              name="Eduardo Rangel"
              description="Playlist count"
              classNames={{ description: 'text-gray-200' }}
              className="absolute bottom-5 left-5 text-gray-100"
              avatarProps={{
                src: 'https://yt3.ggpht.com/yti/AOXPAcUsW0480C0BcrFVcB7PNUauMiJoOGwmi7EB0Yjy=s88-c-k-c0x00ffffff-no-rj',
              }}
            />
          </div>
        </div>
      </section>
    </div>
  );
};
