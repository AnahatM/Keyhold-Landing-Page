// SPDX-License-Identifier: GPL-3.0-or-later
import { existsSync, readFileSync, readdirSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

/**
 * Guard: every image this page references exists, and every image it ships is referenced.
 *
 * ## The failure it catches
 *
 * A missing screenshot is the one defect on a static marketing page that nothing else would
 * notice. TypeScript does not check a string path, the bundler copies `public/` verbatim
 * without looking inside it, and the build succeeds — so the first person to find out is a
 * visitor, looking at a broken image on a page whose entire argument is that this software is
 * careful. The screenshots come from another repository and are copied in by hand, which is
 * exactly the arrangement where a rename goes unnoticed.
 *
 * It runs both directions on purpose. A referenced file that is missing is a broken image; an
 * unreferenced file that ships is dead weight served to every visitor, and more usefully it
 * is the signature of a rename that updated one side and not the other.
 *
 * ## Why a script rather than a test framework
 *
 * There is one property worth defending on this site and it takes forty lines. Installing a
 * runner, a config and a watcher to hold it would be more machinery than the thing it guards.
 * It is wired into `npm run verify`, so it runs wherever the build runs.
 *
 * Fault injection performed, all three directions: renaming a file under `public/screenshots`
 * failed with `referenced but missing`, dropping a screenshot from `site.ts` failed with
 * `shipped but referenced nowhere`, and renaming one under `docs/images` failed with
 * `referenced by the README but missing`.
 *
 * ## It also checks the share metadata, for the same reason
 *
 * `og:image` shipped as a **relative** path, which Open Graph does not resolve — it is simply
 * dropped. Every link to this page anywhere would have rendered a card with no picture, and
 * nothing would have said so: the page itself looks perfect, the file exists, the build
 * passes. It is the same class of silent defect as a missing screenshot, one layer out.
 *
 * The origin is written three times in `index.html` — `canonical`, `og:url`, `og:image` — and
 * that duplication is only safe because this checks they agree. When the site moves to its
 * real domain, change all three and this will tell you if you missed one.
 */

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = resolve(HERE, '..');

/** Files that name an image path. `README.md` is here for the same reason as the rest. */
const sources = ['src/lib/site.ts', 'src/components/AuditTrail.tsx', 'index.html'];

/** The README points at `docs/images/`, which the site never serves — checked separately. */
const docSources = ['README.md'];

/** Every `/screenshots/...` or `/icon...`-style path any source mentions. */
const referenced = new Set();
for (const source of sources) {
  const path = join(ROOT, source);
  if (!existsSync(path)) {
    console.error(
      `check-assets: ${source} does not exist. Update the list in tools/check-assets.mjs.`
    );
    process.exit(1);
  }
  for (const [match] of readFileSync(path, 'utf8').matchAll(
    /\/(?:screenshots\/[^'")\s]+|[\w.-]+\.(?:svg|png))/g
  )) {
    referenced.add(match);
  }
}

const shipped = new Set(
  readdirSync(join(ROOT, 'public/screenshots')).map((name) => `/screenshots/${name}`)
);

const problems = [];

// The README's own screenshots, resolved from the repository root rather than from `public`.
// A broken image in a README is exactly as silent as a broken image on the page, and these
// are captured by hand from a running preview rather than generated, so they drift faster.
const docReferenced = new Set();
for (const source of docSources) {
  const path = join(ROOT, source);
  if (!existsSync(path)) continue;
  for (const [match] of readFileSync(path, 'utf8').matchAll(
    /(?:docs|public)\/[\w./-]+\.(?:png|svg)/g
  )) {
    docReferenced.add(match);
  }
}

for (const path of docReferenced) {
  if (!existsSync(join(ROOT, path))) {
    problems.push(`referenced by the README but missing: ${path}`);
  }
}

for (const path of referenced) {
  if (!existsSync(join(ROOT, 'public', path))) {
    problems.push(`referenced but missing from public/: ${path}`);
  }
}

for (const path of shipped) {
  if (!referenced.has(path)) {
    problems.push(`shipped but referenced nowhere: ${path}`);
  }
}

// ── Share metadata ───────────────────────────────────────────────────────────

const html = readFileSync(join(ROOT, 'index.html'), 'utf8');
const contentOf = (pattern) => pattern.exec(html)?.[1] ?? null;

const canonical = contentOf(/<link rel="canonical" href="([^"]+)"/);
const ogUrl = contentOf(/<meta property="og:url" content="([^"]+)"/);
const ogImage = contentOf(/<meta\s+property="og:image"\s+content="([^"]+)"/);

if (canonical === null) problems.push('index.html has no <link rel="canonical">');
if (ogUrl === null) problems.push('index.html has no og:url');
if (ogImage === null) problems.push('index.html has no og:image');

if (canonical !== null && ogImage !== null && ogUrl !== null) {
  let origin = null;
  try {
    origin = new URL(canonical).origin;
  } catch {
    problems.push(`canonical is not an absolute URL: ${canonical}`);
  }

  if (!ogImage.startsWith('http')) {
    // The defect this check exists for. Open Graph resolves nothing relative.
    problems.push(`og:image must be an absolute URL, not a path: ${ogImage}`);
  } else if (origin !== null && !ogImage.startsWith(`${origin}/`)) {
    problems.push(`og:image origin does not match canonical (${origin}): ${ogImage}`);
  }

  if (origin !== null && new URL(ogUrl).origin !== origin) {
    problems.push(`og:url origin does not match canonical (${origin}): ${ogUrl}`);
  }
}

if (problems.length > 0) {
  console.error(`check-assets: ${String(problems.length)} problem(s):`);
  for (const problem of problems) console.error(`  ${problem}`);
  process.exit(1);
}

console.log(
  `check-assets: ${String(referenced.size)} page asset(s) and ${String(docReferenced.size)} README asset(s) present, none shipped unused.`
);
console.log(`check-assets: share metadata absolute and consistent at ${String(canonical)}`);
