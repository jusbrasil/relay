/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @fullSyntaxTransform
 * @format
 */

'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayTransformError = function RelayTransformError(message, loc) {
  (0, _classCallCheck3['default'])(this, RelayTransformError);

  this.message = message;
  this.loc = loc;
  this.stack = new Error().stack;
};

module.exports = RelayTransformError;