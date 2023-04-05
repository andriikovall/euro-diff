export const safeGetNumber = (value: number | undefined): number => {
  return value ?? 0;
};
