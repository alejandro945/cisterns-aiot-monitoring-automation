'use client'
import { Button } from '@/presentation/components/ui/button';
import { useToast } from '@/presentation/components/ui/use-toast';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useState } from 'react';

type Prices = {
    price?: string,
    adjustable_quantity: {
        enabled: boolean,
        minimum: number,
        maximum: number
    },
    quantity: number,
}

const prices: Prices[] = [
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

type props = {
    price: string;
    priceType: number;
    description: string;
};

const StripeButton = ({ price, priceType, description }: props) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(false);
    const { toast } = useToast();

    /**
     * Function to handle the stripe checkout
     * @returns void
     */
    const handleSubmit = async () => {
        setIsDisabled(true);
        const stripe = await loadStripe(
            process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY as string
        );
        if (!stripe) {
            return;
        }
        try {
            const response = await axios.post('/api/stripe/checkout', {...prices[priceType], price});
            const data = response.data;
            if (!data.ok) throw new Error('Something went wrong');
            await stripe.redirectToCheckout({
                sessionId: data.result.id
            });
        } catch (error) {
            console.log(error);
            toast({
                title: 'Error',
                description: 'Something went wrong',
            });
        } finally {
            setIsDisabled(false);
        }
    }

    return (
        <Button className="w-full" disabled={isDisabled} onClick={handleSubmit}>{description}</Button>
    )
}

export default StripeButton