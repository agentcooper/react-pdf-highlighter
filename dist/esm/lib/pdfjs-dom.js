export const getDocument = (elm) => (elm || {}).ownerDocument || document;
export const getWindow = (elm) => (getDocument(elm) || {}).defaultView || window;
export const isHTMLElement = (elm) => elm instanceof HTMLElement || elm instanceof getWindow(elm).HTMLElement;
export const isHTMLCanvasElement = (elm) => elm instanceof HTMLCanvasElement ||
    elm instanceof getWindow(elm).HTMLCanvasElement;
export const asElement = (x) => x;
export const getPageFromElement = (target) => {
    const node = asElement(target.closest(".page"));
    if (!node || !isHTMLElement(node)) {
        return null;
    }
    const number = Number(asElement(node).dataset.pageNumber);
    return { node, number };
};
export const getPageFromRange = (range) => {
    const parentElement = range.startContainer.parentElement;
    if (!isHTMLElement(parentElement)) {
        return undefined;
    }
    return getPageFromElement(asElement(parentElement));
};
export const findOrCreateContainerLayer = (container, className) => {
    const doc = getDocument(container);
    let layer = container.querySelector(`.${className}`);
    if (!layer) {
        layer = doc.createElement("div");
        layer.className = className;
        container.appendChild(layer);
    }
    return layer;
};
//# sourceMappingURL=pdfjs-dom.js.map