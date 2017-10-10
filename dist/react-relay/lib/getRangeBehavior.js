/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule getRangeBehavior
 * 
 * @format
 */

'use strict';

var invariant = require('fbjs/lib/invariant');
var serializeRelayQueryCall = require('./serializeRelayQueryCall');

/**
 * Return the action (prepend/append) to use when adding an item to
 * the range with the specified calls.
 *
 * Ex:
 * rangeBehaviors: `{'orderby(recent)': 'append'}`
 * calls: `[{name: 'orderby', value: 'recent'}]`
 *
 * Returns `'append'`
 */
function getRangeBehavior(rangeBehaviors, calls) {
  if (typeof rangeBehaviors === 'function') {
    var rangeFilterCalls = getObjectFromCalls(calls);
    return rangeBehaviors(rangeFilterCalls);
  } else {
    var rangeBehaviorKey = calls.map(serializeRelayQueryCall).sort().join('').slice(1);
    var behavior = rangeBehaviors[rangeBehaviorKey];
    if (behavior == null) {
      return null;
    }
    !(typeof behavior === 'string') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'getRangeBehavior(): Expected range behavior for key `%s` to be a ' + 'string, got `%s`.', rangeBehaviorKey, behavior) : invariant(false) : void 0;
    return behavior;
  }
}

/**
 * Returns an object representation of the rangeFilterCalls that
 * will be passed to config.rangeBehaviors
 *
 * Example:
 * calls: `[{name: 'orderby', value: 'recent'}]`
 *
 * Returns:
 * `{orderby: 'recent'}`
*/
function getObjectFromCalls(calls) {
  var behaviors = {};
  calls.forEach(function (call) {
    behaviors[call.name] = call.value;
  });
  return behaviors;
}

module.exports = getRangeBehavior;