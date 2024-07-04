"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const optimize_client_rects_1 = __importDefault(require("./optimize-client-rects"));
const isClientRectInsidePageRect = (clientRect, pageRect) => {
    if (clientRect.top < pageRect.top) {
        return false;
    }
    if (clientRect.bottom > pageRect.bottom) {
        return false;
    }
    if (clientRect.right > pageRect.right) {
        return false;
    }
    if (clientRect.left < pageRect.left) {
        return false;
    }
    return true;
};
const getClientRects = (range, pages, shouldOptimize = true) => {
    const clientRects = Array.from(range.getClientRects());
    const rects = [];
    for (const clientRect of clientRects) {
        for (const page of pages) {
            const pageRect = page.node.getBoundingClientRect();
            if (isClientRectInsidePageRect(clientRect, pageRect) &&
                clientRect.width > 0 &&
                clientRect.height > 0 &&
                clientRect.width < pageRect.width &&
                clientRect.height < pageRect.height) {
                const highlightedRect = {
                    top: clientRect.top + page.node.scrollTop - pageRect.top,
                    left: clientRect.left + page.node.scrollLeft - pageRect.left,
                    width: clientRect.width,
                    height: clientRect.height,
                    pageNumber: page.number,
                };
                rects.push(highlightedRect);
            }
        }
    }
    return shouldOptimize ? (0, optimize_client_rects_1.default)(rects) : rects;
};
exports.default = getClientRects;
//# sourceMappingURL=get-client-rects.js.map