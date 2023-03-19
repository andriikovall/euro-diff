import { Country } from '../../types';
import { getherUserInputLines } from './getherUserInputLines';
import { parseInput } from './parseInput';

export type Input = {
  countries: Country[];
}[];

export const readInput = async (): Promise<Input> => {
  const lines = await getherUserInputLines();
  return parseInput(lines);
};
