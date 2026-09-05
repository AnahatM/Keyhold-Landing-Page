// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';
import {
  AlertIcon,
  DownloadIcon,
  GitHubIcon,
  LockIcon,
  OfflineIcon,
  ScaleIcon,
} from './icons/index.js';
import { pitch, screenshots, site, status } from '../lib/site.js';

/**
 * The first screen.
 *
 * ## The screenshot is here, not further down
 *
 * A password manager is judged on whether it looks trustworthy in about three seconds, and
 * prose cannot do that. The first image on the page is the version history with the device
 * each change came from — the one thing no other free, local manager does — rather than a
 * generic list of credentials, which would look like every competitor's screenshot.
 *
 * ## The warning is above the fold
 *
 * It would convert better below it. It is here because the product's entire argument is that
 * it is candid where others are not, and a page that saved "not audited" for the footer would
 * be disproving its own pitch in the act of making it.
 */
export function Hero(): JSX.Element {
  const lead = screenshots[0];

  return (
    <section className="kh-hero" id="top" aria-labelledby="kh-hero-heading">
      <div className="kh-hero__grid" aria-hidden="true" />

      <div className="kh-wrap kh-hero__inner">
        <div className="kh-hero__copy">
          <h1 id="kh-hero-heading" className="kh-hero__title">
            A password manager that remembers where every change came from.
          </h1>

          <p className="kh-hero__lede">
            {site.tagline} No account, no server, no telemetry, no subscription — and a full version
            history that records what changed, when, and which machine changed it.
          </p>

          <div className="kh-hero__actions">
            <a className="kh-button kh-button--primary" href="#download">
              <DownloadIcon />
              Download for Windows
            </a>
            <a
              className="kh-button kh-button--ghost"
              href={site.repo}
              rel="noreferrer noopener"
              target="_blank"
            >
              <GitHubIcon />
              Read the source
            </a>
          </div>

          <p className="kh-hero__meta">
            <span>
              <OfflineIcon size={15} />
              Zero network by default
            </span>
            <span>
              <LockIcon size={15} />
              Argon2id · AES-256-GCM
            </span>
            <span>
              <ScaleIcon size={15} />
              GPL-3.0, free forever
            </span>
          </p>
        </div>

        {lead !== undefined && (
          <div className="kh-hero__shot">
            <img src={lead.src} alt={lead.alt} width={1384} height={835} decoding="async" />
          </div>
        )}
      </div>

      <div className="kh-wrap">
        <div className="kh-notice kh-notice--top" role="note">
          <span className="kh-notice__icon">
            <AlertIcon />
          </span>
          <div>
            <strong>{status.headline}</strong>
            <p>{status.detail}</p>
          </div>
        </div>

        <div className="kh-pitch">
          {pitch.map((claim) => (
            <div className="kh-pitch__item" key={claim.title}>
              <h3>{claim.title}</h3>
              <p>{claim.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
