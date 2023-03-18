import { prepareInput } from './lib/prepareInput';
import { readInput } from './lib/readInput';

readInput()
  .then(prepareInput)
  .then(EUs => {
    // todo: actual logic here
  });

export {};
