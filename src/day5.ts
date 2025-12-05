import _ from 'lodash';
import { Day } from './day.type.js';
import { isEquals, sum } from './helper.js';

type Range = {
  from: number;
  to: number;
};
export class Day5 implements Day {
  part1 = (input: string[]) => {
    let { ranges, ingredients } = this.parseInput(input);

    return ingredients.filter((i) => this.isFresh(i, ranges)).length;
  };

  part2 = (input: string[]) => {
    let { ranges } = this.parseInput(input);

    return this.mergeRanges(ranges)
      .map((r) => r.to - r.from + 1)
      .reduce(sum, 0);
  };

  mergeRanges(ranges: Range[]): Range[] {
    if (ranges.length === 0) return [];

    const sorted = [...ranges].sort((a, b) => a.from - b.from);

    const merged: Range[] = [];
    let current = { ...sorted[0] };

    for (let i = 1; i < sorted.length; i++) {
      const next = sorted[i];
      if (next.from <= current.to + 1) {
        current.to = Math.max(current.to, next.to);
      } else {
        merged.push(current);
        current = { ...next };
      }
    }
    merged.push(current);

    return merged;
  }

  isFresh(ingr: number, ranges: Range[]) {
    for (let r of ranges) {
      if (ingr >= r.from && ingr <= r.to) {
        return true;
      }
    }
    return false;
  }

  parseInput(input: string[]): { ranges: Range[]; ingredients: number[] } {
    const ranges: Range[] = [];
    const ingredients: number[] = [];
    input.forEach((l) => {
      if (l.indexOf('-') > -1) {
        let [from, to] = l.split('-');
        ranges.push({ from: parseInt(from), to: parseInt(to) });
      } else if (!_.isEmpty(l)) {
        ingredients.push(parseInt(l));
      }
    });

    return { ranges, ingredients };
  }

  testPart1 = () => {
    const example: string[] = [
      '3-5',
      '10-14',
      '16-20',
      '12-18',
      '',
      '1',
      '5',
      '8',
      '11',
      '17',
      '32',
    ];
    const sampleResult = this.part1(example);
    isEquals(3, sampleResult);
  };

  testPart2 = () => {
    const example: string[] = [
      '3-5',
      '10-14',
      '16-20',
      '12-18',
      '',
      '1',
      '5',
      '8',
      '11',
      '17',
      '32',
    ];
    const sampleResult = this.part2(example);
    isEquals(14, sampleResult);
  };
}
