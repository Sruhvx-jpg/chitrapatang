"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "~/hooks/use-auth";
import { useTheme } from "next-themes";
import { Sun, Moon, ArrowLeft, KeyRound } from "lucide-react";
import Link from "next/link";

export default function VerifyEmailPage() {
  const { verifyEmail, isVerifying } = useAuth();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  // Avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem("pending_verify_email");
    if (stored) {
      setEmail(stored);
    }
  }, []);

  if (!mounted) {
    return null;
  }

  const handleOtpChange = (index: number, value: string) => {
    // Only accept numeric inputs
    if (value && !/^\d+$/.test(value)) return;

    const newOtp = [...otp];
    // Take only the last character entered
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 3) {
      inputRefs[index + 1]?.current?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      // Focus previous input on Backspace if current is empty
      if (!otp[index] && index > 0) {
        inputRefs[index - 1]?.current?.focus();
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text");
    if (!/^\d{4}$/.test(pasteData)) return;

    const digits = pasteData.split("");
    setOtp(digits);
    inputRefs[3]?.current?.focus();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = otp.join("");
    if (code.length !== 4) return;
    
    // Fallback email if missing from localStorage
    const verifyEmailAddress = email || localStorage.getItem("pending_verify_email") || "";
    await verifyEmail({ email: verifyEmailAddress, code });
  };

  const isOtpComplete = otp.every(digit => digit !== "");

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-zinc-50 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-50 transition-colors duration-200 p-6 relative">
      {/* Theme toggle & Back button */}
      <div className="absolute top-6 right-6 flex items-center gap-2 z-50">
        <button
          onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          className="p-2.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all cursor-pointer shadow-sm"
          title="Toggle theme"
        >
          {theme === "dark" ? (
            <Sun className="h-5 w-5 text-yellow-500" />
          ) : (
            <Moon className="h-5 w-5 text-blue-600" />
          )}
        </button>
      </div>

      <div className="absolute top-6 left-6 z-50">
        <Link
          href="/login"
          className="flex items-center gap-2 px-4 py-2 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-all text-sm font-medium shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Login
        </Link>
      </div>

      {/* Decorative gradient background glows */}
      <div className="absolute top-1/4 left-1/4 h-[300px] w-[300px] rounded-full bg-blue-500/5 blur-[80px] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-1/4 h-[300px] w-[300px] rounded-full bg-indigo-500/5 blur-[80px] pointer-events-none"></div>

      {/* Card */}
      <div className="max-w-[440px] w-full bg-white dark:bg-zinc-900/60 border border-zinc-200 dark:border-zinc-800/80 rounded-2xl p-8 lg:p-10 shadow-xl backdrop-blur-md">
        <div className="flex flex-col items-center text-center space-y-4 mb-8">
          <div className="h-12 w-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-600 dark:text-blue-400">
            <KeyRound className="h-6 w-6" />
          </div>
          
          <div className="space-y-1.5">
            <h1 className="text-2xl font-semibold tracking-tight">Verify your email</h1>
            <p className="text-zinc-500 dark:text-zinc-400 text-sm">
              We sent a 4-digit verification code to
            </p>
            <p className="font-semibold text-sm text-zinc-800 dark:text-zinc-200">
              {email || "your email address"}
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex justify-center gap-4">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={digit}
                onChange={(e) => handleOtpChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onPaste={index === 0 ? handlePaste : undefined}
                className="w-14 h-16 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950 focus:bg-white dark:focus:bg-zinc-900 focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-center text-2xl font-bold"
              />
            ))}
          </div>

          <button
            type="submit"
            disabled={isVerifying || !isOtpComplete}
            className="w-full py-3.5 px-4 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-medium text-sm transition-all shadow-lg shadow-blue-500/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isVerifying ? "Verifying..." : "Verify email"}
          </button>
        </form>

        <div className="mt-8 text-center text-xs text-zinc-400 dark:text-zinc-500">
          Didn't receive the email? Check your spam folder or try to login again to resend a new code.
        </div>
      </div>
    </div>
  );
}
