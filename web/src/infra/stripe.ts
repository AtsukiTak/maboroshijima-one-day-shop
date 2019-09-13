import * as D from '@mojotech/json-type-validation';

import { request, Method } from 'api';

declare const Stripe: any;

// 万が一他のpublic keyに設定されると危険、
// かつ開発時だろうと他のpublic keyに変更することはない、
// かつ外部に晒しても問題ない（どうせ晒される）ので、
// public keyはハードコードする
const [stripePublicKey, createSessionApiEndpoint] = (() => {
  const apiBase =
    "https://us-central1-maboroshijima-8ce9a.cloudfunctions.net/stripe";
  const env = process.env.NODE_ENV;
  if (env === "development" || env === "test") {
    return [
      "pk_test_7lunBZyq3PVaVHQeuVagvwfF00JE7idU9Z",
      `${apiBase}/test/session`
    ];
  } else if (process.env.NODE_ENV === "production") {
    return ["pk_live_JYgGmOqHlWYVipqfOWNuxCRs00yD7PPefD", `${apiBase}/session`];
  } else {
    throw new Error(`Unexpected NODE_ENV : ${env}`);
  }
})();

const stripe = Stripe(stripePublicKey);

export function buyShirt(shirtId: string, size: string): Promise<void> {
  return request({
    method: Method.POST,
    url: createSessionApiEndpoint,
    body: {
      shirtId,
      size
    },
    decoder: BuyShirtDecoder
  })
    .then(sessionId =>
      stripe.redirectToCheckout({
        sessionId
      })
    )
    .then(sessionResult => console.log(sessionResult));
}

const BuyShirtDecoder: D.Decoder<string> = D.object({
  id: D.string()
}).map(({ id }) => id);
