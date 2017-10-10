/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayMutationQuery
 * 
 * @format
 */

'use strict';

var _toConsumableArray2 = require('babel-runtime/helpers/toConsumableArray');

var _toConsumableArray3 = _interopRequireDefault(_toConsumableArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayMetaRoute = require('./RelayMetaRoute');
var RelayMutationType = require('./RelayMutationType');
var RelayNodeInterface = require('./RelayNodeInterface');
var RelayOptimisticMutationUtils = require('./RelayOptimisticMutationUtils');
var RelayQuery = require('./RelayQuery');
var RelayRecord = require('./RelayRecord');

var flattenRelayQuery = require('./flattenRelayQuery');
var forEachObject = require('fbjs/lib/forEachObject');
var getRangeBehavior = require('./getRangeBehavior');
var intersectRelayQuery = require('./intersectRelayQuery');
var invariant = require('fbjs/lib/invariant');
var nullthrows = require('fbjs/lib/nullthrows');
var warning = require('fbjs/lib/warning');

var _require = require('./GraphQLMutatorConstants'),
    REFETCH = _require.REFETCH;

var _require2 = require('relay-runtime'),
    ConnectionInterface = _require2.ConnectionInterface;
// This should probably use disjoint unions.


var ANY_TYPE = RelayNodeInterface.ANY_TYPE,
    ID = RelayNodeInterface.ID,
    TYPENAME = RelayNodeInterface.TYPENAME;

/**
 * @internal
 *
 * Constructs query fragments that are sent with mutations, which should ensure
 * that any records changed as a result of mutations are brought up-to-date.
 *
 * The fragments are a minimal subset created by intersecting the "fat query"
 * (fields that a mutation declares may have changed) with the "tracked query"
 * (fields representing data previously queried and written into the store).
 */

var RelayMutationQuery = {
  /**
   * Accepts a mapping from field names to data IDs. The field names must exist
   * as top-level fields in the fat query. These top-level fields are used to
   * re-fetch any data that has changed for records identified by the data IDs.
   *
   * The supplied mapping may contain multiple field names. In addition, each
   * field name may map to an array of data IDs if the field is plural.
   */
  buildFragmentForFields: function buildFragmentForFields(_ref) {
    var fatQuery = _ref.fatQuery,
        fieldIDs = _ref.fieldIDs,
        tracker = _ref.tracker;

    var mutatedFields = [];
    forEachObject(fieldIDs, function (dataIDOrIDs, fieldName) {
      var fatField = getFieldFromFatQuery(fatQuery, fieldName);
      var dataIDs = [].concat(dataIDOrIDs);
      var trackedChildren = [];
      dataIDs.forEach(function (dataID) {
        trackedChildren.push.apply(trackedChildren, (0, _toConsumableArray3['default'])(tracker.getTrackedChildrenForID(dataID)));
      });
      var trackedField = fatField.clone(trackedChildren);
      var mutationField = null;
      if (trackedField) {
        mutationField = intersectRelayQuery(trackedField, fatField);
        if (mutationField) {
          mutatedFields.push(mutationField);
        }
      }
      /* eslint-disable no-console-disallow */
      if (process.env.NODE_ENV !== 'production' && console.groupCollapsed && console.groupEnd) {
        console.groupCollapsed('Building fragment for `' + fieldName + '`');
        console.log(RelayNodeInterface.ID + ': ', dataIDOrIDs);

        var RelayMutationDebugPrinter = require('./RelayMutationDebugPrinter');
        RelayMutationDebugPrinter.printMutation(trackedField && buildMutationFragment(fatQuery, [trackedField]), 'Tracked Fragment');
        RelayMutationDebugPrinter.printMutation(buildMutationFragment(fatQuery, [fatField]), 'Fat Fragment');
        RelayMutationDebugPrinter.printMutation(mutationField && buildMutationFragment(fatQuery, [mutationField]), 'Intersected Fragment');
        console.groupEnd();
      }
      /* eslint-enable no-console-disallow */
    });
    return buildMutationFragment(fatQuery, mutatedFields);
  },


  /**
   * Creates a fragment used to update any data as a result of a mutation that
   * deletes an edge from a connection. The primary difference between this and
   * `createForFields` is whether or not the connection edges are re-fetched.
   *
   * `connectionName`
   *   Name of the connection field from which the edge is being deleted.
   *
   * `parentID`
   *   ID of the parent record containing the connection which may have metadata
   *   that needs to be re-fetched.
   *
   * `parentName`
   *   Name of the top-level field in the fat query that corresponds to the
   *   parent record.
   */
  buildFragmentForEdgeDeletion: function buildFragmentForEdgeDeletion(_ref2) {
    var fatQuery = _ref2.fatQuery,
        connectionName = _ref2.connectionName,
        parentID = _ref2.parentID,
        parentName = _ref2.parentName,
        tracker = _ref2.tracker;

    var fatParent = getFieldFromFatQuery(fatQuery, parentName);

    // The connection may not be explicit in the fat query, but if it is, we
    // try to validate it.
    getConnectionAndValidate(fatParent, parentName, connectionName);

    var mutatedFields = [];
    var trackedParent = fatParent.clone(tracker.getTrackedChildrenForID(parentID));
    if (trackedParent) {
      var filterUnterminatedRange = function filterUnterminatedRange(node) {
        return node.getSchemaName() === connectionName;
      };
      var mutatedField = intersectRelayQuery(trackedParent, fatParent, filterUnterminatedRange);
      if (mutatedField) {
        // If we skipped validation above, we get a second chance here.
        getConnectionAndValidate(mutatedField, parentName, connectionName);

        mutatedFields.push(mutatedField);
      }
    }
    return buildMutationFragment(fatQuery, mutatedFields);
  },


  /**
   * Creates a fragment used to fetch data necessary to insert a new edge into
   * an existing connection.
   *
   * `connectionName`
   *   Name of the connection field into which the edge is being inserted.
   *
   * `parentID`
   *   ID of the parent record containing the connection which may have metadata
   *   that needs to be re-fetched.
   *
   * `edgeName`
   *   Name of the top-level field in the fat query that corresponds to the
   *   newly inserted edge.
   *
   * `parentName`
   *   Name of the top-level field in the fat query that corresponds to the
   *   parent record. If not supplied, metadata on the parent record and any
   *   connections without entries in `rangeBehaviors` will not be updated.
   */
  buildFragmentForEdgeInsertion: function buildFragmentForEdgeInsertion(_ref3) {
    var fatQuery = _ref3.fatQuery,
        connectionName = _ref3.connectionName,
        parentID = _ref3.parentID,
        edgeName = _ref3.edgeName,
        parentName = _ref3.parentName,
        rangeBehaviors = _ref3.rangeBehaviors,
        tracker = _ref3.tracker;

    var mutatedFields = [];
    var keysWithoutRangeBehavior = {};
    var trackedChildren = tracker.getTrackedChildrenForID(parentID);
    var trackedConnections = [];
    trackedChildren.forEach(function (trackedChild) {
      trackedConnections.push.apply(trackedConnections, (0, _toConsumableArray3['default'])(findDescendantFields(trackedChild, connectionName)));
    });

    if (trackedConnections.length) {
      // If the first instance of the connection passes validation, all will.
      validateConnection(parentName, connectionName, trackedConnections[0]);

      var mutatedEdgeFields = [];
      trackedConnections.forEach(function (trackedConnection) {
        var trackedEdges = findDescendantFields(trackedConnection, 'edges');
        if (!trackedEdges.length) {
          return;
        }

        var callsWithValues = trackedConnection.getRangeBehaviorCalls();
        var rangeBehavior = getRangeBehavior(rangeBehaviors, callsWithValues);
        /* eslint-disable no-console-disallow */
        if (process.env.NODE_ENV !== 'production' && console.groupCollapsed && console.groupEnd) {
          var serializeRelayQueryCall = require('./serializeRelayQueryCall');
          var serializedCalls = callsWithValues.map(serializeRelayQueryCall).sort().join('');
          console.log(serializedCalls + ': ' + (rangeBehavior || ''));
        }
        /* eslint-enable no-console-disallow */
        if (rangeBehavior && rangeBehavior !== REFETCH) {
          // Include edges from all connections that exist in `rangeBehaviors`.
          // This may add duplicates, but they will eventually be flattened.
          trackedEdges.forEach(function (trackedEdge) {
            mutatedEdgeFields.push.apply(mutatedEdgeFields, (0, _toConsumableArray3['default'])(trackedEdge.getChildren()));
          });
        } else {
          // If the connection is not in `rangeBehaviors` or we have explicitly
          // set the behavior to `refetch`, re-fetch it.
          process.env.NODE_ENV !== 'production' ? warning(rangeBehavior === REFETCH, 'RelayMutation: The connection `%s` on the mutation field `%s` ' + 'that corresponds to the ID `%s` did not match any of the ' + '`rangeBehaviors` specified in your RANGE_ADD config. This means ' + 'that the entire connection will be refetched. Configure a range ' + 'behavior for this mutation in order to fetch only the new edge ' + 'and to enable optimistic mutations or use `refetch` to squelch ' + 'this warning.', trackedConnection.getStorageKey(), parentName, parentID) : void 0;
          keysWithoutRangeBehavior[trackedConnection.getShallowHash()] = true;
        }
      });
      if (mutatedEdgeFields.length) {
        mutatedFields.push(buildEdgeField(parentID, edgeName, mutatedEdgeFields));
      }
    }

    if (parentName != null) {
      var fatParent = getFieldFromFatQuery(fatQuery, parentName);

      // The connection may not be explicit in the fat query, but if it is, we
      // try to validate it.
      getConnectionAndValidate(fatParent, parentName, connectionName);

      var trackedParent = fatParent.clone(trackedChildren);
      if (trackedParent) {
        var filterUnterminatedRange = function filterUnterminatedRange(node) {
          return node.getSchemaName() === connectionName && !keysWithoutRangeBehavior.hasOwnProperty(node.getShallowHash());
        };
        var mutatedParent = intersectRelayQuery(trackedParent, fatParent, filterUnterminatedRange);
        if (mutatedParent) {
          mutatedFields.push(mutatedParent);
        }
      }
    }

    return buildMutationFragment(fatQuery, mutatedFields);
  },


  /**
   * Creates a fragment used to fetch the given optimistic response.
   */
  buildFragmentForOptimisticUpdate: function buildFragmentForOptimisticUpdate(_ref4) {
    var response = _ref4.response,
        fatQuery = _ref4.fatQuery;

    // Silences RelayQueryNode being incompatible with sub-class RelayQueryField
    // A detailed error description is available in #7635477
    var mutatedFields = RelayOptimisticMutationUtils.inferRelayFieldsFromData(response);
    return buildMutationFragment(fatQuery, mutatedFields);
  },


  /**
   * Creates a RelayQuery.Mutation used to fetch the given optimistic response.
   */
  buildQueryForOptimisticUpdate: function buildQueryForOptimisticUpdate(_ref5) {
    var fatQuery = _ref5.fatQuery,
        mutation = _ref5.mutation,
        response = _ref5.response;

    var children = [nullthrows(RelayMutationQuery.buildFragmentForOptimisticUpdate({
      response: response,
      fatQuery: fatQuery
    }))];
    return RelayQuery.Mutation.build('OptimisticQuery', fatQuery.getType(), mutation.calls[0].name, null, children, mutation.metadata);
  },


  /**
   * Creates a RelayQuery.Mutation for the given config. See type
   * `MutationConfig` and the `buildFragmentForEdgeInsertion`,
   * `buildFragmentForEdgeDeletion` and `buildFragmentForFields` methods above
   * for possible configs.
   */
  buildQuery: function buildQuery(_ref6) {
    var configs = _ref6.configs,
        fatQuery = _ref6.fatQuery,
        input = _ref6.input,
        mutationName = _ref6.mutationName,
        mutation = _ref6.mutation,
        tracker = _ref6.tracker;

    var _ConnectionInterface$ = ConnectionInterface.get(),
        CLIENT_MUTATION_ID = _ConnectionInterface$.CLIENT_MUTATION_ID;

    var children = [RelayQuery.Field.build({
      fieldName: CLIENT_MUTATION_ID,
      type: 'String',
      metadata: { isRequisite: true }
    })];
    if (process.env.NODE_ENV !== 'production' && console.groupCollapsed && console.groupEnd) {
      console.groupCollapsed('Mutation Configs');
    }
    configs.forEach(function (config) {
      switch (config.type) {
        case RelayMutationType.REQUIRED_CHILDREN:
          var newChildren = config.children.map(function (child) {
            return RelayQuery.Fragment.create(child, RelayMetaRoute.get('$buildQuery'), {});
          });
          children = children.concat(newChildren);
          if (process.env.NODE_ENV !== 'production' && console.groupCollapsed && console.groupEnd) {
            var RelayMutationDebugPrinter = require('./RelayMutationDebugPrinter');
            console.groupCollapsed('REQUIRED_CHILDREN');
            newChildren.forEach(function (child, index) {
              console.groupCollapsed(index);
              RelayMutationDebugPrinter.printMutation(child);
              console.groupEnd();
            });
            console.groupEnd();
          }
          break;

        case RelayMutationType.RANGE_ADD:
          if (process.env.NODE_ENV !== 'production' && console.groupCollapsed && console.groupEnd) {
            console.groupCollapsed('RANGE_ADD');
          }
          children.push(RelayMutationQuery.buildFragmentForEdgeInsertion({
            connectionName: config.connectionName,
            edgeName: config.edgeName,
            fatQuery: fatQuery,
            parentID: config.parentID,
            parentName: config.parentName,
            rangeBehaviors: sanitizeRangeBehaviors(config.rangeBehaviors),
            tracker: tracker
          }));
          if (process.env.NODE_ENV !== 'production' && console.groupCollapsed && console.groupEnd) {
            console.groupEnd();
          }
          break;

        case RelayMutationType.RANGE_DELETE:
        case RelayMutationType.NODE_DELETE:
          var edgeDeletion = RelayMutationQuery.buildFragmentForEdgeDeletion({
            connectionName: config.connectionName,
            fatQuery: fatQuery,
            parentID: config.parentID,
            parentName: config.parentName,
            tracker: tracker
          });
          children.push(edgeDeletion);
          var deletedIDFieldName = Array.isArray(config.deletedIDFieldName) ? config.deletedIDFieldName.concat(ID) : [config.deletedIDFieldName];
          var nodeDeletion = buildFragmentForDeletedConnectionNodeID(deletedIDFieldName, fatQuery);
          children.push(nodeDeletion);
          if (process.env.NODE_ENV !== 'production' && console.groupCollapsed && console.groupEnd) {
            var configType = config === RelayMutationType.RANGE_DELETE ? 'RANGE_DELETE' : 'NODE_DELETE';
            console.groupCollapsed(configType);

            var _RelayMutationDebugPrinter = require('./RelayMutationDebugPrinter');
            _RelayMutationDebugPrinter.printMutation(edgeDeletion, 'Edge Fragment');
            _RelayMutationDebugPrinter.printMutation(nodeDeletion, 'Node Fragment');

            console.groupEnd();
          }
          break;

        case RelayMutationType.FIELDS_CHANGE:
          if (process.env.NODE_ENV !== 'production' && console.groupCollapsed && console.groupEnd) {
            console.groupCollapsed('FIELDS_CHANGE');
          }
          children.push(RelayMutationQuery.buildFragmentForFields({
            fatQuery: fatQuery,
            fieldIDs: config.fieldIDs,
            tracker: tracker
          }));
          if (process.env.NODE_ENV !== 'production' && console.groupCollapsed && console.groupEnd) {
            console.groupEnd();
          }
          break;

        default:
          !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMutationQuery: Unrecognized config key `%s` for `%s`.', config.type, mutationName) : invariant(false) : void 0;
      }
    });
    if (process.env.NODE_ENV !== 'production' && console.groupCollapsed && console.groupEnd) {
      console.groupEnd();
    }
    return RelayQuery.Mutation.build(mutationName, fatQuery.getType(), mutation.calls[0].name, input, children.filter(function (child) {
      return child != null;
    }), mutation.metadata);
  }
};

function getFieldFromFatQuery(fatQuery, fieldName) {
  var field = fatQuery.getFieldByStorageKey(fieldName);
  !field ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMutationQuery: Invalid field name on fat query, `%s`.', fieldName) : invariant(false) : void 0;
  return field;
}

function buildMutationFragment(fatQuery, fields) {
  var fragment = RelayQuery.Fragment.build('MutationQuery', fatQuery.getType(), fields);

  !(fragment instanceof RelayQuery.Fragment) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMutationQuery: Expected a fragment.') : invariant(false) : void 0;
  return fragment;
}

function buildFragmentForDeletedConnectionNodeID(fieldNames, fatQuery) {
  !(fieldNames.length > 0) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMutationQuery: Invalid deleted node id name.') : invariant(false) : void 0;
  var field = RelayQuery.Field.build({
    fieldName: fieldNames[fieldNames.length - 1],
    type: 'String'
  });
  for (var ii = fieldNames.length - 2; ii >= 0; ii--) {
    field = RelayQuery.Field.build({
      fieldName: fieldNames[ii],
      type: ANY_TYPE,
      children: [field],
      metadata: {
        canHaveSubselections: true
      }
    });
  }
  return buildMutationFragment(fatQuery, [field]);
}

function buildEdgeField(parentID, edgeName, edgeFields) {
  var fields = [RelayQuery.Field.build({
    fieldName: 'cursor',
    type: 'String'
  }), RelayQuery.Field.build({
    fieldName: TYPENAME,
    type: 'String'
  })];
  if (ConnectionInterface.get().EDGES_HAVE_SOURCE_FIELD && !RelayRecord.isClientID(parentID)) {
    fields.push(RelayQuery.Field.build({
      children: [RelayQuery.Field.build({
        fieldName: ID,
        type: 'String'
      }), RelayQuery.Field.build({
        fieldName: TYPENAME,
        type: 'String'
      })],
      fieldName: 'source',
      metadata: { canHaveSubselections: true },
      type: ANY_TYPE
    }));
  }
  fields.push.apply(fields, (0, _toConsumableArray3['default'])(edgeFields));
  var edgeField = flattenRelayQuery(RelayQuery.Field.build({
    children: fields,
    fieldName: edgeName,
    metadata: { canHaveSubselections: true },
    type: ANY_TYPE
  }));
  !(edgeField instanceof RelayQuery.Field) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMutationQuery: Expected a field.') : invariant(false) : void 0;
  return edgeField;
}

function sanitizeRangeBehaviors(rangeBehaviors) {
  // Prior to 0.4.1 you would have to specify the args in your range behaviors
  // in the same order they appeared in your query. From 0.4.1 onward, args in a
  // range behavior key must be in alphabetical order.

  // No need to sanitize if defined as a function
  if (typeof rangeBehaviors === 'function') {
    return rangeBehaviors;
  }

  var unsortedKeys = void 0;
  forEachObject(rangeBehaviors, function (value, key) {
    if (key !== '') {
      var keyParts = key
      // Remove the last parenthesis
      .slice(0, -1)
      // Slice on unescaped parentheses followed immediately by a `.`
      .split(/\)\./);
      var sortedKey = keyParts.sort().join(').') + (keyParts.length ? ')' : '');
      if (sortedKey !== key) {
        unsortedKeys = unsortedKeys || [];
        unsortedKeys.push(key);
      }
    }
  });
  if (unsortedKeys) {
    !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMutation: To define a range behavior key without sorting ' + 'the arguments alphabetically is disallowed as of Relay 0.5.1. Please ' + 'sort the argument names of the range behavior key%s `%s`%s.', unsortedKeys.length === 1 ? '' : 's', unsortedKeys.length === 1 ? unsortedKeys[0] : unsortedKeys.length === 2 ? unsortedKeys[0] + '` and `' + unsortedKeys[1] : unsortedKeys.slice(0, -1).join('`, `'), unsortedKeys.length > 2 ? ', and `' + unsortedKeys.slice(-1) + '`' : '') : invariant(false) : void 0;
  }
  return rangeBehaviors;
}

/**
 * Confirms that the `connection` field extracted from the fat query at
 * `parentName` -> `connectionName` is actually a connection.
 */
function validateConnection(parentName, connectionName, connection) {
  !connection.isConnection() ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayMutationQuery: Expected field `%s`%s to be a connection.', connectionName, parentName ? ' on `' + parentName + '`' : '') : invariant(false) : void 0;
}

/**
 * Convenience wrapper around validateConnection that gracefully attempts to
 * extract the connection identified by `connectionName` from the `parentField`.
 * If the connection isn't present (because it wasn't in the fat query or
 * because it didn't survive query intersection), validation is skipped.
 */
function getConnectionAndValidate(parentField, parentName, connectionName) {
  var connections = findDescendantFields(parentField, connectionName);
  if (connections.length) {
    // If the first instance of the connection passes validation, all will.
    validateConnection(parentName, connectionName, connections[0]);
  }
}

/**
 * Finds all direct and indirect child fields of `node` with the given
 * field name.
 */
function findDescendantFields(rootNode, fieldName) {
  var fields = [];
  function traverse(node) {
    if (node instanceof RelayQuery.Field) {
      if (node.getSchemaName() === fieldName) {
        fields.push(node);
        return;
      }
    }
    if (node === rootNode || node instanceof RelayQuery.Fragment) {
      // Search fragments and the root node for matching fields, but skip
      // descendant non-matching fields.
      node.getChildren().forEach(function (child) {
        return traverse(child);
      });
    }
  }
  traverse(rootNode);
  return fields;
}

module.exports = RelayMutationQuery;