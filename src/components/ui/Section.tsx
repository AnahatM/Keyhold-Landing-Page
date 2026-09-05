// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX, ReactNode } from 'react';
import { useReveal } from '../../hooks/useReveal.js';

/**
 * One band of the page: an id to anchor to, a heading, and the reveal behaviour.
 *
 * Every section on this page is one of these, so the vertical rhythm, the rule above each
 * band and the fade-in are decided once. The alternative — each component owning its own
 * padding and its own observer — is how a page ends up with four slightly different section
 * spacings that nobody chose.
 *
 * The heading is a real `<h2>` inside a `<section aria-labelledby>`, so the page has one
 * outline a screen reader can navigate rather than a stack of anonymous divs.
 */
export function Section({
  id,
  eyebrow,
  title,
  lede,
  plain = false,
  children,
}: {
  readonly id: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly lede?: string;
  readonly plain?: boolean;
  readonly children: ReactNode;
}): JSX.Element {
  const { ref, className } = useReveal<HTMLElement>();
  const headingId = `${id}-heading`;

  return (
    <section
      id={id}
      ref={ref}
      aria-labelledby={headingId}
      className={`kh-section${plain ? ' kh-section--plain' : ''} ${className}`}
    >
      <div className="kh-wrap">
        <p className="kh-section__eyebrow">{eyebrow}</p>
        <h2 id={headingId} className="kh-section__title">
          {title}
        </h2>
        {lede !== undefined && <p className="kh-section__lede">{lede}</p>}
        {children}
      </div>
    </section>
  );
}
