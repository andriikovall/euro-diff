import { Country } from '../../types';
import { EU } from '../prepareInput';
import { areAllCountriesFinished } from './areAllCountriesFinished';
import { getNeighbors } from './getNeighbors';
import { sendCoinsToNeighbors } from './sendCoinsToNeighbors';
import { updateCitiesReceivedCoins } from './updateCitiesReceivedCoins';
import { updateCompletionsDays } from './updateCompletionsDays';

export type CountryWithCompletionDays = Country & { days: number };

export type EuroDiffusionResult = {
  countries: CountryWithCompletionDays[];
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
        if (!city.country) {
          continue;
        }
        const neighbors = getNeighbors(eu, i, j);
        sendCoinsToNeighbors(city, neighbors);
      }
    }
    result.countries = updateCompletionsDays(result, eu, days);
    days++;
    updateCitiesReceivedCoins(eu);
    done = areAllCountriesFinished(result);
  } while (!done);

  return result;
};
