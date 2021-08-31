// "viewport" rectangle is { top, left, width, height }

// "scaled" means that data structure stores (0, 1) coordinates.
// for clarity reasons I decided not to store actual (0, 1) coordinates, but
// provide width and height, so user can compute ratio himself if needed

import type { LTWH, Scaled, Viewport } from "../types";

interface WIDTH_HEIGHT {
  width: number;
  height: number;
}

export const viewportToScaled = (
  rect: LTWH,
  { width, height }: WIDTH_HEIGHT
): Scaled => {
  return {
    x1: rect.left,
    y1: rect.top,

    x2: rect.left + rect.width,
    y2: rect.top + rect.height,

    width,
    height,
  };
};

const pdfToViewport = (pdf: Scaled, viewport: Viewport): LTWH => {
  const [x1, y1, x2, y2] = viewport.convertToViewportRectangle([
    pdf.x1,
    pdf.y1,
    pdf.x2,
    pdf.y2,
  ]);

  return {
    left: x1,
    top: y1,

    width: x2 - x1,
    height: y1 - y2,
  };
};

export const scaledToViewport = (
  scaled: Scaled,
  viewport: Viewport,
  usePdfCoordinates: boolean = false
): LTWH => {
  const { width, height } = viewport;

  if (usePdfCoordinates) {
    return pdfToViewport(scaled, viewport);
  }

  if (scaled.x1 === undefined) {
    throw new Error("You are using old position format, please update");
  }

  const x1 = (width * scaled.x1) / scaled.width;
  const y1 = (height * scaled.y1) / scaled.height;

  const x2 = (width * scaled.x2) / scaled.width;
  const y2 = (height * scaled.y2) / scaled.height;

  return {
    left: x1,
    top: y1,
    width: x2 - x1,
    height: y2 - y1,
  };
};
