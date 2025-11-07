#!/usr/bin/env node

import { Command } from "commander";

const program = new Command();

// This is used as an example in the README for the Quick Start.

program
  .name('mickel')
  .description('CLI to some JavaScript string utilities')
  .version('0.8.0');

program
  .command('ifnti')
  .argument(`<String>`, "Niveau d'etude (L1, L2, L3)")
  .action((str, options) => {
    //const limit = options.first ? 1 : undefined;
    console.log("IFNTI");
    console.log("Bonjour "+str);
  });

program
  .command('join')
  .description('Join the command-arguments into a single string')
  .argument('<strings...>', 'one or more strings')
  .option('-s, --separator <char>', 'separator character', ',')
  .action((strings, options) => {
    console.log(strings.join(options.separator));
  });

program.parse();

// Try the following:
//    node string-util
//    node string-util help split
//    node string-util split --separator=/ a/b/c
//    node string-util split --first a,b,c
//    node string-util join a b c d