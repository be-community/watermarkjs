export interface Watermarked extends Blob {
  previewUrl: string;
}

export type WatermarkPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "center"
  | "center-left"
  | "center-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface WatermarkBaseCoordinates {
  x: number;
  y: number;
}

export type WatermarkCoordinates =
  | {
      landscape: WatermarkBaseCoordinates;
      portrait?: undefined;
      x?: undefined;
      y?: undefined;
    }
  | {
      portrait: WatermarkBaseCoordinates;
      landscape?: undefined;
      x?: undefined;
      y?: undefined;
    }
  | {
      landscape: WatermarkBaseCoordinates;
      portrait: WatermarkBaseCoordinates;
      x?: undefined;
      y?: undefined;
    }
  | { x: number; y: number; landscape?: undefined; portrait?: undefined };

export interface WatermarkImage {
  path: string;
  coordinates?: WatermarkCoordinates;
  position?: WatermarkPosition;
}

export interface WatermarkTextStyle {
  weight?: string | number;
  family?: string;
  // eslint-disable-next-line no-undef
  color?: CanvasFillStrokeStyles["fillStyle"];
  size?: string;
  // eslint-disable-next-line no-undef
  baseline?: CanvasTextBaseline;
}

export interface WatermarkText {
  text: string;
  style?: WatermarkTextStyle;
  coordinates?: WatermarkCoordinates;
  position?: WatermarkPosition;
}
