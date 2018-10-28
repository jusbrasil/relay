/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayModernGraphQLTag
 * 
 * @format
 */

'use strict';

var RelayConcreteNode = require('./RelayConcreteNode');

var invariant = require('fbjs/lib/invariant');

// The type of a graphql`...` tagged template expression.


/**
 * Runtime function to correspond to the `graphql` tagged template function.
 * All calls to this function should be transformed by the plugin.
 */
function graphql(strings) {
  !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'graphql: Unexpected invocation at runtime. Either the Babel transform ' + 'was not set up, or it failed to identify this call site. Make sure it ' + 'is being used verbatim as `graphql`.') : invariant(false) : void 0;
}

function getNode(taggedNode) {
  var fn = typeof taggedNode === 'function' ? taggedNode : taggedNode.modern;
  // Support for classic raw nodes (used in test mock)
  if (typeof fn !== 'function') {
    return taggedNode;
  }
  return fn();
}

function getFragment(taggedNode) {
  var fragment = getNode(taggedNode);
  !(typeof fragment === 'object' && fragment !== null && fragment.kind === RelayConcreteNode.FRAGMENT) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayModernGraphQLTag: Expected a fragment, got `%s`.', JSON.stringify(fragment)) : invariant(false) : void 0;
  return fragment;
}

function getRequest(taggedNode) {
  var request = getNode(taggedNode);
  !(typeof request === 'object' && request !== null && (request.kind === RelayConcreteNode.REQUEST || request.kind === RelayConcreteNode.BATCH_REQUEST)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayModernGraphQLTag: Expected an request, got `%s`.', JSON.stringify(request)) : invariant(false) : void 0;
  return request;
}

module.exports = {
  getFragment: getFragment,
  getRequest: getRequest,
  graphql: graphql
};