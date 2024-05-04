import { Avatar, AvatarFallback, AvatarImage } from "@/presentation/components/ui/avatar";
import { Badge } from "@/presentation/components/ui/badge";
import { Button, buttonVariants } from "@/presentation/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  CardFooter,
} from "@/presentation/components/ui/card";
import { Check, Linkedin } from "lucide-react";
import { Icons } from "@/presentation/components/ui/icons";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";

export const HeroCards = () => {
  return (
    <div className="hidden lg:flex flex-row flex-wrap gap-8 relative w-[700px] h-[500px]">
      {/* Testimonial */}
      <Card className="absolute w-[340px] -top-[15px] drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="flex flex-row items-center gap-4 pb-2">
          <Avatar>
            <AvatarImage
              alt=""
              src="https://github.com/mongodb.png"
            />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          <div className="flex flex-col">
            <CardTitle className="text-lg">John Doe</CardTitle>
            <CardDescription>@john_doe</CardDescription>
          </div>
        </CardHeader>

        <CardContent>La mejor App de monitoreo!</CardContent>
      </Card>

      {/* Team */}
      <Card className="absolute right-[20px] top-4 w-80 flex flex-col justify-center items-center drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="mt-8 flex justify-center items-center pb-2">
          <Image
            src="/avatars/02.png"
            alt="user avatar"
            className="absolute grayscale-[0%] -top-12 rounded-full w-24 h-24 aspect-square object-cover"
            width={96}
            height={96}
          />
          <CardTitle className="text-center">Leo Miranda</CardTitle>
          <CardDescription className="font-normal text-primary">
            Cabeza de hogar
          </CardDescription>
        </CardHeader>

        <CardContent className="text-center pb-2">
          <p>
            Esta solución es la mejor que he probado, me ha ayudado a ahorrar
            energía y dinero.
          </p>
        </CardContent>

        <CardFooter>
          <div>
            <a
              href="https://github.com/alejandro945"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Github icon</span>
              <GitHubLogoIcon className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/alejandro945"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">X icon</span>
              <svg
                role="img"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
                className="fill-foreground w-5 h-5"
              >
                <title>X</title>
                <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
              </svg>
            </a>

            <a
              href="https://www.linkedin.com/"
              target="_blank"
              className={buttonVariants({
                variant: "ghost",
                size: "sm",
              })}
            >
              <span className="sr-only">Linkedin icon</span>
              <Linkedin size="20" />
            </a>
          </div>
        </CardFooter>
      </Card>

      {/* Pricing */}
      <Card className="absolute top-[150px] left-[50px] w-72  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader>
          <CardTitle className="flex item-center justify-between">
            1 mes de prueba
            <Badge
              variant="secondary"
              className="text-sm text-primary"
            >
              Popular
            </Badge>
          </CardTitle>
          <div>
            <span className="text-3xl font-bold">$0</span>
            <span className="text-muted-foreground"> /month</span>
          </div>

          <CardDescription>
            Disfruta de la solución por 1 mes y empieza a cuidar tu bolsillo.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <Link href="/">
            <Button className="w-full">Empezar ahora</Button>
          </Link>
        </CardContent>

        <hr className="w-4/5 m-auto mb-4" />

        <CardFooter className="flex">
          <div className="space-y-4">
            {["1 Usuario", "2 GB Storage", "Hasta 10 dispositivos"].map(
              (benefit: string) => (
                <span
                  key={benefit}
                  className="flex"
                >
                  <Check className="text-green-500" />{" "}
                  <h3 className="ml-2">{benefit}</h3>
                </span>
              )
            )}
          </div>
        </CardFooter>
      </Card>

      {/* Service */}
      <Card className="absolute w-[350px] -right-[10px] bottom-[35px]  drop-shadow-xl shadow-black/10 dark:shadow-white/10">
        <CardHeader className="space-y-1 flex md:flex-row justify-start items-start gap-4">
          <div className="mt-1 bg-primary/20 p-1 rounded-2xl">
            <Icons.lighBulb />
          </div>
          <div>
            <CardTitle>Analisis de datos</CardTitle>
            <CardDescription className="text-md mt-2">
              Te damos recomendaciones para mejorar tu consumo de energía.
            </CardDescription>
          </div>
        </CardHeader>
      </Card>
    </div>
  );
};