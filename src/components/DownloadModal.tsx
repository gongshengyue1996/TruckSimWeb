import { useEffect, useState } from 'react';
import { Download, ExternalLink, Laptop, Smartphone, X } from 'lucide-react';
import {
  DESKTOP_SERVER_DOWNLOAD_URL,
  DESKTOP_SERVER_FILENAME,
  DESKTOP_SERVER_VERSION,
} from '../constants/downloads';

interface DownloadModalProps {
  open: boolean;
  onClose: () => void;
  onOpenDocs: (tab?: string) => void;
}

export function DownloadModal({ open, onClose, onOpenDocs }: DownloadModalProps) {
  const [appStoreClicked, setAppStoreClicked] = useState(false);

  useEffect(() => {
    if (!open) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="download-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="w-full max-w-2xl rounded-2xl bg-white border border-[#DADCE0] material-elevation-2 overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-5 border-b border-[#DADCE0] flex items-center justify-between gap-4">
          <div>
            <h2 id="download-modal-title" className="font-display text-xl font-semibold text-[#1F1F1F]">
              Download Truck Sim Nav
            </h2>
            <p className="text-xs text-[#5F6368] mt-0.5">
              iOS &amp; iPadOS Client · Required Windows Desktop Server for Euro Truck Simulator 2
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close download dialog"
            className="w-9 h-9 rounded-lg inline-flex items-center justify-center text-[#5F6368] hover:bg-[#F1F3F4] hover:text-[#1F1F1F] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-6 max-h-[80vh] overflow-y-auto">
          {/* Platform & Architecture Notice */}
          <div className="rounded-xl bg-[#E8F0FE] border border-[#D3E3FD] px-4 py-3 text-xs text-[#0B57D0] leading-relaxed">
            <strong>Both Components Required:</strong> Install the <strong>iOS App</strong> on your iPhone/iPad (iOS 16.0+, currently iOS only) and install the free <strong>Windows Desktop Server</strong> on your ETS2 gaming PC so both devices can stream telemetry over local Wi-Fi.
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Step 1: iOS App Store */}
            <div className="md:col-span-7 rounded-xl border border-[#DADCE0] p-5 flex flex-col justify-between bg-white">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1F1F1F]">
                  <Smartphone className="w-4 h-4 text-[#1A73E8]" aria-hidden="true" />
                  Step 1. Install on iPhone or iPad
                </div>
                <p className="text-xs text-[#444746] leading-relaxed mt-2">
                  Download the native Metal-accelerated iOS application from the Apple App Store. Supports both portrait phone mounts and landscape iPad cockpit stands.
                </p>

                <dl className="mt-4 pt-3 border-t border-[#DADCE0] space-y-1.5 text-xs">
                  <div className="flex justify-between">
                    <dt className="text-[#5F6368]">Compatibility</dt>
                    <dd className="font-medium text-[#1F1F1F]">iOS 16.0 / iPadOS 16.0+</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#5F6368]">App Size</dt>
                    <dd className="font-mono tabular-nums text-[#1F1F1F]">64.2 MB</dd>
                  </div>
                  <div className="flex justify-between">
                    <dt className="text-[#5F6368]">Languages</dt>
                    <dd className="text-[#1F1F1F]">English + 11 Voice Packs</dd>
                  </div>
                </dl>
              </div>

              <div className="mt-5">
                <button
                  type="button"
                  onClick={() => setAppStoreClicked(true)}
                  className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#0B57D0] rounded-lg transition-colors duration-150 cursor-pointer"
                >
                  <ExternalLink className="w-4 h-4" aria-hidden="true" />
                  Open in Apple App Store
                </button>
                {appStoreClicked && (
                  <p role="status" className="text-xs text-[#0B57D0] mt-2 text-center">
                    App Store link ready — bind your live App Store URL here before publishing.
                  </p>
                )}
              </div>
            </div>

            {/* Scannable QR Card */}
            <div className="md:col-span-5 rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-5 flex flex-col items-center justify-center text-center">
              <div className="p-3 bg-white border border-[#DADCE0] rounded-xl">
                <svg
                  width="124"
                  height="124"
                  viewBox="0 0 29 29"
                  aria-label="QR code to scan with iPhone or iPad camera"
                  className="text-[#1F1F1F]"
                >
                  <rect width="29" height="29" fill="#FFFFFF" />
                  <rect x="1" y="1" width="7" height="7" fill="currentColor" />
                  <rect x="2" y="2" width="5" height="5" fill="#FFFFFF" />
                  <rect x="3" y="3" width="3" height="3" fill="currentColor" />
                  <rect x="21" y="1" width="7" height="7" fill="currentColor" />
                  <rect x="22" y="2" width="5" height="5" fill="#FFFFFF" />
                  <rect x="23" y="3" width="3" height="3" fill="currentColor" />
                  <rect x="1" y="21" width="7" height="7" fill="currentColor" />
                  <rect x="2" y="22" width="5" height="5" fill="#FFFFFF" />
                  <rect x="3" y="23" width="3" height="3" fill="currentColor" />
                  <rect x="10" y="2" width="2" height="2" fill="currentColor" />
                  <rect x="14" y="1" width="2" height="4" fill="currentColor" />
                  <rect x="17" y="3" width="2" height="2" fill="currentColor" />
                  <rect x="10" y="6" width="3" height="2" fill="currentColor" />
                  <rect x="15" y="7" width="4" height="2" fill="currentColor" />
                  <rect x="2" y="10" width="3" height="2" fill="currentColor" />
                  <rect x="7" y="10" width="2" height="4" fill="currentColor" />
                  <rect x="11" y="11" width="3" height="3" fill="#1A73E8" />
                  <rect x="15" y="11" width="3" height="3" fill="#1A73E8" />
                  <rect x="20" y="10" width="3" height="2" fill="currentColor" />
                  <rect x="25" y="10" width="2" height="4" fill="currentColor" />
                  <rect x="1" y="14" width="4" height="2" fill="currentColor" />
                  <rect x="6" y="16" width="3" height="2" fill="currentColor" />
                  <rect x="11" y="15" width="3" height="3" fill="#1A73E8" />
                  <rect x="15" y="15" width="3" height="3" fill="#1A73E8" />
                  <rect x="20" y="14" width="4" height="2" fill="currentColor" />
                  <rect x="25" y="16" width="3" height="2" fill="currentColor" />
                  <rect x="10" y="20" width="2" height="3" fill="currentColor" />
                  <rect x="14" y="20" width="4" height="2" fill="currentColor" />
                  <rect x="20" y="20" width="3" height="3" fill="currentColor" />
                  <rect x="25" y="20" width="2" height="4" fill="currentColor" />
                  <rect x="11" y="25" width="4" height="2" fill="currentColor" />
                  <rect x="17" y="24" width="3" height="3" fill="currentColor" />
                  <rect x="22" y="25" width="5" height="2" fill="currentColor" />
                </svg>
              </div>
              <p className="text-xs font-medium text-[#1F1F1F] mt-3">Scan with iPhone or iPad</p>
              <p className="text-[11px] text-[#5F6368] mt-1">
                Point your iOS camera to open the App Store listing directly.
              </p>
            </div>
          </div>

          {/* Step 2: Windows Desktop Server */}
          <div className="rounded-xl border border-[#DADCE0] bg-[#F8F9FA] p-5 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-[#1F1F1F]">
                  <Laptop className="w-4 h-4 text-[#1A73E8]" aria-hidden="true" />
                  Step 2. Install Desktop Server on Windows PC (Required)
                </div>
                <p className="text-xs text-[#444746] mt-1.5 leading-relaxed">
                  Run this installer on your Euro Truck Simulator 2 PC to stream live GPS coordinates, AI traffic positions, traffic signal phases, and vehicle telemetry to your iOS device over local Wi-Fi.
                </p>
              </div>
              <a
                href={DESKTOP_SERVER_DOWNLOAD_URL}
                download
                className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-xs font-medium text-white bg-[#1F1F1F] hover:bg-[#3C4043] rounded-lg transition-colors whitespace-nowrap shrink-0"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download Server ({DESKTOP_SERVER_VERSION})
              </a>
            </div>

            <div className="pt-3 border-t border-[#DADCE0] flex flex-wrap items-center justify-between gap-2 text-[11px] text-[#5F6368]">
              <span className="font-mono text-[#1F1F1F]">{DESKTOP_SERVER_FILENAME}</span>
              <span>Windows 10 / 11 (64-bit) · Ready to run after installation</span>
            </div>
          </div>
        </div>

        {/* Footer Action */}
        <div className="px-6 py-4 bg-[#F8F9FA] border-t border-[#DADCE0] flex items-center justify-between text-xs">
          <span className="text-[#5F6368]">Need step-by-step installation instructions?</span>
          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenDocs('setup');
            }}
            className="font-medium text-[#1A73E8] hover:text-[#0B57D0] cursor-pointer"
          >
            Open Desktop Server Setup Guide
          </button>
        </div>
      </div>
    </div>
  );
}
