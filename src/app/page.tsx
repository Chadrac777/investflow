import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black min-h-screen">
      <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-center py-32 px-16 bg-white dark:bg-black text-center gap-8">
        <h1 className="text-4xl font-bold text-black dark:text-zinc-50">
          InvestFlow Platform
        </h1>
        <p className="text-xl text-zinc-600 dark:text-zinc-400">
          Votre plateforme d'investissement MLM sécurisée.
        </p>
        <div className="flex gap-4">
          <a
            href="/dashboard"
            className="rounded-full bg-blue-600 px-8 py-3 text-white font-medium hover:bg-blue-700 transition-colors"
          >
            Accéder au Dashboard
          </a>
        </div>
      </main>
    </div>
  );
}
