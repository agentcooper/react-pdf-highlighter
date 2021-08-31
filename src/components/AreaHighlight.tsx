import React, { Component } from "react";

import { Rnd } from "react-rnd";

import "../style/AreaHighlight.css";

import type { LTWH, ViewportHighlight } from "../types";

interface Props {
  highlight: ViewportHighlight;
  onChange: (rect: LTWH) => void;
  isScrolledTo: boolean;
}

export class AreaHighlight extends Component<Props> {
  render() {
    const { highlight, onChange, isScrolledTo, ...otherProps } = this.props;

    return (
      <div
        className={`AreaHighlight ${
          isScrolledTo ? "AreaHighlight--scrolledTo" : ""
        }`}
      >
        <Rnd
          className="AreaHighlight__part"
          onDragStop={(_, data) => {
            const boundingRect = {
              ...highlight.position.boundingRect,
              top: data.y,
              left: data.x,
            };

            onChange(boundingRect);
          }}
          onResizeStop={(_, direction, ref, delta, position) => {
            const boundingRect = {
              top: position.y,
              left: position.x,
              width: ref.offsetWidth,
              height: ref.offsetHeight,
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
