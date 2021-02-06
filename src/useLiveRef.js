import { useLayoutEffect, useRef } from "react";

export default function useLiveRef(value) {
  const ref = useRef(value);
  useLayoutEffect(() => {
    ref.current = value;
  });
  return ref;
}
