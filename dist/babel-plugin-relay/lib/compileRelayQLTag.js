/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule compileRelayQLTag
 * 
 * @format
 */

'use strict';

var createTransformError = require('./createTransformError');
var getClassicTransformer = require('./getClassicTransformer');

/**
 * Given all the metadata about a found RelayQL tag, compile it and return
 * the resulting Babel AST.
 */
function compileRelayQLTag(t, path, schemaProvider, quasi, documentName, propName, tagName, enableValidation, state) {
  try {
    var fileOpts = state.file && state.file.opts || {};
    var transformer = getClassicTransformer(schemaProvider, state.opts || {}, fileOpts);
    return transformer.transform(t, quasi, {
      documentName: documentName,
      propName: propName,
      tagName: tagName,
      enableValidation: enableValidation
    });
  } catch (error) {
    throw path.buildCodeFrameError(createTransformError(error), Error);
  }
}

module.exports = compileRelayQLTag;