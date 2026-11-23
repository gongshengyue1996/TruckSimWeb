import { useEffect, useState } from 'react';
import { Check, Copy, X } from 'lucide-react';

interface DocumentationModalProps {
  open: boolean;
  initialTab?: string;
  onClose: () => void;
  onOpenDownload: () => void;
}

interface DocTab {
  id: string;
  label: string;
  title: string;
  summary: string;
}

const DOC_TABS: DocTab[] = [
  {
    id: 'overview',
    label: 'Overview',
    title: 'Product Overview & System Requirements',
    summary: 'Core architecture, supported Euro Truck Simulator 2 versions, and iOS hardware recommendations.',
  },
  {
    id: 'setup',
    label: 'PC Bridge Setup',
    title: 'PC Telemetry Bridge & Wi-Fi Pairing',
    summary: 'Step-by-step instructions to install the 64-bit ETS2 SDK telemetry plugin and pair your iPhone or iPad.',
  },
  {
    id: 'perception',
    label: '3D & Lane Guidance',
    title: '3D Surrounding Awareness & Lane-Level Routing',
    summary: 'How AI vehicle tracking, corridor projection, and motorway interchange arrows operate during active jobs.',
  },
  {
    id: 'signals',
    label: 'Traffic Signals',
    title: 'Traffic Light Display & Live Countdown',
    summary: 'Understanding intersection phase synchronization, detection range, and deceleration guidance.',
  },
  {
    id: 'voice',
    label: 'Voice & Dark Mode',
    title: 'Multilingual Voice Guidance & Display Themes',
    summary: 'Configuring spoken route prompts across 12+ languages and automating Day/Night theme transitions.',
  },
  {
    id: 'faq',
    label: 'Troubleshooting',
    title: 'Connection Troubleshooting & FAQ',
    summary: 'Resolving Windows Firewall blocks, subnet mismatches, and telemetry SDK confirmation dialogs.',
  },
];

const PLUGIN_PATH =
  'C:\\Program Files (x86)\\Steam\\steamapps\\common\\Euro Truck Simulator 2\\bin\\win_x64\\plugins\\';

const FIREWALL_CMD =
  'netsh advfirewall firewall add rule name="Truck Sim Nav Bridge" dir=in action=allow protocol=TCP localport=25555';

export function DocumentationModal({
  open,
  initialTab = 'overview',
  onClose,
  onOpenDownload,
}: DocumentationModalProps) {
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  useEffect(() => {
    if (open) {
      setActiveTab(initialTab || 'overview');
    }
  }, [open, initialTab]);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  const handleCopy = async (id: string, text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedId(id);
      window.setTimeout(() => setCopiedId(null), 1800);
    } catch {
      setCopiedId(null);
    }
  };

  const currentTab = DOC_TABS.find((t) => t.id === activeTab) ?? DOC_TABS[0];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="docs-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-4xl h-[85vh] max-h-[760px] rounded-2xl bg-white border border-[#DADCE0] material-elevation-2 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#DADCE0] flex items-center justify-between gap-4 shrink-0">
          <div>
            <h2 id="docs-modal-title" className="font-display text-lg font-semibold text-[#1F1F1F]">
              Truck Sim Nav Documentation
            </h2>
            <p className="text-xs text-[#5F6368]">
              Technical Reference &amp; Setup Manual for Euro Truck Simulator 2 (iOS &amp; iPadOS)
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close documentation"
            className="w-9 h-9 rounded-lg inline-flex items-center justify-center text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#1F1F1F] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body Split: Left Sidebar Navigation + Right Article */}
        <div className="flex-1 flex flex-col md:flex-row min-h-0">
          {/* Sidebar Tabs */}
          <nav
            aria-label="Documentation sections"
            className="md:w-56 border-b md:border-b-0 md:border-r border-[#DADCE0] bg-[#F8F9FA] p-3 flex md:flex-col gap-1 overflow-x-auto shrink-0"
          >
            {DOC_TABS.map((tab) => {
              const isActive = tab.id === activeTab;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`px-3.5 py-2.5 text-left text-xs font-medium rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                    isActive
                      ? 'bg-[#E8F0FE] text-[#0B57D0]'
                      : 'text-[#444746] hover:bg-[#F1F3F4] hover:text-[#1F1F1F]'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </nav>

          {/* Main Documentation Content */}
          <div className="flex-1 p-6 sm:p-8 overflow-y-auto">
            <h3 className="font-display text-2xl font-semibold text-[#1F1F1F]">
              {currentTab.title}
            </h3>
            <p className="text-sm text-[#5F6368] mt-1.5 pb-5 border-b border-[#DADCE0]">
              {currentTab.summary}
            </p>

            {activeTab === 'overview' && (
              <div className="mt-6 space-y-5 text-sm text-[#444746] leading-relaxed">
                <p>
                  Truck Sim Nav offloads navigation, vehicle instrumentation, and traffic perception from your primary Euro Truck Simulator 2 screen onto your iPhone or iPad. Because all data travels strictly across your local area network, there is no cloud delay and zero ongoing subscription cost.
                </p>

                <div className="rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-5">
                  <h4 className="font-display text-sm font-semibold text-[#1F1F1F] mb-3">
                    Minimum Requirements
                  </h4>
                  <ul className="space-y-2 text-xs text-[#444746]">
                    <li>
                      <strong>iOS Device:</strong> iPhone or iPad running iOS 16.0 / iPadOS 16.0 or newer (Apple A12 Bionic or newer recommended for 60 Hz 3D rendering).
                    </li>
                    <li>
                      <strong>Simulation PC:</strong> Windows 10 or Windows 11 (64-bit) running Euro Truck Simulator 2 v1.48+.
                    </li>
                    <li>
                      <strong>Network:</strong> Local Wi-Fi router connecting both the gaming PC (Ethernet or Wi-Fi) and the iOS device on the same subnet.
                    </li>
                  </ul>
                </div>
              </div>
            )}

            {activeTab === 'setup' && (
              <div className="mt-6 space-y-6 text-sm text-[#444746] leading-relaxed">
                <div>
                  <h4 className="font-display text-sm font-semibold text-[#1F1F1F]">
                    1. Copy the Telemetry DLL to ETS2 Plugins
                  </h4>
                  <p className="mt-1.5">
                    Extract the Windows Telemetry Bridge archive and copy <code className="font-mono text-xs bg-[#F1F3F4] px-1.5 py-0.5 rounded text-[#1F1F1F]">TruckSimNavBridge.dll</code> into your game&apos;s 64-bit plugins folder (create the <code className="font-mono text-xs bg-[#F1F3F4] px-1.5 py-0.5 rounded text-[#1F1F1F]">plugins</code> directory if it does not already exist):
                  </p>
                  <div className="mt-2.5 rounded-lg border border-[#DADCE0] bg-[#F8F9FA] p-3 flex items-center justify-between gap-3">
                    <code className="font-mono text-xs text-[#1F1F1F] break-all">{PLUGIN_PATH}</code>
                    <button
                      type="button"
                      onClick={() => handleCopy('path', PLUGIN_PATH)}
                      aria-label="Copy plugin path"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-white border border-[#DADCE0] rounded-md text-[#1F1F1F] hover:bg-[#F1F3F4] shrink-0 cursor-pointer"
                    >
                      {copiedId === 'path' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#0D652D]" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-sm font-semibold text-[#1F1F1F]">
                    2. Authorize Local Port in Windows Firewall
                  </h4>
                  <p className="mt-1.5">
                    If Windows Defender Firewall blocks incoming local discovery, run this command in an elevated PowerShell or Command Prompt window:
                  </p>
                  <div className="mt-2.5 rounded-lg border border-[#DADCE0] bg-[#F8F9FA] p-3 flex items-center justify-between gap-3">
                    <code className="font-mono text-xs text-[#1F1F1F] break-all">{FIREWALL_CMD}</code>
                    <button
                      type="button"
                      onClick={() => handleCopy('fw', FIREWALL_CMD)}
                      aria-label="Copy firewall command"
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium bg-white border border-[#DADCE0] rounded-md text-[#1F1F1F] hover:bg-[#F1F3F4] shrink-0 cursor-pointer"
                    >
                      {copiedId === 'fw' ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-[#0D652D]" />
                          Copied
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5" />
                          Copy
                        </>
                      )}
                    </button>
                  </div>
                </div>

                <div>
                  <h4 className="font-display text-sm font-semibold text-[#1F1F1F]">
                    3. Launch ETS2 and Pair on iOS
                  </h4>
                  <p className="mt-1.5">
                    Start Euro Truck Simulator 2 and click <strong>OK</strong> on the standard &ldquo;Request to use advanced SDK features&rdquo; prompt. Open Truck Sim Nav on your iPhone or iPad—your PC will appear automatically under <em>Nearby Simulators</em>.
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'perception' && (
              <div className="mt-6 space-y-5 text-sm text-[#444746] leading-relaxed">
                <p>
                  The 3D Surrounding Awareness view uses Apple Metal to render a low-latency forward roadway corridor directly beneath your turn-by-turn banner.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#DADCE0] p-4 bg-[#F8F9FA]">
                    <h4 className="font-display text-sm font-semibold text-[#1F1F1F]">
                      AI Traffic Visualization
                    </h4>
                    <p className="text-xs text-[#444746] mt-1.5 leading-relaxed">
                      Nearby AI sedans, delivery vans, and tractor-trailers are classified by bounding dimensions and displayed in their corresponding lanes with live relative spacing in meters.
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#DADCE0] p-4 bg-[#F8F9FA]">
                    <h4 className="font-display text-sm font-semibold text-[#1F1F1F]">
                      Lane-Level Corridor Guidance
                    </h4>
                    <p className="text-xs text-[#444746] mt-1.5 leading-relaxed">
                      Before motorway splits and multi-lane roundabouts, recommended lanes illuminate in solid blue so you can position your trailer smoothly without last-second lane changes.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'signals' && (
              <div className="mt-6 space-y-5 text-sm text-[#444746] leading-relaxed">
                <p>
                  When approaching a signalized junction in Euro Truck Simulator 2, Truck Sim Nav locks onto the active intersection ahead of your current heading and displays both the signal state (Red, Amber, or Green) and the remaining seconds until the next phase transition.
                </p>
                <ul className="space-y-2.5 text-sm list-disc pl-5">
                  <li>
                    <strong>Activation Range:</strong> Signal countdown appears automatically within 250 meters of a controlled junction.
                  </li>
                  <li>
                    <strong>Color-Accessible Indicators:</strong> Every phase pairs high-contrast color coding with explicit text labels (Red Light, Amber Caution, Green Light) and tabular countdown digits.
                  </li>
                  <li>
                    <strong>Optional Audio Chime:</strong> Enable a subtle green-light chime in iOS app settings when stopped at red lights.
                  </li>
                </ul>
              </div>
            )}

            {activeTab === 'voice' && (
              <div className="mt-6 space-y-5 text-sm text-[#444746] leading-relaxed">
                <p>
                  Truck Sim Nav uses on-device iOS speech synthesis and curated navigation phrasebooks so voice announcements stay crisp and responsive even offline.
                </p>
                <div className="rounded-xl border border-[#DADCE0] p-4 bg-[#F8F9FA]">
                  <h4 className="font-display text-sm font-semibold text-[#1F1F1F] mb-2">
                    Supported Voice Languages
                  </h4>
                  <p className="text-xs text-[#444746] leading-relaxed">
                    English (US / UK), Deutsch, Français, Español, Italiano, Polski, Nederlands, Português, Русский, Türkçe, 中文 (简体 / 繁體), and 日本語.
                  </p>
                </div>
                <div className="rounded-xl border border-[#DADCE0] p-4 bg-[#F8F9FA]">
                  <h4 className="font-display text-sm font-semibold text-[#1F1F1F] mb-2">
                    Adaptive Dark Mode
                  </h4>
                  <p className="text-xs text-[#444746] leading-relaxed">
                    Choose between <strong>Always Light</strong>, <strong>Always Dark</strong>, <strong>Follow iOS System</strong>, or <strong>Sync to ETS2 In-Game Time</strong> (automatically activates Dark Mode at dusk or when headlights are turned on).
                  </p>
                </div>
              </div>
            )}

            {activeTab === 'faq' && (
              <div className="mt-6 space-y-5 text-sm text-[#444746]">
                <div className="pb-4 border-b border-[#DADCE0]">
                  <h4 className="font-display text-sm font-semibold text-[#1F1F1F]">
                    Why does the app show &ldquo;Waiting for Simulator&rdquo;?
                  </h4>
                  <p className="text-xs mt-1.5 leading-relaxed">
                    Verify that both your Windows PC and iOS device are on the same local Wi-Fi network (not a guest VLAN), that you clicked OK on the ETS2 SDK prompt at startup, and that TCP/UDP port 25555 is allowed through Windows Firewall.
                  </p>
                </div>
                <div className="pb-4 border-b border-[#DADCE0]">
                  <h4 className="font-display text-sm font-semibold text-[#1F1F1F]">
                    Is an Android version available?
                  </h4>
                  <p className="text-xs mt-1.5 leading-relaxed">
                    Truck Sim Nav is currently built natively for iOS and iPadOS only. You can subscribe to release updates on the main page if you would like to be notified about future platform expansion.
                  </p>
                </div>
                <div>
                  <h4 className="font-display text-sm font-semibold text-[#1F1F1F]">
                    Does Truck Sim Nav work with map mods such as ProMods?
                  </h4>
                  <p className="text-xs mt-1.5 leading-relaxed">
                    Telemetry metrics (speed, fuel, range, remaining distance), traffic signal countdowns, and 3D AI traffic work seamlessly with map mods. Vector road overlays can be refreshed using the included map cache exporter.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-[#F8F9FA] border-t border-[#DADCE0] flex items-center justify-between gap-4 shrink-0">
          <span className="text-xs text-[#5F6368]">
            Ready to install on iPhone or iPad?
          </span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenDownload();
            }}
            className="px-4 py-2 text-xs font-medium text-white bg-[#1A73E8] hover:bg-[#0B57D0] rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Download for iOS
          </button>
        </div>
      </div>
    </div>
  );
}
