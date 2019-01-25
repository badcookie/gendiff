import _ from 'lodash';

const unsetValue = () => null;

const states = [
  {
    state: 'added',
    predicate: (key, oldData, newData) => (
      !_.has(oldData, key) && _.has(newData, key)
    ),
    getChildren: unsetValue,
    getValue: (key, oldData, newData) => newData[key],
  },
  {
    state: 'deleted',
    predicate: (key, oldData, newData) => (
      _.has(oldData, key) && !_.has(newData, key)
    ),
    getChildren: unsetValue,
    getValue: (key, oldData) => oldData[key],
  },
  {
    state: 'nested',
    predicate: (
      (key, oldData, newData) => _.isObject(oldData[key]) && _.isObject(newData[key])
    ),
    getChildren: (fn, ...args) => fn(...args),
    getValue: unsetValue,
  },
  {
    state: 'unmodified',
    predicate: (
      (key, oldData, newData) => oldData[key] === newData[key]
    ),
    getChildren: unsetValue,
    getValue: (key, oldData) => oldData[key],
  },
];

const getStateSettings = (...args) => (
  states.find(({ predicate }) => predicate(...args))
);

const buildDiff = (dataBefore, dataAfter) => {
  const mergedKeys = _.union(_.keys(dataBefore), _.keys(dataAfter));

  const build = (key) => {
    const settings = getStateSettings(key, dataBefore, dataAfter);
    return settings
      ? {
        key,
        state: settings.state,
        children: settings.getChildren(buildDiff, dataBefore[key], dataAfter[key]),
        value: settings.getValue(key, dataBefore, dataAfter),
      }
      : [{
        key,
        state: 'deleted',
        value: dataBefore[key],
        children: null,
      },
      {
        key,
        state: 'added',
        value: dataAfter[key],
        children: null,
      }];
  };

  return _.flatten(mergedKeys.map(build));
};

export default buildDiff;
