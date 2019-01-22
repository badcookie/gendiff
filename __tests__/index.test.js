import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const { dir } = path.parse(__filename);
const absolutePath = path.join(dir, '__fixtures__');

const getAbsoluteFilePath = filename => path.join(absolutePath, filename);

const getRelativeFilePath = (filename) => {
  const commonFixturePath = '__tests__/__fixtures__';
  return path.join(commonFixturePath, filename);
};

test('JSON absolute paths', () => {
  const filepath1 = getAbsoluteFilePath('config1.json');
  const filepath2 = getAbsoluteFilePath('config2.json');
  const actual = genDiff(filepath1, filepath2);
  const expected = fs.readFileSync(getRelativeFilePath('expected1.txt')).toString();
  expect(actual).toBe(expected);
});

test('JSON relative paths', () => {
  const filepath1 = getRelativeFilePath('config3.json');
  const filepath2 = getRelativeFilePath('config4.json');
  const actual = genDiff(filepath1, filepath2);
  const expected = fs.readFileSync(getRelativeFilePath('expected2.txt')).toString();
  expect(actual).toBe(expected);
});
