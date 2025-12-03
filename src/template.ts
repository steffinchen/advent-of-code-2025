import { Day } from './day.type.js';
import { isEquals } from './helper.js';

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
    isEquals(42, sampleResult);
  };

  testPart2 = () => {
    const example: string[] = [];
    const sampleResult = this.part2(example);
    isEquals(42, sampleResult);
  };
}
