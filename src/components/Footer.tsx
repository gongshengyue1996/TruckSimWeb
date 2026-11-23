interface FooterProps {
  onOpenDownload: () => void;
  onOpenDocs: (tab?: string) => void;
}

export function Footer({ onOpenDownload, onOpenDocs }: FooterProps) {
  return (
    <footer className="bg-white border-t border-[#DADCE0] py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#DADCE0]">
          <div>
            <div className="font-display text-base font-bold text-[#1F1F1F]">
              Truck Sim Nav
            </div>
            <p className="text-xs text-[#5F6368] mt-1">
              Dedicated iOS &amp; iPadOS GPS Navigation and 3D Telemetry Companion for Euro Truck Simulator 2.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#444746]">
            <a href="#capabilities" className="hover:text-[#1A73E8] transition-colors">
              Capabilities
            </a>
            <a href="#interactive-demo" className="hover:text-[#1A73E8] transition-colors">
              Cockpit Preview
            </a>
            <a href="#specifications" className="hover:text-[#1A73E8] transition-colors">
              Specifications
            </a>
            <button
              type="button"
              onClick={() => onOpenDocs('setup')}
              className="hover:text-[#1A73E8] transition-colors cursor-pointer"
            >
              Documentation
            </button>
            <button
              type="button"
              onClick={onOpenDownload}
              className="hover:text-[#1A73E8] transition-colors cursor-pointer"
            >
              Download for iOS
            </button>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#5F6368]">
          <p>
            © {new Date().getFullYear()} Truck Sim Nav. Independent companion software; Euro Truck Simulator 2 is a registered trademark of SCS Software s.r.o.
          </p>
          <p className="whitespace-nowrap shrink-0">
            iOS &amp; iPadOS Exclusive · English Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
