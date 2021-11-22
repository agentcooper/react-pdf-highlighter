import type { LTWHP } from "../types.js";

const getBoundingRect = (clientRects: Array<LTWHP>): LTWHP => {
  const rects = Array.from(clientRects).map((rect) => {
    const { left, top, width, height, pageNumber } = rect;

    const X0 = left;
    const X1 = left + width;

    const Y0 = top;
    const Y1 = top + height;

    return { X0, X1, Y0, Y1, pageNumber };
  });

  let firstPageNumber = Number.MAX_SAFE_INTEGER;

  rects.forEach((rect) => {
    firstPageNumber = Math.min(
      firstPageNumber,
      rect.pageNumber ?? firstPageNumber
    );
  });

  const rectsWithSizeOnFirstPage = rects.filter(
    (rect) =>
      (rect.X0 > 0 || rect.X1 > 0 || rect.Y0 > 0 || rect.Y1 > 0) &&
      rect.pageNumber === firstPageNumber
  );

  const optimal = rectsWithSizeOnFirstPage.reduce((res, rect) => {
    return {
      X0: Math.min(res.X0, rect.X0),
      X1: Math.max(res.X1, rect.X1),

      Y0: Math.min(res.Y0, rect.Y0),
      Y1: Math.max(res.Y1, rect.Y1),

      pageNumber: firstPageNumber,
    };
  }, rectsWithSizeOnFirstPage[0]);

  const { X0, X1, Y0, Y1, pageNumber } = optimal;

  return {
    left: X0,
    top: Y0,
    width: X1 - X0,
    height: Y1 - Y0,
    pageNumber,
  };
};

export default getBoundingRect;
