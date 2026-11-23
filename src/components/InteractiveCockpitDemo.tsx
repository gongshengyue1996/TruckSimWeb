import { useEffect, useState } from 'react';
import { Volume2, Sun, Moon, Navigation, Fuel, Gauge, Route } from 'lucide-react';

type AppTheme = 'light' | 'dark';
type ScenarioId = 'highway' | 'intersection' | 'night_haul';
type SignalState = 'red' | 'amber' | 'green';

interface VoiceSample {
  code: string;
  label: string;
  langTag: string;
  phrase: string;
}

const VOICE_SAMPLES: VoiceSample[] = [
  {
    code: 'en',
    label: 'English',
    langTag: 'en-US',
    phrase: 'In 400 meters, keep right for Exit 14 toward Frankfurt Airport.',
  },
  {
    code: 'de',
    label: 'Deutsch',
    langTag: 'de-DE',
    phrase: 'In 400 Metern rechts halten, Ausfahrt 14 Richtung Frankfurt Flughafen.',
  },
  {
    code: 'fr',
    label: 'Français',
    langTag: 'fr-FR',
    phrase: 'Dans 400 mètres, serrez à droite vers la sortie 14, Aéroport de Francfort.',
  },
  {
    code: 'es',
    label: 'Español',
    langTag: 'es-ES',
    phrase: 'En 400 metros, manténgase a la derecha hacia la salida 14, Fráncfort.',
  },
  {
    code: 'zh',
    label: '中文',
    langTag: 'zh-CN',
    phrase: '前方400米靠右行驶，进入14号出口前往法兰克福机场。',
  },
  {
    code: 'ja',
    label: '日本語',
    langTag: 'ja-JP',
    phrase: '400メートル先、14番出口をフランクフルト空港方面へ右方向です。',
  },
];

interface ScenarioData {
  id: ScenarioId;
  label: string;
  roadName: string;
  nextTurn: string;
  distanceToTurn: string;
  speedKmh: number;
  speedLimit: number;
  gear: string;
  rpm: number;
  fuelLiters: number;
  fuelRangeKm: number;
  remainingDistanceKm: number;
  eta: string;
  initialSignal: SignalState;
  initialCountdown: number;
  activeLane: 1 | 2 | 3;
  recommendedLane: 1 | 2 | 3;
  aiVehicles: Array<{
    id: string;
    lane: 1 | 2 | 3;
    yPercent: number;
    type: 'Sedan' | 'Truck' | 'Van';
    distanceM: number;
  }>;
}

const SCENARIOS: Record<ScenarioId, ScenarioData> = {
  highway: {
    id: 'highway',
    label: 'Motorway Merge',
    roadName: 'A3 Autobahn · Frankfurt Corridor',
    nextTurn: 'Keep right at Exit 14 toward A5 South',
    distanceToTurn: '400 m',
    speedKmh: 84,
    speedLimit: 80,
    gear: 'A11',
    rpm: 1280,
    fuelLiters: 740,
    fuelRangeKm: 1380,
    remainingDistanceKm: 286,
    eta: '14:42',
    initialSignal: 'green',
    initialCountdown: 24,
    activeLane: 2,
    recommendedLane: 3,
    aiVehicles: [
      { id: 'v1', lane: 1, yPercent: 28, type: 'Sedan', distanceM: 38 },
      { id: 'v2', lane: 3, yPercent: 48, type: 'Truck', distanceM: 22 },
      { id: 'v3', lane: 2, yPercent: 18, type: 'Van', distanceM: 52 },
    ],
  },
  intersection: {
    id: 'intersection',
    label: 'Urban Signal',
    roadName: 'B8 Ringstraße · Nuremberg Terminal',
    nextTurn: 'Turn left onto Hafenstraße Logistics Gate',
    distanceToTurn: '120 m',
    speedKmh: 38,
    speedLimit: 50,
    gear: 'A6',
    rpm: 1050,
    fuelLiters: 510,
    fuelRangeKm: 940,
    remainingDistanceKm: 14,
    eta: '11:18',
    initialSignal: 'red',
    initialCountdown: 16,
    activeLane: 1,
    recommendedLane: 1,
    aiVehicles: [
      { id: 'v4', lane: 2, yPercent: 34, type: 'Sedan', distanceM: 14 },
      { id: 'v5', lane: 3, yPercent: 26, type: 'Truck', distanceM: 24 },
      { id: 'v6', lane: 1, yPercent: 22, type: 'Sedan', distanceM: 28 },
    ],
  },
  night_haul: {
    id: 'night_haul',
    label: 'Night Freight',
    roadName: 'E19 Motorway · Antwerp Port Approach',
    nextTurn: 'Merge left toward Quay 1740 Container Yard',
    distanceToTurn: '850 m',
    speedKmh: 78,
    speedLimit: 90,
    gear: 'A12',
    rpm: 1190,
    fuelLiters: 390,
    fuelRangeKm: 720,
    remainingDistanceKm: 94,
    eta: '23:15',
    initialSignal: 'amber',
    initialCountdown: 4,
    activeLane: 2,
    recommendedLane: 1,
    aiVehicles: [
      { id: 'v7', lane: 1, yPercent: 30, type: 'Van', distanceM: 31 },
      { id: 'v8', lane: 3, yPercent: 56, type: 'Sedan', distanceM: 16 },
    ],
  },
};

const SIGNAL_CYCLE: Record<SignalState, { next: SignalState; duration: number; label: string }> = {
  red: { next: 'green', duration: 24, label: 'Red Light' },
  green: { next: 'amber', duration: 4, label: 'Green Light' },
  amber: { next: 'red', duration: 16, label: 'Amber Caution' },
};

export function InteractiveCockpitDemo() {
  const [appTheme, setAppTheme] = useState<AppTheme>('light');
  const [scenarioId, setScenarioId] = useState<ScenarioId>('highway');
  const [signalState, setSignalState] = useState<SignalState>('green');
  const [countdown, setCountdown] = useState<number>(24);
  const [selectedLang, setSelectedLang] = useState<string>('en');
  const [voiceFeedback, setVoiceFeedback] = useState<string | null>(null);

  const scenario = SCENARIOS[scenarioId];
  const currentVoice = VOICE_SAMPLES.find((v) => v.code === selectedLang) ?? VOICE_SAMPLES[0];

  const handleSelectScenario = (id: ScenarioId) => {
    setScenarioId(id);
    const target = SCENARIOS[id];
    setSignalState(target.initialSignal);
    setCountdown(target.initialCountdown);
    if (id === 'night_haul') {
      setAppTheme('dark');
    } else if (id === 'highway') {
      setAppTheme('light');
    }
  };

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          const cycle = SIGNAL_CYCLE[signalState];
          setSignalState(cycle.next);
          return cycle.duration;
        }
        return prev - 1;
      });
    }, 1000);
    return () => window.clearInterval(timer);
  }, [signalState]);

  const handlePlayVoice = () => {
    setVoiceFeedback(currentVoice.phrase);
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      try {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(currentVoice.phrase);
        utterance.lang = currentVoice.langTag;
        utterance.rate = 0.98;
        window.speechSynthesis.speak(utterance);
      } catch {
        // Fallback visual transcript already displayed
      }
    }
  };

  const isDark = appTheme === 'dark';

  const signalBadgeStyles = (() => {
    if (signalState === 'red') {
      return isDark
        ? 'bg-[#3C1414] border-[#8C1D18] text-[#F2B8B5]'
        : 'bg-[#FCE8E6] border-[#F2B8B5] text-[#C5221F]';
    }
    if (signalState === 'amber') {
      return isDark
        ? 'bg-[#362608] border-[#8A5A00] text-[#FDE293]'
        : 'bg-[#FEF7E0] border-[#FCD475] text-[#B06000]';
    }
    return isDark
      ? 'bg-[#0F311D] border-[#1E6E3E] text-[#A8DAB5]'
      : 'bg-[#E6F4EA] border-[#A8DAB5] text-[#0D652D]';
  })();

  const signalDotColor =
    signalState === 'red'
      ? 'bg-[#D93025]'
      : signalState === 'amber'
        ? 'bg-[#F9AB00]'
        : 'bg-[#1E8E3E]';

  return (
    <section id="interactive-demo" className="py-20 bg-[#F8F9FA] border-y border-[#DADCE0]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div className="max-w-2xl">
            <p className="text-sm font-medium text-[#1A73E8] mb-2">
              02. Interactive Cockpit Preview
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1F1F1F] [text-wrap:balance]">
              Inspect 3D lane guidance, telemetry, and dark mode in real time
            </h2>
            <p className="text-[#444746] mt-3 text-base leading-relaxed">
              Switch driving scenarios, toggle the app&apos;s built-in Light and Dark cockpit appearance, observe live intersection signal countdowns, and audition multilingual turn-by-turn voice prompts.
            </p>
          </div>

          {/* Interactive controls bar */}
          <div className="flex flex-wrap items-center gap-3">
            <div
              role="group"
              aria-label="Driving scenario"
              className="inline-flex items-center p-1 bg-white border border-[#DADCE0] rounded-lg"
            >
              {(Object.keys(SCENARIOS) as ScenarioId[]).map((id) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => handleSelectScenario(id)}
                  className={`px-3.5 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                    scenarioId === id
                      ? 'bg-[#E8F0FE] text-[#0B57D0]'
                      : 'text-[#444746] hover:text-[#1F1F1F]'
                  }`}
                >
                  {SCENARIOS[id].label}
                </button>
              ))}
            </div>

            <div
              role="group"
              aria-label="Simulated app theme"
              className="inline-flex items-center p-1 bg-white border border-[#DADCE0] rounded-lg"
            >
              <button
                type="button"
                onClick={() => setAppTheme('light')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  !isDark ? 'bg-[#1A73E8] text-white' : 'text-[#444746] hover:text-[#1F1F1F]'
                }`}
              >
                <Sun className="w-3.5 h-3.5" aria-hidden="true" />
                App Light
              </button>
              <button
                type="button"
                onClick={() => setAppTheme('dark')}
                className={`inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer ${
                  isDark ? 'bg-[#1F1F1F] text-white' : 'text-[#444746] hover:text-[#1F1F1F]'
                }`}
              >
                <Moon className="w-3.5 h-3.5" aria-hidden="true" />
                App Dark
              </button>
            </div>
          </div>
        </div>

        {/* Simulated iPadOS Landscape Cockpit Frame */}
        <div
          className={`rounded-2xl border p-4 sm:p-6 transition-colors duration-200 material-elevation-1 ${
            isDark
              ? 'bg-[#111317] border-[#2D3139] text-[#F1F3F4]'
              : 'bg-white border-[#DADCE0] text-[#1F1F1F]'
          }`}
        >
          {/* Top Navigation Instruction Strip inside simulated app */}
          <div
            className={`rounded-xl border p-4 flex flex-col md:flex-row md:items-center justify-between gap-4 mb-5 transition-colors duration-200 ${
              isDark ? 'bg-[#1B1F27] border-[#2D3139]' : 'bg-[#F8F9FA] border-[#DADCE0]'
            }`}
          >
            <div className="flex items-start sm:items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-[#1A73E8] text-white flex items-center justify-center shrink-0">
                <Navigation className="w-6 h-6" aria-hidden="true" />
              </div>
              <div>
                <div className="flex items-center gap-2 text-xs font-medium">
                  <span className={isDark ? 'text-[#8AB4F8]' : 'text-[#1A73E8]'}>
                    Next Maneuver in {scenario.distanceToTurn}
                  </span>
                  <span aria-hidden="true" className={isDark ? 'text-[#5F6368]' : 'text-[#9AA0A6]'}>
                    ·
                  </span>
                  <span className={isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}>
                    {scenario.roadName}
                  </span>
                </div>
                <p className="font-display text-lg sm:text-xl font-semibold mt-0.5">
                  {scenario.nextTurn}
                </p>
              </div>
            </div>

            {/* Traffic Light State & Live Countdown */}
            <div className="flex items-center gap-3 self-start md:self-center shrink-0">
              <div
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl border ${signalBadgeStyles}`}
                aria-live="polite"
              >
                <div className={`w-3.5 h-3.5 rounded-full ${signalDotColor}`} aria-hidden="true" />
                <div>
                  <div className="text-xs font-medium leading-none">
                    {SIGNAL_CYCLE[signalState].label}
                  </div>
                  <div className="font-mono text-lg font-semibold tabular-nums leading-tight mt-0.5">
                    {String(countdown).padStart(2, '0')}s
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Main Cockpit Split: 3D Surrounding Awareness + Telemetry Panel */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-stretch">
            {/* 3D Environmental Awareness & Lane Guidance Viewport */}
            <div
              className={`lg:col-span-8 rounded-xl border p-5 flex flex-col justify-between min-h-[340px] relative overflow-hidden ${
                isDark ? 'bg-[#161920] border-[#2D3139]' : 'bg-[#F1F3F4] border-[#DADCE0]'
              }`}
            >
              <div className="flex items-center justify-between gap-4 z-10">
                <div>
                  <span className="text-xs font-medium">3D Traffic &amp; Lane Perception</span>
                  <div className={`text-xs mt-0.5 ${isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>
                    Recommended Lane {scenario.recommendedLane} of 3 · {scenario.aiVehicles.length} AI vehicles tracked
                  </div>
                </div>
                <div className="flex items-center gap-2 text-xs font-mono tabular-nums">
                  <span className={isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}>Speed Limit</span>
                  <span
                    className={`inline-flex items-center justify-center w-8 h-8 rounded-full border-2 font-semibold ${
                      isDark
                        ? 'border-[#F28B82] bg-[#1B1F27] text-white'
                        : 'border-[#D93025] bg-white text-[#1F1F1F]'
                    }`}
                  >
                    {scenario.speedLimit}
                  </span>
                </div>
              </div>

              {/* Clean Perspective 3D SVG Roadway & AI Vehicles */}
              <div className="my-4 flex-1 flex items-center justify-center">
                <svg
                  viewBox="0 0 640 240"
                  className="w-full h-auto max-h-[240px]"
                  role="img"
                  aria-label="3D highway lane-level navigation and surrounding AI traffic vehicles"
                >
                  {/* Perspective Road Surface */}
                  <polygon
                    points="220,20 420,20 590,230 50,230"
                    fill={isDark ? '#242933' : '#3C4043'}
                  />
                  {/* Road Shoulders */}
                  <line x1="220" y1="20" x2="50" y2="230" stroke={isDark ? '#5F6368' : '#DADCE0'} strokeWidth="3" />
                  <line x1="420" y1="20" x2="590" y2="230" stroke={isDark ? '#5F6368' : '#DADCE0'} strokeWidth="3" />

                  {/* Lane Divider 1 (between lane 1 & 2) */}
                  <line
                    x1="286"
                    y1="20"
                    x2="230"
                    y2="230"
                    stroke="#9AA0A6"
                    strokeWidth="2.5"
                    strokeDasharray="14 14"
                  />
                  {/* Lane Divider 2 (between lane 2 & 3) */}
                  <line
                    x1="354"
                    y1="20"
                    x2="410"
                    y2="230"
                    stroke="#9AA0A6"
                    strokeWidth="2.5"
                    strokeDasharray="14 14"
                  />

                  {/* Highlighted Target Navigation Lane Corridor */}
                  {scenario.recommendedLane === 1 && (
                    <polygon points="222,20 284,20 228,230 54,230" fill="#1A73E8" fillOpacity="0.28" />
                  )}
                  {scenario.recommendedLane === 2 && (
                    <polygon points="288,20 352,20 408,230 232,230" fill="#1A73E8" fillOpacity="0.28" />
                  )}
                  {scenario.recommendedLane === 3 && (
                    <polygon points="356,20 418,20 586,230 412,230" fill="#1A73E8" fillOpacity="0.28" />
                  )}

                  {/* Active Route Guidance Line */}
                  {scenario.recommendedLane === 3 && (
                    <polyline
                      points="320,210 350,155 425,90 390,26"
                      fill="none"
                      stroke="#4285F4"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {scenario.recommendedLane === 1 && (
                    <polyline
                      points="155,210 190,130 248,26"
                      fill="none"
                      stroke="#4285F4"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}
                  {scenario.recommendedLane === 2 && (
                    <polyline
                      points="320,210 320,120 320,26"
                      fill="none"
                      stroke="#4285F4"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  )}

                  {/* AI Traffic Vehicles */}
                  {scenario.aiVehicles.map((vehicle) => {
                    const t = vehicle.yPercent / 100;
                    const scale = 0.55 + t * 0.55;
                    const laneStartX = vehicle.lane === 1 ? 253 : vehicle.lane === 2 ? 320 : 387;
                    const laneEndX = vehicle.lane === 1 ? 140 : vehicle.lane === 2 ? 320 : 500;
                    const cx = laneStartX + (laneEndX - laneStartX) * t;
                    const cy = 24 + t * 185;
                    const w = (vehicle.type === 'Truck' ? 46 : 36) * scale;
                    const h = (vehicle.type === 'Truck' ? 32 : 22) * scale;

                    return (
                      <g key={vehicle.id}>
                        <rect
                          x={cx - w / 2}
                          y={cy - h / 2}
                          width={w}
                          height={h}
                          rx={4}
                          fill={vehicle.type === 'Truck' ? '#E8EAED' : '#FFFFFF'}
                          stroke="#5F6368"
                          strokeWidth="1.5"
                        />
                        <rect
                          x={cx - w / 2 + 3}
                          y={cy + h / 2 - 4}
                          width={6 * scale}
                          height={2.5}
                          fill="#D93025"
                        />
                        <rect
                          x={cx + w / 2 - 3 - 6 * scale}
                          y={cy + h / 2 - 4}
                          width={6 * scale}
                          height={2.5}
                          fill="#D93025"
                        />
                        <text
                          x={cx}
                          y={cy - h / 2 - 5}
                          textAnchor="middle"
                          fontSize="10"
                          fontFamily="JetBrains Mono, monospace"
                          fill="#E8EAED"
                        >
                          {vehicle.type} · {vehicle.distanceM}m
                        </text>
                      </g>
                    );
                  })}

                  {/* Player Ego Truck Marker */}
                  <g>
                    <rect
                      x={scenario.activeLane === 1 ? 118 : scenario.activeLane === 2 ? 294 : 470}
                      y={184}
                      width={52}
                      height={36}
                      rx={6}
                      fill="#1A73E8"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                    />
                    <polygon
                      points={
                        scenario.activeLane === 1
                          ? '144,174 134,188 154,188'
                          : scenario.activeLane === 2
                            ? '320,174 310,188 330,188'
                            : '496,174 486,188 506,188'
                      }
                      fill="#FFFFFF"
                    />
                  </g>
                </svg>
              </div>

              {/* Lane Indicator Footer */}
              <div
                className={`flex items-center justify-between text-xs pt-2 border-t ${
                  isDark ? 'border-[#2D3139]' : 'border-[#DADCE0]'
                }`}
              >
                <div className="flex items-center gap-4">
                  {[1, 2, 3].map((laneNum) => {
                    const isRecommended = scenario.recommendedLane === laneNum;
                    return (
                      <span
                        key={laneNum}
                        className={`font-medium ${
                          isRecommended
                            ? isDark
                              ? 'text-[#8AB4F8]'
                              : 'text-[#1A73E8]'
                            : isDark
                              ? 'text-[#9AA0A6]'
                              : 'text-[#5F6368]'
                        }`}
                      >
                        Lane {laneNum}
                        {isRecommended ? ' (Active Route)' : ''}
                      </span>
                    );
                  })}
                </div>
                <span className={`font-mono tabular-nums ${isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>
                  60 Hz Metal View
                </span>
              </div>
            </div>

            {/* Live Telemetry Side Panel */}
            <div className="lg:col-span-4 flex flex-col justify-between gap-4">
              <div
                className={`rounded-xl border p-5 ${
                  isDark ? 'bg-[#1B1F27] border-[#2D3139]' : 'bg-[#F8F9FA] border-[#DADCE0]'
                }`}
              >
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-xs font-medium ${isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>
                    Real-Time Telemetry
                  </span>
                  <Gauge className={`w-4 h-4 ${isDark ? 'text-[#8AB4F8]' : 'text-[#1A73E8]'}`} aria-hidden="true" />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <div className={`text-xs ${isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>Current Speed</div>
                    <div className="font-mono text-3xl font-semibold tabular-nums mt-0.5">
                      {scenario.speedKmh}
                      <span className="text-sm font-normal ml-1">km/h</span>
                    </div>
                  </div>
                  <div>
                    <div className={`text-xs ${isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>Transmission</div>
                    <div className="font-mono text-3xl font-semibold tabular-nums mt-0.5">
                      {scenario.gear}
                    </div>
                    <div className={`font-mono text-xs tabular-nums ${isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>
                      {scenario.rpm} RPM
                    </div>
                  </div>
                </div>

                <div
                  className={`mt-5 pt-4 border-t grid grid-cols-2 gap-4 ${
                    isDark ? 'border-[#2D3139]' : 'border-[#DADCE0]'
                  }`}
                >
                  <div>
                    <div className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>
                      <Fuel className="w-3.5 h-3.5" aria-hidden="true" />
                      Fuel &amp; Range
                    </div>
                    <div className="font-mono text-base font-semibold tabular-nums mt-1">
                      {scenario.fuelLiters} L
                    </div>
                    <div className={`font-mono text-xs tabular-nums ${isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>
                      {scenario.fuelRangeKm} km est.
                    </div>
                  </div>
                  <div>
                    <div className={`flex items-center gap-1.5 text-xs ${isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>
                      <Route className="w-3.5 h-3.5" aria-hidden="true" />
                      Remaining Trip
                    </div>
                    <div className="font-mono text-base font-semibold tabular-nums mt-1">
                      {scenario.remainingDistanceKm} km
                    </div>
                    <div className={`font-mono text-xs tabular-nums ${isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>
                      ETA {scenario.eta}
                    </div>
                  </div>
                </div>
              </div>

              {/* Multilingual Voice Broadcast Module */}
              <div
                className={`rounded-xl border p-5 flex-1 flex flex-col justify-between ${
                  isDark ? 'bg-[#1B1F27] border-[#2D3139]' : 'bg-[#F8F9FA] border-[#DADCE0]'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs font-medium ${isDark ? 'text-[#9AA0A6]' : 'text-[#5F6368]'}`}>
                      Multilingual Voice Guidance
                    </span>
                    <Volume2 className={`w-4 h-4 ${isDark ? 'text-[#8AB4F8]' : 'text-[#1A73E8]'}`} aria-hidden="true" />
                  </div>

                  <div className="grid grid-cols-3 gap-1.5 mb-3">
                    {VOICE_SAMPLES.map((sample) => (
                      <button
                        key={sample.code}
                        type="button"
                        onClick={() => {
                          setSelectedLang(sample.code);
                          setVoiceFeedback(null);
                        }}
                        className={`px-2.5 py-1.5 text-xs font-medium rounded-md border transition-colors duration-150 whitespace-nowrap truncate cursor-pointer ${
                          selectedLang === sample.code
                            ? 'bg-[#1A73E8] border-[#1A73E8] text-white'
                            : isDark
                              ? 'bg-[#161920] border-[#2D3139] text-[#E8EAED] hover:border-[#5F6368]'
                              : 'bg-white border-[#DADCE0] text-[#444746] hover:text-[#1F1F1F]'
                        }`}
                      >
                        {sample.label}
                      </button>
                    ))}
                  </div>

                  <p className={`text-xs leading-relaxed ${isDark ? 'text-[#C4C7C5]' : 'text-[#444746]'}`}>
                    &ldquo;{currentVoice.phrase}&rdquo;
                  </p>
                </div>

                <div className="mt-4">
                  <button
                    type="button"
                    onClick={handlePlayVoice}
                    className={`w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium rounded-lg border transition-colors duration-150 cursor-pointer ${
                      isDark
                        ? 'bg-[#161920] border-[#8AB4F8] text-[#8AB4F8] hover:bg-[#1F2937]'
                        : 'bg-white border-[#1A73E8] text-[#1A73E8] hover:bg-[#E8F0FE]'
                    }`}
                  >
                    <Volume2 className="w-4 h-4" aria-hidden="true" />
                    Play Voice Sample ({currentVoice.label})
                  </button>
                  {voiceFeedback && (
                    <p
                      role="status"
                      className={`text-xs mt-2 text-center ${
                        isDark ? 'text-[#8AB4F8]' : 'text-[#0B57D0]'
                      }`}
                    >
                      Audio guidance dispatched in {currentVoice.label}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
