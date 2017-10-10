/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayFlowBabelFactories
 * 
 * @format
 */

'use strict';

var t = require('babel-types');

/**
 * {|
 *   PROPS
 * |}
 */
function exactObjectTypeAnnotation(props) {
  var typeAnnotation = t.objectTypeAnnotation(props);
  typeAnnotation.exact = true;
  return typeAnnotation;
}

/**
 * export type NAME = TYPE
 */
function exportType(name, type) {
  return t.exportNamedDeclaration(t.typeAlias(t.identifier(name), null, type), [], null);
}

function lineComments() {
  for (var _len = arguments.length, lines = Array(_len), _key = 0; _key < _len; _key++) {
    lines[_key] = arguments[_key];
  }

  return lines.map(function (line) {
    return { type: 'CommentLine', value: ' ' + line };
  });
}

/**
 * $ReadOnlyArray<TYPE>
 */
function readOnlyArrayOfType(thing) {
  return t.genericTypeAnnotation(t.identifier('$ReadOnlyArray'), t.typeParameterInstantiation([thing]));
}

/**
 * +KEY: VALUE
 */
function readOnlyObjectTypeProperty(key, value) {
  var prop = t.objectTypeProperty(t.identifier(key), value);
  prop.variance = 'plus';
  return prop;
}

function stringLiteralTypeAnnotation(value) {
  var annotation = t.stringLiteralTypeAnnotation();
  annotation.value = value;
  return annotation;
}

module.exports = {
  exactObjectTypeAnnotation: exactObjectTypeAnnotation,
  exportType: exportType,
  lineComments: lineComments,
  readOnlyArrayOfType: readOnlyArrayOfType,
  readOnlyObjectTypeProperty: readOnlyObjectTypeProperty,
  stringLiteralTypeAnnotation: stringLiteralTypeAnnotation
};