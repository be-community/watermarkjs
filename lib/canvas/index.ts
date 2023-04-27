import { WatermarkTextStyle } from "../types/watermark";

export class WatermarkCanvas {
  public readonly canvas: HTMLCanvasElement;
  public readonly context: CanvasRenderingContext2D;
  private _quality = 1;
  private textStyle: WatermarkTextStyle;

  private constructor(textStyle?: WatermarkTextStyle) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    const _textStyle = {
      weight: textStyle?.weight || "bold",
      family: textStyle?.family || "serif",
      size: textStyle?.size || "24px",
      color: textStyle?.color || "#000000",
      baseline: textStyle?.baseline || "middle",
    };

    this.textStyle = _textStyle;
  }

  public static create(props?: { textStyle?: WatermarkTextStyle }) {
    return new WatermarkCanvas(props?.textStyle);
  }

  public setDimensions(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;

    return this;
  }

  public drawOriginal(
    // eslint-disable-next-line no-undef
    image: CanvasImageSource,
    coordX: number,
    coordY: number
  ) {
    this.context.drawImage(
      image,
      coordX,
      coordY,
      this.canvas.width,
      this.canvas.height
    );

    return this;
  }

  public drawWatermarkImage(
    // eslint-disable-next-line no-undef
    image: CanvasImageSource,
    coordX: number,
    coordY: number,
    width: number,
    height: number
  ) {
    this.context.drawImage(image, coordX, coordY, width, height);

    return this;
  }

  public applyTextStyles() {
    this.context.fillStyle = this.textStyle.color;
    this.context.textBaseline = this.textStyle.baseline;
    this.context.font = `${this.textStyle.weight} ${this.textStyle.size} ${this.textStyle.family}`;

    return this;
  }

  public drawWatermarkText(text: string, coordX: number, coordY: number) {
    this.context.fillText(text, coordX, coordY);

    return this;
  }

  public result(resolve: (value: Blob | PromiseLike<Blob>) => void) {
    this.context.canvas.toBlob(
      (_blob) => {
        resolve(_blob);
      },
      "image/jpeg",
      this._quality
    );
  }
}
