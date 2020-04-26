// @flow

import React, { Component } from "react";

import type { T_PDFJS, T_PDFJS_Document } from "../types";

import pdfjs from "pdfjs-dist";
import pdfjsWorker from "pdfjs-dist/build/pdf.worker.entry";

type Props = {
  url: string,
  beforeLoad: React$Element<*>,
  children: (pdfDocument: T_PDFJS_Document) => React$Element<*>
};

type State = {
  pdfDocument: ?T_PDFJS_Document
};

class PdfLoader extends Component<Props, State> {
  state = {
    pdfDocument: null
  };

  componentDidMount() {
    const { url, onError } = this.props;

    pdfjs
      .getDocument({ url: url, eventBusDispatchToDOM: true })
      .promise.then(pdfDocument => {
          this.setState({
            pdfDocument: pdfDocument
          });
        }).catch(onError);
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
