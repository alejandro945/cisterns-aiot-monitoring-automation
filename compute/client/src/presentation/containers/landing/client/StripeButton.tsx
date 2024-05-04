'use client'
import { Button } from '@/presentation/components/ui/button';
import { useToast } from '@/presentation/components/ui/use-toast';
import { prices } from '@/presentation/constants/pricing.constants';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';
import { useState } from 'react';

type props = {
    price: string;
    priceType: number;
    description: string;
    userId: string;
    isDisabledProp?: boolean;
};

const StripeButton = ({ price, priceType, description, userId, isDisabledProp = false }: props) => {
    const [isDisabled, setIsDisabled] = useState<boolean>(isDisabledProp);
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
            const response = await axios.post('/api/stripe/checkout', {lineItem: {...prices[priceType], price}, userId});
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