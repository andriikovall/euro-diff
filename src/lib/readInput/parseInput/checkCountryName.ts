import { MAX_COUNTRY_NAME_LENGTH } from "../../../config";

export const checkCountryName = (name: string): string => {
  if (name.length > MAX_COUNTRY_NAME_LENGTH) {
    throw new Error(
      `Invalid country name length: ${name}. Max is ${MAX_COUNTRY_NAME_LENGTH}`,
    );
  }
  return name;
};
