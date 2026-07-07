"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [referrerCode, setReferrerCode] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name, referrerCode }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Une erreur est survenue");
      }

      router.push("/auth/signin");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-950 p-4">
      <div className="w-full max-w-md rounded-xl bg-zinc-900 p-8 shadow-2xl border border-zinc-800">
        <h1 className="text-2xl font-bold text-white mb-2">Créez votre compte</h1>
        <p className="text-zinc-400 mb-6">Saisissez vos informations pour rejoindre InvestFlow.</p>
        
        {error && (
          <div className="mb-4 rounded-lg bg-red-500/10 p-3 text-sm text-red-500 border border-red-500/20">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Nom complet</label>
            <input
              type="text"
              required
              className="w-full rounded-lg bg-zinc-800 border-zinc-700 text-white p-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">E-mail</label>
            <input
              type="email"
              required
              className="w-full rounded-lg bg-zinc-800 border-zinc-700 text-white p-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Mot de passe</label>
            <input
              type="password"
              required
              className="w-full rounded-lg bg-zinc-800 border-zinc-700 text-white p-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-zinc-300 mb-1">Code de parrainage (Optionnel)</label>
            <input
              type="text"
              placeholder="Ex: ADMINFLOW"
              className="w-full rounded-lg bg-zinc-800 border-zinc-700 text-white p-2.5 focus:ring-2 focus:ring-blue-600 outline-none"
              value={referrerCode}
              onChange={(e) => setReferrerCode(e.target.value)}
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-blue-600 p-3 font-semibold text-white hover:bg-blue-700 transition-colors disabled:opacity-50"
          >
            {loading ? "Création..." : "S'inscrire"}
          </button>
        </form>
        
        <p className="mt-6 text-center text-sm text-zinc-400">
          Déjà un compte ?{" "}
          <a href="/auth/signin" className="text-blue-500 hover:underline">
            Connectez-vous
          </a>
        </p>
      </div>
    </div>
  );
}
