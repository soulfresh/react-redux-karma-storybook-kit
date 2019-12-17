import {useEffect, useRef, useState} from 'react';
import { window } from 'global';

/*
 * Scroll window to the top of the page on component load.
 */
export function useScrollToTop() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
}

/*
 * Focus an element on component mount.
 */
export function useFocusOnMount() {
  const focusRef = useRef();
  useEffect(() => {
    if (focusRef.current) {
      focusRef.current.focus();
    } else {
      console.warn(
        `Could not focus element with "useFocusOnMount"
        because the "focusRef.current" value is not set.
        Verify that you passed the "focusRef" as a JSX ref prop.`
      );
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  return focusRef;
}

// Global counter used to create unique ids.
let idCount = 0;

export function useId(prefix) {
  const [id] = useState(() => `${prefix}-${++idCount}`);
  return id;
}
