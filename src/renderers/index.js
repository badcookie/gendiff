import sample from './sample';

const rendererFor = {
  sample,
};

export default (ast, format) => rendererFor[format](ast);
