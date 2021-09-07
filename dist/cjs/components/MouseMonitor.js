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
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = __importStar(require("react"));
class MouseMonitor extends react_1.Component {
    constructor() {
        super(...arguments);
        this.container = null;
        this.unsubscribe = () => { };
        this.onMouseMove = (event) => {
            if (!this.container) {
                return;
            }
            const { onMoveAway, paddingX, paddingY } = this.props;
            const { clientX, clientY } = event;
            // TODO: see if possible to optimize
            const { left, top, width, height } = this.container.getBoundingClientRect();
            const inBoundsX = clientX > left - paddingX && clientX < left + width + paddingX;
            const inBoundsY = clientY > top - paddingY && clientY < top + height + paddingY;
            const isNear = inBoundsX && inBoundsY;
            if (!isNear) {
                onMoveAway();
            }
        };
        this.attachRef = (ref) => {
            this.container = ref;
            this.unsubscribe();
            if (ref) {
                const { ownerDocument: doc } = ref;
                doc.addEventListener("mousemove", this.onMouseMove);
                this.unsubscribe = () => {
                    doc.removeEventListener("mousemove", this.onMouseMove);
                };
            }
        };
    }
    render() {
        // eslint-disable-next-line
        const _a = this.props, { onMoveAway, paddingX, paddingY, children } = _a, restProps = __rest(_a, ["onMoveAway", "paddingX", "paddingY", "children"]);
        return (react_1.default.createElement("div", { ref: this.attachRef }, react_1.default.cloneElement(children, restProps)));
    }
}
exports.default = MouseMonitor;
//# sourceMappingURL=MouseMonitor.js.map