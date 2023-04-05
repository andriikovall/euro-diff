import { MAX_X_COORDINATE, MAX_Y_COORDINATE } from "../../config";
import { City, Country } from "../../types";
import { createMatrix } from "../../utils";

export const createEUMatrix = (countries: Omit<Country, "cities">[]): City[][] => {
    return createMatrix<City>(
      MAX_X_COORDINATE + 1,
      MAX_Y_COORDINATE + 1,
      (x, y) => ({
        x,
        y,
        coins: {
          count: countries.reduce((acc, country) => {
            acc[country.name] = 0;
            return acc;
          }, {} as Record<string, number>),
        },
        coinsToReceive: {
          count: {},
        },
        country: '',
      })
    );
  }
  