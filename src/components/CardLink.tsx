import { Card, CardHeader, Image, Chip, Avatar, CardBody, Divider, CardFooter, Link } from '@nextui-org/react';

interface TYPE_CARD_LINK {
  front: string;
  username: string;
  avatar: string;
  name: string;
  description: string;
  path: string;
  descriptionPath: string;
}

/** Este componente se encarga de renderizar una carta que presenta un enlace con imagenes */
export const CardLink = ({ front, username, avatar, name, description, descriptionPath, path }: TYPE_CARD_LINK) => {
  return (
    <Card className="max-w-[400px]">
      <CardHeader className="flex gap-3">
        <Image isBlurred alt="nextui logo" height={40} radius="sm" src={front} width={40} />
        <div className="flex flex-col">
          <p className="text-md">{username}</p>

          <Chip variant="flat" avatar={<Avatar name="JW" src={avatar} />}>
            {name}
          </Chip>
        </div>
      </CardHeader>
      <Divider />
      <CardBody>
        <p>{description}</p>
      </CardBody>
      <Divider />
      <CardFooter>
        <Link isExternal showAnchorIcon href={path}>
          {descriptionPath}
        </Link>
      </CardFooter>
    </Card>
  );
};
