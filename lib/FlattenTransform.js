/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule FlattenTransform
 * @format
 * 
 */

'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var GraphQLCompilerContext = require('./GraphQLCompilerContext');
var GraphQLIRTransformer = require('./GraphQLIRTransformer');
var GraphQLSchemaUtils = require('./GraphQLSchemaUtils');

var areEqual = require('./areEqualOSS');
var getIdentifierForSelection = require('./getIdentifierForSelection');
var invariant = require('fbjs/lib/invariant');

var _require = require('./GraphQLCompilerUserError'),
    createUserError = _require.createUserError;

var _require2 = require('./GraphQLIRPrinter'),
    printField = _require2.printField;

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
function flattenTransformImpl(context, options) {
  var state = {
    flattenAbstractTypes: !!(options && options.flattenAbstractTypes),
    flattenInlineFragments: !!(options && options.flattenInlineFragments),
    parentType: null
  };

  return GraphQLIRTransformer.transform(context, {
    Root: flattenSelections,
    Fragment: flattenSelections,
    Condition: flattenSelections,
    InlineFragment: flattenSelections,
    LinkedField: flattenSelections
  }, function () {
    return state;
  });
}

/**
 * @internal
 */
function flattenSelections(node, state) {
  // Determine the current type.
  var parentType = state.parentType;
  var type = node.kind === 'Condition' ? parentType : node.kind === 'InlineFragment' ? node.typeCondition : node.type;
  !type ? process.env.NODE_ENV !== 'production' ? invariant(false, 'FlattenTransform: Expected parent type.') : invariant(false) : void 0;

  // Flatten the selections in this node, creating a new node with flattened
  // selections if possible, then deeply traverse the flattened node, while
  // keeping track of the parent type.
  var nextSelections = new Map();
  var hasFlattened = flattenSelectionsInto(nextSelections, node, state, type);
  var flattenedNode = hasFlattened ? (0, _extends3['default'])({}, node, { selections: Array.from(nextSelections.values()) }) : node;
  state.parentType = type;
  var deeplyFlattenedNode = this.traverse(flattenedNode, state);
  state.parentType = parentType;
  return deeplyFlattenedNode;
}

/**
 * @internal
 */
function flattenSelectionsInto(flattenedSelections, node, state, type) {
  var hasFlattened = false;
  node.selections.forEach(function (selection) {
    if (selection.kind === 'InlineFragment' && shouldFlattenInlineFragment(selection, state, type)) {
      hasFlattened = true;
      flattenSelectionsInto(flattenedSelections, selection, state, type);
      return;
    }
    var nodeIdentifier = getIdentifierForSelection(selection);
    var flattenedSelection = flattenedSelections.get(nodeIdentifier);
    // If this selection hasn't been seen before, keep track of it.
    if (!flattenedSelection) {
      flattenedSelections.set(nodeIdentifier, selection);
      return;
    }
    // Otherwise a similar selection exists which should be merged.
    hasFlattened = true;
    if (flattenedSelection.kind === 'InlineFragment') {
      !(selection.kind === 'InlineFragment') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'FlattenTransform: Expected a ScalarField, got a %s', selection.kind) : invariant(false) : void 0;
      flattenedSelections.set(nodeIdentifier, (0, _extends3['default'])({}, flattenedSelection, {
        selections: mergeSelections(flattenedSelection, selection, state, selection.typeCondition)
      }));
    } else if (flattenedSelection.kind === 'Condition') {
      !(selection.kind === 'Condition') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'FlattenTransform: Expected a Condition, got a %s', selection.kind) : invariant(false) : void 0;
      flattenedSelections.set(nodeIdentifier, (0, _extends3['default'])({}, flattenedSelection, {
        selections: mergeSelections(flattenedSelection, selection, state, type)
      }));
    } else if (flattenedSelection.kind === 'FragmentSpread' || flattenedSelection.kind === 'DeferrableFragmentSpread') {
      // Ignore duplicate fragment spreads.
    } else if (flattenedSelection.kind === 'LinkedField') {
      !(selection.kind === 'LinkedField') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'FlattenTransform: Expected a LinkedField, got a %s', selection.kind) : invariant(false) : void 0;
      // Note: arguments are intentionally reversed to avoid rebuilds
      assertUniqueArgsForAlias(selection, flattenedSelection);
      flattenedSelections.set(nodeIdentifier, (0, _extends3['default'])({
        kind: 'LinkedField'
      }, flattenedSelection, {
        handles: mergeHandles(flattenedSelection, selection),
        selections: mergeSelections(flattenedSelection, selection, state, selection.type)
      }));
    } else if (flattenedSelection.kind === 'ScalarField') {
      !(selection.kind === 'ScalarField') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'FlattenTransform: Expected a ScalarField, got a %s', selection.kind) : invariant(false) : void 0;
      // Note: arguments are intentionally reversed to avoid rebuilds
      assertUniqueArgsForAlias(selection, flattenedSelection);
      flattenedSelections.set(nodeIdentifier, (0, _extends3['default'])({
        kind: 'ScalarField'
      }, flattenedSelection, {
        // Note: arguments are intentionally reversed to avoid rebuilds
        handles: mergeHandles(selection, flattenedSelection)
      }));
    } else {
      !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'FlattenTransform: Unknown kind `%s`.', flattenedSelection.kind) : invariant(false) : void 0;
    }
  });
  return hasFlattened;
}

/**
 * @internal
 */
function mergeSelections(nodeA, nodeB, state, type) {
  var flattenedSelections = new Map();
  flattenSelectionsInto(flattenedSelections, nodeA, state, type);
  flattenSelectionsInto(flattenedSelections, nodeB, state, type);
  return Array.from(flattenedSelections.values());
}

/**
 * @internal
 * TODO(T19327202) This is redundant with OverlappingFieldsCanBeMergedRule once
 * it can be enabled.
 */
function assertUniqueArgsForAlias(field, otherField) {
  if (!areEqualFields(field, otherField)) {
    throw createUserError('Expected all fields on the same parent with the name or alias `%s` ' + 'to have the same name and arguments. Got `%s` and `%s`.', field.alias || field.name, printField(field), printField(otherField));
  }
}

/**
 * @internal
 */
function shouldFlattenInlineFragment(fragment, state, type) {
  return state.flattenInlineFragments || fragment.typeCondition.name === getRawType(type).name || state.flattenAbstractTypes && isAbstractType(fragment.typeCondition);
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
function mergeHandles(nodeA, nodeB) {
  if (!nodeA.handles) {
    return nodeB.handles;
  }
  if (!nodeB.handles) {
    return nodeA.handles;
  }
  var uniqueItems = new Map();
  nodeA.handles.concat(nodeB.handles).forEach(function (item) {
    return uniqueItems.set(item.name + item.key, item);
  });
  return Array.from(uniqueItems.values());
}

function transformWithOptions(options) {
  return function flattenTransform(context) {
    return flattenTransformImpl(context, options);
  };
}

module.exports = {
  transformWithOptions: transformWithOptions
};