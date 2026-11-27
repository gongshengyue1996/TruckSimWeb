import { BookOpen, Download } from 'lucide-react';
import {
  DESKTOP_SERVER_DOWNLOAD_URL,
  DESKTOP_SERVER_FILENAME,
  DESKTOP_SERVER_VERSION,
} from '../constants/downloads';

interface SpecsAndSetupSectionProps {
  onOpenDocs: (tab?: string) => void;
  onOpenDownload: () => void;
}

const SETUP_STEPS = [
  {
    number: '01',
    title: 'Install Truck Sim Nav Server on Your Windows PC',
    description:
      'Download and run TruckSimNavServer-Setup-v1.0.0.exe on the PC where Euro Truck Simulator 2 is installed. The setup wizard configures the ETS2 telemetry plugin and installs the local desktop server automatically.',
  },
  {
    number: '02',
    title: 'Launch the Desktop Server & ETS2 Together',
    description:
      'Start Truck Sim Nav Server on your PC (it runs quietly in the background), launch Euro Truck Simulator 2, and approve the standard SDK telemetry prompt.',
  },
  {
    number: '03',
    title: 'Connect iPhone or iPad Over Local Wi-Fi',
    description:
      'Open Truck Sim Nav on your iOS device connected to the same Wi-Fi network. It discovers your PC automatically—choose your voice language and Light or Dark mode, and start driving.',
  },
];

const SPEC_ROWS = [
  {
    category: 'Mobile Client Platform',
    detail: 'iOS 16.0+ (iPhone) and iPadOS 16.0+ (iPad) — Currently iOS exclusive',
  },
  {
    category: 'Desktop Server (Required)',
    detail: `Truck Sim Nav Server ${DESKTOP_SERVER_VERSION} for Windows 10 / 11 (64-bit) — ${DESKTOP_SERVER_FILENAME}`,
  },
  {
    category: 'Simulator Support',
    detail: 'Euro Truck Simulator 2 (64-bit Windows, v1.48 through v1.53+)',
  },
  {
    category: 'Navigation & Routing',
    detail: 'Real-time GPS map, turn-by-turn lane corridor, remaining distance & ETA',
  },
  {
    category: '3D Traffic Awareness',
    detail: 'Metal-rendered 3D surrounding roadway displaying nearby AI cars, vans, and trucks',
  },
  {
    category: 'Traffic Signal System',
    detail: 'Upcoming red/amber/green phase indicator with live second-by-second countdown',
  },
  {
    category: 'Live Telemetry Metrics',
    detail: 'Current speed, road speed limit, fuel level, estimated fuel range, gear & RPM',
  },
  {
    category: 'Voice Guidance',
    detail: 'Multilingual speech synthesis across 12+ European and Asian languages',
  },
  {
    category: 'Appearance & Ergonomics',
    detail: 'Day Light Mode and Night Dark Mode; portrait & landscape cockpit layouts',
  },
  {
    category: 'Network Architecture',
    detail: 'Local LAN telemetry stream (< 15 ms latency); no internet or external servers required',
  },
];

export function SpecsAndSetupSection({ onOpenDocs }: SpecsAndSetupSectionProps) {
  return (
    <section id="specifications" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: 3-Step Deployment Guide */}
          <div className="lg:col-span-5">
            <p className="text-sm font-medium text-[#1A73E8] mb-2">
              03. Deployment &amp; Specifications
            </p>
            <h2 className="font-display text-3xl font-semibold tracking-tight text-[#1F1F1F] [text-wrap:balance]">
              Two-part local setup ready in under three minutes
            </h2>
            <p className="text-[#444746] mt-3 text-base leading-relaxed">
              Truck Sim Nav uses a lightweight Windows Desktop Server on your gaming PC to stream live telemetry directly to your iPhone or iPad over local Wi-Fi—with no cloud servers, no account sign-in, and minimal CPU overhead.
            </p>

            <ol className="mt-8 space-y-6">
              {SETUP_STEPS.map((step) => (
                <li key={step.number} className="flex items-start gap-4">
                  <span className="font-mono text-sm font-semibold text-[#1A73E8] bg-[#E8F0FE] w-9 h-9 rounded-lg flex items-center justify-center shrink-0 tabular-nums">
                    {step.number}
                  </span>
                  <div>
                    <h3 className="font-display text-base font-semibold text-[#1F1F1F]">
                      {step.title}
                    </h3>
                    <p className="text-sm text-[#444746] leading-relaxed mt-1">
                      {step.description}
                    </p>
                  </div>
                </li>
              ))}
            </ol>

            <div className="mt-8 pt-6 border-t border-[#DADCE0] flex flex-wrap items-center gap-3">
              <a
                href={DESKTOP_SERVER_DOWNLOAD_URL}
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#0B57D0] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download PC Server ({DESKTOP_SERVER_VERSION})
              </a>
              <button
                type="button"
                onClick={() => onOpenDocs('setup')}
                className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-[#1A73E8] bg-white hover:bg-[#F1F3F4] border border-[#DADCE0] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                Open Full Setup Manual
              </button>
            </div>
          </div>

          {/* Right Column: Structured Material Technical Spec Sheet */}
          <div className="lg:col-span-7">
            <div className="rounded-2xl border border-[#DADCE0] bg-white overflow-hidden">
              <div className="px-6 py-4 bg-[#F8F9FA] border-b border-[#DADCE0] flex items-center justify-between gap-4">
                <h3 className="font-display text-base font-semibold text-[#1F1F1F]">
                  Technical Specifications
                </h3>
                <span className="text-xs font-medium text-[#5F6368]">
                  iOS &amp; iPadOS Release
                </span>
              </div>

              <div className="divide-y divide-[#DADCE0]">
                {SPEC_ROWS.map((row) => (
                  <div
                    key={row.category}
                    className="px-6 py-4 grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 text-sm"
                  >
                    <div className="sm:col-span-4 font-medium text-[#1F1F1F]">
                      {row.category}
                    </div>
                    <div className="sm:col-span-8 text-[#444746] leading-relaxed">
                      {row.detail}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
