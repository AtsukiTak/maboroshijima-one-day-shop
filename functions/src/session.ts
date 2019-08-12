import {Request, Response} from 'express';
import * as D from '@mojotech/json-type-validation';
import * as admin from 'firebase-admin';

import stripe from './stripe';

const firestore = admin.firestore();
const storage = admin.storage();

/*
 * POST /session
 */
export function create(req: Request, res: Response): Promise<void> {
  return ReqBodyDecoder.runPromise(req.body)
    .then(({shirtId, size}) =>
      Promise.all([
        fetchShirtData(shirtId, size),
        fetchShirtSumbnailUrl(shirtId),
      ]),
    )
    .then(([shirt, sumbnailUrl]) =>
      stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        success_url: 'https://maboroshijima.com/purchase/success',
        cancel_url: 'https://maboroshijima.com/purchase/cancel',
        line_items: [
          {
            name: `${shirt.name} (${shirt.size})`,
            images: [sumbnailUrl],
            amount: shirt.priceYen,
            currency: 'jpy',
            quantity: 1,
          },
        ],
      }),
    )
    .then(session => {
      res.json({id: session.id});
    })
    .catch(err => {
      console.log(err);
      res.status(400).json({msg: 'Invalid Request'});
    });
}

interface ReqBody {
  shirtId: string;
  size: string;
}

const ReqBodyDecoder: D.Decoder<ReqBody> = D.object({
  shirtId: D.string(),
  size: D.string(),
});

const AvailableDurationMillis: number = 1000 * 60 * 60 * 24;

function fetchShirtData(id: string, size: string): Promise<ShirtData> {
  const now = admin.firestore.Timestamp.now();
  const later = admin.firestore.Timestamp.fromMillis(
    now.toMillis() + AvailableDurationMillis,
  );
  return firestore
    .doc(`shirts/${id}`)
    .get()
    .then(doc => doc.data() as StoredShirtData)
    .then(shirt => {
      if (now < shirt.end && shirt.end < later) {
        if (shirt.availableSize.include(size)) {
          return {
            name: shirt.name,
            priceYen: shirt.priceYen,
            size,
          };
        } else {
          throw new Error(`T-shirt ${id} does not have size ${size}`);
        }
      } else {
        throw new Error(`T-shirt ${id} is not sold now`);
      }
    });
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

const SumbnailExpireMilliSec: number = 1000 * 60 * 60;

function fetchShirtSumbnailUrl(id: string): Promise<string> {
  return storage
    .bucket()
    .file(`shirts/${id}/sumbnail.jpg`)
    .getSignedUrl({
      action: 'read',
      expires: Date.now() + SumbnailExpireMilliSec,
    })
    .then(data => data[0]);
}
