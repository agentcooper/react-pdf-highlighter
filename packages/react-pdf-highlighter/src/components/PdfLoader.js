// @flow

import React, { Component } from "react";

import type { T_PDFJS, T_PDFJS_Document } from "../types";

import { getDocument } from "pdfjs-dist";
import "pdfjs-dist/build/pdf.worker.entry";

type Props = {
  url: string,
  beforeLoad: React$Element<*>,
  children: (pdfDocument: T_PDFJS_Document) => React$Element<*>,
  onError?: (error: Error) => void
};

type State = {
  pdfDocument: ?T_PDFJS_Document
};

class PdfLoader extends Component<Props, State> {
  state = {
    pdfDocument: null
  };

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

  load() {
    const { url, onError } = this.props;
    const { pdfDocument: discardedDocument } = this.state;
    if (discardedDocument) {
      discardedDocument.destroy();
    }
    this.setState({ pdfDocument: null });

    if (url) {
      getDocument({ url })
        .promise.then(pdfDocument => {
          this.setState({ pdfDocument });
        })
        .catch(onError);
    }
  }

  render() {
    const { children, beforeLoad } = this.props;
    const { pdfDocument } = this.state;

    if (pdfDocument) {
      return children(pdfDocument);
    }

    return beforeLoad;
  }
}

export default PdfLoader;
