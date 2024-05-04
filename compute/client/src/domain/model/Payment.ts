export interface Payment {
    userId?: string;
    amount: number;
    currency: string;
    priceId: string;
    created: number;
    city: string;
    address: string;
}