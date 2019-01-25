import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const absolutePath = path.join(__dirname, '__fixtures__');

const getAbsoluteFilePath = filename => path.join(absolutePath, filename);

const getRelativeFilePath = (filename) => {
  const commonFixturePath = '__tests__/__fixtures__';
  return path.join(commonFixturePath, filename);
};

const check = ({ fileBefore, fileAfter }) => {
  const filepath1 = getAbsoluteFilePath(fileBefore);
  const filepath2 = getAbsoluteFilePath(fileAfter);
  const actual = genDiff(filepath1, filepath2, 'sample');
  const expected = fs.readFileSync(getRelativeFilePath('expected.txt'), 'utf-8');
  expect(actual).toBe(expected);
};

test.each`
  fileBefore        | fileAfter         | format
  ${'config1.json'} | ${'config2.json'} | ${'.json'}
  ${'config3.yml'}  | ${'config4.yml'}  | ${'.yml/.yaml'}
  ${'config5.ini'}  | ${'config6.ini'}  | ${'.ini'}
`('Check recursive rendering for $format format', check);
