/*
  Copyright (C) 2012 Ariya Hidayat <ariya.hidayat@gmail.com>
  Redistribution and use in source and binary forms, with or without
  modification, are permitted provided that the following conditions are met:
    * Redistributions of source code must retain the above copyright
      notice, this list of conditions and the following disclaimer.
    * Redistributions in binary form must reproduce the above copyright
      notice, this list of conditions and the following disclaimer in the
      documentation and/or other materials provided with the distribution.
  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
  AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
  IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
  ARE DISCLAIMED. IN NO EVENT SHALL <COPYRIGHT HOLDER> BE LIABLE FOR ANY
  DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
  (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
  LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
  ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
  (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF
  THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
*/

'use strict';

var fs = require('fs');
var esprima = require('esprima');
var escodegen = require('escodegen');

function parse (fileName, indent, quotes, cb) {
    fs.readFile(fileName, function (err, file) {
        var option;
        var syntax;
        var code = file.toString();

        if (err) {
            return cb(err);
        }

        option = {
            comment: true,
            format: {
                indent: {
                    style: indent
                },
                quotes: quotes
            }
        };

        try {
            syntax = esprima.parse(code, { raw: true, tokens: true, range: true, comment: true });
            syntax = escodegen.attachComments(syntax, syntax.comments, syntax.tokens);
            code = escodegen.generate(syntax, option);

            fs.writeFile(fileName, code, function (err) {
                if (err) {
                    return cb(err);
                }
                cb();
            });
        } catch (e) {
            cb(e);
        }
    });
}


module.exports = parse;