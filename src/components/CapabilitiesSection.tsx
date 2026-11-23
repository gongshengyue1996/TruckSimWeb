import { Check, Moon, Sun } from 'lucide-react';
import { ResilientImage } from './ResilientImage';

interface CapabilitiesSectionProps {
  onOpenDocs: (tab?: string) => void;
}

export function CapabilitiesSection({ onOpenDocs }: CapabilitiesSectionProps) {
  return (
    <section id="capabilities" className="py-20 bg-white">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="max-w-2xl mb-12">
          <p className="text-sm font-medium text-[#1A73E8] mb-2">
            01. Core Capabilities
          </p>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1F1F1F] [text-wrap:balance]">
            Engineered for distraction-free highway awareness and route discipline
          </h2>
          <p className="text-[#444746] mt-3 text-base leading-relaxed">
            Every telemetry panel, lane corridor, and voice prompt is designed to keep your primary simulation monitor uncluttered while delivering commercial-grade navigation precision on iOS.
          </p>
        </div>

        {/* Asymmetric Material Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Card 1: 3D Surrounding Environment Awareness & Lane-Level Navigation (7 cols) */}
          <article className="lg:col-span-7 rounded-2xl border border-[#DADCE0] bg-white overflow-hidden flex flex-col">
            <div className="aspect-[16/10] bg-[#F1F3F4] border-b border-[#DADCE0] overflow-hidden">
              <ResilientImage
                src="/src/assets/images/feature_3d_awareness_1795425605906.jpg"
                alt="iPhone displaying 3D surrounding AI vehicles, highway lane-level guidance, and red traffic light countdown"
                title="3D Surrounding Awareness"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-[#5F6368] mb-2">
                  Spatial Perception · Lane-Level Guidance
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1F1F1F]">
                  3D Environment Awareness &amp; AI Traffic Tracking
                </h3>
                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#444746]">
                  Visualize surrounding AI passenger cars, vans, and heavy trucks in a real-time 3D perspective corridor. Dynamic lane-level guidance highlights the exact lane required for complex motorway interchanges, toll plazas, and urban junctions well before your turn.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#DADCE0] grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#444746]">
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Real-time relative position and distance of adjacent AI vehicles</span>
                </div>
                <div className="flex items-start gap-2">
                  <Check className="w-4 h-4 text-[#1A73E8] shrink-0 mt-0.5" aria-hidden="true" />
                  <span>Lane-by-lane exit arrows synchronized with ETS2 route nodes</span>
                </div>
              </div>
            </div>
          </article>

          {/* Card 2: Traffic Signal Display & Countdown (5 cols) */}
          <article className="lg:col-span-5 rounded-2xl border border-[#DADCE0] bg-[#F8F9FA] p-6 sm:p-8 flex flex-col justify-between">
            <div>
              <p className="text-xs font-medium text-[#5F6368] mb-2">
                Intersection Timing · Braking Anticipation
              </p>
              <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1F1F1F]">
                Traffic Light Display &amp; Live Countdown
              </h3>
              <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#444746]">
                Heavy 40-ton combinations require early deceleration planning. Truck Sim Nav surfaces upcoming signal phases with an exact second-by-second countdown so you can coast smoothly into intersections and avoid costly red-light violations.
              </p>

              {/* Flat Material Signal Phase Breakdown Diagram (Accessible: Color + Label + Timing) */}
              <div className="mt-7 space-y-3">
                <div className="rounded-xl bg-white border border-[#DADCE0] p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-[#D93025] shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-sm font-semibold text-[#1F1F1F]">Stop Phase (Red)</div>
                      <div className="text-xs text-[#5F6368]">Engine brake &amp; retarder advisory</div>
                    </div>
                  </div>
                  <span className="font-mono text-base font-semibold text-[#C5221F] tabular-nums">
                    18 s
                  </span>
                </div>

                <div className="rounded-xl bg-white border border-[#DADCE0] p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-[#F9AB00] shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-sm font-semibold text-[#1F1F1F]">Transition Phase (Amber)</div>
                      <div className="text-xs text-[#5F6368]">Prepare to clear or halt safely</div>
                    </div>
                  </div>
                  <span className="font-mono text-base font-semibold text-[#B06000] tabular-nums">
                    04 s
                  </span>
                </div>

                <div className="rounded-xl bg-white border border-[#DADCE0] p-4 flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <span className="w-4 h-4 rounded-full bg-[#1E8E3E] shrink-0" aria-hidden="true" />
                    <div>
                      <div className="text-sm font-semibold text-[#1F1F1F]">Proceed Phase (Green)</div>
                      <div className="text-xs text-[#5F6368]">Maintain cruise speed through junction</div>
                    </div>
                  </div>
                  <span className="font-mono text-base font-semibold text-[#0D652D] tabular-nums">
                    24 s
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-5 border-t border-[#DADCE0] flex items-center justify-between text-xs">
              <span className="text-[#5F6368]">Automatic intersection range detection</span>
              <button
                type="button"
                onClick={() => onOpenDocs('signals')}
                className="font-medium text-[#1A73E8] hover:text-[#0B57D0] cursor-pointer whitespace-nowrap shrink-0"
              >
                How signal sync works
              </button>
            </div>
          </article>

          {/* Card 3: Multilingual Voice Broadcast (5 cols) */}
          <article className="lg:col-span-5 rounded-2xl border border-[#DADCE0] bg-white overflow-hidden flex flex-col">
            <div className="aspect-[16/10] bg-[#F1F3F4] border-b border-[#DADCE0] overflow-hidden">
              <ResilientImage
                src="/src/assets/images/feature_voice_setup_1795425606039.jpg"
                alt="Desk workstation showing an iPad on a stand running turn-by-turn navigation below an ultrawide ETS2 monitor"
                title="Workstation Navigation & Voice Setup"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-[#5F6368] mb-2">
                  Spoken Alerts · 12+ Languages
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1F1F1F]">
                  Multilingual Turn-by-Turn Voice Guidance
                </h3>
                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#444746]">
                  Keep your eyes on the road with timely spoken directions for highway merges, roundabout exits, speed limit changes, and upcoming traffic signals. Supports English, German, French, Spanish, Italian, Polish, Dutch, Russian, Chinese, Japanese, and more.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#DADCE0] text-xs text-[#5F6368]">
                <span>Independent iOS audio routing</span>
                <span aria-hidden="true" className="mx-2">·</span>
                <span>Adjustable lead distance (200 m – 1,000 m)</span>
              </div>
            </div>
          </article>

          {/* Card 4: Live Telemetry & Adaptive Dark Mode (7 cols) */}
          <article className="lg:col-span-7 rounded-2xl border border-[#DADCE0] bg-white overflow-hidden flex flex-col">
            <div className="aspect-[16/10] bg-[#F1F3F4] border-b border-[#DADCE0] overflow-hidden">
              <ResilientImage
                src="/src/assets/images/feature_telemetry_cockpit_1795425606570.jpg"
                alt="iPad in Light Day Mode and iPhone in Dark Night Mode showing real-time speed, fuel range, and ETA telemetry"
                title="Real-Time Telemetry & Dark Mode"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
              <div>
                <p className="text-xs font-medium text-[#5F6368] mb-2">
                  Vehicle Telemetry · Day &amp; Night Themes
                </p>
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#1F1F1F]">
                  Live Telemetry Instrumentation &amp; Dark Mode
                </h3>
                <p className="mt-3 text-sm sm:text-[15px] leading-relaxed text-[#444746]">
                  Track live truck speed, active gear, remaining fuel volume, estimated range, remaining trip mileage, and arrival time in crisp tabular numerals. Switch manually or automatically to high-contrast Dark Mode during evening runs to eliminate cockpit screen glare.
                </p>
              </div>

              <div className="mt-6 pt-5 border-t border-[#DADCE0] grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center shrink-0">
                    <Sun className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1F1F1F]">Daylight Legibility</div>
                    <div className="text-xs text-[#5F6368] mt-0.5">
                      High-contrast neutral canvas optimized for bright rooms
                    </div>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#F1F3F4] text-[#1F1F1F] flex items-center justify-center shrink-0">
                    <Moon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <div className="text-xs font-semibold text-[#1F1F1F]">Night Haul Dark Mode</div>
                    <div className="text-xs text-[#5F6368] mt-0.5">
                      Subdued slate surfaces preserving low-light focus
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
