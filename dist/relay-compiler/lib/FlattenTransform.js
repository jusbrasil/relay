/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule FlattenTransform
 * @format
 */

'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var GraphQLCompilerContext = require('./GraphQLCompilerContext');
var GraphQLSchemaUtils = require('./GraphQLSchemaUtils');

var areEqual = require('./areEqualOSS');
var getIdentifierForSelection = require('./getIdentifierForSelection');
var invariant = require('fbjs/lib/invariant');
var stableJSONStringify = require('./stableJSONStringifyOSS');

var _require = require('./GraphQLCompilerUserError'),
    createUserError = _require.createUserError;

var _require2 = require('./GraphQLIRPrinter'),
    printField = _require2.printField;

var _require3 = require('graphql'),
    GraphQLNonNull = _require3.GraphQLNonNull,
    GraphQLList = _require3.GraphQLList;

var getRawType = GraphQLSchemaUtils.getRawType,
    isAbstractType = GraphQLSchemaUtils.isAbstractType;


/**
 * Transform that flattens inline fragments, fragment spreads, and conditionals.
 *
 * Inline fragments are inlined (replaced with their selections) when:
 * - The fragment type matches the type of its parent.
 * - The fragment has an abstract type and the `flattenAbstractTypes` option has
 *   been set.
 * - The 'flattenInlineFragments' option has been set.
 */
function transform(context, options) {
  var flattenOptions = {
    flattenAbstractTypes: !!(options && options.flattenAbstractTypes),
    flattenInlineFragments: !!(options && options.flattenInlineFragments)
  };
  return context.documents().reduce(function (ctx, node) {
    var state = {
      kind: 'FlattenState',
      node: node,
      selections: {},
      type: node.type
    };
    visitNode(context, flattenOptions, state, node);
    var flattenedNode = buildNode(state);
    !(flattenedNode.kind === 'Root' || flattenedNode.kind === 'Fragment') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'FlattenTransform: Expected Root `%s` to flatten back to a Root ' + ' or Fragment.', node.name) : invariant(false) : void 0;
    return ctx.add(flattenedNode);
  }, new GraphQLCompilerContext(context.schema));
}

function buildNode(state) {
  return (0, _extends3['default'])({}, state.node, {
    selections: Object.keys(state.selections).map(function (key) {
      var selectionState = state.selections[key];
      if (selectionState.kind === 'FragmentSpread' || selectionState.kind === 'ScalarField') {
        return selectionState;
      } else if (selectionState.kind === 'FlattenState') {
        var _node = buildNode(selectionState);
        !(_node.kind !== 'Root' && _node.kind !== 'Fragment') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'FlattenTransform: got a `%s`, expected a selection.', _node.kind) : invariant(false) : void 0;
        return _node;
      } else {
        !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'FlattenTransform: Unexpected kind `%s`.', selectionState.kind) : invariant(false) : void 0;
      }
    })
  });
}

/**
 * @internal
 */
function visitNode(context, options, state, node) {
  node.selections.forEach(function (selection) {
    if (selection.kind === 'InlineFragment' && shouldFlattenInlineFragment(selection, options, state)) {
      visitNode(context, options, state, selection);
      return;
    }
    var nodeIdentifier = getIdentifierForSelection(selection);
    if (selection.kind === 'Condition' || selection.kind === 'InlineFragment') {
      var selectionState = state.selections[nodeIdentifier];
      if (!selectionState) {
        selectionState = state.selections[nodeIdentifier] = {
          kind: 'FlattenState',
          node: selection,
          selections: {},
          type: selection.kind === 'InlineFragment' ? selection.typeCondition : state.type
        };
      }
      visitNode(context, options, selectionState, selection);
    } else if (selection.kind === 'FragmentSpread') {
      state.selections[nodeIdentifier] = selection;
    } else if (selection.kind === 'LinkedField') {
      var _selectionState = state.selections[nodeIdentifier];
      if (!_selectionState) {
        _selectionState = state.selections[nodeIdentifier] = {
          kind: 'FlattenState',
          node: selection,
          selections: {},
          type: selection.type
        };
      } else {
        !(_selectionState.node.kind === 'LinkedField' || _selectionState.node.kind === 'ScalarField') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'FlattenTransform: Expected a Field, got %s.', _selectionState.node.kind) : invariant(false) : void 0;
        var prevField = _selectionState.node;
        assertUniqueArgsForAlias(selection, prevField);
        // merge fields
        var handles = dedupe(prevField.handles, selection.handles);
        _selectionState.node = (0, _extends3['default'])({}, selection, {
          handles: handles
        });
      }
      visitNode(context, options, _selectionState, selection);
    } else if (selection.kind === 'ScalarField') {
      var field = selection;
      var prevSelection = state.selections[nodeIdentifier];
      if (prevSelection && (prevSelection.kind === 'ScalarField' || prevSelection.kind === 'LinkedField')) {
        var _prevField = prevSelection;
        assertUniqueArgsForAlias(field, _prevField);
        if (field.handles || _prevField.handles) {
          var _handles = dedupe(field.handles, _prevField.handles);
          field = (0, _extends3['default'])({}, selection, {
            handles: _handles
          });
        }
      }
      state.selections[nodeIdentifier] = field;
    } else {
      !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'FlattenTransform: Unknown kind `%s`.', selection.kind) : invariant(false) : void 0;
    }
  });
}

/**
 * @internal
 */
function assertUniqueArgsForAlias(field, otherField) {
  if (!areEqualFields(field, otherField)) {
    throw createUserError('Expected all fields on the same parent with the name or alias `%s` ' + 'to have the same name and arguments. Got `%s` and `%s`.', field.alias || field.name, printField(field), printField(otherField));
  }
}

/**
 * @internal
 */
function shouldFlattenInlineFragment(fragment, options, state) {
  return !!(isEquivalentType(fragment.typeCondition, state.type) || options.flattenInlineFragments || options.flattenAbstractTypes && isAbstractType(getRawType(fragment.typeCondition)));
}

/**
 * @internal
 *
 * Verify that two fields are equal in all properties other than their
 * selections.
 */
function areEqualFields(thisField, thatField) {
  return thisField.kind === thatField.kind && thisField.name === thatField.name && thisField.alias === thatField.alias && areEqual(thisField.args, thatField.args);
}

/**
 * @internal
 */
function dedupe() {
  var uniqueItems = new Map();

  for (var _len = arguments.length, arrays = Array(_len), _key = 0; _key < _len; _key++) {
    arrays[_key] = arguments[_key];
  }

  arrays.forEach(function (items) {
    items && items.forEach(function (item) {
      uniqueItems.set(stableJSONStringify(item), item);
    });
  });
  return Array.from(uniqueItems.values());
}

/**
 *
 * @internal
 * Determine if a type is the same type (same name and class) as another type.
 * Needed if we're comparing IRs created at different times: we don't yet have
 * an IR schema, so the type we assign to an IR field could be !== than
 * what we assign to it after adding some schema definitions or extensions.
 */
function isEquivalentType(typeA, typeB) {
  // Easy short-circuit: equal types are equal.
  if (typeA === typeB) {
    return true;
  }

  // If either type is non-null, the other must also be non-null.
  if (typeA instanceof GraphQLNonNull && typeB instanceof GraphQLNonNull) {
    return isEquivalentType(typeA.ofType, typeB.ofType);
  }

  // If either type is a list, the other must also be a list.
  if (typeA instanceof GraphQLList && typeB instanceof GraphQLList) {
    return isEquivalentType(typeA.ofType, typeB.ofType);
  }

  // Make sure the two types are of the same class
  if (typeA.constructor.name === typeB.constructor.name) {
    var rawA = getRawType(typeA);
    var rawB = getRawType(typeB);

    // And they must have the exact same name
    return rawA.name === rawB.name;
  }

  // Otherwise the types are not equal.
  return false;
}

module.exports = {
  transform: transform
};