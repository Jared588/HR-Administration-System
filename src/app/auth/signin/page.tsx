// src/pages/auth/signin.tsx

"use client"; // This is a client-side component

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
      callbackUrl: "/",
    });

    if (res?.error) {
      setError("Invalid email or password. Please try again.");
    } else if (res?.ok) {
      // Redirect to the callback URL after successful sign-in
      window.location.href = res.url ?? "/";
    }
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-200 justify-center items-center gap-10 pb-60">
      <h1 className="text-5xl text-black">Sign In</h1>
      <form onSubmit={handleSubmit} className="flex flex-col w-72 gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          autoComplete="email"
          required
          className="border border-zinc-800 rounded-2xl p-1 px-3"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
          className="border border-zinc-800 rounded-2xl p-1 px-3"
        />
        <button type="submit" className="bg-blue-500 rounded-full border border-zinc-800">Go!</button>
      </form>
      {error && <p className="text-red-500">{error}</p>}
    </div>
  );
}
