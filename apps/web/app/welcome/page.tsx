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
    <div className="min-h-screen w-full flex bg-white dark:bg-[#191919] text-zinc-900 dark:text-zinc-100 transition-colors duration-200">
      {/* Theme toggle */}
      <div className="absolute top-6 right-6 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#222] hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer shadow-sm"
          title="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-blue-600" />
          )}
        </button>
      </div>

      {/* Left Column: Form Content */}
      <div className="w-full lg:w-[55%] flex flex-col justify-between p-8 lg:p-12 xl:p-16 min-h-screen">
        {/* Header/Logo */}
        <div className="absolute top-6 left-6 lg:top-8 lg:left-8 xl:top-10 xl:left-10 z-50 flex items-center gap-2.5">
          <Image
            src="/logo.png"
            alt="Chitrapatang Logo"
            width={32}
            height={32}
            className="object-contain"
          />
          <span className="text-xl lg:text-2xl font-yatra tracking-wide text-zinc-900 dark:text-white">
            Chitra<span className="text-blue-600 dark:text-blue-400">patang</span>
          </span>
        </div>

        {/* Center Box */}
        <div className="my-auto max-w-[380px] w-full mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h1 className="text-4xl font-normal tracking-tight font-serif text-zinc-900 dark:text-white">
              {mode === "login" ? "Coordinate what's next" : "Question what's next"}
            </h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              Your agile scrum partner for high-performing teams
            </p>
          </div>

          {/* Form Container Box */}
          <div className="border border-zinc-200 dark:border-zinc-800/80 p-6 rounded-2xl bg-zinc-50/50 dark:bg-[#1f1f1f]/50 space-y-4">
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Smoothly animated Full Name input for Sign Up mode */}
              <div
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  mode === "signup"
                    ? "max-h-28 opacity-100 mb-4"
                    : "max-h-0 opacity-0 pointer-events-none"
                }`}
              >
                <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 mb-1.5 uppercase tracking-wider">
                  <User className="h-3.5 w-3.5" />
                  Full Name
                </label>
                <input
                  type="text"
                  required={mode === "signup"}
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm"
                />
              </div>

              <div className="space-y-1.5 mb-4">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
                  <Mail className="h-3.5 w-3.5" />
                  Email
                </label>
                <input
                  type="email"
                  required
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm"
                />
              </div>

              <div className="space-y-1.5">
                <label className="flex items-center gap-1.5 text-xs font-semibold text-zinc-500 dark:text-zinc-400 uppercase tracking-wider">
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
                    className="w-full px-4 py-3 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-[#1a1a1a] focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all placeholder:text-zinc-400 dark:placeholder:text-zinc-600 text-sm pr-10"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 dark:text-zinc-500 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={mode === "login" ? isLoggingIn : isRegistering}
                className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
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
          <div className="text-center text-sm text-zinc-500 dark:text-zinc-400">
            {mode === "login" ? (
              <>
                Don't have an account?{" "}
                <button
                  onClick={() => setMode("signup")}
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors cursor-pointer"
                >
                  Create account
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  onClick={() => setMode("login")}
                  className="text-blue-600 hover:text-blue-500 dark:text-blue-400 dark:hover:text-blue-300 font-semibold transition-colors cursor-pointer"
                >
                  Sign in
                </button>
              </>
            )}
          </div>

          {/* Download desktop app button */}
          <div className="pt-2 flex justify-center">
            <button className="px-6 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-800 text-xs font-medium hover:bg-zinc-50 dark:hover:bg-zinc-800/40 transition-all cursor-pointer">
              Download desktop app
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-400 dark:text-zinc-500 gap-4">
          <span>&copy; {new Date().getFullYear()} Chitrapatang. All rights reserved.</span>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:underline">Terms of Service</a>
            <a href="#" className="hover:underline">Privacy Policy</a>
          </div>
        </div>
      </div>

      {/* Right Column: Visual Dashboard Preview */}
      <div className="hidden lg:flex w-[45%] items-center justify-center p-8 bg-zinc-50 dark:bg-[#202020]/20 border-l border-zinc-200 dark:border-zinc-900 relative">
        <div className="relative w-full h-[90%] max-h-[700px] rounded-3xl overflow-hidden border border-zinc-200 dark:border-zinc-800/80 shadow-2xl bg-zinc-950">
          <Image
            src="/workspace.png"
            alt="Chitrapatang Agile Scrum Dashboard Preview"
            fill
            className="object-cover"
            priority
          />
        </div>
      </div>
    </div>
  );
}
