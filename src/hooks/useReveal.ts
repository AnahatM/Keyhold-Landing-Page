// SPDX-License-Identifier: GPL-3.0-or-later
import { useEffect, useRef, useState } from 'react';

/**
 * Fades a section in once it scrolls into view.
 *
 * ## It arms itself, and that is the whole design
 *
 * The element starts **visible**. The hidden state is applied from JavaScript, in an effect,
 * and only immediately before an observer that can undo it is attached. So a visitor whose
 * script fails to load, or is blocked, or whose browser has no `IntersectionObserver`, reads
 * a fully legible page rather than a column of invisible sections — the failure mode of
 * every scroll-reveal that starts at `opacity: 0` in the stylesheet.
 *
 * On a page for a security tool that is the correct trade: people who block scripts are
 * disproportionately the audience for this product.
 *
 * ## Reduced motion is honoured before anything is armed
 *
 * `prefers-reduced-motion` is checked first, and when it is set the element is simply never
 * hidden. Not "animated faster" — not animated.
 */
export function useReveal<T extends HTMLElement>(): {
  readonly ref: React.RefObject<T | null>;
  readonly className: string;
} {
  const ref = useRef<T>(null);
  const [state, setState] = useState<'idle' | 'armed' | 'shown'>('idle');

  useEffect(() => {
    const element = ref.current;
    if (element === null) return;

    if (
      typeof IntersectionObserver === 'undefined' ||
      window.matchMedia('(prefers-reduced-motion: reduce)').matches
    ) {
      return;
    }

    // Already on screen when the effect runs — the hero, and anything above the fold on a
    // tall display. Arming it would flash it out and back in, which is worse than no
    // animation at all.
    if (element.getBoundingClientRect().top < window.innerHeight * 0.9) {
      setState('shown');
      return;
    }

    setState('armed');
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          setState('shown');
          // One-shot. A section that fades out again when scrolled past is a distraction,
          // and re-running it on every pass is work for no benefit.
          observer.disconnect();
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
    };
  }, []);

  const className =
    state === 'idle'
      ? 'kh-reveal'
      : state === 'armed'
        ? 'kh-reveal kh-reveal--armed'
        : 'kh-reveal kh-reveal--armed kh-reveal--shown';

  return { ref, className };
}
