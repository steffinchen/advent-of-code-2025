import { Day } from './day.type.js';
import { isEquals, sum } from './helper.js';

export class Day3 implements Day {
  part1 = (input: string[]) => {
    return input.map((line) => this.findXLargest(line, 2)).reduce(sum, 0);
  };

  part2 = (input: string[]) => {
    return input.map((line) => this.findXLargest(line, 12)).reduce(sum, 0);
  };

  findXLargest = (line: string, x: number) => {
    const chars = line.split('');
    let digits = [];
    let prevIndex = -1;

    for (let c = 0; c < x; c++) {
      let d = '.';
      for (let i = prevIndex + 1; i <= chars.length - x + c; i++) {
        if (chars[i] > d) {
          d = chars[i];
          prevIndex = i;
        }
      }
      digits.push(d);
      d = '.';
    }
    return parseInt(digits.join(''));
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
    const example: string[] = [
      '987654321111111',
      '811111111111119',
      '234234234234278',
      '818181911112111',
    ];
    const sampleResult = this.part2(example);
    isEquals(3121910778619, sampleResult);
  };
}
