import { Blockquote, Li, Line, OL, Ul } from './lists';
import { Img } from './media';
import { Paragraph, Title1, Title2, Title3, Title4, Title5, Title6 } from './texts';

export const MDComponents = {
  p: (props: any) => <Paragraph {...props} />,
  h1: (props: any) => <Title1 {...props} />,
  h2: (props: any) => <Title2 {...props} />,
  h3: (props: any) => <Title3 {...props} />,
  h4: (props: any) => <Title4 {...props} />,
  h5: (props: any) => <Title5 {...props} />,
  h6: (props: any) => <Title6 {...props} />,
  ul: (props: any) => <Ul {...props} />,
  ol: (props: any) => <OL {...props} />,
  li: (props: any) => <Li {...props} />,
  blockquote: (props: any) => <Blockquote {...props} />,
  img: (props: any) => <Img {...props} />,
  hr: (props: any) => <Line {...props} />,
};
