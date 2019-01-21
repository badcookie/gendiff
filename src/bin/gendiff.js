#!/usr/bin/env node
import command from 'commander';

command
  .description('Compares two configuration files and shows the difference.');

command
  .option('-V, --version', 'output the version number')
  .option('-f, --format [type]', 'output format');

command
  .arguments('<firstConfig> <secondConfig>');

command.parse(process.argv);
