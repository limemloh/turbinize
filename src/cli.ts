#!/usr/bin/env node

import chalk from "chalk";
import * as fs from "fs";
import { turbinizeHTMLFile } from "./files";
import yargs from "yargs";
import { promisify } from "util";

yargs(process.argv).command("turbinize", "Convert HTML files to Turbine Code", {
  input: {
    describe: "Input HTML file",
    type: "string"
  },
  output: {
    describe: "output file",
    type: "string"
  }
});

// const usageText = `
// Turbinize, converting your HTML to Turbine.

// usage:
//   turbinize <input.html> <outputFile>
//   `;

// function usage() {
//   console.log(usageText);
// }

// function errorLog(error) {
//   const eLog = chalk.red(error);
//   console.log(eLog);
// }

// async function main() {
//   if (args.length < 3) {
//     errorLog(`must have an input file`);
//     usage();
//     return;
//   }
//   const inputFiles = args.slice(2, args.length - 1);
//   const outputPath = args[args.length - 1];
//   if (inputFiles.length > 1 && !fs.lstatSync(outputPath).isDirectory()) {
//     errorLog("multiple input files must be outputed to a directory");
//     usage();
//     return;
//   }

//   for (const input of inputFiles) {
//     const res = await turbinizeHTMLFile(input);
//     fs.writeFileSync(outputPath + "/res.ts", res);
//   }
// }

// main();
