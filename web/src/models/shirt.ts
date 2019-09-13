import moment, { Moment } from "moment";

import { Firestore, Storage } from "infra/firebase";
import { buyShirt } from "infra/stripe";

export class Shirt {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly priceYen: number,
    readonly end: Moment,
    readonly availableSize: string[],
    readonly thumbnailUrl: string
  ) {}

  static createDemoShirt(thumbnailUrl: string): Shirt {
    return new Shirt(
      "demo",
      "The demo t-shirt",
      4200,
      moment().add(7, "hours"),
      ["S", "M", "L", "XL"],
      thumbnailUrl
    );
  }

  buy(size: string): Promise<void> {
    return buyShirt(this.id, size);
  }
}

export class ShirtRepository {
  static async fetchAvailableOne(): Promise<Shirt | null> {
    const res = await Firestore.fetchAvailableShirt();
    if (!res) {
      return null;
    } else {
      const { id, doc } = res;
      const thumbnailUrl = await Storage.queryShirtThumbnailUrl(id);
      return new Shirt(
        id,
        doc.name,
        doc.priceYen,
        moment(doc.end.toMillis()),
        doc.availableSize,
        thumbnailUrl
      );
    }
  }
}
