import pretty from './pretty';
import plain from './plain';
import json from './json';

const rendererFor = {
  pretty,
  plain,
  json,
};

export default (ast, format) => rendererFor[format](ast);
