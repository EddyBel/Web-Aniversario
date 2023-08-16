import { TYPE_BASE_COMPONENT } from '../types/services.types';

interface PROPS_COMPONENTS_TEXT extends TYPE_BASE_COMPONENT {}

export const Paragraph = (props: PROPS_COMPONENTS_TEXT) => <p className="text-gray-400 mb-5 mt-5">{props.children}</p>;

export const Title1 = (props: PROPS_COMPONENTS_TEXT) => (
  <h1 className="text-gray-400 mb-5 mt-5 text-5xl uppercase">{props.children}</h1>
);

export const Title2 = (props: PROPS_COMPONENTS_TEXT) => (
  <h2 className="text-gray-400 mb-5 mt-5 text-4xl uppercase">{props.children}</h2>
);

export const Title3 = (props: PROPS_COMPONENTS_TEXT) => (
  <h3 className="text-gray-400 mb-5 mt-5 text-3xl uppercase">{props.children}</h3>
);

export const Title4 = (props: PROPS_COMPONENTS_TEXT) => (
  <h4 className="text-gray-400 mb-5 mt-5 text-2xl uppercase">{props.children}</h4>
);

export const Title5 = (props: PROPS_COMPONENTS_TEXT) => (
  <h5 className="text-gray-400 mb-5 mt-5 text-xl uppercase">{props.children}</h5>
);

export const Title6 = (props: PROPS_COMPONENTS_TEXT) => (
  <h6 className="text-gray-400 mb-5 mt-5 text-lg uppercase">{props.children}</h6>
);
