import { isHTMLCanvasElement } from "./pdfjs-dom";
const getAreaAsPNG = (canvas, position) => {
    const { left, top, width, height } = position;
    const doc = canvas ? canvas.ownerDocument : null;
    // @TODO: cache this?
    const newCanvas = doc && doc.createElement("canvas");
    if (!newCanvas || !isHTMLCanvasElement(newCanvas)) {
        return "";
    }
    newCanvas.width = width;
    newCanvas.height = height;
    const newCanvasContext = newCanvas.getContext("2d");
    if (!newCanvasContext || !canvas) {
        return "";
    }
    const dpr = window.devicePixelRatio;
    newCanvasContext.drawImage(canvas, left * dpr, top * dpr, width * dpr, height * dpr, 0, 0, width, height);
    return newCanvas.toDataURL("image/png");
};
export default getAreaAsPNG;
//# sourceMappingURL=get-area-as-png.js.map