"use client";

import { useState, useEffect } from "react";
import { useAuth } from "~/hooks/use-auth";
import { useTheme } from "next-themes";
import { Sun, Moon, Eye, EyeOff, User, Mail, Lock } from "lucide-react";
import Image from "next/image";
export default function WelcomePage() {
  const { login, register, isLoggingIn, isRegistering } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mode, setMode] = useState<"login" | "signup">("login");

  // Form states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (mode === "login") {
      await login({ email, password });
    } else {
      await register({ fullName, email, password });
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-zinc-50 dark:bg-zinc-950 text-zinc-800 dark:text-zinc-100 radial-grid relative overflow-hidden select-none transition-colors duration-300">
      
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 mesh-grid mesh-mask pointer-events-none z-0" />

      {/* Floating Ambient Light Orbs */}
      <div className="absolute top-1/3 left-1/4 -translate-x-1/2 w-[400px] h-[400px] bg-brand-blue/5 rounded-full blur-[100px] pointer-events-none z-0" />

      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-full border border-white/20 dark:border-zinc-800/50 bg-white/20 dark:bg-zinc-950/30 hover:bg-white/30 dark:hover:bg-zinc-900/50 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-100 transition-all cursor-pointer shadow-sm backdrop-blur-lg"
          title="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-blue-400" />
          )}
        </button>
      </div>

      {/* Left Column: Form Content */}
      <div className="w-full lg:w-[55%] flex flex-col justify-between p-8 lg:p-12 xl:p-16 min-h-screen relative z-10">
        
        {/* Header/Logo */}
        <div className="absolute top-6 left-6 lg:top-8 lg:left-8 xl:top-10 xl:left-10 z-50 flex items-center gap-2.5">
          <div className="relative w-8 h-8 flex items-center justify-center bg-white/25 dark:bg-zinc-900/30 border border-white/10 dark:border-zinc-800/50 rounded-lg p-1.5 overflow-hidden shadow-sm backdrop-blur-md">
            <Image
              src="/logo.png"
              alt="Chitra Patang Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-xl lg:text-2xl font-yatra tracking-wide text-zinc-900 dark:text-white">
            Chitra<span className="text-brand-blue">patang</span>
          </span>
        </div>

        {/* Center Box */}
        <div className="my-auto max-w-[380px] w-full mx-auto space-y-6 pt-16">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-normal tracking-tighter text-zinc-900 dark:text-white">
              {mode === "login" ? "Coordinate what's next" : "Question what's next"}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm font-light">
              Your agile scrum partner for high-performing teams
            </p>
          </div>

          {/* Form Container Box */}
          <div className="border border-white/20 dark:border-zinc-800/40 p-6 rounded-2xl bg-white/30 dark:bg-zinc-950/15 backdrop-blur-2xl shadow-xl dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.5)] space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Smoothly animated Full Name input for Sign Up mode */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  mode === "signup"
                    ? "max-h-28 opacity-100 mb-4"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <label className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 mb-1.5 uppercase tracking-wider">
                  <User className="h-3.5 w-3.5" />
                  Full Name
                </label>
                <input
                  type="text"
                  required={mode === "signup"}
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/40 bg-white/40 dark:bg-zinc-950/45 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-450 dark:placeholder:text-zinc-500 text-sm focus:outline-none input-ring focus:bg-white/60 dark:focus:bg-zinc-950/60 transition-all backdrop-blur-md"
                />
              </div>

              <div className="space-y-1.5 mb-4">
                <label className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/40 bg-white/40 dark:bg-zinc-950/45 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-450 dark:placeholder:text-zinc-500 text-sm focus:outline-none input-ring focus:bg-white/60 dark:focus:bg-zinc-950/60 transition-all backdrop-blur-md"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-wider">
                  <Lock className="h-3.5 w-3.5" />
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200/50 dark:border-zinc-800/40 bg-white/40 dark:bg-zinc-950/45 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-450 dark:placeholder:text-zinc-500 text-sm focus:outline-none input-ring focus:bg-white/60 dark:focus:bg-zinc-950/60 transition-all pr-10 backdrop-blur-md"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-650 dark:hover:text-zinc-300 transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={mode === "login" ? isLoggingIn : isRegistering}
                className="w-full py-3.5 px-4 rounded-xl bg-brand-blue hover:bg-brand-blue-hover text-white font-medium text-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2 shadow-lg shadow-brand-blue/15 hover:shadow-brand-blue/25"
              >
                {mode === "login"
                  ? isLoggingIn
                    ? "Signing in..."
                    : "Continue with email"
                  : isRegistering
                    ? "Creating account..."
                    : "Create account"}
              </button>
            </form>
          </div>

          {/* Mode Switcher */}
          <div className="text-center text-sm text-zinc-500">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold transition-colors cursor-pointer"
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-blue-600 dark:text-blue-400 hover:text-blue-500 dark:hover:text-blue-300 font-semibold transition-colors cursor-pointer"
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          {/* Download desktop app button */}
          <div className="pt-2 flex justify-center">
            <button className="px-6 py-2.5 rounded-xl border border-white/10 dark:border-zinc-800/40 bg-white/10 dark:bg-zinc-950/10 text-zinc-600 dark:text-zinc-300 text-xs font-medium hover:bg-white/20 dark:hover:bg-zinc-900/30 hover:text-zinc-900 dark:hover:text-white transition-all cursor-pointer backdrop-blur-md">
              Download desktop app
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 dark:text-zinc-600 gap-4">
          <span>&copy; {new Date().getFullYear()} Chitra Patang. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-zinc-700 dark:hover:text-zinc-400 transition-colors">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Dashboard Preview */}
      <div className="hidden lg:flex w-[45%] items-center justify-center p-8 bg-zinc-100/30 dark:bg-zinc-950/40 border-l border-zinc-200 dark:border-zinc-900 relative z-10 transition-colors duration-300">
        <div className="absolute inset-0 bg-gradient-to-tr from-brand-blue/3 dark:from-brand-blue/5 to-transparent pointer-events-none" />
        <div className="relative w-full h-[90%] max-h-[700px] rounded-3xl overflow-hidden border border-white/10 dark:border-zinc-800/30 shadow-xl dark:shadow-2xl bg-white/10 dark:bg-zinc-950/15 p-2 backdrop-blur-2xl transition-colors duration-300">
          <div className="relative w-full h-full rounded-2xl overflow-hidden border border-zinc-200/50 dark:border-zinc-900/80 transition-colors duration-300">
            <Image
              src="/workspace.png"
              alt="Chitrapatang Agile Scrum Dashboard Preview"
              fill
              className="object-cover opacity-95 dark:opacity-90 transition-opacity duration-300"
              priority
            />
            {/* Subtle overlay gradients for high-end feel */}
            <div className="absolute inset-0 bg-gradient-to-t from-white/40 dark:from-zinc-950/60 via-transparent to-transparent pointer-events-none transition-colors duration-300" />
          </div>
        </div>
      </div>
    </div>
  );
}


