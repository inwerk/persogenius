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
  checkDigit: string,
  surname: string,
  prename: string
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
    (surname + "<<" + prename).padEnd(30, "<")
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

function normalizeName(name: string): string {
  return name
    .toUpperCase()
    .replace(/Ä/g, "AE")
    .replace(/Ö/g, "OE")
    .replace(/Ü/g, "UE")
    .replace(/ß/g, "SS")
    .replace(/-/g, "")
    .replace(/ /g, "<")
}

function truncateNameFromLeft(name: string, maxLen: number): string {
  const parts = name.split("<")
  let result = parts[parts.length - 1].substring(0, maxLen)
  for (let i = parts.length - 2; i >= 0; i--) {
    const candidate = `${parts[i]}<${result}`
    if (candidate.length > maxLen) break
    result = candidate
  }
  return result
}

function truncateNameFromRight(name: string, maxLen: number): string {
  const parts = name.split("<")
  let result = ""
  for (let i = 0; i < parts.length; i++) {
    const candidate = `${result}${result ? "<" : ""}${parts[i]}`
    if (candidate.length <= maxLen) result = candidate
  }
  return result || name.substring(0, maxLen)
}

export function getMachineReadableZone(
  authorityId: string,
  assignedNumber: string,
  birthDate: Date,
  expiryDate: Date,
  versionNumber: "2108" | "2405",
  surname: string,
  prename: string
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
  const surnameStr = truncateNameFromLeft(normalizeName(surname), 30 - 2)
  const prenameStr = truncateNameFromRight(
    normalizeName(prename),
    30 - surnameStr.length - 2
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
    checkDigit,
    surnameStr,
    prenameStr
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
  return "2405" // only return the latest version
}

export function getRandomSurname(): string {
  const surnames: string[] = [
    "Becker",
    "Fischer",
    "Hoffmann",
    "Keller",
    "Klein",
    "Meyer",
    "Schäfer",
    "Schmidt",
    "Wagner",
    "Weber",
  ]
  return surnames[Math.floor(Math.random() * surnames.length)]
}

export function getRandomPrename(): string {
  const prenames: string[] = [
    "Alexander",
    "Anna",
    "Charlotte",
    "Elisabeth",
    "Friedrich",
    "Johanna",
    "Karl",
    "Katharina",
    "Ludwig",
    "Siegfried",
  ]
  return prenames[Math.floor(Math.random() * prenames.length)]
}
