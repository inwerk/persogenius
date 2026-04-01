"use client"

import { GitHubIcon } from "@/components/github-icon"

export function PageFooter() {
  return (
    <footer>
      <div className="row-start-3 flex flex-wrap items-center justify-center gap-6">
        <a
          className="flex items-center gap-2 hover:underline hover:underline-offset-4"
          href="https://github.com/inwerk/persogenius"
          target="_blank"
          rel="noopener noreferrer"
        >
          <GitHubIcon size={16} />
          GitHub
        </a>
      </div>
    </footer>
  )
}
