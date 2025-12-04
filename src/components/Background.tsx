import React from 'react';

interface BackgroundProps {
  type?: 'home' | 'static';
  children: React.ReactNode;
}

// Background wrapper - the actual background is handled by CanvasBackground in layout.tsx
// This component now just provides consistent wrapper styling
export default function Background({ children }: BackgroundProps) {
  return (
    <div className="relative">
      {children}
    </div>
  );
}
