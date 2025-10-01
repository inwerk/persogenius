import { MachineReadableZone } from "@/utils/types";

export function formatMachineReadableZone(
  machineReadableZone: MachineReadableZone,
): string {
  return (
    machineReadableZone.documentCode +
    machineReadableZone.issuingState +
    "<".repeat(2) +
    machineReadableZone.documentId +
    machineReadableZone.documentIdCheckDigit +
    "<".repeat(15) +
    machineReadableZone.birthDate +
    machineReadableZone.birthDateCheckDigit +
    "<".repeat(1) +
    machineReadableZone.expiryDate +
    machineReadableZone.expiryDateCheckDigit +
    machineReadableZone.nationality +
    "<".repeat(2) +
    machineReadableZone.versionNumber +
    "<".repeat(7) +
    machineReadableZone.checkDigit +
    "MUSTERMANN" +
    "<".repeat(2) +
    "ERIKA" +
    "<".repeat(13)
  );
}
