import { Watermark } from "..";

it("should load a image", () => {
  const imageBlob = new Blob();

  const sut = Watermark.load(imageBlob);

  expect(sut).toBeInstanceOf(Watermark);
  expect(sut.original).toBe(imageBlob);
  expect(sut.result).toBe(imageBlob);
});

describe("Apply Image", () => {
  it("should add a image as watermark without coordinates and position", async () => {
    global.URL.createObjectURL = jest
      .fn()
      .mockReturnValue("https://placehold.co/600x400");

    const imageBlob = new Blob();

    const sut = await Watermark.load(imageBlob).applyImage({
      path: "https://placehold.co/600x400",
    });

    expect(sut).toBeInstanceOf(Watermark);
    expect(sut.original).toBe(imageBlob);
    expect(sut.result).not.toBeUndefined();
    expect(sut.result).not.toEqual(imageBlob);
    expect(sut.result.previewUrl).not.toEqual("");
    expect(sut.result.name).toEqual(imageBlob.name);
    expect(sut.result.size).not.toEqual(imageBlob.size);
  });

  it("should add a image as watermark with default coordinates", async () => {
    global.URL.createObjectURL = jest
      .fn()
      .mockReturnValue("https://placehold.co/600x400");

    const imageBlob = new Blob();

    const sut = await Watermark.load(imageBlob).applyImage({
      path: "https://placehold.co/600x400",
      coordinates: {
        x: 0,
        y: 0,
      },
    });

    expect(sut).toBeInstanceOf(Watermark);
    expect(sut.original).toBe(imageBlob);
    expect(sut.result).not.toBeUndefined();
    expect(sut.result).not.toEqual(imageBlob);
    expect(sut.result.previewUrl).not.toEqual("");
    expect(sut.result.name).toEqual(imageBlob.name);
    expect(sut.result.size).not.toEqual(imageBlob.size);
  });

  it("should add a image as watermark with portrait coordinates", async () => {
    global.URL.createObjectURL = jest
      .fn()
      .mockReturnValue("https://placehold.co/400x600");

    const imageBlob = new Blob();

    const sut = await Watermark.load(imageBlob).applyImage({
      path: "https://placehold.co/400x600",
      coordinates: {
        portrait: {
          x: 0,
          y: 0,
        },
      },
    });

    expect(sut).toBeInstanceOf(Watermark);
    expect(sut.original).toBe(imageBlob);
    expect(sut.result).not.toBeUndefined();
    expect(sut.result).not.toEqual(imageBlob);
    expect(sut.result.previewUrl).not.toEqual("");
    expect(sut.result.name).toEqual(imageBlob.name);
    expect(sut.result.size).not.toEqual(imageBlob.size);
  });

  it("should add a image as watermark with landscape coordinates", async () => {
    global.URL.createObjectURL = jest
      .fn()
      .mockReturnValue("https://placehold.co/600x400");

    const imageBlob = new Blob();

    const sut = await Watermark.load(imageBlob).applyImage({
      path: "https://placehold.co/600x400",
      coordinates: {
        landscape: {
          x: 0,
          y: 0,
        },
      },
    });

    expect(sut).toBeInstanceOf(Watermark);
    expect(sut.original).toBe(imageBlob);
    expect(sut.result).not.toBeUndefined();
    expect(sut.result).not.toEqual(imageBlob);
    expect(sut.result.previewUrl).not.toEqual("");
    expect(sut.result.name).toEqual(imageBlob.name);
    expect(sut.result.size).not.toEqual(imageBlob.size);
  });

  it("should add a image as watermark with position", async () => {
    global.URL.createObjectURL = jest
      .fn()
      .mockReturnValue("https://placehold.co/600x400");

    const imageBlob = new Blob();

    const sut = await Watermark.load(imageBlob).applyImage({
      path: "https://placehold.co/600x400",
      position: "center",
    });

    expect(sut).toBeInstanceOf(Watermark);
    expect(sut.original).toBe(imageBlob);
    expect(sut.result).not.toBeUndefined();
    expect(sut.result).not.toEqual(imageBlob);
    expect(sut.result.previewUrl).not.toEqual("");
    expect(sut.result.name).toEqual(imageBlob.name);
    expect(sut.result.size).not.toEqual(imageBlob.size);
  });

  it("should throw an error when image is invalid", async () => {
    global.URL.createObjectURL = jest.fn().mockReturnValue("google.com");

    const imageBlob = new Blob();

    try {
      await Watermark.load(imageBlob).applyImage({ path: "google.com" });
    } catch (error) {
      expect(error.message).toEqual("undefined has invalid image format.");
    }
  });

  it("should throw an error when blob is null", async () => {
    jest
      .spyOn(HTMLCanvasElement.prototype, "toBlob")
      .mockImplementationOnce((callback) => {
        callback(null);
      });

    global.URL.createObjectURL = jest
      .fn()
      .mockReturnValue("https://placehold.co/600x400");

    const imageBlob = new Blob();

    try {
      await Watermark.load(imageBlob).applyImage({
        path: "https://placehold.co/600x400",
      });
    } catch (error) {
      expect(error.message).toEqual("an error has occured on undefined");
    }
  });
});

describe("Apply Text", () => {
  it("should add a text as watermark without coordinates and position", async () => {
    const imageBlob = new Blob();

    const sut = await Watermark.load(imageBlob).applyText({ text: "" });

    expect(sut).toBeInstanceOf(Watermark);
    expect(sut.original).toBe(imageBlob);
    expect(sut.result).not.toBeUndefined();
    expect(sut.result).not.toEqual(imageBlob);
    expect(sut.result.previewUrl).not.toEqual("");
    expect(sut.result.name).toEqual(imageBlob.name);
    expect(sut.result.size).not.toEqual(imageBlob.size);
  });

  it("should add a text as watermark with default coordinates", async () => {
    const imageBlob = new Blob();

    const sut = await Watermark.load(imageBlob).applyText({
      text: "teste",
      coordinates: {
        x: 0,
        y: 0,
      },
    });

    expect(sut).toBeInstanceOf(Watermark);
    expect(sut.original).toBe(imageBlob);
    expect(sut.result).not.toBeUndefined();
    expect(sut.result).not.toEqual(imageBlob);
    expect(sut.result.previewUrl).not.toEqual("");
    expect(sut.result.name).toEqual(imageBlob.name);
    expect(sut.result.size).not.toEqual(imageBlob.size);
  });

  it("should add a text as watermark with portrait coordinates", async () => {
    const imageBlob = new Blob();

    const sut = await Watermark.load(imageBlob).applyText({
      text: "test",
      coordinates: {
        portrait: {
          x: 0,
          y: 0,
        },
      },
    });

    expect(sut).toBeInstanceOf(Watermark);
    expect(sut.original).toBe(imageBlob);
    expect(sut.result).not.toBeUndefined();
    expect(sut.result).not.toEqual(imageBlob);
    expect(sut.result.previewUrl).not.toEqual("");
    expect(sut.result.name).toEqual(imageBlob.name);
    expect(sut.result.size).not.toEqual(imageBlob.size);
  });

  it("should add a text as watermark with landscape coordinates", async () => {
    const imageBlob = new Blob();

    const sut = await Watermark.load(imageBlob).applyText({
      text: "test",
      coordinates: {
        landscape: {
          x: 0,
          y: 0,
        },
      },
    });

    expect(sut).toBeInstanceOf(Watermark);
    expect(sut.original).toBe(imageBlob);
    expect(sut.result).not.toBeUndefined();
    expect(sut.result).not.toEqual(imageBlob);
    expect(sut.result.previewUrl).not.toEqual("");
    expect(sut.result.name).toEqual(imageBlob.name);
    expect(sut.result.size).not.toEqual(imageBlob.size);
  });

  it("should add a text as watermark with position", async () => {
    const imageBlob = new Blob();

    const sut = await Watermark.load(imageBlob).applyText({
      text: "test",
      position: "center",
    });

    expect(sut).toBeInstanceOf(Watermark);
    expect(sut.original).toBe(imageBlob);
    expect(sut.result).not.toBeUndefined();
    expect(sut.result).not.toEqual(imageBlob);
    expect(sut.result.previewUrl).not.toEqual("");
    expect(sut.result.name).toEqual(imageBlob.name);
    expect(sut.result.size).not.toEqual(imageBlob.size);
  });

  it("should throw an error when blob is null", async () => {
    jest
      .spyOn(HTMLCanvasElement.prototype, "toBlob")
      .mockImplementationOnce((callback) => {
        callback(null);
      });

    global.URL.createObjectURL = jest
      .fn()
      .mockReturnValue("https://placehold.co/600x400");

    const imageBlob = new Blob();

    try {
      await Watermark.load(imageBlob).applyText({
        text: "teste",
      });
    } catch (error) {
      expect(error.message).toEqual("an error has occured on undefined");
    }
  });
});
