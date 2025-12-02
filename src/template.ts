import { Day } from './day.type.js';

export class Day1 implements Day {
  part1 = (input: string[]) => {
    return 0;
  };

  part2 = (input: string[]) => {
    return 0;
  };

  testPart1 = () => {
    const example: string[] = [];
    const sampleResult = this.part1(example);
    if (sampleResult !== 42)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };

  testPart2 = () => {
    const example: string[] = [];
    const sampleResult = this.part2(example);
    if (sampleResult !== 42)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };
}
