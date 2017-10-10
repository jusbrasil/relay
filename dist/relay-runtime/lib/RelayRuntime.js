/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayRuntime
 * 
 * @format
 */

'use strict';

var RelayConnectionHandler = require('./RelayConnectionHandler');
var RelayConnectionInterface = require('./RelayConnectionInterface');
var RelayCore = require('./RelayCore');
var RelayInMemoryRecordSource = require('./RelayInMemoryRecordSource');
var RelayMarkSweepStore = require('./RelayMarkSweepStore');
var RelayModernEnvironment = require('./RelayModernEnvironment');
var RelayModernGraphQLTag = require('./RelayModernGraphQLTag');
var RelayNetwork = require('./RelayNetwork');
var RelayObservable = require('./RelayObservable');
var RelayQueryResponseCache = require('./RelayQueryResponseCache');
var RelayViewerHandler = require('./RelayViewerHandler');

var applyRelayModernOptimisticMutation = require('./applyRelayModernOptimisticMutation');
var commitLocalUpdate = require('./commitLocalUpdate');
var commitRelayModernMutation = require('./commitRelayModernMutation');
var fetchRelayModernQuery = require('./fetchRelayModernQuery');
var isRelayModernEnvironment = require('./isRelayModernEnvironment');
var requestRelaySubscription = require('./requestRelaySubscription');

// As early as possible, check for the existence of the JavaScript globals which
// Relay Runtime relies upon, and produce a clear message if they do not exist.
if (process.env.NODE_ENV !== 'production') {
  if (typeof Map !== 'function' || typeof Set !== 'function' || typeof Promise !== 'function' || typeof Object.assign !== 'function') {
    throw new Error('relay-runtime requires Map, Set, Promise, and Object.assign to exist. ' + 'Use a polyfill to provide these for older browsers.');
  }
}

/**
 * The public interface to Relay Runtime.
 */
module.exports = {
  // Core API
  Environment: RelayModernEnvironment,
  Network: RelayNetwork,
  Observable: RelayObservable,
  QueryResponseCache: RelayQueryResponseCache,
  RecordSource: RelayInMemoryRecordSource,
  Store: RelayMarkSweepStore,

  areEqualSelectors: RelayCore.areEqualSelectors,
  createFragmentSpecResolver: RelayCore.createFragmentSpecResolver,
  createOperationSelector: RelayCore.createOperationSelector,
  getDataIDsFromObject: RelayCore.getDataIDsFromObject,
  getFragment: RelayModernGraphQLTag.getFragment,
  getOperation: RelayModernGraphQLTag.getOperation,
  getSelector: RelayCore.getSelector,
  getSelectorList: RelayCore.getSelectorList,
  getSelectorsFromObject: RelayCore.getSelectorsFromObject,
  getVariablesFromObject: RelayCore.getVariablesFromObject,
  graphql: RelayModernGraphQLTag.graphql,

  // Extensions
  ConnectionHandler: RelayConnectionHandler,
  ViewerHandler: RelayViewerHandler,

  // Helpers (can be implemented via the above API)
  applyOptimisticMutation: applyRelayModernOptimisticMutation,
  commitLocalUpdate: commitLocalUpdate,
  commitMutation: commitRelayModernMutation,
  fetchQuery: fetchRelayModernQuery,
  isRelayModernEnvironment: isRelayModernEnvironment,
  requestSubscription: requestRelaySubscription,

  // Configuration interface for legacy or special uses
  ConnectionInterface: RelayConnectionInterface
};