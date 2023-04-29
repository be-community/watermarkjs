import { WatermarkCanvas } from "..";

it("should create a canvas", () => {
  const sut = WatermarkCanvas.create();

  expect(sut).toBeInstanceOf(WatermarkCanvas);
  expect(sut.canvas).toBeDefined();
  expect(sut.context).toBeDefined();
});

it("should set canvas dimensions", () => {
  const sut = WatermarkCanvas.create().setDimensions(100, 100);

  expect(sut).toBeInstanceOf(WatermarkCanvas);
  expect(sut.canvas.width).toEqual(100);
  expect(sut.canvas.height).toEqual(100);
});

it("should draw original image into canvas", () => {
  const image = document.createElement("img");
  const sut = WatermarkCanvas.create()
    .setDimensions(100, 100)
    .drawOriginal(image, 0, 0);

  expect(sut).toBeInstanceOf(WatermarkCanvas);
  expect(sut.context.drawImage).toHaveBeenCalled();
  expect(sut.context.drawImage).toHaveBeenCalledWith(
    image,
    0,
    0,
    sut.canvas.width,
    sut.canvas.height
  );
});

it("should draw watemark image into canvas", () => {
  const image = document.createElement("img");

  const sut = WatermarkCanvas.create()
    .setDimensions(50, 50)
    .drawWatermarkImage(image, 0, 0, 50, 50);

  expect(sut).toBeInstanceOf(WatermarkCanvas);
  expect(sut.context.drawImage).toHaveBeenCalled();
  expect(sut.context.drawImage).toHaveBeenCalledWith(image, 0, 0, 50, 50);
});

it("should apply default text styles into canvas", () => {
  const sut = WatermarkCanvas.create().setDimensions(50, 50).applyTextStyles();

  expect(sut).toBeInstanceOf(WatermarkCanvas);
  expect(sut.context.fillStyle).toBe("#000000");
  expect(sut.context.textBaseline).toBe("middle");
  expect(sut.context.font).toBe("bold 24px serif");
});

it("should apply custom text styles into canvas", () => {
  const sut = WatermarkCanvas.create({
    textStyle: {
      color: "#ffffff",
      baseline: "bottom",
      family: "Inter",
      size: "12px",
      weight: "500",
    },
  })
    .setDimensions(50, 50)
    .applyTextStyles();

  expect(sut).toBeInstanceOf(WatermarkCanvas);
  expect(sut.context.fillStyle).toBe("#ffffff");
  expect(sut.context.textBaseline).toBe("bottom");
  expect(sut.context.font).toBe("500 12px Inter");
});

it("should resolve result", () => {
  const blob = new Blob();

  jest
    .spyOn(HTMLCanvasElement.prototype, "toBlob")
    .mockImplementationOnce((callback) => {
      callback(blob);
    });

  const image = document.createElement("img");

  const callback = jest.fn();
  WatermarkCanvas.create()
    .setDimensions(100, 100)
    .drawOriginal(image, 0, 0)
    .drawWatermarkImage(image, 0, 0, 0, 0)
    .result(callback);

  expect(callback).toHaveBeenCalled();
  expect(callback).toHaveBeenCalledWith(blob);
});
