import {
  INITIAL_CITY_COINS_COUNT,
  MAX_X_COORDINATE,
  MAX_Y_COORDINATE,
} from '../config';
import { City, Country } from '../types';
import { Input } from './readInput';

type EU = {
  matrix: City[][];
  countries: Country[];
};

export const prepareInput = (input: Input): EU[] => {
  const EUs: EU[] = input.map(({ countries }) => {
    const matrix: EU['matrix'] = new Array(MAX_X_COORDINATE + 1)
      .fill(null)
      .map((_valX, x) =>
        new Array(MAX_Y_COORDINATE + 1).fill(null).map((_valY, y) => ({
          x,
          y,
          coins: {
            count: {},
          },
        })),
      );
    const countriesWithCities: Country[] = countries.map(country => {
      const cities: City[] = [];
      for (let x = country.xl; x <= country.xh; x++) {
        for (let y = country.yl; y <= country.yh; y++) {
          cities.push(matrix[x][y]);
          matrix[x][y].coins.count[country.name] = INITIAL_CITY_COINS_COUNT;
        }
      }
      return {
        ...country,
        cities,
      };
    });
    return {
      matrix,
      countries: countriesWithCities,
    };
  });

  return EUs;
};
