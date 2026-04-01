"use client"

import { siGithub } from "simple-icons"

type GitHubIconProps = {
  size?: number
}

export function GitHubIcon({ size = 16 }: GitHubIconProps) {
  const githubSvg = siGithub.svg.replace(
    "<svg",
    `<svg width="${size}" height="${size}" focusable="false" fill="currentColor" aria-hidden="true"`
  )

  return <span dangerouslySetInnerHTML={{ __html: githubSvg }} />
}
