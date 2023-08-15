import { Spinner } from '@nextui-org/react';
import { useGithubContext } from '../hook/context.hook';
import { useEffect, useState } from 'react';
import { HOME_TABS_CONTENT } from '../content/home';
import { CardLink, TabsComponent } from '../components';
import { FRONT_MILANESO, FRONT_OHMICHI, INTAGRAM_LOGO } from '../assets';

export const Home = () => {
  const { lettersContent } = useGithubContext();
  const [presentation, setPresentation] = useState<string[]>();

  useEffect(() => {
    if (lettersContent) {
      lettersContent.map((letter) => {
        const content = letter.name.toLowerCase().includes('presentation') ? letter.content : '';
        setPresentation(content.split('\n'));
      });
    }
  }, [lettersContent]);

  return (
    <div className="w-full min-h-[100vh]">
      <section className="w-full min-h-[80vh] overflow-x-hidden relative flex justify-center items-center">
        <div className="home-decorator-mesh-gradient w-[300px] h-[300px] sm:w-[600px] sm:h-[300px] absolute blur-[100px] rounded-full z-[-1] animate-fade animate-duration-800 animate-normal"></div>
        <h1 className="text-5xl sm:text-8xl font-Courgette text-pink-600 animate-fade-down animate-duration-800 animate-normal">
          Belem, <br /> Y{' '}
          <span className="font-Righteous text-pink-400 bg-gradient-to-tr to-pink-600 from-pink-400 text-transparent bg-clip-text">
            love
          </span>{' '}
          You
        </h1>
      </section>
      <section
        className="mt-40 mb-32 min-h-screen rounded-tl-[150px] rounded-br-[150px] relative overflow-hidden"
        id="home-content-one"
      >
        <div className="w-full h-full bg-slate-950/90 p-5 pt-52 pb-52 sm:p-20 sm:pt-72 sm:pb-72 text-gray-100">
          <h1 className="text-3xl sm:text-5xl mb-10 font-Righteous text-gray-100/90">Nuestro rincon especial</h1>
          <p className="text-sm sm:text-xl font-Roboto text-gray-100/80">
            He creado un rincón virtual especialmente para ti, un regalo que refleja los momentos hermosos que hemos
            compartido y los que aún están por venir. Esta página es un lugar donde nuestras emociones y recuerdos se
            entrelazan en forma de cartas llenas de cariño, donde las canciones que nos hacen sonreír se convierten en
            playlists para alegrar tus días, y donde cada foto que hemos capturado juntos se convierte en un álbum de
            recuerdos inolvidables.
          </p>
          <section className="mt-32 mb-32 flex justify-center items-center gap-10 flex-wrap">
            <CardLink
              front={INTAGRAM_LOGO}
              username="@belemackermang"
              avatar={FRONT_OHMICHI}
              name="Belem Marin"
              description="Mis pasiones y anhelos se tejen en las fotografías, en los colores que esconden historias y en las letras que sugieren mucho más. Es un espacio donde las risas se transforman en melodías y los suspiros son versos escritos en el aire."
              descriptionPath="Instagram de ohmichi"
              path="https://www.instagram.com/belemackermang/?next=%2F"
            />
            <CardLink
              front={INTAGRAM_LOGO}
              username="@eduard_d18"
              avatar={FRONT_MILANESO}
              name="Eduardo Rangel"
              description="Cada foto es un capítulo de nuestra historia, un reflejo de los lugares que hemos explorado juntos y de los instantes que nos han robado el aliento."
              descriptionPath="Instagram de Milaneso"
              path="https://www.instagram.com/eduard_d18/?next=%2F"
            />
          </section>
          <section className="m-auto mt-14 max-w-5xl">
            <TabsComponent body={HOME_TABS_CONTENT} />
          </section>
          <section className="m-auto mt-52 w-full flex flex-col justify-center items-center gap-5">
            <div className="w-full text-gray-100 rounded-3xl flex flex-col gap-2 max-w-4xl">
              <h1 className="text-gray-200/90 text-2xl sm:text-5xl font-Righteous text-center mb-10">
                Para el amor de mi vida
              </h1>
              {presentation ? (
                presentation.map((text, index) => (
                  <p
                    key={`${text}-${index}`}
                    className="text-sm text-justify sm:text-start sm:text-xl text-gray-200/80 mb-2"
                  >
                    {text}
                  </p>
                ))
              ) : (
                <section>
                  <Spinner color="danger" />
                </section>
              )}
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};
