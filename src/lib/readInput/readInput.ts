import { Country } from '../../types';
import { getherUserInputLines } from './getherUserInputLines';
import { parseInput } from './parseInput/parseInput';

export type Input = {
  countries: Omit<Country, 'cities'>[];
}[];

export const readInput = async (): Promise<Input> => {
  const lines = await getherUserInputLines();
  return parseInput(lines);
};
