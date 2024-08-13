import React from "react";

export const useDebounce = (delay: number) => {
  const timerRef = React.useRef<any>(null);
  const debounce = (fn: Function) => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => {
      fn();
    }, delay);
  };

  return debounce;
};
