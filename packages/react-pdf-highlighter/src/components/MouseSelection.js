// @flow

import React, { Component } from "react";

import { asElement, isHTMLElement } from "../lib/pdfjs-dom";
import "../style/MouseSelection.css";

import type { T_LTWH } from "../types.js";

type Coords = {
  x: number,
  y: number
};

type State = {
  locked: boolean,
  start: ?Coords,
  end: ?Coords
};

type Props = {
  onSelection: (
    startTarget: HTMLElement,
    boundingRect: T_LTWH,
    resetSelection: () => void
  ) => void,
  onDragStart: () => void,
  onDragEnd: () => void,
  shouldStart: (event: MouseEvent) => boolean,
  onChange: (isVisible: boolean) => void
};

class MouseSelection extends Component<Props, State> {
  state: State = {
    locked: false,
    start: null,
    end: null
  };

  root: ?HTMLElement;
  container = () => this.root.parentElement;

  reset = () => {
    const { onDragEnd } = this.props;

    onDragEnd();
    this.setState({ start: null, end: null, locked: false });
  };

  getBoundingRect(start: Coords, end: Coords): T_LTWH {
    return {
      left: Math.min(end.x, start.x),
      top: Math.min(end.y, start.y),

      width: Math.abs(end.x - start.x),
      height: Math.abs(end.y - start.y)
    };
  }

  componentDidUpdate() {
    const { onChange } = this.props;
    const { start, end } = this.state;

    const isVisible = Boolean(start && end);

    onChange(isVisible);
  }

  handleMouseMove(event) {
    const { start, locked } = this.state;

    if (!start || locked) {
      return;
    }

    that.setState({
      ...this.state,
      end: containerCoords(event.pageX, event.pageY)
    });
  }

  handleMouseDown(event, shouldStart) {
    if (!shouldStart(event)) {
      this.reset();
      return;
    }

    const container = asElement(this.root.parentElement);

    if (!isHTMLElement(container)) {
      return;
    }

    onDragStart();

    this.setState({
      start: containerCoords(event.pageX, event.pageY),
      end: null,
      locked: false
    });

    if (document.body) {
      document.body.addEventListener("mouseup", handleMouseUp);
    }
  }

  handleMouseUp = event => {
    // emulate listen once
    event.currentTarget.removeEventListener("mouseup", handleMouseUp);

    const { start } = this.state;

    if (!start) {
      return;
    }

      const startTarget = asElement(event.target);
      if (!isHTMLElement(startTarget)) {
        return;
      }

    if (
      !(event.target instanceof HTMLElement) ||
      !container.contains(event.target) ||
      !that.shouldRender(boundingRect)
    ) {
      that.reset();
      return;
    }

    that.setState(
      {
        end,
        locked: true
      },
      () => {
        const { start, end } = that.state;

        if (!start || !end) {
          return;
        }

        if (event.target instanceof HTMLElement) {
          onSelection(startTarget, boundingRect, that.reset);

          onDragEnd();
        }
      }
    );
  };

  componentDidMount() {
    if (!this.root) {
      return;
    }

    const that = this;

        if (
          !isHTMLElement(event.target) ||
          !container.contains(asElement(event.target)) ||
          !that.shouldRender(boundingRect)
        ) {
          that.reset();
          return;
        }

        that.setState(
          {
            end,
            locked: true
          },
          () => {
            const { start, end } = that.state;

            if (!start || !end) {
              return;
            }

            if (isHTMLElement(event.target)) {
              onSelection(startTarget, boundingRect, that.reset);

              onDragEnd();
            }
          }
        );
      };

      const { ownerDocument: doc } = container;
      if (doc.body) {
        doc.body.addEventListener("mouseup", onMouseUp);
      }

      return {
        x: pageX - containerBoundingRect.left + container.scrollLeft,
        y: pageY - containerBoundingRect.top + container.scrollTop
      };
    };

    container.addEventListener("mousemove", e => this.handleMouseMove(e));
    container.addEventListener("mousedown", (event: MouseEvent) =>
      this.handleMouseDown(event, shouldStart)
    );
  }

  componentWillUnmount() {
    this.container
      .removeEventListener("mousemove", e => this.handleMouseMove(e))
      .bind(this);
    this.container
      .removeEventListener("mousedown", (event: MouseEvent) =>
        this.handleMouseDown(event, shouldStart)
      )
      .bind(this);
    document.body.removeEventListener("mouseup", e => this.handleMouseUp(e));
  }

  shouldRender(boundingRect: T_LTWH) {
    return boundingRect.width >= 1 && boundingRect.height >= 1;
  }

  render() {
    const { start, end } = this.state;

    return (
      <div
        className="MouseSelection-container"
        ref={node => (this.root = node)}
      >
        {start && end ? (
          <div
            className="MouseSelection"
            style={this.getBoundingRect(start, end)}
          />
        ) : null}
      </div>
    );
  }
}

export default MouseSelection;
