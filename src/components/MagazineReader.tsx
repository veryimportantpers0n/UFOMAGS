'use client';

import { useState } from 'react';

interface MagazineReaderProps {
  archiveUrl: string;
  title: string;
}

/**
 * MagazineReader component - Embeds Internet Archive BookReader
 * Requirements: 7.1, 7.2
 */
export default function MagazineReader({ archiveUrl, title }: MagazineReaderProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Extract the archive ID from the URL
  // Example: https://archive.org/details/36-37_20251202 -> 36-37_20251202
  const archiveId = archiveUrl.split('/details/')[1]?.split('/')[0];

  const handleLoad = () => {
    setIsLoading(false);
  };

  const handleError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  if (!archiveId) {
    return (
      <div className="w-full bg-black/50 border border-[#00adb5]/30 rounded p-8 text-center">
        <p className="text-red-400 mb-4">Invalid archive URL</p>
        <a
          href={archiveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 border border-[#00adb5] text-[#00adb5] hover:bg-[#00adb5] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#00adb5] focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200 rounded"
        >
          View on Internet Archive
        </a>
      </div>
    );
  }

  if (hasError) {
    return (
      <div className="w-full bg-black/50 border border-[#00adb5]/30 rounded p-8 text-center">
        <p className="text-gray-300 mb-4">Unable to load magazine viewer</p>
        <a
          href={archiveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-6 py-2 border border-[#00adb5] text-[#00adb5] hover:bg-[#00adb5] hover:text-black focus:outline-none focus:ring-2 focus:ring-[#00adb5] focus:ring-offset-2 focus:ring-offset-black transition-colors duration-200 rounded"
        >
          View on Internet Archive
        </a>
      </div>
    );
  }

  return (
    <div className="w-full relative">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50 border border-[#00adb5]/30 rounded">
          <div className="text-[#00adb5] text-lg">Loading magazine...</div>
        </div>
      )}
      <iframe
        src={`https://archive.org/embed/${archiveId}`}
        width="100%"
        height="800"
        className="border border-[#00adb5]/30 rounded"
        title={`${title} - Magazine Reader`}
        allowFullScreen
        onLoad={handleLoad}
        onError={handleError}
      />
    </div>
  );
}
