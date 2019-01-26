import _ from 'lodash';

const stringify = value => (_.isObject(value) ? '[complex value]' : `'${value}'`);

const getInfoFor = {
  deleted: (root, { key, type }) => `Property '${root}${key}' was ${type}`,
  added: (root, { key, type, value }) => `Property '${root}${key}' was ${type} with value: ${stringify(value)}`,
  unmodified: () => '',
  modified: (root, {
    key, type, oldValue, newValue,
  }) => `Property '${root}${key}' was ${type} from ${stringify(oldValue)} to ${stringify(newValue)}`,
  nested: (root, { key, children }, fn) => fn(children, `${root}${key}.`),
};

const plain = (ast, root = '') => {
  const buildString = (node) => {
    const { type } = node;
    return getInfoFor[type](root, node, plain);
  };

  return ast.map(buildString).filter(line => line !== '').join('\n');
};

export default plain;
