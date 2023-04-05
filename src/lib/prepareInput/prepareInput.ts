import { City, Country } from '../../types';
import { Input } from '../readInput/readInput';
import { createEUMatrix } from './createEUMatrix';
import { createCountriesWithCities } from './createCountriesWithCities';

export type EU = {
  matrix: City[][];
  countries: Country[];
};

export const prepareInput = (input: Input): EU[] => {
  const EUs: EU[] = input.map(({ countries }) => {
    const matrix = createEUMatrix(countries);
    const countriesWithCities = createCountriesWithCities(countries, matrix);

    return {
      matrix,
      countries: countriesWithCities,
    };
  });

  return EUs;
};
