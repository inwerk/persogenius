export interface MachineReadableZone {
  readonly documentCode: "ID";
  readonly issuingState: "D";
  readonly documentId: string;
  readonly documentIdCheckDigit: string;
  readonly birthDate: string;
  readonly birthDateCheckDigit: string;
  readonly expiryDate: string;
  readonly expiryDateCheckDigit: string;
  readonly nationality: "D";
  readonly versionNumber: "2108" | "2405";
  readonly checkDigit: string;
}
