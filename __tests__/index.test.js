import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const absolutePath = path.join(__dirname, '__fixtures__');

const getAbsoluteFilePath = filename => path.join(absolutePath, filename);

const getRelativeFilePath = (filename) => {
  const commonFixturePath = '__tests__/__fixtures__';
  return path.join(commonFixturePath, filename);
};

const check = ({ fileBefore, fileAfter, fileExpected }) => {
  const filepath1 = getAbsoluteFilePath(fileBefore);
  const filepath2 = getAbsoluteFilePath(fileAfter);
  const actual = genDiff(filepath1, filepath2);
  const expected = fs.readFileSync(getRelativeFilePath(fileExpected), 'utf-8');
  expect(actual).toEqual(expected);
};

test.each`
  fileBefore        | fileAfter         | fileExpected       | format
  ${'config1.json'} | ${'config2.json'} | ${'expected1.txt'} | ${'.json'}
  ${'config3.json'} | ${'config4.json'} | ${'expected2.txt'} | ${'.json'}
  ${'config5.yml'}  | ${'config6.yaml'} | ${'expected1.txt'} | ${'.yml/.yaml'}
  ${'config7.ini'}  | ${'config8.ini'}  | ${'expected2.txt'} | ${'.ini'}
`('Check absolute paths for $format format', check);
