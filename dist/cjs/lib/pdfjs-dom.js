"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.findOrCreateContainerLayer = exports.getPageFromRange = exports.getPageFromElement = exports.asElement = exports.isHTMLCanvasElement = exports.isHTMLElement = exports.getWindow = exports.getDocument = void 0;
const getDocument = (elm) => (elm || {}).ownerDocument || document;
exports.getDocument = getDocument;
const getWindow = (elm) => ((0, exports.getDocument)(elm) || {}).defaultView || window;
exports.getWindow = getWindow;
const isHTMLElement = (elm) => elm instanceof HTMLElement || elm instanceof (0, exports.getWindow)(elm).HTMLElement;
exports.isHTMLElement = isHTMLElement;
const isHTMLCanvasElement = (elm) => elm instanceof HTMLCanvasElement ||
    elm instanceof (0, exports.getWindow)(elm).HTMLCanvasElement;
exports.isHTMLCanvasElement = isHTMLCanvasElement;
const asElement = (x) => x;
exports.asElement = asElement;
const getPageFromElement = (target) => {
    const node = (0, exports.asElement)(target.closest(".page"));
    if (!node || !(0, exports.isHTMLElement)(node)) {
        return null;
    }
    const number = Number((0, exports.asElement)(node).dataset.pageNumber);
    return { node, number };
};
exports.getPageFromElement = getPageFromElement;
const getPageFromRange = (range) => {
    const parentElement = range.startContainer.parentElement;
    if (!(0, exports.isHTMLElement)(parentElement)) {
        return undefined;
    }
    return (0, exports.getPageFromElement)((0, exports.asElement)(parentElement));
};
exports.getPageFromRange = getPageFromRange;
const findOrCreateContainerLayer = (container, className) => {
    const doc = (0, exports.getDocument)(container);
    let layer = container.querySelector(`.${className}`);
    if (!layer) {
        layer = doc.createElement("div");
        layer.className = className;
        container.appendChild(layer);
    }
    return layer;
};
exports.findOrCreateContainerLayer = findOrCreateContainerLayer;
//# sourceMappingURL=pdfjs-dom.js.map