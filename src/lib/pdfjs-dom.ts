import type { Page } from "../types";

export const getDocument = (element: Element): Document =>
  element.ownerDocument || document;

export const getWindow = (element: Element): typeof window =>
  getDocument(element).defaultView || window;

export const isHTMLElement = (
  element: Element | null,
): element is HTMLElement =>
  element != null &&
  (element instanceof HTMLElement ||
    element instanceof getWindow(element).HTMLElement);

export const isHTMLCanvasElement = (element: Element) =>
  element instanceof HTMLCanvasElement ||
  element instanceof getWindow(element).HTMLCanvasElement;

export const getPageFromElement = (target: HTMLElement): Page | null => {
  const node = target.closest(".page");

  if (!isHTMLElement(node)) {
    return null;
  }

  const number = Number(node.dataset.pageNumber);

  return { node, number } as Page;
};

export const getPagesFromRange = (range: Range): Page[] => {
  const startParentElement = range.startContainer.parentElement;
  const endParentElement = range.endContainer.parentElement;

  if (!isHTMLElement(startParentElement) || !isHTMLElement(endParentElement)) {
    return [];
  }

  const startPage = getPageFromElement(startParentElement);
  const endPage = getPageFromElement(endParentElement);

  if (!startPage?.number || !endPage?.number) {
    return [];
  }

  if (startPage.number === endPage.number) {
    return [startPage];
  }

  if (startPage.number === endPage.number - 1) {
    return [startPage, endPage];
  }

  const pages: Page[] = [];

  let currentPageNumber = startPage.number;

  const document = startPage.node.ownerDocument;

  while (currentPageNumber <= endPage.number) {
    const currentPage = getPageFromElement(
      document.querySelector(
        `[data-page-number='${currentPageNumber}'`,
      ) as HTMLElement,
    );
    if (currentPage) {
      pages.push(currentPage);
    }
    currentPageNumber++;
  }

  return pages;
};

export const findOrCreateContainerLayer = (
  container: HTMLElement,
  className: string,
  selector?: string,
) => {
  const doc = getDocument(container);
  let layer = container.querySelector(selector ? selector : `.${className}`);

  if (!layer) {
    layer = doc.createElement("div");
    layer.className = className;
    container.appendChild(layer);
  }

  return layer;
};
