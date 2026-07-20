"use client";

import React from "react";

interface GridBackgroundProps {
  children?: React.ReactNode;
  className?: string;
}

export function GridBackground({ children, className = "" }: GridBackgroundProps) {
  return (
    <div
      className={`relative min-h-screen w-full bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 radial-grid selection:bg-brand-blue/30 selection:text-blue-600 flex flex-col justify-between overflow-hidden transition-colors duration-300 ${className}`}
    >
      {/* Mesh background grid pattern layer */}
      <div className="absolute inset-0 mesh-grid mesh-mask pointer-events-none z-0" />
      {children}
    </div>
  );
}
