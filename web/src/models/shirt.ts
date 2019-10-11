import moment, { Moment } from "moment";

import { Firestore, Storage } from "infra/firebase";
import { Image } from "models/image";

export class Shirt {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly priceYen: number,
    readonly end: Moment,
    readonly availableSize: string[],
    readonly images: Image[]
  ) {}

  static createDemoShirt(images: Image[]): Shirt {
    return new Shirt(
      "demo",
      "The demo t-shirt",
      4200,
      moment().add(7, "hours"),
      ["S", "M", "L", "XL"],
      images
    );
  }
}

export class ShirtRepository {
  static async fetchAvailableOne(): Promise<Shirt | null> {
    const res = await Firestore.fetchAvailableShirt();
    if (!res) {
      return null;
    } else {
      const { id, doc } = res;
      const images = await fetchShirtImages(id);
      return new Shirt(
        id,
        doc.name,
        doc.priceYen,
        moment(doc.end.toMillis()),
        doc.availableSize,
        images
      );
    }
  }

  static async fetchDemoOneForTesting(): Promise<Shirt> {
    const res = await Firestore.fetchShirtById("DEMO");
    if (!res) {
      throw new Error("Demo shirt is not available");
    } else {
      const { id, doc } = res;
      const images = await fetchShirtImages(id);
      return new Shirt(
        id,
        doc.name,
        doc.priceYen,
        moment(doc.end.toMillis()),
        doc.availableSize,
        images
      );
    }
  }
}

async function fetchShirtImages(id: string): Promise<Image[]> {
  const urls = await Storage.queryShirtImageUrls(id);
  return await Promise.all(urls.map(url => Image.download(url)));
}
