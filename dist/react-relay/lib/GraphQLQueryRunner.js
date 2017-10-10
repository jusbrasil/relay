/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule GraphQLQueryRunner
 * 
 * @format
 */

'use strict';

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayFetchMode = require('./RelayFetchMode');
var RelayProfiler = require('./RelayProfiler');
var RelayReadyState = require('./RelayReadyState');

var checkRelayQueryData = require('./checkRelayQueryData');
var diffRelayQuery = require('./diffRelayQuery');
var everyObject = require('fbjs/lib/everyObject');
var flattenSplitRelayQueries = require('./flattenSplitRelayQueries');
var forEachObject = require('fbjs/lib/forEachObject');
var generateForceIndex = require('./generateForceIndex');
var mapObject = require('fbjs/lib/mapObject');
var resolveImmediate = require('fbjs/lib/resolveImmediate');
var someObject = require('fbjs/lib/someObject');
var splitDeferredRelayQueries = require('./splitDeferredRelayQueries');
var throwFailedPromise = require('./throwFailedPromise');
var warning = require('fbjs/lib/warning');

/**
 * This is the high-level entry point for sending queries to the GraphQL
 * endpoint. It provides methods for scheduling queries (`run`), force-fetching
 * queries (ie. ignoring the cache; `forceFetch`).
 *
 * In order to send minimal queries and avoid re-retrieving data,
 * `GraphQLQueryRunner` maintains a registry of pending (in-flight) queries, and
 * "subtracts" those from any new queries that callers enqueue.
 *
 * @internal
 */
var GraphQLQueryRunner = function () {
  function GraphQLQueryRunner(storeData) {
    (0, _classCallCheck3['default'])(this, GraphQLQueryRunner);

    this._storeData = storeData;
  }

  /**
   * Fetches data required to resolve a set of queries. See the `RelayStore`
   * module for documentation on the callback.
   */


  GraphQLQueryRunner.prototype.run = function run(querySet, callback) {
    var fetchMode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : RelayFetchMode.CLIENT;

    return runQueries(this._storeData, querySet, callback, fetchMode);
  };

  /**
   * Ignores the cache and fetches data required to resolve a set of queries.
   * Uses the data we get back from the server to overwrite data in the cache.
   *
   * Even though we're ignoring the cache, we will still invoke the callback
   * immediately with `ready: true` if `querySet` can be resolved by the cache.
   */


  GraphQLQueryRunner.prototype.forceFetch = function forceFetch(querySet, callback) {
    var fetchMode = RelayFetchMode.REFETCH;
    return runQueries(this._storeData, querySet, callback, fetchMode);
  };

  return GraphQLQueryRunner;
}();

function hasItems(map) {
  return !!Object.keys(map).length;
}

function splitAndFlattenQueries(storeData, queries) {
  if (!storeData.getNetworkLayer().supports('defer')) {
    if (process.env.NODE_ENV !== 'production') {
      queries.forEach(function (query) {
        process.env.NODE_ENV !== 'production' ? warning(!query.hasDeferredDescendant(), 'Relay: Query `%s` contains a deferred fragment (e.g. ' + "`getFragment('foo').defer()`) which is not supported by the " + 'default network layer. This query will be sent without deferral.', query.getName()) : void 0;
      });
    }
    return queries;
  }

  var flattenedQueries = [];
  queries.forEach(function (query) {
    return flattenedQueries.push.apply(flattenedQueries, (0, _toConsumableArray3['default'])(flattenSplitRelayQueries(splitDeferredRelayQueries(query))));
  });
  return flattenedQueries;
}

function runQueries(storeData, querySet, callback, fetchMode) {
  var profiler = fetchMode === RelayFetchMode.REFETCH ? RelayProfiler.profile('GraphQLQueryRunner.forceFetch') : RelayProfiler.profile('GraphQLQueryRunner.primeCache');

  var readyState = new RelayReadyState(callback);

  var remainingFetchMap = {};
  var remainingRequiredFetchMap = {};

  function onResolved(pendingFetch) {
    var pendingQuery = pendingFetch.getQuery();
    var pendingQueryID = pendingQuery.getID();
    delete remainingFetchMap[pendingQueryID];
    if (!pendingQuery.isDeferred()) {
      delete remainingRequiredFetchMap[pendingQueryID];
    }

    if (hasItems(remainingRequiredFetchMap)) {
      return;
    }

    if (someObject(remainingFetchMap, function (query) {
      return query.isResolvable();
    })) {
      // The other resolvable query will resolve imminently and call
      // `readyState.update` instead.
      return;
    }

    if (hasItems(remainingFetchMap)) {
      readyState.update({
        done: false,
        ready: true,
        stale: false
      }, [{ type: 'NETWORK_QUERY_RECEIVED_REQUIRED' }]);
    } else {
      readyState.update({
        done: true,
        ready: true,
        stale: false
      }, [{ type: 'NETWORK_QUERY_RECEIVED_ALL' }]);
    }
  }

  function onRejected(pendingFetch, error) {
    readyState.update({ error: error }, [{ type: 'NETWORK_QUERY_ERROR', error: error }]);
  }

  function canResolve(fetch) {
    return checkRelayQueryData(storeData.getQueuedStore(), fetch.getQuery());
  }

  throwFailedPromise(storeData.getTaskQueue().enqueue(function () {
    var forceIndex = fetchMode === RelayFetchMode.REFETCH ? generateForceIndex() : null;

    var queries = [];
    if (fetchMode === RelayFetchMode.CLIENT) {
      forEachObject(querySet, function (query) {
        if (query) {
          queries.push.apply(queries, (0, _toConsumableArray3['default'])(diffRelayQuery(query, storeData.getRecordStore(), storeData.getQueryTracker())));
        }
      });
    } else {
      forEachObject(querySet, function (query) {
        if (query) {
          queries.push(query);
        }
      });
    }

    var flattenedQueries = splitAndFlattenQueries(storeData, queries);

    var networkEvent = [];
    if (flattenedQueries.length) {
      networkEvent.push({ type: 'NETWORK_QUERY_START' });
    }

    flattenedQueries.forEach(function (query) {
      var pendingFetch = storeData.getPendingQueryTracker().add({ query: query, fetchMode: fetchMode, forceIndex: forceIndex, storeData: storeData });
      var queryID = query.getID();
      remainingFetchMap[queryID] = pendingFetch;
      if (!query.isDeferred()) {
        remainingRequiredFetchMap[queryID] = pendingFetch;
      }
      pendingFetch.getResolvedPromise().then(onResolved.bind(null, pendingFetch), onRejected.bind(null, pendingFetch));
    });

    if (!hasItems(remainingFetchMap)) {
      readyState.update({
        done: true,
        ready: true
      }, [].concat(networkEvent, [{ type: 'STORE_FOUND_ALL' }]));
    } else {
      if (!hasItems(remainingRequiredFetchMap)) {
        readyState.update({ ready: true }, [].concat(networkEvent, [{ type: 'STORE_FOUND_REQUIRED' }]));
      } else {
        readyState.update({ ready: false }, [].concat(networkEvent, [{ type: 'CACHE_RESTORE_START' }]));

        resolveImmediate(function () {
          if (storeData.hasCacheManager()) {
            var requiredQueryMap = mapObject(remainingRequiredFetchMap, function (value) {
              return value.getQuery();
            });
            storeData.restoreQueriesFromCache(requiredQueryMap, {
              onSuccess: function onSuccess() {
                readyState.update({
                  ready: true,
                  stale: true
                }, [{ type: 'CACHE_RESTORED_REQUIRED' }]);
              },
              onFailure: function onFailure(error) {
                readyState.update({
                  error: error
                }, [{ type: 'CACHE_RESTORE_FAILED', error: error }]);
              }
            });
          } else {
            if (everyObject(remainingRequiredFetchMap, canResolve) && hasItems(remainingRequiredFetchMap)) {
              readyState.update({
                ready: true,
                stale: true
              }, [{ type: 'CACHE_RESTORED_REQUIRED' }]);
            } else {
              readyState.update({}, [{ type: 'CACHE_RESTORE_FAILED' }]);
            }
          }
        });
      }
    }
    // Stop profiling when queries have been sent to the network layer.
    profiler.stop();
  }));

  return {
    abort: function abort() {
      readyState.update({ aborted: true }, [{ type: 'ABORT' }]);
    }
  };
}

module.exports = GraphQLQueryRunner;