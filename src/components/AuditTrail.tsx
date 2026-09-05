// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';
import { Section } from './ui/Section.js';
import { ScreenshotFrame } from './ui/ScreenshotFrame.js';

/**
 * The headline claim, given a whole band to itself.
 *
 * It leads the page rather than sitting in the feature grid, because "secure and open source"
 * is what every password manager says and this is the one thing that is genuinely uncommon in
 * the free, local tier. Chrome keeps no history at all. KeePassXC keeps previous passwords
 * with no device or network provenance and no field-level diff. Bitwarden's history is a paid
 * tier and carries no device attribution. The tools that answer *which of my machines changed
 * this, and from where* are enterprise, hosted and paid.
 *
 * Each point below is a capability that exists and can be seen in the screenshot beside it.
 */

interface Point {
  readonly title: string;
  readonly body: string;
}

const points: readonly Point[] = [
  {
    title: 'What changed, field by field',
    body: 'Not "this record was edited" — which fields moved and what they held before. Any single field can be restored on its own without touching the rest of the record.',
  },
  {
    title: 'From which device, and which network',
    body: 'Each version records the machine, the operating-system account, the network it was on and the app version that wrote it. That is what turns a history into an audit trail.',
  },
  {
    title: 'At a privacy level you choose',
    body: 'Four levels — none, device, network, full — enforced at the moment of capture rather than at display. A field you chose not to record was never written to the file at all, so it cannot leak later.',
  },
  {
    title: 'Restoring is itself recorded',
    body: 'The one operation that rewrites a record is not the one the trail cannot see. Rolling back leaves an entry saying so.',
  },
  {
    title: 'Inside the encrypted body',
    body: 'The trail travels with the vault when you copy it, and the file itself reveals none of it. A header you can read without the password says the format and the key parameters, and nothing else.',
  },
];

export function AuditTrail(): JSX.Element {
  return (
    <Section
      id="history"
      eyebrow="The part nobody else does"
      title="Every change, with the machine it came from"
      lede="Most password managers can tell you a password changed. Keyhold can tell you it changed at 2am on the laptop, on the office network, from version 0.9.2 — and show you exactly which characters moved."
    >
      <div className="kh-spotlight">
        <ScreenshotFrame
          src="/screenshots/Keyhold-Screenshot-12.png"
          alt="Two versions of a credential compared, with a tags field showing its previous and current value and a control to restore just that field"
          caption="Comparing any two points in a record’s history — including its current state — and restoring one field without the others"
        />

        <div className="kh-spotlight__points">
          {points.map((point) => (
            <div className="kh-spotlight__point" key={point.title}>
              <span className="kh-spotlight__marker" aria-hidden="true" />
              <div>
                <h4>{point.title}</h4>
                <p>{point.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
}
