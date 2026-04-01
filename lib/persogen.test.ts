import { getMachineReadableZone, calculateCheckDigit } from "@/lib/persogen"

describe("calculateCheckDigit", () => {
  it("should return 0 for empty string", () => {
    expect(calculateCheckDigit("")).toBe("0")
  })

  it("should return correct check digit for example document ID", () => {
    expect(calculateCheckDigit("LZ6311T47")).toBe("5")
  })

  it("should return correct check digit for example birthdate", () => {
    expect(calculateCheckDigit("830812")).toBe("6")
  })

  it("should return correct check digit for example expiry date", () => {
    expect(calculateCheckDigit("340501")).toBe("9")
  })

  it("should return correct check digit for example MRZ", () => {
    expect(calculateCheckDigit("LZ6311T475830812634050192405")).toBe("3")
  })
})

describe("getMachineReadableZone", () => {
  it("should return the correct machine-readable zone for given inputs", () => {
    const authorityId = "LZ63"
    const assignedNumber = "11T47"
    const birthDate = new Date("1983-08-12")
    const expiryDate = new Date("2034-05-01")
    const versionNumber = "2405"

    const expectedMRZ =
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
      "<<<<<<<<<<<<<" // 13 angle brackets

    const mrz = getMachineReadableZone(
      authorityId,
      assignedNumber,
      birthDate,
      expiryDate,
      versionNumber
    )

    expect(mrz).toBe(expectedMRZ)
  })
})
