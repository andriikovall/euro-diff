import {
  MAX_COUNTRY_NAME_LENGTH,
  MAX_NUMBER_OF_COUNTRIES,
  MAX_X_COORDINATE,
  MAX_Y_COORDINATE,
  MIN_NUMBER_OF_COUNTRIES,
  MIN_X_COORDINATE,
  MIN_Y_COORDINATE,
} from '../../config';
import { Country } from '../../types';
import { Input } from './readInput';

export const parseInput = (lines: string[]): Input => {
  const input: Input = [];
  let linesIndex = 0;
  while (true) {
    const numberOfCountries = Number(lines[linesIndex]);
    if (numberOfCountries > MAX_NUMBER_OF_COUNTRIES) {
      throw new Error(
        `Invalid number of countries: ${numberOfCountries}. Max is ${MAX_NUMBER_OF_COUNTRIES}`,
      );
    }
    if (numberOfCountries < MIN_NUMBER_OF_COUNTRIES) {
      break;
    }
    linesIndex++;
    const countriesWithNoCities: Input[number]['countries'] = [];
    for (let i = 0; i < numberOfCountries; i++) {
      const [name, xl, yl, xh, yh] = lines[linesIndex].split(' ');
      if (name.length > MAX_COUNTRY_NAME_LENGTH) {
        throw new Error(
          `Invalid country name length: ${name}. Max is ${MAX_COUNTRY_NAME_LENGTH}`,
        );
      }
      linesIndex++;
      const xlParsed = Number(xl);
      const ylParsed = Number(yl);
      const xhParsed = Number(xh);
      const yhParsed = Number(yh);
      if (
        [xlParsed, xhParsed].some(
          x => x < MIN_X_COORDINATE || x > MAX_X_COORDINATE,
        ) ||
        xlParsed > xhParsed
      ) {
        throw new Error(
          `Invalid x coordinate: ${xlParsed} or ${xhParsed}. Min is ${MIN_X_COORDINATE} and max is ${MAX_X_COORDINATE}`,
        );
      }
      if (
        [ylParsed, yhParsed].some(
          y => y < MIN_Y_COORDINATE || y > MAX_Y_COORDINATE,
        ) ||
        ylParsed > yhParsed
      ) {
        throw new Error(
          `Invalid y coordinate: ${ylParsed} or ${yhParsed}. Min is ${MIN_Y_COORDINATE} and max is ${MAX_Y_COORDINATE}`,
        );
      }
      countriesWithNoCities.push({
        name,
        xl: Number(xl),
        yl: Number(yl),
        xh: Number(xh),
        yh: Number(yh),
      });
    }
    input.push({ countries: countriesWithNoCities });
  }
  return input;
};
