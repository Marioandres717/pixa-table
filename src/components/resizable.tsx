import React, { useState, useEffect, PropsWithChildren } from "react";
import styles from "./resizable.module.css";

type Props = {
  renderProps: (props: { width: number; height: number }) => React.ReactNode;
};

const ResizableDiv = ({ renderProps }: PropsWithChildren<Props>) => {
  const [width, setWidth] = useState(750);
  const [height, setHeight] = useState(600);
  const [isResizing, setIsResizing] = useState(false);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      if (isResizing) {
        setWidth(event.clientX - document.body.getBoundingClientRect().left);
        setHeight(event.clientY - document.body.getBoundingClientRect().top);
      }
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isResizing]);

  const handleMouseDown = () => {
    setIsResizing(true);
  };

  return (
    <div
      className={styles["resizable-div"]}
      style={{ width: `${width}px`, height: `${height}px`, padding: "8px" }}
    >
      <div className={styles.resizer} onMouseDown={handleMouseDown}></div>
      {renderProps({
        width,
        height,
      })}
    </div>
  );
};

export default ResizableDiv;
