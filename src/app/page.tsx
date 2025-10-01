"use client";

import { Persogen } from "@/components/persogen";
import { Github } from "lucide-react";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[0px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:pt-0 sm:p-20">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <Persogen />
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/inwerk/persogenius.de"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Github size={16} aria-hidden />
          GitHub
        </a>
      </footer>
    </div>
  );
}
