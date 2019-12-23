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

// Global counter used to create unique ids.
let idCount = 0;

export function useId(prefix) {
  const [id] = useState(() => `${prefix}-${++idCount}`);
  return id;
}
