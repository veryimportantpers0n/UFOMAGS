'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Magazine } from '@/types/magazine';

interface SearchBarProps {
  magazines: Magazine[];
}

export default function SearchBar({ magazines }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Magazine[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);

  const handleImageError = (magazineId: string) => {
    setImageErrors((prev) => ({ ...prev, [magazineId]: true }));
  };

  // Debounce the search query by 300ms
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Perform search when debounced query changes
  useEffect(() => {
    if (debouncedQuery.trim().length === 0) {
      setResults([]);
      setShowResults(false);
      return;
    }

    const searchTerm = debouncedQuery.toLowerCase();
    const filtered = magazines.filter((mag) => {
      const searchableText = [
        mag.coverName,
        mag.date,
        mag.description,
        mag.customText,
      ]
        .join(' ')
        .toLowerCase();

      return searchableText.includes(searchTerm);
    });

    setResults(filtered);
    setShowResults(true);
  }, [debouncedQuery, magazines]);

  // Close results when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        searchRef.current &&
        !searchRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleResultClick = (slug: string) => {
    router.push(`/magazine/${slug}`);
    setShowResults(false);
    setQuery('');
  };

  return (
    <div ref={searchRef} className="relative w-full">
      {/* Modern Search Container */}
      <div className="relative bg-black/90 backdrop-blur-xl border-2 border-[#00adb5]/40 rounded-2xl shadow-2xl shadow-[#00adb5]/10 overflow-hidden">
        <div className="flex items-center px-5 py-4">
          {/* Search Icon */}
          <svg
            className="w-5 h-5 text-[#00adb5] mr-3 flex-shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>

          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => query.length > 0 && setShowResults(true)}
            placeholder="Search magazines..."
            className="flex-1 bg-transparent text-gray-200 placeholder-gray-500 font-mono text-sm
                       focus:outline-none"
            aria-label="Search magazines"
          />

          {query && (
            <button
              onClick={() => {
                setQuery('');
                setResults([]);
                setShowResults(false);
              }}
              className="ml-3 text-gray-500 hover:text-[#00adb5] transition-all duration-200 
                         hover:scale-110 text-lg flex-shrink-0"
              aria-label="Clear search"
            >
              ✕
            </button>
          )}
        </div>
      </div>

      {/* Results Dropdown */}
      {showResults && (
        <div className="absolute z-50 w-full mt-3 bg-black/95 backdrop-blur-xl border-2 border-[#00adb5]/40 
                        rounded-2xl shadow-2xl shadow-[#00adb5]/20 max-h-96 overflow-y-auto animate-fade-in">
          {results.length > 0 ? (
            <div className="py-2">
              {results.map((magazine) => (
                <button
                  key={magazine.id}
                  onClick={() => handleResultClick(magazine.slug)}
                  className="w-full px-5 py-3 flex items-start gap-4 hover:bg-[#00adb5]/10 
                             transition-all duration-200 text-left rounded-xl mx-2"
                >
                  <div className="flex-shrink-0 w-16 h-20 relative bg-gray-800 rounded-lg overflow-hidden border border-[#00adb5]/20">
                    <Image
                      src={imageErrors[magazine.id] ? '/placeholder-cover.svg' : magazine.coverImage}
                      alt={`Cover of ${magazine.coverName}, ${magazine.date} issue`}
                      fill
                      className="object-cover"
                      sizes="64px"
                      onError={() => handleImageError(magazine.id)}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[#00adb5] font-semibold text-sm mb-1 truncate">
                      {magazine.coverName}
                    </h3>
                    <p className="text-gray-400 text-xs mb-1">{magazine.date}</p>
                    <p className="text-gray-500 text-xs line-clamp-2">
                      {magazine.description}
                    </p>
                  </div>
                </button>
              ))}
            </div>
          ) : (
            <div className="py-8 text-center">
              <p className="text-[#00adb5] font-bold text-lg mb-2 glow-green">
                NO RESULTS
              </p>
              <p className="text-gray-500 text-sm">
                Try different keywords or browse all magazines
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
