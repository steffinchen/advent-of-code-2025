import { Day } from './day.type.js';
import { isEquals, sum } from './helper.js';

export class Day3 implements Day {
  part1 = (input: string[]) => {
    return input.map((line) => this.findLargest(line)).reduce(sum, 0);
  };

  part2 = (input: string[]) => {
    return 0;
  };

  findLargest = (line: string) => {
    const chars = line.split('');
    let d1 = '.';
    let i1 = -1;
    for (let i = 0; i < chars.length - 1; i++) {
      if (chars[i] > d1) {
        d1 = chars[i];
        i1 = i;
      }
    }

    let d2 = '.';
    let i2 = -1;
    for (let i = i1 + 1; i < chars.length; i++) {
      if (chars[i] > d2) {
        d2 = chars[i];
        i2 = i;
      }
    }
    return parseInt(d1 + d2);
  };

  testPart1 = () => {
    const example: string[] = [
      '987654321111111',
      '811111111111119',
      '234234234234278',
      '818181911112111',
    ];
    const sampleResult = this.part1(example);
    isEquals(357, sampleResult);
  };

  testPart2 = () => {
    const example: string[] = [];
    const sampleResult = this.part2(example);
    isEquals(42, sampleResult);
  };
}
