import { prepareOutput } from './lib/prepareOutput';
import { euroDiffusion } from './lib/euroDiffusion';
import { prepareInput } from './lib/prepareInput';
import { readInput } from './lib/readInput';

readInput()
  .then(prepareInput)
  .then(EUs => EUs.map(euroDiffusion))
  .then(prepareOutput)
  .then(console.log);

export {};
