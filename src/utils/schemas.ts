import { z } from "zod";

export const IdInfoSchema = z.object({
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
});
