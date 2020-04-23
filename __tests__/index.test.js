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
  ${'config1.json'} | ${'config2.json'} | ${'pretty.txt'} | ${'json'}      | ${'pretty'}
  ${'config3.yml'}  | ${'config4.yml'}  | ${'pretty.txt'} | ${'yml/yaml'} | ${'pretty'}
  ${'config5.ini'}  | ${'config6.ini'}  | ${'pretty.txt'} | ${'ini'}       | ${'pretty'}
  ${'config1.json'} | ${'config2.json'} | ${'plain.txt'}  | ${'json'}      | ${'plain'}
  ${'config3.yml'}  | ${'config4.yml'}  | ${'plain.txt'}  | ${'yml/yaml'} | ${'plain'}
  ${'config5.ini'}  | ${'config6.ini'}  | ${'plain.txt'}  | ${'ini'}       | ${'plain'}
  ${'config1.json'} | ${'config2.json'} | ${'json.txt'}   | ${'json'}      | ${'json'}
  ${'config3.yml'}  | ${'config4.yml'}  | ${'json.txt'}   | ${'yml/yaml'} | ${'json'}
  ${'config5.ini'}  | ${'config6.ini'}  | ${'json.txt'}   | ${'ini'}       | ${'json'}
`('Check rendering for $inputFormat format to compare with $outputFormat format', check);
