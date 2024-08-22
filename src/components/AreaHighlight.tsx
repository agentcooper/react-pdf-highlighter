import React, { Component } from "react";

import { Rnd } from "react-rnd";
import { getPageFromElement } from "../lib/pdfjs-dom";

import "../style/AreaHighlight.css";

import type { LTWHP, ViewportHighlight } from "../types";

interface Props {
  highlight: ViewportHighlight;
  onChange: (rect: LTWHP) => void;
  isScrolledTo: boolean;
  highlightColor?: { default: string; onScroll: string };
}

export class AreaHighlight extends Component<Props> {
  render() {
    const {
      highlight,
      onChange,
      isScrolledTo,
      highlightColor = {
        default: "rgba(252, 232, 151, 1.0)",
        onScroll: "#ff4141",
      },
      ...otherProps
    } = this.props;

    return (
      <div
        className={`AreaHighlight ${
          isScrolledTo ? "AreaHighlight--scrolledTo" : ""
        }`}
        style={{
          backgroundColor: highlightColor.default,
        }}
      >
        <Rnd
          className="AreaHighlight__part"
          style={{
            background: isScrolledTo
              ? highlightColor.onScroll
              : highlightColor.default,
          }}
          onDragStop={(_, data) => {
            const boundingRect: LTWHP = {
              ...highlight.position.boundingRect,
              top: data.y,
              left: data.x,
            };

            onChange(boundingRect);
          }}
          onResizeStop={(_mouseEvent, _direction, ref, _delta, position) => {
            const boundingRect: LTWHP = {
              top: position.y,
              left: position.x,
              width: ref.offsetWidth,
              height: ref.offsetHeight,
              pageNumber: getPageFromElement(ref)?.number || -1,
            };

            onChange(boundingRect);
          }}
          position={{
            x: highlight.position.boundingRect.left,
            y: highlight.position.boundingRect.top,
          }}
          size={{
            width: highlight.position.boundingRect.width,
            height: highlight.position.boundingRect.height,
          }}
          onClick={(event: Event) => {
            event.stopPropagation();
            event.preventDefault();
          }}
          {...otherProps}
        />
      </div>
    );
  }
}

export default AreaHighlight;
