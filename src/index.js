import _ from 'lodash';
import fs from 'fs';
import path from 'path';
import parse from './parsers';

export default (filepath1, filepath2) => {
  const contentBefore = parse(fs.readFileSync(filepath1, 'utf-8'), path.extname(filepath1));
  const contentAfter = parse(fs.readFileSync(filepath2, 'utf-8'), path.extname(filepath2));

  const mergedKeys = _.union(_.keys(contentBefore), _.keys(contentAfter));

  const buildDiffString = (key) => {
    const valueBefore = contentBefore[key];
    const valueAfter = contentAfter[key];

    if (valueBefore === valueAfter) {
      return `  ${key}: ${valueBefore}`;
    }
    if (_.has(contentBefore, key)) {
      const output = `- ${key}: ${valueBefore}`;
      return _.has(contentAfter, key)
        ? `${output}\n+ ${key}: ${valueAfter}`
        : output;
    }
    return `+ ${key}: ${valueAfter}`;
  };

  return mergedKeys.map(buildDiffString).join('\n');
};
