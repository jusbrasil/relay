/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule callsToGraphQL
 * 
 * @format
 */

'use strict';

var QueryBuilder = require('./QueryBuilder');

/**
 * @internal
 *
 * Convert from plain object `{name, value}` calls to GraphQL call nodes.
 */
function callsToGraphQL(calls) {
  return calls.map(function (_ref) {
    var name = _ref.name,
        type = _ref.type,
        value = _ref.value;

    var concreteValue = null;
    if (Array.isArray(value)) {
      concreteValue = value.map(QueryBuilder.createCallValue);
    } else if (value != null) {
      concreteValue = QueryBuilder.createCallValue(value);
    }
    return QueryBuilder.createCall(name, concreteValue, type);
  });
}

module.exports = callsToGraphQL;