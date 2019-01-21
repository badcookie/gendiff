import _ from 'lodash';
import fs from 'fs';

export default (path1, path2) => {
  const before = JSON.parse(fs.readFileSync(path1));
  const after = JSON.parse(fs.readFileSync(path2));

  const mergedKeys = Array.from(
    new Set([...Object.keys(before), ...Object.keys(after)]),
  );

  const callback = (acc, key) => {
    const oldValue = before[key];
    const newValue = after[key];
    if (oldValue === newValue) {
      return { ...acc, [`  ${key}`]: `${oldValue}` };
    }
    if (_.has(before, key)) {
      const output = { ...acc, [`- ${key}`]: `${oldValue}` };
      return _.has(after, key)
        ? { ...output, [`+ ${key}`]: `${newValue}` }
        : { ...output };
    }
    return { ...acc, [`+ ${key}`]: `${newValue}` };
  };

  const diff = mergedKeys.reduce(callback, {});
  return JSON.stringify(diff);
};
