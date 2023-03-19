import { City, Country } from '../../types';
import { safeGetNumber } from '../../utils';
import { EU } from '../prepareInput';
import { getNeighbors } from './getNeighbors';
import { isCountryCompleted } from './isCountryCompleted';

export type EuroDiffusionResult = {
  countries: (Country & { days: number })[];
};

export const euroDiffusion = (eu: EU): EuroDiffusionResult => {
  const result: EuroDiffusionResult = {
    countries: eu.countries.map(c => ({
      ...c,
      days: -1,
    })),
  };

  let days = 0;
  let done = false;
  do {
    for (let i = 0; i < eu.matrix.length; i++) {
      const row = eu.matrix[i];
      for (let j = 0; j < row.length; j++) {
        const city = row[j];
        const cityCoinsCountries = Object.keys(city.coins.count);
        if (!city.country || cityCoinsCountries.length === 0) {
          continue;
        }
        const neighbors = getNeighbors(eu, i, j);

        for (const motif of cityCoinsCountries) {
          const coinsRepresentativePortion = Math.floor(
            city.coins.count[motif] / 1000,
          );
          if (coinsRepresentativePortion <= 0) {
            continue;
          }
          neighbors.forEach(neighbour => {
            neighbour.coinsToReceive.count[motif] =
              safeGetNumber(neighbour.coinsToReceive.count[motif]) +
              coinsRepresentativePortion;
            city.coins.count[motif] -= coinsRepresentativePortion;
          });
        }
      }
    }
    result.countries = result.countries.map(c => {
      if (isCountryCompleted(c, eu)) {
        return {
          ...c,
          days: c.days > -1 ? c.days : days,
        };
      }
      return c;
    });

    days++;
    done = result.countries.every(c => c.days >= 0);

    for (const row of eu.matrix) {
      for (const city of row) {
        for (const motif of Object.keys(city.coinsToReceive.count)) {
          city.coins.count[motif] =
            safeGetNumber(city.coins.count[motif]) +
            safeGetNumber(city.coinsToReceive.count[motif]);
        }
        city.coinsToReceive = { count: {} };
      }
    }
  } while (!done);

  return result;
};
