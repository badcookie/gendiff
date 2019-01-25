import _ from 'lodash';

const stringifyValueFor = {
  unmodified: (key, value) => `  ${key}: ${value}`,
  deleted: (key, value) => `- ${key}: ${value}`,
  added: (key, value) => `+ ${key}: ${value}`,
};

const gap = 4;
const getTab = count => ' '.repeat(count);

const sampleRenderer = (ast, lineOffset = -2) => {
  const newLineOffset = lineOffset + gap;
  const lowerBraceOffset = newLineOffset - 2;

  const lineTab = getTab(newLineOffset);
  const lowerBraceTab = getTab(lowerBraceOffset);

  const build = (node) => {
    const {
      key, state, children, value,
    } = node;

    if (state === 'nested') {
      return stringifyValueFor
        .unmodified(key, sampleRenderer(children, newLineOffset));
    }

    if (_.isObject(value)) {
      const deeperLineTab = getTab(newLineOffset + gap);
      const deeperBraceTab = getTab(lowerBraceOffset + gap);

      const complexValueString = _.keys(value)
        .map(k => stringifyValueFor.unmodified(k, value[k]))
        .join(`\n${deeperLineTab}`);

      const complexValueStringWithBraces = `{\n${deeperLineTab}${complexValueString}\n${deeperBraceTab}}`;
      return stringifyValueFor[state](key, complexValueStringWithBraces);
    }

    return stringifyValueFor[state](key, value);
  };

  return `{\n${lineTab}${ast.map(build).join(`\n${lineTab}`)}\n${lowerBraceTab}}`;
};

export default sampleRenderer;
