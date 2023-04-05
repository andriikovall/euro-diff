import {
  MAX_COUNTRY_NAME_LENGTH,
  MAX_NUMBER_OF_COUNTRIES,
  MAX_X_COORDINATE,
  MAX_Y_COORDINATE,
  MIN_NUMBER_OF_COUNTRIES,
  MIN_X_COORDINATE,
  MIN_Y_COORDINATE,
} from '../../../config';
import { Input } from '../readInput';
import { checkAxisCoords } from './checkAxisCoords';
import { checkCountryName } from './checkCountryName';
import { checkNumberOfCountries } from './checkNumberOfCountries';

export const parseInput = (lines: string[]): Input => {
  const parsedInput: Input = [];
  let linesIndex = 0;
  while (true) {
    const numberOfCountries = checkNumberOfCountries(Number(lines[linesIndex]));
    if (numberOfCountries < MIN_NUMBER_OF_COUNTRIES) {
      break;
    }
    linesIndex++;
    const countriesWithNoCities: Input[number]['countries'] = [];
    for (let i = 0; i < numberOfCountries; i++) {
      const [unsafeName, xl, yl, xh, yh] = lines[linesIndex].split(' ');
      const name = checkCountryName(unsafeName);
      linesIndex++;
      const [xlSafe, xhSafe] = checkAxisCoords(
        Number(xl),
        Number(xh),
        MIN_X_COORDINATE,
        MAX_X_COORDINATE,
      );
      const [ylSafe, yhSafe] = checkAxisCoords(
        Number(yl),
        Number(yh),
        MIN_Y_COORDINATE,
        MAX_Y_COORDINATE,
      );
      countriesWithNoCities.push({
        name,
        xl: xlSafe,
        yl: ylSafe,
        xh: xhSafe,
        yh: yhSafe,
      });
    }
    parsedInput.push({ countries: countriesWithNoCities });
  }
  return parsedInput;
};
