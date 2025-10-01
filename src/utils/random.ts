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
  ];
  return authorityIds[Math.floor(Math.random() * authorityIds.length)];
}

export function getRandomAssignedNumber(): string {
  const allowedChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let result = "";

  for (let i = 0; i < 5; i++) {
    const randomIndex = Math.floor(Math.random() * allowedChars.length);
    result += allowedChars[randomIndex];
  }

  return result;
}

export function getRandomBirthDate(): Date {
  const birthDate = new Date();
  birthDate.setFullYear(
    birthDate.getFullYear() - 18 - Math.floor(Math.random() * 51),
  );
  birthDate.setDate(birthDate.getDate() - Math.floor(Math.random() * 366));
  return birthDate;
}

export function getRandomExpiryDate(): Date {
  const expiryDate = new Date();
  expiryDate.setFullYear(
    expiryDate.getFullYear() + 6 + Math.floor(Math.random() * 3),
  );
  expiryDate.setDate(expiryDate.getDate() + Math.floor(Math.random() * 366));
  return expiryDate;
}

export function getRandomVersionNumber(): "2108" | "2405" {
  const versionNumbers: ("2108" | "2405")[] = ["2108", "2405"];
  return versionNumbers[Math.floor(Math.random() * versionNumbers.length)];
}
