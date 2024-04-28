import { Badge } from "@/presentation/components/ui/badge";
import { Button } from "@/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/presentation/components/ui/card";
import { Check } from "lucide-react";
import StripeButton from "../client/StripeButton";

enum PopularPlanType {
  NO = 0,
  YES = 1,
}

interface PricingProps {
  title: string;
  popular: PopularPlanType;
  price: number;
  priceId: string;
  priceType: number;
  description: string;
  buttonText: string;
  benefitList: string[];
}

const pricingList: PricingProps[] = [
  {
    title: "Bronce",
    popular: 0,
    price: 800,
    description:
      "El paquete básico para tu hogar, ideal para lugares de tamaño pequeño.",
    buttonText: "Empieza ahora",
    priceId: process.env.BRONZE_PRICE as string,
    priceType: 0,
    benefitList: [
      "1 miembro del hogar",
      "2 GB almacenamiento",
      "De 1 a 15 dispositivos (Smart Plugs)",
      "Soporte de la comunidad",
    ],
  },
  {
    title: "Plata",
    popular: 1,
    price: 600,
    description:
      "El paquete intermedio para tu hogar, ideal para lugares de tamaño mediano.",
    buttonText: "Inicia ya!",
    priceId: process.env.SILVER_PRICE as string,
    priceType: 1,
    benefitList: [
      "4 miembros del hogar",
      "4 GB almacenamiento",
      "De 16 a 30 dispositivos (Smart Plugs)",
      "Soporte prioritario",
    ],
  },
  {
    title: "Oro",
    popular: 0,
    price: 350,
    description:
      "El paquete premium para tu hogar, ideal para lugares de tamaño grande.",
    buttonText: "Empieza ahora",
    priceId: process.env.GOLD_PRICE as string,
    priceType: 2,
    benefitList: [
      "Miembros ilimitados del hogar",
      "10 GB almacenamiento",
      "De 31 hasta 50 dispositivos (Smart Plugs)",
      "Soporte 24/7 personalizado",
    ],
  },
];

export const Pricing = () => {
  return (
    <section
      id="pricing"
      className="container py-24 sm:py-32"
    >
      <h2 className="text-3xl md:text-4xl font-bold text-center">
        Obten
        <span className="bg-gradient-to-b from-[#16a34a99] to-[#16a34a] text-transparent bg-clip-text">
          {" "}
          Acceso{" "}
        </span>
        a nuestros planes
      </h2>
      <h3 className="text-xl text-center text-muted-foreground pt-4 pb-8">
        Elige el plan que mejor se adapte a tus necesidades.
      </h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {pricingList.map((pricing: PricingProps) => (
          <Card
            key={pricing.title}
            className={
              pricing.popular === PopularPlanType.YES
                ? "drop-shadow-xl shadow-black/10 dark:shadow-white/10"
                : ""
            }
          >
            <CardHeader>
              <CardTitle className="flex item-center justify-between">
                {pricing.title}
                {pricing.popular === PopularPlanType.YES ? (
                  <Badge
                    variant="secondary"
                    className="text-sm text-primary"
                  >
                    Más popular
                  </Badge>
                ) : null}
              </CardTitle>
              <div>
                <span className="text-3xl font-bold">${pricing.price}</span>
                <span className="text-muted-foreground"> /dispositivo</span>
              </div>

              <CardDescription>{pricing.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <StripeButton
                price={pricing.priceId}
                priceType={pricing.priceType}
                description={pricing.buttonText}
              />
            </CardContent>

            <hr className="w-4/5 m-auto mb-4" />

            <CardFooter className="flex">
              <div className="space-y-4">
                {pricing.benefitList.map((benefit: string) => (
                  <span
                    key={benefit}
                    className="flex"
                  >
                    <Check className="text-green-500" />{" "}
                    <h3 className="ml-2">{benefit}</h3>
                  </span>
                ))}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
    </section>
  );
};