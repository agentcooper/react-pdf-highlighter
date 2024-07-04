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
export const getPagesFromRange = (range) => {
    const startParentElement = range.startContainer.parentElement;
    const endParentElement = range.endContainer.parentElement;
    if (!isHTMLElement(startParentElement) || !isHTMLElement(endParentElement)) {
        return [];
    }
    const startPage = getPageFromElement(asElement(startParentElement));
    const endPage = getPageFromElement(asElement(endParentElement));
    if (!(startPage === null || startPage === void 0 ? void 0 : startPage.number) || !(endPage === null || endPage === void 0 ? void 0 : endPage.number)) {
        return [];
    }
    if (startPage.number === endPage.number) {
        return [startPage];
    }
    if (startPage.number === endPage.number - 1) {
        return [startPage, endPage];
    }
    const pages = [];
    let currentPageNumber = startPage.number;
    const document = startPage.node.ownerDocument;
    while (currentPageNumber <= endPage.number) {
        const currentPage = getPageFromElement(document.querySelector(`[data-page-number='${currentPageNumber}'`));
        if (currentPage) {
            pages.push(currentPage);
        }
        currentPageNumber++;
    }
    return pages;
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