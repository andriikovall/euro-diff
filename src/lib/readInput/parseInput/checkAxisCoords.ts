export const checkAxisCoords = (
  a1: number,
  a2: number,
  minVal: number,
  maxVal: number,
): [number, number] => {
  if ([a1, a2].some(v => v < minVal || v > maxVal) || a1 > a2) {
    throw new Error(
      `Invalid coordinate: ${a1} or ${a2}. Min is ${minVal} and max is ${maxVal}`,
    );
  }
  return [a1, a2];
};
