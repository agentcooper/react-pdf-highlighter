// "viewport" rectangle is { top, left, width, height }

// "scaled" means that data structure stores (0, 1) coordinates.
// for clarity reasons I decided not to store actual (0, 1) coordinates, but
// provide width and height, so user can compute ratio himself if needed

import type { LTWHP, Scaled, Viewport } from "../types";

interface WIDTH_HEIGHT {
  width: number;
  height: number;
}

export const viewportToScaled = (
  rect: LTWHP,
  { width, height }: WIDTH_HEIGHT,
  pagesRotation: Number = 0
): Scaled => {
  const leftNormal = rect.left / width;
  const rightNormal = (rect.left + rect.width) / width;
  const topNormal = rect.top / height;
  const bottomNormal = (rect.top + rect.height) / height;

  let pageWidth = width;
  let pageHeight = height;
  if (pagesRotation === 90 || pagesRotation === 270) {
    pageWidth = height;
    pageHeight = width;
  }

  let x1 = width * leftNormal;
  let x2 = width * rightNormal;
  let y1 = height * topNormal;
  let y2 = height * bottomNormal;

  switch (pagesRotation) {
    case 90:
      x1 = height * topNormal;
      x2 = height * bottomNormal;
      y1 = width - width * rightNormal;
      y2 = width - width * leftNormal;
      break;
    case 180:
      x1 = width - width * rightNormal;
      x2 = width - width * leftNormal;
      y1 = height - height * bottomNormal;
      y2 = height - height * topNormal;
      break;
    case 270:
      x1 = height - height * bottomNormal;
      x2 = height - height * topNormal;
      y1 = width * leftNormal;
      y2 = width * rightNormal;
      break;
    default:
      break;
  }

  return {
    x1,
    y1,

    x2,
    y2,

    width: pageWidth,
    height: pageHeight,

    pageNumber: rect.pageNumber,
  };
};

const pdfToViewport = (pdf: Scaled, viewport: Viewport): LTWHP => {
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

    pageNumber: pdf.pageNumber,
  };
};

export const scaledToViewport = (
  scaled: Scaled,
  viewport: Viewport,
  usePdfCoordinates: boolean = false,
  pagesRotation: Number = 0
): LTWHP => {
  const { width, height } = viewport;

  if (usePdfCoordinates) {
    return pdfToViewport(scaled, viewport);
  }

  if (scaled.x1 === undefined) {
    throw new Error("You are using old position format, please update");
  }

  const leftNormal = scaled.x1 / scaled.width;
  const rightNormal = scaled.x2 / scaled.width;
  const topNormal = scaled.y1 / scaled.height;
  const bottomNormal = scaled.y2 / scaled.height;
  const widthNormal = rightNormal - leftNormal;
  const heightNormal = bottomNormal - topNormal;

  let scaledWidth = width * widthNormal;
  let scaledHeight = height * heightNormal;
  if (pagesRotation === 90 || pagesRotation === 270) {
    scaledWidth = width * heightNormal;
    scaledHeight = height * widthNormal;
  }

  let scaledLeft = width * leftNormal;
  let scaledTop = height * topNormal;

  switch (pagesRotation) {
    case 90:
      scaledLeft = width - width * bottomNormal;
      scaledTop = height * leftNormal;
      break;
    case 180:
      scaledLeft = width - width * rightNormal;
      scaledTop = height - height * bottomNormal;
      break;
    case 270:
      scaledLeft = width * topNormal;
      scaledTop = height - height * rightNormal;
      break;
    default:
      break;
  }

  return {
    left: scaledLeft,
    top: scaledTop,
    width: scaledWidth,
    height: scaledHeight,
    pageNumber: scaled.pageNumber,
  };
};
