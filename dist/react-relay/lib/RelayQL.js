/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayQL
 * 
 * @format
 */

'use strict';

var QueryBuilder = require('./QueryBuilder');
var RelayFragmentReference = require('./RelayFragmentReference');
var RelayRouteFragment = require('./RelayRouteFragment');

var generateConcreteFragmentID = require('./generateConcreteFragmentID');
var invariant = require('fbjs/lib/invariant');

/**
 * @public
 *
 * This is a tag function used with template strings to provide the facade of a
 * runtime GraphQL parser. Example usage:
 *
 *   Relay.QL`fragment on User { name }`
 *
 * In actuality, a Babel transform parses these tag templates and replaces it
 * with an internal representation of the query structure.
 */
function RelayQL(strings) {
  !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayQL: Unexpected invocation at runtime. Either the Babel transform ' + 'was not set up, or it failed to identify this call site. Make sure it ' + 'is being used verbatim as `Relay.QL`.') : invariant(false) : void 0;
}

function assertValidFragment(substitution) {
  !(substitution instanceof RelayFragmentReference || QueryBuilder.getFragment(substitution) || QueryBuilder.getFragmentSpread(substitution)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayQL: Invalid fragment composition, use ' + "`${Child.getFragment('name')}`.") : invariant(false) : void 0;
}

var CLASSIC_NODE = '__classic_node__';

/**
 * Private helper methods used by the transformed code.
 */
Object.assign(RelayQL, {
  __frag: function __frag(substitution) {
    if (typeof substitution === 'function') {
      // Route conditional fragment, e.g. `${route => matchRoute(route, ...)}`.
      return new RelayRouteFragment(substitution);
    }
    if (substitution != null) {
      if (Array.isArray(substitution)) {
        substitution.forEach(assertValidFragment);
      } else {
        assertValidFragment(substitution);
      }
    }
    return substitution;
  },
  __var: function __var(expression) {
    var variable = QueryBuilder.getCallVariable(expression);
    if (variable) {
      !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayQL: Invalid argument `%s` supplied via template substitution. ' + 'Instead, use an inline variable (e.g. `comments(count: $count)`).', variable.callVariableName) : invariant(false) : void 0;
    }
    return QueryBuilder.createCallValue(expression);
  },
  __id: function __id() {
    return generateConcreteFragmentID();
  },
  __createFragment: function __createFragment(fragment, variableMapping) {
    return new RelayFragmentReference(function () {
      return fragment;
    }, null, variableMapping);
  },


  /**
   * Memoizes the results of executing the `.classic()` functions on
   * graphql`...` tagged expressions. Memoization allows the framework to use
   * object equality checks to compare fragments (useful, for example, when
   * comparing two `Selector`s to see if they select the same data).
   */
  __getClassicNode: function __getClassicNode(taggedNode) {
    var concreteNode = taggedNode[CLASSIC_NODE];
    if (concreteNode == null) {
      var fn = taggedNode.classic;
      !(typeof fn === 'function') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayQL: Expected a graphql literal, got `%s`.\n' + 'The "relay" Babel plugin must enable "compat" mode to be used with ' + '"react-relay/compat" or "react-relay/classic".\n' + 'See: https://facebook.github.io/relay/docs/babel-plugin-relay.html', JSON.stringify(taggedNode)) : invariant(false) : void 0;
      concreteNode = fn(this);
      taggedNode[CLASSIC_NODE] = concreteNode;
    }
    return concreteNode;
  },
  __getClassicFragment: function __getClassicFragment(taggedNode) {
    var concreteNode = this.__getClassicNode(taggedNode);
    var fragment = QueryBuilder.getFragmentDefinition(concreteNode);
    !fragment ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayQL: Expected a fragment, got `%s`.\n' + 'The "relay" Babel plugin must enable "compat" mode to be used with ' + '"react-relay/compat" or "react-relay/classic".\n' + 'See: https://facebook.github.io/relay/docs/babel-plugin-relay.html', concreteNode) : invariant(false) : void 0;
    return fragment;
  },
  __getClassicOperation: function __getClassicOperation(taggedNode) {
    var concreteNode = this.__getClassicNode(taggedNode);
    var operation = QueryBuilder.getOperationDefinition(concreteNode);
    !operation ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayQL: Expected an operation, got `%s`.\n' + 'The "relay" Babel plugin must enable "compat" mode to be used with ' + '"react-relay/compat" or "react-relay/classic".\n' + 'See: https://facebook.github.io/relay/docs/babel-plugin-relay.html', concreteNode) : invariant(false) : void 0;
    return operation;
  }
});

module.exports = RelayQL;