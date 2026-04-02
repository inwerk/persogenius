"use client"

import { Controller, useFormContext } from "react-hook-form"
import * as z from "zod"

import { DatePicker } from "@/components/date-picker"
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export const formSchema = z.object({
  authorityId: z
    .string()
    .nonempty({ error: "Die Behördenkennzahl ist erforderlich." })
    .startsWith("L", { error: "Die Behördenkennzahl muss mit L beginnen." })
    .regex(/^[0-9A-Z]+$/, {
      error:
        "Die Behördenkennzahl darf nur aus Zahlen oder Großbuchstaben bestehen.",
    })
    .length(4, { error: "Die Behördenkennzahl muss 4 Zeichen lang sein." }),
  assignedNumber: z
    .string()
    .nonempty({ error: "Die Nummer ist erforderlich." })
    .regex(/^[0-9A-Z]+$/, {
      error: "Die Nummer darf nur aus Zahlen oder Großbuchstaben bestehen.",
    })
    .length(5, { error: "Die Nummer muss 5 Zeichen lang sein." }),
  birthdate: z
    .date()
    .min(new Date("1900-01-01"), {
      error: "Das Geburtsdatum darf nicht vor dem 1. Januar 1900 liegen.",
    })
    .max(new Date(), {
      error: "Das Geburtsdatum darf nicht in der Zukunft liegen.",
    }),
  expiryDate: z
    .date()
    .min(new Date("2024-08-01"), {
      error: "Das Ablaufdatum darf nicht vor dem 1. August 2024 liegen.",
    })
    .max(new Date("2099-12-31"), {
      error: "Das Ablaufdatum liegt zu weit in der Zukunft.",
    }),
  versionNumber: z.enum(["2108", "2405"], {
    error: "Die Versionsnummer ist erforderlich.",
  }),
})

export type PersogenFormValues = z.infer<typeof formSchema>

export function PersogenForm() {
  const form = useFormContext<PersogenFormValues>()

  return (
    <form id="form-rhf-persogen">
      <FieldGroup>
        <Controller
          name="authorityId"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-persogen-authority-id">
                Behördenkennzahl
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-persogen-authority-id"
                aria-invalid={fieldState.invalid}
                type="text"
                autoComplete="off"
                maxLength={4}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="assignedNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-persogen-assigned-number">
                Nummer
              </FieldLabel>
              <Input
                {...field}
                id="form-rhf-persogen-assigned-number"
                aria-invalid={fieldState.invalid}
                type="text"
                autoComplete="off"
                maxLength={5}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="birthdate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-persogen-birthdate">
                Geburtsdatum
              </FieldLabel>
              <DatePicker
                id="form-rhf-persogen-birthdate"
                name={field.name}
                value={field.value}
                onChangeAction={field.onChange}
                onBlurAction={field.onBlur}
                startMonth={new Date(1900, 0)}
                endMonth={new Date(new Date().getFullYear(), 11)}
                ariaInvalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="expiryDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-persogen-expiry-date">
                Ablaufdatum
              </FieldLabel>
              <DatePicker
                id="form-rhf-persogen-expiry-date"
                name={field.name}
                value={field.value}
                onChangeAction={field.onChange}
                onBlurAction={field.onBlur}
                startMonth={new Date(2024, 7)}
                endMonth={new Date(2099, 11)}
                ariaInvalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          name="versionNumber"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-persogen-version-number">
                Versionsnummer
              </FieldLabel>
              <Select
                value={field.value}
                onValueChange={field.onChange}
                name={field.name}
              >
                <SelectTrigger
                  id="form-rhf-persogen-version-number"
                  aria-invalid={fieldState.invalid}
                  onBlur={field.onBlur}
                  className="w-full"
                >
                  <SelectValue placeholder="Version auswählen" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2108">2108</SelectItem>
                  <SelectItem value="2405">2405</SelectItem>
                </SelectContent>
              </Select>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
      </FieldGroup>
    </form>
  )
}
