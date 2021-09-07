"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
const pdfjs_dom_1 = require("../lib/pdfjs-dom");
require("../style/MouseSelection.css");
class MouseSelection extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            locked: false,
            start: null,
            end: null,
        };
        this.reset = () => {
            const { onDragEnd } = this.props;
            onDragEnd();
            this.setState({ start: null, end: null, locked: false });
        };
    }
    getBoundingRect(start, end) {
        return {
            left: Math.min(end.x, start.x),
            top: Math.min(end.y, start.y),
            width: Math.abs(end.x - start.x),
            height: Math.abs(end.y - start.y),
        };
    }
    componentDidUpdate() {
        const { onChange } = this.props;
        const { start, end } = this.state;
        const isVisible = Boolean(start && end);
        onChange(isVisible);
    }
    componentDidMount() {
        if (!this.root) {
            return;
        }
        const that = this;
        const { onSelection, onDragStart, onDragEnd, shouldStart } = this.props;
        const container = (0, pdfjs_dom_1.asElement)(this.root.parentElement);
        if (!(0, pdfjs_dom_1.isHTMLElement)(container)) {
            return;
        }
        let containerBoundingRect = null;
        const containerCoords = (pageX, pageY) => {
            if (!containerBoundingRect) {
                containerBoundingRect = container.getBoundingClientRect();
            }
            return {
                x: pageX - containerBoundingRect.left + container.scrollLeft,
                y: pageY -
                    containerBoundingRect.top +
                    container.scrollTop -
                    window.scrollY,
            };
        };
        container.addEventListener("mousemove", (event) => {
            const { start, locked } = this.state;
            if (!start || locked) {
                return;
            }
            that.setState(Object.assign(Object.assign({}, this.state), { end: containerCoords(event.pageX, event.pageY) }));
        });
        container.addEventListener("mousedown", (event) => {
            if (!shouldStart(event)) {
                this.reset();
                return;
            }
            const startTarget = (0, pdfjs_dom_1.asElement)(event.target);
            if (!(0, pdfjs_dom_1.isHTMLElement)(startTarget)) {
                return;
            }
            onDragStart();
            this.setState({
                start: containerCoords(event.pageX, event.pageY),
                end: null,
                locked: false,
            });
            const onMouseUp = (event) => {
                var _a;
                // emulate listen once
                (_a = event.currentTarget) === null || _a === void 0 ? void 0 : _a.removeEventListener("mouseup", onMouseUp);
                const { start } = this.state;
                if (!start) {
                    return;
                }
                const end = containerCoords(event.pageX, event.pageY);
                const boundingRect = that.getBoundingRect(start, end);
                if (!(0, pdfjs_dom_1.isHTMLElement)(event.target) ||
                    !container.contains((0, pdfjs_dom_1.asElement)(event.target)) ||
                    !that.shouldRender(boundingRect)) {
                    that.reset();
                    return;
                }
                that.setState({
                    end,
                    locked: true,
                }, () => {
                    const { start, end } = that.state;
                    if (!start || !end) {
                        return;
                    }
                    if ((0, pdfjs_dom_1.isHTMLElement)(event.target)) {
                        onSelection(startTarget, boundingRect, that.reset);
                        onDragEnd();
                    }
                });
            };
            const { ownerDocument: doc } = container;
            if (doc.body) {
                doc.body.addEventListener("mouseup", onMouseUp);
            }
        });
    }
    shouldRender(boundingRect) {
        return boundingRect.width >= 1 && boundingRect.height >= 1;
    }
    render() {
        const { start, end } = this.state;
        return (react_1.default.createElement("div", { className: "MouseSelection-container", ref: (node) => {
                if (!node) {
                    return;
                }
                this.root = node;
            } }, start && end ? (react_1.default.createElement("div", { className: "MouseSelection", style: this.getBoundingRect(start, end) })) : null));
    }
}
exports.default = MouseSelection;
//# sourceMappingURL=MouseSelection.js.map