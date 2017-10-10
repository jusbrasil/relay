/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule createRelayQuery
 * 
 * @format
 */

'use strict';

var RelayMetaRoute = require('./RelayMetaRoute');
var RelayQuery = require('./RelayQuery');

var invariant = require('fbjs/lib/invariant');

function createRelayQuery(node, variables) {
  !(typeof variables === 'object' && variables != null && !Array.isArray(variables)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Relay.Query: Expected `variables` to be an object.') : invariant(false) : void 0;
  return RelayQuery.Root.create(node, RelayMetaRoute.get('$createRelayQuery'), variables);
}

module.exports = createRelayQuery;