import { Statistics } from "./Statistics";

export const About = () => {
    return (
        <section
            id="about"
            className="container py-24 sm:py-32"
        >
            <div className="bg-muted/50 border rounded-lg py-12">
                <div className="px-6 flex flex-col-reverse md:flex-row gap-8 md:gap-12">
                    <img
                        src={'about.png'}
                        alt=""
                        className="w-[300px] object-contain rounded-lg"
                    />
                    <div className="bg-green-0 flex flex-col justify-between">
                        <div className="pb-6">
                            <h2 className="text-3xl md:text-4xl font-bold">
                                <span className="bg-gradient-to-b from-[#16a34a99] to-[#16a34a] text-transparent bg-clip-text">
                                    Sobre{" "}
                                </span>
                                Green Lake
                            </h2>
                            <p className="text-xl text-muted-foreground mt-4">
                                GreenLake es una startup comprometida con la transformación del panorama energético en Colombia. Nos esforzamos por simplificar la medición del consumo de energía y promover la conciencia sobre el uso responsable de los recursos, alentando a nuestros usuarios a adoptar prácticas más eficientes y sostenibles. Con un enfoque centrado en el usuario, buscamos ofrecer soluciones que mejoren su calidad de vida y contribuyan al cuidado del medio ambiente.
                            </p>
                        </div>

                        <Statistics />
                    </div>
                </div>
            </div>
        </section>
    );
};