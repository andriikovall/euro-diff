import { City } from '../../types';
import { EU } from '../prepareInput';

export type EuroDiffusionResult = {
  countries: { name: string; days: number }[];
};

export const euroDiffusion = (eu: EU): EuroDiffusionResult => {
  let completionMap: Record<string, boolean>;

  const result: EuroDiffusionResult = {
    countries: eu.countries.map(c => ({
      name: c.name,
      days: 0,
    })),
  };

  let days = 0;
  let done = false;
  do {
    completionMap = eu.countries.reduce((acc, country) => {
      acc[country.name] = true;
      return acc;
    }, {} as Record<string, boolean>);

    for (let i = 0; i < eu.matrix.length; i++) {
      const row = eu.matrix[i];
      for (let j = 0; j < row.length; j++) {
        const city = row[j];
        if (!city.country) {
          continue;
        }
        const cityCoinsCountries = Object.keys(city.coins.count);
        if (cityCoinsCountries.length === 0) {
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
      const countryCities: City[] = [];
      for (let x = country.xl; x <= country.xh; x++) {
        for (let y = country.yl; y <= country.yh; y++) {
          countryCities.push(eu.matrix[x][y]);
        }
      }
      const isCountryCompleted = countryCities.every(city => {
        const cityCoinsCountries = Object.keys(city.coins.count);
        return cityCoinsCountries.length === eu.countries.length;
      });
      completionMap[country.name] = isCountryCompleted;
      const countryResult = result.countries.find(c => c.name === country.name);
      if (countryResult && isCountryCompleted) {
        countryResult.days = countryResult.days || days;
      }
    }
    days++;
    done = Object.values(completionMap).every(Boolean);
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
