import _ from 'lodash';

const gap = 4;
const getTab = count => ' '.repeat(count);

const stringifyValueFor = {
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
      return stringifyValueFor
        .unmodified(key, sampleRenderer(children, lineOffset + gap));
    }

    const values = [value, oldValue, newValue];

    if (!nodeHasObjectValueAmong(...values)) {
      return stringifyValueFor[type](key, value, oldValue, newValue, lineTab);
    }

    const deeperLineTab = getTab(lineOffset + gap);
    const deeperBraceTab = getTab(lowerBraceOffset + gap);

    const valuesForStringify = values.map((item) => {
      if (!_.isObject(item) || !item) {
        return item;
      }

      const complexValueString = _.keys(item)
        .map(property => stringifyValueFor.unmodified(property, item[property]))
        .join(`\n${deeperLineTab}`);

      return `{\n${deeperLineTab}${complexValueString}\n${deeperBraceTab}}`;
    });

    return stringifyValueFor[type](key, ...valuesForStringify, lineTab);
  };

  return `{\n${lineTab}${ast.map(build).join(`\n${lineTab}`)}\n${lowerBraceTab}}`;
};

export default sampleRenderer;
