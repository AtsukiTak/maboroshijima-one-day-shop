import { Request, Response } from "express";
import * as D from "@mojotech/json-type-validation";
import * as admin from "firebase-admin";

import { getStripe } from "./stripe";

const firestore = admin.firestore();

/*
 * POST /charge
 */
export function create(req: Request, res: Response): Promise<void> {
  return createInner("live", req, res);
}

export function testCreate(req: Request, res: Response): Promise<void> {
  return createInner("test", req, res);
}

async function createInner(
  mode: "test" | "live",
  req: Request,
  res: Response
): Promise<void> {
  const reqData = await ReqBodyDecoder.runPromise(req.body);
  const shirt = await fetchShirtData(reqData.shirtId, reqData.size);

  try {
    await getStripe(mode).charges.create({
      amount: shirt.priceYen,
      currency: "jpy",
      source: reqData.cardToken,
      description: `Charge for ${shirt.name} (${shirt.size}) - maboroshijima.com`,
      receipt_email: reqData.email,
      shipping: {
        name: reqData.shippingName,
        address: {
          postal_code: reqData.shippingAddress.zip,
          state: reqData.shippingAddress.prefecture,
          city: reqData.shippingAddress.city,
          line1: reqData.shippingAddress.line1
        }
      },
      statement_descriptor: "maboroshijima.com"
    });
    res.json({ msg: "Success" });
  } catch (err) {
    console.error(err);
    res.status(400).json({ msg: "Invalid Request" });
  }
}

interface ReqBody {
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
}

const ReqBodyDecoder: D.Decoder<ReqBody> = D.object({
  shirtId: D.string(),
  size: D.string(),
  cardToken: D.string(),
  email: D.string(),
  shippingName: D.string(),
  shippingAddress: D.object({
    zip: D.string(),
    prefecture: D.string(),
    city: D.string(),
    line1: D.string()
  })
});

function fetchShirtData(id: string, size: string): Promise<ShirtData> {
  return firestore
    .doc(`shirts/${id}`)
    .get()
    .then(doc => doc.data() as StoredShirtData)
    .then(shirt => {
      errorIfShirtIsNotSoldNow(shirt);
      errorIfSizeNotAvailable(shirt, size);
      return {
        name: shirt.name,
        priceYen: shirt.priceYen,
        size
      };
    });
}

const AvailableDurationMillis: number = 1000 * 60 * 60 * 24;

function errorIfShirtIsNotSoldNow(shirt: StoredShirtData) {
  const now = admin.firestore.Timestamp.now().seconds;
  const start = shirt.end.seconds - AvailableDurationMillis;
  const end = shirt.end.seconds;
  // 売り始められているか
  if (now < start) {
    throw new Error(`T-shirt ${shirt.name} is preparing`);
  } else if (end < now) {
    throw new Error(`T-shirt ${shirt.name} is end`);
  }
}

function errorIfSizeNotAvailable(shirt: StoredShirtData, size: string) {
  if (!shirt.availableSize.includes(size)) {
    throw new Error(`T-shirt ${shirt.name} does not have size ${size}`);
  }
}

interface ShirtData {
  name: string;
  priceYen: number;
  size: string;
}

interface StoredShirtData {
  name: string;
  priceYen: number;
  availableSize: string[];
  end: admin.firestore.Timestamp;
}
