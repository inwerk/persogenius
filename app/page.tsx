import type { Metadata } from "next"

import { PageFooter } from "@/components/page-footer"
import { PersogenCard } from "@/components/persogen-card"

export const metadata: Metadata = {
  title: "Personalausweisnummern generieren - Persogenius",
  description:
    "Generiere Ausweisnummmern für deutsche Personalausweise. Benutzereingaben bleiben auf dem Gerät und werden nicht an den Server übertragen.",
}

export default function Page() {
  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <div className="flex w-full max-w-sm min-w-0 flex-col gap-4 leading-loose">
        <PersogenCard />
        <PageFooter />
      </div>
    </div>
  )
}
