import _ from 'lodash';
import { Day } from './day.type.js';
import { isEquals, isFalsy, isTruthy } from './helper.js';

export class Day2 implements Day {
  part1 = (input: string[]) => {
    return this.process(input, this.isInvalid);
  };

  part2 = (input: string[]) => {
    return this.process(input, this.isInvalid2);
  };

  process = (input: string[], predicate: (value: number) => boolean) => {
    return (
      input[0]
        .split(',')
        .map((range) => {
          const s = range.split('-');
          return { from: Number.parseInt(s[0]), to: Number.parseInt(s[1]) };
        })
        .flatMap((range) => _.range(range.from, range.to + 1))
        .filter(predicate)
        // .map((v) => {
        //   console.log('invalid', v);
        //   return v;
        // })
        .reduce((sum, v) => sum + v, 0)
    );
  };

  isInvalid = (n: number): boolean => {
    const s = n.toString();
    if (!this.isEven(s.length)) {
      return false;
    }
    const part1 = s.substring(0, s.length / 2);
    const part2 = s.substring(s.length / 2);
    return part1 === part2;
  };

  isInvalid2 = (n: number): boolean => {
    const s = n.toString();
    if (s.match('^(.)\\1{1,}$')) {
      return true;
    }

    let found = false;
    for (let len = 2; len <= s.length / 2; len++) {
      if (s.match(`^(.{${len}})\\1{1,}$`)) {
        found = true;
        break;
      }
    }
    return found;
  };

  isEven = (n: number) => n % 2 == 0;

  testPart1 = () => {
    isTruthy(this.isInvalid(22));
    isTruthy(this.isInvalid(6464));
    isTruthy(this.isInvalid(123123));
    isFalsy(this.isInvalid(101));

    const example: string[] = [
      '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124',
    ];
    isEquals(1227775554, this.part1(example));
  };

  testPart2 = () => {
    isTruthy(this.isInvalid2(22));
    isTruthy(this.isInvalid2(123123123));
    isTruthy(this.isInvalid2(1212121212));
    isTruthy(this.isInvalid2(1111111));

    const example: string[] = [
      '11-22,95-115,998-1012,1188511880-1188511890,222220-222224,1698522-1698528,446443-446449,38593856-38593862,565653-565659,824824821-824824827,2121212118-2121212124',
    ];
    isEquals(4174379265, this.part2(example));
  };
}
