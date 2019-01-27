#!/usr/bin/env node
import program from 'commander';
import genDiff from '..';
import { version } from '../../package.json';

program
  .description('Compares two configuration files and shows the difference.')
  .version(version);

program
  .option('-f, --format [type]', 'output format', 'pretty');

program
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    console.log('');
    console.log(genDiff(firstConfig, secondConfig, program.format));
    console.log('');
  });

program.parse(process.argv);
