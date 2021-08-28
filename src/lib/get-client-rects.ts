import type { T_LTWH } from "../types.js";

import optimizeClientRects from "./optimize-client-rects";

const getClientRects = (
  range: Range,
  containerEl: HTMLElement,
  shouldOptimize: boolean = true
): Array<T_LTWH> => {
  let clientRects = Array.from(range.getClientRects());

  const offset = containerEl.getBoundingClientRect();

  const rects = clientRects.map((rect) => {
    return {
      top: rect.top + containerEl.scrollTop - offset.top,
      left: rect.left + containerEl.scrollLeft - offset.left,
      width: rect.width,
      height: rect.height,
    };
  });

  return shouldOptimize ? optimizeClientRects(rects) : rects;
};

export default getClientRects;
