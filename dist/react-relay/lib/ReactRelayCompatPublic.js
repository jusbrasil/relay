/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactRelayCompatPublic
 * 
 * @format
 */

'use strict';

var ReactRelayCompatContainerBuilder = require('./ReactRelayCompatContainerBuilder');
var ReactRelayQueryRenderer = require('./ReactRelayQueryRenderer');
var RelayCompatContainer = require('./RelayCompatContainer');
var RelayCompatMutations = require('./RelayCompatMutations');
var RelayCompatPaginationContainer = require('./RelayCompatPaginationContainer');
var RelayCompatRefetchContainer = require('./RelayCompatRefetchContainer');

var _require = require('relay-runtime'),
    graphql = _require.graphql,
    fetchQuery = _require.fetchQuery;

/**
 * The public interface to React Relay which supports a compatibility mode to
 * continue to work with the classic React runtime.
 */
module.exports = {
  QueryRenderer: ReactRelayQueryRenderer,
  applyOptimisticMutation: RelayCompatMutations.applyUpdate,
  commitMutation: RelayCompatMutations.commitUpdate,
  createFragmentContainer: RelayCompatContainer.createContainer,
  createPaginationContainer: RelayCompatPaginationContainer.createContainer,
  createRefetchContainer: RelayCompatRefetchContainer.createContainer,
  fetchQuery: fetchQuery,
  graphql: graphql,
  injectDefaultVariablesProvider: ReactRelayCompatContainerBuilder.injectDefaultVariablesProvider
};