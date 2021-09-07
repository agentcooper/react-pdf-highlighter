"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const optimize_client_rects_1 = __importDefault(require("./optimize-client-rects"));
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
    return shouldOptimize ? (0, optimize_client_rects_1.default)(rects) : rects;
};
exports.default = getClientRects;
//# sourceMappingURL=get-client-rects.js.map