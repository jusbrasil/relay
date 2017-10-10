/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getRelayQueries
 * 
 * @format
 */

'use strict';

var Map = require('fbjs/lib/Map');
var RelayMetaRoute = require('./RelayMetaRoute');
var RelayProfiler = require('./RelayProfiler');
var RelayQuery = require('./RelayQuery');
var RelayQueryCaching = require('./RelayQueryCaching');

var buildRQL = require('./buildRQL');
var invariant = require('fbjs/lib/invariant');
var stableStringify = require('./stableStringify');
var warning = require('fbjs/lib/warning');

var queryCache = new Map();

/**
 * @internal
 *
 * `getRelayQueries` retrieves all queries for a component given a route.
 */
function getRelayQueries(Component, route) {
  var queryCachingEnabled = RelayQueryCaching.getEnabled();
  if (!queryCachingEnabled) {
    return buildQuerySet(Component, route);
  }
  var cache = queryCache.get(Component);
  if (!cache) {
    cache = {};
    queryCache.set(Component, cache);
  }
  var cacheKey = route.name + ':' + stableStringify(route.params);
  if (cache.hasOwnProperty(cacheKey)) {
    return cache[cacheKey];
  }
  var querySet = buildQuerySet(Component, route);
  cache[cacheKey] = querySet;
  return querySet;
}

/**
 * @internal
 */
function buildQuerySet(Component, route) {
  var querySet = {};
  Component.getFragmentNames().forEach(function (fragmentName) {
    querySet[fragmentName] = null;
  });
  Object.keys(route.queries).forEach(function (queryName) {
    if (!Component.hasFragment(queryName)) {
      process.env.NODE_ENV !== 'production' ? warning(false, 'Relay.QL: query `%s.queries.%s` is invalid, expected fragment ' + '`%s.fragments.%s` to be defined.', route.name, queryName, Component.displayName, queryName) : void 0;
      return;
    }
    var queryBuilder = route.queries[queryName];
    if (queryBuilder) {
      var concreteQuery = buildRQL.Query(queryBuilder, Component, queryName, route.params);
      !(concreteQuery !== undefined) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Relay.QL: query `%s.queries.%s` is invalid, a typical query is ' + 'defined using: () => Relay.QL`query { ... }`.', route.name, queryName) : invariant(false) : void 0;
      if (concreteQuery) {
        var rootQuery = RelayQuery.Root.create(concreteQuery, RelayMetaRoute.get(route.name), route.params);
        var identifyingArg = rootQuery.getIdentifyingArg();
        if (!identifyingArg || identifyingArg.value !== undefined) {
          querySet[queryName] = rootQuery;
          return;
        }
      }
    }
    querySet[queryName] = null;
  });
  return querySet;
}

module.exports = RelayProfiler.instrument('Relay.getQueries', getRelayQueries);