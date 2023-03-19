import { createArray } from './createArray';

export const createMatrix = <T>(
  sizeX: number,
  sizeY: number,
  filler: (x: number, y: number) => T,
): T[][] =>
  createArray(sizeX).map((_, x) =>
    createArray(sizeY).map((_, y) => filler(x, y)),
  );
