import { City } from '../../types';
import { safeGetNumber } from '../../utils';
import { getCountsRepresentativePortion } from './getCoinsRepresentativePortion';

export const sendCoinsToNeighbors = (city: City, neighbors: City[]) => {
  for (const motif of Object.keys(city.coins.count)) {
    const coinsRepresentativePortion = getCountsRepresentativePortion(city.coins.count[motif]);
    if (coinsRepresentativePortion <= 0) {
      continue;
    }
    neighbors.forEach(neighbour => {
      neighbour.draftCoins.count[motif] =
        safeGetNumber(neighbour.draftCoins.count[motif]) +
        coinsRepresentativePortion;

      city.draftCoins.count[motif] = safeGetNumber(city.draftCoins.count[motif]) - coinsRepresentativePortion;
    });
  }
};
