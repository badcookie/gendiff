import _ from 'lodash';
import fs from 'fs';

export default (filepath1, filepath2) => {
  const contentBefore = JSON.parse(fs.readFileSync(filepath1));
  const contentAfter = JSON.parse(fs.readFileSync(filepath2));

  const mergedKeys = _.union(_.keys(contentBefore), _.keys(contentAfter));

  const callback = (acc, key) => {
    const valueBefore = contentBefore[key];
    const valueAfter = contentAfter[key];

    if (valueBefore === valueAfter) {
      return { ...acc, key };
    }
    if (_.has(contentBefore, key)) {
      const output = { ...acc, [`- ${key}`]: `${valueBefore}` };
      return _.has(contentAfter, key)
        ? { ...output, [`+ ${key}`]: `${valueAfter}` }
        : { ...output };
    }
    return { ...acc, [`+ ${key}`]: `${valueAfter}` };
  };

  const diffObject = mergedKeys.reduce(callback, {});
  return JSON.stringify(diffObject);
};
