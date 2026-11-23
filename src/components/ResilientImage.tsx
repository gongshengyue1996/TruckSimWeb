import { useState } from 'react';
import { Navigation } from 'lucide-react';

interface ResilientImageProps {
  src: string;
  alt: string;
  title?: string;
  className?: string;
}

export function ResilientImage({ src, alt, title, className = '' }: ResilientImageProps) {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-[#F1F3F4] text-[#444746] p-8 text-center ${className}`}
      >
        <div className="w-12 h-12 rounded-xl bg-[#E8F0FE] text-[#1A73E8] flex items-center justify-center mb-3">
          <Navigation className="w-6 h-6" aria-hidden="true" />
        </div>
        <p className="font-display text-sm font-semibold text-[#1F1F1F]">
          {title || 'Truck Sim Nav'}
        </p>
        <p className="text-xs text-[#5F6368] mt-1 max-w-xs">{alt}</p>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      onError={() => setHasError(true)}
      className={className}
    />
  );
}
