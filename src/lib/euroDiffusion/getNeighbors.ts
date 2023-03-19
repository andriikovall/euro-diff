import { City } from '../../types';
import { EU } from '../prepareInput';

export const getNeighbors = (eu: EU, i: number, j: number) => {
  return [
    eu.matrix?.[i - 1]?.[j],
    eu.matrix?.[i + 1]?.[j],
    eu.matrix?.[i]?.[j - 1],
    eu.matrix?.[i]?.[j + 1],
  ].filter(n => n?.country) as City[];
};
