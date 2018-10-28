/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * 
 * @format
 */

'use strict';

var QueryBuilder = require('./QueryBuilder');

var invariant = require('fbjs/lib/invariant');

var _require = require('./RelayVariables'),
    getOperationVariables = _require.getOperationVariables;

var _require2 = require('./RelayStoreConstants'),
    ROOT_ID = _require2.ROOT_ID;

/**
 * @public
 *
 * Implementation of `RelayCore#createOperationSelector()` defined in
 * `RelayEnvironmentTypes` for the classic core.
 */
function createOperationSelector(operation, variables,
// unused param for compatibility with modern API
_modernOperation) {
  var concreteFragment = QueryBuilder.getFragment(operation.node);
  !concreteFragment ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayOperationSelector: Expected a query, got %s `%s`.', operation.node.kind, operation.name) : invariant(false) : void 0;

  var operationVariables = getOperationVariables(operation, variables);
  var fragment = {
    dataID: ROOT_ID,
    node: concreteFragment,
    variables: operationVariables
  };

  return {
    fragment: fragment,
    node: operation,
    root: fragment,
    variables: operationVariables
  };
}

module.exports = {
  createOperationSelector: createOperationSelector
};