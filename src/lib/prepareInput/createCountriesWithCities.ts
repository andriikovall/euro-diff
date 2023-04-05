import { INITIAL_CITY_COINS_COUNT } from "../../config";
import { Country, City } from "../../types";
import { EU } from "./prepareInput";

export const createCountriesWithCities = (countries: Omit<Country, "cities">[], matrix: City[][]): EU['countries'] => {
    return countries.map(country => {
      const cities: City[] = [];
      for (let x = country.xl; x <= country.xh; x++) {
        for (let y = country.yl; y <= country.yh; y++) {
          const city = matrix[x][y];
          city.coins.count[country.name] = INITIAL_CITY_COINS_COUNT;
          city.country = country.name;
          cities.push(city);
        }
      }
      return { ...country, cities };
    });
  }
  