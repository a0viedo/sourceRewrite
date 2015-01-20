#!/usr/bin/env node

var program = require('commander');
var path = require('path');
var parse = require('../lib/parse');
var indent;
var quotes;
var output;


program
  .version(require(path.join('..', './package.json')))
  .option('-i, --indent [type]', 'Especify indent type')
  .option('-q, --quotes [type]', 'Especify quotes type.')
  .option('-f, --file [path]', 'Source file to rewrite.')
  .option('-o, --output [path]', 'Output file')
  .parse(process.argv);


indent = program.indent || '  ';
quotes = program.quotes || 'single';
output = program.output || program.file;

if (!program.file) {
    throw new Error('Source file must be provided.')
}

parse(output, indent, quotes, function (err) {
    if (err) {
        return console.log('Cannot rewrite file \'' + program.file + '\'. Error:' + err.message);
    }
    console.log('File \'' + output + '\' was rewrited successfully.');
});