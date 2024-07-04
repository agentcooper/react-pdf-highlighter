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
import { viewportToScaled } from "../lib/coordinates";
import React from "react";
export function HighlightLayer({ highlightsByPage, scaledPositionToViewport, pageNumber, scrolledToHighlightId, highlightTransform, tip, hideTipAndSelection, viewer, screenshot, showTip, setState, }) {
    const currentHighlights = highlightsByPage[String(pageNumber)] || [];
    return (React.createElement("div", null, currentHighlights.map((_a, index) => {
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
            return viewportToScaled(rect, viewport);
        }, (boundingRect) => screenshot(boundingRect, parseInt(pageNumber)), isScrolledTo);
    })));
}
//# sourceMappingURL=HighlightLayer.js.map