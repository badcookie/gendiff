import sampleRenderer from './renderers/sample';

const rendererFor = {
  sample: sampleRenderer,
};

export default (ast, format) => rendererFor[format](ast);
