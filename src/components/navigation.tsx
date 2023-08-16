import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Button,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
} from '@nextui-org/react';
import { Link, useLocation } from 'react-router-dom';
import { LOGO } from '../assets/index';
import { NAVIGATION } from '../web.config';
import { useGlobalContext } from '../hook/context.hook';
import { useEffect } from 'react';
import { BsFillCalendarHeartFill } from 'react-icons/bs';

const NavigationRoutes = [
  {
    name: NAVIGATION.home.name,
    path: NAVIGATION.home.path,
  },
  {
    name: NAVIGATION.letters.name,
    path: NAVIGATION.letters.path,
  },
  {
    name: NAVIGATION.album.name,
    path: NAVIGATION.album.path,
  },
  {
    name: NAVIGATION.playlist.name,
    path: NAVIGATION.playlist.path,
  },
];

export const Navigation = () => {
  const location = useLocation();
  const { deltaAnniversaryDate, getDateDifference } = useGlobalContext();

  useEffect(() => {
    getDateDifference();
  }, []);

  return (
    <Navbar isBordered className="bg-gray-950/80 sm:w-3/4 rounded-xl m-auto backdrop-blur-lg">
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle className="text-gray-200" />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <img src={LOGO} alt="" className="w-10 img-invert" />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarBrand>
          <img src={LOGO} alt="" className="w-10 img-invert" />
        </NavbarBrand>
        {NavigationRoutes.map((item) => (
          <NavbarItem key={`option-${item.name}-${item.path}-${Math.random()}`}>
            <Link
              to={item.path}
              aria-current="page"
              className={`${
                location.pathname === item.path ? 'text-pink-300' : 'text-gray-400'
              } transition-colors duration-200 font-Courgette`}
            >
              {item.name}
            </Link>
          </NavbarItem>
        ))}
      </NavbarContent>

      <NavbarContent justify="end">
        <NavbarItem>
          <Button as={Link} color="success" href="#" variant="flat" className="cursor-default">
            <BsFillCalendarHeartFill />
            {deltaAnniversaryDate.year} A {deltaAnniversaryDate.month} M {deltaAnniversaryDate.day} D
          </Button>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu className="p-5 bg-gray-950">
        {NavigationRoutes.map((item, index) => (
          <NavbarMenuItem key={`${item.name}-${index}`}>
            <Link
              className={`w-full text-lg uppercase font-bold ${
                location.pathname === item.path ? 'text-pink-400' : 'text-gray-400'
              } transition-colors duration-250 font-Courgette`}
              to={item.path}
            >
              {item.name}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
};
