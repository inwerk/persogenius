"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { IdCard } from "lucide-react"
import { FormProvider, useForm } from "react-hook-form"

import { PersogenOutput } from "@/components//persogen-output"
import {
  PersogenForm,
  formSchema,
  type PersogenFormValues,
} from "@/components/persogen-form"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  getRandomAssignedNumber,
  getRandomAuthorityId,
  getRandomBirthDate,
  getRandomExpiryDate,
  getRandomVersionNumber,
} from "@/lib/persogen"
import { Button } from "@/components/ui/button"
import { Dices } from "lucide-react"

export function PersogenCard() {
  const form = useForm<PersogenFormValues>({
    resolver: zodResolver(formSchema),
    mode: "onChange",
    defaultValues: {
      authorityId: getRandomAuthorityId(),
      assignedNumber: getRandomAssignedNumber(),
      birthdate: getRandomBirthDate(),
      expiryDate: getRandomExpiryDate(),
      versionNumber: getRandomVersionNumber(),
    },
  })

  return (
    <FormProvider {...form}>
      <Card>
        <CardHeader>
          <CardTitle>
            <div className="flex items-center gap-2">
              <IdCard />
              Personalausweisnummern
            </div>
          </CardTitle>
          <CardDescription>
            Benutzereingaben bleiben auf dem Gerät und werden nicht an den
            Server übertragen.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <PersogenForm />
          <div className="mt-4 flex justify-center">
            <Button
              onClick={() => {
                form.reset({
                  authorityId: getRandomAuthorityId(),
                  assignedNumber: getRandomAssignedNumber(),
                  birthdate: getRandomBirthDate(),
                  expiryDate: getRandomExpiryDate(),
                  versionNumber: getRandomVersionNumber(),
                })
              }}
            >
              <Dices className="mr-2" />
              Zufällige Werte generieren
            </Button>
          </div>
        </CardContent>
        <CardFooter>
          <PersogenOutput />
        </CardFooter>
      </Card>
    </FormProvider>
  )
}
