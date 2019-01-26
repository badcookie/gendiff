import sample from './sample';
import plain from './plain';

const rendererFor = {
  sample,
  plain,
};

export default (ast, format) => rendererFor[format](ast);
