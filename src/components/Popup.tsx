import { useState } from "react";
import { MouseMonitor } from "./MouseMonitor";

interface Props {
  onMouseOver: (content: JSX.Element) => void;
  popupContent: JSX.Element;
  onMouseOut: () => void;
  children: JSX.Element;
}

export function Popup({
  onMouseOver,
  popupContent,
  onMouseOut,
  children,
}: Props) {
  const [mouseIn, setMouseIn] = useState(false);

  return (
    <div
      onMouseOver={() => {
        setMouseIn(true);
        onMouseOver(
          <MouseMonitor
            onMoveAway={() => {
              if (mouseIn) {
                return;
              }

              onMouseOut();
            }}
            paddingX={60}
            paddingY={30}
          >
            {popupContent}
          </MouseMonitor>,
        );
      }}
      onMouseOut={() => {
        setMouseIn(false);
      }}
    >
      {children}
    </div>
  );
}
