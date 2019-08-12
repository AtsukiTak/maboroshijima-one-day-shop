import * as functions from 'firebase-functions';
import Stripe = require('stripe');

const liveSecretKey = functions.config().stripe.sk as string;
const testSecretKey = functions.config().stripe.test.sk as string;

const stripeLive = new Stripe(liveSecretKey);
const stripeTest = new Stripe(testSecretKey);

export function getStripe(mode: 'test' | 'live'): Stripe {
  if (mode === 'test') {
    return stripeTest;
  } else {
    return stripeLive;
  }
}
