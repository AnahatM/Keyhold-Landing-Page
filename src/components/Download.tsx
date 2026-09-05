// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';
import { Section } from './ui/Section.js';
import {
  AlertIcon,
  AppleIcon,
  DownloadIcon,
  GitHubIcon,
  LinuxIcon,
  WindowsIcon,
} from './icons/index.js';
import { downloads, site, status } from '../lib/site.js';

/**
 * The download section, and the platform split stated out loud.
 *
 * ## Why macOS and Linux say "build from source" rather than nothing
 *
 * There is no Mac to build or test on. A macOS visitor who reached the releases page and
 * found no asset would learn that by wasting their time; being told here, with the one
 * command that works, is strictly better. It is also a more honest position than shipping an
 * unsigned Mac build that Gatekeeper refuses to open — and building from source is genuinely
 * one command, because there is no native code anywhere in Keyhold to compile per platform.
 *
 * ## Why the Windows card admits the SmartScreen warning
 *
 * Somebody is going to meet it. Meeting it after being told it is coming, and why, is a
 * different experience from meeting it unannounced on the first launch of a program that
 * holds all your passwords.
 */

const platformIcon: Readonly<Record<string, JSX.Element>> = {
  Windows: <WindowsIcon />,
  macOS: <AppleIcon />,
  Linux: <LinuxIcon />,
};

export function Download(): JSX.Element {
  return (
    <Section
      id="download"
      eyebrow="Get it"
      title="Windows builds are published. macOS and Linux build from source."
      lede="One command, and no toolchain beyond Node — there is no native code anywhere in Keyhold that has to be compiled per architecture."
    >
      <div className="kh-download">
        {downloads.map((target) => {
          const primary = target.platform === 'Windows';
          return (
            <div
              className={`kh-download__card${primary ? ' kh-download__card--primary' : ''}`}
              key={target.platform}
            >
              <p className="kh-download__platform">
                {platformIcon[target.platform]}
                {target.platform}
              </p>
              <p className="kh-download__how">{target.how}</p>
              {target.command !== null && (
                <p className="kh-download__command">
                  <code>{target.command}</code>
                </p>
              )}
              <p className="kh-download__detail">{target.detail}</p>
              <p className="kh-download__cta">
                <a
                  className={`kh-button ${primary ? 'kh-button--primary' : 'kh-button--ghost'}`}
                  href={primary ? site.releases : site.repo}
                  rel="noreferrer noopener"
                  target="_blank"
                >
                  {primary ? <DownloadIcon /> : <GitHubIcon />}
                  {primary ? 'Releases' : 'Build instructions'}
                </a>
              </p>
            </div>
          );
        })}
      </div>

      <div className="kh-notice kh-notice--top" role="note">
        <span className="kh-notice__icon">
          <AlertIcon />
        </span>
        <div>
          <strong>{status.headline}</strong>
          <p>{status.detail}</p>
        </div>
      </div>
    </Section>
  );
}
