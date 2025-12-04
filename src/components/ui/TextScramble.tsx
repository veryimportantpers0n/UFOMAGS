"use client";

import { useState, useRef } from "react";

interface TextScrambleProps {
    text: string;
    hoverText?: string;
    className?: string;
    as?: React.ElementType;
}

const LETTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%^&*";

export default function TextScramble({
    text,
    hoverText,
    className = "",
    as: Component = "span",
}: TextScrambleProps) {
    const [displayText, setDisplayText] = useState(text);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const scramble = (targetText: string) => {
        let iteration = 0;

        if (intervalRef.current) clearInterval(intervalRef.current);

        intervalRef.current = setInterval(() => {
            setDisplayText((prev) =>
                targetText
                    .split("")
                    .map((letter, index) => {
                        if (index < iteration) {
                            return targetText[index];
                        }
                        return LETTERS[Math.floor(Math.random() * LETTERS.length)];
                    })
                    .join("")
            );

            if (iteration >= targetText.length) {
                if (intervalRef.current) clearInterval(intervalRef.current);
            }

            iteration += 1 / 3;
        }, 30);
    };

    return (
        <Component
            className={className}
            onMouseEnter={() => scramble(hoverText || text)}
            onMouseLeave={() => {
                if (hoverText) scramble(text);
            }}
        >
            {displayText}
        </Component>
    );
}
