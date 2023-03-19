import { prepareOutput } from './lib/prepareOutput';
import { euroDiffusion } from './lib/euroDiffustion';
import { prepareInput } from './lib/prepareInput/prepareInput';
import { readInput } from './lib/readInput/readInput';

readInput()
  .then(prepareInput)
  .then(EUs => EUs.map(euroDiffusion))
  .then(prepareOutput)
  .then(console.log);

export {};
