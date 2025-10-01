import { formatMachineReadableZone } from "@/utils/strings";
import { MachineReadableZone } from "@/utils/types";

describe("formatMachineReadableZone", () => {
  it("should format machine readable zone correctly", () => {
    const machineReadableZone: MachineReadableZone = {
      documentCode: "ID",
      issuingState: "D",
      documentId: "LZ6311T47",
      documentIdCheckDigit: "5",
      birthDate: "830812",
      birthDateCheckDigit: "6",
      expiryDate: "340501",
      expiryDateCheckDigit: "9",
      nationality: "D",
      versionNumber: "2405",
      checkDigit: "3",
    };

    const result = formatMachineReadableZone(machineReadableZone);

    const expected =
      "ID" + // documentCode
      "D" + // issuingState
      "<<" + // 2 angle brackets
      "LZ6311T47" + // documentId
      "5" + // documentIdCheckDigit
      "<<<<<<<<<<<<<<<" + // 15 angle brackets
      "830812" + // birthDate
      "6" + // birthDateCheckDigit
      "<" + // 1 angle bracket
      "340501" + // expiryDate
      "9" + // expiryDateCheckDigit
      "D" + // nationality
      "<<" + // 2 angle brackets
      "2405" + // versionNumber
      "<<<<<<<" + // 7 angle brackets
      "3" + // checkDigit
      "MUSTERMANN" + // hardcoded surname
      "<<" + // 2 angle brackets
      "ERIKA" + // hardcoded forename
      "<<<<<<<<<<<<<"; // 13 angle brackets

    expect(result).toBe(expected);
    expect(result.length).toBe(90); // Standard MRZ length for ID-1 format
  });
});
