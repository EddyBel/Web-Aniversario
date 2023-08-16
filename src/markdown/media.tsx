import { Image } from '@nextui-org/react';
import { TYPE_BASE_COMPONENT } from '../types/services.types';

interface PROPS_COMPONENTS_TEXT extends TYPE_BASE_COMPONENT {
  src: string;
}

export const Img = (props: PROPS_COMPONENTS_TEXT) => (
  <Image isBlurred src={props.src} loading="lazy" className="mb-10 mt-10" />
);
