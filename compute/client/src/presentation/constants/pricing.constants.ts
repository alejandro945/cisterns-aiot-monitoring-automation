export enum PopularPlanType {
    NO = 0,
    YES = 1,
}

export interface PricingProps {
    title: string;
    popular: PopularPlanType;
    price: number;
    priceId: string;
    priceType: number;
    description: string;
    buttonText: string;
    benefitList: string[];
}

export const PRICING: PricingProps[] = [
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
        buttonText: "Comenzar ahora",
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

export type Prices = {
    price?: string,
    adjustable_quantity: {
        enabled: boolean,
        minimum: number,
        maximum: number
    },
    quantity: number,
}

export const prices: Prices[] = [
    {
        adjustable_quantity: {
            enabled: true,
            minimum: 1,
            maximum: 15
        },
        quantity: 1
    },
    {
        adjustable_quantity: {
            enabled: true,
            minimum: 16,
            maximum: 30
        },
        quantity: 16,
    },
   {
        adjustable_quantity: {
            enabled: true,
            minimum: 31,
            maximum: 50
        },
        quantity: 31,
    }
]