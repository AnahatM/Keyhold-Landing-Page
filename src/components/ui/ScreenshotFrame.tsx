// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';

/**
 * A screenshot with its caption.
 *
 * `loading="lazy"` and an explicit `width`/`height` on every image. The dimensions are not
 * decoration: without them the browser cannot reserve the box before the PNG arrives, and
 * eight full-window screenshots loading in sequence would shift the page under the reader
 * repeatedly. They are the real pixel size of what the capture produces.
 *
 * The `alt` text describes what the screen *shows*, and the caption says what it *means*.
 * They are deliberately different strings — a caption repeated as alt text tells a screen
 * reader nothing it has not already read out.
 */
export function ScreenshotFrame({
  src,
  alt,
  caption,
  priority = false,
}: {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
  readonly priority?: boolean;
}): JSX.Element {
  return (
    <div className="kh-shot">
      <figure>
        <div className="kh-shot__frame">
          <img
            src={src}
            alt={alt}
            width={1384}
            height={835}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
          />
        </div>
        <figcaption>
          {caption}
          {/*
            Shown only under 700px, where the image pans inside its frame instead of
            shrinking to an unreadable width. Real text rather than a `::after`, so a screen
            reader gets it and so it can be translated.
          */}
          <span className="kh-shot__pan">Scroll the image sideways to read the whole window.</span>
        </figcaption>
      </figure>
    </div>
  );
}
