import React, { useState, useEffect, PropsWithChildren } from "react";

type Props = {
  renderProps: (props: { width: number; height: number }) => React.ReactNode;
};

export function ResizableDiv({ renderProps }: PropsWithChildren<Props>) {
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
      className="relative m-2 rounded-md border p-4 dark:border-black-92.5"
      style={{ width: `${width}px`, height: `${height}px` }}
    >
      <div
        className="absolute bottom-0 right-0 z-10 h-3 w-3 cursor-nwse-resize bg-blue-100"
        onMouseDown={handleMouseDown}
      ></div>
      {renderProps({
        width,
        height,
      })}
    </div>
  );
}
