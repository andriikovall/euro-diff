import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

export const getherUserInputLines = async (terminator = '0'): Promise<string[]> => {
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
