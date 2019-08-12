import firebase from 'firebase';
import 'firebase/firestore';
import moment, {Moment} from 'moment';

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
