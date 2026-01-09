"use client";

import { useState, useRef, useEffect } from "react";

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

interface ScrambleTextProps {
    text: string;
    hoverText?: string;
    className?: string;
    shouldHide?: boolean;
    onHoverChange?: (isHovered: boolean) => void;
}

function ScrambleText({
    text,
    hoverText,
    className = "",
    shouldHide = false,
    onHoverChange,
}: ScrambleTextProps) {
    const [displayText, setDisplayText] = useState(text);
    const [isFullyHidden, setIsFullyHidden] = useState(false);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const previousShouldHide = useRef(shouldHide);

    const scramble = (targetText: string, onComplete?: () => void) => {
        let iteration = 0;
        const originalLength = displayText.length || text.length;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            // For hiding, we shrink the text progressively
            const currentLength = targetText === ""
                ? Math.max(0, originalLength - Math.floor(iteration))
                : targetText.length;

            const baseText = targetText === "" ? text : targetText;

            setDisplayText(
                baseText
                    .slice(0, currentLength)
                    .split("")
                    .map((letter, index) => {
                        if (targetText !== "" && index < iteration) {
                            return targetText[index];
                        }
                        return LETTERS[Math.floor(Math.random() * LETTERS.length)];
                    })
                    .join("")
            );

            if (targetText === "" && currentLength <= 0) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                setIsFullyHidden(true);
                onComplete?.();
            } else if (targetText !== "" && iteration >= targetText.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
                onComplete?.();
            }

            iteration += 1 / 2;
        }, 30);
    };

    // Handle shouldHide prop - scramble to nothing or back
    useEffect(() => {
        if (shouldHide && !previousShouldHide.current) {
            // Scramble to empty
            scramble("");
        } else if (!shouldHide && previousShouldHide.current) {
            // Scramble back
            setIsFullyHidden(false);
            setDisplayText("");
            setTimeout(() => scramble(text), 50);
        }
        previousShouldHide.current = shouldHide;
    }, [shouldHide, text]);

    const handleMouseEnter = () => {
        if (!shouldHide) {
            onHoverChange?.(true);
            scramble(hoverText || text);
        }
    };

    const handleMouseLeave = () => {
        if (!shouldHide) {
            onHoverChange?.(false);
            if (hoverText) {
                scramble(text);
            }
        }
    };

    return (
        <span
            className={className}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            style={{
                visibility: isFullyHidden ? 'hidden' : 'visible',
                minWidth: '1px' // Prevent collapse
            }}
        >
            {displayText || '\u00A0'} {/* Non-breaking space to maintain height */}
        </span>
    );
}

export default function HeroTitle() {
    const [isYouHovered, setIsYouHovered] = useState(false);

    return (
        <h1 className="home-title">
            <span className="block" style={{ minHeight: '0.9em' }}>
                <ScrambleText text="THEY ARE" shouldHide={isYouHovered} />
            </span>
            <ScrambleText text="WATCHING" className="block gradient-text" />
            <ScrambleText
                text="YOU"
                hoverText="THEM"
                className="block cursor-pointer"
                onHoverChange={setIsYouHovered}
            />
        </h1>
    );
}
