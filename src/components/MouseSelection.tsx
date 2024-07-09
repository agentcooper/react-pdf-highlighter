import React, { Component } from "react";

import { isHTMLElement } from "../lib/pdfjs-dom";
import "../style/MouseSelection.css";

import type { LTWH } from "../types.js";

interface Coords {
  x: number;
  y: number;
}

interface State {
  locked: boolean;
  start: Coords | null;
  end: Coords | null;
}

interface Props {
  onSelection: (
    startTarget: HTMLElement,
    boundingRect: LTWH,
    resetSelection: () => void,
  ) => void;
  onDragStart: () => void;
  onDragEnd: () => void;
  shouldStart: (event: MouseEvent) => boolean;
  onChange: (isVisible: boolean) => void;
}

class MouseSelection extends Component<Props, State> {
  state: State = {
    locked: false,
    start: null,
    end: null,
  };

  root?: HTMLElement;

  reset = () => {
    const { onDragEnd } = this.props;

    onDragEnd();
    this.setState({ start: null, end: null, locked: false });
  };

  getBoundingRect(start: Coords, end: Coords): LTWH {
    return {
      left: Math.min(end.x, start.x),
      top: Math.min(end.y, start.y),

      width: Math.abs(end.x - start.x),
      height: Math.abs(end.y - start.y),
    };
  }

  componentDidUpdate() {
    const { onChange } = this.props;
    const { start, end } = this.state;

    const isVisible = Boolean(start && end);

    onChange(isVisible);
  }

  componentDidMount() {
    if (!this.root) {
      return;
    }

    const { onSelection, onDragStart, onDragEnd, shouldStart } = this.props;

    const container = this.root.parentElement;
    if (!container || !isHTMLElement(container)) {
      return;
    }

    let containerBoundingRect: DOMRect | null = null;

    const containerCoords = (pageX: number, pageY: number) => {
      if (!containerBoundingRect) {
        containerBoundingRect = container.getBoundingClientRect();
      }

      return {
        x: pageX - containerBoundingRect.left + container.scrollLeft,
        y:
          pageY -
          containerBoundingRect.top +
          container.scrollTop -
          window.scrollY,
      };
    };

    container.addEventListener("mousemove", (event: MouseEvent) => {
      const { start, locked } = this.state;

      if (!start || locked) {
        return;
      }

      this.setState({
        ...this.state,
        end: containerCoords(event.pageX, event.pageY),
      });
    });

    container.addEventListener("mousedown", (event: MouseEvent) => {
      if (!shouldStart(event)) {
        this.reset();
        return;
      }

      const startTarget = event.target;
      if (!(startTarget instanceof Element) || !isHTMLElement(startTarget)) {
        return;
      }

      onDragStart();

      this.setState({
        start: containerCoords(event.pageX, event.pageY),
        end: null,
        locked: false,
      });

      const onMouseUp = (event: MouseEvent): void => {
        // emulate listen once
        event.currentTarget?.removeEventListener(
          "mouseup",
          onMouseUp as EventListener,
        );

        const { start } = this.state;

        if (!start) {
          return;
        }

        const end = containerCoords(event.pageX, event.pageY);

        const boundingRect = this.getBoundingRect(start, end);

        if (
          !(event.target instanceof Element) ||
          !isHTMLElement(event.target) ||
          !container.contains(event.target) ||
          !this.shouldRender(boundingRect)
        ) {
          this.reset();
          return;
        }

        this.setState(
          {
            end,
            locked: true,
          },
          () => {
            const { start, end } = this.state;

            if (!start || !end) {
              return;
            }

            if (
              event.target instanceof Element &&
              isHTMLElement(event.target)
            ) {
              onSelection(startTarget, boundingRect, this.reset);

              onDragEnd();
            }
          },
        );
      };

      const { ownerDocument: doc } = container;
      if (doc.body) {
        doc.body.addEventListener("mouseup", onMouseUp);
      }
    });
  }

  shouldRender(boundingRect: LTWH) {
    return boundingRect.width >= 1 && boundingRect.height >= 1;
  }

  render() {
    const { start, end } = this.state;

    return (
      <div
        className="MouseSelection-container"
        ref={(node) => {
          if (!node) {
            return;
          }
          this.root = node;
        }}
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
