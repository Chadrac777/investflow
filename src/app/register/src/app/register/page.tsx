"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
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
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Erreur");

      router.push("/login");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-black p-4 text-white">
      <div className="w-full max-w-md border border-zinc-800 p-8 rounded-lg bg-zinc-900">
        <h1 className="text-2xl font-bold mb-6">Inscription InvestFlow</h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="text" placeholder="Nom" required className="w-full p-2 bg-zinc-800 border-none rounded" value={name} onChange={e => setName(e.target.value)} />
          <input type="email" placeholder="Email" required className="w-full p-2 bg-zinc-800 border-none rounded" value={email} onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Mot de passe" required className="w-full p-2 bg-zinc-800 border-none rounded" value={password} onChange={e => setPassword(e.target.value)} />
          <button type="submit" disabled={loading} className="w-full bg-blue-600 p-2 rounded font-bold">
            {loading ? "Création..." : "Créer mon compte"}
          </button>
        </form>
        <p className="mt-4 text-center text-sm">
          Déjà inscrit ? <a href="/login" className="text-blue-400">Connexion</a>
        </p>
      </div>
    </div>
  );
}
