"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, useReducedMotion, AnimatePresence } from "framer-motion";
import { 
  Sparkles, 
  Terminal, 
  ShieldAlert, 
  ArrowRight, 
  CheckCircle2, 
  AlertCircle, 
  Github, 
  Twitter, 
  Cpu, 
  Layers, 
  Activity 
} from "lucide-react";

export default function ComingSoonPage() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [message, setMessage] = useState("");
  const prefersReducedMotion = useReducedMotion();

  // Magnetic button reference and state
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [coords, setCoords] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!buttonRef.current || prefersReducedMotion) return;
    const rect = buttonRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    // Limit pull to 12px
    setCoords({ x: x * 0.35, y: y * 0.35 });
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCoords({ x: 0, y: 0 });
  };

  // Waitlist submission handler
  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    // Client-side validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus("error");
      if (!email.includes("@")) {
        setMessage(`Please include an '@' in the email address. '${email}' is missing an '@'.`);
      } else {
        setMessage("Please enter a valid email address.");
      }
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage(data.message || "You're on the list! We will be in touch soon.");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");
      setMessage("Failed to reach server. Please check your connection.");
    }
  };

  return (
    <div className="relative min-h-screen w-full overflow-x-hidden bg-brand-dark radial-grid flex flex-col justify-between selection:bg-brand-blue/30 selection:text-blue-200">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 mesh-grid mesh-mask pointer-events-none z-0" />

      {/* Floating Ambient Light Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-brand-blue/5 rounded-full blur-[120px] pointer-events-none z-0 animate-pulse-slow" />

      {/* Header */}
      <header className="sticky top-0 z-50 w-full glass-surface-nav transition-all duration-300">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 flex items-center justify-center bg-zinc-900 border border-zinc-800 rounded-lg p-1.5 overflow-hidden">
              <Image
                src="/logo.png"
                alt="Chitra Patang Logo"
                width={24}
                height={24}
                className="object-contain"
              />
            </div>
            <span className="text-xl font-yatra tracking-wide text-zinc-100">
              Chitra<span className="text-brand-blue">patang</span>
            </span>
          </div>

          <div className="flex items-center gap-4">
            <span className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-brand-blue/20 bg-brand-blue/5 text-[11px] font-medium tracking-wider text-brand-blue uppercase">
              <Cpu className="w-3.5 h-3.5" /> AI-Native Agile
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              aria-label="GitHub Repository"
              className="p-2 rounded-full border border-zinc-800 bg-zinc-900/50 hover:bg-zinc-900 text-zinc-400 hover:text-zinc-100 transition-all"
            >
              <Github className="w-4 h-4" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero & Waitlist Section */}
      <main className="relative z-10 w-full max-w-7xl mx-auto px-6 py-12 md:py-16 flex flex-col items-center text-center flex-1 justify-center">
        
        {/* Animated Brand Butterfly Hero Moment */}
        <motion.div
          initial={prefersReducedMotion ? { opacity: 1, scale: 1 } : { opacity: 0, y: -20, scale: 0.95 }}
          animate={{ 
            opacity: 1, 
            y: 0, 
            scale: 1,
            ...(prefersReducedMotion ? {} : {
              y: [0, -10, 0]
            })
          }}
          transition={{
            y: {
              repeat: Infinity,
              duration: 6,
              ease: "easeInOut"
            },
            default: {
              duration: 1,
              ease: [0.16, 1, 0.3, 1]
            }
          }}
          className="mb-8 relative w-24 h-24 filter drop-shadow-[0_0_25px_rgba(0,82,255,0.4)]"
        >
          <Image
            src="/logo.png"
            alt="Chitra Patang Icon"
            fill
            priority
            className="object-contain"
          />
        </motion.div>

        {/* Confident Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-sans font-medium tracking-tighter text-white max-w-4xl"
        >
          Agile, without the management.
        </motion.h1>

        {/* Supporting Line */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-6 text-base sm:text-lg md:text-xl text-zinc-300/90 max-w-2xl leading-relaxed"
        >
          The first AI-first Scrum platform. We automate standups, refine backlogs, and predict sprint blockers before they impact your team.
        </motion.p>

        {/* Waitlist Capture Form */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-10 w-full max-w-lg glass-surface-hero p-6 rounded-2xl relative"
        >
          <form onSubmit={handleSubscribe} noValidate className="relative w-full flex flex-col sm:flex-row gap-2">
            <div className="relative flex-1 group">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (status === "error" || status === "success") {
                    setStatus("idle");
                    setMessage("");
                  }
                }}
                placeholder="Enter your work email"
                disabled={status === "loading" || status === "success"}
                aria-label="Email address for waitlist"
                className="w-full px-4 py-3 rounded-xl border border-white/5 bg-zinc-950/60 text-zinc-100 placeholder:text-zinc-500 text-sm focus:outline-none input-ring transition-all disabled:opacity-50"
              />
            </div>

            <button
              ref={buttonRef}
              type="submit"
              disabled={status === "loading" || status === "success"}
              onMouseMove={handleMouseMove}
              onMouseEnter={() => setIsHovered(true)}
              onMouseLeave={handleMouseLeave}
              style={{
                transform: isHovered ? `translate3d(${coords.x}px, ${coords.y}px, 0)` : "translate3d(0, 0, 0)",
                transition: isHovered ? "none" : "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1)"
              }}
              className="relative px-6 py-3 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-lg shadow-brand-blue/15 hover:shadow-brand-blue/25 disabled:opacity-50 disabled:cursor-not-allowed select-none"
            >
              {status === "loading" ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : status === "success" ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <>
                  Join Waitlist <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {/* Inline Feedbacks */}
          <AnimatePresence mode="wait">
            {message && (
              <motion.div
                initial={{ opacity: 0, y: 8, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 8, scale: 0.95 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className={`mt-4 p-3.5 rounded-xl border backdrop-blur-xl flex items-center gap-3 text-xs shadow-xl transition-all ${
                  status === "success" 
                    ? "bg-emerald-950/20 border-emerald-500/20 text-emerald-300 shadow-emerald-950/5" 
                    : "bg-rose-950/20 border-rose-500/20 text-rose-300 shadow-rose-950/5"
                }`}
              >
                {status === "success" ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                )}
                <span className="text-left leading-normal">{message}</span>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Product Tease (Dashboard silhouette) */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="mt-16 md:mt-24 w-full max-w-5xl rounded-3xl glass-surface-window p-2 md:p-3 relative overflow-hidden"
        >
          {/* Glass dashboard preview constructed via CSS */}
          <div className="rounded-2xl border border-white/5 bg-zinc-950/30 overflow-hidden relative aspect-[1.7] flex flex-col">
            
            {/* Mock Header */}
            <div className="h-11 border-b border-white/5 px-4 flex items-center justify-between bg-zinc-950/20">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-zinc-800" />
                <span className="w-3 h-3 rounded-full bg-zinc-800" />
                <span className="w-3 h-3 rounded-full bg-zinc-800" />
              </div>
              <div className="w-32 h-5 bg-zinc-800/40 rounded-md border border-zinc-850" />
              <div className="w-16 h-5 bg-zinc-800/40 rounded-md border border-zinc-850" />
            </div>

            {/* Dashboard Workspace */}
            <div className="flex-1 flex p-4 gap-4 overflow-hidden relative">
              
              {/* Sidebar */}
              <div className="w-1/4 hidden md:flex flex-col gap-3 pr-2 border-r border-zinc-800/30">
                <div className="h-7 bg-zinc-850/50 rounded-lg w-full" />
                <div className="h-6 bg-zinc-900/30 rounded-lg w-4/5" />
                <div className="h-6 bg-zinc-900/30 rounded-lg w-5/6" />
                <div className="h-6 bg-zinc-900/30 rounded-lg w-3/4" />
                <div className="h-32 bg-brand-blue/5 border border-brand-blue/10 rounded-xl p-3 mt-auto flex flex-col justify-between">
                  <div className="flex items-center gap-1.5 text-[10px] text-blue-400 font-medium tracking-wide uppercase">
                    <Activity className="w-3.5 h-3.5" /> telemetry
                  </div>
                  <div className="text-[11px] font-medium text-zinc-200 leading-tight">
                    Sprint success likelihood is 94.2%.
                  </div>
                  <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-brand-blue w-[94.2%] h-full rounded-full" />
                  </div>
                </div>
              </div>

              {/* Board Area */}
              <div className="flex-1 flex gap-3 overflow-hidden">
                {/* Column 1 */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="h-5 bg-zinc-850/40 rounded-md w-12" />
                  <div className="flex-1 border border-zinc-800/40 bg-zinc-900/20 rounded-xl p-3 flex flex-col gap-2">
                    <div className="h-16 bg-zinc-900/80 rounded-lg border border-zinc-850/60 p-2.5 flex flex-col gap-1.5">
                      <div className="h-3 bg-zinc-800 rounded w-5/6" />
                      <div className="h-2.5 bg-zinc-850 rounded w-1/2" />
                    </div>
                    <div className="h-16 bg-zinc-900/80 rounded-lg border border-zinc-850/60 p-2.5 flex flex-col gap-1.5">
                      <div className="h-3 bg-zinc-800 rounded w-3/4" />
                      <div className="h-2.5 bg-zinc-850 rounded w-2/3" />
                    </div>
                  </div>
                </div>

                {/* Column 2 */}
                <div className="flex-1 flex flex-col gap-3">
                  <div className="h-5 bg-zinc-850/40 rounded-md w-16" />
                  <div className="flex-1 border border-zinc-800/40 bg-zinc-900/20 rounded-xl p-3 flex flex-col gap-2 relative">
                    
                    {/* Blocker alert - key feature showcase */}
                    <div className="absolute inset-x-2 top-2 z-10 bg-zinc-950/90 border border-blue-900/40 shadow-xl shadow-blue-950/20 rounded-xl p-3 flex flex-col gap-2 backdrop-blur-md">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-1 text-[10px] text-blue-400 font-semibold uppercase tracking-wider">
                          <ShieldAlert className="w-3.5 h-3.5 text-blue-400" /> telemetry alert
                        </span>
                        <span className="text-[9px] text-zinc-500 font-mono">Just Now</span>
                      </div>
                      <p className="text-[11px] text-zinc-200 font-normal leading-normal text-left">
                        API validation conflict detected in <span className="font-mono text-blue-400 bg-blue-950/40 border border-blue-900/30 px-1.5 py-0.5 rounded">auth/route.ts</span>. 2 developers overlapping on lines 38-42.
                      </p>
                      <div className="flex gap-1.5">
                        <button className="flex-1 py-1 rounded bg-brand-blue text-[9px] text-white font-medium hover:bg-brand-blue-hover transition-colors">
                          Auto-resolve merge
                        </button>
                        <button className="px-2 py-1 rounded border border-zinc-850 text-[9px] text-zinc-400 hover:text-zinc-200 transition-colors">
                          Ignore
                        </button>
                      </div>
                    </div>

                    <div className="h-16 bg-zinc-900/40 rounded-lg border border-zinc-850/30 p-2.5 flex flex-col gap-1.5 opacity-40">
                      <div className="h-3 bg-zinc-800 rounded w-5/6" />
                      <div className="h-2.5 bg-zinc-850 rounded w-1/2" />
                    </div>
                  </div>
                </div>

                {/* Column 3 */}
                <div className="flex-1 hidden sm:flex flex-col gap-3">
                  <div className="h-5 bg-zinc-850/40 rounded-md w-10" />
                  <div className="flex-1 border border-zinc-800/40 bg-zinc-900/20 rounded-xl p-3 flex flex-col gap-2">
                    <div className="h-16 bg-zinc-900/80 rounded-lg border border-zinc-850/60 p-2.5 flex flex-col gap-1.5">
                      <div className="h-3 bg-zinc-800 rounded w-4/5" />
                      <div className="h-2.5 bg-zinc-850 rounded w-1/3" />
                    </div>
                  </div>
                </div>

              </div>

            </div>

            {/* Frost Overlay to obscure details */}
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/30 to-transparent pointer-events-none" />
            <div className="absolute inset-x-0 bottom-0 h-2/3 bg-zinc-950/80 backdrop-blur-[4px] border-t border-zinc-900 flex flex-col justify-end p-8 text-center">
              <div className="max-w-md mx-auto space-y-2">
                <h3 className="text-zinc-100 font-medium text-base">Explore the full workspace this fall</h3>
                <p className="text-zinc-500 text-xs leading-normal">
                  Chitra Patang bridges telemetry and execution. Experience real-time blockers forecasting, autogenerated sprint retros, and zero friction.
                </p>
              </div>
            </div>

          </div>
        </motion.div>

      </main>

      {/* Value Props Section */}
      <section className="relative z-10 border-t border-zinc-900/60 bg-zinc-950/40 py-16">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="glass-surface-card p-6 rounded-2xl flex flex-col gap-4 text-left transition-all hover:scale-[1.01] hover:border-white/10 duration-300">
            <div className="p-3 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-brand-blue w-fit">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-zinc-250">AI Standup Pilot</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                Async status aggregation. Standups are continuously ran, compiled, and mapped to blockers without scheduling meetings.
              </p>
            </div>
          </div>

          <div className="glass-surface-card p-6 rounded-2xl flex flex-col gap-4 text-left transition-all hover:scale-[1.01] hover:border-white/10 duration-300">
            <div className="p-3 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-brand-blue w-fit">
              <Layers className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-zinc-250">Autopilot Backlog Refinement</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                User stories are automatically generated, tickets refined, and difficulty estimated from code changes.
              </p>
            </div>
          </div>

          <div className="glass-surface-card p-6 rounded-2xl flex flex-col gap-4 text-left transition-all hover:scale-[1.01] hover:border-white/10 duration-300">
            <div className="p-3 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-brand-blue w-fit">
              <Activity className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-zinc-250">Continuous Risk Telemetry</h4>
              <p className="text-xs text-zinc-500 leading-relaxed">
                We monitor sprint development telemetry to forecast delay risks and alert overlaps before a single conflict commit is made.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-zinc-900 py-8 bg-zinc-950/60">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-600">
          <div>
            &copy; {new Date().getFullYear()} Chitra Patang. All rights reserved.
          </div>
          
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-zinc-300 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-zinc-300 transition-colors">Terms of Service</a>
            <a 
              href="https://twitter.com" 
              target="_blank" 
              rel="noreferrer" 
              className="hover:text-zinc-300 transition-colors flex items-center gap-1"
            >
              <Twitter className="w-3.5 h-3.5" /> Twitter
            </a>
          </div>
        </div>
      </footer>

    </div>
  );
}
