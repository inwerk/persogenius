"use client"

import { getMachineReadableZone } from "@/lib/persogen"
import { useFormState, useWatch } from "react-hook-form"

import type { PersogenFormValues } from "@/components/persogen-form"
import { Textarea } from "@/components/ui/textarea"

export function PersogenOutput() {
  const values = useWatch<PersogenFormValues>()
  const { isValid } = useFormState()
  const output =
    isValid &&
    values?.authorityId &&
    values?.assignedNumber &&
    values?.birthdate &&
    values?.expiryDate &&
    values?.versionNumber
      ? getMachineReadableZone(
          values.authorityId,
          values.assignedNumber,
          values.birthdate,
          values.expiryDate,
          values.versionNumber
        )
      : "Ungültige Eingabe. Bitte prüfe die Eingabefelder auf Fehler."
  const wrappedOutput = output.match(/.{1,30}/g)?.join("\n") ?? output

  return (
    <Textarea
      rows={3}
      cols={30}
      readOnly
      className="resize-none text-center font-mono text-sm"
      value={wrappedOutput}
    />
  )
}
