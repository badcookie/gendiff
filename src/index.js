import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildDiff from './diff-builder';
import render from './renderers';

export default (filepath1, filepath2, outputFormat) => {
  const content1 = fs.readFileSync(filepath1, 'utf-8');
  const content2 = fs.readFileSync(filepath2, 'utf-8');

  const dataBefore = parse(content1, path.extname(filepath1));
  const dataAfter = parse(content2, path.extname(filepath2));

  const astDiff = buildDiff(dataBefore, dataAfter);
  return render(astDiff, outputFormat);
};
