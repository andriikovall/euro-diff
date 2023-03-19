import { safeGetNumber } from '../../utils';
import { EU } from '../prepareInput';

export const updateCitiesReceivedCoins = (eu: EU) => {
  for (const row of eu.matrix) {
    for (const city of row) {
      for (const motif of Object.keys(city.coinsToReceive.count)) {
        city.coins.count[motif] =
          safeGetNumber(city.coins.count[motif]) +
          safeGetNumber(city.coinsToReceive.count[motif]);
      }
      city.coinsToReceive = { count: {} };
    }
  }
};
