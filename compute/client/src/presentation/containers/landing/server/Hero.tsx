import { buttonVariants, Button } from "@/presentation/components/ui/button";
import { HeroCards } from "./HeroCards";
import { GitHubLogoIcon } from "@radix-ui/react-icons";

export const Hero = () => {
    return (
        <section className="container grid lg:grid-cols-2 place-items-center py-40 md:py-32 gap-10">
            <div className="text-center lg:text-start space-y-6">
                <main className="text-5xl md:text-6xl font-bold">
                    <h1 className="inline">
                        Transforma tu consumo, transforma el mundo
                    </h1>{" "}
                    de{" "}
                    <h2 className="inline">
                        <span className="inline bg-gradient-to-r from-[#16a34a99] to-[#16a34a] text-transparent bg-clip-text">
                            Green Lake
                        </span>{" "}
                        para el mundo.
                    </h2>
                </main>

                <p className="text-xl text-muted-foreground md:w-10/12 mx-auto lg:mx-0">
                    Aplicación de monitoreo de consumo de energía eléctrica que esta revolucionando el mundo que conocemos.
                </p>

                <div className="space-y-4 md:space-y-0 md:space-x-4">
                    <Button className="w-full md:w-1/3">
                        Empieza ahora
                    </Button>
                    <a
                        href="https://github.com/alejandro945"
                        target="_blank"
                        className={`w-full md:w-1/3 ${buttonVariants({
                            variant: "outline",
                        })}`}
                    >
                        Repositorio Github
                        <GitHubLogoIcon className="ml-2 w-5 h-5" />
                    </a>
                </div>
            </div>

            {/* Hero cards sections */}
            <div className="z-10">
                <HeroCards />
            </div>

            {/* Shadow effect */}
            <div className="shadow"></div>
        </section>
    );
};