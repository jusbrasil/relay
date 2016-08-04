/**
 * Copyright (c) 2013-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * @providesModule transformPayloadToRelayGraphMode
 * 
 */

'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _possibleConstructorReturn2 = require('babel-runtime/helpers/possibleConstructorReturn');

var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);

var _inherits2 = require('babel-runtime/helpers/inherits');

var _inherits3 = _interopRequireDefault(_inherits2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayConnectionInterface = require('./RelayConnectionInterface');
var RelayGraphModeInterface = require('./RelayGraphModeInterface');

var RelayNodeInterface = require('./RelayNodeInterface');
var RelayQuery = require('./RelayQuery');

var RelayQueryPath = require('./RelayQueryPath');

var RelayQueryVisitor = require('./RelayQueryVisitor');
var RelayRecord = require('./RelayRecord');


var base62 = require('fbjs/lib/base62');
var invariant = require('fbjs/lib/invariant');
var isCompatibleRelayFragmentType = require('./isCompatibleRelayFragmentType');
var warning = require('fbjs/lib/warning');

var EDGES = RelayConnectionInterface.EDGES;
var PAGE_INFO = RelayConnectionInterface.PAGE_INFO;
var CACHE_KEY = RelayGraphModeInterface.CACHE_KEY;
var DEFERRED_FRAGMENTS = RelayGraphModeInterface.DEFERRED_FRAGMENTS;
var FRAGMENTS = RelayGraphModeInterface.FRAGMENTS;
var REF_KEY = RelayGraphModeInterface.REF_KEY;
var ANY_TYPE = RelayNodeInterface.ANY_TYPE;
var ID = RelayNodeInterface.ID;
var TYPENAME = RelayNodeInterface.TYPENAME;
var PATH = RelayRecord.MetadataKey.PATH;

// $FlowIssue: disjoint unions don't seem to be working to import this type.
// Should be:
//   import type {GraphOperation} from 'RelayGraphModeInterface';

/**
 * @internal
 *
 * Transforms a query and "tree" payload into a GraphMode payload.
 */
function transformPayloadToRelayGraphMode(store, queryTracker, root, payload, options) {
  var transformer = new RelayPayloadTransformer(store, queryTracker, options);
  transformer.transform(root, payload);
  return transformer.getPayload();
}

var RelayPayloadTransformer = function (_RelayQueryVisitor) {
  (0, _inherits3['default'])(RelayPayloadTransformer, _RelayQueryVisitor);

  function RelayPayloadTransformer(store, queryTracker, options) {
    (0, _classCallCheck3['default'])(this, RelayPayloadTransformer);

    var _this = (0, _possibleConstructorReturn3['default'])(this, _RelayQueryVisitor.call(this));

    _this._nextKey = 0;
    _this._nodes = {};
    _this._operations = [];
    _this._queryTracker = queryTracker;
    _this._store = store;
    _this._updateTrackedQueries = !!(options && options.updateTrackedQueries);
    return _this;
  }

  RelayPayloadTransformer.prototype.getPayload = function getPayload() {
    var nodes = this._nodes;
    if (!(0, _keys2['default'])(nodes).length) {
      return this._operations;
    }
    return [{ op: 'putNodes', nodes: nodes }].concat(this._operations);
  };

  RelayPayloadTransformer.prototype.transform = function transform(root, payload) {
    var _this2 = this;

    RelayNodeInterface.getResultsFromPayload(root, payload).forEach(function (_ref) {
      var result = _ref.result;
      var rootCallInfo = _ref.rootCallInfo;

      if (!rootCallInfo) {
        return;
      }
      var storageKey = rootCallInfo.storageKey;
      var identifyingArgValue = rootCallInfo.identifyingArgValue;

      var record = _this2._writeRecord(RelayQueryPath.create(root), root, result);
      _this2._operations.unshift({
        op: 'putRoot',
        field: storageKey,
        identifier: identifyingArgValue,
        root: record
      });
    });
  };

  RelayPayloadTransformer.prototype._writeRecord = function _writeRecord(parentPath, node, payloadRecord, clientRecord // TODO: should be `?GraphRecord`
  ) {
    if (payloadRecord == null) {
      return payloadRecord;
    }
    var id = payloadRecord[ID];
    var path = node instanceof RelayQuery.Root ? RelayQueryPath.create(node) : RelayQueryPath.getPath(parentPath, node, id);
    if (id != null) {
      var _currentRecord = this._getOrCreateRecord(id);
      var typeName = this._getRecordTypeName(node, id, payloadRecord);
      if (typeName != null) {
        _currentRecord[TYPENAME] = typeName;
      }
      this._recordTrackedQueries(id, node);
      this.traverse(node, {
        currentRecord: _currentRecord,
        path: path,
        payloadRecord: payloadRecord
      });
      return (0, _defineProperty3['default'])({}, REF_KEY, id);
    } else {
      var _currentRecord2 = clientRecord || {};
      // TODO #10481948: Construct paths lazily
      _currentRecord2[PATH] = path;
      var _typeName = this._getRecordTypeName(node, null, payloadRecord);
      if (_typeName != null) {
        _currentRecord2[TYPENAME] = _typeName;
      }
      this.traverse(node, {
        currentRecord: _currentRecord2,
        path: path,
        payloadRecord: payloadRecord
      });
      return _currentRecord2;
    }
  };

  RelayPayloadTransformer.prototype._getOrCreateRecord = function _getOrCreateRecord(dataID) {
    var record = this._nodes[dataID];
    if (!record) {
      // $FlowIssue: This is a valid `GraphRecord` but is being type-checked as
      // a `GraphReference` for some reason.
      record = this._nodes[dataID] = (0, _defineProperty3['default'])({}, ID, dataID);
    }
    return record;
  };

  RelayPayloadTransformer.prototype._getRecordTypeName = function _getRecordTypeName(node, dataID, payload) {
    var typeName = payload[TYPENAME];
    if (typeName == null) {
      if (!node.isAbstract()) {
        typeName = node.getType();
      } else if (dataID != null) {
        typeName = this._store.getType(dataID);
      }
    }
    process.env.NODE_ENV !== 'production' ? warning(typeName && typeName !== ANY_TYPE, 'transformPayloadToRelayGraphMode(): Could not find a type name for ' + 'record `%s`.', dataID) : void 0;
    return typeName;
  };

  RelayPayloadTransformer.prototype._recordTrackedQueries = function _recordTrackedQueries(dataID, node) {
    if (this._updateTrackedQueries || this._store.getRecordState(dataID) !== 'EXISTENT') {
      this._queryTracker.trackNodeForID(node, dataID);
    }
  };

  RelayPayloadTransformer.prototype._generateCacheKey = function _generateCacheKey() {
    return base62(this._nextKey++);
  };

  RelayPayloadTransformer.prototype.visitFragment = function visitFragment(fragment, state) {
    var currentRecord = state.currentRecord;

    var typeName = currentRecord[TYPENAME];
    if (fragment.isDeferred()) {
      var fragments = currentRecord[DEFERRED_FRAGMENTS] = currentRecord[DEFERRED_FRAGMENTS] || {};
      fragments[fragment.getCompositeHash()] = true;
    }
    if (isCompatibleRelayFragmentType(fragment, typeName)) {
      if (fragment.isTrackingEnabled()) {
        var _fragments = currentRecord[FRAGMENTS] = currentRecord[FRAGMENTS] || {};
        _fragments[fragment.getCompositeHash()] = true;
      }
      this.traverse(fragment, (0, _extends3['default'])({}, state, {
        path: RelayQueryPath.getPath(state.path, fragment, currentRecord[ID])
      }));
    }
  };

  RelayPayloadTransformer.prototype.visitField = function visitField(field, state) {
    var currentRecord = state.currentRecord;
    var payloadRecord = state.payloadRecord;


    var fieldData = payloadRecord[field.getSerializationKey()];
    if (fieldData == null) {
      // Treat undefined as null
      currentRecord[field.getStorageKey()] = null;
    } else if (!field.canHaveSubselections()) {
      !(typeof fieldData !== 'object' || Array.isArray(fieldData)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'transformPayloadToRelayGraphMode(): Expected a scalar for field ' + '`%s`, got `%s`.', field.getSchemaName(), fieldData) : invariant(false) : void 0;
      currentRecord[field.getStorageKey()] = fieldData;
    } else if (field.isConnection()) {
      !(typeof fieldData === 'object' && !Array.isArray(fieldData)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'transformPayloadToRelayGraphMode(): Expected data for connection ' + '`%s` to be an object, got `%s`.', field.getSchemaName(), fieldData) : invariant(false) : void 0;
      this._transformConnection(field, state, fieldData);
    } else if (field.isPlural()) {
      !Array.isArray(fieldData) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'transformPayloadToRelayGraphMode(): Expected data for plural field ' + 'to be an array, got `%s`.', field.getSchemaName(), fieldData) : invariant(false) : void 0;
      this._transformPluralLink(field, state, fieldData);
    } else {
      !(typeof fieldData === 'object' && !Array.isArray(fieldData)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'transformPayloadToRelayGraphMode(): Expected data for field ' + '`%s` to be an object, got `%s`.', field.getSchemaName(), fieldData) : invariant(false) : void 0;
      this._transformLink(field, state, fieldData);
    }
  };

  RelayPayloadTransformer.prototype._transformConnection = function _transformConnection(field, state, fieldData) {
    var currentRecord = state.currentRecord;

    var path = RelayQueryPath.getPath(state.path, field);
    var storageKey = field.getStorageKey();
    var clientRecord = currentRecord[storageKey] = currentRecord[storageKey] || {};
    clientRecord[PATH] = path;
    clientRecord[TYPENAME] = this._getRecordTypeName(field, null, fieldData);
    !(clientRecord == null || typeof clientRecord === 'object' && !Array.isArray(clientRecord)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'transformPayloadToRelayGraphMode(): Expected data for field ' + '`%s` to be an objects, got `%s`.', field.getSchemaName(), clientRecord) : invariant(false) : void 0;
    this._traverseConnection(field, field, {
      currentRecord: clientRecord,
      path: path,
      payloadRecord: fieldData
    });
  };

  RelayPayloadTransformer.prototype._traverseConnection = function _traverseConnection(connectionField, // the parent connection
  parentNode, // the connection or an intermediary fragment
  state) {
    var _this3 = this;

    parentNode.getChildren().forEach(function (child) {
      if (child instanceof RelayQuery.Field) {
        if (child.getSchemaName() === EDGES) {
          _this3._transformEdges(connectionField, child, state);
        } else if (child.getSchemaName() !== PAGE_INFO) {
          // Page info is handled by the range
          // Otherwise, write metadata fields normally (ex: `count`)
          _this3.visit(child, state);
        }
      } else {
        // Fragment case, recurse keeping track of parent connection
        _this3._traverseConnection(connectionField, child, state);
      }
    });
  };

  RelayPayloadTransformer.prototype._transformEdges = function _transformEdges(connectionField, edgesField, state) {
    var _this4 = this;

    var currentRecord = state.currentRecord;
    var payloadRecord = state.payloadRecord;

    var cacheKey = currentRecord[CACHE_KEY] = currentRecord[CACHE_KEY] || this._generateCacheKey();
    var edgesData = payloadRecord[EDGES];
    var pageInfo = payloadRecord[PAGE_INFO];

    !(typeof cacheKey === 'string') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'transformPayloadToRelayGraphMode(): Expected cache key for connection ' + 'field `%s` to be a string provided by GraphQL/Relay. Note that `%s` ' + 'is a reserved word.', connectionField.getSchemaName(), CACHE_KEY) : invariant(false) : void 0;
    !(edgesData == null || Array.isArray(edgesData)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'transformPayloadToRelayGraphMode(): Expected edges for field `%s` to ' + 'be an array, got `%s`.', connectionField.getSchemaName(), edgesData) : invariant(false) : void 0;
    !(pageInfo == null || typeof pageInfo === 'object' && !Array.isArray(pageInfo)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'transformPayloadToRelayGraphMode(): Expected %s for field `%s` to be ' + 'an object, got `%s`.', PAGE_INFO, connectionField.getSchemaName(), pageInfo) : invariant(false) : void 0;
    var edgeRecords = edgesData.map(function (edgeItem) {
      return _this4._writeRecord(state.path, edgesField, edgeItem);
    });
    // Inner ranges may reference cache keys defined in their parents. Using
    // `unshift` here ensures that parent edges are processed before children.
    this._operations.unshift({
      op: 'putEdges',
      args: connectionField.getCallsWithValues(),
      edges: edgeRecords,
      pageInfo: pageInfo,
      range: (0, _defineProperty3['default'])({}, CACHE_KEY, cacheKey)
    });
  };

  RelayPayloadTransformer.prototype._transformPluralLink = function _transformPluralLink(field, state, fieldData) {
    var _this5 = this;

    var currentRecord = state.currentRecord;

    var storageKey = field.getStorageKey();

    var linkedRecords = currentRecord[storageKey];
    !(linkedRecords == null || Array.isArray(linkedRecords)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'transformPayloadToRelayGraphMode(): Expected data for field `%s` to ' + 'always have array data, got `%s`.', field.getSchemaName(), linkedRecords) : invariant(false) : void 0;
    var records = fieldData.map(function (fieldItem, ii) {
      var clientRecord = linkedRecords && linkedRecords[ii];
      !(clientRecord == null || typeof clientRecord === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'transformPayloadToRelayGraphMode(): Expected array items for field ' + '`%s` to be objects, got `%s` at index `%s`.', field.getSchemaName(), clientRecord, ii) : invariant(false) : void 0;
      !(fieldItem == null || typeof fieldItem === 'object' && !Array.isArray(fieldItem)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'transformPayloadToRelayGraphMode(): Expected array items for field ' + '`%s` to be objects, got `%s` at index `%s`.', field.getSchemaName(), fieldItem, ii) : invariant(false) : void 0;
      return _this5._writeRecord(state.path, field, fieldItem, clientRecord);
    });
    currentRecord[storageKey] = records;
  };

  RelayPayloadTransformer.prototype._transformLink = function _transformLink(field, state, fieldData) {
    var currentRecord = state.currentRecord;

    var storageKey = field.getStorageKey();
    var clientRecord = currentRecord[storageKey];
    !(clientRecord == null || typeof clientRecord === 'object' && !Array.isArray(clientRecord)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'transformPayloadToRelayGraphMode(): Expected data for field ' + '`%s` to be an objects, got `%s`.', field.getSchemaName(), clientRecord) : invariant(false) : void 0;
    var record = this._writeRecord(state.path, field, fieldData, clientRecord);
    currentRecord[storageKey] = record;
  };

  return RelayPayloadTransformer;
}(RelayQueryVisitor);

module.exports = transformPayloadToRelayGraphMode;