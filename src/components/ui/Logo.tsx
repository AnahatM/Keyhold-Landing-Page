// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';

/**
 * The Keyhold mark, drawn rather than fetched.
 *
 * The same geometry as the application icon — `build/icon.svg` in the Keyhold repository,
 * which is itself generated from `tools/make-icons.mjs` rather than drawn by hand. Inlined
 * here so the header needs no image request, and so the mark is theme-aware: the plate keeps
 * the app's own blue in both schemes, because that is the product's colour and it should not
 * change when somebody flips the page to light.
 */
export function Logo({ size = 26 }: { readonly size?: number }): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 1024 1024"
      role="img"
      aria-label="Keyhold"
      focusable="false"
    >
      <defs>
        <linearGradient id="kh-logo-plate" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#3d63dd" />
          <stop offset="1" stopColor="#233c93" />
        </linearGradient>
      </defs>
      <rect width="1024" height="1024" rx="229.1" ry="229.1" fill="url(#kh-logo-plate)" />
      <g fill="#ffffff">
        <circle cx="512" cy="409.6" r="172" />
        <path d="M 440.3 440.3 L 583.7 440.3 L 647.2 798.7 L 376.8 798.7 Z" />
      </g>
    </svg>
  );
}
