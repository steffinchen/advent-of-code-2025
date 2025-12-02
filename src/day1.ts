import exp from 'constants';
import { Day } from './day.type';
import { expectEquals } from './helper.js';
import _ from 'lodash';

export class Day1 implements Day {
  dialMax = 100;
  dialStart = 50;

  part1 = (input: string[]) => {
    return input
      .map((line) => this.getRotation(line))
      .reduce(
        (acc, curr) => {
          let newPosition;
          if (curr.dir === 'R') {
            newPosition = acc.position + curr.number;
          } else {
            newPosition = acc.position - curr.number;
          }
          newPosition = this.mod(newPosition, this.dialMax);
          const result = {
            position: newPosition,
            count: newPosition === 0 ? acc.count + 1 : acc.count,
          };
          //console.log(curr, ' -> ', result);
          return result;
        },
        { count: 0, position: this.dialStart }
      ).count;
  };

  part2 = (input: string[]) => {
    return input
      .map((line) => this.getRotation(line))
      .reduce(
        (acc, curr) => {
          let newPosition;
          if (curr.dir === 'R') {
            newPosition = acc.position + curr.number;
          } else {
            newPosition = acc.position - curr.number;
          }

          const result = {
            position: this.mod(newPosition, this.dialMax),
            count:
              acc.count +
              this.countPassingZero(acc.position, newPosition, curr.dir),
          };
          console.log(curr, ' -> ', result);
          return result;
        },
        { count: 0, position: this.dialStart }
      ).count;
  };

  testPart1 = () => {
    const example = [
      'L68',
      'L30',
      'R48',
      'L5',
      'R60',
      'L55',
      'L1',
      'L99',
      'R14',
      'L82',
    ];

    const sampleResult = this.part1(example);
    if (sampleResult !== 3)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };

  testPart2 = () => {
    const example = [
      'L68',
      'L30',
      'R48',
      'L5',
      'R60',
      'L55',
      'L1',
      'L99',
      'R14',
      'L82',
    ];
    const sampleResult = this.part2(example);
    if (sampleResult !== 6)
      throw new Error(`Test result is not as expected: ${sampleResult}`);
  };

  countPassingZero = (prev: number, n: number, dir: string) => {
    let count = 0;
    if (dir === 'L' && n < 0 && prev > 0) {
      count++;
    }
    if (dir === 'R' && prev > n) {
      count++;
    }
    count = count + _.floor(Math.abs(n) / this.dialMax);
    return count + (n === 0 ? 1 : 0);
  };

  mod = (n: number, mod: number): number => ((n % mod) + mod) % mod;

  getRotation = (line: string) => {
    return {
      number: Number.parseInt(line.substring(1)),
      dir: line.substring(0, 1),
    };
  };
}
