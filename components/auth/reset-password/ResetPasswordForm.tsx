"use client";

import React, { useState } from "react";
import { toast } from "sonner";

type ResetPasswordFormProps = {
  token: string;
};

export const ResetPasswordForm: React.FC<ResetPasswordFormProps> = ({ token }) => {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!API_BASE_URL) {
      toast.error("API base URL is not configured.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(`${API_BASE_URL}/api/v1/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Password reset successful! Redirecting to login...");
        setPassword("");
        setConfirmPassword("");
        // Redirect to login after 2 seconds
        setTimeout(() => {
          window.location.href = "/login";
        }, 2000);
      } else {
        toast.error(data.error || "Failed to reset password.");
      }
    } catch (err) {
      toast.error("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md space-y-6">
      <h2 className="text-2xl font-semibold text-gray-700">Reset Your Password</h2>

      <input
        type="password"
        placeholder="New password"
        className="w-full px-4 py-3 border rounded-md"
        minLength={6}
        required
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <input
        type="password"
        placeholder="Confirm new password"
        className="w-full px-4 py-3 border rounded-md"
        minLength={6}
        required
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-blue-700 text-white rounded-md hover:bg-blue-600 transition"
      >
        {loading ? "Resetting..." : "Reset Password"}
      </button>
    </form>
  );
};
