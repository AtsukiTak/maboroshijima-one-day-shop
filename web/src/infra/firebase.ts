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
      .limit(1)
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

  // 開発用に、次に販売するシャツを取得する。
  static async fetchShirtById(id: string): Promise<{
    id: string;
    doc: ShirtDocument;
  } | null> {
    const doc = await firebase
      .firestore()
      .doc(`/shirts/${id}`)
      .get();
      return {
        id: doc.id,
        doc: doc.data() as ShirtDocument
      };
  }
}

export interface ShirtDocument {
  name: string;
  priceYen: number;
  end: firebase.firestore.Timestamp;
  availableSize: string[];
}

export class Storage {
  // "/shirts/${id}" directory以下のimageのURL一覧取得する。
  // Ordered by image name
  //
  // # Panic
  // if shirt is not available.
  static async queryShirtImageUrls(id: string): Promise<string[]> {
    const listResult = await firebase
      .storage()
      .ref(`shirts/${id}`)
      .list();
    const refs = listResult.items;
    refs.sort((a, b) => a.name.localeCompare(b.name));
    return await Promise.all(refs.map(ref => ref.getDownloadURL()));
  }
}
