import readline from 'readline';
import createPrompt from 'prompt-sync';
import { Input } from '../types';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const prompt = createPrompt({});
const readLine = () => prompt({});

const getherUserInput = async (): Promise<string[]> => {
  const lines: string[] = [];
  return new Promise<string[]>(resolve => {
    rl.addListener('line', line => {
      lines.push(line);
      if (line === '0') {
        resolve(lines);
        rl.close();
      }
    });
  });
};

const parseInput = (lines: string[]): Input => {
  const input: Input = [];
  let linesIndex = 0;
  while (true) {
    const numberOfCountries = Number(lines[linesIndex]);
    if (numberOfCountries === 0) {
      break;
    }
    linesIndex++;
    const countries: Input[0]['countries'] = [];
    for (let i = 0; i < numberOfCountries; i++) {
      const [name, xl, yl, xh, yh] = lines[linesIndex].split(' ');
      linesIndex++;
      countries.push({
        name,
        xl: Number(xl),
        yl: Number(yl),
        xh: Number(xh),
        yh: Number(yh),
      });
    }
    input.push({ countries });
  }
  return input;
};

export const readInput = async (): Promise<Input> => {
  const lines = await getherUserInput();
  return parseInput(lines);
};
