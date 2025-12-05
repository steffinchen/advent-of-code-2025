import { Day } from './day.type.js';
import { isEquals } from './helper.js';
import _ from 'lodash';

export class Day4 implements Day {
  part1 = (input: string[]) => {
    const grid = input.map((line) => line.split(''));
    let marked: string[][] = [];
    grid.forEach((l) => {
      marked.push([...l]);
    });

    let count = 0;
    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        if (this.isAccessible(i, j, grid)) {
          count++;
          marked[i][j] = 'x';
        }
      }
    }
    return count;
  };

  isAccessible(i: number, j: number, grid: string[][]): boolean {
    const maxNeighbours = 4;
    let count = 0;
    if (grid[i][j] !== '@') {
      return false;
    }
    for (let a = -1; a <= 1; a++) {
      for (let b = -1; b <= 1; b++) {
        if (a == 0 && b == 0) continue;
        const value = this.get(i + a, j + b, grid);
        if (value === '@') {
          count++;
          if (count >= maxNeighbours) {
            return false;
          }
        }
      }
    }
    return true;
  }

  get(i: number, j: number, grid: string[][]): string | undefined {
    if (i < 0 || j < 0 || i > grid.length - 1 || j > grid.length - 1) {
      return undefined;
    }
    return grid[i][j];
  }

  part2 = (input: string[]) => {
    const grid = input.map((line) => line.split(''));

    let totalCount = 0;
    let removedThisIteration = 0;
    do {
      removedThisIteration = 0;
      for (let i = 0; i < grid.length; i++) {
        for (let j = 0; j < grid[i].length; j++) {
          if (this.isAccessible(i, j, grid)) {
            removedThisIteration++;
            grid[i][j] = '.';
          }
        }
      }
      totalCount += removedThisIteration;
      // console.log('============');
      // console.log('finished grid, removed', removedThisIteration, totalCount);
      // grid.forEach((l) => console.log(l.join('')));
      // console.log('============');
    } while (removedThisIteration > 0);
    return totalCount;
  };

  testPart1 = () => {
    const example: string[] = [
      '..@@.@@@@.',
      '@@@.@.@.@@',
      '@@@@@.@.@@',
      '@.@@@@..@.',
      '@@.@@@@.@@',
      '.@@@@@@@.@',
      '.@.@.@.@@@',
      '@.@@@.@@@@',
      '.@@@@@@@@.',
      '@.@.@@@.@.',
    ];
    const sampleResult = this.part1(example);
    isEquals(13, sampleResult);
  };

  testPart2 = () => {
    const example: string[] = [
      '..@@.@@@@.',
      '@@@.@.@.@@',
      '@@@@@.@.@@',
      '@.@@@@..@.',
      '@@.@@@@.@@',
      '.@@@@@@@.@',
      '.@.@.@.@@@',
      '@.@@@.@@@@',
      '.@@@@@@@@.',
      '@.@.@@@.@.',
    ];
    const sampleResult = this.part2(example);
    isEquals(43, sampleResult);
  };
}
