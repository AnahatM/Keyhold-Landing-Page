// SPDX-License-Identifier: GPL-3.0-or-later
import { useCallback, useEffect, useState } from 'react';

type Scheme = 'dark' | 'light';

const STORAGE_KEY = 'keyhold-site-theme';

/**
 * Dark or light, following the operating system until the visitor says otherwise.
 *
 * ## Nothing leaves the browser
 *
 * The choice is kept in `localStorage` and nowhere else. Worth stating on a page for this
 * particular product: there is no request behind the toggle, no cookie, and nothing counted.
 * Every read and write is wrapped, because `localStorage` **throws** rather than returning
 * null in a private window under some settings, and a theme toggle must never be able to take
 * the page down with it.
 *
 * ## Resolved during render, not in an effect
 *
 * The first version read the stored value in an effect and called `setScheme`, which is a
 * cascading render — the page paints dark, then repaints light — and React's own lint rule
 * said so. A `useState` initialiser resolves it before the first paint instead. That is safe
 * here and would not be under server rendering: this is a static single-page site with no
 * SSR, so `window` is always present by the time a component runs.
 *
 * The one remaining effect is a genuine external-system sync — pushing the resolved value
 * onto the document element, which React does not own — which is what effects are for.
 */
function stored(): Scheme | null {
  try {
    const value = window.localStorage.getItem(STORAGE_KEY);
    return value === 'dark' || value === 'light' ? value : null;
  } catch {
    return null;
  }
}

function systemScheme(): Scheme {
  return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function useTheme(): { readonly scheme: Scheme; readonly toggle: () => void } {
  const [scheme, setScheme] = useState<Scheme>(() => stored() ?? systemScheme());

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', scheme);
  }, [scheme]);

  const toggle = useCallback(() => {
    setScheme((previous) => {
      const next: Scheme = previous === 'dark' ? 'light' : 'dark';
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // A visitor who has blocked site data still gets the toggle; it simply does not
        // survive a reload. A better outcome than an exception on a click.
      }
      return next;
    });
  }, []);

  return { scheme, toggle };
}
