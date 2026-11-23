/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from 'react';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { InteractiveCockpitDemo } from './components/InteractiveCockpitDemo';
import { SpecsAndSetupSection } from './components/SpecsAndSetupSection';
import { DownloadCtaSection } from './components/DownloadCtaSection';
import { DownloadModal } from './components/DownloadModal';
import { DocumentationModal } from './components/DocumentationModal';
import { Footer } from './components/Footer';

export default function App() {
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  const [docsTab, setDocsTab] = useState<string>('overview');

  const handleOpenDocs = (tab = 'overview') => {
    setDocsTab(tab);
    setDocsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1F1F1F] flex flex-col">
      <TopBar
        onOpenDownload={() => setDownloadModalOpen(true)}
        onOpenDocs={() => handleOpenDocs('overview')}
      />

      <main className="flex-1">
        <HeroSection
          onOpenDownload={() => setDownloadModalOpen(true)}
          onOpenDocs={() => handleOpenDocs('setup')}
        />

        <CapabilitiesSection onOpenDocs={handleOpenDocs} />

        <InteractiveCockpitDemo />

        <SpecsAndSetupSection
          onOpenDocs={handleOpenDocs}
          onOpenDownload={() => setDownloadModalOpen(true)}
        />

        <DownloadCtaSection
          onOpenDownload={() => setDownloadModalOpen(true)}
          onOpenDocs={() => handleOpenDocs('setup')}
        />
      </main>

      <Footer
        onOpenDownload={() => setDownloadModalOpen(true)}
        onOpenDocs={handleOpenDocs}
      />

      <DownloadModal
        open={downloadModalOpen}
        onClose={() => setDownloadModalOpen(false)}
        onOpenDocs={handleOpenDocs}
      />

      <DocumentationModal
        open={docsModalOpen}
        initialTab={docsTab}
        onClose={() => setDocsModalOpen(false)}
        onOpenDownload={() => setDownloadModalOpen(true)}
      />
    </div>
  );
}
