import { useEffect, useRef } from "react";
import inRange from "lodash/inRange";

const useOutsideClick = <T extends HTMLElement>(action: () => void) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const handleOutsideClick = (e: MouseEvent) => {
      if (!ref.current) return;
      const { clientX, clientY } = e;
      if (!clientX && !clientY) return;
      const { top, bottom, left, right } = ref.current?.getBoundingClientRect();
      if (
        !inRange(clientX, left, right) ||
        (!inRange(clientY, top, bottom) &&
          !ref.current.contains(e.target as Node))
      ) {
        action();
      }
    };
    document.addEventListener("click", handleOutsideClick);
    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [action]);

  return { ref };
};

export default useOutsideClick;
