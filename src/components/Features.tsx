// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';
import { Section } from './ui/Section.js';
import { features } from '../lib/site.js';

export function Features(): JSX.Element {
  return (
    <Section
      id="features"
      eyebrow="What is in it"
      title="Everything a local password manager should already have"
      lede="No paid tier gates any of this. Attachments and health reports are premium features in Bitwarden; here they are simply features."
    >
      <div className="kh-features">
        {features.map((feature) => (
          <article className="kh-feature" key={feature.title}>
            <h3>{feature.title}</h3>
            <p>{feature.body}</p>
          </article>
        ))}
      </div>
    </Section>
  );
}
