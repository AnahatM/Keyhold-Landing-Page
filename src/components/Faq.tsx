// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';
import { Section } from './ui/Section.js';
import { PlusIcon } from './icons/index.js';
import { faqs } from '../lib/site.js';

/**
 * Native `<details>` rather than a hand-built accordion.
 *
 * It is keyboard-operable, announced correctly, and works with JavaScript disabled — three
 * things a div with an `onClick` gets wrong by default and only ever gets right by
 * reimplementing what the browser already does. The rotation of the plus into a cross is CSS
 * on `[open]`, so no state is tracked in React at all.
 */
export function Faq(): JSX.Element {
  return (
    <Section id="faq" eyebrow="Questions" title="The things people ask first">
      <div className="kh-faq">
        {faqs.map((faq) => (
          <details className="kh-faq__item" key={faq.question}>
            <summary>
              {faq.question}
              <PlusIcon />
            </summary>
            <p className="kh-faq__answer">{faq.answer}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
