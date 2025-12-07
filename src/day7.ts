import { Day } from './day.type.js';
import { isEquals, sum } from './helper.js';

export class Day7 implements Day {
  part1 = (input: string[]) => {
    const grid = input.map((l) => l.split(''));

    return this.countSplittersBeingHit(grid);
  };

  part2 = (input: string[]) => {
    const grid = input.map((l) => l.split(''));

    return this.findSplitterPaths(grid).reduce(sum, 0);
  };

  findSplitterPaths(grid: string[][]) {
    let counter: Record<number, number> = {};
    let prevCounter: Record<number, number> = {};

    //handle first splitter
    const firstSpliterRow = 2;
    const firstSplitterIndex = grid[firstSpliterRow].join('').indexOf('^');
    prevCounter[firstSplitterIndex - 1] = 1;
    prevCounter[firstSplitterIndex + 1] = 1;

    for (let row = 3; row < grid.length; row++) {
      if (grid[row].join('').match(/^\.+$/g)) {
        continue;
      }
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === '^' && this.isSplitterBeingHit(row, col, grid)) {
          counter[col - 1] = (counter[col - 1] ?? 0) + prevCounter[col];
          counter[col + 1] = (counter[col + 1] ?? 0) + prevCounter[col];
        } else if (prevCounter[col]) {
          counter[col] = (counter[col] ?? 0) + prevCounter[col];
        }
      }
      if (Object.keys(counter).length > 0) {
        prevCounter = counter;
        counter = {};
      }
    }

    return Object.values(prevCounter);
  }

  countSplittersBeingHit(grid: string[][]) {
    let count = 1; // the first splitter

    for (let row = 3; row < grid.length; row++) {
      if (grid[row].join('').match(/^\.+$/g)) {
        continue;
      }
      for (let col = 0; col < grid[row].length; col++) {
        if (grid[row][col] === '^' && this.isSplitterBeingHit(row, col, grid)) {
          count++;
        }
      }
    }

    return count;
  }

  isSplitterBeingHit(row: number, col: number, grid: string[][]): boolean {
    // a splitter is hit
    // ..if an S is in the same colum above it, with nothing inbetween, or
    // ..if if another splitter is to the right or left above and the one directly above is higher up

    for (let i = row - 1; i > 0; i--) {
      if (this.get(grid, i, col - 1) === '^') {
        return true;
      } else if (this.get(grid, i, col + 1) === '^') {
        return true;
      } else if (this.get(grid, i, col) === '^') {
        return false;
      }
    }
    return false;
  }

  get(grid: string[][], i: number, j: number) {
    try {
      return grid[i][j];
    } catch (e) {
      return undefined;
    }
  }

  testPart1 = () => {
    const example: string[] = [
      '.......S.......',
      '...............',
      '.......^.......',
      '...............',
      '......^.^......',
      '...............',
      '.....^.^.^.....',
      '...............',
      '....^.^...^....',
      '...............',
      '...^.^...^.^...',
      '...............',
      '..^...^.....^..',
      '...............',
      '.^.^.^.^.^...^.',
      '...............',
    ];
    const sampleResult = this.part1(example);
    isEquals(21, sampleResult);
  };

  testPart2 = () => {
    const example: string[] = [
      '.......S.......',
      '...............',
      '.......^.......',
      '...............',
      '......^.^......',
      '...............',
      '.....^.^.^.....',
      '...............',
      '....^.^...^....',
      '...............',
      '...^.^...^.^...',
      '...............',
      '..^...^.....^..',
      '...............',
      '.^.^.^.^.^...^.',
      '...............',
    ];
    const example2: string[] = [
      '.......S.......',
      '.......1.......',
      '......1.1......',
      '.....1.2.1.....',
      '....1.3.3.1....',
      '...1.4.6.4.1...',
      '..1.5.10.....1..',
      '.1.1.4.4.0...1.',
      '1.2.5.8.4...1.1',
    ];
    const sampleResult = this.part2(example);
    isEquals(40, sampleResult);
  };
}
