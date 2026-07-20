"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { useAuth } from "~/hooks/use-auth";
import { trpc } from "~/trpc/client";
import { useTheme } from "next-themes";
import Image from "next/image";
import { GridBackground } from "~/components/ui/grid-background";
import {
  Bell,
  User,
  PlusCircle,
  Users,
  ArrowRight,
  LogOut,
  Building2,
  Sparkles,
  Loader2,
  Sun,
  Moon
} from "lucide-react";

// Dynamically import workspace components for code splitting & rendering optimization
const CreateWorkspace = dynamic(() => import("~/components/workspace/CreateWorkspace"), {
  loading: () => (
    <div className="py-8 flex flex-col items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400">
      <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
      <p className="text-xs font-mono">Loading form...</p>
    </div>
  ),
});

const JoinWorkspace = dynamic(() => import("~/components/workspace/JoinWorkspace"), {
  loading: () => (
    <div className="py-8 flex flex-col items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400">
      <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
      <p className="text-xs font-mono">Loading form...</p>
    </div>
  ),
});

type ViewMode = "selection" | "create" | "join";

export default function GetStartedPage() {
  const { user, logout } = useAuth();
  const { theme, setTheme } = useTheme();

  const [viewMode, setViewMode] = useState<ViewMode>("selection");
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Query workspace status for authenticated user
  const { data, isLoading } = trpc.workspace.checkUserWorkspace.useQuery(
    undefined,
    {
      retry: false,
    }
  );

  const inWorkspace = data?.inWorkspace ?? false;
  const workspaces = data?.workspaces ?? [];

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  const handleSelectMode = (mode: ViewMode) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setViewMode(mode);
      setIsTransitioning(false);
    }, 200); // Smooth transition delay
  };

  return (
    <GridBackground>
      
      {/* Header Bar */}
      <header className="relative z-20 w-full px-6 py-4 flex items-center justify-between">
        
        {/* Top Left: Logo acts as Theme Toggle Button */}
        <button
          onClick={toggleTheme}
          title="Click logo to toggle theme"
          className="flex items-center gap-3 cursor-pointer group hover:opacity-90 transition-opacity"
        >
          <div className="relative w-8 h-8 flex items-center justify-center bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-lg p-1.5 overflow-hidden group-hover:border-brand-blue/50 transition-colors shadow-sm">
            <Image
              src="/logo.png"
              alt="Chitrapatang Terminal Logo"
              width={24}
              height={24}
              className="object-contain"
            />
          </div>
          <span className="text-xl font-yatra tracking-wide text-zinc-900 dark:text-zinc-100">
            Chitra<span className="text-brand-blue">patang</span> <span className="text-sm font-sans font-medium text-zinc-500 dark:text-zinc-400">Terminal</span>
          </span>
          <span className="text-[10px] px-2 py-0.5 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 text-zinc-600 dark:text-zinc-400 flex items-center gap-1 group-hover:text-brand-blue transition-colors shadow-sm">
            {theme === "dark" ? <Sun className="w-3 h-3 text-amber-400" /> : <Moon className="w-3 h-3 text-indigo-500" />} Toggle Theme
          </span>
        </button>

        {/* Top Right: Notification & User */}
        <div className="flex items-center gap-3">
          <button
            aria-label="Notifications"
            className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all cursor-pointer shadow-sm"
          >
            <Bell className="w-4 h-4" />
          </button>
          
          <div className="relative group">
            <button
              aria-label="User Profile"
              className="p-2 rounded-full border border-zinc-200 dark:border-zinc-800 bg-white/80 dark:bg-zinc-900/60 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all cursor-pointer flex items-center gap-2 shadow-sm"
            >
              <User className="w-4 h-4" />
            </button>

            {/* User Dropdown */}
            <div className="absolute right-0 mt-2 w-48 py-2 bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-xl shadow-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none group-hover:pointer-events-auto z-50">
              <div className="px-4 py-2 border-b border-zinc-200 dark:border-zinc-800">
                <p className="text-xs font-medium text-zinc-800 dark:text-zinc-200 truncate">{user?.fullName || "User"}</p>
                <p className="text-[10px] text-zinc-500 truncate">{user?.email || ""}</p>
              </div>
              <button
                onClick={logout}
                className="w-full text-left px-4 py-2 text-xs text-rose-600 dark:text-rose-400 hover:bg-zinc-100 dark:hover:bg-zinc-800 flex items-center gap-2 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Half Blurred Background & Modal Card Area */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-6 backdrop-blur-md bg-zinc-100/50 dark:bg-zinc-950/40">
        
        {isLoading ? (
          <div className="flex flex-col items-center gap-3 text-zinc-500 dark:text-zinc-400">
            <Loader2 className="w-8 h-8 animate-spin text-brand-blue" />
            <p className="text-xs font-mono">Checking workspace status...</p>
          </div>
        ) : inWorkspace ? (
          
          /* If User HAS Workspaces: List workspaces card */
          <div className="w-full max-w-xl p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-2xl space-y-6">
            <div className="flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800 pb-4">
              <div>
                <h2 className="text-2xl font-semibold text-zinc-900 dark:text-white">Your Workspaces</h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">Select a workspace to continue into Chitrapatang Terminal</p>
              </div>
              <div className="p-2 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-brand-blue">
                <Building2 className="w-5 h-5" />
              </div>
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {workspaces.map((ws) => (
                <div
                  key={ws.workspaceId}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-zinc-50 dark:bg-zinc-950/50 hover:border-brand-blue/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all flex items-center justify-between group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-blue/10 border border-brand-blue/20 flex items-center justify-center font-bold text-brand-blue">
                      {ws.role.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-900 dark:text-white font-mono">
                        Workspace #{ws.workspaceId.slice(0, 8)}
                      </h3>
                      <span className="text-[11px] text-zinc-600 dark:text-zinc-400 bg-zinc-200/60 dark:bg-zinc-800/60 px-2 py-0.5 rounded-full border border-zinc-300/50 dark:border-zinc-700/50">
                        {ws.role}
                      </span>
                    </div>
                  </div>
                  <button className="px-4 py-2 text-xs font-medium bg-brand-blue text-white rounded-lg group-hover:bg-brand-blue-hover transition-all flex items-center gap-1.5 cursor-pointer">
                    Open <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

        ) : (

          /* If User HAS NO Workspace: Static Welcome Banner + Dynamic Interactive Area */
          <div className="w-full max-w-xl p-8 rounded-3xl border border-zinc-200 dark:border-white/10 bg-white/90 dark:bg-zinc-900/80 backdrop-blur-2xl shadow-2xl space-y-6 text-center">
            
            {/* STATIC WELCOME BANNER (Always remains fixed at top) */}
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-brand-blue/30 bg-brand-blue/10 text-brand-blue text-xs font-medium">
                <Sparkles className="w-3.5 h-3.5" /> AI-Native Agile
              </div>
              
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight text-zinc-900 dark:text-white flex items-center justify-center gap-2">
                Welcome <span className="font-mono text-brand-blue text-xl sm:text-2xl font-bold">(⁠✦⁠‿⁠✦⁠)</span>
              </h2>
              
              <p className="text-xs sm:text-sm text-zinc-600 dark:text-zinc-400">
                To get started, choose whether to create a new workspace or join an existing one.
              </p>
            </div>

            {/* DYNAMIC INTERACTIVE SECTION (Transitions smoothly below welcome banner) */}
            <div className="transition-all duration-300 min-h-[160px] flex flex-col justify-center">
              {isTransitioning ? (
                <div className="py-8 flex flex-col items-center justify-center gap-2 text-zinc-500 dark:text-zinc-400">
                  <Loader2 className="w-6 h-6 animate-spin text-brand-blue" />
                  <p className="text-xs font-mono">Transitioning component...</p>
                </div>
              ) : viewMode === "create" ? (
                <CreateWorkspace onBack={() => handleSelectMode("selection")} />
              ) : viewMode === "join" ? (
                <JoinWorkspace onBack={() => handleSelectMode("selection")} />
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 animate-in fade-in duration-300">
                  <button
                    onClick={() => handleSelectMode("create")}
                    className="p-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-950/60 hover:border-brand-blue/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group shadow-sm"
                  >
                    <div className="p-3 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-brand-blue group-hover:scale-110 transition-transform">
                      <PlusCircle className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-900 dark:text-white">Create a Workspace</h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Set up a new workspace for your team</p>
                    </div>
                  </button>

                  <button
                    onClick={() => handleSelectMode("join")}
                    className="p-5 rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-950/60 hover:border-brand-blue/50 hover:bg-zinc-100 dark:hover:bg-zinc-900 transition-all flex flex-col items-center justify-center gap-3 cursor-pointer group shadow-sm"
                  >
                    <div className="p-3 bg-brand-blue/10 border border-brand-blue/20 rounded-xl text-brand-blue group-hover:scale-110 transition-transform">
                      <Users className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-zinc-900 dark:text-white">Join a Workspace</h3>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400 mt-1">Join with an invite code from your manager</p>
                    </div>
                  </button>
                </div>
              )}
            </div>

          </div>

        )}

      </main>

      {/* Footer */}
      <footer className="relative z-20 w-full px-6 py-4 text-center text-xs text-zinc-500 dark:text-zinc-600">
        &copy; {new Date().getFullYear()} Chitrapatang Terminal. All rights reserved.
      </footer>

    </GridBackground>
  );
}
