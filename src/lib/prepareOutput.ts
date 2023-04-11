import { EuroDiffusionResult } from './euroDiffusion';

export const prepareOutput = (res: EuroDiffusionResult[]): string => {
  const resWithSortedCountries = res.map(({ countries }) => {
    return [...countries]
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
