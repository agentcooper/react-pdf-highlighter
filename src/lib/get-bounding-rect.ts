import type { LTWH } from "../types.js";

const getBoundingRect = (clientRects: Array<LTWH>): LTWH => {
  const rects = Array.from(clientRects).map((rect) => {
    const { left, top, width, height } = rect;

    const X0 = left;
    const X1 = left + width;

    const Y0 = top;
    const Y1 = top + height;

    return { X0, X1, Y0, Y1 };
  });

  const rectsWithSize = rects.filter(
    (rect) => rect.X0 > 0 || rect.X1 > 0 || rect.Y0 > 0 || rect.Y1 > 0
  );

  const optimal = rectsWithSize.reduce((res, rect) => {
    return {
      X0: Math.min(res.X0, rect.X0),
      X1: Math.max(res.X1, rect.X1),

      Y0: Math.min(res.Y0, rect.Y0),
      Y1: Math.max(res.Y1, rect.Y1),
    };
  }, rectsWithSize[0]);

  const { X0, X1, Y0, Y1 } = optimal;

  return {
    left: X0,
    top: Y0,
    width: X1 - X0,
    height: Y1 - Y0,
  };
};

export default getBoundingRect;
