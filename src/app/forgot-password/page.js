"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail, ArrowRight } from "lucide-react";

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email.trim(),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Something went wrong. Please try again."
        );
      }

      setMessage(data.message);
      setEmail("");
    } catch (error) {
      setError(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-white flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">

        {/* Back */}
        <Link
          href="/login"
          className="inline-flex items-center gap-2 text-sm text-neutral-500 hover:text-black transition mb-10"
        >
          <ArrowLeft size={16} />
          Back to login
        </Link>

        {/* Header */}
        <div className="mb-8">
          <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-100 text-gray-600">
            <Mail size={22} />
          </div>

          <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.03em] text-gray-800">
            Forgot your password?
          </h1>

          <p className="mt-3 text-sm md:text-base leading-6 text-neutral-500">
            No worries. Enter the email address associated
            with your account and we'll send you a link to
            reset your password.
          </p>
        </div>

        {/* Success message */}
        {message && (
          <div className="mb-5 rounded-xl border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
            {message}
          </div>
        )}

        {/* Error message */}
        {error && (
          <div className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-neutral-800"
            >
              Email address
            </label>

            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              required
              autoComplete="email"
              disabled={loading}
              className="w-full rounded-xl border border-neutral-200 bg-white px-4 py-3.5 text-sm outline-none transition placeholder:text-neutral-400 focus:border-black focus:ring-1 focus:ring-black disabled:bg-neutral-50 disabled:cursor-not-allowed"
            />
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-black px-4 py-3.5 text-sm font-medium text-white transition hover:bg-neutral-800 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? "Sending..." : "Send reset link"}

            {!loading && (
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            )}
          </button>
        </form>

        {/* Footer */}
        <p className="mt-8 text-center text-sm text-neutral-500">
          Remember your password?{" "}

          <Link
            href="/login"
            className="font-medium text-black hover:underline"
          >
            Sign in
          </Link>
        </p>
      </div>
    </main>
  );
}