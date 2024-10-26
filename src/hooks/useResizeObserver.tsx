import { useEffect } from "react";

export function useResizeObserver(
  ref: React.RefObject<HTMLDivElement>,
  callback: () => void,
) {
  useEffect(() => {
    const resizeObserver = new ResizeObserver(callback);
    const currentRef = ref.current;

    if (currentRef) {
      resizeObserver.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        resizeObserver.unobserve(currentRef);
      }
    };
  }, [ref, callback]);
}
