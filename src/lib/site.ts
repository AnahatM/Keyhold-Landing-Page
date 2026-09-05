// SPDX-License-Identifier: GPL-3.0-or-later

/**
 * Everything the page says that is a fact about Keyhold, in one place.
 *
 * ## Why this file exists, and the rule it enforces
 *
 * **Nothing on this page may claim a capability Keyhold does not have.** That is not a style
 * preference — it is the whole positioning. Keyhold's argument is that it is candid about its
 * limits where other password managers are not, and a marketing page that overstates it would
 * be the single fastest way to lose that argument. Several things a competitor has, Keyhold
 * deliberately does not, and the honest list is the more persuasive one.
 *
 * So every number below is copied from a registry in the Keyhold repository that has a guard
 * test behind it, and the comment says which. When one of those changes, this file is wrong
 * and must be updated — there is no way to make a static site notice on its own, which is
 * exactly why the numbers are gathered here rather than scattered through ten components.
 *
 * ## What is deliberately absent
 *
 * No download counts, no star counts, no testimonials, no "trusted by", no urgency, no
 * newsletter. The product is a local file with no account; a page that collects an email
 * address to tell you about it would be undercutting the pitch on the first scroll.
 */

export const site = {
  name: 'Keyhold',
  tagline: 'Your passwords, in a file you own, encrypted with a key only you have.',
  repo: 'https://github.com/AnahatM/Keyhold',
  releases: 'https://github.com/AnahatM/Keyhold/releases',
  issues: 'https://github.com/AnahatM/Keyhold/issues',
  author: 'Anahat Mudgal',
  authorUrl: 'https://anahatmudgal.com',
  authorGitHub: 'https://github.com/AnahatM',
  licence: 'GPL-3.0-or-later',
  licenceUrl: 'https://www.gnu.org/licenses/gpl-3.0.en.html',
} as const;

/**
 * The pre-release notice.
 *
 * Shown at the top of the page and again above the download, because a security tool that
 * buries "not audited yet" is doing the thing this project exists not to do. It is the same
 * warning the repository's README opens with, deliberately, so the two cannot drift into
 * telling different stories to different audiences.
 */
export const status = {
  headline: 'Pre-release, and not independently audited.',
  detail:
    'The vault format, the cryptography and everything on this page are built and tested, but Keyhold has had no third-party security review and has never been trusted with anybody’s real vault. Do not make it the only copy of anything yet.',
} as const;

export interface NavLink {
  readonly href: string;
  readonly label: string;
}

export const nav: readonly NavLink[] = [
  { href: '#history', label: 'The audit trail' },
  { href: '#features', label: 'Features' },
  { href: '#architecture', label: 'Architecture' },
  { href: '#honest', label: 'Trade-offs' },
  { href: '#download', label: 'Download' },
];

export interface Claim {
  readonly title: string;
  readonly body: string;
}

/** The three-line pitch, from `docs/00-Overview/00-What-Is-Keyhold.md`. */
export const pitch: readonly Claim[] = [
  {
    title: 'Actually offline',
    body: 'One encrypted file. No account, no server, no telemetry, no subscription, and nothing to host — for you or for the person who wrote it.',
  },
  {
    title: 'Remembers everything',
    body: 'Per-credential version history with a device and network audit trail, so you always know what changed, when, and which machine changed it.',
  },
  {
    title: 'Lets you leave',
    body: 'Nineteen import formats, KDBX 4 in both directions, a lossless JSON export, and a file format documented well enough for somebody else to write a reader.',
  },
];

export interface Feature {
  readonly title: string;
  readonly body: string;
}

/**
 * Counts here are copied from guarded registries in the Keyhold repository:
 *
 *   nineteen import parsers  `PARSERS` in src/main/import/index.ts — guarded by doc-counts.test.ts
 *   thirteen field types     `CUSTOM_FIELD_TYPES` in src/shared/model/credential.ts — same guard
 *   ten record types         `CREDENTIAL_TYPES` in src/shared/model/credential.ts
 *   ten health rules         `HEALTH_RULE_IDS` in src/shared/model/health.ts (eight on by default)
 *   eight themes             `THEMES` in src/shared/theme/themes.ts
 *   six export formats       `EXPORT_FORMAT_IDS` in src/shared/model/export.ts
 */
export const features: readonly Feature[] = [
  {
    title: 'Argon2id and AES-256-GCM',
    body: 'Envelope encryption: your master password derives a key that unwraps a second key, which encrypts the vault. Changing your master password rewraps 32 bytes instead of re-encrypting everything, so it is instant whether you have ten records or ten thousand. The Argon2 cost is calibrated to your machine when the vault is created, and can never be set below a floor.',
  },
  {
    title: 'A vault that is one file',
    body: 'Copy it, back it up, put it on a USB stick, keep it in your own cloud folder. Writes are atomic with rolling backups, deletions are tombstones rather than removals, and an interrupted write is quarantined rather than discarded.',
  },
  {
    title: 'Ten record types',
    body: 'Logins, cards, notes, identities, bank details, Wi-Fi networks, SSH keys, API keys, licences and memberships — each a field template rather than a separate storage shape, so searching and history work the same across all of them.',
  },
  {
    title: 'Thirteen typed custom fields',
    body: 'Reorderable, individually hidden, and typed — the type decides what is treated as a secret, so a card’s security code is protected because of what it is rather than what it sits beside. Security questions are a first-class repeatable field rather than free text in a note.',
  },
  {
    title: 'One-time codes',
    body: 'Store an authenticator seed in a record and Keyhold shows the current six digits with a countdown. Generated on this machine, from a seed that never reaches the interface.',
  },
  {
    title: 'An offline health check',
    body: 'Ten rules — reuse (with the cluster, so you know which records), weak, old, expiring, expired, insecure http:// URLs, likely duplicates and more. Scored with weights that are written down and arguable rather than opaque, run entirely on your device, and the report can never contain a password.',
  },
  {
    title: 'A generator with honest entropy',
    body: 'Random, passphrase over the real EFF wordlist, pronounceable and PIN. The entropy it reports is computed from the alphabet left after your exclusions, and it is charged for guaranteeing one character of each class rather than quietly overstating it.',
  },
  {
    title: 'Import from the manager you are leaving',
    body: 'Nineteen formats — Bitwarden, LastPass, 1Password, Chrome, Firefox, Safari, Dashlane, NordPass, KeePass, Proton Pass, Enpass, Keeper, RoboForm and a generic CSV mapper — plus KDBX 4. Every import is a dry run first, with duplicate detection, a full report, and an undo that refuses rather than swallowing an edit you made in the meantime.',
  },
  {
    title: 'Real merge sync, without a server',
    body: 'Two machines and one cloud folder, with a genuine three-way merge: tombstones, a base snapshot, a field-level conflict resolver, a mandatory backup before every merge, and a report of what it did. Keyhold also notices when your vault is in a folder a sync client is watching, and says what that means.',
  },
  {
    title: 'Eight themes and a contrast guard',
    body: 'Every colour is a token, and a test fails the build if any pair in any theme drops below its WCAG AA minimum. There are four surface styles, an accent picker, density and font-scale controls, and a theme editor that exports a file you can share.',
  },
  {
    title: 'A session activity log',
    body: 'What this session unlocked, revealed, copied and saved — the one question a password manager otherwise cannot answer: did something just walk my vault? Held in memory only and cleared the moment you lock, because a durable record of which credentials were read is a second, unencrypted index of what is in the vault.',
  },
  {
    title: 'Diagnose a vault without its password',
    body: 'Reads the container, the files beside it and, when a vault is open, its contents — and reports what it finds, in order of what to do about it. The report carries no passwords, no record names and no folder paths, so it is safe to attach to a bug report.',
  },
];

export interface Screenshot {
  readonly src: string;
  readonly alt: string;
  readonly caption: string;
}

/**
 * Every image is generated by Keyhold's own launch probe rather than staged by hand:
 * `npm run build && node tools/smoke.mjs --shots docs/images` drives the real app by clicking
 * real controls. Each capture asserts that its subject is on screen at the moment it is taken,
 * so a picture here cannot quietly stop matching the app it claims to show.
 */
export const screenshots: readonly Screenshot[] = [
  {
    src: '/screenshots/Keyhold-Screenshot-03.png',
    alt: 'A credential’s version history, each entry naming the device it came from, with one field-level change expanded',
    caption:
      'Version history, with the device each change came from — and a single field restorable on its own',
  },
  {
    src: '/screenshots/Keyhold-Screenshot-01.png',
    alt: 'The three-pane vault window, with a notice that the vault file sits in a folder Dropbox is syncing',
    caption:
      'The vault — and an unprompted warning that this file is inside a folder Dropbox is syncing',
  },
  {
    src: '/screenshots/Keyhold-Screenshot-12.png',
    alt: 'Two versions of a credential compared side by side, showing which fields differ',
    caption: 'Comparing any two points in a record’s history, including its current state',
  },
  {
    src: '/screenshots/Keyhold-Screenshot-07.png',
    alt: 'The vault health dashboard, showing a score and the arithmetic that produced it',
    caption: 'The health check, with the arithmetic behind the score shown rather than asserted',
  },
  {
    src: '/screenshots/Keyhold-Screenshot-16-totp.png',
    alt: 'A record showing a six-digit one-time code with a countdown ring',
    caption: 'One-time codes, generated on this machine from a seed the interface never receives',
  },
  {
    src: '/screenshots/Keyhold-Screenshot-13.png',
    alt: 'The session activity log, listing what this session unlocked, revealed and copied',
    caption: 'What this session read — held in memory only, and gone the moment you lock',
  },
  {
    src: '/screenshots/Keyhold-Screenshot-04.png',
    alt: 'The record editor, showing typed custom fields, URLs and security questions',
    caption:
      'The editor, with typed custom fields, multiple URLs and first-class security questions',
  },
  {
    src: '/screenshots/Keyhold-Screenshot-06.png',
    alt: 'The password generator, showing a generated password and the entropy it carries',
    caption:
      'The generator, reporting entropy computed from the alphabet your exclusions actually left',
  },
  {
    src: '/screenshots/Keyhold-Screenshot-18-diagnostics-report.png',
    alt: 'A diagnostics report listing what was found in a vault file and what to do about it, in order',
    caption:
      'Diagnosing a vault file — findings, then what to do in order, then what nothing can undo',
  },
  {
    src: '/screenshots/Keyhold-Screenshot-05.png',
    alt: 'The command palette open over the vault, listing commands and records',
    caption:
      'A command palette over everything, because the whole app is meant to be keyboard-first',
  },
];

export interface TradeOff {
  readonly area: string;
  readonly who: string;
  readonly position: string;
}

/**
 * The honest comparison, from `docs/00-Overview/02-Competitive-Analysis.md` §5.
 *
 * This section is not a hedge and it is not modesty. "It doesn't autofill" is better learned
 * from this page than from a one-star review, and a product that names where it loses is more
 * believable about where it wins.
 */
export const tradeOffs: readonly TradeOff[] = [
  {
    area: 'Browser autofill',
    who: 'Everyone except pass',
    position:
      'Not built. This is the single biggest gap, and for a lot of people it is the whole decision.',
  },
  {
    area: 'Mobile apps',
    who: '1Password, Bitwarden, Proton, the KeePassXC family',
    position:
      'Not in scope. Partly mitigated: Keyhold exports KDBX 4, which opens in a mobile KeePass client today.',
  },
  {
    area: 'A third-party security audit',
    who: 'Bitwarden, Proton, 1Password, KeePassXC',
    position:
      'None, and none claimed. What there is instead: a written threat model that says what Keyhold does not protect against, a small readable codebase, and a published format spec.',
  },
  {
    area: 'Hardware keys and YubiKey',
    who: 'KeePassXC',
    position:
      'Not built. The envelope design already accommodates it — a hardware key would be another wrapping of the same data key — but that is a plan, not a feature.',
  },
  {
    area: 'Maturity',
    who: 'KeePassXC, Bitwarden',
    position:
      'A new project that has never been trusted with anybody’s real vault. The answer is obsessive data-loss protection, not a claim of stability it has not earned.',
  },
  {
    area: 'Team and shared vaults',
    who: 'Bitwarden, Passbolt, Psono',
    position:
      'A deliberate non-goal. Encrypted .keepx parcels cover handing a few credentials to one person, and nothing more.',
  },
  {
    area: 'A memory-safe runtime',
    who: 'KeePassXC (C++/Qt)',
    position:
      'Electron is a fair criticism and there is no arguing it away. It is precisely why no secret is allowed into the window process at all.',
  },
];

export interface Faq {
  readonly question: string;
  readonly answer: string;
}

export const faqs: readonly Faq[] = [
  {
    question: 'Where is my vault stored?',
    answer:
      'Wherever you put it. Keyhold writes one file, with a .keep extension, to a path you choose. There is no application database, no hidden state that matters, and no account the file is tied to — copy it to another machine and it opens there, because the key comes from your master password and nothing else.',
  },
  {
    question: 'What happens if I forget my master password?',
    answer:
      'You lose the vault. That is not a policy, it is arithmetic: your password derives the key, the key is not stored anywhere, and AES-256-GCM returns the whole plaintext or nothing at all. Keyhold offers no brute force and no partial salvage, because neither exists. Keep a backup of the file and remember the password.',
  },
  {
    question: 'Does it really make no network requests?',
    answer:
      'Yes, by default. There is exactly one feature that would open a connection — an optional check of your passwords against the Have I Been Pwned corpus — and it is off until you turn it on, per vault, behind a dialog that explains what leaves your machine. There is also a machine-wide switch that refuses the network outright. Keyhold does not fetch site icons, does not check for updates, and has no telemetry or crash reporting of any kind.',
  },
  {
    question: 'How does the breach check work without sending my passwords?',
    answer:
      'Each password is hashed on your computer and only the first five characters of that hash are sent. The service replies with every leaked hash beginning with those five characters — hundreds of thousands of them — and Keyhold searches that list locally. The service cannot tell which password was asked about, or whether it was found.',
  },
  {
    question: 'Can I sync between two computers?',
    answer:
      'Put the file in a folder both machines sync — Dropbox, OneDrive, iCloud Drive, Syncthing, anything that copies files — and Keyhold handles the rest. If both machines edit while one is offline, the sync client produces a conflicted copy, and Keyhold merges the two properly: field by field, with a resolver for anything that genuinely disagrees, and a backup taken before it starts.',
  },
  {
    question: 'How do I get my data out?',
    answer:
      'Six ways, including KDBX 4 that opens in KeePassXC, Bitwarden’s own JSON, a flat CSV, and a lossless Keyhold JSON that carries every version and every origin. The KEEP format itself is documented in the repository. "You can leave whenever you want" is only worth saying if somebody else can write a reader.',
  },
  {
    question: 'Why is it free, and what is the catch?',
    answer:
      'There is no server, so there is nothing to pay for. Keyhold is GPL-3.0, which means any fork stays open too — for a security tool that guarantee is the trust argument. There is no paid tier, no licence key and no donation nag.',
  },
];

export interface DownloadTarget {
  readonly platform: string;
  readonly how: string;
  /**
   * The command, held as its own field rather than embedded in `detail`.
   *
   * It used to be a sentence with the command inside it, pulled back out at render time by a
   * regular expression — which promptly swallowed the prose after it and set half a paragraph
   * in monospace. A value that has to be recovered from a sentence should not have been put in
   * one; this is the same "no second list" rule the application itself follows.
   */
  readonly command: string | null;
  readonly detail: string;
}

/**
 * The platform split, stated plainly rather than left for a macOS visitor to discover by
 * finding no asset on the releases page.
 *
 * There is no Mac to build or test on, and buying one for a build nobody has asked for yet is
 * not a good trade. Saying so is a better position for a GPL project than shipping an unsigned
 * Mac build that Gatekeeper refuses to open anyway — and the source builds with one command,
 * because there is no native code anywhere in Keyhold to compile per-architecture.
 */
export const downloads: readonly DownloadTarget[] = [
  {
    platform: 'Windows',
    how: 'Download from GitHub Releases',
    command: null,
    detail:
      'An installer and a portable build. Unsigned, so Windows will show a SmartScreen warning the first time — a code-signing certificate is an annual cost, and Keyhold is built on the promise that it costs nothing to run.',
  },
  {
    platform: 'macOS',
    how: 'Build from source',
    command: 'npm install && npm run package:mac',
    detail:
      'Produces a DMG and a zip. No toolchain beyond Node is needed. The macOS branches of quick unlock and the network probe are written and have never been run on a real Mac — the first person to build one is the first to find out.',
  },
  {
    platform: 'Linux',
    how: 'Build from source',
    command: 'npm install && npm run package:linux',
    detail:
      'Produces an AppImage, a .deb and an .rpm. The same caveat applies: written, and not yet run in anger.',
  },
];
