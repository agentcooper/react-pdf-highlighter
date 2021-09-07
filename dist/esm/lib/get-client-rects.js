import optimizeClientRects from "./optimize-client-rects";
const getClientRects = (range, containerEl, shouldOptimize = true) => {
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
//# sourceMappingURL=get-client-rects.js.map