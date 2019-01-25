import _ from 'lodash';

const stringifyValueFor = {
  unmodified: (key, value) => `  ${key}: ${value}`,
  deleted: (key, value) => `- ${key}: ${value}`,
  added: (key, value) => `+ ${key}: ${value}`,
};

const offset = 4;
const getTab = count => ' '.repeat(count);

const sampleRenderer = (ast, keyOffset = -2, braceOffset = -4) => {
  const newKeyOffset = keyOffset + offset;
  const newBraceOffset = braceOffset + offset;

  const keyTab = getTab(newKeyOffset);
  const braceTab = getTab(newBraceOffset);

  const build = (node) => {
    const {
      key, state, children, value,
    } = node;

    if (state === 'nested') {
      return stringifyValueFor
        .unmodified(key, sampleRenderer(children, newKeyOffset, newBraceOffset));
    }

    if (_.isObject(value)) {
      const deepKeyTab = getTab(newKeyOffset + offset);
      const deepBraceTab = getTab(newBraceOffset + offset);

      const deepKeys = _.keys(value);
      const deepString = deepKeys
        .map(k => stringifyValueFor.unmodified(k, value[k]))
        .join(`\n${deepKeyTab}`);

      const deepValue = `{\n${deepKeyTab}${deepString}\n${deepBraceTab}}`;
      return stringifyValueFor[state](key, deepValue);
    }

    return stringifyValueFor[state](key, value);
  };

  return `{\n${keyTab}${ast.map(build).join(`\n${keyTab}`)}\n${braceTab}}`;
};

export default sampleRenderer;
