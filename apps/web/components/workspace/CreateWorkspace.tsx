"use client";

import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

interface CreateWorkspaceProps {
  onBack: () => void;
}

export default function CreateWorkspace({ onBack }: CreateWorkspaceProps) {
  const [workspaceName, setWorkspaceName] = useState("");

  return (
    <div className="space-y-4 text-left animate-in fade-in duration-300 pt-2">
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold text-zinc-800 dark:text-zinc-300">Create New Workspace</span>
        <button
          onClick={onBack}
          className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100 flex items-center gap-1 cursor-pointer transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Back
        </button>
      </div>

      <div className="space-y-1.5">
        <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">Workspace Name</label>
        <input
          type="text"
          placeholder="e.g. Acme Engineering"
          value={workspaceName}
          onChange={(e) => setWorkspaceName(e.target.value)}
          className="w-full px-4 py-2.5 bg-zinc-100 dark:bg-zinc-950 border border-zinc-300 dark:border-zinc-800 rounded-xl text-sm text-zinc-900 dark:text-zinc-100 placeholder-zinc-400 dark:placeholder-zinc-600 focus:outline-none focus:border-brand-blue transition-colors"
        />
      </div>

      <button
        type="button"
        disabled={!workspaceName.trim()}
        className="w-full py-3 bg-brand-blue hover:bg-brand-blue-hover disabled:opacity-50 text-white rounded-xl text-sm font-medium transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-brand-blue/20 mt-2"
      >
        Initialize Workspace <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
}
