import { useEffect } from "react";

const handleKeyup = (event: globalThis.KeyboardEvent, handler: () => void) => {
  if (event.key === "Escape") handler();
};

export const useOnCloseEscape = (showFrame: boolean, handler: () => void) => {
  useEffect(() => {
    if (showFrame) {
      document.addEventListener("keyup", (e) => handleKeyup(e, handler));
    } else {
      document.removeEventListener("keyup", (e) => handleKeyup(e, handler));
    }
    return () => {
      document.removeEventListener("keyup", (e) => handleKeyup(e, handler));
    };
  }, [showFrame, handler]);
};
