import { useRef, useEffect } from "react";

export const roundToTwo = (num) => Math.round(num * 100) / 100;
export const getFileExtension = (fileName) => /\.(\w+)$/.exec(fileName)[1];
export function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
