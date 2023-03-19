import {
  INITIAL_CITY_COINS_COUNT,
  MAX_X_COORDINATE,
  MAX_Y_COORDINATE,
} from '../../config';
import { City, Country } from '../../types';
import { Input } from '../readInput/readInput';
import { createMatrix } from '../../utils/createMatrix';

export type EU = {
  matrix: City[][];
  countries: Country[];
};

export const prepareInput = (input: Input): EU[] => {
  const EUs: EU[] = input.map(({ countries }) => {
    const matrix = createMatrix<City>(
      MAX_X_COORDINATE + 1,
      MAX_Y_COORDINATE + 1,
      (x, y) => ({
        x,
        y,
        coins: {
          count: {},
        },
        coinsToReceive: {
          count: {},
        },
        country: '',
      }),
    );
    const countriesWithCities = countries.map(country => {
      const cities: City[] = [];
      for (let x = country.xl; x <= country.xh; x++) {
        for (let y = country.yl; y <= country.yh; y++) {
          const city = matrix[x][y];
          cities.push(city);
        }
      }
      return { ...country, cities };
    });

    countriesWithCities.forEach(country => {
      for (let x = country.xl; x <= country.xh; x++) {
        for (let y = country.yl; y <= country.yh; y++) {
          const city = matrix[x][y];
          city.coins.count[country.name] = INITIAL_CITY_COINS_COUNT;
          city.country = country.name;
        }
      }
    });
    return {
      matrix,
      countries: countriesWithCities,
    };
  });

  return EUs;
};
