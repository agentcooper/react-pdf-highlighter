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
const clamp = (value, left, right) => Math.min(Math.max(value, left), right);
class TipContainer extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            height: 0,
            width: 0,
        };
        this.node = null;
        this.updatePosition = () => {
            if (!this.node) {
                return;
            }
            const { offsetHeight, offsetWidth } = this.node;
            this.setState({
                height: offsetHeight,
                width: offsetWidth,
            });
        };
    }
    componentDidUpdate(nextProps) {
        if (this.props.children !== nextProps.children) {
            this.updatePosition();
        }
    }
    componentDidMount() {
        setTimeout(this.updatePosition, 0);
    }
    render() {
        const { children, style, scrollTop, pageBoundingRect } = this.props;
        const { height, width } = this.state;
        const isStyleCalculationInProgress = width === 0 && height === 0;
        const shouldMove = style.top - height - 5 < scrollTop;
        const top = shouldMove ? style.bottom + 5 : style.top - height - 5;
        const left = clamp(style.left - width / 2, 0, pageBoundingRect.width - width);
        const childrenWithProps = react_1.default.Children.map(children, (child) => 
        // @ts-ignore
        react_1.default.cloneElement(child, {
            onUpdate: () => {
                this.setState({
                    width: 0,
                    height: 0,
                }, () => {
                    setTimeout(this.updatePosition, 0);
                });
            },
            popup: {
                position: shouldMove ? "below" : "above",
            },
        }));
        return (react_1.default.createElement("div", { className: "PdfHighlighter__tip-container", style: {
                visibility: isStyleCalculationInProgress ? "hidden" : "visible",
                top,
                left,
            }, ref: (node) => {
                this.node = node;
            } }, childrenWithProps));
    }
}
exports.default = TipContainer;
//# sourceMappingURL=TipContainer.js.map