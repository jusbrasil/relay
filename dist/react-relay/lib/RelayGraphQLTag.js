/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayGraphQLTag
 * 
 * @format
 */

'use strict';

var RelayQL = require('./RelayQL');

var invariant = require('fbjs/lib/invariant');

/**
 * Runtime function to correspond to the `graphql` tagged template function.
 * All calls to this function should be transformed by the plugin.
 */
function graphql() {
  !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'graphql: Unexpected invocation at runtime. Either the Babel transform ' + 'was not set up, or it failed to identify this call site. Make sure it ' + 'is being used verbatim as `graphql`.') : invariant(false) : void 0;
}

/**
 * Variant of the `graphql` tag that enables experimental features.
 */
graphql.experimental = function () {
  !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'graphql.experimental: Unexpected invocation at runtime. Either the ' + 'Babel transform was not set up, or it failed to identify this call ' + 'site. Make sure it is being used verbatim as `graphql.experimental`.') : invariant(false) : void 0;
};

function getClassicFragment(taggedNode) {
  return RelayQL.__getClassicFragment(taggedNode);
}

function getClassicOperation(taggedNode) {
  return RelayQL.__getClassicOperation(taggedNode);
}

module.exports = {
  getClassicFragment: getClassicFragment,
  getClassicOperation: getClassicOperation,
  graphql: graphql
};