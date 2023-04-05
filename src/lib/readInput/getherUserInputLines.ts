import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

const TERMINATOR_SIGN = '0';

export const getherUserInputLines = async (terminator = TERMINATOR_SIGN): Promise<string[]> => {
  const lines: string[] = [];
  return new Promise<string[]>(resolve => {
    rl.addListener('line', line => {
      lines.push(line);
      if (line === terminator) {
        resolve(lines);
        rl.close();
      }
    });
  });
};
