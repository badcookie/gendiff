import yaml from 'js-yaml';

const parserFor = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
};

export default (data, format) => parserFor[format](data);
