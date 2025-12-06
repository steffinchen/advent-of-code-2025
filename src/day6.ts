import _ from 'lodash';
import { Day } from './day.type.js';
import { isEquals, sum } from './helper.js';

export class Day6 implements Day {
  part1 = (input: string[]) => {
    const matrix = input.map((l) =>
      l
        .trim()
        .split(/(\s+)/)
        .filter((el) => el.trim() !== '')
    );
    // _.unzip is a transpose
    return _.unzip(matrix)
      .map((p) => this.solveProblem(p))
      .reduce(sum, 0);
  };

  part2 = (input: string[]) => {
    //find problem boundaries: indexes, where there is a whitespace in each line
    const indexes = input.map((line) => {
      return [...line.matchAll(/\s/gm)].map((m) => {
        return m.index;
      });
    });

    const colBoundaries = indexes.reduce((acc, el) => _.intersection(acc, el));

    const parsed = input
      .map((line) => {
        let array = [...line];
        for (let boundary of colBoundaries) {
          array[boundary] = '|';
        }
        return array.join('');
      })
      .map((line) => line.split('|'));

    return _.unzip(parsed)
      .map((p) => this.solveProblemTheOctopusWay(p))
      .reduce(sum, 0);
  };

  solveProblemTheOctopusWay(p: string[]): number {
    const operator = _.last(p)?.trim();
    delete p[p.length - 1];

    //convert each number-string to an array and transpose because
    //octopus numbers are read top to bottom
    const numbers = _.unzip(p.map((el) => el.split(''))).map((el) =>
      el.filter((el) => el !== ' ').join('')
    );

    return operator === '+'
      ? numbers.reduce(this.add, 0)
      : numbers.reduce(this.multiply, 1);
  }

  solveProblem(p: string[]): number {
    const operator = p.splice(p.length - 1, 1);
    return operator[0] === '+'
      ? p.reduce(this.add, 0)
      : p.reduce(this.multiply, 1);
  }

  multiply = (acc: number, el: string) => acc * parseInt(el);

  add = (acc: number, el: string) => acc + parseInt(el);

  testPart1 = () => {
    const example: string[] = [
      '123 328  51 64 ',
      ' 45 64  387 23 ',
      '  6 98  215 314',
      '*   +   *   +  ',
    ];
    const sampleResult = this.part1(example);
    isEquals(4277556, sampleResult);
  };

  testPart2 = () => {
    const example: string[] = [
      '123 328  51 64 ',
      ' 45 64  387 23 ',
      '  6 98  215 314',
      '*   +   *   +  ',
    ];
    const sampleResult = this.part2(example);
    isEquals(3263827, sampleResult);
  };
}
