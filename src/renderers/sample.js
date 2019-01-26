import _ from 'lodash';

const gap = 4;
const initOffset = 2;

const getOffset = level => initOffset + (level - 1) * gap;
const getTab = offset => ' '.repeat(offset);

const stringify = (value, offset) => {
  if (!_.isObject(value)) {
    return value;
  }
  const lineTab = getTab(offset + gap);
  const lowerBraceTab = getTab(offset - 2 + gap);
  const complexValueString = _.keys(value)
    .map(key => `  ${key}: ${value[key]}`)
    .join(`\n${lineTab}`);
  return `{\n${lineTab}${complexValueString}\n${lowerBraceTab}}`;
};

const getStringFor = {
  deleted: (offset, key, value) => `- ${key}: ${stringify(value, offset)}`,
  added: (offset, key, value) => `+ ${key}: ${stringify(value, offset)}`,
  unmodified: (offset, key, value) => `  ${key}: ${stringify(value, offset)}`,
  modified(offset, key, value, oldValue, newValue) {
    return [this.deleted(offset, key, oldValue), this.added(offset, key, newValue)];
  },
  nested: (offset, key, value, oldValue, newValue, children, fn, depth) => `  ${key}: ${fn(children, depth)}`,
};

const sample = (ast, depth = 1) => {
  const offset = getOffset(depth);
  const lineTab = getTab(offset);
  const lowerBraceTab = getTab(offset - 2);

  const buildString = (node) => {
    const {
      key, type, children, value, oldValue, newValue,
    } = node;
    const properties = [key, value, oldValue, newValue, children];
    return getStringFor[type](offset, ...properties, sample, depth + 1);
  };

  const diffString = _.flatten(ast.map(buildString)).join(`\n${lineTab}`);
  return `{\n${lineTab}${diffString}\n${lowerBraceTab}}`;
};

export default sample;
