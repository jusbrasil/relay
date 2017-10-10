/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule AutoAliasTransform
 * 
 * @format
 */

'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var GraphQLCompilerContext = require('./GraphQLCompilerContext');

var getIdentifierForArgumentValue = require('./getIdentifierForArgumentValue');
var invariant = require('fbjs/lib/invariant');
var murmurHash = require('./murmurHash');
var stableJSONStringify = require('./stableJSONStringifyOSS');

/**
 * A transform to generate a unique alias for every combination of field name
 * and static calls. This transform requires that fragment spreads with
 * arguments have been inlined.
 */
function transform(context) {
  var documents = context.documents();
  return documents.reduce(function (ctx, node) {
    var selections = transformSelections(node.selections);
    return ctx.add((0, _extends3['default'])({}, node, {
      selections: selections
    }));
  }, new GraphQLCompilerContext(context.schema));
}

function transformSelections(nodeSelections) {
  return nodeSelections.map(function (selection) {
    if (selection.kind === 'LinkedField') {
      var alias = generateAlias(selection);
      var selections = transformSelections(selection.selections);
      return (0, _extends3['default'])({}, selection, {
        alias: alias,
        selections: selections
      });
    } else if (selection.kind === 'ScalarField') {
      var _alias = generateAlias(selection);
      return (0, _extends3['default'])({}, selection, {
        alias: _alias
      });
    } else if (selection.kind === 'InlineFragment' || selection.kind === 'Condition') {
      var _selections = transformSelections(selection.selections);
      return (0, _extends3['default'])({}, selection, {
        selections: _selections
      });
    } else if (selection.kind === 'FragmentSpread') {
      !!selection.args.length ? process.env.NODE_ENV !== 'production' ? invariant(false, 'AutoAliasTransform: Expected arguments to fragment spread ' + '`%s` to be inlined.', selection.name) : invariant(false) : void 0;
      return selection;
    } else {
      !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'AutoAliasTransform: Unexpected node kind `%s`.', selection.kind) : invariant(false) : void 0;
    }
  });
}

function generateAlias(field) {
  if (!field.args.length) {
    return null;
  }
  var args = [].concat((0, _toConsumableArray3['default'])(field.args)).sort(sortByName).map(function (arg) {
    return getIdentifierForArgumentValue(arg.value);
  });
  var hash = murmurHash(stableJSONStringify(args));
  return (field.alias || field.name) + '_' + hash;
}

function sortByName(a, b) {
  return a.name < b.name ? -1 : a.name > b.name ? 1 : 0;
}

module.exports = { transform: transform };