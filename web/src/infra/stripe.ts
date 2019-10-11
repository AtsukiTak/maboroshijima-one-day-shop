import * as D from "@mojotech/json-type-validation";

import { request, Method } from "infra/http";

// 万が一他のpublic keyに設定されると危険、
// かつ開発時だろうと他のpublic keyに変更することはない、
// かつ外部に晒しても問題ない（どうせ晒される）ので、
// public keyはハードコードする
export const [stripePublicKey, createChargeApiEndpoint] = (() => {
  const apiBase =
    "https://us-central1-maboroshijima-8ce9a.cloudfunctions.net/stripe";
  const env = process.env.NODE_ENV;
  if (env === "development" || env === "test") {
    return [
      "pk_test_7lunBZyq3PVaVHQeuVagvwfF00JE7idU9Z",
      `${apiBase}/test/charge`
    ];
  } else if (process.env.NODE_ENV === "production") {
    return ["pk_live_JYgGmOqHlWYVipqfOWNuxCRs00yD7PPefD", `${apiBase}/charge`];
  } else {
    throw new Error(`Unexpected NODE_ENV : ${env}`);
  }
})();

/// 失敗したらErrorを投げる
export async function buyShirt(reqBody: {
  shirtId: string;
  size: string;
  cardToken: string;
  email: string;
  shippingName: string;
  shippingAddress: {
    zip: string;
    prefecture: string;
    city: string;
    line1: string;
  };
}): Promise<void> {
  const { msg } = await request({
    method: Method.POST,
    url: createChargeApiEndpoint,
    body: reqBody,
    decoder: D.object({ msg: D.string() })
  });
  console.log(msg);
  return;
}
