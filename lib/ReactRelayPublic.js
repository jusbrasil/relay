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

var ReactRelayFragmentContainer = require('./ReactRelayFragmentContainer');
var ReactRelayPaginationContainer = require('./ReactRelayPaginationContainer');
var ReactRelayQueryRenderer = require('./ReactRelayQueryRenderer');
var ReactRelayRefetchContainer = require('./ReactRelayRefetchContainer');
var RelayRuntime = require('relay-runtime');

/**
 * The public interface to React Relay.
 */
module.exports = {
  QueryRenderer: ReactRelayQueryRenderer,

  MutationTypes: RelayRuntime.MutationTypes,
  RangeOperations: RelayRuntime.RangeOperations,

  commitLocalUpdate: RelayRuntime.commitLocalUpdate,
  commitMutation: RelayRuntime.commitMutation,
  createFragmentContainer: ReactRelayFragmentContainer.createContainer,
  createPaginationContainer: ReactRelayPaginationContainer.createContainer,
  createRefetchContainer: ReactRelayRefetchContainer.createContainer,
  fetchQuery: RelayRuntime.fetchQuery,
  graphql: RelayRuntime.graphql,
  requestSubscription: RelayRuntime.requestSubscription
};