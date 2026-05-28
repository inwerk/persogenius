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
  it("should return the correct machine-readable zone for a given input", () => {
    const authorityId = "LZ63"
    const assignedNumber = "11T47"
    const birthDate = new Date("1983-08-12")
    const expiryDate = new Date("2034-05-01")
    const versionNumber = "2405"
    const surname = "Mustermann"
    const prename = "Erika"

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
      "MUSTERMANN" + // surname
      "<<" + // 2 angle brackets
      "ERIKA" + // prename
      "<<<<<<<<<<<<<" // 13 angle brackets

    const mrz = getMachineReadableZone(
      authorityId,
      assignedNumber,
      birthDate,
      expiryDate,
      versionNumber,
      surname,
      prename
    )

    expect(mrz).toBe(expectedMRZ)
  })

  describe.each([
    {
      description: "umlauts in names",
      surname: "Schröder",
      prename: "Jürgen",
      expectedSurname: "SCHROEDER",
      expectedPrename: "JUERGEN",
    },
    {
      description: "eszetts in names",
      surname: "Groß",
      prename: "Fritz",
      expectedSurname: "GROSS",
      expectedPrename: "FRITZ",
    },
    {
      description: "multiple given names separated by spaces",
      surname: "Schmidt",
      prename: "Jason Malte Pascal",
      expectedSurname: "SCHMIDT",
      expectedPrename: "JASON<MALTE<PASCAL",
    },
    {
      description: "compound surnames with hyphen",
      surname: "Müller-Mustermann",
      prename: "Anna",
      expectedSurname: "MUELLERMUSTERMANN",
      expectedPrename: "ANNA",
    },
    {
      description: "surname with spaces",
      surname: "von Neumann",
      prename: "Johann",
      expectedSurname: "VON<NEUMANN",
      expectedPrename: "JOHANN",
    },
    {
      description: "very long surname exceeds max length",
      surname: "Abcdefghijklmnopqrstuvwxyzzzz",
      prename: "Karl",
      expectedSurname: "ABCDEFGHIJKLMNOPQRSTUVWXYZZZ",
      expectedPrename: "",
    },
    {
      description: "very long surname with spaces exceeds max length",
      surname: "von Abcdefghijklmnopqrstuvwxyzzzz",
      prename: "Karl",
      expectedSurname: "ABCDEFGHIJKLMNOPQRSTUVWXYZZZ",
      expectedPrename: "",
    },
  ])(
    "should handle different naming conventions: $description",
    ({ surname, prename, expectedSurname, expectedPrename }) => {
      const authorityId = "LZ63"
      const assignedNumber = "11T47"
      const birthDate = new Date("1983-08-12")
      const expiryDate = new Date("2034-05-01")
      const versionNumber = "2405"

      const mrz = getMachineReadableZone(
        authorityId,
        assignedNumber,
        birthDate,
        expiryDate,
        versionNumber,
        surname,
        prename
      )

      // Extract the name section (last 30 characters)
      // Format: "SURNAME<<PRENAME" padded to 30 chars with "<"
      const nameSection = mrz.slice(-30)
      const [surnameInMRZ, prenameInMRZ] = nameSection.split("<<")

      expect(surnameInMRZ).toBe(expectedSurname)
      expect(prenameInMRZ).toBe(expectedPrename)
    }
  )
})
