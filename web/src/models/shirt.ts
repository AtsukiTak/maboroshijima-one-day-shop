import firebase from 'firebase';
import 'firebase/firestore';
import moment, {Moment} from 'moment';
import * as D from '@mojotech/json-type-validation';

import {request, Method} from 'api';

const AvailableDurationMillis: number = 1000 * 60 * 60 * 24;

export interface Shirt {
  id: string;
  name: string;
  priceYen: number;
  end: Moment;
  availableSize: string[];
  sumbnail: string;
}

interface StoredShirt {
  name: string;
  priceYen: number;
  end: firebase.firestore.Timestamp;
  availableSize: string[];
}

/*
 * ======================
 * Fetch Shirt
 * ======================
 */
export function fetchAvailableShirt(): Promise<Shirt | null> {
  const now = firebase.firestore.Timestamp.now();
  const later = firebase.firestore.Timestamp.fromMillis(
    now.toMillis() + AvailableDurationMillis,
  );
  return firebase
    .firestore()
    .collection('shirts')
    .where('end', '>', now)
    .where('end', '<', later) // end - AvailableDurationMillis < now
    .get()
    .then(snapshot => {
      if (snapshot.docs.length === 0) {
        return Promise.resolve(null);
      } else {
        return constructShirt(snapshot.docs[0]);
      }
    });
}

function constructShirt(
  doc: firebase.firestore.DocumentSnapshot,
): Promise<Shirt> {
  const data = doc.data();
  if (data === undefined) {
    throw new Error('Shirt data is undefined');
  }
  const shirt = data as StoredShirt;
  const id = doc.id;
  return fetchSumbnail(id).then(sumbnail => ({
    id: id,
    end: moment(shirt.end.toMillis()),
    sumbnail: sumbnail,
    name: shirt.name,
    priceYen: shirt.priceYen,
    availableSize: shirt.availableSize,
  }));
}

function fetchSumbnail(shirtId: string): Promise<string> {
  return firebase
    .storage()
    .ref(`shirts/${shirtId}/sumbnail.jpg`)
    .getDownloadURL()
    .then(url => fetch(url, {mode: 'cors'}))
    .then(res => res.blob())
    .then(blob => URL.createObjectURL(blob));
}

/*
 * ==================
 * Buy Shirt
 * ==================
 */
declare const Stripe: any;

// 万が一他のpublic keyに設定されると危険、
// かつ開発時だろうと他のpublic keyに変更することはない、
// かつ外部に晒しても問題ない（どうせ晒される）ので、
// public keyはハードコードする
const [stripePublicKey, createSessionApiEndpoint] = (() => {
  const apiBase =
    'https://us-central1-maboroshijima-8ce9a.cloudfunctions.net/stripe';
  const env = process.env.NODE_ENV;
  if (env === 'development' || env === 'test') {
    return [
      'pk_test_7lunBZyq3PVaVHQeuVagvwfF00JE7idU9Z',
      `${apiBase}/test/session`,
    ];
  } else if (process.env.NODE_ENV === 'production') {
    return ['pk_live_JYgGmOqHlWYVipqfOWNuxCRs00yD7PPefD', `${apiBase}/session`];
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
      size,
    },
    decoder: BuyShirtDecoder,
  })
    .then(sessionId =>
      stripe.redirectToCheckout({
        sessionId,
      }),
    )
    .then(sessionResult => console.log(sessionResult));
}

const BuyShirtDecoder: D.Decoder<string> = D.object({
  id: D.string(),
}).map(({id}) => id);
