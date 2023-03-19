import { Country } from '../../types';
import { EU } from '../prepareInput';

export const isCountryCompleted = (country: Country, eu: EU): boolean => {
  return country.cities.every(city => {
    const cityCoinsCountries = Object.keys(city.coins.count);
    return cityCoinsCountries.length === eu.countries.length;
  });
};
