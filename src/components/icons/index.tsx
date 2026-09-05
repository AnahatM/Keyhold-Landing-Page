// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';

/**
 * Every icon on the page, inline.
 *
 * Inline rather than an icon package or a sprite request, for two reasons that both matter
 * more than usual here. A page about an application that makes no network requests should not
 * itself make eight of them to draw its own ticks. And an icon font or a CDN sprite is a
 * third-party origin that can see who visited a page about a password manager — small, but
 * it is exactly the kind of leak the product exists to refuse.
 *
 * `currentColor` throughout, so an icon takes the colour of whatever it sits in and there is
 * no second place a colour could be hardcoded.
 */

interface IconProps {
  readonly size?: number;
  readonly className?: string;
}

function svg(size: number, children: JSX.Element, className?: string): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      {children}
    </svg>
  );
}

export function GitHubIcon({ size = 18, className }: IconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      className={className}
    >
      <path d="M12 .5a12 12 0 0 0-3.79 23.4c.6.1.82-.26.82-.58v-2.2c-3.34.72-4.04-1.42-4.04-1.42-.55-1.4-1.34-1.77-1.34-1.77-1.1-.75.08-.73.08-.73 1.21.08 1.85 1.24 1.85 1.24 1.07 1.84 2.81 1.31 3.5 1 .1-.78.42-1.31.76-1.61-2.67-.3-5.47-1.34-5.47-5.96 0-1.32.47-2.4 1.24-3.24-.12-.3-.54-1.52.12-3.18 0 0 1.01-.32 3.3 1.24a11.5 11.5 0 0 1 6.01 0c2.29-1.56 3.3-1.24 3.3-1.24.66 1.66.24 2.88.12 3.18.77.84 1.23 1.92 1.23 3.24 0 4.63-2.8 5.65-5.48 5.95.43.37.82 1.1.82 2.22v3.29c0 .32.21.7.83.58A12 12 0 0 0 12 .5Z" />
    </svg>
  );
}

export function DownloadIcon({ size = 18 }: IconProps): JSX.Element {
  return svg(
    size,
    <>
      <path d="M12 3v12" />
      <path d="m7 11 5 5 5-5" />
      <path d="M4 20h16" />
    </>
  );
}

export function CheckIcon({ size = 17 }: IconProps): JSX.Element {
  return svg(size, <path d="m4.5 12.5 5 5 10-11" />);
}

export function PlusIcon({ size = 18 }: IconProps): JSX.Element {
  return svg(
    size,
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  );
}

export function AlertIcon({ size = 18 }: IconProps): JSX.Element {
  return svg(
    size,
    <>
      <path d="M12 9v4.5" />
      <path d="M12 17.2v.1" />
      <path d="M10.3 3.9 2.6 17.5A2 2 0 0 0 4.3 20.5h15.4a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    </>
  );
}

export function LockIcon({ size = 18 }: IconProps): JSX.Element {
  return svg(
    size,
    <>
      <rect x="4.5" y="10.5" width="15" height="10" rx="2" />
      <path d="M8 10.5V7a4 4 0 0 1 8 0v3.5" />
    </>
  );
}

export function OfflineIcon({ size = 18 }: IconProps): JSX.Element {
  return svg(
    size,
    <>
      <path d="M3 3.5 21 20.5" />
      <path d="M5.2 9.2a13 13 0 0 1 3.4-2.1" />
      <path d="M12.5 6.1a13 13 0 0 1 6.3 3.1" />
      <path d="M8.1 12.6a8.6 8.6 0 0 1 2-1.2" />
      <path d="M14 11.6a8.6 8.6 0 0 1 1.9 1" />
      <path d="M12 18.4v.1" />
    </>
  );
}

export function ScaleIcon({ size = 18 }: IconProps): JSX.Element {
  return svg(
    size,
    <>
      <path d="M12 4v16" />
      <path d="M6 8h12" />
      <path d="M3.5 15 6 8l2.5 7a3.4 3.4 0 0 1-5 0Z" />
      <path d="M15.5 15 18 8l2.5 7a3.4 3.4 0 0 1-5 0Z" />
    </>
  );
}

export function SunIcon({ size = 17 }: IconProps): JSX.Element {
  return svg(
    size,
    <>
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.2 5.2l1.4 1.4M17.4 17.4l1.4 1.4M18.8 5.2l-1.4 1.4M6.6 17.4l-1.4 1.4" />
    </>
  );
}

export function MoonIcon({ size = 17 }: IconProps): JSX.Element {
  return svg(size, <path d="M20 14.2A8.3 8.3 0 0 1 9.8 4a8.5 8.5 0 1 0 10.2 10.2Z" />);
}

export function WindowsIcon({ size = 19 }: IconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M3 5.4 10.4 4.4v7.1H3V5.4Zm0 13.2 7.4 1V12.5H3v6.1Zm8.6 1.2L21 21V12.5h-9.4v7.3Zm0-15.6v7.3H21V3l-9.4 1.2Z" />
    </svg>
  );
}

export function AppleIcon({ size = 19 }: IconProps): JSX.Element {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16.4 12.7c0-2.5 2-3.7 2.1-3.8-1.2-1.7-3-1.9-3.6-2-1.6-.2-3 .9-3.8.9-.8 0-2-.9-3.3-.9-1.7 0-3.2 1-4.1 2.5-1.7 3-.4 7.5 1.3 9.9.8 1.2 1.8 2.5 3.1 2.5 1.2 0 1.7-.8 3.2-.8s1.9.8 3.2.8c1.3 0 2.2-1.2 3-2.4.9-1.4 1.3-2.7 1.3-2.8-.1 0-2.4-1-2.4-3.9ZM14 5.3c.7-.8 1.1-2 1-3.3-1 .1-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.2-.6 2.9-1.3Z" />
    </svg>
  );
}

export function LinuxIcon({ size = 19 }: IconProps): JSX.Element {
  return svg(
    size,
    <>
      <path d="M9.4 3.6c0-1.2.9-2.1 2.6-2.1s2.6.9 2.6 2.1c0 1.9.2 3.3 1 4.5 1.3 2 2.4 3.6 2.4 5.9 0 1.4-.5 2.6-1.2 3.5" />
      <path d="M5.2 17.5A5.6 5.6 0 0 1 4 14c0-2.3 1.1-3.9 2.4-5.9.8-1.2 1-2.6 1-4.5" />
      <path d="M10.2 7.2v.1M13.8 7.2v.1" />
      <path d="M10.6 9.6c.9.6 1.9.6 2.8 0" />
      <path d="M5.2 17.5c-.6 1-1.6 1.9-1.3 2.7.4 1 2.3.5 3.6 1 1.2.4 2.4 1.3 4.5 1.3s3.3-.9 4.5-1.3c1.3-.5 3.2 0 3.6-1 .3-.8-.7-1.7-1.3-2.7" />
    </>
  );
}
