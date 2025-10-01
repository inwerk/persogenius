import "client-only";

import Calendar22 from "@/components/calendar-22";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { calculateCheckDigit } from "@/utils/math";
import {
  getRandomAssignedNumber,
  getRandomAuthorityId,
  getRandomBirthDate,
  getRandomExpiryDate,
  getRandomVersionNumber,
} from "@/utils/random";
import { IdInfoSchema } from "@/utils/schemas";
import { formatMachineReadableZone } from "@/utils/strings";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dices, IdCard, Play, RotateCcw } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export function Persogen() {
  const [mrzDisplay, setMrzDisplay] = useState("");

  const form = useForm<z.infer<typeof IdInfoSchema>>({
    resolver: zodResolver(IdInfoSchema),
    defaultValues: {
      authorityId: "LZ63",
      assignedNumber: "11T47",
      birthdate: new Date("1983-08-12"),
      expiryDate: new Date("2034-05-01"),
      versionNumber: "2405",
    },
  });

  function generateMrz(values: z.infer<typeof IdInfoSchema>) {
    const year = values.birthdate.getFullYear().toString().slice(2);
    const month = (values.birthdate.getMonth() + 1).toString().padStart(2, "0");
    const day = values.birthdate.getDate().toString().padStart(2, "0");
    const newBirthDate = year + month + day;
    const expYear = values.expiryDate.getFullYear().toString().slice(2);
    const expMonth = (values.expiryDate.getMonth() + 1)
      .toString()
      .padStart(2, "0");
    const expDay = values.expiryDate.getDate().toString().padStart(2, "0");
    const newExpiryDate = expYear + expMonth + expDay;
    const newMrz = formatMachineReadableZone({
      documentCode: "ID",
      issuingState: "D",
      documentId: values.authorityId + values.assignedNumber,
      documentIdCheckDigit: calculateCheckDigit(
        values.authorityId + values.assignedNumber
      ),
      birthDate: newBirthDate,
      birthDateCheckDigit: calculateCheckDigit(newBirthDate),
      expiryDate: newExpiryDate,
      expiryDateCheckDigit: calculateCheckDigit(newExpiryDate),
      nationality: "D",
      versionNumber: values.versionNumber,
      checkDigit: calculateCheckDigit(
        values.authorityId +
          values.assignedNumber +
          calculateCheckDigit(values.authorityId + values.assignedNumber) +
          newBirthDate +
          calculateCheckDigit(newBirthDate) +
          newExpiryDate +
          calculateCheckDigit(newExpiryDate) +
          values.versionNumber
      ),
    });
    const formattedNewMrz = newMrz.match(/.{1,30}/g)?.join("\n") || "";
    setMrzDisplay(formattedNewMrz);
  }

  function onReset() {
    form.reset();
  }

  function onRandom() {
    form.setValue("authorityId", getRandomAuthorityId());
    form.setValue("assignedNumber", getRandomAssignedNumber());
    form.setValue("birthdate", getRandomBirthDate());
    form.setValue("expiryDate", getRandomExpiryDate());
    form.setValue("versionNumber", getRandomVersionNumber());
  }

  function onSubmit(values: z.infer<typeof IdInfoSchema>) {
    generateMrz(values);
  }

  useEffect(() => {
    onRandom();
    generateMrz(form.getValues());
  }, []);

  return (
    <Card className="w-full max-w-sm justify-self-start">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <IdCard />
          Personalausweisnummern
        </CardTitle>
        <CardDescription>
          Benutzereingaben bleiben auf dem Gerät und werden nicht an den Server
          übertragen.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <FormField
              control={form.control}
              name="authorityId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Behördenkennzahl</FormLabel>
                  <FormControl>
                    <Input type="text" maxLength={4} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="assignedNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nummer</FormLabel>
                  <FormControl>
                    <Input type="text" maxLength={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="birthdate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Geburtsdatum</FormLabel>
                  <FormControl>
                    <Calendar22
                      error={!!form.formState.errors.birthdate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="expiryDate"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ablaufdatum</FormLabel>
                  <FormControl>
                    <Calendar22
                      error={!!form.formState.errors.expiryDate}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="versionNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Versionsnummer</FormLabel>
                  <FormControl>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <SelectTrigger className="w-full">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2108">2108</SelectItem>
                        <SelectItem value="2405">2405</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex-col gap-2">
              <div className="flex gap-2 mb-3">
                <Button
                  variant="outline"
                  className="flex-1 justify-start gap-2"
                  onClick={onRandom}
                >
                  <Dices />
                  Zufällig
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 justify-start gap-2"
                  onClick={onReset}
                >
                  <RotateCcw />
                  Zurücksetzen
                </Button>
              </div>
              <Button type="submit" className="w-full justify-start gap-2">
                <Play />
                Ausweisnummer generieren
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
      <CardFooter className="flex-col gap-2">
        <Textarea
          rows={3}
          cols={30}
          readOnly
          className="font-mono text-sm resize-none"
          value={mrzDisplay}
        />
      </CardFooter>
    </Card>
  );
}
