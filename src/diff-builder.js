import _ from 'lodash';

const types = [
  {
    type: 'added',
    predicate: (key, oldData, newData) => !_.has(oldData, key) && _.has(newData, key),
    properties: (key, oldData, newData) => ({ value: newData[key] }),
  },
  {
    type: 'deleted',
    predicate: (key, oldData, newData) => _.has(oldData, key) && !_.has(newData, key),
    properties: (key, oldData) => ({ value: oldData[key] }),
  },
  {
    type: 'nested',
    predicate: (key, oldData, newData) => _.isObject(oldData[key]) && _.isObject(newData[key]),
    properties: (key, oldData, newData, fn) => ({ children: fn(oldData[key], newData[key]) }),
  },
  {
    type: 'unmodified',
    predicate: (key, oldData, newData) => oldData[key] === newData[key],
    properties: (key, oldData) => ({ value: oldData[key] }),
  },
  {
    type: 'modified',
    predicate: (key, oldData, newData) => oldData[key] !== newData[key],
    properties: (key, oldData, newData) => ({ oldValue: oldData[key], newValue: newData[key] }),
  },
];

const getTypeSettings = (...args) => (
  types.find(({ predicate }) => predicate(...args))
);

const buildDiff = (dataBefore, dataAfter) => {
  const mergedKeys = _.union(_.keys(dataBefore), _.keys(dataAfter));

  return mergedKeys.map((key) => {
    const args = [key, dataBefore, dataAfter];
    const { type, properties } = getTypeSettings(...args);
    return { key, type, ...properties(...args, buildDiff) };
  });
};

export default buildDiff;
