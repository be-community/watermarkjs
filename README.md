# Watermark.js

Watermark.js is a lightweight library for adding watermarks to images in the browser using the HTML5 Canvas API. This library supports both image and text watermarks and can apply multiple watermarks using the same watermark instance.

## Installation

You can install this package using [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/) or [pnpm](https://pnpm.io/):

```bash
npm install @be-tech/watermarkjs
```

or

```bash
yarn add @be-tech/watermarkjs
```

or

```bash
pnpm install @be-tech/watermarkjs
```

## Usage

To use Watermark.js, simply create a new instance of the `Watermark` class by passing in the image you want to watermark:

### Using React

```javascript
import React, { useState } from "react";
import Watermark from "@be-tech/watermarkjs";

function WatermarkExample() {
  const [image, setImage] = useState(null);
  const [watermarkedImage, setWatermarkedImage] = useState(null);

  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    setImage(file);
  };

  const handleWatermarkClick = async () => {
    try {

      // pass the image to apply watermark
      const watermark = Watermark.load(image);

      await watermark.applyText({
        text: "Watermark Text",
        position: "bottom-center",
        style: {
          size: "48px",
          family: "Arial",
          color: "white",
        },
      });

      // get the image with all watermark added
      const watermarked = watermark.result;

      setWatermarkedImage(watermarked);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileInputChange} />
      <button onClick={handleWatermarkClick}>Add Watermark</button>
      {watermarkedImage && (
        <img src={watermarkedImage.previewUrl} alt="Watermarked Image" />
      )}
    </div>
  );
}

export default WatermarkExample;
```


## Methods

| Method                                            | Description                                                                                                                                   |
|---------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------|
| `Watermark.load(image: Blob): Watermark`          | Creates a new instance of the `Watermark` class by passing in the image you want to watermark. Returns the `Watermark` instance.              |
| `Watermark.applyText(options: WatermarkText): Watermark`   | Applies a text watermark to the image. The `options` parameter is an object with the following properties: `text`, `coordinates`, `position`, and `style`. |
| `Watermark.applyImage(options: WatermarkImage): Watermark` | Applies an image watermark to the image. The `options` parameter is an object with the following properties: `path`, `coordinates`, and `position`. |
| `Watermark.original: Blob`                       | Getter that returns the original image passed into the `load` method.                                                                         |
| `Watermark.result: Watermarked`                         | Getter that returns the watermarked image after all the watermarking operations have been applied. You can use the result as preview through ``Watermarked.previewUrl``                                            |

## Options

| Option              | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
|----------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `text`               | The text to use as the watermark.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `path`               | The path of the image to use as the watermark.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
| `coordinates` (optional)        | An object with `x` and `y` properties indicating the coordinates of the watermark. Defaults to `{ x: 0, y: 0 }`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `coordinates.portrait` (optional)       | An object with `x` and `y` properties indicating the coordinates of the watermark. Should be applied if original image is portrait.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `coordinates.landscape` (optional)       | An object with `x` and `y` properties indicating the coordinates of the watermark. Should be applied if original image is landscape.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `position` (optional)           | A string with one of the following values: `top-left`, `top`, `top-right`, `left`, `center`, `right`, `bottom-left`, `bottom`, or `bottom-right`. This will override the `coordinates` property.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| `style` (optional)              | An object with the following properties: `size`, `weight`, `color`, `family`, and `baseline`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |
| `style.size` (optional)               | The font size for the watermark text. Defaults to `'24px'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| `style.weight` (optional)             | The font weight for the watermark text. Defaults to `'bold'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `style.color` (optional)              | The color for the watermark text. Defaults to `'#000000'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          |
| `style.family` (optional)             | The font family for the watermark text. Defaults to `'serif'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `style.baseline` (optional)           | The baseline for the watermark text. Defaults to `'middle'`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |