export const Footer = () => {
  return (
    <footer className="rounded-lg shadow bg-gray-950">
      <div className="w-full mx-auto max-w-screen-xl p-4 md:flex md:items-center md:justify-between">
        <span className="text-sm text-gray-500 sm:text-center">
          © 2023{' '}
          <a href="/" className="hover:underline">
            EddyBel™
          </a>
          . All Rights Reserved.
        </span>
        <ul className="flex flex-wrap items-center mt-3 text-sm font-medium text-gray-500 sm:mt-0">
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6 ">
              Github
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Instagram
            </a>
          </li>
          <li>
            <a href="#" className="mr-4 hover:underline md:mr-6">
              Youtube
            </a>
          </li>
          <li>
            <a href="#" className="hover:underline">
              Spotify
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};
