"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Magazine {
    id: string;
    slug: string;
    coverName: string;
    date: string;
    description: string;
}

interface SearchTerminalProps {
    magazines: Magazine[];
}

export default function SearchTerminal({ magazines }: SearchTerminalProps) {
    const [query, setQuery] = useState("");
    const [results, setResults] = useState<Magazine[]>([]);
    const [isFocused, setIsFocused] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    const router = useRouter();

    useEffect(() => {
        if (query.trim() === "") {
            setResults([]);
            return;
        }

        const filtered = magazines.filter((mag) =>
            mag.coverName.toLowerCase().includes(query.toLowerCase()) ||
            mag.date.toLowerCase().includes(query.toLowerCase()) ||
            mag.description.toLowerCase().includes(query.toLowerCase())
        );
        setResults(filtered);
    }, [query, magazines]);

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === "Enter" && results.length > 0) {
            router.push(`/magazine/${results[0].slug}`);
        }
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto md:mx-0">
            <div
                className={`relative flex items-center bg-black/80 border transition-all duration-300 ${isFocused
                    ? "border-[var(--neon-green)] shadow-[0_0_20px_rgba(0,255,65,0.2)]"
                    : "border-[var(--cyber-blue)]"
                    }`}
            >
                <span className="search-prompt-large pl-6 pr-4 mono text-[var(--neon-green)] select-none">
                    {">"}
                </span>
                <input
                    ref={inputRef}
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setTimeout(() => setIsFocused(false), 200)}
                    onKeyDown={handleKeyDown}
                    placeholder="Type a month and year (e.g., “June 1997”) to find a magazine issue..."
                    className="search-input-large w-full bg-transparent border-none outline-none pr-4 mono text-[#e0e0e0] placeholder:text-[#e0e0e0]/30"
                    autoComplete="off"
                    spellCheck="false"
                />
                <div className="absolute right-0 top-0 h-full w-2 bg-[var(--neon-green)] animate-pulse opacity-50 pointer-events-none" />
            </div>

            {/* Holographic Results Dropdown */}
            {results.length > 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-black/90 border border-[var(--neon-green)] backdrop-blur-md z-50 max-h-[300px] overflow-y-auto custom-scrollbar">
                    <div className="mono text-[10px] bg-[var(--neon-green)]/10 text-[var(--neon-green)] px-2 py-1 border-b border-[var(--neon-green)]/30">
                        {results.length} MATCHES FOUND
                    </div>
                    {results.map((mag) => (
                        <Link
                            key={mag.id}
                            href={`/magazine/${mag.slug}`}
                            className="block p-3 border-b border-[var(--neon-green)]/10 hover:bg-[var(--neon-green)]/20 transition-colors group"
                        >
                            <div className="flex justify-between items-baseline mb-1">
                                <span className="mono text-[var(--neon-green)] text-sm font-bold group-hover:text-white transition-colors">
                                    {mag.coverName}
                                </span>
                                <span className="mono text-[var(--cyber-blue)] text-xs">
                                    {mag.date}
                                </span>
                            </div>
                            <div className="text-xs text-[#888] line-clamp-1 group-hover:text-[#ccc]">
                                {mag.description}
                            </div>
                        </Link>
                    ))}
                </div>
            )}

            {/* No Results State */}
            {query && results.length === 0 && (
                <div className="absolute top-full left-0 w-full mt-2 bg-black/90 border border-red-500 backdrop-blur-md z-50 p-3">
                    <div className="mono text-red-500 text-sm">
                        ERROR: NO SIGNAL DETECTED
                    </div>
                </div>
            )}
        </div>
    );
}
