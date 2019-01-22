import _ from 'lodash';
import fs from 'fs';

export default (filepath1, filepath2) => {
  const contentBefore = JSON.parse(fs.readFileSync(filepath1));
  const contentAfter = JSON.parse(fs.readFileSync(filepath2));

  const mergedKeys = _.union(_.keys(contentBefore), _.keys(contentAfter));

  const callback = (key) => {
    const valueBefore = contentBefore[key];
    const valueAfter = contentAfter[key];

    if (valueBefore === valueAfter) {
      return `  ${key}: ${valueBefore}\n`;
    }
    if (_.has(contentBefore, key)) {
      const output = `- ${key}: ${valueBefore}\n`;
      return _.has(contentAfter, key)
        ? `${output}+ ${key}: ${valueAfter}\n`
        : output;
    }
    return `+ ${key}: ${valueAfter}\n`;
  };

  const diffString = mergedKeys.map(callback).join('');
  return `\n${diffString}`;
};
