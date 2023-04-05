import {
  MAX_NUMBER_OF_COUNTRIES,
  MIN_NUMBER_OF_COUNTRIES,
} from '../../../config';

export const checkNumberOfCountries = (n: number): number => {
  if (n > MAX_NUMBER_OF_COUNTRIES) {
    throw new Error(
      `Invalid number of countries: ${n}. Max is ${MAX_NUMBER_OF_COUNTRIES}`,
    );
  }
  return n;
};
