export class Image {
  constructor(readonly url: string) {}

  static async download(externalUrl: string): Promise<Image> {
    const res = await fetch(externalUrl);
    const blob = await res.blob();
    return new Image(window.URL.createObjectURL(blob));
  }
}
