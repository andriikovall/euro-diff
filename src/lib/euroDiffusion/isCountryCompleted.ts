import { Country } from '../../types';

export const isCountryCompleted = (country: Country): boolean => {
  return country.cities.every(city => Object.values(city.coins.count).every(coin => coin > 0));
};
