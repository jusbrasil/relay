/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule RelayMaskTransform
 * 
 * @format
 */

'use strict';

var GraphQLCompilerContext = require('./GraphQLCompilerContext');
var GraphQLIRTransformer = require('./GraphQLIRTransformer');

var getLiteralArgumentValues = require('./getLiteralArgumentValues');
var invariant = require('fbjs/lib/invariant');

var STATE = {};

/**
 * A transform that inlines fragment spreads with the @relay(mask: false)
 * directive.
 */
function relayMaskTransform(context) {
  return GraphQLIRTransformer.transform(context, {
    FragmentSpread: visitFragmentSpread
  }, function () {
    return STATE;
  });
}

function visitFragmentSpread(fragmentSpread, state) {
  if (!hasRelayMaskFalseDirective(fragmentSpread)) {
    return fragmentSpread;
  }
  !(fragmentSpread.args.length === 0) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMaskTransform: Cannot flatten fragment spread `%s` with ' + 'arguments. Use the `ApplyFragmentArgumentTransform` before flattening', fragmentSpread.name) : invariant(false) : void 0;
  var fragment = this.getContext().get(fragmentSpread.name);
  !(fragment && fragment.kind === 'Fragment') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMaskTransform: Unknown fragment `%s`.', fragmentSpread.name) : invariant(false) : void 0;
  var result = {
    kind: 'InlineFragment',
    directives: fragmentSpread.directives,
    metadata: fragmentSpread.metadata,
    selections: fragment.selections,
    typeCondition: fragment.type
  };

  return this.traverse(result, state);
}

function hasRelayMaskFalseDirective(fragmentSpread) {
  var relayDirective = fragmentSpread.directives.find(function (_ref) {
    var name = _ref.name;
    return name === 'relay';
  });
  if (!relayDirective) {
    return false;
  }

  var _getLiteralArgumentVa = getLiteralArgumentValues(relayDirective.args),
      mask = _getLiteralArgumentVa.mask;

  return mask === false;
}

module.exports = {
  transform: relayMaskTransform
};