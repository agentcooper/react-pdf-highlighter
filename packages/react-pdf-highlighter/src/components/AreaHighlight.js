// @flow

import React, { Component } from "react";

import { Rnd } from "react-rnd";

import "../style/AreaHighlight.css";

import type { T_ViewportHighlight, T_LTWH } from "../types";

type Props = {
  highlight: T_ViewportHighlight,
  onChange: (rect: T_LTWH) => void
};

class AreaHighlight extends Component<Props> {
  render() {
    const { highlight, onChange, ...otherProps } = this.props;

    return (
      <Rnd
        className="AreaHighlight"
        onDragStop={(_, data) => {
          const boundingRect = {
            ...highlight.position.boundingRect,
            top: data.y,
            left: data.x
          };

          onChange(boundingRect);
        }}
        onResizeStop={(_, direction, ref, delta, position) => {
          const boundingRect = {
            top: position.y,
            left: position.x,
            width: ref.offsetWidth,
            height: ref.offsetHeight
          };

          onChange(boundingRect);
        }}
        position={{
          x: highlight.position.boundingRect.left,
          y: highlight.position.boundingRect.top
        }}
        size={{
          width: highlight.position.boundingRect.width,
          height: highlight.position.boundingRect.height
        }}
        onClick={event => {
          event.stopPropagation();
          event.preventDefault();
        }}
        {...otherProps}
      />
    );
  }
}

export default AreaHighlight;
