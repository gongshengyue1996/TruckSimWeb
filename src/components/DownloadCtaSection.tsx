import { useState, type FormEvent } from 'react';
import { BookOpen, CheckCircle2, Download } from 'lucide-react';

interface DownloadCtaSectionProps {
  onOpenDownload: () => void;
  onOpenDocs: () => void;
}

export function DownloadCtaSection({ onOpenDownload, onOpenDocs }: DownloadCtaSectionProps) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const handleNotifySubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!trimmed || !emailPattern.test(trimmed)) {
      setError('Please enter a valid email address.');
      return;
    }
    setError(null);
    setSubmitted(true);
    setEmail('');
  };

  return (
    <section className="py-20 bg-[#F8F9FA] border-t border-[#DADCE0]">
      <div className="max-w-[1200px] mx-auto px-6">
        <div className="rounded-2xl border border-[#DADCE0] bg-white p-8 sm:p-12 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          {/* Primary iOS Download Block */}
          <div className="lg:col-span-7">
            <p className="text-sm font-medium text-[#1A73E8] mb-2">
              Available Now for iPhone &amp; iPad
            </p>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold tracking-tight text-[#1F1F1F] [text-wrap:balance]">
              Upgrade your Euro Truck Simulator 2 cockpit today
            </h2>
            <p className="text-[#444746] mt-3 text-base leading-relaxed max-w-xl">
              Download Truck Sim Nav from the Apple App Store and pair it with the free Windows telemetry bridge. Enjoy 3D lane guidance, live traffic light countdowns, full telemetry, and multilingual voice prompts on your iOS device.
            </p>

            <div className="mt-7 flex flex-wrap items-center gap-3.5">
              <button
                type="button"
                onClick={onOpenDownload}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-white bg-[#1A73E8] hover:bg-[#0B57D0] active:bg-[#0842A0] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8]"
              >
                <Download className="w-4 h-4" aria-hidden="true" />
                Download for iOS
              </button>

              <button
                type="button"
                onClick={onOpenDocs}
                className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-medium text-[#1A73E8] bg-white hover:bg-[#F1F3F4] border border-[#DADCE0] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#1A73E8]"
              >
                <BookOpen className="w-4 h-4" aria-hidden="true" />
                Read Documentation
              </button>
            </div>
          </div>

          {/* Secondary Waitlist / Release Notification Form */}
          <div className="lg:col-span-5 lg:border-l lg:border-[#DADCE0] lg:pl-10">
            <h3 className="font-display text-lg font-semibold text-[#1F1F1F]">
              Platform &amp; Release Updates
            </h3>
            <p className="text-sm text-[#444746] leading-relaxed mt-1.5">
              Truck Sim Nav is currently available for iOS and iPadOS only. Leave your email to receive ETS2 compatibility updates or future Android release announcements.
            </p>

            {submitted ? (
              <div
                role="status"
                className="mt-5 p-4 rounded-xl bg-[#E6F4EA] border border-[#A8DAB5] text-[#0D652D] flex items-start gap-3"
              >
                <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5" aria-hidden="true" />
                <div className="text-sm">
                  <p className="font-semibold">Notification registered</p>
                  <p className="text-xs mt-0.5 text-[#137333]">
                    We will notify you when major telemetry bridge updates or new platform releases become available.
                  </p>
                </div>
              </div>
            ) : (
              <form onSubmit={handleNotifySubmit} noValidate className="mt-5 space-y-3">
                <div>
                  <label htmlFor="notify-email" className="block text-xs font-medium text-[#444746] mb-1.5">
                    Work or personal email
                  </label>
                  <input
                    id="notify-email"
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (error) setError(null);
                    }}
                    placeholder="driver@example.com"
                    aria-invalid={error ? 'true' : 'false'}
                    aria-describedby={error ? 'notify-email-error' : undefined}
                    className={`w-full px-3.5 py-2.5 text-sm text-[#1F1F1F] bg-white border rounded-lg focus:outline-none focus:border-[#1A73E8] focus:ring-2 focus:ring-[#D3E3FD] transition-colors ${
                      error ? 'border-[#D93025]' : 'border-[#DADCE0]'
                    }`}
                  />
                  {error && (
                    <p id="notify-email-error" role="alert" className="text-xs text-[#C5221F] mt-1.5">
                      {error}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 px-4 text-sm font-medium text-[#1F1F1F] bg-[#F1F3F4] hover:bg-[#E8EAED] border border-[#DADCE0] rounded-lg transition-colors duration-150 cursor-pointer"
                >
                  Subscribe to Release Notes
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
