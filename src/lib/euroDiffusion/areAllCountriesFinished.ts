import { EuroDiffusionResult } from './euroDiffusion';

export const areAllCountriesFinished = (result: EuroDiffusionResult) => {
  return result.countries.every(c => c.days >= 0);
};
