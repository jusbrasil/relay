/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule ReactRelayPublic
 * 
 * @format
 */

'use strict';

var ReactRelayFragmentContainer = require('./ReactRelayFragmentContainer');
var ReactRelayPaginationContainer = require('./ReactRelayPaginationContainer');
var ReactRelayQueryRenderer = require('./ReactRelayQueryRenderer');
var ReactRelayRefetchContainer = require('./ReactRelayRefetchContainer');

var _require = require('relay-runtime'),
    commitLocalUpdate = _require.commitLocalUpdate,
    commitMutation = _require.commitMutation,
    fetchQuery = _require.fetchQuery,
    graphql = _require.graphql,
    requestSubscription = _require.requestSubscription;

/**
 * The public interface to React Relay.
 */
module.exports = {
  QueryRenderer: ReactRelayQueryRenderer,
  createFragmentContainer: ReactRelayFragmentContainer.createContainer,
  createPaginationContainer: ReactRelayPaginationContainer.createContainer,
  createRefetchContainer: ReactRelayRefetchContainer.createContainer,
  commitLocalUpdate: commitLocalUpdate,
  commitMutation: commitMutation,
  fetchQuery: fetchQuery,
  graphql: graphql,
  requestSubscription: requestSubscription
};