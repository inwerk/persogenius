"use client"

import { CheckIcon, CopyIcon } from "lucide-react"
import { useFormState, useWatch } from "react-hook-form"

import type { PersogenFormValues } from "@/components/persogen-form"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupTextarea,
} from "@/components/ui/input-group"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard"
import { getMachineReadableZone } from "@/lib/persogen"

export function PersogenOutput() {
  const { copyToClipboard, isCopied } = useCopyToClipboard()

  const values = useWatch<PersogenFormValues>()
  const { isValid } = useFormState()

  const output =
    isValid &&
    values?.authorityId &&
    values?.assignedNumber &&
    values?.birthdate &&
    values?.expiryDate &&
    values?.versionNumber &&
    values?.surname &&
    values?.prename
      ? getMachineReadableZone(
          values.authorityId,
          values.assignedNumber,
          values.birthdate,
          values.expiryDate,
          values.versionNumber,
          values.surname,
          values.prename
        )
      : "Ungültige Eingabe. Bitte prüfe die Eingabefelder auf Fehler."
  const wrappedOutput = output.match(/.{1,30}/g)?.join("\n") ?? output

  return (
    <InputGroup>
      <InputGroupTextarea
        rows={3}
        cols={30}
        readOnly
        className="resize-none text-center font-mono text-sm"
        value={wrappedOutput}
      />
      <InputGroupAddon align="inline-end">
        <Tooltip
          onOpenChange={(open, eventDetails) => {
            if (!open && eventDetails.reason === "trigger-press") {
              eventDetails.cancel()
            }
          }}
        >
          <TooltipTrigger render={<InputGroupButton />}>
            <InputGroupButton
              variant="ghost"
              size="icon-xs"
              onClick={() => copyToClipboard(wrappedOutput)}
              disabled={!isValid}
            >
              {isCopied ? (
                <CheckIcon className="text-green-500" />
              ) : (
                <CopyIcon />
              )}
            </InputGroupButton>
          </TooltipTrigger>
          <TooltipContent>
            {isCopied
              ? "In die Zwischenablage kopiert"
              : "In die Zwischenablage kopieren"}
          </TooltipContent>
        </Tooltip>
      </InputGroupAddon>
    </InputGroup>
  )
}
