"use client";

import { trpc } from "~/trpc/client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState, useEffect } from "react";

export interface UserMetadata {
  fullName: string;
  email: string;
}

export function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<UserMetadata | null>(null);
  const [loading, setLoading] = useState(true);

  // Initialize user from local storage
  useEffect(() => {
    const stored = localStorage.getItem("user_metadata");
    if (stored) {
      try {
        setUser(JSON.parse(stored));
      } catch (e) {
        // ignore
      }
    }
    setLoading(false);
  }, []);

  const loginMutation = trpc.auth.login.useMutation({
    onSuccess: (data) => {
      if (data.emailVerified) {
        const metadata = { fullName: data.fullName, email: data.email };
        localStorage.setItem("user_metadata", JSON.stringify(metadata));
        setUser(metadata);
        toast.success("Logged in successfully!");
        router.push("/dashboard");
      } else {
        localStorage.setItem("pending_verify_email", data.email);
        toast.warning("Please verify your email address. An OTP has been sent!");
        router.push("/verify-email");
      }
    },
    onError: (err) => {
      toast.error(err.message || "Failed to login");
    },
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: (data) => {
      toast.success("Registration successful! Welcome email sent.");
      const metadata = { fullName: data.username, email: "" };
      localStorage.setItem("user_metadata", JSON.stringify(metadata));
      setUser(metadata);
      router.push("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to register");
    },
  });

  const verifyEmailMutation = trpc.auth.verifyEmail.useMutation({
    onSuccess: (data) => {
      const metadata = { fullName: data.fullName, email: data.email };
      localStorage.setItem("user_metadata", JSON.stringify(metadata));
      setUser(metadata);
      localStorage.removeItem("pending_verify_email");
      toast.success("Email verified successfully!");
      router.push("/dashboard");
    },
    onError: (err) => {
      toast.error(err.message || "Failed to verify email");
    },
  });

  const logout = () => {
    localStorage.removeItem("user_metadata");
    localStorage.removeItem("pending_verify_email");
    setUser(null);
    toast.success("Logged out successfully");
    router.push("/welcome");
  };

  return {
    user,
    loading,
    login: loginMutation.mutateAsync,
    isLoggingIn: loginMutation.isPending,
    register: registerMutation.mutateAsync,
    isRegistering: registerMutation.isPending,
    verifyEmail: verifyEmailMutation.mutateAsync,
    isVerifying: verifyEmailMutation.isPending,
    logout,
  };
}
