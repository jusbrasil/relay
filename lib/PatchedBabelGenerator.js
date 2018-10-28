/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @format
 */

'use strict';

var babelGenerator = require('babel-generator')['default'];
var Printer = require('babel-generator/lib/printer');

/**
 * babel-generator has a bug where it doesn't correctly adds parens around
 * some flow types. This mokey patches the code generator.
 *
 * TODO(T22289880): remove this module once the babel issue is fixed
 * https://github.com/babel/babel/issues/6333
 */
function generate(ast) {
  var originalUnionTypeAnnotation = Printer.prototype.UnionTypeAnnotation;
  var originalIntersectionTypeAnnotation = Printer.prototype.IntersectionTypeAnnotation;
  Printer.prototype.UnionTypeAnnotation = function (node) {
    var needsParens = node.types.length > 1;
    if (needsParens) {
      this.token('(');
    }
    originalUnionTypeAnnotation.call(this, node);
    if (needsParens) {
      this.token(')');
    }
  };
  Printer.prototype.IntersectionTypeAnnotation = function (node) {
    var needsParens = node.types.length > 1;
    if (needsParens) {
      this.token('(');
    }
    originalIntersectionTypeAnnotation.call(this, node);
    if (needsParens) {
      this.token(')');
    }
  };
  try {
    return babelGenerator(ast, {
      flowCommaSeparator: true,
      quotes: 'single'
    }).code;
  } finally {
    Printer.prototype.UnionTypeAnnotation = originalUnionTypeAnnotation;
    Printer.prototype.IntersectionTypeAnnotation = originalIntersectionTypeAnnotation;
  }
}

module.exports = {
  generate: generate
};