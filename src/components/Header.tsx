// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';
import { Logo } from './ui/Logo.js';
import { GitHubIcon, MoonIcon, SunIcon } from './icons/index.js';
import { nav, site } from '../lib/site.js';
import { useTheme } from '../hooks/useTheme.js';

export function Header(): JSX.Element {
  const { scheme, toggle } = useTheme();

  return (
    <header className="kh-header">
      <div className="kh-wrap kh-header__inner">
        <a className="kh-header__brand" href="#top">
          <Logo />
          {site.name}
        </a>

        <nav className="kh-header__nav" aria-label="Sections">
          {nav.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="kh-header__actions">
          <button
            type="button"
            className="kh-iconbutton"
            onClick={toggle}
            // The label says what pressing it will do, not what the page currently is. A
            // button announced as "Dark theme" is ambiguous about whether that is the state
            // or the action, and a screen-reader user has no visual cue to disambiguate it.
            aria-label={
              scheme === 'dark' ? 'Switch to the light theme' : 'Switch to the dark theme'
            }
          >
            {scheme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>
          <a
            className="kh-iconbutton"
            href={site.repo}
            aria-label="Keyhold on GitHub"
            rel="noreferrer noopener"
            target="_blank"
          >
            <GitHubIcon />
          </a>
        </div>
      </div>
    </header>
  );
}
