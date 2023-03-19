import { EuroDiffusionResult } from './euroDiffustion';

export const prepareOutput = (res: EuroDiffusionResult[]): string => {
  const resWithSortedCountries = res.map(({ countries }) => {
    return [...countries]
      .map(({ name, days }) => ({ name, days }))
      .sort((a, b) => a.days - b.days || a.name.localeCompare(b.name));
  });

  const resultString = resWithSortedCountries
    .map((countries, i) => {
      const countriesString = countries
        .map(c => `${c.name} ${c.days}`)
        .join('\n');
      return `Case Number ${i + 1}\n${countriesString}`;
    })
    .join('\n');
  return resultString;
};
