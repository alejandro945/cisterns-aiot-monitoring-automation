import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import Image from "next/image";

interface TeamProps {
  imageUrl: string;
  name: string;
  position: string;
  description: string;
}

const teamList: TeamProps[] = [
  {
    imageUrl: "/avatars/06.png",
    name: "Valentina Castro",
    position: "Genrente de proyectos",
    description: "Encargada de la gestión de proyectos y desarrollo de la empresa."
  },
  {
    imageUrl: "/avatars/07.png",
    name: "David Molta",
    position: "Director de Comunicaciones",
    description: "Encargado de la comunicación interna y externa de la empresa."
  },
  {
    imageUrl: "/avatars/08.png",
    name: "Juan Alarcon",
    position: "Director de operaciones",
    description: "Encargado de la operación y logística de la empresa."
  },
  {
    imageUrl: "/avatars/09.png",
    name: "Jorge Jojoa",
    position: "Lider Financiero",
    description: "Encargado de la gestión financiera de la empresa."
  },
  {
    imageUrl: "/avatars/10.png",
    name: "Alejandro Varela",
    position: "Lider de Infraestreuctura y desarrollo",
    description: "Encargado de la infraestructura y desarrollo de la empresa."
  },
];

export const Team = () => {

  return (
    <section
      id="team"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        <span className="bg-gradient-to-b from-[#16a34a99] to-[#16a34a] text-transparent bg-clip-text">
          Nuestro Equipo {" "}
        </span>
        Dedicado
      </h2>

      <p className="mt-4 mb-10 text-xl text-muted-foreground text-center">
        Somos un equipo de profesionales dedicados a brindarte la mejor
        experiencia.
      </p>

      <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-8 gap-y-10 justify-center">
        {teamList.map(
          ({ imageUrl, name, position, description }: TeamProps) => (
            <Card
              key={name}
              className="bg-muted/50 relative mt-8 flex flex-col justify-center items-center"
            >
              <CardHeader className="mt-8 flex justify-center items-center pb-2">
                <Image
                  src={imageUrl}
                  alt={`${name} ${position}`}
                  className="absolute -top-12 rounded-full w-24 h-24 aspect-square object-cover"
                  width={96}
                  height={96}
                />
                <CardTitle className="text-center">{name}</CardTitle>
                <CardDescription className="text-primary text-center">
                  {position}
                </CardDescription>
              </CardHeader>

              <CardContent className="text-center pb-2">
                <p>{description ?? ''}</p>
              </CardContent>

          
            </Card>
          )
        )}
      </div>
    </section>
  );
};