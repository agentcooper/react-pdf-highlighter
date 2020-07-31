// @flow

const getDocument = elm => (elm || {}).ownerDocument;
const getWindow = elm => (getDocument(elm) || {}).defaultView;

export const getPageFromElement = (target: HTMLElement) => {
  const node = target.closest(".page");

  if (!node || !(node instanceof getWindow(target).HTMLElement)) {
    return null;
  }

  const number = Number(node.dataset.pageNumber);

  return { node, number };
};

export const getPageFromRange = (range: Range) => {
  const parentElement = range.startContainer.parentElement;

  if (!(parentElement instanceof getWindow(parentElement).HTMLElement)) {
    return;
  }

  return getPageFromElement(parentElement);
};

export const findOrCreateContainerLayer = (
  container: HTMLElement,
  className: string
) => {
  const doc = getDocument(container);
  let layer = container.querySelector(`.${className}`);

  if (!layer) {
    layer = doc.createElement("div");
    layer.className = className;
    container.appendChild(layer);
  }

  return layer;
};
