import { NextResponse } from 'next/server';
import { stripe } from '@/lib/stripe';

export async function POST(req: Request) {
    try {
        const { tierName } = await req.json();

        let priceId = '';
        if (tierName === 'BASIC') {
            priceId = process.env.STRIPE_BASIC_PASS_PRICE_ID || '';
        } else if (tierName === 'INFINITY') {
            priceId = process.env.STRIPE_INFINITY_PASS_PRICE_ID || '';
        }

        if (!priceId) {
            return NextResponse.json({ error: 'Invalid tier or price ID missing' }, { status: 400 });
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/?session_id={CHECKOUT_SESSION_ID}&tier=${tierName}`,
            cancel_url: `${req.headers.get('origin')}`,
            metadata: {
                tierName,
            },
        });

        return NextResponse.json({ sessionId: session.id, url: session.url });
    } catch (err: any) {
        console.error('Stripe error:', err);
        return NextResponse.json({ error: err.message }, { status: 500 });
    }
}
