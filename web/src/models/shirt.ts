import moment, { Moment } from "moment";

import { Firestore, Storage } from "infra/firebase";
import { buyShirt } from "infra/stripe";
import { Image } from "models/image";

export class Shirt {
  constructor(
    readonly id: string,
    readonly name: string,
    readonly priceYen: number,
    readonly end: Moment,
    readonly availableSize: string[],
    readonly thumbnail: Image
  ) {}

  static createDemoShirt(thumbnail: Image): Shirt {
    return new Shirt(
      "demo",
      "The demo t-shirt",
      4200,
      moment().add(7, "hours"),
      ["S", "M", "L", "XL"],
      thumbnail
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
      const thumbnail = await Image.download(thumbnailUrl);
      return new Shirt(
        id,
        doc.name,
        doc.priceYen,
        moment(doc.end.toMillis()),
        doc.availableSize,
        thumbnail
      );
    }
  }
}
