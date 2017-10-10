/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule cloneRelayHandleSourceField
 * 
 * @format
 */

'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayConcreteNode = require('./RelayConcreteNode');

var areEqual = require('fbjs/lib/areEqual');
var formatStorageKey = require('./formatStorageKey');
var getRelayHandleKey = require('./getRelayHandleKey');
var invariant = require('fbjs/lib/invariant');

var _require = require('./RelayStoreUtils'),
    getHandleFilterValues = _require.getHandleFilterValues;

var LINKED_FIELD = RelayConcreteNode.LINKED_FIELD;

/**
 * @private
 *
 * Creates a clone of the supplied `handleField` by finding the original linked
 * field (on which the handle was declared) among the sibling `selections`, and
 * copying its selections into the clone.
 */

function cloneRelayHandleSourceField(handleField, selections, variables) {
  var sourceField = selections.find(function (source) {
    return source.kind === LINKED_FIELD && source.name === handleField.name && source.alias === handleField.alias && areEqual(source.args, handleField.args);
  });
  !(sourceField && sourceField.kind === LINKED_FIELD) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'cloneRelayHandleSourceField: Expected a corresponding source field for ' + 'handle `%s`.', handleField.handle) : invariant(false) : void 0;
  var handleKey = getRelayHandleKey(handleField.handle, handleField.key, handleField.name);
  if (handleField.filters && handleField.filters.length > 0) {
    var filterValues = getHandleFilterValues(handleField.args || [], handleField.filters, variables);
    handleKey = formatStorageKey(handleKey, filterValues);
  }

  var clonedField = (0, _extends3['default'])({}, sourceField, {
    args: null,
    name: handleKey,
    storageKey: handleKey
  });
  return clonedField;
}

module.exports = cloneRelayHandleSourceField;