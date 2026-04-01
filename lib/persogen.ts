export function calculateCheckDigit(str: string): string {
  const multipliers = [7, 3, 1]
  let sum = 0

  for (let i = 0; i < str.length; i++) {
    const value = parseInt(str[i], 36)
    sum += value * multipliers[i % multipliers.length]
  }

  return (sum % 10).toString()
}

function formatMachineReadableZone(
  documentCode: "ID",
  issuingState: "D",
  documentId: string,
  documentIdCheckDigit: string,
  birthDate: string,
  birthDateCheckDigit: string,
  expiryDate: string,
  expiryDateCheckDigit: string,
  nationality: "D",
  versionNumber: "2108" | "2405",
  checkDigit: string
): string {
  return (
    documentCode +
    issuingState +
    "<".repeat(2) +
    documentId +
    documentIdCheckDigit +
    "<".repeat(15) +
    birthDate +
    birthDateCheckDigit +
    "<".repeat(1) +
    expiryDate +
    expiryDateCheckDigit +
    nationality +
    "<".repeat(2) +
    versionNumber +
    "<".repeat(7) +
    checkDigit +
    "MUSTERMANN" +
    "<".repeat(2) +
    "ERIKA" +
    "<".repeat(13)
  )
}

function formatDateYYMMDD(date: Date): string {
  const year = date.getFullYear() % 100
  const month = date.getMonth() + 1
  const day = date.getDate()
  return (
    year.toString().padStart(2, "0") +
    month.toString().padStart(2, "0") +
    day.toString().padStart(2, "0")
  )
}

export function getMachineReadableZone(
  authorityId: string,
  assignedNumber: string,
  birthDate: Date,
  expiryDate: Date,
  versionNumber: "2108" | "2405"
): string {
  const documentCode = "ID"
  const issuingState = "D"
  const documentId = authorityId + assignedNumber
  const documentIdCheckDigit = calculateCheckDigit(documentId)
  const birthDateStr = formatDateYYMMDD(birthDate)
  const birthDateCheckDigit = calculateCheckDigit(birthDateStr)
  const expiryDateStr = formatDateYYMMDD(expiryDate)
  const expiryDateCheckDigit = calculateCheckDigit(expiryDateStr)
  const nationality = "D"
  const checkDigit = calculateCheckDigit(
    documentId +
      documentIdCheckDigit +
      birthDateStr +
      birthDateCheckDigit +
      expiryDateStr +
      expiryDateCheckDigit +
      versionNumber
  )

  return formatMachineReadableZone(
    documentCode,
    issuingState,
    documentId,
    documentIdCheckDigit,
    birthDateStr,
    birthDateCheckDigit,
    expiryDateStr,
    expiryDateCheckDigit,
    nationality,
    versionNumber,
    checkDigit
  )
}

export function getRandomAuthorityId(): string {
  const authorityIds: string[] = [
    "L01X", // Köln
    "L2CJ", // Emden
    "L353", // Sulzbach/Saar
    "L6Z8", // Oberhausen
    "L72G", // Schwalmtal
    "L73Y", // Bonn
    "L79V", // Sankt Augustin
    "L7TH", // Iserlohn
    "L88N", // Heidenheim
    "L933", // Freiburg im Breisgau
  ]
  return authorityIds[Math.floor(Math.random() * authorityIds.length)]
}

export function getRandomAssignedNumber(): string {
  const allowedChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
  let result = ""

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length)
    result += allowedChars[randomIndex]
  }

  return result
}

export function getRandomBirthDate(): Date {
  const birthDate = new Date()
  birthDate.setFullYear(
    birthDate.getFullYear() - 18 - Math.floor(Math.random() * 51)
  )
  birthDate.setDate(birthDate.getDate() - Math.floor(Math.random() * 366))
  return birthDate
}

export function getRandomExpiryDate(): Date {
  const expiryDate = new Date()
  expiryDate.setFullYear(
    expiryDate.getFullYear() + 6 + Math.floor(Math.random() * 3)
  )
  expiryDate.setDate(expiryDate.getDate() + Math.floor(Math.random() * 366))
  return expiryDate
}

export function getRandomVersionNumber(): "2108" | "2405" {
  const versionNumbers: ("2108" | "2405")[] = ["2108", "2405"]
  return versionNumbers[Math.floor(Math.random() * versionNumbers.length)]
}
