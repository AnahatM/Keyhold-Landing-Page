// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';
import { Section } from './ui/Section.js';
import { ScreenshotFrame } from './ui/ScreenshotFrame.js';
import { screenshots } from '../lib/site.js';

/**
 * The gallery.
 *
 * The first image is skipped: it is already the hero's, and a page that opens with a picture
 * and then shows the same picture again a screen later reads as though it ran out of things
 * to say.
 */
export function Screenshots(): JSX.Element {
  return (
    <Section
      id="screenshots"
      eyebrow="What it looks like"
      title="The whole application, as it actually renders"
      lede="Nothing here is a mockup, and nothing is staged in a design tool."
    >
      <div className="kh-shots">
        {screenshots.slice(1).map((shot) => (
          <ScreenshotFrame key={shot.src} src={shot.src} alt={shot.alt} caption={shot.caption} />
        ))}
      </div>

      <p className="kh-shots__note">
        Every image on this page is captured by Keyhold’s own launch probe —{' '}
        <code>npm run build &amp;&amp; node tools/smoke.mjs --shots docs/images</code> — which
        starts the real application, seeds a vault, drives the interface by clicking real controls,
        and captures each named view. Each capture asserts that its subject is on screen at the
        instant it is taken, so a screenshot here cannot quietly stop matching the app it claims to
        show. That check earned its place: it found four files that had drifted onto the wrong
        screen.
      </p>
    </Section>
  );
}
