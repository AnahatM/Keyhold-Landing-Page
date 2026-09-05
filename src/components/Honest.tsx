// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';
import { Section } from './ui/Section.js';
import { tradeOffs } from '../lib/site.js';

/**
 * Where Keyhold loses, on the marketing page, named.
 *
 * This section is the reason the rest of the page is believable. "It doesn't autofill" is
 * better learned here than from a one-star review, and a product that will tell you what it
 * is bad at has earned a little more trust about what it is good at. It is also the same
 * table that is in the repository's README, deliberately, so the two cannot end up telling
 * different stories to different audiences.
 */
export function Honest(): JSX.Element {
  return (
    <Section
      id="honest"
      eyebrow="The trade-offs"
      title="Where other password managers are genuinely better"
      lede="Keyhold is not the right choice for everyone, and the places it loses are not footnotes."
    >
      <div className="kh-honest">
        {tradeOffs.map((item) => (
          <div className="kh-honest__row" key={item.area}>
            <p className="kh-honest__area">
              {item.area}
              <span className="kh-honest__who">{item.who}</span>
            </p>
            <p className="kh-honest__position">{item.position}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
