import * as firebase from "firebase/app";
import "firebase/firestore";
import "firebase/storage";

const AvailableDurationMillis: number = 1000 * 60 * 60 * 24;

export class Firestore {
  static async fetchAvailableShirt(): Promise<{
    id: string;
    doc: ShirtDocument;
  } | null> {
    const now = firebase.firestore.Timestamp.now();
    const later = firebase.firestore.Timestamp.fromMillis(
      now.toMillis() + AvailableDurationMillis
    );
    const collection = await firebase
      .firestore()
      .collection("shirts")
      .where("end", ">", now)
      .where("end", "<", later) // end - AvailableDurationMillis < now
      .get();
    if (collection.docs.length === 0) {
      return null;
    } else {
      return {
        id: collection.docs[0].id,
        doc: collection.docs[0].data() as ShirtDocument
      };
    }
  }
}

export interface ShirtDocument {
  name: string;
  priceYen: number;
  end: firebase.firestore.Timestamp;
  availableSize: string[];
}

export class Storage {
  // # Panic
  // if shirt is not available.
  static async queryShirtImageUrls(id: string): Promise<string[]> {
    const refs = await firebase
      .storage()
      .ref(`shirts/${id}`)
      .list();
    return await Promise.all(refs.items.map(ref => ref.getDownloadURL()));
  }
}
