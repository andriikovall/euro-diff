import { City, Country } from '../../types';
import { EU } from '../prepareInput';
import { isCountryCompleted } from './isCountryCompleted';

export type EuroDiffusionResult = {
  countries: { name: string; days: number }[];
};

export const euroDiffusion = (eu: EU): EuroDiffusionResult => {
  const result: EuroDiffusionResult = {
    countries: eu.countries.map(c => ({
      name: c.name,
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
        const neighbours = [
          eu.matrix?.[i - 1]?.[j],
          eu.matrix?.[i + 1]?.[j],
          eu.matrix?.[i]?.[j - 1],
          eu.matrix?.[i]?.[j + 1],
        ].filter(n => n?.country) as City[];
        for (const motif of cityCoinsCountries) {
          const coinsRepresentativePortion = Math.floor(
            city.coins.count[motif] / 1000,
          );
          if (coinsRepresentativePortion <= 0) {
            continue;
          }
          neighbours.forEach(neighbour => {
            neighbour.coinsToReceive.count[motif] =
              (neighbour.coinsToReceive.count[motif] || 0) +
              coinsRepresentativePortion;
            city.coins.count[motif] -= coinsRepresentativePortion;
          });
        }
      }
    }
    for (const country of eu.countries) {
      const countryCompleted = isCountryCompleted(country, eu);
      
      const countryResult = result.countries.find(c => c.name === country.name);
      if (countryResult && countryCompleted) {
        countryResult.days = countryResult.days > -1 ? countryResult.days : days;
      }
    }
    days++;
    done = result.countries.every(c => c.days >= 0);
    for (const row of eu.matrix) {
      for (const city of row) {
        for (const motif of Object.keys(city.coinsToReceive.count)) {
          city.coins.count[motif] =
            (city.coins.count[motif] || 0) +
            (city.coinsToReceive.count[motif] || 0);
        }
        city.coinsToReceive = { count: {} };
      }
    }
  } while (!done);

  return result;
};


