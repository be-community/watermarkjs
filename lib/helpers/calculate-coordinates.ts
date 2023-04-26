import { WatermarkPosition } from "../types/watermark";

interface CalculateCoordinates {
  position: WatermarkPosition;
  imageDimensions: {
    height: number;
    width: number;
  };
  watermarkDimensions: {
    height: number;
    width: number;
  };
  watermarkIsText: boolean;
}

export function calculateCoordinates({
  position,
  imageDimensions,
  watermarkDimensions,
  watermarkIsText,
}: CalculateCoordinates) {
  const height = imageDimensions.height - watermarkDimensions.height;
  const width = imageDimensions.width - watermarkDimensions.width;
  const centerVertically = height / 2;
  const centerHorizontally = width / 2;

  const verticalStartOrigin = watermarkIsText
    ? watermarkDimensions.height * 3 + 10
    : 0;

  const verticalEndOrigin = watermarkIsText
    ? height - watermarkDimensions.height * 2
    : height;

  const positions: Record<WatermarkPosition, { x: number; y: number }> = {
    "top-left": { x: 0, y: verticalStartOrigin },
    "top-center": { x: centerHorizontally, y: verticalStartOrigin },
    "top-right": { x: width, y: verticalStartOrigin },

    center: { x: centerHorizontally, y: centerVertically },
    "center-left": { x: 0, y: centerVertically },
    "center-right": { x: width, y: centerVertically },

    "bottom-center": { x: centerHorizontally, y: verticalEndOrigin },
    "bottom-left": { x: 0, y: verticalEndOrigin },
    "bottom-right": { x: width, y: verticalEndOrigin },
  };

  return positions[position];
}
