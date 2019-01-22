#!/usr/bin/env node
import command from 'commander';
import genDiff from '..';

command
  .description('Compares two configuration files and shows the difference.');

command
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format');

command
  .arguments('<firstConfig> <secondConfig>')
  .action((firstConfig, secondConfig) => {
    const generatedDifference = genDiff(firstConfig, secondConfig);
    console.log('');
    console.log(generatedDifference);
    console.log('');
  });

command.parse(process.argv);
