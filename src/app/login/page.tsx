"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await signIn("credentials", { email, password, redirect: false });

    if (res?.error) {
      setError("Erreur de connexion");
      setLoading(false);
    } else {
      router.push("/dashboard");
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
      <div className="w-full max-w-md border border-zinc-800 p-8 rounded-lg bg-zinc-900">
        <h1 className="text-2xl font-bold mb-6">Connexion InvestFlow</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="email" placeholder="Email" required className="w-full p-2 bg-zinc-800 border-none rounded" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" required className="w-full p-2 bg-zinc-800 border-none rounded" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 p-2 rounded font-bold">
            {loading ? "Connexion..." : "Se connecter"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Pas de compte ? <a href="/register" className="text-blue-400">S'inscrire</a>
        </p>
      </div>
    </div>
  );
}

