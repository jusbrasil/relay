/**
 * Copyright (c) 2013-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 * @providesModule RelayReader
 * 
 * @format
 */

'use strict';

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

var RelayConcreteNode = require('./RelayConcreteNode');
var RelayModernRecord = require('./RelayModernRecord');
var RelayStoreUtils = require('./RelayStoreUtils');

var invariant = require('fbjs/lib/invariant');

var CONDITION = RelayConcreteNode.CONDITION,
    DEFERRABLE_FRAGMENT_SPREAD = RelayConcreteNode.DEFERRABLE_FRAGMENT_SPREAD,
    FRAGMENT_SPREAD = RelayConcreteNode.FRAGMENT_SPREAD,
    INLINE_FRAGMENT = RelayConcreteNode.INLINE_FRAGMENT,
    LINKED_FIELD = RelayConcreteNode.LINKED_FIELD,
    SCALAR_FIELD = RelayConcreteNode.SCALAR_FIELD;
var FRAGMENTS_KEY = RelayStoreUtils.FRAGMENTS_KEY,
    ID_KEY = RelayStoreUtils.ID_KEY,
    getArgumentValues = RelayStoreUtils.getArgumentValues,
    getStorageKey = RelayStoreUtils.getStorageKey;


function read(recordSource, selector) {
  var dataID = selector.dataID,
      node = selector.node,
      variables = selector.variables;

  var reader = new RelayReader(recordSource, variables);
  return reader.read(node, dataID);
}

/**
 * @private
 */

var RelayReader = function () {
  function RelayReader(recordSource, variables) {
    (0, _classCallCheck3['default'])(this, RelayReader);

    this._recordSource = recordSource;
    this._seenRecords = {};
    this._variables = variables;
  }

  RelayReader.prototype.read = function read(node, dataID) {
    var data = this._traverse(node, dataID, null);
    return {
      data: data,
      dataID: dataID,
      node: node,
      seenRecords: this._seenRecords,
      variables: this._variables
    };
  };

  RelayReader.prototype._traverse = function _traverse(node, dataID, prevData) {
    var record = this._recordSource.get(dataID);
    this._seenRecords[dataID] = record;
    if (record == null) {
      return record;
    }
    var data = prevData || {};
    this._traverseSelections(node.selections, record, data);
    return data;
  };

  RelayReader.prototype._getVariableValue = function _getVariableValue(name) {
    !this._variables.hasOwnProperty(name) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayReader(): Undefined variable `%s`.', name) : invariant(false) : void 0;
    return this._variables[name];
  };

  RelayReader.prototype._traverseSelections = function _traverseSelections(selections, record, data) {
    var _this = this;

    selections.forEach(function (selection) {
      if (selection.kind === SCALAR_FIELD) {
        _this._readScalar(selection, record, data);
      } else if (selection.kind === LINKED_FIELD) {
        if (selection.plural) {
          _this._readPluralLink(selection, record, data);
        } else {
          _this._readLink(selection, record, data);
        }
      } else if (selection.kind === CONDITION) {
        var conditionValue = _this._getVariableValue(selection.condition);
        if (conditionValue === selection.passingValue) {
          _this._traverseSelections(selection.selections, record, data);
        }
      } else if (selection.kind === INLINE_FRAGMENT) {
        var typeName = RelayModernRecord.getType(record);
        if (typeName != null && typeName === selection.type) {
          _this._traverseSelections(selection.selections, record, data);
        }
      } else if (selection.kind === FRAGMENT_SPREAD) {
        _this._createFragmentPointer(selection, record, data, _this._variables);
      } else if (selection.kind === DEFERRABLE_FRAGMENT_SPREAD) {
        _this._createDeferrableFragmentPointer(selection, record, data);
      } else {
        !false ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayReader(): Unexpected ast kind `%s`.', selection.kind) : invariant(false) : void 0;
      }
    });
  };

  RelayReader.prototype._readScalar = function _readScalar(field, record, data) {
    var applicationName = field.alias || field.name;
    var storageKey = getStorageKey(field, this._variables);
    var value = RelayModernRecord.getValue(record, storageKey);
    data[applicationName] = value;
  };

  RelayReader.prototype._readLink = function _readLink(field, record, data) {
    var applicationName = field.alias || field.name;
    var storageKey = getStorageKey(field, this._variables);
    var linkedID = RelayModernRecord.getLinkedRecordID(record, storageKey);

    if (linkedID == null) {
      data[applicationName] = linkedID;
      return;
    }

    var prevData = data[applicationName];
    !(prevData == null || typeof prevData === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayReader(): Expected data for field `%s` on record `%s` ' + 'to be an object, got `%s`.', applicationName, RelayModernRecord.getDataID(record), prevData) : invariant(false) : void 0;
    data[applicationName] = this._traverse(field, linkedID, prevData);
  };

  RelayReader.prototype._readPluralLink = function _readPluralLink(field, record, data) {
    var _this2 = this;

    var applicationName = field.alias || field.name;
    var storageKey = getStorageKey(field, this._variables);
    var linkedIDs = RelayModernRecord.getLinkedRecordIDs(record, storageKey);

    if (linkedIDs == null) {
      data[applicationName] = linkedIDs;
      return;
    }

    var prevData = data[applicationName];
    !(prevData == null || Array.isArray(prevData)) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayReader(): Expected data for field `%s` on record `%s` ' + 'to be an array, got `%s`.', applicationName, RelayModernRecord.getDataID(record), prevData) : invariant(false) : void 0;
    var linkedArray = prevData || [];
    linkedIDs.forEach(function (linkedID, nextIndex) {
      if (linkedID == null) {
        linkedArray[nextIndex] = linkedID;
        return;
      }
      var prevItem = linkedArray[nextIndex];
      !(prevItem == null || typeof prevItem === 'object') ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayReader(): Expected data for field `%s` on record `%s` ' + 'to be an object, got `%s`.', applicationName, RelayModernRecord.getDataID(record), prevItem) : invariant(false) : void 0;
      var linkedItem = _this2._traverse(field, linkedID, prevItem);
      linkedArray[nextIndex] = linkedItem;
    });
    data[applicationName] = linkedArray;
  };

  RelayReader.prototype._createFragmentPointer = function _createFragmentPointer(fragmentSpread, record, data, variables) {
    var fragmentPointers = data[FRAGMENTS_KEY];
    if (!fragmentPointers) {
      fragmentPointers = data[FRAGMENTS_KEY] = {};
    }
    !(typeof fragmentPointers === 'object' && fragmentPointers) ? process.env.NODE_ENV !== 'production' ? invariant(false, 'RelayReader: Expected fragment spread data to be an object, got `%s`.', fragmentPointers) : invariant(false) : void 0;
    data[ID_KEY] = data[ID_KEY] || RelayModernRecord.getDataID(record);
    fragmentPointers[fragmentSpread.name] = fragmentSpread.args ? getArgumentValues(fragmentSpread.args, variables) : {};
  };

  RelayReader.prototype._createDeferrableFragmentPointer = function _createDeferrableFragmentPointer(deferrableFragment, record, data) {
    var rootFieldValue = RelayModernRecord.getValue(record, deferrableFragment.storageKey);
    var variables = (0, _extends4['default'])({}, this._variables, (0, _defineProperty3['default'])({}, deferrableFragment.rootFieldVariable, rootFieldValue));
    this._createFragmentPointer(deferrableFragment, record, data, variables);
  };

  return RelayReader;
}();

module.exports = { read: read };