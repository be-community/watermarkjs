interface Watermarked extends Blob {
    previewUrl: string;
}
type WatermarkPosition = "top-left" | "top-center" | "top-right" | "center" | "center-left" | "center-right" | "bottom-left" | "bottom-center" | "bottom-right";
interface WatermarkBaseCoordinates {
    x: number;
    y: number;
}
type WatermarkCoordinates = {
    landscape: WatermarkBaseCoordinates;
    portrait?: undefined;
    x?: undefined;
    y?: undefined;
} | {
    portrait: WatermarkBaseCoordinates;
    landscape?: undefined;
    x?: undefined;
    y?: undefined;
} | {
    landscape: WatermarkBaseCoordinates;
    portrait: WatermarkBaseCoordinates;
    x?: undefined;
    y?: undefined;
} | {
    x: number;
    y: number;
    landscape?: undefined;
    portrait?: undefined;
};
interface WatermarkImage {
    path: string;
    coordinates?: WatermarkCoordinates;
    position?: WatermarkPosition;
}
interface WatermarkTextStyle {
    weight?: string | number;
    family?: string;
    color?: CanvasFillStrokeStyles["fillStyle"];
    size?: string;
    baseline?: CanvasTextBaseline;
}
interface WatermarkText {
    text: string;
    style?: WatermarkTextStyle;
    coordinates?: WatermarkCoordinates;
    position?: WatermarkPosition;
}

declare class Watermark {
    private _image;
    private _original;
    private constructor();
    static load(image: Blob): Watermark;
    get original(): Blob;
    get result(): Watermarked;
    private getCoordinates;
    applyImage({ path, coordinates, position }: WatermarkImage): Promise<this>;
    applyText({ text, coordinates, style, position, }: WatermarkText): Promise<this>;
}

type WatemarkCanvasPattern = "repeat" | "no-repeat" | "repeat-x" | "repeat-y";

export { WatemarkCanvasPattern, WatermarkBaseCoordinates, WatermarkCoordinates, WatermarkImage, WatermarkPosition, WatermarkText, WatermarkTextStyle, Watermarked, Watermark as default };
