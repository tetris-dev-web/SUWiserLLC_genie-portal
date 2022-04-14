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

export const showCurrencyValue = (wei, currency, eth2usd) => {
  let returnValue = '';

  switch (String(currency).toLowerCase()) {
    case 'eth':
      returnValue = Number(wei) / (Math.pow(10, 18));
      break;
    case 'usd':
      const usd = Number(wei) * eth2usd/ (Math.pow(10, 18));
      returnValue = `$${usd}`;
      break;
    case 'wei':
    default:
      returnValue = wei;
  }

  return returnValue;
}