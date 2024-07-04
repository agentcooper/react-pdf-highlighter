"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HighlightLayer = void 0;
const coordinates_1 = require("../lib/coordinates");
const react_1 = __importDefault(require("react"));
function HighlightLayer({ highlightsByPage, scaledPositionToViewport, pageNumber, scrolledToHighlightId, highlightTransform, tip, hideTipAndSelection, viewer, screenshot, showTip, setState, }) {
    const currentHighlights = highlightsByPage[String(pageNumber)] || [];
    return (react_1.default.createElement("div", null, currentHighlights.map((_a, index) => {
        var { position, id } = _a, highlight = __rest(_a, ["position", "id"]);
        // @ts-ignore
        const viewportHighlight = Object.assign({ id, position: scaledPositionToViewport(position) }, highlight);
        if (tip && tip.highlight.id === String(id)) {
            showTip(tip.highlight, tip.callback(viewportHighlight));
        }
        const isScrolledTo = Boolean(scrolledToHighlightId === id);
        return highlightTransform(viewportHighlight, index, (highlight, callback) => {
            setState({
                tip: { highlight, callback },
            });
            showTip(highlight, callback(highlight));
        }, hideTipAndSelection, (rect) => {
            const viewport = viewer.getPageView((rect.pageNumber || parseInt(pageNumber)) - 1).viewport;
            return (0, coordinates_1.viewportToScaled)(rect, viewport);
        }, (boundingRect) => screenshot(boundingRect, parseInt(pageNumber)), isScrolledTo);
    })));
}
exports.HighlightLayer = HighlightLayer;
//# sourceMappingURL=HighlightLayer.js.map