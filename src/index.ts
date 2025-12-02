import fs from 'fs';

const measure = (fn: () => number) => {
  const start = performance.now();
  const result = fn();
  const end = performance.now();
  console.log(`Execution took ${end - start}ms`);
  return result;
};

const day = process.argv[2];
const part = process.argv[3] ?? '1';

const input = fs
  .readFileSync(`./data/day_${day}.txt`, 'utf8')
  .split('\n')
  .filter((line) => line.length > 0);

const result = await getResult(day, part, input);

console.log(`Day ${day}, Part ${part.toUpperCase()}: `, result);

async function getResult(dayS: string, part: string, input: string[]) {
  const day = await import(`./day${dayS}.js`);
  const dayObj = new day[`Day${dayS}`]();
  if (part === '1') {
    dayObj.testPart1();
    return measure(() => dayObj.part1(input));
  } else {
    dayObj.testPart2();
    return measure(() => dayObj.part2(input));
  }
}
