import React, { Component } from "react";

import "../style/Highlight.css";

import type { LTWH } from "../types.js";

interface Props {
  categoryLabels: { label: string; color: string }[];
  position: {
    boundingRect: LTWH;
    rects: Array<LTWH>;
  };
  onClick?: () => void;
  onMouseOver?: () => void;
  onMouseOut?: () => void;
  comment: {
    category: string;
    text: string;
  };
  isScrolledTo: boolean;
}

export class Highlight extends Component<Props> {
  render() {
    const {
      categoryLabels,
      position,
      onClick,
      onMouseOver,
      onMouseOut,
      comment,
      isScrolledTo,
    } = this.props;

    const { rects, boundingRect } = position;

    const style = (rect: {}, labels: { label: string; color: string }[]) => {
      let color = "#ddcc77";

      for (let item of labels) {
        if (comment.category == item.label) {
          color = item.color;
        }
      }

      return { ...rect, background: color };
    };
    /* : comment && comment.category
            ? `Highlight--${comment.category}` */
    return (
      <div
        className={`Highlight ${isScrolledTo ? "Highlight--scrolledTo" : ""}`}
      >
        {comment ? (
          <div
            className="Highlight__category"
            style={{
              left: 0,
              top: boundingRect.top,
            }}
          >
            {comment.category}
          </div>
        ) : null}
        <div className="Highlight__parts">
          {rects.map((rect, index) => (
            <div
              onMouseOver={onMouseOver}
              onMouseOut={onMouseOut}
              onClick={onClick}
              key={index}
              style={style(rect, categoryLabels)}
              //style={rect}
              className={`Highlight__part`}
            />
          ))}
        </div>
      </div>
    );
  }
}

export default Highlight;
