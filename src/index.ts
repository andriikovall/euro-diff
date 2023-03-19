import { prepareOutput } from './lib/prepareOutput';
// import { prepareInput } from './lib/prepareInput';
// import { readInput } from './lib/readInput';

// readInput()
//   .then(prepareInput)
//   .then(input => {
//     const matrixes = input.map(({ matrix }) => {
//       return matrix.map(row => {
//         return row.map(city => {
//             const countries = Object.keys(city.coins.count).map(c => c[0].toUpperCase());
//             return countries.length > 0 ? countries.join('') : '.';
//         }).join('  ');
//       });
//     });
//     console.log('matrixes:', matrixes);
//   });

// export {};

import { euroDiffusion } from './lib/euroDiffustion';
import { prepareInput } from './lib/prepareInput';
import { readInput } from './lib/readInput';

readInput()
  .then(prepareInput)
  .then(EUs => EUs.map(euroDiffusion))
  .then(prepareOutput)
  .then(console.log);

export {};
