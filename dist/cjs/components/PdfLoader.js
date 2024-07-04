"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
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
exports.PdfLoader = void 0;
const react_1 = __importStar(require("react"));
const pdf_1 = require("pdfjs-dist/legacy/build/pdf");
class PdfLoader extends react_1.Component {
    constructor() {
        super(...arguments);
        this.state = {
            pdfDocument: null,
            error: null,
        };
        this.documentRef = react_1.default.createRef();
    }
    componentDidMount() {
        this.load();
    }
    componentWillUnmount() {
        const { pdfDocument: discardedDocument } = this.state;
        if (discardedDocument) {
            discardedDocument.destroy();
        }
    }
    componentDidUpdate({ url }) {
        if (this.props.url !== url) {
            this.load();
        }
    }
    componentDidCatch(error, info) {
        const { onError } = this.props;
        if (onError) {
            onError(error);
        }
        this.setState({ pdfDocument: null, error });
    }
    load() {
        const { ownerDocument = document } = this.documentRef.current || {};
        const { url, cMapUrl, cMapPacked, workerSrc } = this.props;
        const { pdfDocument: discardedDocument } = this.state;
        this.setState({ pdfDocument: null, error: null });
        if (typeof workerSrc === "string") {
            pdf_1.GlobalWorkerOptions.workerSrc = workerSrc;
        }
        Promise.resolve()
            .then(() => discardedDocument && discardedDocument.destroy())
            .then(() => {
            if (!url) {
                return;
            }
            return (0, pdf_1.getDocument)(Object.assign(Object.assign({}, this.props), { ownerDocument,
                cMapUrl,
                cMapPacked })).promise.then((pdfDocument) => {
                this.setState({ pdfDocument });
            });
        })
            .catch((e) => this.componentDidCatch(e));
    }
    render() {
        const { children, beforeLoad } = this.props;
        const { pdfDocument, error } = this.state;
        return (react_1.default.createElement(react_1.default.Fragment, null,
            react_1.default.createElement("span", { ref: this.documentRef }),
            error
                ? this.renderError()
                : !pdfDocument || !children
                    ? beforeLoad
                    : children(pdfDocument)));
    }
    renderError() {
        const { errorMessage } = this.props;
        if (errorMessage) {
            return react_1.default.cloneElement(errorMessage, { error: this.state.error });
        }
        return null;
    }
}
exports.PdfLoader = PdfLoader;
PdfLoader.defaultProps = {
    workerSrc: "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js",
};
exports.default = PdfLoader;
//# sourceMappingURL=PdfLoader.js.map