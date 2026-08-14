"use client"

import { useCallback, useState } from "react"

const TIMEOUT = 2000

export function useCopyToClipboard() {
  const [isCopied, setIsCopied] = useState(false)

  const copyToClipboard = useCallback(async (value: string) => {
    if (!value) return

    try {
      await navigator.clipboard.writeText(value)
      setIsCopied(true)
      setTimeout(() => {
        setIsCopied(false)
      }, TIMEOUT)
    } catch (error) {
      console.error("Error copying to clipboard:", error)
      setIsCopied(false)
    }
  }, [])

  return { copyToClipboard, isCopied }
}
