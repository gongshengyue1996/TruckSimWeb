import { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface TopBarProps {
  onOpenDownload: () => void;
  onOpenDocs: () => void;
}

export function TopBar({ onOpenDownload, onOpenDocs }: TopBarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-[#DADCE0]">
      <div className="max-w-[1200px] mx-auto px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single text element wordmark */}
        <a
          href="#"
          className="font-display text-lg font-bold tracking-tight text-[#1F1F1F] whitespace-nowrap shrink-0 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A73E8] rounded"
        >
          Truck Sim Nav
        </a>

        {/* Zone 2: 4 concise single-line nav links */}
        <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-7 text-sm font-medium text-[#444746]">
          <a
            href="#capabilities"
            className="hover:text-[#1A73E8] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#1A73E8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A73E8]"
          >
            Capabilities
          </a>
          <a
            href="#interactive-demo"
            className="hover:text-[#1A73E8] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#1A73E8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A73E8]"
          >
            Cockpit Preview
          </a>
          <a
            href="#specifications"
            className="hover:text-[#1A73E8] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#1A73E8] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A73E8]"
          >
            Specifications
          </a>
          <button
            type="button"
            onClick={onOpenDocs}
            className="hover:text-[#1A73E8] transition-colors duration-150 whitespace-nowrap shrink-0 py-1 border-b-2 border-transparent hover:border-[#1A73E8] cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#1A73E8]"
          >
            Documentation
          </button>
        </nav>

        {/* Zone 3: 1 primary action */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            onClick={onOpenDownload}
            className="hidden sm:inline-flex items-center justify-center px-5 py-2.5 text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#0B57D0] active:bg-[#0842A0] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8]"
          >
            Download for iOS
          </button>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileMenuOpen}
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-lg text-[#444746] hover:bg-[#F1F3F4] transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden border-t border-[#DADCE0] bg-white px-6 py-4 space-y-2">
          <a
            href="#capabilities"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-sm font-medium text-[#1F1F1F] hover:text-[#1A73E8]"
          >
            Capabilities
          </a>
          <a
            href="#interactive-demo"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-sm font-medium text-[#1F1F1F] hover:text-[#1A73E8]"
          >
            Cockpit Preview
          </a>
          <a
            href="#specifications"
            onClick={() => setMobileMenuOpen(false)}
            className="block py-2.5 text-sm font-medium text-[#1F1F1F] hover:text-[#1A73E8]"
          >
            Specifications
          </a>
          <button
            type="button"
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenDocs();
            }}
            className="block w-full text-left py-2.5 text-sm font-medium text-[#1F1F1F] hover:text-[#1A73E8] cursor-pointer"
          >
            Documentation
          </button>
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenDownload();
              }}
              className="w-full py-2.5 px-4 text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#0B57D0] rounded-lg transition-colors cursor-pointer"
            >
              Download for iOS
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
