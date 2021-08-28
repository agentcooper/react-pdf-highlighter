import type { T_LTWH } from "../types.js";

const sort = (rects: Array<T_LTWH>) =>
  rects.sort((A, B) => {
    const top = A.top - B.top;

    if (top === 0) {
      return A.left - B.left;
    }

    return top;
  });

const overlaps = (A: T_LTWH, B: T_LTWH) =>
  A.left <= B.left && B.left <= A.left + A.width;

const sameLine = (A: T_LTWH, B: T_LTWH, yMargin = 5) =>
  Math.abs(A.top - B.top) < yMargin && Math.abs(A.height - B.height) < yMargin;

const inside = (A: T_LTWH, B: T_LTWH) =>
  A.top > B.top &&
  A.left > B.left &&
  A.top + A.height < B.top + B.height &&
  A.left + A.width < B.left + B.width;

const nextTo = (A: T_LTWH, B: T_LTWH, xMargin = 10) => {
  const Aright = A.left + A.width;
  const Bright = B.left + B.width;

  return A.left <= B.left && Aright <= Bright && B.left - Aright <= xMargin;
};

const extendWidth = (A: T_LTWH, B: T_LTWH) => {
  // extend width of A to cover B
  A.width = Math.max(B.width - A.left + B.left, A.width);
};

const optimizeClientRects = (clientRects: Array<T_LTWH>): Array<T_LTWH> => {
  const rects = sort(clientRects);

  const toRemove = new Set();

  const firstPass = rects.filter((rect) => {
    return rects.every((otherRect) => {
      return !inside(rect, otherRect);
    });
  });

  let passCount = 0;

  while (passCount <= 2) {
    firstPass.forEach((A) => {
      firstPass.forEach((B) => {
        if (A === B || toRemove.has(A) || toRemove.has(B)) {
          return;
        }

        if (!sameLine(A, B)) {
          return;
        }

        if (overlaps(A, B)) {
          extendWidth(A, B);
          A.height = Math.max(A.height, B.height);

          toRemove.add(B);
        }

        if (nextTo(A, B)) {
          extendWidth(A, B);

          toRemove.add(B);
        }
      });
    });
    passCount += 1;
  }

  return firstPass.filter((rect) => !toRemove.has(rect));
};

export default optimizeClientRects;
