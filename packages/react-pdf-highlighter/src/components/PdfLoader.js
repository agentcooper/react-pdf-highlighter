// @flow

import React, { Component } from "react";

import type { T_PDFJS, T_PDFJS_Document } from "../types";

import { getDocument, GlobalWorkerOptions } from "pdfjs-dist/lib/pdf";
import PdfjsWorker from "pdfjs-dist/lib/pdf.worker";

setPdfWorker(PdfjsWorker);

export function setPdfWorker(workerSrcOrClass: any) {
  if (typeof window !== "undefined") delete window.pdfjsWorker;
  delete GlobalWorkerOptions.workerSrc;
  delete GlobalWorkerOptions.workerPort;

  if (typeof workerSrcOrClass === "string") {
    GlobalWorkerOptions.workerSrc = workerSrcOrClass;
  } else if (typeof workerSrcOrClass === "function") {
    GlobalWorkerOptions.workerPort = workerSrcOrClass();
  } else if (workerSrcOrClass instanceof Worker) {
    GlobalWorkerOptions.workerPort = workerSrcOrClass;
  } else if (typeof window !== "undefined" && workerSrcOrClass) {
    window.pdfjsWorker = workerSrcOrClass;
  }
}

type Props = {
  url: string,
  beforeLoad: React$Element<*>,
  errorMessage?: React$Element<*>,
  children: (pdfDocument: T_PDFJS_Document) => React$Element<*>,
  onError?: (error: Error) => void,
  cMapUrl?: string,
  cMapPacked?: boolean
};

type State = {
  pdfDocument: ?T_PDFJS_Document,
  error: ?Error
};

class PdfLoader extends Component<Props, State> {
  state = {
    pdfDocument: null,
    error: null
  };

  documentRef = React.createRef<HTMLElement>();

  componentDidMount() {
    this.load();
  }

  componentWillUnmount() {
    const { pdfDocument: discardedDocument } = this.state;
    if (discardedDocument) {
      discardedDocument.destroy();
    }
  }

  componentDidUpdate({ url }: Props) {
    if (this.props.url !== url) {
      this.load();
    }
  }

  componentDidCatch(error: Error, info?: any) {
    const { onError } = this.props;

    if (onError) {
      onError(error);
    }

    this.setState({ pdfDocument: null, error });
  }

  load() {
    const { ownerDocument = document } = this.documentRef.current || {};
    const { url, cMapUrl, cMapPacked } = this.props;
    const { pdfDocument: discardedDocument } = this.state;
    this.setState({ pdfDocument: null, error: null });

    Promise.resolve()
      .then(() => discardedDocument && discardedDocument.destroy())
      .then(
        () =>
          url &&
          getDocument({
            ...this.props,
            ownerDocument,
            cMapUrl,
            cMapPacked
          }).promise.then(pdfDocument => {
            this.setState({ pdfDocument });
          })
      )
      .catch(e => this.componentDidCatch(e));
  }

  render() {
    const { children, beforeLoad } = this.props;
    const { pdfDocument, error } = this.state;

    return (
      <>
        <span ref={this.documentRef} />
        {error
          ? this.renderError()
          : !pdfDocument || !children
          ? beforeLoad
          : children(pdfDocument)}
      </>
    );
  }

  renderError() {
    const { errorMessage } = this.props;
    if (errorMessage) {
      return React.cloneElement(errorMessage, { error: this.state.error });
    }

    return null;
  }
}

export default PdfLoader;
