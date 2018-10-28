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

var GraphQLStoreQueryResolver = require('./GraphQLStoreQueryResolver');
var RelayContainer = require('./RelayContainer');
var RelayContainerProxy = require('./RelayContainerProxy');
var RelayEnvironment = require('./RelayEnvironment');
var RelayGraphQLMutation = require('./RelayGraphQLMutation');
var RelayInternals = require('./RelayInternals');
var RelayMutation = require('./RelayMutation');
var RelayPropTypes = require('./RelayPropTypes');
var RelayQL = require('./RelayQL');
var RelayQueryConfig = require('./RelayQueryConfig');
var RelayReadyStateRenderer = require('./RelayReadyStateRenderer');
var RelayRenderer = require('./RelayRenderer');
var RelayRootContainer = require('./RelayRootContainer');
var RelayRoute = require('./RelayRoute');
var RelayRuntime = require('relay-runtime');
var RelayStore = require('./RelayStore');

var createRelayQuery = require('./createRelayQuery');
var getRelayQueries = require('./getRelayQueries');
var isRelayContainer = require('./isRelayContainer');

if (typeof global.__REACT_DEVTOOLS_GLOBAL_HOOK__ !== 'undefined') {
  global.__REACT_DEVTOOLS_GLOBAL_HOOK__._relayInternals = RelayInternals;
}

/**
 * Relay contains the set of public methods used to initialize and orchestrate
 * a React application that uses GraphQL to declare data dependencies.
 */
var RelayPublic = {
  Environment: RelayEnvironment,
  GraphQLMutation: RelayGraphQLMutation,
  GraphQLStoreQueryResolver: GraphQLStoreQueryResolver,
  Mutation: RelayMutation,
  PropTypes: RelayPropTypes,
  QL: RelayQL,
  QueryConfig: RelayQueryConfig,
  ReadyStateRenderer: RelayReadyStateRenderer,
  RelayContainerProxy: RelayContainerProxy,
  Renderer: RelayRenderer,
  RootContainer: RelayRootContainer,
  Route: RelayRoute,
  Store: RelayStore,

  MutationTypes: RelayRuntime.MutationTypes,
  RangeOperations: RelayRuntime.RangeOperations,

  createContainer: RelayContainer.create,
  createQuery: createRelayQuery,
  getQueries: getRelayQueries,
  injectNetworkLayer: RelayStore.injectNetworkLayer.bind(RelayStore),
  injectTaskScheduler: RelayStore.injectTaskScheduler.bind(RelayStore),
  isContainer: isRelayContainer
};

module.exports = RelayPublic;