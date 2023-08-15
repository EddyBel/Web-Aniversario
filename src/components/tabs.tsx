import { Tabs, Tab, Card, CardBody, Image } from '@nextui-org/react';

interface TYPE_BODY_TABS {
  title: string;
  body: string;
  img?: string;
}

interface TYPE_TABS_COMPONENT {
  color?: 'danger' | 'default' | 'primary' | 'secondary' | 'success' | 'warning';
  body: TYPE_BODY_TABS[];
}

/** Componente encargado de renderizar varios textos seleccionables en un menu */
export const TabsComponent = ({ body, color = 'danger' }: TYPE_TABS_COMPONENT) => {
  return (
    <div className="flex w-full flex-col">
      <Tabs color={color} aria-label="Options">
        {body.map((item) => (
          <Tab key={`${item.title}-${item.body}`} title={item.title}>
            <Card className="p-3 sm:p-5 flex justify-between gap-4 flex-wrap lg:flex-nowrap items-center flex-row">
              {item.img ? <Image isBlurred src={item.img} className="w-full" /> : ''}
              <CardBody className="w-full text-sm text-justify sm:text-start sm:text-sm">{item.body}</CardBody>
            </Card>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};
