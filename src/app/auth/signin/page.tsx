// src/pages/auth/signin.tsx

"use client"; // This is a client-side component

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function SignInPage() {
  const [email, setEmail] = useState("hradmin@test.com");
  const [password, setPassword] = useState("TestPass1234");
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
    <div className="flex min-h-screen w-full flex-col items-center justify-center gap-10 border border-black mx-auto">
      <div className="rounded-xl p-8 md:p-10 mb-28">
        <h1 className="text-5xl text-black mb-8">Login</h1>
        <form onSubmit={handleSubmit} className="flex flex-col w-80">
          <label htmlFor="email" className="text-black">Email</label>
          <input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            autoComplete="email"
            required
            className="rounded-md border border-zinc-800 p-2 mb-6"
          />
          <label htmlFor="password" className="text-black">Password</label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="rounded-md border border-zinc-800 p-2 mb-4"
          />
          <button
            type="submit"
            className="mt-4 rounded-full bg-blue-500 text-white px-4 py-2 transition hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            Login
          </button>
        </form>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
}
