import { calculateCheckDigit } from "@/utils/math";

describe("calculateCheckDigit", () => {
  it("should return 0 for empty string", () => {
    expect(calculateCheckDigit("")).toBe("0");
  });

  it("should return correct check digit for example document ID", () => {
    expect(calculateCheckDigit("LZ6311T47")).toBe("5");
  });

  it("should return correct check digit for example birthdate", () => {
    expect(calculateCheckDigit("830812")).toBe("6");
  });

  it("should return correct check digit for example expiry date", () => {
    expect(calculateCheckDigit("340501")).toBe("9");
  });

  it("should return correct check digit for example MRZ", () => {
    expect(calculateCheckDigit("LZ6311T475830812634050192405")).toBe("3");
  });
});
