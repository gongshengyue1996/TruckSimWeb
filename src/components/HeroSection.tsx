import { ArrowRight, BookOpen, Download, Monitor } from 'lucide-react';
import { ResilientImage } from './ResilientImage';
import {
  DESKTOP_SERVER_DOWNLOAD_URL,
  DESKTOP_SERVER_VERSION,
} from '../constants/downloads';

interface HeroSectionProps {
  onOpenDownload: () => void;
  onOpenDocs: () => void;
}

const KEY_SPECS = [
  {
    value: '60 Hz',
    label: '3D Metal Refresh Rate',
    detail: 'Smooth lane & AI vehicle tracking',
  },
  {
    value: '< 15 ms',
    label: 'Local LAN Latency',
    detail: 'Direct PC-to-iOS telemetry link',
  },
  {
    value: '12+ Languages',
    label: 'Voice Navigation Packs',
    detail: 'Clear turn-by-turn audio cues',
  },
  {
    value: 'iOS & iPadOS',
    label: 'Native Apple Client',
    detail: 'Requires Windows Desktop Server',
  },
];

export function HeroSection({ onOpenDownload, onOpenDocs }: HeroSectionProps) {
  return (
    <section className="pt-12 pb-16 lg:pt-16 lg:pb-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-stretch">
          {/* Left Column: Value Proposition & Primary Action */}
          <div className="lg:col-span-6 flex flex-col justify-between py-2">
            <div>
              <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#5F6368] mb-5">
                <span className="text-[#1A73E8]">Euro Truck Simulator 2 Companion</span>
                <span aria-hidden="true">·</span>
                <span>iPhone &amp; iPad (iOS Only)</span>
                <span aria-hidden="true">·</span>
                <span>Windows Desktop Server</span>
              </div>

              <h1 className="font-display text-[clamp(2.25rem,4vw,3.35rem)] font-bold tracking-tight leading-[1.12] text-[#1F1F1F] [text-wrap:balance]">
                Precision GPS Navigation and 3D Telemetry for Your Cockpit
              </h1>

              <p className="mt-5 text-base sm:text-[17px] leading-relaxed text-[#444746] max-w-xl">
                Truck Sim Nav turns your iPhone or iPad into a dedicated commercial navigation unit for Euro Truck Simulator 2. Pair the iOS app with our free Windows Desktop Server to stream real-time speed, fuel range, traffic light countdowns, 3D AI vehicle awareness, lane-level routing, and multilingual voice guidance over local Wi-Fi.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3.5">
                <button
                  type="button"
                  onClick={onOpenDownload}
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#0B57D0] active:bg-[#0842A0] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8]"
                >
                  <Download className="w-4 h-4" aria-hidden="true" />
                  Download for iOS
                </button>

                <a
                  href={DESKTOP_SERVER_DOWNLOAD_URL}
                  download
                  className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium text-[#1A73E8] bg-white hover:bg-[#F1F3F4] border border-[#DADCE0] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8]"
                >
                  <Monitor className="w-4 h-4" aria-hidden="true" />
                  Download PC Server ({DESKTOP_SERVER_VERSION})
                </a>
              </div>

              <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-[#5F6368]">
                <button
                  type="button"
                  onClick={onOpenDocs}
                  className="inline-flex items-center gap-1.5 font-medium text-[#444746] hover:text-[#1A73E8] transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
                  Read Setup &amp; Server Guide
                </button>
                <span aria-hidden="true">·</span>
                <span>Required: Install Truck Sim Nav Server on your Windows gaming PC</span>
              </div>
            </div>

            <div className="mt-10 pt-6 border-t border-[#DADCE0] flex flex-wrap items-center justify-between gap-4 text-xs text-[#5F6368]">
              <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
                <span>iOS 16.0 / iPadOS 16.0+</span>
                <span aria-hidden="true">·</span>
                <span>Windows 10/11 64-bit Server</span>
                <span aria-hidden="true">·</span>
                <span>Zero Cloud Account Required</span>
              </div>
              <a
                href="#interactive-demo"
                className="inline-flex items-center gap-1 font-medium text-[#1A73E8] hover:text-[#0B57D0] whitespace-nowrap shrink-0"
              >
                Try interactive preview
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            </div>
          </div>

          {/* Right Column: Dominant Hardware Focal Visual */}
          <div className="lg:col-span-6 flex">
            <div className="w-full rounded-2xl border border-[#DADCE0] bg-[#F8F9FA] overflow-hidden material-elevation-1 flex flex-col">
              <div className="relative flex-1 min-h-[280px] sm:min-h-[360px]">
                <ResilientImage
                  src="/src/assets/images/hero_cockpit_ipad_1795425607408.jpg"
                  alt="iPad Pro mounted beside a simulation steering wheel running Truck Sim Nav 3D lane-level GPS navigation"
                  title="Truck Sim Nav iPad Cockpit Display"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="px-5 py-3.5 bg-white border-t border-[#DADCE0] flex items-center justify-between gap-4 text-xs text-[#5F6368]">
                <span className="font-medium text-[#1F1F1F]">
                  iPadOS Landscape &amp; Portrait Support
                </span>
                <span className="font-mono tabular-nums whitespace-nowrap shrink-0">
                  ETS2 Telemetry Bridge Ready
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Full-Width 4-Column Specification Strip */}
        <div className="mt-12 rounded-xl border border-[#DADCE0] bg-[#F8F9FA] grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y sm:divide-y-0 sm:divide-x divide-[#DADCE0]">
          {KEY_SPECS.map((spec) => (
            <div key={spec.label} className="p-6">
              <div className="font-display text-2xl font-bold text-[#1F1F1F] tabular-nums">
                {spec.value}
              </div>
              <div className="text-sm font-medium text-[#1F1F1F] mt-1">{spec.label}</div>
              <div className="text-xs text-[#5F6368] mt-0.5">{spec.detail}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
