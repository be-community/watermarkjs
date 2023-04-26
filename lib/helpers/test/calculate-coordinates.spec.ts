import { calculateCoordinates } from "../calculate-coordinates";

const imageDimensions = {
  width: 600,
  height: 400,
};

const watermarkDimensions = { width: 100, height: 100 };

const width = imageDimensions.width - watermarkDimensions.width;
const height = imageDimensions.height - watermarkDimensions.height;

describe("Calculate image coordinates based on given position", () => {
  it("should calculate top-left position", () => {
    const sut = calculateCoordinates({
      position: "top-left",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: false,
    });

    expect(sut.x).toEqual(0);
    expect(sut.y).toEqual(0);
  });

  it("should calculate top-center position", () => {
    const sut = calculateCoordinates({
      position: "top-center",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: false,
    });

    expect(sut.x).toEqual(width / 2);
    expect(sut.y).toEqual(0);
  });

  it("should calculate top-right position", () => {
    const sut = calculateCoordinates({
      position: "top-right",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: false,
    });

    expect(sut.x).toEqual(width);
    expect(sut.y).toEqual(0);
  });

  it("should calculate center position", () => {
    const sut = calculateCoordinates({
      position: "center",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: false,
    });

    expect(sut.x).toEqual(width / 2);
    expect(sut.y).toEqual(height / 2);
  });

  it("should calculate center-left", () => {
    const sut = calculateCoordinates({
      position: "center-left",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: false,
    });

    expect(sut.x).toEqual(0);
    expect(sut.y).toEqual(height / 2);
  });

  it("should calculate center-right", () => {
    const sut = calculateCoordinates({
      position: "center-right",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: false,
    });

    expect(sut.x).toEqual(width);
    expect(sut.y).toEqual(height / 2);
  });

  it("should calculate bottom-left", () => {
    const sut = calculateCoordinates({
      position: "bottom-left",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: false,
    });

    expect(sut.x).toEqual(0);
    expect(sut.y).toEqual(height);
  });

  it("should calculate bottom-right", () => {
    const sut = calculateCoordinates({
      position: "bottom-right",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: false,
    });

    expect(sut.x).toEqual(500);
    expect(sut.y).toEqual(height);
  });

  it("should calculate bottom-center", () => {
    const sut = calculateCoordinates({
      position: "bottom-center",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: false,
    });

    expect(sut.x).toEqual(width / 2);
    expect(sut.y).toEqual(height);
  });
});

describe("Calculate text coordinates based on given position", () => {
  it("should calculate top-left position", () => {
    const sut = calculateCoordinates({
      position: "top-left",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: true,
    });

    expect(sut.x).toEqual(0);
    expect(sut.y).toEqual(watermarkDimensions.width * 3 + 10);
  });

  it("should calculate top-center position", () => {
    const sut = calculateCoordinates({
      position: "top-center",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: true,
    });

    expect(sut.x).toEqual(width / 2);
    expect(sut.y).toEqual(watermarkDimensions.width * 3 + 10);
  });

  it("should calculate top-right position", () => {
    const sut = calculateCoordinates({
      position: "top-right",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: true,
    });

    expect(sut.x).toEqual(width);
    expect(sut.y).toEqual(watermarkDimensions.width * 3 + 10);
  });

  it("should calculate center position", () => {
    const sut = calculateCoordinates({
      position: "center",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: true,
    });

    expect(sut.x).toEqual(width / 2);
    expect(sut.y).toEqual(height / 2);
  });

  it("should calculate center-left", () => {
    const sut = calculateCoordinates({
      position: "center-left",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: true,
    });

    expect(sut.x).toEqual(0);
    expect(sut.y).toEqual(height / 2);
  });

  it("should calculate center-right", () => {
    const sut = calculateCoordinates({
      position: "center-right",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: true,
    });

    expect(sut.x).toEqual(width);
    expect(sut.y).toEqual(height / 2);
  });

  it("should calculate bottom-left", () => {
    const sut = calculateCoordinates({
      position: "bottom-left",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: true,
    });

    expect(sut.x).toEqual(0);
    expect(sut.y).toEqual(height - watermarkDimensions.height * 2);
  });

  it("should calculate bottom-right", () => {
    const sut = calculateCoordinates({
      position: "bottom-right",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: true,
    });

    expect(sut.x).toEqual(500);
    expect(sut.y).toEqual(height - watermarkDimensions.height * 2);
  });

  it("should calculate bottom-center", () => {
    const sut = calculateCoordinates({
      position: "bottom-center",
      imageDimensions,
      watermarkDimensions,
      watermarkIsText: true,
    });

    expect(sut.x).toEqual(width / 2);
    expect(sut.y).toEqual(height - watermarkDimensions.height * 2);
  });
});
