import fs from 'fs';
import genDiff from '../src';

const absolutePath = '/home/badcookie/Documents/projects/gendiff/__tests__/__fixtures__';

test('absolute paths', () => {
  const path1 = `${absolutePath}/config1.json`;
  const path2 = `${absolutePath}/config2.json`;
  const actual = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/expected1.txt').toString();
  expect(actual).toEqual(expected);
});

test('relative paths', () => {
  const path1 = '__tests__/__fixtures__/config3.json';
  const path2 = '__tests__/__fixtures__/config4.json';
  const actual = genDiff(path1, path2);
  const expected = fs.readFileSync('__tests__/__fixtures__/expected2.txt').toString();
  expect(actual).toEqual(expected);
});
