var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var watermark_browser_exports = {};
__export(watermark_browser_exports, {
  default: () => watermark_browser_default
});
module.exports = __toCommonJS(watermark_browser_exports);

// lib/canvas/index.ts
var WatermarkCanvas = class {
  canvas;
  context;
  _quality = 1;
  textStyle;
  constructor(textStyle) {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");
    const _textStyle = {
      weight: textStyle?.weight || "bold",
      family: textStyle?.family || "serif",
      size: textStyle?.size || "100px",
      color: textStyle?.color || "#000000",
      baseline: textStyle?.baseline || "middle"
    };
    this.textStyle = _textStyle;
  }
  static create(props) {
    return new WatermarkCanvas(props?.textStyle);
  }
  setDimensions(width, height) {
    this.canvas.width = width;
    this.canvas.height = height;
    return this;
  }
  drawOriginal(image, coordX, coordY) {
    this.context.drawImage(
      image,
      coordX,
      coordY,
      this.canvas.width,
      this.canvas.height
    );
    return this;
  }
  drawWatermarkImage(image, coordX, coordY, width, height) {
    this.context.drawImage(image, coordX, coordY, width, height);
    return this;
  }
  applyTextStyles() {
    this.context.fillStyle = this.textStyle.color;
    this.context.textBaseline = this.textStyle.baseline;
    this.context.font = `${this.textStyle.weight} ${this.textStyle.size} ${this.textStyle.family}`;
    return this;
  }
  drawWatermarkText(text, coordX, coordY) {
    this.context.fillText(text, coordX, coordY);
    return this;
  }
  result(resolve) {
    this.context.canvas.toBlob(
      (_blob) => {
        resolve(_blob);
      },
      "image/jpeg",
      this._quality
    );
  }
};

// lib/helpers/calculate-coordinates.ts
function calculateCoordinates({
  position,
  imageDimensions,
  watermarkDimensions,
  watermarkIsText
}) {
  const height = imageDimensions.height - watermarkDimensions.height;
  const width = imageDimensions.width - watermarkDimensions.width;
  const centerVertically = height / 2;
  const centerHorizontally = width / 2;
  const verticalStartOrigin = watermarkIsText ? watermarkDimensions.height * 3 + 10 : 0;
  const verticalEndOrigin = watermarkIsText ? height - watermarkDimensions.height * 2 : height;
  const positions = {
    "top-left": { x: 0, y: verticalStartOrigin },
    "top-center": { x: centerHorizontally, y: verticalStartOrigin },
    "top-right": { x: width, y: verticalStartOrigin },
    center: { x: centerHorizontally, y: centerVertically },
    "center-left": { x: 0, y: centerVertically },
    "center-right": { x: width, y: centerVertically },
    "bottom-center": { x: centerHorizontally, y: verticalEndOrigin },
    "bottom-left": { x: 0, y: verticalEndOrigin },
    "bottom-right": { x: width, y: verticalEndOrigin }
  };
  return positions[position];
}

// lib/index.ts
var import_node_fetch = __toESM(require("node-fetch"), 1);
var Watermark = class {
  _image;
  _original;
  constructor(image) {
    this._original = image;
    this._image = Object.assign(image, { previewUrl: "" });
  }
  static load(image) {
    return new Watermark(image);
  }
  get original() {
    return this._original;
  }
  get result() {
    return this._image;
  }
  getCoordinates(isPortrait, coordinates) {
    if (isPortrait && coordinates.portrait) {
      return coordinates.portrait;
    }
    if (!isPortrait && coordinates.landscape) {
      return coordinates.landscape;
    }
    return coordinates;
  }
  async applyImage({ path, coordinates, position }) {
    const promise = new Promise((resolve, reject) => {
      const watermarkCanvas = WatermarkCanvas.create();
      const image = document.createElement("img");
      image.src = URL.createObjectURL(this._image);
      image.onload = async () => {
        watermarkCanvas.setDimensions(image.width, image.height);
        watermarkCanvas.drawOriginal(image, 0, 0);
        const result = await (0, import_node_fetch.default)(path);
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
              width: image.width
            },
            watermarkDimensions: {
              height: watermark.height,
              width: watermark.width
            },
            watermarkIsText: false
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
      image.onerror = () => reject(new Error(`${this._image.name} has invalid image format.`));
    });
    const file = await promise;
    if (!file) {
      throw new Error(`an error has occured on ${this._image.name}`);
    }
    this._image = Object.assign(file, {
      name: file.name,
      previewUrl: URL.createObjectURL(file)
    });
    return this;
  }
  async applyText({
    text,
    coordinates,
    style,
    position
  }) {
    const promise = new Promise((resolve, reject) => {
      const watermarkCanvas = WatermarkCanvas.create({ textStyle: style });
      const image = document.createElement("img");
      image.src = URL.createObjectURL(this._image);
      image.onload = async () => {
        watermarkCanvas.setDimensions(image.width, image.height);
        watermarkCanvas.drawOriginal(image, 0, 0);
        const isPortrait = image.height > image.width;
        let _coordinates = { x: 0, y: 0 };
        if (coordinates && !position) {
          _coordinates = this.getCoordinates(isPortrait, coordinates);
        }
        watermarkCanvas.applyTextStyles();
        const metrics = watermarkCanvas.context.measureText(text);
        const watermarkHeight = metrics.fontBoundingBoxAscent - metrics.fontBoundingBoxDescent;
        const watermarkWidth = metrics.width;
        if (position) {
          _coordinates = calculateCoordinates({
            position,
            imageDimensions: {
              height: image.height,
              width: image.width
            },
            watermarkDimensions: {
              height: watermarkHeight,
              width: watermarkWidth
            },
            watermarkIsText: true
          });
        }
        watermarkCanvas.drawWatermarkText(text, _coordinates.x, _coordinates.y);
        return watermarkCanvas.result((blob) => resolve(blob));
      };
      image.onerror = () => reject(new Error(`${this._image.name} has invalid image format.`));
    });
    const file = await promise;
    if (!file) {
      throw new Error(`an error has occured on ${this._image.name}`);
    }
    this._image = Object.assign(file, {
      name: file.name,
      previewUrl: URL.createObjectURL(file)
    });
    return this;
  }
};

// index.ts
var watermark_browser_default = Watermark;
