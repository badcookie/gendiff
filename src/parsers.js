import yaml from 'js-yaml';
import ini from 'ini';

const parserFor = {
  '.json': JSON.parse,
  '.yml': yaml.safeLoad,
  '.yaml': yaml.safeLoad,
  '.ini': ini.parse,
};

export default (data, format) => parserFor[format](data.toString());
