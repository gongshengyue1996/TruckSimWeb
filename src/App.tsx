/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useEffect, useState } from 'react';
import { TopBar } from './components/TopBar';
import { HeroSection } from './components/HeroSection';
import { CapabilitiesSection } from './components/CapabilitiesSection';
import { InteractiveCockpitDemo } from './components/InteractiveCockpitDemo';
import { SpecsAndSetupSection } from './components/SpecsAndSetupSection';
import { DownloadCtaSection } from './components/DownloadCtaSection';
import { DownloadModal } from './components/DownloadModal';
import { DocumentationModal } from './components/DocumentationModal';
import { Footer } from './components/Footer';
import { LegalPage, type LegalDocType } from './components/LegalPage';

type ActiveRoute = 'home' | LegalDocType;

function resolveRouteFromLocation(): ActiveRoute {
  const path = window.location.pathname.toLowerCase().replace(/\/+$/, '') || '/';
  const hash = window.location.hash.toLowerCase();

  if (path === '/privacy' || path === '/privacy-policy' || hash === '#privacy' || hash === '#/privacy') {
    return 'privacy';
  }
  if (path === '/terms' || path === '/terms-of-use' || hash === '#terms' || hash === '#/terms') {
    return 'terms';
  }
  return 'home';
}

export default function App() {
  const [route, setRoute] = useState<ActiveRoute>(() => resolveRouteFromLocation());
  const [downloadModalOpen, setDownloadModalOpen] = useState(false);
  const [docsModalOpen, setDocsModalOpen] = useState(false);
  const [docsTab, setDocsTab] = useState<string>('overview');

  useEffect(() => {
    const onPopState = () => {
      setRoute(resolveRouteFromLocation());
    };
    window.addEventListener('popstate', onPopState);
    return () => window.removeEventListener('popstate', onPopState);
  }, []);

  useEffect(() => {
    if (route === 'privacy') {
      document.title = 'Privacy Policy — Truck Sim Nav';
    } else if (route === 'terms') {
      document.title = 'Terms of Use — Truck Sim Nav';
    } else {
      document.title = 'Truck Sim Nav — iOS GPS Navigation & 3D Telemetry for Euro Truck Simulator 2';
    }
  }, [route]);

  const navigateToLegal = (doc: LegalDocType) => {
    const targetPath = doc === 'privacy' ? '/privacy' : '/terms';
    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }
    setRoute(doc);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateHome = (sectionId?: string) => {
    const targetUrl = sectionId ? `/#${sectionId}` : '/';
    if (route !== 'home') {
      window.history.pushState({}, '', targetUrl);
      setRoute('home');
      window.requestAnimationFrame(() => {
        if (sectionId) {
          document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }
      });
      return;
    }

    if (sectionId) {
      window.history.replaceState({}, '', targetUrl);
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.history.replaceState({}, '', '/');
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleOpenDocs = (tab = 'overview') => {
    setDocsTab(tab);
    setDocsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-[#1F1F1F] flex flex-col">
      <TopBar
        onOpenDownload={() => setDownloadModalOpen(true)}
        onOpenDocs={() => handleOpenDocs('overview')}
        onNavigateHome={navigateHome}
      />

      <main className="flex-1">
        {route === 'home' ? (
          <>
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
          </>
        ) : (
          <LegalPage
            docType={route}
            onNavigateHome={() => navigateHome()}
            onSwitchDoc={navigateToLegal}
          />
        )}
      </main>

      <Footer
        onOpenDownload={() => setDownloadModalOpen(true)}
        onOpenDocs={handleOpenDocs}
        onNavigateHome={navigateHome}
        onOpenLegal={navigateToLegal}
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
