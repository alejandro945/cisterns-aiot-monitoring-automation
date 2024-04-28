import { Card, CardContent, CardHeader, CardTitle } from "@/presentation/components/ui/card";
import { Icons } from "@/presentation/components/ui/icons";

interface FeatureProps {
  icon: JSX.Element;
  title: string;
  description: string;
}

const features: FeatureProps[] = [
  {
    icon: <Icons.medalIcon />,
    title: "Contratación",
    description:
      "El inicio de tu medición auomatizada de energía eléctrica",
  },
  {
    icon: <Icons.mapIcon />,
    title: "Instalación",
    description:
      "Te proporcionamos el equipo necesario para la medición con una guía de instalación",
  },
  {
    icon: <Icons.planetIcon />,
    title: "Monitoreo",
    description:
      "Desde la aplicación podrás monitorear el consumo de energía en tiempo real y tomar acciones de forma remota",
  },
  {
    icon: <Icons.giftIcon />,
    title: "Gamificación",
    description:
      "Establece metas de ahorro y recibe recompensas por cumplirlas",
  },
];

export const HowItWorks = () => {
  return (
    <section
      id="howItWorks"
      className="container text-center py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold ">
        ¿Cómo{" "}
        <span className="bg-gradient-to-b from-[#16a34a99] to-[#16a34a] text-transparent bg-clip-text">
          Funciona?{" "}
        </span>
        Guía paso a paso
      </h2>
      <p className="md:w-3/4 mx-auto mt-4 mb-8 text-xl text-muted-foreground">
        Empieza a disfrutar de SCS desde la comodidad de tu hogar
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {features.map(({ icon, title, description }: FeatureProps) => (
          <Card
            key={title}
            className="bg-muted/50"
          >
            <CardHeader>
              <CardTitle className="grid gap-4 place-items-center">
                {icon}
                {title}
              </CardTitle>
            </CardHeader>
            <CardContent>{description}</CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};