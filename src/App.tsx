// SPDX-License-Identifier: GPL-3.0-or-later
import type { JSX } from 'react';
import { Header } from './components/Header.js';
import { Hero } from './components/Hero.js';
import { AuditTrail } from './components/AuditTrail.js';
import { Features } from './components/Features.js';
import { Architecture } from './components/Architecture.js';
import { Screenshots } from './components/Screenshots.js';
import { Honest } from './components/Honest.js';
import { Download } from './components/Download.js';
import { Faq } from './components/Faq.js';
import { Footer } from './components/Footer.js';

/**
 * One page, in the order an interested sceptic reads it.
 *
 * The sequence is an argument, not a list of sections. The audit trail comes first because it
 * is the only claim here that is genuinely uncommon — "secure and open source" is what every
 * password manager on earth says. The architecture section answers the Electron objection
 * before the reader has to raise it. And the trade-offs sit immediately before the download,
 * so nobody installs this without having been told what it does not do.
 */
export function App(): JSX.Element {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <AuditTrail />
        <Features />
        <Architecture />
        <Screenshots />
        <Honest />
        <Download />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
