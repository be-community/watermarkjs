import { WatermarkCanvas } from "./canvas";
import { calculateCoordinates } from "./helpers/calculate-coordinates";
import {
  WatermarkBaseCoordinates,
  WatermarkCoordinates,
  WatermarkImage,
  WatermarkText,
  Watermarked,
} from "./types/watermark";
import fetch from "node-fetch";

export class Watermark {
  private _image: Watermarked;
  private _original: Blob;

  private constructor(image: Blob) {
    this._original = image;
    this._image = Object.assign(image, { previewUrl: "" });
  }

  public static load(image: Blob) {
    return new Watermark(image);
  }

  public get original() {
    return this._original;
  }

  public get result() {
    return this._image;
  }

  private getCoordinates(
    isPortrait: boolean,
    coordinates: WatermarkCoordinates
  ) {
    if (isPortrait && coordinates.portrait) {
      return coordinates.portrait;
    }

    if (!isPortrait && coordinates.landscape) {
      return coordinates.landscape;
    }

    return coordinates as WatermarkBaseCoordinates;
  }

  public async applyImage({ path, coordinates, position }: WatermarkImage) {
    const promise = new Promise((resolve, reject) => {
      const watermarkCanvas = WatermarkCanvas.create();

      const image = document.createElement("img");

      image.src = URL.createObjectURL(this._image);

      image.onload = async () => {
        watermarkCanvas.setDimensions(image.width, image.height);
        // initializing the canvas with the original image
        watermarkCanvas.drawOriginal(image, 0, 0);

        // loading the watermark image and transforming it into a pattern
        const result = await fetch(path);
        const blob = await result.blob();
        const watermark = await createImageBitmap(blob);

        const isPortrait = image.height > image.width;

        let _coordinates = { x: 0, y: 0 };

        if (coordinates && !position) {
          _coordinates = this.getCoordinates(isPortrait, coordinates);
        }

        if (position) {
          _coordinates = calculateCoordinates({
            position,
            imageDimensions: {
              height: image.height,
              width: image.width,
            },
            watermarkDimensions: {
              height: watermark.height,
              width: watermark.width,
            },
            watermarkIsText: false,
          });
        }

        watermarkCanvas.drawWatermarkImage(
          watermark,
          _coordinates.x,
          _coordinates.y,
          watermark.width,
          watermark.height
        );

        return watermarkCanvas.result((_blob) => resolve(_blob));
      };

      image.onerror = () =>
        reject(new Error(`${this._image.name} has invalid image format.`));
    }) as Promise<Blob | null>;

    const file = await promise;

    if (!file) {
      throw new Error(`an error has occured on ${this._image.name}`);
    }

    this._image = Object.assign(file, {
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    });

    return this;
  }

  public async applyText({
    text,
    coordinates,
    style,
    position,
  }: WatermarkText) {
    const promise = new Promise((resolve, reject) => {
      const watermarkCanvas = WatermarkCanvas.create({ textStyle: style });

      const image = document.createElement("img");

      image.src = URL.createObjectURL(this._image);

      image.onload = async () => {
        watermarkCanvas.setDimensions(image.width, image.height);
        // initializing the canvas with the original image
        watermarkCanvas.drawOriginal(image, 0, 0);

        const isPortrait = image.height > image.width;

        let _coordinates = { x: 0, y: 0 };

        if (coordinates && !position) {
          _coordinates = this.getCoordinates(isPortrait, coordinates);
        }

        watermarkCanvas.applyTextStyles();

        const metrics = watermarkCanvas.context.measureText(text);
        const watermarkHeight =
          metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent;
        const watermarkWidth = metrics.width;

        if (position) {
          _coordinates = calculateCoordinates({
            position,
            imageDimensions: {
              height: image.height,
              width: image.width,
            },
            watermarkDimensions: {
              height: watermarkHeight,
              width: watermarkWidth,
            },
            watermarkIsText: true,
          });
        }

        // adding a watermark text
        watermarkCanvas.drawWatermarkText(text, _coordinates.x, _coordinates.y);

        return watermarkCanvas.result((blob) => resolve(blob));
      };

      /* c8 ignore next */
      image.onerror = () =>
        reject(new Error(`${this._image.name} has invalid image format.`));
    }) as Promise<Blob | null>;

    const file = await promise;

    if (!file) {
      throw new Error(`an error has occured on ${this._image.name}`);
    }

    this._image = Object.assign(file, {
      name: file.name,
      previewUrl: URL.createObjectURL(file),
    });

    return this;
  }
}
