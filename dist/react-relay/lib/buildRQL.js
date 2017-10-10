/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule buildRQL
 * 
 * @format
 */

'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var Map = require('fbjs/lib/Map');
var QueryBuilder = require('./QueryBuilder');
var RelayProfiler = require('./RelayProfiler');
var RelayQueryCaching = require('./RelayQueryCaching');

var filterObject = require('fbjs/lib/filterObject');
var invariant = require('fbjs/lib/invariant');
var mapObject = require('fbjs/lib/mapObject');

// Cache results of executing fragment query builders.
var fragmentCache = new Map();

// Cache results of executing component-specific route query builders.
var queryCache = new Map();

function isDeprecatedCallWithArgCountGreaterThan(nodeBuilder, count) {
  var argLength = nodeBuilder.length;
  if (process.env.NODE_ENV !== 'production') {
    var mockImpl = nodeBuilder;
    while (mockImpl && mockImpl._getMockImplementation) {
      mockImpl = mockImpl._getMockImplementation();
    }
    if (mockImpl) {
      argLength = mockImpl.length;
    }
  }
  return argLength > count;
}

/**
 * @internal
 *
 * Builds a static node representation using a supplied query or fragment
 * builder. This is used for routes, containers, and mutations.
 *
 * If the supplied fragment builder produces an invalid node (e.g. the wrong
 * node type), these will return `undefined`. This is not to be confused with
 * a return value of `null`, which may result from the lack of a node.
 */
var buildRQL = {
  Fragment: function Fragment(fragmentBuilder, values) {
    var node = fragmentCache.get(fragmentBuilder);
    if (node) {
      return QueryBuilder.getFragment(node);
    }
    var variables = toVariables(values);
    !!isDeprecatedCallWithArgCountGreaterThan(fragmentBuilder, 1) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Relay.QL: Deprecated usage detected. If you are trying to define a ' + 'fragment, use `variables => Relay.QL`.') : invariant(false) : void 0;
    node = fragmentBuilder(variables);
    var fragment = node != null ? QueryBuilder.getFragment(node) : null;
    if (!fragment) {
      return fragment;
    }
    fragmentCache.set(fragmentBuilder, fragment);
    return fragment;
  },
  Query: function Query(queryBuilder, Component, queryName, values) {
    var queryCacheEnabled = RelayQueryCaching.getEnabled();
    var node = void 0;
    if (!queryCacheEnabled) {
      node = buildNode(queryBuilder, Component, queryName, values);
    } else {
      var componentCache = queryCache.get(queryBuilder);
      if (!componentCache) {
        componentCache = new Map();
        queryCache.set(queryBuilder, componentCache);
      } else {
        node = componentCache.get(Component);
      }
      if (!node) {
        node = buildNode(queryBuilder, Component, queryName, values);
      }
      componentCache.set(Component, node);
    }
    if (node) {
      return QueryBuilder.getQuery(node) || undefined;
    }
    return null;
  }
};

/**
 * @internal
 */
function buildNode(queryBuilder, Component, queryName, values) {
  var variables = toVariables(values);
  !!isDeprecatedCallWithArgCountGreaterThan(queryBuilder, 2) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Relay.QL: Deprecated usage detected. If you are trying to define a ' + 'query, use `(Component, variables) => Relay.QL`.') : invariant(false) : void 0;
  var node = void 0;
  if (isDeprecatedCallWithArgCountGreaterThan(queryBuilder, 0)) {
    node = queryBuilder(Component, variables);
  } else {
    node = queryBuilder(Component, variables);
    var query = QueryBuilder.getQuery(node);
    if (query) {
      var hasFragment = false;
      var hasScalarFieldsOnly = true;
      if (query.children) {
        query.children.forEach(function (child) {
          if (child) {
            hasFragment = hasFragment || child.kind === 'Fragment';
            hasScalarFieldsOnly = hasScalarFieldsOnly && child.kind === 'Field' && (!child.children || child.children.length === 0);
          }
        });
      }
      if (!hasFragment) {
        var children = query.children ? [].concat((0, _toConsumableArray3['default'])(query.children)) : [];
        !hasScalarFieldsOnly ? process.env.NODE_ENV !== 'production' ? invariant(false, 'Relay.QL: Expected query `%s` to be empty. For example, use ' + '`node(id: $id)`, not `node(id: $id) { ... }`.', query.fieldName) : invariant(false) : void 0;
        var fragmentVariables = filterObject(variables, function (_, name) {
          return Component.hasVariable(name);
        });
        children.push(Component.getFragment(queryName, fragmentVariables));
        node = (0, _extends3['default'])({}, query, {
          children: children
        });
      }
    }
  }
  return node;
}

function toVariables(variables) {
  return mapObject(variables, function (_, name) {
    return QueryBuilder.createCallVariable(name);
  });
}

RelayProfiler.instrumentMethods(buildRQL, {
  Fragment: 'buildRQL.Fragment',
  Query: 'buildRQL.Query'
});

module.exports = buildRQL;