import {Plans} from "./Plans";

export const PricingPlans = async () => {
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
      <Plans />
    </section>
  );
};