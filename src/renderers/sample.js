import _ from 'lodash';

const gap = 4;
const getTab = count => ' '.repeat(count);

const stringify = {
  unmodified: (key, value) => `  ${key}: ${value}`,
  deleted: (key, value) => `- ${key}: ${value}`,
  added: (key, value) => `+ ${key}: ${value}`,
  modified: (key, value, oldValue, newValue, tab) => (
    `- ${key}: ${oldValue}\n${tab}+ ${key}: ${newValue}`
  ),
};

const nodeHasObjectValueAmong = (value, oldValue, newValue) => (
  _.isObject(value) || _.isObject(oldValue) || _.isObject(newValue)
);

const sampleRenderer = (ast, lineOffset = 2) => {
  const lowerBraceOffset = lineOffset - 2;

  const lineTab = getTab(lineOffset);
  const lowerBraceTab = getTab(lowerBraceOffset);

  const build = (node) => {
    const {
      key, type, children, value, oldValue, newValue,
    } = node;

    if (type === 'nested') {
      return stringify.unmodified(key, sampleRenderer(children, lineOffset + gap));
    }

    const values = [value, oldValue, newValue];

    if (!nodeHasObjectValueAmong(...values)) {
      return stringify[type](key, ...values, lineTab);
    }

    const deeperLineTab = getTab(lineOffset + gap);
    const deeperBraceTab = getTab(lowerBraceOffset + gap);
    const valuesToStringify = values.map((item) => {
      if (!_.isObject(item) || !item) {
        return item;
      }
      const complexValueString = _.keys(item)
        .map(property => stringify.unmodified(property, item[property]))
        .join(`\n${deeperLineTab}`);
      return `{\n${deeperLineTab}${complexValueString}\n${deeperBraceTab}}`;
    });
    return stringify[type](key, ...valuesToStringify, lineTab);
  };

  return `{\n${lineTab}${ast.map(build).join(`\n${lineTab}`)}\n${lowerBraceTab}}`;
};

export default sampleRenderer;
