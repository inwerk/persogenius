"use client";

import { Calendar as CalendarIcon } from "lucide-react";
import * as React from "react";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

interface Calendar22Props {
  value?: Date;
  onChange?: (date: Date | undefined) => void;
  onBlur?: () => void;
  name?: string;
  error?: boolean;
}

export default function Calendar22({
  value,
  onChange,
  error,
}: Calendar22Props) {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            id="date"
            className={`w-full justify-between font-normal ${error ? "border-red-500" : ""}`}
          >
            {value ? value.toLocaleDateString() : "Datum auswählen"}
            <CalendarIcon />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
          <Calendar
            mode="single"
            selected={value}
            captionLayout="dropdown"
            endMonth={new Date(2049, 11)}
            defaultMonth={value || undefined}
            onSelect={(date) => {
              onChange?.(date);
              setOpen(false);
            }}
          />
        </PopoverContent>
      </Popover>
    </div>
  );
}
