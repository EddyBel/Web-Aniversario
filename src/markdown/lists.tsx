import { TYPE_BASE_COMPONENT } from '../types/services.types';

interface PROPS_COMPONENTS_TEXT extends TYPE_BASE_COMPONENT {}

export const Ul = (props: PROPS_COMPONENTS_TEXT) => <ul className="flex flex-col gap-2">{props.children}</ul>;

export const OL = (props: PROPS_COMPONENTS_TEXT) => <ol>{props.children}</ol>;

export const Li = (props: PROPS_COMPONENTS_TEXT) => <li className="list-disc ml-8 capitalize">{props.children}</li>;

export const Blockquote = (props: PROPS_COMPONENTS_TEXT) => (
  <blockquote className="p-3 bg-gray-950 rounded-2xl border-gray-900 border-1 mb-5 mt-5">{props.children}</blockquote>
);

export const Line = () => <hr className="w-full h-[1px] mb-5 mt-5 bg-gray-400/80 rounded-md" />;
