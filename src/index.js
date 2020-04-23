import fs from 'fs';
import path from 'path';
import parse from './parsers';
import buildDiff from './diff-builder';
import render from './renderers';

export default (filepathBefore, filepathAfter, outputFormat) => {
  const contentBefore = fs.readFileSync(filepathBefore, 'utf-8');
  const contentAfter = fs.readFileSync(filepathAfter, 'utf-8');

  const extBefore = path.extname(filepathBefore).slice(1);
  const extAfter = path.extname(filepathAfter).slice(1);

  const dataBefore = parse(contentBefore, extBefore);
  const dataAfter = parse(contentAfter, extAfter);

  const astDiff = buildDiff(dataBefore, dataAfter);
  return render(astDiff, outputFormat);
};
