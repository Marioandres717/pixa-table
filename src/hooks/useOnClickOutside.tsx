import { useEffect, RefObject } from "react";

export const useOnclickOutside = (
  ref: RefObject<HTMLElement> | RefObject<HTMLElement>[],
  handler: (event: MouseEvent | TouchEvent) => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      let hasEvent = false;
      if (Array.isArray(ref)) {
        hasEvent = ref.some((r) => {
          return !r.current || r.current.contains(event.target as Node);
        });
        if (hasEvent) return;
      } else {
        if (!ref.current || ref.current.contains(event.target as Node)) return;
      }
      handler(event);
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};
