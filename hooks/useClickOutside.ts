import { useEffect, useRef } from "react";

const useClickOutside = (callback: Function) => {
  const domRef = useRef<any>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!domRef.current?.contains(event.target as Node)) callback();
    };
    document.body.addEventListener("click", handleClickOutside);
    return () => document.body.removeEventListener("click", handleClickOutside);
  }, [domRef]);

  return domRef;
};

export default useClickOutside;
