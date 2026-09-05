// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';
import { Section } from './ui/Section.js';
import { CheckIcon } from './icons/index.js';

/**
 * The answer to "Electron, really?", given before anyone has to ask it.
 *
 * It is the most common objection to a desktop password manager built this way, and the
 * honest answer is architectural rather than defensive: most Electron password managers
 * decrypt the whole vault into the window process, where one cross-site-scripting bug or one
 * compromised npm package reaches every secret at once. Keyhold's window does not have them
 * to leak — it holds titles, usernames, dates and lengths, and asks for one secret at a time.
 *
 * The diagram is markup rather than an image so it reads correctly at any width, in either
 * theme, and to a screen reader.
 */

const guarantees: readonly string[] = [
  'The window process never receives a password, a note body, a security-question answer, a one-time-password seed or an attachment’s bytes.',
  'Secrets are fetched one at a time, through a rate-limited broker with a short expiry, and every grant is revoked the instant you lock.',
  'A property test walks everything the window can see and fails if a secret ever appears in it — so adding one is a build failure, not a code review someone might wave through.',
  'The content-security policy forbids the window from opening any connection at all, and the list of permitted remote hosts is empty.',
  'Nothing is ever logged that could carry a secret: not a password, not a hash, not a file path from a failed backup.',
];

export function Architecture(): JSX.Element {
  return (
    <Section
      id="architecture"
      eyebrow="Why Electron is not the objection it looks like"
      title="The window never holds the key"
      lede="Keyhold is an Electron app, and that is a fair thing to be sceptical about. The answer is not a promise — it is that the process an attacker would reach does not have your secrets in it."
    >
      <div className="kh-arch">
        <div className="kh-arch__diagram" aria-hidden="true">
          <div className="kh-arch__box kh-arch__box--main">
            <strong>Main process</strong>
            <span>
              master key · Argon2id · AES-256-GCM · the decrypted vault · file I/O · every secret
            </span>
          </div>
          <p className="kh-arch__bridge">typed, allow-listed, validated both ways</p>
          <div className="kh-arch__box">
            <strong>Window process</strong>
            <span>
              titles · usernames · emails · URLs · tags · folders · dates · lengths · health flags
            </span>
          </div>
        </div>

        <div>
          <ul className="kh-arch__list">
            {guarantees.map((guarantee) => (
              <li key={guarantee}>
                <CheckIcon />
                <span>{guarantee}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
