"use client";

import { useState } from "react";

import AuthCard from "@/components/AuthCard";
import FormInput from "@/components/FormInput";

export default function AuthPage() {
  const [email, setEmail] = useState("");
  const [token, setToken] = useState("");
  const [errors, setErrors] = useState<{ email?: string; token?: string }>({});

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const next: { email?: string; token?: string } = {};
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) next.email = "Enter a valid email.";
    if (token && token.length < 12) next.token = "Token seems too short.";
    setErrors(next);
    if (Object.keys(next).length === 0) {
      console.log("Auth submit", { email, token });
      alert("Auth submitted. Wire backend when ready.");
    }
  }

  return (
    <main className="mx-auto max-w-6xl px-4 py-16 flex items-center justify-center">
      <form onSubmit={onSubmit} className="w-full flex items-center justify-center">
        <AuthCard title="Sign in">
          <FormInput
            label="Email"
            type="email"
            placeholder="you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            hint="We’ll email you a sign-in link or use your API token."
          />
          <FormInput
            label="API Token (optional)"
            type="password"
            placeholder="paste bearer token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            error={errors.token}
            hint="Use if your API requires Authorization: Bearer."
          />
          <button className="mt-2 w-full px-4 py-2 rounded-2xl text-sm font-medium bg-brand-gold text-black hover:opacity-90" type="submit">
            Continue
          </button>
        </AuthCard>
      </form>
    </main>
  );
}
