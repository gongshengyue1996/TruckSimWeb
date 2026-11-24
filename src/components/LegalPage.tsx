import { useState } from 'react';
import { ArrowLeft, Check, Link2 } from 'lucide-react';

export type LegalDocType = 'privacy' | 'terms';

interface LegalSection {
  id: string;
  number: string;
  title: string;
  paragraphs: string[];
  bullets?: string[];
}

interface LegalPageProps {
  docType: LegalDocType;
  onNavigateHome: () => void;
  onSwitchDoc: (doc: LegalDocType) => void;
}

const EFFECTIVE_DATE = 'November 23, 2026';

const PRIVACY_SECTIONS: LegalSection[] = [
  {
    id: 'scope',
    number: '01',
    title: 'Scope & Overview',
    paragraphs: [
      'This Privacy Policy describes how Truck Sim Nav ("we", "our", or "us") handles information in connection with the Truck Sim Nav iOS and iPadOS mobile application, the optional Windows PC Telemetry Bridge companion plugin for Euro Truck Simulator 2, and this official product website.',
      'Truck Sim Nav is engineered with a local-first architecture. You do not need to create an account, sign in, or connect to cloud servers to use GPS navigation, real-time vehicle telemetry, traffic signal countdowns, 3D AI traffic perception, or multilingual voice guidance.',
    ],
  },
  {
    id: 'local-telemetry',
    number: '02',
    title: 'Local Network & Simulator Telemetry Data',
    paragraphs: [
      'To display live in-game speed, fuel level, estimated range, remaining trip mileage, traffic signal phases, lane guidance, and surrounding AI vehicle positions, the Truck Sim Nav iOS app communicates directly with the Windows PC Telemetry Bridge over your private local Wi-Fi network (LAN).',
      'All simulator telemetry data remains strictly inside your local home network and is processed exclusively in temporary device memory to render the cockpit display.',
    ],
    bullets: [
      'We do not upload, transmit, log, or sell your simulator telemetry, driving history, or in-game coordinates to any external server.',
      'iOS Local Network Permission: On first launch, iOS requests Local Network access so Truck Sim Nav can discover your gaming PC via Bonjour/mDNS or connect to your local LAN IP address. This permission is used solely for PC-to-iOS telemetry streaming.',
      'Real-World Location Data: Truck Sim Nav does not access, request, or track your real-world GPS location, CoreLocation sensors, or physical whereabouts.',
    ],
  },
  {
    id: 'on-device-storage',
    number: '03',
    title: 'On-Device Preferences & Voice Processing',
    paragraphs: [
      'Your display and audio preferences—such as Light or Dark Mode selection, unit preferences (km/h or mph), voice language selection, audio lead distance, and saved local PC IP addresses—are stored locally on your iPhone or iPad using standard Apple iOS storage.',
      'Turn-by-turn multilingual voice prompts are generated locally on your device using Apple iOS speech synthesis and bundled navigation phrasebooks. No microphone access is requested, and no audio recordings are ever collected.',
    ],
  },
  {
    id: 'website-data',
    number: '04',
    title: 'Website & Voluntary Release Notifications',
    paragraphs: [
      'When you browse the Truck Sim Nav website, we do not run invasive third-party advertising trackers or cross-site behavioral profiling cookies.',
      'If you voluntarily enter your email address in the Platform & Release Updates form or contact support by email, we use that address solely to send the updates you requested or respond to your inquiry.',
    ],
    bullets: [
      'You may request removal of your email address from release notifications at any time by contacting support.',
      'We never sell, rent, or trade contact email addresses to third parties or data brokers.',
    ],
  },
  {
    id: 'apple-diagnostics',
    number: '05',
    title: 'App Store & Apple Platform Diagnostics',
    paragraphs: [
      'Truck Sim Nav is distributed through the Apple App Store. Apple Inc. processes app downloads, purchases, and refunds under Apple’s own Privacy Policy. If you opt in to "Share With App Developers" in your iOS Settings, Apple may provide us with anonymized, aggregated crash reports and performance metrics to help fix stability issues.',
    ],
  },
  {
    id: 'children-privacy',
    number: '06',
    title: 'Children’s Privacy',
    paragraphs: [
      'Because Truck Sim Nav does not require user accounts and does not collect personal information from the iOS application, we do not knowingly collect personal data from children under 13 (or the applicable age of digital consent in your jurisdiction). If a parent or guardian believes a child has voluntarily submitted an email address via our website or support channel, please contact us so we can promptly delete it.',
    ],
  },
  {
    id: 'rights-retention',
    number: '07',
    title: 'Data Retention & Your Privacy Rights',
    paragraphs: [
      'Local app preferences remain on your iOS device until you reset app settings or uninstall Truck Sim Nav. Support emails and release-update addresses are retained only for as long as necessary to fulfill your request or comply with legal obligations.',
      'Depending on your region (including the European Economic Area under GDPR, the United Kingdom, or California under CCPA/CPRA), you have the right to request access to, correction of, or deletion of any personal contact information you have voluntarily shared with us.',
    ],
  },
  {
    id: 'changes-contact',
    number: '08',
    title: 'Policy Updates & Contact Information',
    paragraphs: [
      'We may update this Privacy Policy periodically to reflect improvements to Truck Sim Nav or changes in applicable privacy regulations. Material revisions will be posted on this page with an updated Effective Date.',
      'For privacy inquiries, data deletion requests, or questions regarding App Store privacy disclosures, please contact us at support@trucksimnav.app.',
    ],
  },
];

const TERMS_SECTIONS: LegalSection[] = [
  {
    id: 'acceptance',
    number: '01',
    title: 'Acceptance of Terms',
    paragraphs: [
      'By downloading, installing, or using the Truck Sim Nav iOS/iPadOS application, the companion Windows PC Telemetry Bridge, or this website (collectively, the "Software"), you agree to be bound by these Terms of Use. If you do not agree to these terms, do not install or use the Software.',
      'If you download Truck Sim Nav from the Apple App Store, your use of the iOS application is also subject to Apple’s Licensed Application End User License Agreement (Standard EULA) and App Store Terms of Service.',
    ],
  },
  {
    id: 'simulation-safety',
    number: '02',
    title: 'Simulation-Only Use & Real-World Driving Disclaimer',
    paragraphs: [
      'Truck Sim Nav is a companion telemetry and navigation display engineered strictly for virtual driving inside the Euro Truck Simulator 2 PC video game.',
    ],
    bullets: [
      'NEVER use Truck Sim Nav for real-world vehicle navigation, commercial trucking operations, or while operating any physical motor vehicle.',
      'Map layouts, lane guidance, speed limits, traffic signal countdowns, and 3D vehicle displays reflect simulated game telemetry only and have no relation to real-world roads or traffic laws.',
      'You assume full responsibility for safe and lawful operation of any physical equipment and workspace.',
    ],
  },
  {
    id: 'license',
    number: '03',
    title: 'License Grant & Restrictions',
    paragraphs: [
      'Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to install and use Truck Sim Nav on Apple-branded iOS and iPadOS devices that you own or control, and to run the companion Windows Telemetry Bridge on your personal gaming PC for personal, non-commercial simulation use.',
    ],
    bullets: [
      'You may not reverse engineer, decompile, disassemble, or attempt to extract source code from the Software except where explicitly permitted by applicable law.',
      'You may not redistribute, resell, sublicense, or repackage the iOS application or companion bridge as your own commercial product.',
      'You may not use the Software to disrupt networks or violate the End User License Agreement of Euro Truck Simulator 2.',
    ],
  },
  {
    id: 'third-party-trademarks',
    number: '04',
    title: 'Independent Software & Third-Party Trademarks',
    paragraphs: [
      'Truck Sim Nav is an independent third-party companion application and is not affiliated with, endorsed by, sponsored by, or officially connected to SCS Software s.r.o. or Apple Inc.',
      'Euro Truck Simulator 2 and its official Telemetry SDK are trademarks and intellectual property of SCS Software s.r.o. Apple, iPhone, iPad, iOS, iPadOS, Metal, and App Store are trademarks of Apple Inc., registered in the U.S. and other countries.',
    ],
  },
  {
    id: 'billing-refunds',
    number: '05',
    title: 'Purchases, Pricing & Refunds',
    paragraphs: [
      'Any paid features, one-time unlocks, or app purchases for Truck Sim Nav are processed exclusively by Apple through the Apple App Store. We do not collect or store your payment card details.',
      'All billing inquiries, receipts, and refund requests are handled directly by Apple in accordance with App Store refund policies at reportaproblem.apple.com.',
    ],
  },
  {
    id: 'compatibility',
    number: '06',
    title: 'Simulator Updates & Third-Party Map Mods',
    paragraphs: [
      'Euro Truck Simulator 2 receives periodic updates from SCS Software that may alter game telemetry structures or road map coordinates. While we strive to maintain timely compatibility across supported ETS2 releases, uninterrupted compatibility with future game patches, beta builds, or unofficial third-party map modifications (such as ProMods) cannot be guaranteed.',
    ],
  },
  {
    id: 'warranty-liability',
    number: '07',
    title: 'Disclaimer of Warranties & Limitation of Liability',
    paragraphs: [
      'THE SOFTWARE IS PROVIDED "AS IS" AND "AS AVAILABLE," WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS OR IMPLIED, INCLUDING IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, OR NON-INFRINGEMENT.',
      'To the maximum extent permitted by applicable law, Truck Sim Nav and its developer shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, game saves, hardware, or profits arising out of your use of or inability to use the Software.',
    ],
  },
  {
    id: 'governing-contact',
    number: '08',
    title: 'Modifications, Termination & Contact',
    paragraphs: [
      'We reserve the right to modify these Terms of Use at any time. Continued use of the Software following the posting of revised terms constitutes acceptance of those changes. Your license terminates automatically if you fail to comply with any material term.',
      'Apple Inc. and its subsidiaries are third-party beneficiaries of these Terms with respect to the iOS application and have the right to enforce them against you as a third-party beneficiary.',
      'Questions regarding these Terms of Use may be directed to support@trucksimnav.app.',
    ],
  },
];

export function LegalPage({ docType, onNavigateHome, onSwitchDoc }: LegalPageProps) {
  const [copiedLink, setCopiedLink] = useState(false);

  const isPrivacy = docType === 'privacy';
  const sections = isPrivacy ? PRIVACY_SECTIONS : TERMS_SECTIONS;

  const handleCopyUrl = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      window.setTimeout(() => setCopiedLink(false), 1800);
    } catch {
      setCopiedLink(false);
    }
  };

  return (
    <div className="bg-white">
      {/* Top Legal Document Header Band */}
      <div className="bg-[#F8F9FA] border-b border-[#DADCE0] py-10 sm:py-12">
        <div className="max-w-[1200px] mx-auto px-6">
          <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
            <button
              type="button"
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#1A73E8] hover:text-[#0B57D0] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              Back to Truck Sim Nav
            </button>

            <div className="flex items-center gap-3">
              {/* Segmented switcher between Privacy Policy and Terms of Use */}
              <div
                role="tablist"
                aria-label="Legal documents"
                className="inline-flex items-center p-1 bg-white border border-[#DADCE0] rounded-lg"
              >
                <button
                  type="button"
                  role="tab"
                  aria-selected={isPrivacy}
                  onClick={() => onSwitchDoc('privacy')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    isPrivacy
                      ? 'bg-[#1A73E8] text-white'
                      : 'text-[#444746] hover:text-[#1F1F1F]'
                  }`}
                >
                  Privacy Policy
                </button>
                <button
                  type="button"
                  role="tab"
                  aria-selected={!isPrivacy}
                  onClick={() => onSwitchDoc('terms')}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    !isPrivacy
                      ? 'bg-[#1A73E8] text-white'
                      : 'text-[#444746] hover:text-[#1F1F1F]'
                  }`}
                >
                  Terms of Use
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopyUrl}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-[#444746] bg-white hover:bg-[#F1F3F4] border border-[#DADCE0] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {copiedLink ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-[#0D652D]" aria-hidden="true" />
                    Link Copied
                  </>
                ) : (
                  <>
                    <Link2 className="w-3.5 h-3.5" aria-hidden="true" />
                    Copy URL
                  </>
                )}
              </button>
            </div>
          </div>

          <div className="max-w-3xl">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5F6368] mb-3">
              <span className="text-[#1A73E8]">Legal Documentation</span>
              <span aria-hidden="true">·</span>
              <span>Effective {EFFECTIVE_DATE}</span>
              <span aria-hidden="true">·</span>
              <span>Truck Sim Nav (iOS &amp; iPadOS)</span>
            </div>

            <h1 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-[#1F1F1F]">
              {isPrivacy ? 'Privacy Policy' : 'Terms of Use'}
            </h1>

            <p className="mt-3 text-base text-[#444746] leading-relaxed">
              {isPrivacy
                ? 'How Truck Sim Nav protects your privacy with a local-first Wi-Fi telemetry architecture, zero user accounts, and transparent App Store data practices.'
                : 'License terms, simulation-only safety disclaimers, third-party trademark notices, and App Store usage conditions governing Truck Sim Nav.'}
            </p>
          </div>
        </div>
      </div>

      {/* Main Two-Column Legal Reading Layout */}
      <div className="max-w-[1200px] mx-auto px-6 py-12 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Sticky Table of Contents */}
          <aside className="lg:col-span-3 lg:sticky lg:top-24">
            <div className="rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-5">
              <h2 className="font-display text-xs font-semibold text-[#1F1F1F] mb-3">
                On this page
              </h2>
              <nav aria-label="Document sections" className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="flex items-baseline gap-2.5 py-1.5 text-xs text-[#444746] hover:text-[#1A73E8] transition-colors"
                  >
                    <span className="font-mono text-[11px] text-[#5F6368] tabular-nums shrink-0">
                      {section.number}.
                    </span>
                    <span>{section.title}</span>
                  </a>
                ))}
              </nav>
            </div>
          </aside>

          {/* Readable Legal Prose */}
          <article className="lg:col-span-9 max-w-[72ch]">
            {isPrivacy ? (
              <div className="rounded-xl border border-[#D3E3FD] bg-[#E8F0FE] p-5 mb-10 text-sm text-[#0B57D0] leading-relaxed">
                <strong className="font-semibold">Privacy Summary:</strong> Truck Sim Nav does not collect personal profiles, does not track your real-world GPS location, and streams Euro Truck Simulator 2 telemetry exclusively over your local Wi-Fi network.
              </div>
            ) : (
              <div className="rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-5 mb-10 text-sm text-[#1F1F1F] leading-relaxed">
                <strong className="font-semibold">Important Safety Notice:</strong> Truck Sim Nav is strictly a video game companion utility for Euro Truck Simulator 2. Never rely on this software for real-world driving or road navigation.
              </div>
            )}

            <div className="divide-y divide-[#DADCE0]">
              {sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="py-8 first:pt-0 scroll-mt-24"
                >
                  <h2 className="font-display text-xl font-semibold text-[#1F1F1F] flex items-baseline gap-2.5">
                    <span className="font-mono text-sm font-semibold text-[#1A73E8] tabular-nums">
                      {section.number}.
                    </span>
                    <span>{section.title}</span>
                  </h2>

                  <div className="mt-3.5 space-y-3.5 text-[15px] leading-[1.7] text-[#444746]">
                    {section.paragraphs.map((paragraph, idx) => (
                      <p key={idx}>{paragraph}</p>
                    ))}
                  </div>

                  {section.bullets && (
                    <ul className="mt-4 space-y-2.5 pl-5 list-disc text-[15px] leading-[1.65] text-[#444746]">
                      {section.bullets.map((bullet, idx) => (
                        <li key={idx}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
            </div>

            {/* Bottom Cross-Link Card */}
            <div className="mt-10 pt-8 border-t border-[#DADCE0] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="text-xs text-[#5F6368]">
                Direct URL path:{' '}
                <code className="font-mono text-[#1F1F1F] bg-[#F1F3F4] px-1.5 py-0.5 rounded">
                  {isPrivacy ? '/privacy' : '/terms'}
                </code>
              </div>
              <button
                type="button"
                onClick={() => onSwitchDoc(isPrivacy ? 'terms' : 'privacy')}
                className="inline-flex items-center justify-center px-4 py-2 text-xs font-medium text-[#1A73E8] bg-white hover:bg-[#F1F3F4] border border-[#DADCE0] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                {isPrivacy ? 'Read Terms of Use' : 'Read Privacy Policy'}
              </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  );
}
