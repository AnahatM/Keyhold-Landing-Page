// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';
import { Logo } from './ui/Logo.js';
import { site } from '../lib/site.js';

export function Footer(): JSX.Element {
  return (
    <footer className="kh-footer">
      <div className="kh-wrap kh-footer__inner">
        <p className="kh-footer__brand">
          <Logo size={22} />
          {site.name}
        </p>

        <nav className="kh-footer__links" aria-label="Elsewhere">
          <a href={site.repo} rel="noreferrer noopener" target="_blank">
            Source
          </a>
          <a href={site.releases} rel="noreferrer noopener" target="_blank">
            Releases
          </a>
          <a href={site.issues} rel="noreferrer noopener" target="_blank">
            Report a problem
          </a>
          <a href={site.licenceUrl} rel="noreferrer noopener" target="_blank">
            {site.licence}
          </a>
          <a href={site.authorGitHub} rel="noreferrer noopener" target="_blank">
            {site.author}
          </a>
        </nav>

        <p className="kh-footer__note">
          Keyhold is free software under the GNU General Public Licence, version 3 or later — which
          means any fork of it stays open too. For a tool that holds your passwords, that guarantee
          is the point rather than a formality: you, or anybody else, can read exactly what it does.
          This site sets no cookies, loads nothing from a third party, and counts nothing.
        </p>
      </div>
    </footer>
  );
}
