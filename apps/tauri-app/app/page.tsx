"use client";

import { useState } from "react";
import Image from "next/image";
import { trpc } from "../trpc/client";
import { 
  Sparkles, 
  Cpu, 
  Activity, 
  Layers, 
  Terminal, 
  Check, 
  RefreshCw, 
  Compass, 
  Layout, 
  Sliders
} from "lucide-react";

interface LogoOption {
  id: string;
  name: string;
  path: string;
  description: string;
  tag: string;
}

const LOGO_OPTIONS: LogoOption[] = [
  {
    id: "symmetrical",
    name: "Symmetrical Mark",
    path: "/butterfly_symmetrical.png",
    description: "Perfect balance and order. Ideal for structured workflows and telemetry.",
    tag: "Balanced"
  },
  {
    id: "solid",
    name: "Solid Mark",
    path: "/butterfly_solid.png",
    description: "Bold silhouette designed for instant readability and icon presence.",
    tag: "High Contrast"
  },
  {
    id: "dynamic",
    name: "Dynamic Mark",
    path: "/butterfly_dynamic.png",
    description: "Fluid wings indicating speed, iteration, and agile progress.",
    tag: "Agile Flow"
  },
  {
    id: "abstract",
    name: "Abstract Mark",
    path: "/butterfly_abstract.png",
    description: "Deconstructed facets representing telemetry, AI networks, and data.",
    tag: "AI Native"
  }
];

export default function Home() {
  const healthQuery = trpc.health.getHealth.useQuery();
  const [selectedLogo, setSelectedLogo] = useState<LogoOption>({
    id: "default",
    name: "Brand Logo (Transparent)",
    path: "/logo_transparent.png",
    description: "The primary Chitra Patang identity with a clean transparent backdrop.",
    tag: "Primary"
  });

  const [simulatedLogs, setSimulatedLogs] = useState<string[]>([
    "System initialized.",
    "Connecting to shared API router...",
    "Telemetry agent listening."
  ]);

  const [activeTab, setActiveTab] = useState<"workspace" | "config" | "logs">("workspace");

  const addSimulatedLog = (message: string) => {
    const timestamp = new Date().toLocaleTimeString();
    setSimulatedLogs(prev => [`[${timestamp}] ${message}`, ...prev.slice(0, 7)]);
  };

  return (
    <main className="relative min-h-screen w-full bg-brand-dark radial-grid flex flex-col justify-between selection:bg-brand-blue/30 selection:text-blue-200">
      {/* Mesh Background */}
      <div className="absolute inset-0 mesh-grid mesh-mask pointer-events-none z-0" />

      {/* Floating Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 -translate-x-1/2 w-[350px] h-[350px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse-slow" />
      <div className="absolute bottom-1/4 right-1/4 translate-x-1/2 w-[350px] h-[350px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none z-0 animate-pulse-slow" />

      {/* Header bar */}
      <header className="sticky top-0 z-50 w-full glass-surface-nav backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 overflow-hidden transition-all duration-300">
              <Image
                src={selectedLogo.path}
                alt="Active Logo"
                width={24}
                height={24}
                className="object-contain transition-transform duration-300 hover:scale-110"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold tracking-wide text-zinc-100 flex items-center gap-1.5">
                Chitrapatang Terminal <span className="text-[10px] text-brand-blue px-1.5 py-0.5 rounded-full bg-brand-blue/10 border border-brand-blue/20">Desktop</span>
              </span>
            </div>
          </div>

          {/* Connection status */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-zinc-950/60 text-xs">
              <span className={`w-2 h-2 rounded-full ${
                healthQuery.isLoading 
                  ? "bg-amber-400 animate-pulse" 
                  : healthQuery.data?.status === "ok" || healthQuery.data?.status
                    ? "bg-emerald-400" 
                    : "bg-rose-400"
              }`} />
              <span className="text-zinc-400 text-[10px]">
                API Link:{" "}
                <span className="text-zinc-200 font-medium">
                  {healthQuery.isLoading 
                    ? "Verifying..." 
                    : healthQuery.data?.status ?? "Offline"}
                </span>
              </span>
            </div>
            <button 
              onClick={() => {
                healthQuery.refetch();
                addSimulatedLog("Refetched API health status.");
              }} 
              disabled={healthQuery.isRefetching}
              className="p-1.5 rounded-lg border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-200 transition-all cursor-pointer"
              title="Refresh Connection"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${healthQuery.isRefetching ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 py-8 flex-1 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Interactive Settings / Brand Explorer */}
        <section className="lg:col-span-8 space-y-6">
          
          {/* Dashboard Welcome panel */}
          <div className="glass-surface-hero p-6 rounded-3xl relative overflow-hidden">
            <div className="absolute top-0 right-0 p-6 opacity-5 pointer-events-none">
              <Compass className="w-40 h-40 text-white" />
            </div>
            
            <div className="max-w-xl space-y-2">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full border border-brand-blue/20 bg-brand-blue/5 text-[10px] font-semibold text-brand-blue uppercase tracking-wider">
                <Sparkles className="w-3 h-3" /> Brand Asset Console
              </span>
              <h2 className="text-2xl font-semibold text-white tracking-tight">
                App Identity & Logo Assets
              </h2>
              <p className="text-zinc-400 text-xs leading-relaxed">
                Review and apply brand logo variants to customize the local client telemetry theme. These butterfly vectors represent different phases of Scrum acceleration.
              </p>
            </div>

            {/* Logo showcase Grid */}
            <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {LOGO_OPTIONS.map((logo) => {
                const isSelected = selectedLogo.id === logo.id;
                return (
                  <button
                    key={logo.id}
                    onClick={() => {
                      setSelectedLogo(logo);
                      addSimulatedLog(`Applied active brand theme: ${logo.name}`);
                    }}
                    className={`glass-surface-card p-4 rounded-2xl flex flex-col text-left transition-all duration-300 relative group cursor-pointer border ${
                      isSelected 
                        ? "border-brand-blue bg-brand-blue/[0.03] scale-[1.02] shadow-lg shadow-brand-blue/5" 
                        : "border-white/5 hover:border-white/10 hover:bg-white/[0.01]"
                    }`}
                  >
                    {isSelected && (
                      <span className="absolute top-3 right-3 p-1 rounded-full bg-brand-blue text-white">
                        <Check className="w-3 h-3" />
                      </span>
                    )}
                    <span className="inline-block px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-[9px] text-zinc-400 font-semibold w-fit mb-3">
                      {logo.tag}
                    </span>
                    <div className="flex gap-4 items-center">
                      <div className="w-14 h-14 relative flex-shrink-0 bg-zinc-950/80 rounded-xl p-2 border border-zinc-850 flex items-center justify-center">
                        <Image
                          src={logo.path}
                          alt={logo.name}
                          width={44}
                          height={44}
                          className="object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <div className="space-y-1">
                        <h4 className="text-xs font-semibold text-zinc-200">{logo.name}</h4>
                        <p className="text-[10px] text-zinc-500 line-clamp-2 leading-relaxed">
                          {logo.description}
                        </p>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Reset Button */}
            <div className="mt-4 flex justify-end">
              <button
                onClick={() => {
                  setSelectedLogo({
                    id: "default",
                    name: "Brand Logo (Transparent)",
                    path: "/logo_transparent.png",
                    description: "The primary Chitra Patang identity with a clean transparent backdrop.",
                    tag: "Primary"
                  });
                  addSimulatedLog("Restored primary logo.");
                }}
                disabled={selectedLogo.id === "default"}
                className="text-[10px] font-medium text-zinc-400 hover:text-zinc-200 disabled:text-zinc-600 disabled:cursor-not-allowed transition-colors py-1 px-2.5 rounded-lg border border-zinc-800 bg-zinc-900/30 hover:bg-zinc-900/60 cursor-pointer"
              >
                Reset to Primary Logo
              </button>
            </div>
          </div>

          {/* Interactive tabs */}
          <div className="glass-surface-card rounded-2xl overflow-hidden">
            <div className="flex border-b border-white/5 bg-zinc-950/20 px-4 pt-2 gap-2">
              <button
                onClick={() => setActiveTab("workspace")}
                className={`px-3 py-2 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "workspace"
                    ? "border-brand-blue text-brand-blue"
                    : "border-transparent text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Layout className="w-3.5 h-3.5" /> Client Workspace
              </button>
              <button
                onClick={() => setActiveTab("config")}
                className={`px-3 py-2 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "config"
                    ? "border-brand-blue text-brand-blue"
                    : "border-transparent text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Sliders className="w-3.5 h-3.5" /> Client Configuration
              </button>
              <button
                onClick={() => setActiveTab("logs")}
                className={`px-3 py-2 text-xs font-medium border-b-2 transition-all flex items-center gap-1.5 cursor-pointer ${
                  activeTab === "logs"
                    ? "border-brand-blue text-brand-blue"
                    : "border-transparent text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Terminal className="w-3.5 h-3.5" /> System Logs
              </button>
            </div>

            <div className="p-6">
              {activeTab === "workspace" && (
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold text-zinc-200">Active Desktop Brand Mark</h3>
                  <div className="p-4 rounded-xl border border-white/5 bg-zinc-950/40 flex items-center gap-4">
                    <div className="w-12 h-12 relative flex-shrink-0 bg-zinc-900 border border-zinc-800 rounded-lg p-2 flex items-center justify-center">
                      <Image
                        src={selectedLogo.path}
                        alt="Workspace Active Logo"
                        width={32}
                        height={32}
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-300">{selectedLogo.name}</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5 leading-relaxed">{selectedLogo.description}</p>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 text-xs">
                    <div className="p-3 bg-zinc-900/30 border border-zinc-850 rounded-xl space-y-1">
                      <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">Resolution</span>
                      <p className="text-zinc-200 font-mono">Original (Unmodified)</p>
                    </div>
                    <div className="p-3 bg-zinc-900/30 border border-zinc-850 rounded-xl space-y-1">
                      <span className="text-[9px] text-zinc-500 uppercase tracking-wider font-semibold">Optimization</span>
                      <p className="text-zinc-200 font-mono">Tauri PNG Raster</p>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === "config" && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-300">Auto-inject branding assets</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">Dynamically bundle brand PNGs inside compiling binaries.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      onChange={(e) => addSimulatedLog(`Toggled brand asset injection: ${e.target.checked}`)}
                      className="accent-brand-blue w-4 h-4 rounded border-zinc-850 bg-zinc-950" 
                    />
                  </div>
                  <div className="border-t border-zinc-900 my-2" />
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-xs font-semibold text-zinc-300">Accelerated rendering</h4>
                      <p className="text-[10px] text-zinc-500 mt-0.5">GPU-accelerated vector butterfly transformations.</p>
                    </div>
                    <input 
                      type="checkbox" 
                      defaultChecked 
                      onChange={(e) => addSimulatedLog(`Toggled accelerated rendering: ${e.target.checked}`)}
                      className="accent-brand-blue w-4 h-4 rounded border-zinc-850 bg-zinc-950" 
                    />
                  </div>
                </div>
              )}

              {activeTab === "logs" && (
                <div className="font-mono text-[10px] bg-zinc-950 border border-zinc-850 rounded-xl p-4 space-y-1.5 max-h-[160px] overflow-y-auto">
                  {simulatedLogs.map((log, index) => (
                    <div key={index} className="text-zinc-400 flex items-start gap-2">
                      <span className="text-brand-blue shrink-0">❯</span>
                      <span>{log}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

        </section>

        {/* Right Column: Hero Showcase & Action Center */}
        <section className="lg:col-span-4 space-y-6">
          
          {/* Animated Float Card */}
          <div className="glass-surface-window rounded-3xl p-6 flex flex-col items-center text-center relative overflow-hidden group">
            
            {/* Specular highlights */}
            <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/0 via-brand-blue/5 to-white/5 pointer-events-none" />
            
            {/* Floating brand icon */}
            <div className="w-32 h-32 relative flex items-center justify-center p-4 bg-zinc-950/80 border border-zinc-800 rounded-3xl animate-float filter drop-shadow-[0_0_20px_rgba(0,82,255,0.15)] group-hover:drop-shadow-[0_0_30px_rgba(0,82,255,0.3)] transition-all duration-300 my-6">
              <Image
                src={selectedLogo.path}
                alt="Branding Illustration"
                fill
                priority
                className="object-contain p-4"
              />
            </div>

            <div className="space-y-1">
              <h3 className="text-sm font-semibold text-zinc-100">{selectedLogo.name}</h3>
              <p className="text-[10px] text-zinc-500 uppercase tracking-wider font-semibold">Active Design Asset</p>
            </div>

            <div className="w-full border-t border-zinc-900 my-4" />

            <div className="w-full space-y-3">
              <div className="flex justify-between items-center text-[10px] bg-zinc-950/40 p-2 rounded-lg border border-white/5">
                <span className="text-zinc-500">Asset File:</span>
                <span className="text-zinc-300 font-mono truncate max-w-[150px]">{selectedLogo.path}</span>
              </div>
              <div className="flex justify-between items-center text-[10px] bg-zinc-950/40 p-2 rounded-lg border border-white/5">
                <span className="text-zinc-500">Status:</span>
                <span className="text-emerald-400 font-semibold">Rendered</span>
              </div>
            </div>

            <button
              onClick={() => {
                addSimulatedLog(`Triggered build compilation featuring ${selectedLogo.name}`);
              }}
              className="mt-6 w-full py-2.5 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white text-xs font-semibold shadow-lg shadow-brand-blue/20 transition-all cursor-pointer flex items-center justify-center gap-1.5 select-none"
            >
              <Cpu className="w-3.5 h-3.5" /> Compile Client Bundle
            </button>
          </div>

          {/* Monorepo telemetry panel */}
          <div className="glass-surface-card p-5 rounded-2xl space-y-4">
            <h4 className="text-xs font-semibold text-zinc-300 flex items-center gap-1.5 uppercase tracking-wider">
              <Activity className="w-4 h-4 text-brand-blue" /> shared telemetry
            </h4>
            <div className="space-y-2.5 text-[11px]">
              <div className="flex justify-between items-center p-2 rounded bg-zinc-900/40 border border-zinc-850">
                <span className="text-zinc-500">Shared API Link</span>
                <span className="text-zinc-300 font-mono">trpc-monorepo</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-zinc-900/40 border border-zinc-850">
                <span className="text-zinc-500">Build Target</span>
                <span className="text-zinc-300 font-mono">Tauri v2</span>
              </div>
              <div className="flex justify-between items-center p-2 rounded bg-zinc-900/40 border border-zinc-850">
                <span className="text-zinc-500">Client Engine</span>
                <span className="text-zinc-300 font-mono">Next.js 16</span>
              </div>
            </div>
          </div>

        </section>

      </div>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 py-6 bg-zinc-950/60 mt-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-[10px] text-zinc-650">
          <div>
            &copy; {new Date().getFullYear()} Chitrapatang Terminal. All rights reserved.
          </div>
          <div className="flex items-center gap-4 text-zinc-500">
            <span>Client Version 0.1.0</span>
            <span>•</span>
            <span>Tauri Desktop Host</span>
          </div>
        </div>
      </footer>
    </main>
  );
}