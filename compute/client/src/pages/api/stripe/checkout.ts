import Stripe from 'stripe';
import { NextApiRequest, NextApiResponse } from 'next';
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY as string);

export default async function handler(request: NextApiRequest, response: NextApiResponse<any>) {
    try {
        if (request.method === 'POST') {
            const data = request.body;
            const body: any = (data as any);
            console.log(body);
            const checkoutSession = await stripe.checkout.sessions.create({
                payment_method_types: ['card'],
                line_items: [
                    body.lineItem
                ],
                currency: 'cop',
                phone_number_collection: {
                    enabled: true
                },
                billing_address_collection: 'required',
                shipping_address_collection: {
                    allowed_countries: ['CO']
                },
                mode: 'subscription',
                success_url: `${process.env.NEXT_BASE_URL}/dashboard`,
                cancel_url: `${process.env.NEXT_BASE_URL}/pricing`,
                metadata: {
                    userId: body.userId,
                    priceId: body.lineItem?.price
                }
            });
            response.status(200).json({ result: checkoutSession, ok: true });
        } else {
            response.status(405).json({ message: 'Method not allowed' });
        }
    } catch (error) {
        console.log(error);
        response.status(500).json({ message: 'Internal server error' });
    }
}