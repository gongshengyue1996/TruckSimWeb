import type { LegalDocType } from './LegalPage';

interface FooterProps {
  onOpenDownload: () => void;
  onOpenDocs: (tab?: string) => void;
  onNavigateHome: (sectionId?: string) => void;
  onOpenLegal: (doc: LegalDocType) => void;
}

export function Footer({
  onOpenDownload,
  onOpenDocs,
  onNavigateHome,
  onOpenLegal,
}: FooterProps) {
  const handleHomeAnchor = (sectionId: string) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onNavigateHome(sectionId);
  };

  const handleLegalClick = (doc: LegalDocType) => (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    onOpenLegal(doc);
  };

  return (
    <footer className="bg-white border-t border-[#DADCE0] py-12">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-[#DADCE0]">
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onNavigateHome();
              }}
              className="font-display text-base font-bold text-[#1F1F1F] hover:text-[#1A73E8] transition-colors"
            >
              Truck Sim Nav
            </a>
            <p className="text-xs text-[#5F6368] mt-1">
              Dedicated iOS &amp; iPadOS GPS Navigation and 3D Telemetry Companion for Euro Truck Simulator 2.
            </p>
          </div>

          <nav aria-label="Footer navigation" className="flex flex-wrap items-center gap-6 text-xs font-medium text-[#444746]">
            <a
              href="/#capabilities"
              onClick={handleHomeAnchor('capabilities')}
              className="hover:text-[#1A73E8] transition-colors whitespace-nowrap"
            >
              Capabilities
            </a>
            <a
              href="/#interactive-demo"
              onClick={handleHomeAnchor('interactive-demo')}
              className="hover:text-[#1A73E8] transition-colors whitespace-nowrap"
            >
              Cockpit Preview
            </a>
            <a
              href="/#specifications"
              onClick={handleHomeAnchor('specifications')}
              className="hover:text-[#1A73E8] transition-colors whitespace-nowrap"
            >
              Specifications
            </a>
            <button
              type="button"
              onClick={() => onOpenDocs('setup')}
              className="hover:text-[#1A73E8] transition-colors cursor-pointer whitespace-nowrap"
            >
              Documentation
            </button>
            <button
              type="button"
              onClick={onOpenDownload}
              className="hover:text-[#1A73E8] transition-colors cursor-pointer whitespace-nowrap"
            >
              Download for iOS
            </button>
          </nav>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs text-[#5F6368]">
          <p>
            © {new Date().getFullYear()} Truck Sim Nav. Independent companion software; Euro Truck Simulator 2 is a registered trademark of SCS Software s.r.o.
          </p>
          <div className="flex flex-wrap items-center gap-3 whitespace-nowrap shrink-0">
            <a
              href="/privacy"
              onClick={handleLegalClick('privacy')}
              className="font-medium text-[#444746] hover:text-[#1A73E8] transition-colors"
            >
              Privacy Policy
            </a>
            <span aria-hidden="true">·</span>
            <a
              href="/terms"
              onClick={handleLegalClick('terms')}
              className="font-medium text-[#444746] hover:text-[#1A73E8] transition-colors"
            >
              Terms of Use
            </a>
            <span aria-hidden="true">·</span>
            <span>iOS &amp; iPadOS Exclusive</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
