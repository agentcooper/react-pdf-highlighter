import React, { useCallback, useEffect, useRef, useState } from "react";
import styles from "../style/TipContainer.module.css";
import type { LTWHP } from "../types";

interface Props {
  children: JSX.Element | null;
  style: { top: number; left: number; bottom: number };
  scrollTop: number;
  pageBoundingRect: LTWHP;
}

function clamp(value: number, left: number, right: number) {
  return Math.min(Math.max(value, left), right);
}

export function TipContainer({
  children,
  style,
  scrollTop,
  pageBoundingRect,
}: Props) {
  const [height, setHeight] = useState(0);
  const [width, setWidth] = useState(0);
  const nodeRef = useRef<HTMLDivElement | null>(null);

  const updatePosition = useCallback(() => {
    if (!nodeRef.current) {
      return;
    }
    const { offsetHeight, offsetWidth } = nodeRef.current;
    setHeight(offsetHeight);
    setWidth(offsetWidth);
  }, []);

  useEffect(() => {
    setTimeout(updatePosition, 0);
  }, [updatePosition]);

  const isStyleCalculationInProgress = width === 0 && height === 0;

  const shouldMove = style.top - height - 5 < scrollTop;

  const top = shouldMove ? style.bottom + 5 : style.top - height - 5;

  const left = clamp(style.left - width / 2, 0, pageBoundingRect.width - width);

  const handleUpdate = useCallback(() => {
    setWidth(0);
    setHeight(0);
    setTimeout(updatePosition, 0);
  }, [updatePosition]);

  const childrenWithProps = React.Children.map(children, (child) =>
    child != null
      ? React.cloneElement(child, {
          onUpdate: handleUpdate,
          popup: {
            position: shouldMove ? "below" : "above",
          },
        })
      : null,
  );

  return (
    <div
      id="PdfHighlighter__tip-container"
      className={styles.tipContainer}
      style={{
        visibility: isStyleCalculationInProgress ? "hidden" : "visible",
        top,
        left,
      }}
      ref={nodeRef}
    >
      {childrenWithProps}
    </div>
  );
}
