import React, { Component } from "react";
import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/legacy/build/pdf";
export class PdfLoader extends Component {
    constructor() {
        super(...arguments);
        this.state = {
            pdfDocument: null,
            error: null,
        };
        this.documentRef = React.createRef();
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
            GlobalWorkerOptions.workerSrc = workerSrc;
        }
        Promise.resolve()
            .then(() => discardedDocument && discardedDocument.destroy())
            .then(() => {
            if (!url) {
                return;
            }
            return getDocument(Object.assign(Object.assign({}, this.props), { ownerDocument,
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
        return (React.createElement(React.Fragment, null,
            React.createElement("span", { ref: this.documentRef }),
            error
                ? this.renderError()
                : !pdfDocument || !children
                    ? beforeLoad
                    : children(pdfDocument)));
    }
    renderError() {
        const { errorMessage } = this.props;
        if (errorMessage) {
            return React.cloneElement(errorMessage, { error: this.state.error });
        }
        return null;
    }
}
PdfLoader.defaultProps = {
    workerSrc: "https://unpkg.com/pdfjs-dist@2.16.105/build/pdf.worker.min.js",
};
export default PdfLoader;
//# sourceMappingURL=PdfLoader.js.map