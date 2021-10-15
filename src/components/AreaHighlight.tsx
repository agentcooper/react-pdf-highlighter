import React, { Component } from "react";

import { Rnd } from "react-rnd";

import "../style/AreaHighlight.css";

import type { LTWH, ViewportHighlight } from "../types.js";

interface Props {
  categoryLabels: Array<{ label: string; background: string }>;
  highlight: ViewportHighlight;
  onChange: (rect: LTWH) => void;
  comment: {
    category: string;
    text: string;
  };
  isScrolledTo: boolean;
}

export class AreaHighlight extends Component<Props> {
  render() {
    const {
      highlight,
      onChange,
      comment,
      isScrolledTo,
      categoryLabels,
      ...otherProps
    } = this.props;

    const handleStyle = (labels: { label: string; background: string }[]) => {
      let color = "#ddcc77";
      if (comment) {
        for (let item of labels) {
          if (comment.category === item.label) {
            color = item.background;
          }
        }
      }

      return { background: color };
    };

    /*   : comment && comment.category
    ? `AreaHighlight--${comment.category}`
 */
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
          style={handleStyle(categoryLabels)}
        />
      </div>
    );
  }
}

export default AreaHighlight;
