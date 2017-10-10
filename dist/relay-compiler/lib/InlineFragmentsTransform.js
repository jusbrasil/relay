/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule InlineFragmentsTransform
 * 
 * @format
 */

'use strict';

var GraphQLCompilerContext = require('./GraphQLCompilerContext');
var GraphQLIRTransformer = require('./GraphQLIRTransformer');

var invariant = require('fbjs/lib/invariant');

var STATE = {};

/**
 * A transform that inlines all fragments and removes them.
 */
function inlineFragmentsTransform(context) {
  return GraphQLIRTransformer.transform(context, {
    Fragment: visitFragment,
    FragmentSpread: visitFragmentSpread
  }, function () {
    return STATE;
  });
}

function visitFragment(fragment, state) {
  return null;
}

function visitFragmentSpread(fragmentSpread, state) {
  !(fragmentSpread.args.length === 0) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'InlineFragmentsTransform: Cannot flatten fragment spread `%s` with ' + 'arguments. Use the `ApplyFragmentArgumentTransform` before flattening', fragmentSpread.name) : invariant(false) : void 0;
  var fragment = this.getContext().get(fragmentSpread.name);
  !(fragment && fragment.kind === 'Fragment') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'InlineFragmentsTransform: Unknown fragment `%s`.', fragmentSpread.name) : invariant(false) : void 0;
  var result = {
    kind: 'InlineFragment',
    directives: fragmentSpread.directives,
    metadata: fragmentSpread.metadata,
    selections: fragment.selections,
    typeCondition: fragment.type
  };

  return this.traverse(result, state);
}

module.exports = {
  transform: inlineFragmentsTransform
};