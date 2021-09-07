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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Popup = void 0;
const react_1 = __importStar(require("react"));
const MouseMonitor_1 = __importDefault(require("./MouseMonitor"));
class Popup extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            mouseIn: false,
        };
    }
    render() {
        const { onMouseOver, popupContent, onMouseOut } = this.props;
        return (react_1.default.createElement("div", { onMouseOver: () => {
                this.setState({ mouseIn: true });
                onMouseOver(react_1.default.createElement(MouseMonitor_1.default, { onMoveAway: () => {
                        if (this.state.mouseIn) {
                            return;
                        }
                        onMouseOut();
                    }, paddingX: 60, paddingY: 30, children: popupContent }));
            }, onMouseOut: () => {
                this.setState({ mouseIn: false });
            } }, this.props.children));
    }
}
exports.Popup = Popup;
exports.default = Popup;
//# sourceMappingURL=Popup.js.map