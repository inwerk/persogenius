"use client"

import { format } from "date-fns"
import { Calendar as CalendarIcon } from "lucide-react"
import * as React from "react"
import { de } from "react-day-picker/locale"

import { buttonVariants } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"

type DatePickerProps = {
  value?: Date
  onChangeAction?: (date?: Date) => void
  onBlurAction?: React.FocusEventHandler<HTMLButtonElement>
  id?: string
  name?: string
  disabled?: boolean
  startMonth?: Date
  endMonth?: Date
  ariaInvalid?: boolean
}

export function DatePicker({
  value,
  onChangeAction,
  onBlurAction,
  id,
  name,
  disabled,
  startMonth,
  endMonth,
  ariaInvalid,
}: DatePickerProps) {
  const [internalDate, setInternalDate] = React.useState<Date>()
  const date = value ?? internalDate

  const handleSelect = (selected?: Date) => {
    if (onChangeAction) {
      onChangeAction(selected)
    } else {
      setInternalDate(selected)
    }
  }

  return (
    <Popover>
      <PopoverTrigger
        type="button"
        id={id}
        name={name}
        disabled={disabled}
        aria-invalid={ariaInvalid}
        onBlur={onBlurAction}
        data-empty={!date}
        className={cn(
          buttonVariants({ variant: "outline" }),
          "w-full justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
        )}
      >
        <CalendarIcon />
        {date ? (
          format(date, "PPP", { locale: de })
        ) : (
          <span>Datum auswählen</span>
        )}
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          locale={de}
          mode="single"
          selected={date}
          onSelect={handleSelect}
          captionLayout="dropdown"
          startMonth={startMonth ?? undefined}
          endMonth={endMonth ?? undefined}
        />
      </PopoverContent>
    </Popover>
  )
}
