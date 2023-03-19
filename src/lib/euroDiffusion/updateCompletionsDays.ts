import { EU } from '../prepareInput';
import {
  EuroDiffusionResult,
  CountryWithCompletionDays,
} from './euroDiffusion';
import { isCountryCompleted } from './isCountryCompleted';

export const updateCompletionsDays = (
  result: EuroDiffusionResult,
  eu: EU,
  days: number,
): CountryWithCompletionDays[] => {
  return result.countries.map(c => {
    if (isCountryCompleted(c, eu)) {
      return {
        ...c,
        days: c.days > -1 ? c.days : days,
      };
    }
    return c;
  });
};
