// @flow
/* eslint import/no-webpack-loader-syntax: 0 */

import React, { Component } from "react";
import PDFWorker from "worker-loader!pdfjs-dist/lib/pdf.worker";
/* import PRIMARY_PDF_URL from "./assets/1604.02480.pdf";
import SECONDARY_PDF_URL from "./assets/1708.08021.pdf"; */

import {
  PdfLoader,
  PdfHighlighter,
  /* ContextMenu, */
  Tip,
  Highlight,
  Popup,
  AreaHighlight,
  setPdfWorker
} from "@jagatmachines/react-pdf-highlighter";

import testHighlights from "./test-highlights";

import Spinner from "./Spinner";
import Sidebar from "./Sidebar";

import type {
  T_Highlight,
  T_NewHighlight
} from "@jagatmachines/react-pdf-highlighter/src/types";

import {
  highlighterBox,
  areaHighlighterBox,
  rotationBox
} from "@jagatmachines/react-pdf-highlighter/src/constant";

import "./style/App.css";

setPdfWorker(PDFWorker);

type Props = {};

type State = {
  url: string,
  highlights: Array<T_Highlight>
};

const getNextId = () => String(Math.random()).slice(2);

const parseIdFromHash = () =>
  document.location.hash.slice("#highlight-".length);

const resetHash = () => {
  document.location.hash = "";
};

const HighlightPopup = ({ comment }) =>
  comment && comment.text ? (
    <div className="Highlight__popup">
      {comment.emoji} {comment.text}
    </div>
  ) : null;

const PRIMARY_PDF_URL = "https://arxiv.org/pdf/1708.08021.pdf";
const SECONDARY_PDF_URL = "https://arxiv.org/pdf/1604.02480.pdf";

/* const PRIMARY_PDF_URL = "/1604.02480.pdf";
const SECONDARY_PDF_URL = "/1708.08021.pdf"; */

const searchParams = new URLSearchParams(document.location.search);

const initialUrl = searchParams.get("url") || PRIMARY_PDF_URL;

class App extends Component<Props, State> {
  state = {
    url: initialUrl,
    highlights: testHighlights[initialUrl]
      ? [...testHighlights[initialUrl]]
      : []
    // highlights: []
  };

  state: State;

  resetHighlights = () => {
    this.setState({
      highlights: []
    });
  };

  toggleDocument = () => {
    const newUrl =
      this.state.url === PRIMARY_PDF_URL ? SECONDARY_PDF_URL : PRIMARY_PDF_URL;

    this.setState({
      url: newUrl,
      highlights: testHighlights[newUrl] ? [...testHighlights[newUrl]] : []
    });
  };

  scrollViewerTo = (highlight: any) => {};

  scrollToHighlightFromHash = () => {
    const highlight = this.getHighlightById(parseIdFromHash());

    if (highlight) {
      this.scrollViewerTo(highlight);
    }
  };

  componentDidMount() {
    window.addEventListener(
      "hashchange",
      this.scrollToHighlightFromHash,
      false
    );
  }

  componentWillUnmount() {
    window.removeEventListener("hashchange", this.scrollToHighlightFromHash);
  }

  getHighlightById(id: string) {
    const { highlights } = this.state;

    return highlights.find(highlight => highlight.id === id);
  }

  addHighlight(highlight: T_NewHighlight) {
    console.log("Saving highlight", highlight);

    this.setState(state => ({
      ...state,
      highlights: [
        ...state.highlights,
        { ...highlight, id: getNextId() + Math.random() }
      ]
    }));
  }

  updateHighlight(highlightId: string, position: Object, content: Object) {
    console.log("Updating highlight", highlightId, position, content);

    this.setState({
      highlights: this.state.highlights.map(h => {
        const {
          id,
          position: originalPosition,
          content: originalContent,
          ...rest
        } = h;
        return id === highlightId
          ? {
              id,
              position: { ...originalPosition, ...position },
              content: { ...originalContent, ...content },
              ...rest
            }
          : h;
      })
    });
  }

  updateRotate = (rotatePages: (delta: string) => void, delta: string) => {
    const { highlights } = this.state;

    if (highlights && highlights.length) {
      if (window.confirm("Your annotation might get disorted")) {
        this.setState(
          {
            highlights: []
          },
          () => {
            rotatePages(delta);
          }
        );
      }
    } else {
      rotatePages(delta);
    }
  };

  saveRotation = (delta: number) => {};

  render() {
    const { url, highlights } = this.state;

    return (
      <div className="App" style={{ display: "flex", height: "100vh", overflowY:"hidden"}}>
        <Sidebar
          highlights={highlights}
          resetHighlights={this.resetHighlights}
          toggleDocument={this.toggleDocument}
        />
        <div
          style={{
            height: "100vh",
            width: "75vw",
            position: "relative"
          }}
        >
          <PdfLoader url={url} beforeLoad={<Spinner />}>
            {pdfDocument => (
              <PdfHighlighter
                pdfDocument={pdfDocument}
                enableAreaSelection={event => event.altKey}
                onScrollChange={resetHash}
                showToolBar={[highlighterBox, areaHighlighterBox, rotationBox]}
                updateRotate={this.updateRotate}
                initialHighlight={true}
                rotatePdf={0}
                saveRotation={this.saveRotation}
                // pdfScaleValue="page-width"
                scrollRef={scrollTo => {
                  this.scrollViewerTo = scrollTo;

                  this.scrollToHighlightFromHash();
                }}
                onSelectionFinished={(
                  position,
                  content,
                  hideTipAndSelection,
                  transformSelection,
                  clientPosition,
                  highlightArray
                ) => (
                  <Tip
                    onOpen={transformSelection}
                    onConfirm={comment => {
                      comment = comment || "";
                      if (highlightArray && highlightArray.length) {
                        highlightArray.map(highlight =>
                          this.addHighlight({ ...highlight, comment })
                        );
                      } else {
                        this.addHighlight({ content, position, comment });
                      }
                      hideTipAndSelection();
                    }}
                  />
                )}
                highlightTransform={(
                  highlight,
                  index,
                  setTip,
                  hideTip,
                  viewportToScaled,
                  screenshot,
                  isScrolledTo
                ) => {
                  const isTextHighlight = !Boolean(
                    highlight.content && highlight.content.image
                  );

                  const component = isTextHighlight ? (
                    <Highlight
                      isScrolledTo={isScrolledTo}
                      position={highlight.position}
                      comment={highlight.comment}
                    />
                  ) : (
                    <AreaHighlight
                      highlight={highlight}
                      onChange={boundingRect => {
                        this.updateHighlight(
                          highlight.id,
                          { boundingRect: viewportToScaled(boundingRect) },
                          { image: screenshot(boundingRect) }
                        );
                      }}
                    />
                  );

                  return (
                    <Popup
                      popupContent={<HighlightPopup {...highlight} />}
                      onMouseOver={popupContent =>
                        setTip(highlight, highlight => popupContent)
                      }
                      onMouseOut={hideTip}
                      key={index}
                      children={component}
                    />
                  );
                }}
                highlights={highlights}
              />
            )}
          </PdfLoader>
        </div>
      </div>
    );
  }
}

export default App;
