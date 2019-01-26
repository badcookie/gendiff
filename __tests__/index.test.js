import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const absolutePath = path.join(__dirname, '__fixtures__');

const getAbsoluteFilePath = filename => path.join(absolutePath, filename);

const getRelativeFilePath = (filename) => {
  const commonFixturePath = '__tests__/__fixtures__';
  return path.join(commonFixturePath, filename);
};

const check = ({
  fileBefore, fileAfter, fileExpected, outputFormat,
}) => {
  const filepath1 = getAbsoluteFilePath(fileBefore);
  const filepath2 = getAbsoluteFilePath(fileAfter);
  const actual = genDiff(filepath1, filepath2, outputFormat);
  const expected = fs.readFileSync(getRelativeFilePath(fileExpected), 'utf-8');
  expect(actual).toBe(expected);
};

test.each`
  fileBefore        | fileAfter         | fileExpected    | inputFormat     | outputFormat
  ${'config1.json'} | ${'config2.json'} | ${'plain.txt'}  | ${'.json'}      | ${'plain'}
  ${'config1.json'} | ${'config2.json'} | ${'sample.txt'} | ${'.json'}      | ${'sample'}
  ${'config3.yml'}  | ${'config4.yml'}  | ${'plain.txt'}  | ${'.yml/.yaml'} | ${'plain'}
  ${'config3.yml'}  | ${'config4.yml'}  | ${'sample.txt'} | ${'.yml/.yaml'} | ${'sample'}
  ${'config5.ini'}  | ${'config6.ini'}  | ${'plain.txt'}  | ${'.ini'}       | ${'plain'}
  ${'config5.ini'}  | ${'config6.ini'}  | ${'sample.txt'} | ${'.ini'}       | ${'sample'}
`('Check rendering for $inputFormat format to compare with $outputFormat format', check);
