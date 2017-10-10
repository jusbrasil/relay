/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule normalizePayload
 * 
 * @format
 */

'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayError = require('./RelayError');

var normalizeRelayPayload = require('./normalizeRelayPayload');

var _require = require('./RelayStoreUtils'),
    ROOT_ID = _require.ROOT_ID;

function normalizePayload(operation, variables, payload) {
  var data = payload.data,
      errors = payload.errors;

  if (data != null) {
    return normalizeRelayPayload({
      dataID: ROOT_ID,
      node: operation.query,
      variables: payload.rerunVariables ? (0, _extends3['default'])({}, variables, payload.rerunVariables) : variables
    }, data, errors, { handleStrippedNulls: true });
  }
  var error = RelayError.create('RelayNetwork', 'No data returned for operation `%s`, got error(s):\n%s\n\nSee the error ' + '`source` property for more information.', operation.name, errors ? errors.map(function (_ref) {
    var message = _ref.message;
    return message;
  }).join('\n') : '(No errors)');
  error.source = { errors: errors, operation: operation, variables: variables };
  throw error;
}

module.exports = normalizePayload;