import { Request, Response, NextFunction } from "express";
import { STATUS_CODES } from "../../shared/constants/statusCodes";
import { stripe } from "../../config/stripe";
import { HandleStripeWebhookUseCase } from "../../application/usecases/subscription/HandleStripeWebhookUseCase";
import Stripe from 'stripe';

export class StripeWebhookController {
    private readonly handleStripeWebhookUseCase: HandleStripeWebhookUseCase;

    constructor() {
        this.handleStripeWebhookUseCase = new HandleStripeWebhookUseCase();
    }

    async handleWebhook(req: Request, res: Response, next: NextFunction) {
        const sig = req.headers['stripe-signature'] as string;
        let event: Stripe.Event;

        try {
            // Validate the Stripe signature and construct event
            event = stripe.webhooks.constructEvent(
                req.body,
                sig,
                process.env.STRIPE_WEBHOOK_SECRET!
            );

            // Process the webhook event
            await this.handleStripeWebhookUseCase.execute(event);
            
            // Acknowledge receipt of the event
            res.status(STATUS_CODES.OK).json({ received: true });
            
        } catch (error) {
            // Improved error logging
            console.error('Stripe webhook processing failed:', error);
            next(error);
        }
    }
}