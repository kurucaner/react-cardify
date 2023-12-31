import { CARD_PATTERNS } from "@/constants/card-patterns";
import { generateStars } from "./helpers";
import { CardType, CreditCardInfo } from "@/types/input-types";

const formatAmex = (number: string) => {
  if (number.length <= 4) return number;
  if (number.length <= 10) return `${number.slice(0, 4)}-${number.slice(4)}`;
  return `${number.slice(0, 4)}-${number.slice(4, 10)}-${number.slice(10)}`;
};

const formatGeneric = (number: string) => {
  const parts: string[] = [];
  for (let i = 0; i < number.length; i += 4) {
    parts.push(number.slice(i, i + 4));
  }
  return parts.join("-");
};

export const getMaskedCreditCardNumber = (
  value: string,
  cardType: CardType,
  maskCharacter?: string
) => {
  if (!value) return value;
  const number = value.replace(/[^\d]/g, "");
  const length = number.length;
  const maskedNumber = generateStars(length, maskCharacter);
  switch (cardType) {
    case "AX":
      return formatAmex(maskedNumber);
    case "VI":
    case "MC":
    case "DI":
    case "JCB":
    case "DC":
    case "UP":
    case "Unknown":
      return formatGeneric(maskedNumber);
    default:
      return number;
  }
};

const detectCardType = (number: string): CardType => {
  for (let type in CARD_PATTERNS) {
    if (CARD_PATTERNS[type as CardType]?.test(number)) return type as CardType;
  }
  return "Unknown";
};

export const formatCreditCardNumber = (
  value?: string | null
): CreditCardInfo => {
  if (!value || typeof value !== "string") {
    return { cardNumber: "", cardType: "Unknown" };
  }

  const creditCardNumber = value.replace(/[^\d]/g, "");
  const cardType = detectCardType(creditCardNumber);

  switch (cardType) {
    case "AX":
      return { cardNumber: formatAmex(creditCardNumber) || "", cardType };
    case "VI":
    case "MC":
    case "DI":
    case "JCB":
    case "DC":
    case "UP":
    case "Unknown":
      return { cardNumber: formatGeneric(creditCardNumber), cardType };
    default:
      return { cardNumber: creditCardNumber, cardType };
  }
};
