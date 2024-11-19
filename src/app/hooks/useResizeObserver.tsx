import { useEffect } from 'react';

type Breakpoint = {
  width: number;
  callback: () => void;
};

const useResizeObserver = (
  ref: React.RefObject<HTMLElement>,
  breakpoints: Breakpoint[],
  defaultCallback: () => void
) => {
  useEffect(() => {
    const resizeObserver = new ResizeObserver((entries) => {
      if (entries[0]) {
        const parentWidth = entries[0].contentRect.width;
        let handled = false;

        for (const { width, callback } of breakpoints) {
          if (parentWidth > width) {
            callback();
            handled = true;
            break;
          }
        }

        if (!handled) {
          defaultCallback();
        }
      }
    });

    if (ref.current) {
      resizeObserver.observe(ref.current);
    }

    return () => {
      resizeObserver.disconnect();
    };
  }, [ref, breakpoints, defaultCallback]);
};

export default useResizeObserver;